/* ================================================================
   script.js - شركة الاهرام الحديثة
   Handles:
     - Page navigation (show/hide pages)
     - Generating 200 names / products dynamically
     - Search/filter functionality
     - Back button history
     - Particle effect on homepage
   ================================================================ */

/* ----------------------------------------------------------------
   NAVIGATION HISTORY
   We keep a stack so the "back" button knows where to go.
   ---------------------------------------------------------------- */
const history = ['home'];  // Start on home

/* ----------------------------------------------------------------
   DATA: Page info (title shown in navbar)
   ---------------------------------------------------------------- */
const pageInfo = {
  'home':               { title: '',                  back: null },
  'plumbing':           { title: 'ادوات سباكة',        back: 'home' },
  'drainage':           { title: 'صرف',               back: 'plumbing' },
  'drainage-products':  { title: 'المنتجات',           back: 'drainage' },
  'feeding':            { title: 'تغذية',              back: 'plumbing' },
  'accessories':        { title: 'اكسسوارات',          back: 'plumbing' },
  'electrical':         { title: 'ادوات كهرباء',       back: 'home' },
  'el-foundation':      { title: 'تأسيس كهرباء',       back: 'electrical' },
  'el-finishing':       { title: 'تشطيب كهرباء',       back: 'electrical' },
  'construction':       { title: 'ادوات معمار',        back: 'home' },
};

/* ----------------------------------------------------------------
   HELPER: Generate an array of N items
   prefix  = the text before the number (e.g. "اسم" or "normal")
   count   = how many items (default 200)
   ---------------------------------------------------------------- */
function generateItems(prefix, count = 200) {
  const arr = [];
  for (let i = 1; i <= count; i++) {
    arr.push(`${prefix} ${i}`);
  }
  return arr;
}

/* ----------------------------------------------------------------
   DATA: Pre-generate all 200-item lists
   ---------------------------------------------------------------- */
const DATA = {
  drainageNames:        generateItems('اسم',    200),
  drainageProducts:     generateItems('normal', 200),
  feedingProducts:      generateItems('normal', 200),
  accessoriesProducts:  [
    "محبس زاوية استانلس سلامكو كود 30",
    "ياردة سوستة نوفا موديل",
    "طاسة 10 سم بلاستيك لوكس",
    "محبس زاوية 2/1 نحاس بي جي مروحة",
    "محبس بلاكور 1 بوصة عصفورة",
    "محبس بلاكور 4/3 عصفورة",
    "حنفية بلية 2/1 نحاس بي جي",
    "مسمار سديلي حرف L نيكل كارت",
    "طقم مسمار اكسسوار كارت",
    "طاسة مسطرة 15 سم بلاستك",
    "محبس فلتر",
    "ياردة سوستة تركي اصلي",
    "شطاف يدوي فلوتك",
    "شطاف يدوي تقليد اسباني / ايطالي",
    "شطاف يدوي جروهي",
    "حنفية بلاستيك كوبشة الامين",
    "عوامة نحاس 1 نحاس السكري",
    "حنفية 2/1 بلية لافوار",
    "قفيز 4 بوصة نوفا",
    "قلب ميكسر عادة",
    "محبس بلاكور شيلد 1 بوصة",
    "محبس بلاكور شيلد 4/3 بوصة",
    "مسطرة مدورة ابيض ستار",
    "وصلة سخان 60 سم رمادي",
    "وصلة سخان 50 سم رمادي",
    "صاموله نحاس ابوصة بشفة كارت",
    "عوامة خزان نحاس بلازما 1 بوصة",
    "سديلي العالمية",
    "سماعة شنطة لوكس صفوة الجولد ستار",
    "بلاستكة غطا بلاعة",
    "حنفية بولي 2/1 كعب نحاس لوكس",
    "صرف بالطابق تاتونجي رمادي لوكس",
    "يد شطاف فريست",
    "محبس زاوية بلاستيك الامين",
    "نبل نيكل 2/1 طويل لوكس",
    "صرف 3 تاتونجي اصلي موديل عادي",
    "نبل نحاس 2/1 بوصة كارت",
    "تي نيكل 2/1 بوصة",
    "حوض مطبخ سمارت + الخلاط و مصفاه",
    "طقم حمام نابولي جرافينيا ماكنة فقط",
    "جلبة نيكل 2/1",
    "جلدة مخصوص 3 موديل تركي احمر",
    "وصلة سخان 80 سم",
    "كوع نيكل 2/1",
    "طقم جلبة تطويل ستلس لوكس ( الطقم 3 جلبة )",
    "قفيز بالفشر 4/3",
    "طقم مسمار حوض كارت",
    "موتور 2/1 حصان ميجان / شيفت",
    "وصلة سخان 40 سم بولي",
    "صامولة بالكعب قنطرة هاند ميكسر",
    "موتور 1 حصان صالح فهمي",
    "موتور 1 حصان توبي لوكس بلف",
    "حله 48 سم * 38 سم 1 مللي فالكون",
    "صرف نوفا حوض وش",
    "صرف نوفا مطبخ 2 بوصة",
    "سنترك خلاط ستلس تقيل",
    "صرف تاتوجي اصلي 1.25 وش",
    "غطا بلاعة 20 سم سيراميك",
    "مجري بيبة شاور الحياة 40 سم سيراميك",
    "خلاط مطبخ ميكسر توب جرين",
    "ماكنة سيفون تربو 2/1.5 بوصة",
    "طقم مسمار قاعدة كيس",
    "طقم مسمار سخان كيس",
    "موتور برادا 1 حصان",
    "محبس زاوية مربع جولد جديد",
    "مشتمل دفن شيلد",
    "صامولة نحاس بشفه 4/3 تقيلة كيس / كارت",
    "حله جالاكسي 71 * 44 سم",
    "فولماك باور",
    "غطا بلاعة 15 سم سيراميك عادي",
    "غطا بلاعة 20 سم سالمكو ابيض",
    "طقم كيلوباترا كامل حوض 70 سم",
    "سماعة صفوة الجولد شنطة هيد اسود",
    "قفيز بالفشر 1 بوصة",
    "عوامة سيفون كعب بلاستيك",
    "نبل نحاس 1 بوصة تقيل كارت",
    "نبل نحاس 4/3 كارت",
    "سديلي نيو جولد",
    "حنفية فلتر عادية",
    "صرف 3 سالمكو اصفر",
    "صرف 1.25 وش تركي جانا / العربي",
    "طبة اختبار اخضر",
    "وصلة شجرة 50 سم عرض",
    "حنفية 4/3 صيني سكينة لافوار",
    "حنفية 1 بوصة سكينة صيني لافوار كارت",
    "حنفية غسالة نحاس عادة لافوار",
    "طقم جلبة تطويل نحاس اصفر شيلد",
    "كوع نزل نحاس كارت",
    "فلة صندوق السكري",
    "اوكرة جاجوار",
    "قنطرة عكاز طويلة لوكس كبيرة",
    "اوكرة هاند مكسر وردة",
    "قنطرة وش ستانلس",
    "قنطرة مطبخ ستانلس 4/3",
    "صامولة و كعب خلاط يمين و شمال كارت",
    "كيس جلد خلاط 4/3 و 2/1 او عداد",
    "نبل خزان زهران 1 بوصة بلاستيك",
    "جلدة مخصوص صغيرة ابيض",
    "طقم مسمار تثبيت غطا قاعدة جرار",
    "نبل خزان 4/3 زهران بلاستيك",
    "قنطرة وش طويلة ميكسر",
    "سنترك خلاط نحاس تقيل",
    "قنطرة ميكسر معدلة",
    "غطا بلاعة تاتش 20 سم",
    "وش مدور نيكل الجمال",
    "طقم مسمار كيلوباترا",
    "ماسورة دش صفوة الجولد",
    "غطا بلاعة 20 سم مروحة مستورد",
    "قنطرة عكاز مربعة",
    "جلبة فلتر 4/3",
    "قلب الماني 2/1 مختوم",
    "تفلون دبل كرتونة زرقا 50 متر",
    "كوع نيكل ذكر * انثي ستلس",
    "حنفية غسالة بي جي",
    "وصلة 60 سم كينج لوكس",
    "مسطرة 2*1 شلال موديل الماني كبيرة",
    "مسمار حرف L تثبيت غطا القاعدة السكري",
    "قفيز 3 بالفشر",
    "شبكة بلاعة بلاستيك",
    "اوكرة مقبض جولد معدن كبير",
    "ماسورة دش مدفون مربع 50 / 40 سم نيكل",
    "قلب 3.5 لنيه مختوم ايطالي",
    "طقم صبانات بروسلينا",
    "تفلون موديل ايطالي تريند",
    "وش ستايل بلازا",
    "ماكينة سيفون بريست",
    "جلبة 4/3 * 2/1 محول دش السكري نحاس",
    "كوع ذكر * ذكر استلس",
    "تفلون صغير شنطة علبة",
    "قفيز بالفشر 1.5 بوصة",
    "مشتمل دفن كامل كورة",
    "طاسة اسود 20 سم بلاستيك مربعة",
    "سماعة كاملة لومي هد ثابت",
    "صامولة نحاس 2/1 لوكس كارت",
    "طاسة مستطيلة كبيرة هاي لوكس بلازا",
    "نطرة فلتر 2/1",
    "محبس زاوية لافوار",
    "طابق بانيو موديل ايطالي ستارفيل",
    "حنفية بلاستيك فلوماستر",
    "كرتونة سيليكون",
    "لفة خرطوم سيليكون 2/1",
    "لفة خرطوم سيليكون 4/3",
    "لفة خرطوم سيليكون 1 بوصة",
    "ماكينة سيفون فونتانا",
    "ماكينة سيفون ميجا تركي",
    "بلف سخان",
    "وصلة سخان 60 سم كينج لوكس",
    "وصلة سخان 50 سم كينج لوكس",
    "غطا قاعدة مربع لوكس",
    "راس خرطوم 4/3 بوصة سن خارجي لوكس",
    "راس خرطوم 1 بوصة لوكس",
    "تي خرطوم 2/1 بوصة",
    "تي خرطوم 4/3 بوصة",
    "تي خرطوم 1 بوصة",
    "خلاط مطبخ ميكسر الشجرة",
    "خلاط حمام ميكسر الشجرة",
    "خلاط دش ميكسر الشجرة",
    "خلاط مطبخ ميكسر جرين الجوكر",
    "خلاط حمام ميكسر جرين الجوكر",
    "خلاط دش ميكسر جرين الجوكر",
    "خلاط مطبخ اوكر",
    "خلاط حمام اوكر",
    "خلاط دش اوكر",
    "خلاط مطبخ ميكسر جرين توب",
    "خلاط دش ميكسر جرين توب",
    "خلاط حمام ميكسر جرين توب",
    "مسطرة دش روتانا رمادي",
    "راس حنفية 2/1",
    "راس حنفية 4/3",
    "كيس مسمار خشن",
    "كيس مسمار ناعم",
    "قلب 2/1 بوصة عادي سن ايطالي",
    "قلب 3 لنيه الشجرة",
    "خلاط حمام ميكسر دبابة شجرة ازرق",
    "خلاط مطبخ ميكسر دبابة شجرة ازرق",
    "خلاط دش ميكسر دبابة شجرة ازرق",
    "غراء 1/4717",
    "غراء 1/8717",
    "خزان 1 متر اسود",
    "خزان 1 متر ابيض",
    "خزان 2 متر اسود",
    "خزان 2 متر ابيض"
  ],
  elFoundationProducts: generateItems('normal', 200),
  elFinishingProducts:  generateItems('normal', 200),
  constructionProducts: generateItems('normal', 200),
};

/* ----------------------------------------------------------------
   showPage(pageId)
   Hides the current page and shows the target page.
   Also updates navbar title and back button.
   ---------------------------------------------------------------- */
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Show the target page
  const target = document.getElementById('page-' + pageId);
  if (!target) return;
  target.classList.add('active');

  // Update nav title
  const info = pageInfo[pageId] || {};
  document.getElementById('navTitle').textContent = info.title || '';

  // Show/hide back button
  const backBtn = document.getElementById('backBtn');
  if (info.back !== null && info.back !== undefined) {
    backBtn.style.display = 'flex';
  } else {
    backBtn.style.display = 'none';
  }

  // Push to history stack
  history.push(pageId);

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Initialize the page content if needed
  initPage(pageId);
}

/* ----------------------------------------------------------------
   goBack()
   Called by the back button.
   Pops the current page from history and goes to previous.
   ---------------------------------------------------------------- */
function goBack() {
  if (history.length > 1) {
    history.pop(); // Remove current
    const prev = history[history.length - 1];
    history.pop(); // Remove prev so showPage can re-add it
    showPage(prev);
  }
}

/* ----------------------------------------------------------------
   initPage(pageId)
   Generates content for a page the first time it loads.
   Uses a flag so we don't regenerate every visit.
   ---------------------------------------------------------------- */
const initialized = {};  // Track which pages have been built

function initPage(pageId) {
  if (initialized[pageId]) return;  // Already done
  initialized[pageId] = true;

  switch (pageId) {
    case 'home':
      buildParticles();
      break;
    case 'drainage':
      buildNameCards('drainage-list', DATA.drainageNames, 'drainage-products');
      break;
    case 'feeding':
      buildProductCards('feeding-list', DATA.feedingProducts);
      break;
    case 'accessories':
      buildProductCards('accessories-list', DATA.accessoriesProducts);
      break;
    case 'el-foundation':
      buildProductCards('el-foundation-list', DATA.elFoundationProducts);
      break;
    case 'el-finishing':
      buildProductCards('el-finishing-list', DATA.elFinishingProducts);
      break;
    case 'construction':
      buildProductCards('construction-list', DATA.constructionProducts);
      break;
  }
}

/* ----------------------------------------------------------------
   buildNameCards(containerId, names, targetPage)
   Builds 200 clickable name cards inside the given container.
   Clicking a name opens the target page and sets the title.
   ---------------------------------------------------------------- */
function buildNameCards(containerId, names, targetPage) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Build all 200 name cards
  container.innerHTML = names.map((name, i) => `
    <div class="name-card" style="--delay: ${Math.min(i * 12, 600)}ms"
         onclick="openNameProducts('${name}')">
      <span class="name-num">${i + 1}</span>
      <span class="name-text">${name}</span>
    </div>
  `).join('');
}

/* ----------------------------------------------------------------
   openNameProducts(name)
   Called when a drainage name is clicked.
   Sets the product page title and shows 200 products.
   ---------------------------------------------------------------- */
function openNameProducts(name) {
  // Update the product page title
  const titleEl = document.getElementById('drainageProductTitle');
  if (titleEl) titleEl.textContent = name;

  // Update navbar info for this dynamic page
  pageInfo['drainage-products'].title = name;

  // Build products if not done yet (or always rebuild since name changes)
  const container = document.getElementById('drainage-products-list');
  if (container) {
    container.innerHTML = buildProductHTML(DATA.drainageProducts);
  }

  // Clear search field
  const searchEl = document.getElementById('drainageProductSearch');
  if (searchEl) searchEl.value = '';

  // Navigate to products page
  showPage('drainage-products');
  initialized['drainage-products'] = false; // Allow rebuild next time
}

/* ----------------------------------------------------------------
   buildProductCards(containerId, products)
   Renders 200 product cards inside a container.
   ---------------------------------------------------------------- */
function buildProductCards(containerId, products) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = buildProductHTML(products);
}

/* ----------------------------------------------------------------
   buildProductHTML(products)
   Returns the HTML string for a list of product cards.
   ---------------------------------------------------------------- */
function buildProductHTML(products) {
  // Result count
  let html = `<p class="result-count" style="grid-column:1/-1">${products.length} منتج</p>`;

  // Product cards
  html += products.map((name, i) => `
    <div class="product-card" style="--delay: ${Math.min(i * 10, 500)}ms">
      <span class="product-num">#${i + 1}</span>
      <p class="product-name">${name}</p>
    </div>
  `).join('');

  return html;
}

/* ----------------------------------------------------------------
   filterList(containerId, query)
   Filters visible cards based on search text.
   Works for both name cards and product cards.
   ---------------------------------------------------------------- */
function filterList(containerId, query) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const q = query.toLowerCase().trim();

  // Get all name-card and product-card elements
  const cards = container.querySelectorAll('.name-card, .product-card');
  let visibleCount = 0;

  cards.forEach(card => {
    // Get the text content (name or product name)
    const text = card.textContent.toLowerCase();
    const match = q === '' || text.includes(q);

    card.style.display = match ? '' : 'none';
    if (match) visibleCount++;
  });

  // Update result count
  const countEl = container.querySelector('.result-count');
  if (countEl) {
    if (q === '') {
      countEl.textContent = `${cards.length} عنصر`;
    } else {
      countEl.textContent = `${visibleCount} نتيجة من ${cards.length}`;
    }
  }

  // Show/hide "no results" message
  let noResults = container.querySelector('.no-results');
  if (visibleCount === 0) {
    if (!noResults) {
      noResults = document.createElement('div');
      noResults.className = 'no-results';
      noResults.innerHTML = `<span>🔍</span><p>لا توجد نتائج لـ "${query}"</p>`;
      container.appendChild(noResults);
    }
    noResults.style.display = '';
  } else if (noResults) {
    noResults.style.display = 'none';
  }
}

/* ----------------------------------------------------------------
   buildParticles()
   Creates small floating gold particles in the hero background.
   ---------------------------------------------------------------- */
function buildParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  // Create 30 particles
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('span');
    particle.className = 'particle';

    // Random size between 2–6px
    const size = Math.random() * 4 + 2;
    particle.style.width  = size + 'px';
    particle.style.height = size + 'px';

    // Random horizontal position
    particle.style.left = Math.random() * 100 + '%';

    // Random starting vertical position
    particle.style.bottom = Math.random() * 20 + '%';

    // Random animation duration 6–14s
    particle.style.animationDuration = (Math.random() * 8 + 6) + 's';

    // Random delay so they don't all start together
    particle.style.animationDelay = (Math.random() * 6) + 's';

    // Slight opacity variation
    particle.style.opacity = (Math.random() * 0.5 + 0.1).toString();

    container.appendChild(particle);
  }
}

/* ----------------------------------------------------------------
   INIT: Run on page load
   ---------------------------------------------------------------- */
window.addEventListener('DOMContentLoaded', () => {
  // Show the home page
  showPage('home');

  // Pre-initialize home particles
  buildParticles();
});
