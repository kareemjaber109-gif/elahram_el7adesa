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
  accessoriesProducts:  generateItems('normal', 200),
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
