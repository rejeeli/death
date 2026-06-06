import { registerCommand } from "@vendetta/commands";
import { findByProps } from "@vendetta/metro";
import { showToast } from "@vendetta/ui/toasts";

const FLAGGED_WORDS: string[] = [
  // ============ ENGLISH TERMS (500+) ============
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
  'just turned 18', 'fresh 18', 'freshly 18', 'newly 18',

  // ============ ARABIC TERMS (ترجمة الـ 500 كلمة أعلاه) ============
  'سي بي', 'إباحية أطفال', 'بيتزا جبن', 'لولي', 'شوتا', 'جيلبيت',
  'بيدو', 'بيدوفايل', 'استمالة', 'مستغل', 'قاصر', 'تحت السن',
  'تحت العمر', 'عمر 14', 'عمر 15', 'عمر 16',
  'عمر 17', 'عمر 12', 'عمر 13', 'عمر 11',
  'عمر 10', 'عمر 9', 'عمر 8', 'عمر 7',
  'عمر 6', 'عمر 5', 'طفل', 'أطفال', 'صغير', 'صغار',
  'رضيع', 'طفل رضيع', 'روضة', 'تمهيدي', 'مدرسة ابتدائية',
  'مدرسة إعدادية', 'مدرسة متوسطة', 'طالبة', 'تلميذ',
  'مراهق', 'مراهقين', 'مراهقة', 'مرحلة مراهقة', 'شاب صغير',
  'فتاة صغيرة', 'ولد صغير', 'بنت صغيرة', 'طفل صغير', 'طفلة صغيرة',
  'رضيع', 'مولود', 'حضانة', 'رعاية نهارية', 'جليس أطفال', 'مجالسة',
  'ساحة لعب', 'مبيت', 'حفلة مبيت', 'سناب لي',
  'ضفني سناب', 'كيك لي', 'ضف كيكي', 'رابط تليجرام',
  'واتساب لي', 'راسلني خاص', 'محادثة سرية', 'خلي هذا سري',
  'لا تخبر أحد', 'سرنا الصغير', 'فقط بيننا',
  'أرسل لي صور', 'أرسل لي صوراً', 'وريني نفسك', 'أظهر نفسك',
  'التقط صورة', 'خذ صورة', 'كاميرا ويب', 'كام معي',
  'مكالمة فيديو خاصة', 'نتقابل', 'نتقابل واقع', 'تعال بيتي',
  'تعال عندي', 'عنوانك من فضلك', 'أين تعيش', 'أين أنت',
  'تمثيل عمر', 'تمثيل عمري', 'ارتداد عمري', 'ددلج', 'ددلب', 'مدلج',
  'مدلب', 'ايه بي دي ال', 'محتوى غير لائق قاصر', 'مراهق غير لائق', 'سلامة الطفل', 'استغلال',
  'مواد اعتداء', 'استغلال', 'زنا محارم', 'اغتصاب', 'اعتداء جنسي',
  'تحرش', 'متحرش', 'تحرش جنسي', 'مفترس', 'فريسة', 'صيد',
  'اصطياد أطفال', 'عمر مفضل', 'كم عمرك', 'ما هو عمرك',
  'كم عمرك', 'عمرك', 'أنت صغير جداً', 'أنت لطيف', 'لطيف جداً',
  'بريء', 'براءة', 'نقي', 'ملاك', 'بابا', 'ماما',
  'بابا غني', 'ماما غنية', 'طفل مدلل', 'دفع مقابل صور',
  'شراء صور', 'بيع صور', 'تبادل صور', 'تبادل عري', 'إرسال عري',
  'تبادل عري', 'عري للبيع', 'أونلي فانز قاصر', 'أونلي فانز مراهق',
  'باتريون قاصر', 'قطة ديسكورد', 'قطة', 'لعب حيوان أليف', 'لعب حيوان',
  'سيد', 'سيدة', 'عبد', 'أطع', 'أطعني', 'ولد جيد',
  'بنت جيدة', 'ولد شقي', 'بنت شقية', 'شقي', 'ولد شقي',
  'بنت شقية', 'عاقب', 'عقاب', 'صفع', 'ضرب',
  'تأديب', 'وقت عقاب', 'معاقب', 'عقاب أرضي', 'طفل بالغ',
  'حفاظ', 'لهاية', 'رضاعة صناعية', 'رضاعة طبيعية', 'إرضاع',
  'إدرار حليب', 'حامل', 'حمل', 'إخصاب', 'تكاثر',
  'خصب', 'عذراء', 'عذرية', 'أول مرة', 'فض بكارة',
  'بكرة', 'فض البكارة', 'إفساد', 'إفساد أخلاقي',
  'أدربك', 'تدريبك', 'أعلمك', 'سأعلمك',
  'مرشد', 'توجيه', 'مدرس خصوصي', 'دروس خصوصية', 'درس خصوصي',
  'مدرس خاص', 'واحد لواحد', 'وحيدين معاً', 'وحدك معي',
  'وحدي معك', 'لا أهل', 'الأهل غائبون', 'وحيد في المنزل',
  'منزل فارغ', 'منزل خالي', 'والداي', 'والداك',
  'الأهل نائمون', 'تسلل للخارج', 'تسلل', 'اهرب',
  'هارب', 'اختبئ', 'اخف هذا', 'اخف المحادثة', 'احذف الرسائل',
  'امسح الشات', 'لا تصور شاشة', 'لا سكرين شوت',
  'رسائل مختفية', 'وضع الاختفاء', 'تدمير ذاتي',
  'حساب مؤقت', 'حساب بديل', 'حساب وهمي', 'عمر وهمي',
  'تظاهر بالعمر', 'اكذب بشأن العمر', 'تمثيل عمر', 'عمر تمثيلي',
  'العمر مجرد', 'العمر لا يهم', 'فارق العمر', 'فرق العمر',
  'رجل أكبر', 'امرأة أكبر', 'شاب أصغر', 'امرأة أصغر',
  'أخ كبير', 'أخت كبيرة', 'أخ غير شقيق', 'أخت غير شقيقة',
  'زوج الأم', 'زوجة الأب', 'والد غير حقيقي', 'والدة غير حقيقية', 'عم',
  'عمة', 'ابن عم', 'مرح عائلي', 'سر عائلي', 'مصارعة',
  'دغدغة', 'تدغدغ', 'مساج', 'تدليك ظهر', 'نوم معاً',
  'مشاركة سرير', 'حضن', 'معانقة', 'تكبيس', 'قبلة', 'تقبيل',
  'مغازلة', 'معاكسة', 'لمسك', 'لمسني', 'أحس بك',
  'أحس بي', 'جسم', 'جسمك', 'جسمي', 'جسم حار',
  'جسم مثير', 'جسم لطيف', 'مشدود', 'ناعم', 'ناعم الملمس', 'بدون شعر',
  'محلوق', 'بشرة ناعمة', 'بشرة طرية', 'بشرة طفل', 'بشرة شابة',
  'شبابي', 'صبياني', 'بناتي', 'طفولي', 'مثل الأطفال',
  'صغير الحجم', 'ضئيل', 'صغير', 'قصير', 'صدر مسطح', 'بدون منحنيات',
  'نحيف', 'رفيع', 'ممشوق', 'عظمي', 'هزيل', 'رقيق',
  'هش', 'ضعيف', 'عاجز', 'عرضة للخطر', 'ثق بي', 'ثقة',
  'أنا أهتم', 'أحبك', 'أحبك', 'احبك', 'أنا معجب بك', 'إعجاب',
  'صديق', 'صديقة', 'حبيب', 'حبيبة', 'مواعدة', 'واعدني',
  'كن لي', 'انتم لي', 'أنت لي', 'ملكيتي',
  'أمتلكك', 'أنا أمتلكك', 'امتلاك', 'تملك', 'تحكم',
  'مسيطر', 'تلاعب', 'متلاعب', 'تلاعب نفسي',
  'تلاعب نفسياً', 'ابتزاز', 'مبتز', 'تهديد',
  'مهدد', 'كشف', 'كاشف', 'فضح', 'فاضح', 'تسريب',
  'مسرب', 'تدميرك', 'أدمرك', 'أذيتك', 'أذى لك',
  'اختطاف', 'مختطف', 'خطف', 'اختطاف', 'اتجار',
  'متاجرة', 'بيعك', 'شراؤك', 'قواد', 'قوادة',
  'عاهرة', 'دعارة', 'مرافقة', 'مرافقة مدفوعة',
  'صالون مساج', 'نهاية سعيدة', 'رابط سي بي', 'رابط ميجا',
  'رابط درايف', 'رابط دروب بوكس', 'ميجا ان زد', 'مجلد ميجا',
  'مجلد سي بي', 'سيرفر سي بي', 'ديسكورد سي بي', 'سيرفر غير لائق',
  'ديسكورد غير لائق', 'سيرفر مراهقين', 'تسريب مراهقين', 'ميجا مراهقين',
  'ميجا صغار', 'تسريب صغار', 'قبل المراهقة', 'قبل سن المراهقة', 'طفل بين',
  'أطفال بين', 'بالغ', 'بلوغ', 'نمو', 'غير مكتمل النمو',
  'غير ناضج', 'نمو ناقص', 'عارض أطفال', 'عرض أطفال',
  'ممثل طفل', 'مسابقة جمال أطفال', 'مسابقة جمال', 'طفل بالبكيني',
  'طفلة بالبكيني', 'طفل بملابس سباحة', 'طفلة بملابس سباحة', 'وقت الاستحمام',
  'وقت الحمام', 'حمام', 'دش', 'غرفة تبديل ملابس', 'غرفة خزائن',
  'خلع ملابس', 'تعرية', 'ارتداء ملابس', 'تلبيس', 'زي',
  'كوسبلاي قاصر', 'كوسبلاي مراهق', 'أنمي قاصر', 'أنمي لولي',
  'أنمي شوتا', 'هنتاي قاصر', 'هنتاي لولي', 'هنتاي شوتا',
  'إيرو لولي', 'إيرو شوتا', 'فيري قاصر', 'فيري صغير', 'فن صغير',
  'إباحية صغار', 'مهر', 'مهركون', 'منيك أطفال', 'مولع بالأطفال',
  'دبدوب بيدو', 'دب بيدو', 'منجذب للقصر', 'انجذاب للقصر',
  'ماب', 'شخص منجذب للقصر', 'نوماب', 'غير مسيء',
  'غير مؤذ', 'بيدوفايل فاضل', 'حب الأطفال', 'محب أطفال',
  'حب الأولاد', 'محب أولاد', 'حب البنات', 'محبة بنات', 'بي ال', 'جي ال',
  'واي ال', 'حب شاب', 'حب حقيقي', 'حب ممنوع', 'حب سري',
  'حب مخفي', 'تابو', 'حب محرم', 'علاقة محرمة',
  'حب غير قانوني', 'علاقة غير قانونية', 'سن الرضا',
  'عمر الموافقة', 'عمر قانوني', 'بالكاد قانوني', 'أتم للتو',
  'أتم 18 للتو', 'جديد 18', 'طازج 18', 'حديث 18'
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

const findFetchFunction = () => {
  try {
    const api = findByProps("fetchMessages");
    if (api) {
      for (const key of Object.keys(api)) {
        if (typeof api[key] === "function" && (key.toLowerCase().includes("fetch") || key.toLowerCase().includes("get"))) {
          log(`Found fetch function: ${key}`);
          return api[key].bind(api);
        }
      }
    }
  } catch (e) {}

  try {
    const api = findByProps("getMessages");
    if (api) {
      for (const key of Object.keys(api)) {
        if (typeof api[key] === "function" && (key.toLowerCase().includes("fetch") || key.toLowerCase().includes("get"))) {
          log(`Found fetch function: ${key}`);
          return api[key].bind(api);
        }
      }
    }
  } catch (e) {}

  return null;
};

const fetchMessagesREST = async (channelId: string, limit: number, before?: string | null): Promise<any[]> => {
  try {
    let token = null;
    
    try {
      const authModule = findByProps("getToken");
      if (authModule?.getToken) token = authModule.getToken();
    } catch {}
    
    if (!token) {
      try {
        const g = globalThis as any;
        if (g?.token) token = g.token;
      } catch {}
    }

    if (!token) {
      logError("No token found for REST API");
      return [];
    }

    let url = `https://discord.com/api/v9/channels/${channelId}/messages?limit=${limit}`;
    if (before) url += `&before=${before}`;

    const res = await fetch(url, {
      headers: { Authorization: token },
    });

    if (!res.ok) {
      logError(`REST API error: ${res.status} ${res.statusText}`);
      return [];
    }

    const data = await res.json();
    log(`REST fetched: ${data?.length || 0} messages`);
    return Array.isArray(data) ? data : [];
  } catch (e: any) {
    logError("REST fetch error:", e?.message);
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

const sendMessageAggressive = async (channelId: string, content: string): Promise<boolean> => {
  const MA = getMessageActions();
  if (!MA) return false;

  const msgObj = { content };
  const nonce = Date.now().toString();

  const attempts = [
    () => MA.sendMessage?.(channelId, msgObj),
    () => MA.sendMessage?.(channelId, msgObj, true),
    () => MA.sendMessage?.(channelId, msgObj, undefined, { nonce }),
    () => MA.createMessage?.(channelId, msgObj),
    () => MA.createMessage?.(channelId, content),
    () => MA.createMessage?.(channelId, msgObj, undefined, { nonce }),
    () => MA.sendMessage?.(channelId, content),
    () => MA.sendMessage?.(channelId, content, true),
  ];

  for (const attempt of attempts) {
    try {
      const res = attempt();
      if (res && typeof res.then === "function") await res;
      return true;
    } catch {}
  }
  return false;
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

          let allMsgs: any[] = [];
          let beforeId: string | null = null;

          while (allMsgs.length < messageLimit) {
            const batchLimit = Math.min(100, messageLimit - allMsgs.length);
            let batch = await fetchMessagesREST(channel.id, batchLimit, beforeId);
            if (batch.length === 0) break;
            allMsgs = allMsgs.concat(batch);
            beforeId = batch[batch.length - 1]?.id;
            if (batch.length < batchLimit) break;
          }

          log(`Total messages fetched: ${allMsgs.length}`);
          
          const userMsgs = allMsgs.filter((m: any) => {
            const authorId = m?.author?.id || m?.author_id || m?.author?.user_id || "";
            return authorId === userId;
          });
          
          log(`User ${userId} messages: ${userMsgs.length}`);

          let reportLines: string[] = [];

          for (const m of userMsgs) {
            const msgContent = m?.content || "";
            if (!msgContent) continue;
            
            const contentLower = msgContent.toLowerCase();
            const foundWord = FLAGGED_WORDS.find((w) => contentLower.includes(w.toLowerCase()));
            
            if (foundWord) {
              const guildId = ctx?.guild?.id || "@me";
              const jumpLink = `https://discord.com/channels/${guildId}/${channel.id}/${m.id}`;
              reportLines.push(
                `<@${userId}>: [Jump](${jumpLink}) - \`${foundWord}\``
              );
            }
          }

          log(`Flagged messages found: ${reportLines.length}`);

          if (reportLines.length === 0) {
            const debugMsg = `✅ No flagged messages found.\nScanned: ${allMsgs.length} msgs, ${userMsgs.length} from user.`;
            await sendMessageAggressive(channel.id, debugMsg);
            return { content: "", ephemeral: true };
          }

          const chunks = chunkArray(reportLines, 15);
          for (const chunk of chunks) {
            await sendMessageAggressive(channel.id, chunk.join("\n"));
          }

          return { content: "", ephemeral: true };

        } catch (err: any) {
          logError("Error:", err?.message, err?.stack);
          return { content: `❌ ${err?.message || "Unknown error"}`, ephemeral: true };
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