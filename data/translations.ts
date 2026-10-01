// Ported verbatim from the original midpoint.html.
import type { Locale } from "./i18n";

export interface Dict {
  menu: string;
  close: string;
  nav_home: string;
  nav_about: string;
  nav_brands: string;
  nav_products: string;
  nav_contact: string;
  cta_visit: string;
  cta_brands: string;
  cta_contact: string;
  prev: string;
  next: string;
  tagline: string;
  c_address: string;
  address: string;
  c_phone: string;
  c_hours: string;
  hours: string;
  about_quote: string;
  about_p1: string;
  about_p2: string;
  about_p3: string;
  f1: string;
  f2: string;
  f3: string;
  f4n: string;
  f4: string;
  brands_h: string;
  brands_p: string;
  visit: string;
  prod_h: string;
  prod_p: string;
  from: string;
  c_h: string;
  c_p: string;
  c_wa: string;
  l_name: string;
  l_phone: string;
  l_type: string;
  l_brand: string;
  l_msg: string;
  types: string[];
  anyBrand: string;
  f_note: string;
  send: string;
  err: string;
  ok: string;
  rights: string;
  seal: string;
  aud_h: string;
  or_h: string;
  or_p: string;
  c_spain: string;
  c_italy: string;
  c_japan: string;
  c_baghdad: string;
  how_k: string;
  how_h: string;
  aud: string[];
  pillars: [string, string][];
  steps: [string, string][];
  legend: [string, string, number][];
  br_filter: string;
  br_all: string;
  br_surf: string;
  br_tile: string;
  br_bath: string;
  br_mosaic: string;
  br_supply: string;
  br_site: string;
  br_ask: string;
  br_n: string;
  br_n1: string;
  c_email: string;
  c_follow: string;
  wa_float: string;
  logo_sub: string;
  px_space: string;
  px_feat: string;
  px_ideal: string;
  px_explore: string;
  px_cats: string;
  px_cat1: string;
  prev_cat: string;
  next_cat: string;
  px_quote: string;
  px_q_msg: string;
  px_wa_msg: string;
  sp_all: string;
  sp_kitchen: string;
  sp_bath: string;
  sp_living: string;
  sp_outdoor: string;
  sp_pool: string;
  loading: string;
  ready: string;
  mq_label: string;
  wa_hi: string;
  wa_team: string;
  wa_pick: string;
  wa_start: string;
  wa_topics: string[];
  wa_base: string;
  wa_def: string;
  wa_msgs: string[];
  br_more: string;
  bp_lines_k: string;
  bp_lines_h: string;
  bp_band_h: string;
  bp_band_p: string;
  bp_all: string;
  bp_prev: string;
  bp_next: string;
  f_country: string;
  f_year: string;
  f_hq: string;
  f_spec: string;
  f_iraq: string;
  f_iraq_v: string;
  bp_cat: string;
  bp_wa: string;
  bp_rail: string;
  bp_rel: string;
  bp_t1: string;
  bp_t2: string;
  bp_t3: string;
  bp_ask_line: string;
  bp_zoom: string;
  bp_about_k: string;
  bp_about_h: string;
  bp_about_p2: string;
  tl_k: string;
  tl_h: string;
  bh_now: string;
  skip: string;
  next_up: string;
  scroll: string;
  pause: string;
  play: string;
  m_call: string;
  m_dir: string;
  open_now: string;
  closed_now: string;
  more_brands: string;
  more_products: string;
  pv_more: string;
  pv_home_t: string;
  pv_home_p: string;
  pv_about_t: string;
  pv_about_p: string;
  pv_brands_t: string;
  pv_products_t: string;
  pv_contact_t: string;
  s1: string;
  s2: string;
  s3: string;
}

const en: Dict = {
  menu: "Menu",
  close: "Close",
  nav_home: "Home",
  nav_about: "About us",
  nav_brands: "Our brands",
  nav_products: "Products",
  nav_contact: "Contact",
  cta_visit: "Visit the showroom",
  cta_brands: "Explore our brands",
  cta_contact: "Talk to us",
  prev: "Previous slide",
  next: "Next slide",
  tagline: "Official agent for nine European and Japanese brands in Iraq",
  c_address: "Showroom",
  address: "Baghdad Tower, Godiya Plaza, Al-Mansour, Baghdad, Iraq",
  c_phone: "Phone",
  c_hours: "Opening hours",
  hours: "Daily, 09:00 – 20:00",
  about_quote: "Since 2019, Midpoint has brought Iraq's designers and architects the surfaces and bathrooms they used to fly abroad to specify.",
  about_p1: "Our company was established in 2019 and is based in Baghdad, Iraq, with a passion for design excellence. We import leading brands that help designers and architects create spaces beyond the ordinary.",
  about_p2: "A dedicated team follows each project from selection to delivery, working with manufacturers that combine advanced production technology with lasting performance and sustainable materials.",
  about_p3: "Every space is a canvas. We help turn your vision into a finished room, where creativity meets function.",
  f1: "Founded in Baghdad",
  f2: "Partner brands",
  f3: "Countries of origin: Spain, Italy, Japan",
  f4n: "One",
  f4: "Showroom in Baghdad for every surface and fixture",
  brands_h: "Nine makers, one address",
  brands_p: "We are the authorised partner in Iraq for manufacturers chosen for the quality of their material and the way they stand behind it.",
  visit: "Visit site",
  prod_h: "From the slab to the tap",
  prod_p: "Choose a category to see what it's made of and which of our brands supply it.",
  from: "Supplied by",
  c_h: "Plan your project with us",
  c_p: "Visit the showroom, call us, or send your details and our team will get back to you.",
  c_wa: "Message us on WhatsApp",
  l_name: "Full name",
  l_phone: "Phone number",
  l_type: "I am a",
  l_brand: "Brand of interest",
  l_msg: "Tell us about your project",
  types: ["Homeowner", "Architect / designer", "Contractor", "Developer"],
  anyBrand: "Not sure yet",
  f_note: "Sending opens WhatsApp with your details ready to send.",
  send: "Send enquiry",
  err: "Please add your name and phone number.",
  ok: "WhatsApp is opening with your enquiry.",
  rights: "© 2026 Midpoint. All rights reserved.",
  seal: "Baghdad",
  aud_h: "We work with",
  or_h: "Three countries, one showroom in Baghdad",
  or_p: "Every brand we carry is made at its source and shipped to our showroom in Al-Mansour.",
  c_spain: "Spain",
  c_italy: "Italy",
  c_japan: "Japan",
  c_baghdad: "Baghdad",
  how_k: "How we work",
  how_h: "From first visit to delivery",
  aud: ["Architects", "Interior designers", "Contractors", "Homeowners"],
  pillars: [
    ["Chosen makers", "We represent manufacturers from Spain, Italy and Japan known for the quality of their material."],
    ["Design support", "Our team works with designers and architects to match surfaces and fixtures to each project."],
    ["Materials that last", "Products made with advanced technology for long-term performance, with sustainable options."],
  ],
  steps: [
    ["Visit the showroom", "See materials at full scale and compare finishes in person."],
    ["Choose with our team", "We help match surfaces and fixtures to your drawings and budget."],
    ["Receive a quotation", "Quantities and pricing for your full selection."],
    ["Delivery", "We coordinate your order through to delivery."],
  ],
  legend: [["Spain", "Roca, Argenta, Benadresa, Alaplana, Mayolica, Vidrepur", 6], ["Italy", "Laminam, Infinity Surfaces", 2], ["Japan", "TOTO", 1]],
  br_filter: "Filter brands",
  br_all: "All",
  br_surf: "Slabs",
  br_tile: "Tiles",
  br_bath: "Bathroom",
  br_mosaic: "Mosaic",
  br_supply: "What we supply",
  br_site: "Official site",
  br_ask: "Ask about",
  br_n: "brands",
  br_n1: "brand",
  c_email: "Email",
  c_follow: "Follow us",
  wa_float: "Chat on WhatsApp",
  logo_sub: "Midpoint General Trading Co.",
  px_space: "Filter by space",
  px_feat: "Key features",
  px_ideal: "Ideal for",
  px_explore: "Explore",
  px_cats: "categories",
  px_cat1: "category",
  prev_cat: "Previous category",
  next_cat: "Next category",
  px_quote: "Request a quote",
  px_q_msg: "I'd like a quote for",
  px_wa_msg: "Hello, I'm interested in",
  sp_all: "All spaces",
  sp_kitchen: "Kitchen",
  sp_bath: "Bathroom",
  sp_living: "Floors and walls",
  sp_outdoor: "Outdoor and facades",
  sp_pool: "Pools",
  loading: "Loading",
  ready: "Welcome",
  mq_label: "Our partner brands",
  wa_hi: "Hello! Welcome to Midpoint. How can we help with your project?",
  wa_team: "Midpoint team",
  wa_pick: "Choose a topic or start the chat:",
  wa_start: "Start chat on WhatsApp",
  wa_topics: ["Request a quote", "Visit the showroom", "Large-format slabs", "Tiles and mosaic", "Bathroom and TOTO"],
  wa_base: "Hello Midpoint, I'd like to ask about",
  wa_def: "Hello Midpoint, I'd like to ask about your products.",
  wa_msgs: [
    "Hello Midpoint, I'd like to request a quote.",
    "Hello Midpoint, I'd like to visit the showroom.",
    "Hello Midpoint, I'd like to ask about large-format slabs.",
    "Hello Midpoint, I'd like to ask about tiles and mosaic.",
    "Hello Midpoint, I'd like to ask about bathroom products and TOTO.",
  ],
  br_more: "Explore brand",
  bp_lines_k: "Product lines",
  bp_lines_h: "What we supply from",
  bp_band_h: "Plan your project with",
  bp_band_p: "Visit our showroom in Baghdad to see the materials, or send us your drawings for a quotation.",
  bp_all: "All brands",
  bp_prev: "Previous brand",
  bp_next: "Next brand",
  f_country: "Country",
  f_year: "Founded",
  f_hq: "Headquarters",
  f_spec: "Specialty",
  f_iraq: "In Iraq",
  f_iraq_v: "Official agent: Midpoint",
  bp_cat: "See the category",
  bp_wa: "Hello Midpoint, I'd like to ask about",
  bp_rail: "Switch brand",
  bp_rel: "Related brands",
  bp_t1: "Overview",
  bp_t2: "Products",
  bp_t3: "Contact",
  bp_ask_line: "Ask",
  bp_zoom: "View full image",
  bp_about_k: "About the company",
  bp_about_h: "Get to know",
  bp_about_p2: "Midpoint is the official agent for {b} in Iraq. Visit our showroom in Al-Mansour, Baghdad to see the products in person, get guidance from our team and request a quotation.",
  tl_k: "Heritage",
  tl_h: "The story of",
  bh_now: "Now showing",
  skip: "Skip to content",
  next_up: "Next",
  scroll: "Scroll",
  pause: "Pause slideshow",
  play: "Play slideshow",
  m_call: "Call the showroom",
  m_dir: "Get directions",
  open_now: "Open now, closes 20:00",
  closed_now: "Closed, opens 09:00",
  more_brands: "Show brands",
  more_products: "Show product categories",
  pv_more: "View section",
  pv_home_t: "Surfaces and bathrooms from Spain, Italy and Japan",
  pv_home_p: "Porcelain slabs, ceramic tile, glass mosaic and sanitaryware, chosen for Iraqi homes and projects.",
  pv_about_t: "Based in Baghdad since 2019",
  pv_about_p: "We import leading brands for designers, architects and homeowners, and follow each project to delivery.",
  pv_brands_t: "Nine partner brands",
  pv_products_t: "Six product categories",
  pv_contact_t: "Visit the showroom",
  s1: "Founded",
  s2: "Brands",
  s3: "Countries",
};

const ar: Dict = {
  menu: "القائمة",
  close: "إغلاق",
  nav_home: "الرئيسية",
  nav_about: "من نحن",
  nav_brands: "علاماتنا التجارية",
  nav_products: "المنتجات",
  nav_contact: "تواصل معنا",
  cta_visit: "زوروا المعرض",
  cta_brands: "اكتشف علاماتنا",
  cta_contact: "تحدث معنا",
  prev: "الشريحة السابقة",
  next: "الشريحة التالية",
  tagline: "الوكيل الرسمي لتسع علامات أوروبية ويابانية في العراق",
  c_address: "المعرض",
  address: "بغداد، المنصور، مجمع جوديا بلازا، برج بغداد",
  c_phone: "الهاتف",
  c_hours: "أوقات الدوام",
  hours: "يومياً، 09:00 – 20:00",
  about_quote: "منذ عام 2019، تقدّم ميدبوينت للمصممين والمعماريين في العراق الأسطح وتجهيزات الحمّامات التي كانوا يسافرون لاختيارها.",
  about_p1: "تأسست شركتنا عام 2019 ومقرها بغداد، العراق، بشغف حقيقي بالتميّز في التصميم. نستورد أرقى العلامات التجارية لنُلهم المصممين والمعماريين في صناعة مساحات تتجاوز المألوف.",
  about_p2: "يرافق فريقنا المتخصص كل مشروع من مرحلة الاختيار حتى التسليم، بالتعاون مع مصنّعين يجمعون بين أحدث تقنيات الإنتاج والأداء الذي يدوم والمواد المستدامة.",
  about_p3: "كل مساحة هي لوحة فنية. نساعدك على تحويل رؤيتك إلى مكان متكامل يلتقي فيه الإبداع بالوظيفة.",
  f1: "سنة التأسيس في بغداد",
  f2: "علامات تجارية شريكة",
  f3: "دول المنشأ: إسبانيا، إيطاليا، اليابان",
  f4n: "معرض واحد",
  f4: "معرض في بغداد لكل الأسطح والتجهيزات",
  brands_h: "تسع علامات، عنوان واحد",
  brands_p: "نحن الشريك المعتمد في العراق لمصنّعين اخترناهم لجودة موادهم ولالتزامهم بما يقدّمونه.",
  visit: "زيارة الموقع",
  prod_h: "من الأسطح إلى أدق التفاصيل",
  prod_p: "اختر فئةً لتتعرّف على خاماتها، والعلامات التي نوفّرها فيها.",
  from: "متوفر من",
  c_h: "خطط لمشروعك معنا",
  c_p: "زوروا المعرض أو اتصلوا بنا، أو أرسلوا بياناتكم وسيتواصل معكم فريقنا.",
  c_wa: "راسلنا عبر واتساب",
  l_name: "الاسم الكامل",
  l_phone: "رقم الهاتف",
  l_type: "أنا",
  l_brand: "العلامة التي تهمّك",
  l_msg: "حدّثنا عن مشروعك",
  types: ["صاحب منزل", "معماري / مصمم", "مقاول", "مطوّر عقاري"],
  anyBrand: "لم أحدد بعد",
  f_note: "عند الإرسال يُفتح واتساب ورسالتك جاهزة للإرسال.",
  send: "إرسال الطلب",
  err: "يرجى إدخال الاسم ورقم الهاتف.",
  ok: "يتم الآن فتح واتساب مع طلبك.",
  rights: "© 2026 ميدبوينت. جميع الحقوق محفوظة.",
  seal: "بغداد",
  aud_h: "نعمل مع",
  or_h: "ثلاث دول، ومعرض واحد في بغداد",
  or_p: "كل علامة نقدّمها تُصنع في بلدها الأصلي وتُشحن إلى معرضنا في المنصور.",
  c_spain: "إسبانيا",
  c_italy: "إيطاليا",
  c_japan: "اليابان",
  c_baghdad: "بغداد",
  how_k: "طريقة عملنا",
  how_h: "من الزيارة الأولى حتى التسليم",
  aud: ["المعماريين", "مصممي الديكور", "المقاولين", "أصحاب المنازل"],
  pillars: [
    ["مصنّعون مختارون", "نمثّل مصنّعين من إسبانيا وإيطاليا واليابان معروفين بجودة موادهم."],
    ["دعم للتصميم", "يعمل فريقنا مع المصممين والمعماريين لاختيار الأسطح والتجهيزات المناسبة لكل مشروع."],
    ["مواد تدوم", "منتجات مصنوعة بتقنيات متقدمة لأداء طويل الأمد، مع خيارات مستدامة."],
  ],
  steps: [
    ["زوروا المعرض", "شاهدوا المواد بحجمها الحقيقي وقارنوا اللمسات عن قرب."],
    ["اختاروا مع فريقنا", "نساعدكم في مطابقة الأسطح والتجهيزات مع مخططاتكم وميزانيتكم."],
    ["استلموا عرض السعر", "كميات وأسعار لكامل اختياراتكم."],
    ["التسليم", "ننسّق طلبكم حتى التسليم."],
  ],
  legend: [["إسبانيا", "Roca, Argenta, Benadresa, Alaplana, Mayolica, Vidrepur", 6], ["إيطاليا", "Laminam, Infinity Surfaces", 2], ["اليابان", "TOTO", 1]],
  br_filter: "تصفية العلامات",
  br_all: "الكل",
  br_surf: "ألواح",
  br_tile: "بلاط",
  br_bath: "حمّامات",
  br_mosaic: "موزاييك",
  br_supply: "ما نوفّره",
  br_site: "الموقع الرسمي",
  br_ask: "استفسر عن",
  br_n: "علامات",
  br_n1: "علامة",
  c_email: "البريد الإلكتروني",
  c_follow: "تابعونا",
  wa_float: "تواصل عبر واتساب",
  logo_sub: "شركة نقطة المنتصف للتجارة العامة",
  px_space: "حسب المساحة",
  px_feat: "المميزات",
  px_ideal: "مثالي لـ",
  px_explore: "استكشف",
  px_cats: "فئات",
  px_cat1: "فئة",
  prev_cat: "الفئة السابقة",
  next_cat: "الفئة التالية",
  px_quote: "اطلب عرض سعر",
  px_q_msg: "أرغب بعرض سعر لـ",
  px_wa_msg: "مرحباً، أنا مهتم بـ",
  sp_all: "كل المساحات",
  sp_kitchen: "المطبخ",
  sp_bath: "الحمّام",
  sp_living: "الأرضيات والجدران",
  sp_outdoor: "الخارج والواجهات",
  sp_pool: "المسابح",
  loading: "جارٍ التحميل",
  ready: "أهلاً بكم",
  mq_label: "علاماتنا الشريكة",
  wa_hi: "أهلاً بكم في ميدبوينت! كيف نقدر نساعدكم في مشروعكم؟",
  wa_team: "فريق ميدبوينت",
  wa_pick: "اختاروا موضوعاً أو ابدأوا المحادثة:",
  wa_start: "ابدأ المحادثة على واتساب",
  wa_topics: ["طلب عرض سعر", "زيارة المعرض", "الألواح الكبيرة", "البلاط والموزاييك", "الحمّامات وTOTO"],
  wa_base: "مرحباً ميدبوينت، أود الاستفسار عن",
  wa_def: "مرحباً ميدبوينت، أود الاستفسار عن منتجاتكم.",
  wa_msgs: [
    "مرحباً ميدبوينت، أرغب بطلب عرض سعر.",
    "مرحباً ميدبوينت، أرغب بزيارة المعرض.",
    "مرحباً ميدبوينت، أود الاستفسار عن الألواح الكبيرة.",
    "مرحباً ميدبوينت، أود الاستفسار عن البلاط والموزاييك.",
    "مرحباً ميدبوينت، أود الاستفسار عن منتجات الحمّامات وTOTO.",
  ],
  br_more: "اكتشف العلامة",
  bp_lines_k: "خطوط المنتجات",
  bp_lines_h: "ما نوفّره من",
  bp_band_h: "خطط لمشروعك مع",
  bp_band_p: "زوروا معرضنا في بغداد لمشاهدة المواد، أو أرسلوا مخططاتكم للحصول على عرض سعر.",
  bp_all: "كل العلامات",
  bp_prev: "العلامة السابقة",
  bp_next: "العلامة التالية",
  f_country: "البلد",
  f_year: "سنة التأسيس",
  f_hq: "المقر",
  f_spec: "التخصص",
  f_iraq: "في العراق",
  f_iraq_v: "الوكيل الرسمي: ميدبوينت",
  bp_cat: "شاهد الفئة",
  bp_wa: "مرحباً ميدبوينت، أود الاستفسار عن",
  bp_rail: "التنقل بين العلامات",
  bp_rel: "علامات ذات صلة",
  bp_t1: "نبذة",
  bp_t2: "المنتجات",
  bp_t3: "تواصل",
  bp_ask_line: "استفسر",
  bp_zoom: "عرض الصورة كاملة",
  bp_about_k: "نبذة عن الشركة",
  bp_about_h: "تعرّف على",
  bp_about_p2: "ميدبوينت هي الوكيل الرسمي لـ{b} في العراق. زوروا معرضنا في المنصور ببغداد لمشاهدة المنتجات على الطبيعة، والحصول على استشارة فريقنا وطلب عرض سعر.",
  tl_k: "المسيرة",
  tl_h: "قصة",
  bh_now: "المعروض الآن",
  skip: "تخطَّ إلى المحتوى",
  next_up: "التالي",
  scroll: "اكتشف",
  pause: "إيقاف العرض",
  play: "تشغيل العرض",
  m_call: "اتصل بالمعرض",
  m_dir: "الاتجاهات على الخريطة",
  open_now: "مفتوح الآن، يغلق 20:00",
  closed_now: "مغلق، يفتح 09:00",
  more_brands: "عرض العلامات",
  more_products: "عرض فئات المنتجات",
  pv_more: "انتقل إلى القسم",
  pv_home_t: "أسطح وحمّامات من إسبانيا وإيطاليا واليابان",
  pv_home_p: "ألواح بورسلين وسيراميك وموزاييك زجاجي وأدوات صحية، مختارة للبيوت والمشاريع العراقية.",
  pv_about_t: "في بغداد منذ عام 2019",
  pv_about_p: "نستورد أرقى العلامات للمصممين والمعماريين وأصحاب المنازل، ونرافق كل مشروع حتى التسليم.",
  pv_brands_t: "تسع علامات شريكة",
  pv_products_t: "ست فئات من المنتجات",
  pv_contact_t: "زوروا المعرض",
  s1: "التأسيس",
  s2: "علامة",
  s3: "دول",
};

/** UI copy, keyed by locale (was `T` in the original script). */
export const T: Record<Locale, Dict> = { en, ar };
