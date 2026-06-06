import { registerCommand } from "@vendetta/commands";
import { findByProps } from "@vendetta/metro";
import { showToast } from "@vendetta/ui/toasts";
import { storage } from "@vendetta/plugin";

const FLAGGED_WORDS: string[] = [
  'cp', 'child porn', 'cheese pizza', 'loli', 'shota', 'jailbait',
  'pedo', 'pedophile', 'grooming', 'groomer', 'minor', 'underage',
  // ... باقي الكلمات كما هي
];

const log = (...args: any[]) => console.log("[Sweeper]", ...args);
const logError = (...args: any[]) => console.error("[Sweeper]", ...args);

// إعدادات افتراضية
if (!storage.sweeperSettings) {
  storage.sweeperSettings = {
    defaultLimit: 100,
    maxLimit: 500,
  };
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

// البحث عن messageApi بطريقة أكثر أماناً
const getMessageApi = () => {
  try {
    const api = findByProps("fetchMessages");
    if (api && typeof api.fetchMessages === "function") return api;
  } catch {}
  
  try {
    const api = findByProps("getMessages");
    if (api && typeof api.getMessages === "function") return api;
  } catch {}
  
  return null;
};

// البحث عن messageActions لإرسال الرسائل
const getMessageActions = () => {
  try {
    const g = globalThis as any;
    if (g?.MessageActions && typeof g.MessageActions === "object") return g.MessageActions;
  } catch {}
  
  try {
    const actions = findByProps("sendMessage");
    if (actions) return actions;
  } catch {}
  
  try {
    const actions = findByProps("sendMessage", "receiveMessage");
    if (actions) return actions;
  } catch {}
  
  return null;
};

// إرسال رسالة بطريقة آمنة
const sendReport = async (channelId: string, embed: any) => {
  const MA = getMessageActions();
  if (!MA) return false;

  const attempts = [
    () => MA.sendMessage?.(channelId, { embeds: [embed] }),
    () => MA.sendMessage?.(channelId, { content: "", embeds: [embed] }),
    () => MA.createMessage?.(channelId, { embeds: [embed] }),
  ];

  for (const attempt of attempts) {
    try {
      const result = attempt();
      if (result && typeof result.then === "function") {
        await result;
      }
      return true;
    } catch {}
  }
  return false;
};

let unregister: (() => void) | null = null;

export default {
  onLoad() {
    log("Loading Sweeper plugin...");

    unregister = registerCommand({
      name: "sweep",
      displayName: "sweep",
      description: "Scan messages from mentioned users for flagged words.",
      displayDescription: "Scan messages from mentioned users for flagged words.",
      options: [
        {
          name: "users",
          displayName: "users",
          description: "Users to scan",
          displayDescription: "Users to scan",
          required: true,
          type: 6, // USER type
        },
        {
          name: "limit",
          displayName: "limit",
          description: "Number of messages to scan per channel (max 500)",
          displayDescription: "Number of messages to scan per channel",
          required: false,
          type: 4, // INTEGER type
        },
      ],
      execute: async (args: any[], ctx: any) => {
        try {
          const guild = ctx?.guild;
          if (!guild) {
            showToast("This command only works in servers.", 1);
            return { content: "❌ This command only works in servers." };
          }

          // استخراج معرفات المستخدمين
          const userIds: string[] = [];
          if (args[0]?.value) {
            userIds.push(args[0].value);
          }
          
          if (userIds.length === 0) {
            showToast("Please mention at least one user.", 1);
            return { content: "❌ Please mention at least one user." };
          }

          const messageLimit = Math.min(
            args[1]?.value || storage.sweeperSettings.defaultLimit,
            storage.sweeperSettings.maxLimit
          );
          
          const messageApi = getMessageApi();
          if (!messageApi) {
            showToast("Could not access message API.", 1);
            return { content: "❌ Could not access message API." };
          }

          showToast("Scanning messages...", 0);

          // جمع القنوات النصية
          const textChannels = guild.channels?.filter?.(
            (c: any) => c.type === 0 || c.type === 5
          ) || [];

          if (textChannels.length === 0) {
            showToast("No text channels found.", 1);
            return { content: "❌ No text channels found." };
          }

          let reportLines: string[] = [];
          let totalFound = 0;
          const words = FLAGGED_WORDS;

          for (const userId of userIds) {
            for (const ch of textChannels) {
              try {
                if (!ch?.id) continue;
                
                const fetchMethod = messageApi.fetchMessages || messageApi.getMessages;
                if (!fetchMethod) continue;

                const msgs = await fetchMethod.call(messageApi, ch.id, { 
                  limit: messageLimit 
                });

                if (!msgs || !Array.isArray(msgs)) continue;

                const userMsgs = msgs.filter((m: any) => m?.author?.id === userId);

                for (const m of userMsgs) {
                  if (!m?.content) continue;
                  
                  const content: string = m.content.toLowerCase();
                  const foundWord = words.find((w) => content.includes(w.toLowerCase()));
                  
                  if (foundWord) {
                    const jumpLink = `https://discord.com/channels/${guild.id}/${ch.id}/${m.id}`;
                    reportLines.push(
                      `<@${userId}> in #${ch.name}: [Jump to message](${jumpLink}) ← flagged: \`${foundWord}\``
                    );
                    totalFound++;
                  }
                }
              } catch (e) {
                // تجاهل أخطاء القنوات الفردية
              }
            }
          }

          if (reportLines.length === 0) {
            showToast(`No flagged messages found in the last ${messageLimit} messages per channel.`, 0);
            return { content: `✅ No flagged messages found in the last ${messageLimit} messages per channel.` };
          }

          // إرسال التقرير
          const chunks = chunkArray(reportLines, 15);
          const channelId = ctx?.channel?.id;
          
          if (channelId) {
            for (const chunk of chunks) {
              const embed = {
                title: "🚨 Flagged Messages Report",
                description: chunk.join("\n"),
                color: 0xff0000,
                footer: { text: `Total results: ${totalFound}` },
                timestamp: new Date().toISOString(),
              };
              
              await sendReport(channelId, embed);
            }
          }

          return { content: `✅ Scan complete. Found ${totalFound} flagged messages.` };
          
        } catch (err) {
          logError("Sweep command error:", err);
          showToast("An error occurred while scanning.", 1);
          return { content: "❌ An error occurred while scanning messages." };
        }
      },
    });

    log("Sweeper plugin loaded successfully");
  },

  onUnload() {
    log("Unloading Sweeper plugin...");
    if (unregister) {
      try {
        unregister();
      } catch (e) {
        logError("Error unregistering command:", e);
      }
      unregister = null;
    }
  },
  
  settings: {
    defaultLimit: {
      title: "Default Scan Limit",
      description: "Default number of messages to scan per channel",
      type: "number",
      default: 100,
      min: 10,
      max: 500,
    },
    maxLimit: {
      title: "Maximum Scan Limit",
      description: "Maximum allowed messages per scan",
      type: "number",
      default: 500,
      min: 100,
      max: 1000,
    },
  },
};