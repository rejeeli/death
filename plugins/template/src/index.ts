import { registerCommand } from "@vendetta/commands";
import { findByProps, findByStoreName } from "@vendetta/metro";
import { showToast } from "@vendetta/ui/toasts";
import { storage } from "@vendetta/plugin";

const FLAGGED_WORDS: string[] = [
  'cp', 'child porn', 'cheese pizza', 'loli', 'shota', 'jailbait',
  'pedo', 'pedophile', 'grooming', 'groomer', 'minor', 'underage',
  'under age', '14 years old', '15 years old', '16 years old',
  '17 years old', '12 years old', '13 years old', '11 years old',
  '10 years old', '9 years old', '8 years old', '7 years old',
  '6 years old', '5 years old', 'kid', 'kids', 'child', 'children',
  'toddler', 'baby', 'kindergarten', 'preschool', 'primary school',
  'elementary school', 'middle school', 'schoolgirl', 'schoolboy',
  'teen', 'teens', 'teenager', 'teenage', 'adolescent', 'young boy',
  'young girl', 'little boy', 'little girl', 'small boy', 'small girl',
  'infant', 'newborn', 'nursery', 'daycare', 'babysitter', 'babysit',
  'playground', 'sleepover', 'slumber party', 'snap me',
  'add me on snap', 'kik me', 'add my kik', 'telegram link',
  'whatsapp me', 'dm me privately', 'secret chat', 'keep this private',
  'dont tell anyone', 'our little secret', 'just between us',
  'send me pics', 'send me photos', 'show me you', 'show yourself',
  'take a pic', 'take a picture', 'webcam', 'cam with me',
  'video call privately', 'meet up', 'meet irl', 'come to my house',
  'come over', 'address please', 'where do you live', 'where r u',
  'age play', 'ageplay', 'age regression', 'ddlg', 'ddlb', 'mdlg',
  'mdlb', 'abdl', 'nsfw minor', 'teen nsfw', 'child safety', 'csa',
  'csam', 'exploitation', 'incest', 'rape', 'sexual assault',
  'molest', 'molester', 'molestation', 'predator', 'prey', 'hunting',
  'hunt kids', 'favorite age', 'how old', 'whats your age',
  'how old r u', 'ur age', 'ur so young', 'ur cute', 'so cute',
  'innocent', 'innocence', 'pure', 'angel', 'daddy', 'mommy',
  'sugar daddy', 'sugar mommy', 'sugar baby', 'pay for pics',
  'buy pics', 'sell pics', 'trade pics', 'trade nudes', 'send nudes',
  'nude trade', 'nudes for sale', 'onlyfans minor', 'onlyfans teen',
  'patreon minor', 'discord kitten', 'kitten', 'pet play', 'petplay',
  'master', 'mistress', 'slave', 'obey', 'obey me', 'good boy',
  'good girl', 'bad boy', 'bad girl', 'naughty', 'naughty boy',
  'naughty girl', 'punish', 'punishment', 'spank', 'spanking',
  'discipline', 'timeout', 'grounded', 'grounding', 'adult baby',
  'diaper', 'pacifier', 'bottle feed', 'breastfeed', 'breastfeeding',
  'lactation', 'pregnant', 'pregnancy', 'impregnate', 'breeding',
  'fertile', 'virgin', 'virginity', 'first time', 'deflower',
  'cherry pop', 'popping cherry', 'corrupt', 'corrupting',
  'train you', 'training you', 'teach you', 'i will teach',
  'mentor', 'mentoring', 'tutor', 'tutoring', 'private lesson',
  'private tutor', 'one on one', 'alone together', 'alone with me',
  'alone with you', 'no parents', 'parents gone', 'home alone',
  'house empty', 'empty house', 'my parents', 'your parents',
  'parents asleep', 'sneak out', 'sneaking out', 'run away',
  'runaway', 'hide', 'hide this', 'hide chat', 'delete messages',
  'clear chat', 'dont screenshot', 'no screenshots',
  'disappearing messages', 'vanish mode', 'self destruct',
  'burner account', 'alt account', 'fake account', 'fake age',
  'pretend age', 'lie about age', 'roleplay age', 'rp age',
  'age is just', 'age doesnt matter', 'age gap', 'age difference',
  'older man', 'older woman', 'younger man', 'younger woman',
  'big brother', 'big sister', 'step brother', 'step sister',
  'step dad', 'step mom', 'step father', 'step mother', 'uncle',
  'auntie', 'cousin', 'family fun', 'family secret', 'wrestling',
  'tickle', 'tickling', 'massage', 'back rub', 'sleep together',
  'share bed', 'cuddle', 'cuddling', 'snuggle', 'kiss', 'kissing',
  'make out', 'making out', 'touch you', 'touch me', 'feel you',
  'feel me', 'body', 'your body', 'my body', 'hot body',
  'sexy body', 'cute body', 'tight', 'smooth', 'soft', 'hairless',
  'shaved', 'smooth skin', 'soft skin', 'baby skin', 'young skin',
  'youthful', 'boyish', 'girlish', 'childish', 'childlike',
  'petite', 'tiny', 'small', 'short', 'flat chest', 'no curves',
  'skinny', 'thin', 'slim', 'bony', 'frail', 'delicate',
  'fragile', 'weak', 'helpless', 'vulnerable', 'trust me', 'trust',
  'i care', 'i love you', 'love you', 'ily', 'i like you', 'crush',
  'boyfriend', 'girlfriend', 'bf', 'gf', 'dating', 'date me',
  'be mine', 'belong to me', 'youre mine', 'my property',
  'own you', 'i own you', 'possession', 'possess', 'control',
  'controlling', 'manipulate', 'manipulating', 'gaslight',
  'gaslighting', 'blackmail', 'blackmailing', 'threaten',
  'threatening', 'dox', 'doxing', 'expose', 'exposing', 'leak',
  'leaking', 'ruin you', 'destroy you', 'hurt you', 'harm you',
  'kidnap', 'kidnapping', 'abduct', 'abduction', 'traffic',
  'trafficking', 'sell you', 'buy you', 'pimp', 'pimping',
  'prostitute', 'prostitution', 'escort', 'escorting',
  'massage parlor', 'happy ending', 'cp link', 'mega link',
  'drive link', 'dropbox link', 'mega nz', 'mega folder',
  'cp folder', 'cp server', 'cp discord', 'nsfw server',
  'nsfw discord', 'teen server', 'teen leak', 'teen mega',
  'young mega', 'young leak', 'preteen', 'pre teen', 'tween',
  'tweens', 'pubescent', 'puberty', 'developing', 'undeveloped',
  'immature', 'underdeveloped', 'child model', 'child modeling',
  'child actor', 'child pageant', 'beauty pageant', 'bikini kid',
  'bikini child', 'swimsuit kid', 'swimsuit child', 'bath time',
  'bathtime', 'bathroom', 'shower', 'changing room', 'locker room',
  'undress', 'undressing', 'dress up', 'dressing up', 'costume',
  'cosplay minor', 'cosplay teen', 'anime minor', 'anime loli',
  'anime shota', 'hentai minor', 'hentai loli', 'hentai shota',
  'ero loli', 'ero shota', 'furry minor', 'furry cub', 'cub art',
  'cub porn', 'foal', 'foalcon', 'kidfucker', 'childfucker',
  'pedobear', 'pedo bear', 'minor attracted', 'minor attraction',
  'map', 'minor attracted person', 'nomap', 'non offending',
  'nonoffending', 'virtuous pedophile', 'child love', 'child lover',
  'boy love', 'boy lover', 'girl love', 'girl lover', 'bl', 'gl',
  'yl', 'young love', 'true love', 'forbidden love', 'secret love',
  'hidden love', 'taboo', 'taboo love', 'taboo relationship',
  'illegal love', 'illegal relationship', 'age of consent',
  'consent age', 'legal age', 'barely legal', 'just turned',
  'just turned 18', 'fresh 18', 'freshly 18', 'newly 18'
];

const log = (...args: any[]) => console.log("[Sweeper]", ...args);
const logError = (...args: any[]) => console.error("[Sweeper]", ...args);

// البحث عن القنوات بجميع الطرق الممكنة
const getTextChannels = (guildId: string): any[] => {
  // طريقة 1: findByStoreName("ChannelStore")
  try {
    const ChannelStore = findByStoreName("ChannelStore");
    if (ChannelStore) {
      // getGuildChannels
      if (typeof ChannelStore.getGuildChannels === "function") {
        const channels = ChannelStore.getGuildChannels(guildId);
        if (channels) {
          const result = Object.values(channels).filter(
            (c: any) => c?.type === 0 || c?.type === 5
          );
          if (result.length > 0) {
            log("Method 1 (getGuildChannels):", result.length, "channels");
            return result;
          }
        }
      }
      
      // getChannels
      if (typeof ChannelStore.getChannels === "function") {
        const channels = ChannelStore.getChannels();
        if (channels) {
          const values = Array.isArray(channels) ? channels : Object.values(channels);
          const result = values.filter(
            (c: any) => c?.guild_id === guildId && (c?.type === 0 || c?.type === 5)
          );
          if (result.length > 0) {
            log("Method 2 (getChannels):", result.length, "channels");
            return result;
          }
        }
      }

      // getMutableGuildChannels
      if (typeof ChannelStore.getMutableGuildChannels === "function") {
        const channels = ChannelStore.getMutableGuildChannels(guildId);
        if (channels) {
          const values = Array.isArray(channels) ? channels : Object.values(channels);
          const result = values.filter(
            (c: any) => c?.type === 0 || c?.type === 5
          );
          if (result.length > 0) {
            log("Method 3 (getMutableGuildChannels):", result.length, "channels");
            return result;
          }
        }
      }
    }
  } catch (e) {
    logError("ChannelStore methods failed:", e);
  }

  // طريقة 4: استخدام findByProps للبحث عن channels
  try {
    const guildProps = findByProps("getGuild", "getGuilds");
    if (guildProps?.getGuild) {
      const guild = guildProps.getGuild(guildId);
      if (guild?.channels) {
        const values = Array.isArray(guild.channels) ? guild.channels : Object.values(guild.channels);
        const result = values.filter(
          (c: any) => c?.type === 0 || c?.type === 5 || c?.type === "GUILD_TEXT" || c?.type === "GUILD_ANNOUNCEMENT"
        );
        if (result.length > 0) {
          log("Method 4 (getGuild):", result.length, "channels");
          return result;
        }
      }
    }
  } catch (e) {
    logError("getGuild method failed:", e);
  }

  // طريقة 5: global cache
  try {
    const g = globalThis as any;
    if (g?.__dc_cache?.channels) {
      const channels = g.__dc_cache.channels;
      const values = Array.isArray(channels) ? channels : Object.values(channels);
      const result = values.filter(
        (c: any) => c?.guild_id === guildId && (c?.type === 0 || c?.type === 5)
      );
      if (result.length > 0) {
        log("Method 5 (global cache):", result.length, "channels");
        return result;
      }
    }
  } catch {}

  // طريقة 6: استخدام modules المشابهة
  try {
    const channelModule = findByProps("getChannel", "hasChannel");
    if (channelModule) {
      // نجرب getAllChannels إذا وجدت
      const allMethods = Object.keys(channelModule).filter(k => 
        k.toLowerCase().includes("channel") || k.toLowerCase().includes("guild")
      );
      log("Available channel methods:", allMethods);
      
      for (const method of allMethods) {
        try {
          const result = channelModule[method](guildId);
          if (result && typeof result === "object") {
            const values = Array.isArray(result) ? result : Object.values(result);
            const channels = values.filter(
              (c: any) => c && (c?.type === 0 || c?.type === 5 || c?.guild_id === guildId)
            );
            if (channels.length > 0) {
              log(`Method 6 (${method}):`, channels.length, "channels");
              return channels;
            }
          }
        } catch {}
      }
    }
  } catch {}

  return [];
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
          type: 6,
        },
        {
          name: "limit",
          displayName: "limit",
          description: "Number of messages to scan per channel (max 5000)",
          displayDescription: "Number of messages to scan per channel",
          required: false,
          type: 4,
        },
      ],
      execute: async (args: any[], ctx: any) => {
        try {
          const guild = ctx?.guild;
          if (!guild) {
            showToast("This command only works in servers.", 1);
            return { content: "❌ This command only works in servers.", ephemeral: true };
          }

          const userIds: string[] = [];
          if (args[0]?.value) userIds.push(args[0].value);
          
          if (userIds.length === 0) {
            showToast("Please mention at least one user.", 1);
            return { content: "❌ Please mention at least one user.", ephemeral: true };
          }

          const messageLimit = Math.min(args[1]?.value || 500, 5000);

          const textChannels = getTextChannels(guild.id);
          
          

          showToast(`Scanning ${textChannels.length} channels...`, 0);

          let reportLines: string[] = [];
          let totalFound = 0;
          const words = FLAGGED_WORDS;

          for (const userId of userIds) {
            for (const ch of textChannels) {
              try {
                if (!ch?.id) continue;
                
                const messageApi = findByProps("fetchMessages");
                if (!messageApi?.fetchMessages) continue;

                let allMsgs: any[] = [];
                let beforeId: string | null = null;

                while (allMsgs.length < messageLimit) {
                  const batchLimit = Math.min(100, messageLimit - allMsgs.length);
                  const options: any = { limit: batchLimit };
                  if (beforeId) options.before = beforeId;

                  const batch = await messageApi.fetchMessages(ch.id, options);
                  if (!batch || batch.length === 0) break;

                  allMsgs = allMsgs.concat(batch);
                  beforeId = batch[batch.length - 1]?.id;
                  
                  if (batch.length < batchLimit) break;
                }

                const userMsgs = allMsgs.filter((m: any) => m?.author?.id === userId);

                for (const m of userMsgs) {
                  if (!m?.content) continue;
                  
                  const content: string = m.content.toLowerCase();
                  const foundWord = words.find((w) => content.includes(w.toLowerCase()));
                  
                  if (foundWord) {
                    const channelName = ch?.name || "unknown";
                    const jumpLink = `https://discord.com/channels/${guild.id}/${ch.id}/${m.id}`;
                    reportLines.push(
                      `<@${userId}> | #${channelName} | [Jump](${jumpLink}) | \`${foundWord}\``
                    );
                    totalFound++;
                  }
                }
              } catch (e) {}
            }
          }

          if (reportLines.length === 0) {
            return { content: `✅ No flagged messages found.`, ephemeral: true };
          }

          const chunks = chunkArray(reportLines, 15);
          let fullReport = chunks[0].join("\n");
          
          if (chunks.length > 1) {
            fullReport += `\n\n... and ${totalFound - 15} more results.`;
          }

          return { content: fullReport, ephemeral: true };

        } catch (err) {
          logError("Sweep command error:", err);
          return { content: "❌ An error occurred while scanning.", ephemeral: true };
        }
      },
    });

    log("Sweeper plugin loaded successfully");
  },

  onUnload() {
    log("Unloading Sweeper plugin...");
    if (unregister) {
      try { unregister(); } catch (e) { logError("Error:", e); }
      unregister = null;
    }
  },
};

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}