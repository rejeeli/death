import { registerCommand } from "@vendetta/commands";
import { findByProps } from "@vendetta/metro";
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

const log = (...args: any[]) => console.log("[Sniper]", ...args);
const logError = (...args: any[]) => console.error("[Sniper]", ...args);

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

// البحث عن دالة جلب الرسائل بكل الطرق الممكنة
const findFetchFunction = () => {
  // الطريقة 1: findByProps("fetchMessages")
  try {
    const api = findByProps("fetchMessages");
    if (api) {
      const keys = Object.keys(api);
      log("findByProps fetchMessages keys:", keys);
      // جرب fetchMessages أولاً
      if (typeof api.fetchMessages === "function") return api.fetchMessages;
      // جرب أي دالة فيها fetch و messages
      for (const key of keys) {
        if (typeof api[key] === "function" && (key.includes("fetch") || key.includes("get"))) {
          log("Trying key:", key);
          return api[key];
        }
      }
    }
  } catch (e) {
    logError("findByProps fetchMessages failed:", e);
  }

  // الطريقة 2: findByProps("getMessages")
  try {
    const api = findByProps("getMessages");
    if (api) {
      const keys = Object.keys(api);
      log("findByProps getMessages keys:", keys);
      if (typeof api.getMessages === "function") return api.getMessages;
      for (const key of keys) {
        if (typeof api[key] === "function" && (key.includes("fetch") || key.includes("get") || key.includes("Message"))) {
          return api[key];
        }
      }
    }
  } catch (e) {
    logError("findByProps getMessages failed:", e);
  }

  // الطريقة 3: findByStoreName("MessageStore")
  try {
    const { findByStoreName } = require("@vendetta/metro");
    const MessageStore = findByStoreName("MessageStore");
    if (MessageStore) {
      const keys = Object.keys(MessageStore);
      log("MessageStore keys:", keys.filter(k => k.includes("fetch") || k.includes("get") || k.includes("Message")));
      for (const key of keys) {
        if (typeof MessageStore[key] === "function" && (key.includes("fetch") || key.includes("get"))) {
          return (channelId: string, options: any) => MessageStore[key](channelId, options);
        }
      }
    }
  } catch (e) {
    logError("MessageStore failed:", e);
  }

  // الطريقة 4: HTTP API مباشرة
  return null;
};

// دالة جلب الرسائل عبر HTTP API
const fetchMessagesHTTP = async (channelId: string, limit: number, before?: string | null): Promise<any[]> => {
  try {
    const { getToken } = findByProps("getToken") || (globalThis as any)?.getToken;
    const token = getToken ? getToken() : null;
    if (!token) throw new Error("No token");

    let url = `https://discord.com/api/v9/channels/${channelId}/messages?limit=${limit}`;
    if (before) url += `&before=${before}`;

    const res = await fetch(url, {
      headers: { Authorization: token, "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (e) {
    logError("HTTP fetch failed:", e);
    return [];
  }
};

const getMessageActions = () => {
  const g = (globalThis as any);
  if (g?.MessageActions && typeof g.MessageActions === "object") return g.MessageActions;
  const bySendOnly = findByProps("sendMessage");
  if (bySendOnly) return bySendOnly;
  const bySendReceive = findByProps("sendMessage", "receiveMessage");
  if (bySendReceive) return bySendReceive;
  const byCreate = findByProps("createMessage", "getMessages");
  if (byCreate) return byCreate;
  return null;
};

const sendMessageAggressive = async (channelId: string, content: string): Promise<{ success: boolean; method?: string; error?: string }> => {
  const MA = getMessageActions();
  if (!MA) return { success: false, error: "MessageActions not found" };

  const msgObj = { content };
  const nonce = Date.now().toString();

  const attempts: { fn: () => any; name: string }[] = [
    { fn: () => MA?.sendMessage?.(channelId, msgObj), name: "sendMessage(channelId, msgObj)" },
    { fn: () => MA?.sendMessage?.(channelId, msgObj, true), name: "sendMessage(channelId, msgObj, true)" },
    { fn: () => MA?.sendMessage?.(channelId, msgObj, undefined, { nonce }), name: "sendMessage(channelId, msgObj, undefined, {nonce})" },
    { fn: () => MA?.createMessage?.(channelId, msgObj), name: "createMessage(channelId, msgObj)" },
    { fn: () => MA?.createMessage?.(channelId, content), name: "createMessage(channelId, content)" },
    { fn: () => MA?.createMessage?.(channelId, msgObj, undefined, { nonce }), name: "createMessage(channelId, msgObj, undefined, {nonce})" },
    { fn: () => MA?.sendMessage?.(channelId, content), name: "sendMessage(channelId, content)" },
    { fn: () => MA?.sendMessage?.(channelId, content, true), name: "sendMessage(channelId, content, true)" },
    { fn: () => (MA.default?.createMessage ? MA.default.createMessage(channelId, msgObj) : undefined), name: "MA.default.createMessage" },
  ];

  let lastError = "";
  for (const attempt of attempts) {
    try {
      const res = attempt.fn();
      if (res && typeof (res as any).then === "function") {
        await res;
      }
      log(`Message sent via: ${attempt.name}`);
      return { success: true, method: attempt.name };
    } catch (err: any) {
      lastError = `${attempt.name}: ${err?.message || String(err)}`;
    }
  }
  return { success: false, error: `All attempts failed. Last: ${lastError}` };
};

let unregister: (() => void) | null = null;

export default {
  onLoad() {
    log("Loading Sniper plugin...");

    unregister = registerCommand({
      name: "snipe",
      displayName: "snipe",
      description: "Scan messages from a user in the current channel for flagged words.",
      displayDescription: "Scan messages from a user in the current channel for flagged words.",
      options: [
        {
          name: "user",
          displayName: "user",
          description: "User to scan",
          displayDescription: "User to scan",
          required: true,
          type: 6,
        },
        {
          name: "limit",
          displayName: "limit",
          description: "Number of messages to scan (max 5000)",
          displayDescription: "Number of messages to scan",
          required: false,
          type: 4,
        },
      ],
      execute: async (args: any[], ctx: any) => {
        try {
          const channel = ctx?.channel;
          if (!channel?.id) {
            return { content: "❌ Channel not found.", ephemeral: true };
          }

          const userId = args[0]?.value;
          if (!userId) {
            return { content: "❌ Please mention a user.", ephemeral: true };
          }

          const messageLimit = Math.min(args[1]?.value || 500, 5000);
          showToast(`Scanning...`, 0);

          // البحث عن دالة الجلب
          const fetchFn = findFetchFunction();
          
          let allMsgs: any[] = [];
          let beforeId: string | null = null;

          if (fetchFn) {
            // استخدام الدالة الموجودة
            log("Using internal fetch function");
            try {
              while (allMsgs.length < messageLimit) {
                const batchLimit = Math.min(100, messageLimit - allMsgs.length);
                const options: any = { limit: batchLimit };
                if (beforeId) options.before = beforeId;

                const batch = await fetchFn(channel.id, options);
                if (!batch || !Array.isArray(batch) || batch.length === 0) break;

                allMsgs = allMsgs.concat(batch);
                beforeId = batch[batch.length - 1]?.id;
                if (batch.length < batchLimit) break;
              }
            } catch (e: any) {
              logError("Internal fetch error:", e?.message);
              return { content: `❌ Fetch error: ${e?.message || String(e)}`, ephemeral: true };
            }
          } else {
            // استخدام HTTP API
            log("Using HTTP API fallback");
            try {
              while (allMsgs.length < messageLimit) {
                const batchLimit = Math.min(100, messageLimit - allMsgs.length);
                const batch = await fetchMessagesHTTP(channel.id, batchLimit, beforeId);
                if (!batch || batch.length === 0) break;

                allMsgs = allMsgs.concat(batch);
                beforeId = batch[batch.length - 1]?.id;
                if (batch.length < batchLimit) break;
              }
            } catch (e: any) {
              logError("HTTP fetch error:", e?.message);
              return { content: `❌ HTTP fetch error: ${e?.message || String(e)}`, ephemeral: true };
            }
          }

          log(`Fetched ${allMsgs.length} messages`);

          const userMsgs = allMsgs.filter((m: any) => m?.author?.id === userId);
          let reportLines: string[] = [];

          for (const m of userMsgs) {
            if (!m?.content) continue;
            const content: string = m.content.toLowerCase();
            const foundWord = FLAGGED_WORDS.find((w) => content.includes(w.toLowerCase()));
            if (foundWord) {
              const guildId = ctx?.guild?.id || "@me";
              const jumpLink = `https://discord.com/channels/${guildId}/${channel.id}/${m.id}`;
              reportLines.push(
                `<@${userId}>: [Jump](${jumpLink}) - \`${foundWord}\``
              );
            }
          }

          if (reportLines.length === 0) {
            await sendMessageAggressive(channel.id, "✅ No flagged messages found.");
            return { content: "", ephemeral: true };
          }

          const chunks = chunkArray(reportLines, 15);
          for (const chunk of chunks) {
            await sendMessageAggressive(channel.id, chunk.join("\n"));
          }

          return { content: "", ephemeral: true };

        } catch (err: any) {
          logError("Unexpected error:", err?.message, err?.stack);
          return { content: `❌ ${err?.message || String(err)}`, ephemeral: true };
        }
      },
    });

    log("Sniper plugin loaded");
  },

  onUnload() {
    if (unregister) {
      try { unregister(); } catch (e) {}
      unregister = null;
    }
  },
};