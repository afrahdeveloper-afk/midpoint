// Ported verbatim from the original midpoint.html.
import type { MatKey } from "./images";

/** A product line: [English title, English text, Arabic title, Arabic text]. */
export type BrandLine = [enTitle: string, enText: string, arTitle: string, arText: string];

/** A heritage timeline milestone: [year or short label, English title, English text, Arabic title, Arabic text]. */
export type TimelineItem = [year: string, enTitle: string, enText: string, arTitle: string, arText: string];

export interface BrandDetail {
  /** Index into BRANDS. */
  i: number;
  /** Year founded (shown in the facts row); falls back to `hq` when null. */
  year: string | null;
  /** Index into PRODUCTS: the brand's speciality category. */
  cat: number;
  /** Media for each product line (cycled) and for the hero slider. */
  mats: MatKey[];
  /** First hero slide (defaults to mats[0]). */
  hero?: MatKey;
  /** Which line the hero slide illustrates (defaults to mats.indexOf(hero)). */
  heroLi?: number;
  /** Headquarters: [English, Arabic]. */
  hq?: [en: string, ar: string];
  /** Company introduction. */
  en: string;
  ar: string;
  lines: BrandLine[];
  /** Extra gallery photos (hero mosaic + lightbox), after the hero and line images: [image, line index or -1]. */
  extra?: [key: MatKey, li: number][];
  /** Heritage timeline (the section is hidden without it). */
  tl?: TimelineItem[];
}

/** Brand page content, keyed by slug (was `BDATA`). */
export const BDATA: Record<string, BrandDetail> = {
  roca: {
    i: 0,
    year: "1917",
    cat: 4,
    mats: ["roca_ohtake", "roca_nu", "roca_plenum", "roca_tenet", "roca_inwall", "roca_multiclean"],
    hero: "roca_ohtake",
    extra: [
      ["roca_freestanding", 2], // showers, baths and trays
      ["roca_shower_column", 2],
      ["roca_accessories", -1], // no accessories line: labelled with the category
      ["roca_basin_black", 0], // basins (replaces roca_basin, too soft)
      ["roca_tenet_room", 3], // bathroom furniture
      ["roca_avant", 4], // toilets
    ],
    hq: ["Barcelona", "برشلونة"],
    en: "Roca was founded in 1917 in Gavà, near Barcelona, making cast-iron radiators, and went on to specialise in the bathroom. Today it is a family-owned global leader in sanitaryware and ceramic tiles, present in around 170 markets. It offers complete bathroom solutions, from toilets, basins, furniture and faucets to bathtubs and shower trays.",
    ar: "تأسست روكا عام 1917 في غافا قرب برشلونة، وبدأت بتصنيع مشعات الحديد الزهر، ثم تخصصت في الحمامات. وهي اليوم شركة عائلية رائدة عالميًا في الأدوات الصحية والبلاط السيراميك، حاضرة في نحو 170 سوقًا. تقدّم حلولًا متكاملة للحمام، من المراحيض والأحواض والأثاث والخلاطات إلى الأحواض الاستحمامية وأطباق الدش.",
    lines: [
      [
        "Basins",
        "Countertop, wall-hung and furniture basins, including Ruy Ohtake by Roca in Fineceramic®, inspired by waves, the horizon and the egg.",
        "المغاسل",
        "مغاسل سطحية ومعلّقة ومدمجة مع الأثاث، منها مجموعة Ruy Ohtake من Fineceramic® المستوحاة من الأمواج والأفق وشكل البيضة.",
      ],
      [
        "Faucets",
        "High-quality, durable mixers made with Roca's exclusive alloys, such as Targa and the square-shaped Kay.",
        "الخلاطات",
        "خلاطات عالية الجودة ومتينة مصنوعة من سبائك روكا الخاصة، مثل Targa وKay ذات التصميم المربع.",
      ],
      [
        "Showers, baths and trays",
        "Hand-showers, shower-heads and sets, baths with hydromassage options, and shower trays in many shapes and finishes.",
        "الشاورات والأحواض",
        "شاورات يدوية ورؤوس وأطقم شاور، وأحواض استحمام بخيارات تدليك مائي، وقواعد شاور بأشكال ولمسات متعددة.",
      ],
      [
        "Bathroom furniture",
        "Base, vanity and auxiliary units in resistant materials, with collections such as The Gap and Meridian.",
        "أثاث الحمّامات",
        "وحدات أرضية ووحدات مغاسل ووحدات مساعدة من مواد متينة، بمجموعات مثل The Gap وMeridian.",
      ],
      [
        "Toilets",
        "Vitreous china toilets: two-piece, wall-hung, floor-standing and In-Tank, including Avant with an integrated cistern that frees up space.",
        "المراحيض",
        "مراحيض من البورسلين الصحي: بقطعتين ومعلّقة وأرضية وIn-Tank، ومنها Avant بخزان مدمج يوفّر المساحة.",
      ],
      [
        "Smart toilets",
        "In-Wash smart toilets and Multiclean shower seats for cleansing and comfort.",
        "المراحيض الذكية",
        "مراحيض In-Wash الذكية ومقاعد Multiclean بشطاف مدمج للنظافة والراحة.",
      ],
    ],
    tl: [
      [
        "1917",
        "Founded in Gavà",
        "The Roca brothers start making cast-iron radiators near Barcelona.",
        "التأسيس في غافا",
        "الإخوة روكا يبدؤون صناعة المشعّات الحديدية قرب برشلونة.",
      ],
      [
        "1929",
        "Into the bathroom",
        "Production of cast-iron baths marks Roca's entry into the bathroom.",
        "دخول عالم الحمّام",
        "إنتاج أحواض الاستحمام الحديدية يفتح لروكا باب قطاع الحمّامات.",
      ],
      [
        "1936",
        "Vitreous china",
        "Roca begins producing vitreous china sanitaryware.",
        "البورسلين الصحي",
        "روكا تبدأ إنتاج الأدوات الصحية من البورسلين.",
      ],
      [
        "1954",
        "Faucets",
        "Manufacturing of taps begins.",
        "الخلاطات",
        "بدء تصنيع الخلاطات.",
      ],
      [
        "1999",
        "Laufen",
        "Acquisition of Keramik Holding Laufen, the world's fourth-largest vitreous china maker.",
        "لاوفن",
        "الاستحواذ على مجموعة Laufen السويسرية، رابع أكبر مصنّع للبورسلين الصحي في العالم.",
      ],
      [
        "2006",
        "World leader",
        "Roca becomes the global leader in the bathroom sector.",
        "الريادة العالمية",
        "روكا تصبح الشركة الرائدة عالمياً في قطاع الحمّامات.",
      ],
      [
        "2017",
        "Centenary",
        "Roca celebrates 100 years since its founding.",
        "مئوية روكا",
        "روكا تحتفل بمرور 100 عام على تأسيسها.",
      ],
    ],
  },
  toto: {
    i: 1,
    year: "1917",
    cat: 5,
    mats: ["toto_washlet", "toto_garden", "toto_smart", "toto_bath", "toto_nature", "toto_taps"], // toto_acc removed (low quality)
    hero: "toto_nature",
    extra: [
      ["toto_faucet_stone", 5], // faucets and showers
      ["toto_faucet_flatlay", 5],
      ["toto_inwall", 2], // toilets
      ["toto_vessel_basins", 4], // lavatories
      ["toto_color_basins", 4],
      ["toto_washlet_rx", 0], // WASHLET
      ["toto_vessels", 4], // lavatories (toto_lav left out: same photo as toto_vessel_basins)
    ],
    hq: ["Kitakyushu", "كيتاكيوشو"],
    en: "TOTO is a Japanese company founded in 1917 and based in Kitakyushu, and Japan's first specialist manufacturer of ceramic sanitaryware. It is known worldwide for its WASHLET, with more than 50 million units sold around the world. Focused on hygiene, comfort and water saving, it offers toilets, basins, bathtubs and showers.",
    ar: "توتو شركة يابانية تأسست عام 1917 ومقرها كيتاكيوشو، وتُعد أول مصنّع ياباني متخصص في الأدوات الصحية الخزفية. اشتهرت عالميًا بمنتجها WASHLET، وقد بيع منه أكثر من 50 مليون وحدة حول العالم. تركّز على النظافة والراحة وتوفير المياه، وتقدّم مراحيض وأحواضًا وأحواض استحمام ودشات.",
    lines: [
      [
        "WASHLET",
        "TOTO's signature shower toilet seat since 1980, with warm-water cleansing, a heated seat and deodoriser; WASHLET+ combines toilet and seat as one.",
        "WASHLET",
        "مقعد الشطاف الذكي الأشهر من توتو منذ 1980، بشطاف بماء دافئ ومقعد مدفّأ ومزيل روائح، وWASHLET+ يجمع المرحاض والمقعد كوحدة واحدة.",
      ],
      [
        "Smart toilets",
        "Integrated smart toilets that bring cleansing, comfort and automatic features together in one sculpted form.",
        "المراحيض الذكية",
        "مراحيض ذكية متكاملة تجمع التنظيف والراحة والخصائص التلقائية في تصميم واحد انسيابي.",
      ],
      [
        "Toilets",
        "Floor-standing and wall-hung toilets with easy-clean glazes and in-wall systems.",
        "المراحيض",
        "مراحيض أرضية ومعلّقة بطلاء سهل التنظيف مع أنظمة تثبيت مخفية.",
      ],
      [
        "Bathtubs",
        "Freestanding and built-in baths, including the Flotation Tub shaped for a floating posture.",
        "أحواض الاستحمام",
        "أحواض مستقلة ومدمجة، ومنها حوض الطفو المصمّم لوضعية استرخاء تشبه الطفو.",
      ],
      ["Lavatories", "Vessel, countertop and wall-hung basins in refined ceramic.", "المغاسل", "مغاسل علوية وسطحية ومعلّقة من سيراميك راقٍ."],
      [
        "Faucets and showers",
        "Basin mixers and rain showerheads designed to save water.",
        "الخلاطات والشاورات",
        "خلاطات مغاسل ورؤوس شاور مطرية مصمّمة لترشيد المياه.",
      ],
    ],
    tl: [
      [
        "1917",
        "Founded in Kitakyushu",
        "TOTO begins producing ceramic sanitaryware in Japan.",
        "التأسيس في كيتاكيوشو",
        "توتو تبدأ إنتاج الأدوات الصحية الخزفية في اليابان.",
      ],
      [
        "1980",
        "WASHLET is born",
        "The warm-water cleansing seat that changed bathroom culture.",
        "ولادة WASHLET",
        "مقعد الشطاف بالماء الدافئ الذي غيّر ثقافة الحمّام.",
      ],
      [
        "1987",
        "First integrated WASHLET",
        "WASHLET QUEEN, the first toilet with WASHLET built in.",
        "أول WASHLET مدمج",
        "WASHLET QUEEN، أول مرحاض بشطاف مدمج.",
      ],
      [
        "1993",
        "NEOREST",
        "The first tankless toilet design, with electronic flush control.",
        "NEOREST",
        "أول تصميم مرحاض بدون خزان، مع تحكّم إلكتروني بالسيفون.",
      ],
      [
        "1997",
        "CEFIONTECT",
        "An ultra-smooth glaze that leaves nowhere for waste to cling.",
        "CEFIONTECT",
        "طلاء فائق النعومة لا يسمح للأوساخ بالالتصاق.",
      ],
      [
        "2002",
        "Tornado Flush",
        "The first rimless toilet with the powerful Tornado Flush.",
        "Tornado Flush",
        "أول مرحاض بدون حافة مع نظام السيفون الإعصاري.",
      ],
      [
        "2022",
        "60 million WASHLET",
        "60 million WASHLET units sold worldwide since 1980.",
        "60 مليون WASHLET",
        "بيع 60 مليون وحدة WASHLET حول العالم منذ 1980.",
      ],
    ],
  },
  laminam: {
    i: 2,
    year: "2001",
    cat: 0,
    mats: ["laminam_interior", "laminam_wood", "laminam_kitchen", "laminam_table", "laminam_facade"],
    extra: [
      ["laminam_pool", 0], // wall cladding
      ["laminam_bath_walls", 0],
      ["laminam_stairs", 1], // flooring
      ["laminam_kitchen_grey", 2], // kitchen worktops
      ["laminam_kitchen_gold", 2],
      ["laminam_sink", 2],
      ["laminam_outdoor", 3], // furnishing elements
    ],
    hq: ["Fiorano Modenese", "فيورانو مودينيزي"],
    en: "Laminam is a leading Italian brand in large, thin ceramic slabs that redefine the traditional uses of the material. Its surfaces draw on nature and go beyond it, in a wide range of effects including marble, stone, concrete, metal, wood and solid colours.\n\nLaminam slabs suit wall cladding, flooring, kitchen tops, furniture and exterior façades, combining beauty, durability and high performance. Through its partnership with Automobili Lamborghini, it offers an exclusive line of luxury surfaces that reflects Italian excellence in design and quality.",
    ar: "لامينام علامة إيطالية رائدة في إنتاج ألواح السيراميك كبيرة الحجم ورقيقة السماكة، تعيد تعريف الاستخدامات التقليدية لهذه المادة. تقدّم أسطحًا مستوحاة من الطبيعة وتتجاوزها، بتشكيلة واسعة من التأثيرات، منها الرخام والحجر والخرسانة والمعدن والخشب والألوان السادة.\n\nتناسب ألواح لامينام تكسية الجدران والأرضيات وأسطح المطابخ وعناصر الأثاث والواجهات الخارجية، وتجمع بين الجمال والمتانة والأداء العالي. وبفضل شراكتها مع Automobili Lamborghini، تقدّم خطًا خاصًا من الأسطح الفاخرة يعكس التميز الإيطالي في التصميم والجودة.",
    lines: [
      ["Wall cladding", "Continuous surfaces for interior walls.", "تكسية الجدران", "أسطح متصلة للجدران الداخلية."],
      ["Flooring", "Large, thin slabs for open floors.", "الأرضيات", "ألواح كبيرة ورقيقة للأرضيات المفتوحة."],
      ["Kitchen worktops", "Countertops with a dedicated warranty programme.", "أسطح المطابخ", "أسطح عمل مع برنامج ضمان خاص بها."],
      ["Furnishing elements", "Tables, doors and furniture surfaces.", "عناصر الأثاث", "طاولات وأبواب وأسطح أثاث."],
      ["Façade cladding", "Ventilated and exterior façade systems.", "تكسية الواجهات", "أنظمة الواجهات الخارجية والمهوّاة."],
    ],
    tl: [
      [
        "2001",
        "Founded",
        "Laminam is founded in Fiorano Modenese, Italy.",
        "التأسيس",
        "تأسيس لامينام في فيورانو مودينيزي بإيطاليا.",
      ],
      [
        "Slabs",
        "Large and thin",
        "Large ceramic slabs with minimum thickness challenge traditional uses of ceramics.",
        "ألواح كبيرة ورقيقة",
        "ألواح سيراميك كبيرة بأقل سماكة تتجاوز الاستخدامات التقليدية.",
      ],
      [
        "Today",
        "Architecture to furniture",
        "Façades, interiors, kitchen tops and furnishing elements worldwide.",
        "من العمارة إلى الأثاث",
        "واجهات وتصميم داخلي وأسطح مطابخ وأثاث حول العالم.",
      ],
    ],
  },
  "infinity-surfaces": {
    i: 3,
    year: null,
    cat: 0,
    mats: ["inf_patinato", "inf_satin", "inf_floor", "inf_island", "inf_onyx"],
    hero: "inf_pietra",
    extra: [
      ["inf_kitchen", 0], // kitchen tops
      ["inf_rosso", 0],
      ["inf_vanity", 1], // bathroom vanities
      ["inf_pietra", 1],
      ["inf_agate_bath", 2], // floors and walls
      ["inf_agate", 2],
      ["inf_green", 3], // custom furniture
    ],
    hq: ["Pavullo nel Frignano", "بافولو نيل فرينيانو"],
    en: "An Italian company specialising in large-format, ultra-compact porcelain slabs (up to 1620×3240 mm) in 6 and 12 mm thicknesses, drawing on the expertise of the Concorde group, a leader in Italian ceramics. Its slabs are used for kitchen tops, furniture, floors, cladding and façades, combining aesthetics with technical performance.",
    ar: "شركة إيطالية متخصصة في ألواح البورسلان فائقة الكثافة كبيرة الحجم (حتى 1620×3240 مم) بسماكة 6 و12 مم، وتنبع من خبرة مجموعة Concorde الرائدة في السيراميك الإيطالي. تُستخدم لأسطح المطابخ والأثاث والأرضيات والتكسية والواجهات، وتجمع بين الجمالية والأداء التقني.",
    lines: [
      ["Kitchen tops", "Non-porous tops resistant to heat, stains and scratches.", "أسطح المطابخ", "أسطح غير مسامية مقاومة للحرارة والبقع والخدوش."],
      ["Bathroom vanities", "Vanity tops and wall surfaces in matching slabs.", "أسطح المغاسل", "أسطح مغاسل وجدران من نفس الألواح."],
      ["Floors and walls", "Large formats with minimal joints.", "الأرضيات والجدران", "مقاسات كبيرة بأقل عدد من الفواصل."],
      ["Custom furniture", "Tables, shelves and bespoke pieces.", "الأثاث حسب الطلب", "طاولات ورفوف وقطع مفصّلة."],
      ["Façades", "Slabs for exterior and ventilated façades.", "الواجهات", "ألواح للواجهات الخارجية والمهوّاة."],
    ],
  },
  argenta: {
    i: 4,
    year: "1999",
    cat: 1,
    mats: ["arg_stone", "arg_marble", "arg_wood", "arg_concrete", "arg_rustic", "arg_texture"],
    hero: "arg_wood",
    extra: [
      ["arg_terrazzo_bath", 0], // stone looks
      ["arg_blue_niche", 4], // rustic and forms
      ["arg_fluted_tiles", 5], // textures
    ],
    hq: ["L'Alcora", "لالكورا"],
    en: "Argenta Cerámica is a Spanish company founded in 1999 in L'Alcora, Castellón, built on customer focus and modern technology. It is part of the Argenta group, which also includes Cifre Cerámica, Azuvi and Zenon. It runs six factories in Castellón's ceramic triangle and offers wall and floor tiles in contemporary designs and a wide range of sizes.",
    ar: "أرجنتا سيراميكا شركة إسبانية تأسست عام 1999 في لالكورا بمقاطعة كاستيون، وتعتمد على التركيز على العميل والتقنيات الحديثة. وهي جزء من مجموعة Argenta التي تضم علامات Cifre Cerámica وAzuvi وZenon. تدير ست مصانع في مثلث السيراميك بكاستيون، وتقدّم بلاط جدران وأرضيات بتصاميم عصرية وأحجام متنوعة.",
    lines: [
      [
        "Stone looks",
        "Bergstein, Island, Leeds, Milos and Gradine: calm, mineral surfaces inspired by natural stone.",
        "مظهر الحجر",
        "مجموعات Bergstein وIsland وLeeds وMilos وGradine: أسطح هادئة مستوحاة من الأحجار الطبيعية.",
      ],
      [
        "Marble looks",
        "Raffaello, Nesta and Negresco: from soft ivory marble to Calacatta and dramatic dark veining.",
        "مظهر الرخام",
        "مجموعات Raffaello وNesta وNegresco: من الرخام العاجي الناعم إلى الكالاكاتا والعروق الداكنة.",
      ],
      [
        "Wood looks",
        "Dagen: rectified 20×120 cm porcelain planks with natural oak grain, in Maple, Beech and Oak.",
        "مظهر الخشب",
        "مجموعة Dagen: ألواح بورسلين مشذّبة 20×120 سم بعروق البلوط الطبيعية، بدرجات Maple وBeech وOak.",
      ],
      [
        "Concrete looks",
        "Metropoli and Volux: smooth, uniform cement-inspired surfaces for calm interiors.",
        "مظهر الإسمنت",
        "مجموعتا Metropoli وVolux: أسطح ناعمة ومتجانسة مستوحاة من الإسمنت للمساحات الهادئة.",
      ],
      [
        "Rustic and Forms",
        "Ossido, Met and Home: reactive glazes, small formats, colour and volume for spaces with identity.",
        "ريفي وأشكال",
        "مجموعات Ossido وMet وHome: تزجيج متفاعل ومقاسات صغيرة وألوان وأحجام لمساحات ذات هوية.",
      ],
      [
        "Textures",
        "Relief and 3D wall tiles that add depth, light and rhythm to a room.",
        "الملمس",
        "بلاط جدران بارز وثلاثي الأبعاد يضيف عمقاً وضوءاً وإيقاعاً للمساحة.",
      ],
    ],
    tl: [
      [
        "1999",
        "Founded in L'Alcora",
        "A young, people-friendly ceramic concept is born in Spain.",
        "التأسيس في لالكورا",
        "ولادة مفهوم سيراميك شاب وقريب من الناس في إسبانيا.",
      ],
      [
        "Looks",
        "Six material worlds",
        "Stone, marble, wood, concrete, rustic and textures.",
        "ستة عوالم للمواد",
        "حجر ورخام وخشب وإسمنت وريفي وملمس.",
      ],
      [
        "2026",
        "General Catalogue 2026",
        "New collections, including stonetech porcelain such as San Vicente.",
        "كتالوج 2026",
        "مجموعات جديدة، منها بورسلين stonetech مثل San Vicente.",
      ],
    ],
  },
  benadresa: {
    i: 5,
    year: null,
    cat: 1,
    mats: ["ab_wood", "ab_white", "ab_xlab"],
    hero: "ab_marble",
    extra: [["ab_marble", 0]], // porcelain body tiles
    heroLi: 0,
    en: "Azulejos Benadresa (AB) is a Spanish maker of ceramic and porcelain tiles, built on a philosophy of constant evolution. Its innovative collections in many sizes, textures and colours give each client the freedom to shape their own style in any space. A precise manufacturing process, the best raw materials and the latest technology have taken it to more than 100 countries. It's time to create, it's time of AB.",
    ar: "أثوليخوس بينادريسا (AB) شركة إسبانية متخصصة في تصنيع بلاط السيراميك والبورسلان، وتقوم هويتها على فلسفة «التطوّر المستمر». تقدّم مجموعات مبتكرة بأحجام وملمس وألوان متعددة، لتمنح العميل حرية صياغة أسلوبه الخاص في أي مساحة. وبفضل عملية تصنيع دقيقة، واختيار أفضل المواد الخام، وأحدث التقنيات، أصبحت حاضرة في أكثر من 100 دولة. شعارها: It's time to create, it's time of AB.",
    lines: [
      [
        "Porcelain body tiles",
        "Porcelain tiles in red body and white body, including the new TOGA, TESSINO and RAVENA collections.",
        "بلاط البورسلان",
        "بلاط بورسلان بجسم أحمر وجسم أبيض، ومنه المجموعات الجديدة TOGA وTESSINO وRAVENA.",
      ],
      ["White body", "White-body ceramic tiles.", "الجسم الأبيض", "بلاط سيراميك بجسم أبيض."],
      ["XLAB", "Large-format slabs.", "XLAB", "ألواح كبيرة الحجم."],
    ],
    tl: [
      [
        "AB",
        "Constant evolution",
        "Innovative collections in many sizes, textures and colours.",
        "تطوّر دائم",
        "مجموعات مبتكرة بمقاسات وملمس وألوان متعددة.",
      ],
      [
        "100+",
        "Global reach",
        "Present in more than a hundred countries.",
        "انتشار عالمي",
        "متواجدة في أكثر من مئة دولة.",
      ],
      [
        "2026",
        "Cersaie 2026",
        "Five new collections in Bologna: FRAGMENTA, THOLOS, IMPULSE, SABINE and TORINO.",
        "Cersaie 2026",
        "5 مجموعات جديدة في بولونيا: FRAGMENTA وTHOLOS وIMPULSE وSABINE وTORINO.",
      ],
    ],
  },
  alaplana: {
    i: 6,
    year: null,
    cat: 1,
    mats: ["ala_denver_white", "ala_santa_monica", "ala_cartago", "ala_compact_bone", "ala_bodo", "ala_campaspero_sand"],
    hero: "ala_santa_monica",
    extra: [
      ["ala_denver_ivory", 0], // glazed porcelain
      ["ala_campaspero_bone", 4], // coloured body, 20 mm outdoor
    ],
    en: "A Spanish ceramic brand belonging to Azulejera La Plana S.A. It invests in quality, design and innovation with a commitment to social responsibility, using efficient, sustainable manufacturing that protects the environment. It offers refined, contemporary and versatile products suited to every kind of space.",
    ar: "علامة إسبانية للسيراميك (تتبع شركة Azulejera La Plana S.A.). تستثمر في الجودة والتصميم والابتكار مع الالتزام بالمسؤولية الاجتماعية، وتعتمد عمليات تصنيع فعّالة ومستدامة تحمي البيئة. تقدّم منتجات راقية وعصرية ومتعددة الاستخدامات تناسب مختلف المساحات.",
    lines: [
      ["Glazed porcelain", "Porcelain tiles with a glazed decorative surface.", "بورسلين مزجج", "بلاط بورسلين بسطح زخرفي مزجج."],
      ["Wall tiles", "Ceramic wall coverings.", "بلاط الجدران", "تكسيات جدران سيراميك."],
      ["Stoneware", "Durable stoneware for floors.", "الغريس", "بلاط غريس متين للأرضيات."],
      ["White body", "White-body ceramic tiles.", "العجينة البيضاء", "بلاط سيراميك بعجينة بيضاء."],
      ["Coloured body", "Through-coloured porcelain for high-traffic areas.", "العجينة الملوّنة", "بورسلين ملوّن بكامل سماكته للأماكن كثيرة الحركة."],
      ["Large-format porcelain", "Big porcelain pieces for continuous surfaces.", "بورسلين بمقاسات كبيرة", "قطع بورسلين كبيرة لأسطح متصلة."],
    ],
  },
  mayolica: {
    i: 7,
    year: null,
    cat: 2,
    mats: ["may_small", "may_subway", "may_rustic", "may_hydraulic"],
    hero: "may_subway",
    hq: ["L'Alcora", "لالكورا"],
    en: "Mayolica is a Spanish company born in the heart of Spain's ceramic industry, based in L'Alcora, Castellón. It specialises in high-quality small-format wall and floor tiles under the motto \"Small tiles, big ideas\". It offers a wide range of decorative products for kitchens, bathrooms and more, in styles including Subway, Color, Rústico and Hidráulico, with new collections presented at Cersaie 2026 such as MOON, STRATA and STRIPES.",
    ar: "مايوليكا شركة إسبانية وُلدت في قلب صناعة السيراميك في إسبانيا، ومقرها لالكورا بمقاطعة كاستيون. تتخصص في إنتاج سيراميك عالي الجودة للجدران والأرضيات بالأحجام الصغيرة (Small Tiles)، تحت شعار \"قطع صغيرة، أفكار كبيرة\". تقدّم تشكيلة واسعة من المنتجات المزخرفة لتكسية المطابخ والحمامات وغيرها، بأنماط متنوعة منها Subway وColor وRústico وHidráulico، ومجموعات جديدة قُدمت في معرض Cersaie 2026 مثل MOON وSTRATA وSTRIPES.",
    lines: [
      [
        "Small format tiles",
        "Small sizes for big ideas: quality wall and floor tiles in compact formats such as Cadaqués 7×28 and 12×12.",
        "البلاط صغير المقاس",
        "مقاسات صغيرة لأفكار كبيرة: بلاط جدران وأرضيات عالي الجودة بمقاسات مدمجة مثل Cadaqués بمقاس 7×28 و12×12.",
      ],
      ["Subway tiles", "Metro-style tiles for elegant, modern spaces.", "بلاط سبواي", "بلاط بطراز المترو لمساحات أنيقة وعصرية."],
      ["Rustic", "Handmade-look tiles with a traditional, comfortable style.", "ريفي", "بلاط بمظهر يدوي يمنح طابعاً تقليدياً ودافئاً."],
      [
        "Hydraulic tiles",
        "Classic encaustic-style patterns, like Matanzas Patchwork, that never go out of fashion.",
        "البلاط الهيدروليكي",
        "نقوش كلاسيكية بطراز البلاط الهيدروليكي، مثل Matanzas Patchwork، لا تخرج عن الموضة.",
      ],
    ],
    tl: [
      [
        "L'Alcora",
        "Born in ceramic country",
        "Rooted in the heart of Spain's ceramic district.",
        "من قلب السيراميك",
        "وُلدت في قلب منطقة السيراميك الإسبانية.",
      ],
      [
        "Styles",
        "Four styles",
        "Small formats, subway, rustic and hydraulic tiles.",
        "أربعة أنماط",
        "بلاط صغير المقاس وسبواي وريفي وهيدروليكي.",
      ],
      [
        "2026",
        "Cersaie 2026",
        "New collections Moon, Formentera, Stripes, Strata and Vulcano.",
        "Cersaie 2026",
        "مجموعات جديدة: Moon وFormentera وStripes وStrata وVulcano.",
      ],
    ],
  },
  vidrepur: {
    i: 8,
    year: null,
    cat: 3,
    mats: ["vid_pool", "vid_blue_bath", "vid_hex"],
    hero: "vid_blue_bath",
    heroLi: 1, // glass mosaic
    extra: [
      ["vid_pool_out", 0], // pool mosaic
      ["vid_garden_pool", 0],
      ["vid_indoor_pool", 0],
      ["vid_mint_bath", 1], // glass mosaic
      ["vid_dark_bath", 1],
      ["vid_restaurant", 1],
      ["vid_diamond", 2], // decor
      ["vid_teal_3d", 2],
      ["vid_hex_bath", 2],
      ["vid_square_bath", 2],
      ["vid_hex_orange", 2],
      ["vid_hex_pink", 2],
    ],
    hq: ["Almazora", "ألمازورا"],
    en: "A leading Spanish brand in glass mosaic, whose tiles are made from 100% recycled glass, making it an eco-friendly choice. It comes in varied collections such as Pearl, Nature, Titanium and Glow in the Dark, suited to walls, floors, pools, bathrooms and kitchens.",
    ar: "علامة إسبانية رائدة في الفسيفساء الزجاجية، وتُصنَّع بلاطها من زجاج معاد تدويره بنسبة 100%، فهي خيار صديق للبيئة. تتوفر بمجموعات متنوعة مثل Pearl وNature وTitanium وGlow in the Dark، وتناسب الجدران والأرضيات والمسابح والحمامات والمطابخ.",
    lines: [
      [
        "Pool mosaic",
        "Level and a dedicated Colorpool chart for pools, from residential pools to resorts.",
        "موزاييك المسابح",
        "مجموعة Level ودليل ألوان Colorpool الخاص بالمسابح، من المسابح المنزلية إلى المنتجعات.",
      ],
      [
        "Glass mosaic",
        "Oasis, Estelar and Glitter: versatile colours and blends for any space.",
        "موزاييك زجاجي",
        "مجموعات Oasis وEstelar وGlitter: ألوان ومزائج متنوعة لأي مساحة.",
      ],
      [
        "Decor",
        "Eden, Tender and Soul: hexagons, scales and on-trend patterns.",
        "ديكور",
        "مجموعات Eden وTender وSoul: أشكال سداسية وحراشف ونقوش عصرية.",
      ],
    ],
    tl: [
      [
        "30+",
        "Three decades of glass",
        "More than 30 years making recycled glass mosaic in Almazora.",
        "ثلاثة عقود من الزجاج",
        "أكثر من 30 عاماً في صناعة الموزاييك من الزجاج المعاد تدويره.",
      ],
      [
        "2.5 · 3.8",
        "Iconic formats",
        "The classic 2.5 and 3.8 cm mosaic formats.",
        "مقاسات أيقونية",
        "مقاسا الموزاييك الكلاسيكيان 2.5 و3.8 سم.",
      ],
      [
        "2026",
        "New 5×5 format",
        "A new 5×5 cm format presented at Cersaie 2026.",
        "مقاس 5×5 الجديد",
        "مقاس جديد 5×5 سم قُدّم في Cersaie 2026.",
      ],
      [
        "Today",
        "Worldwide projects",
        "Pools and spaces from Kuala Lumpur to England and Miami.",
        "مشاريع حول العالم",
        "مسابح ومساحات من كوالالمبور إلى إنكلترا وميامي.",
      ],
    ],
  },
};
