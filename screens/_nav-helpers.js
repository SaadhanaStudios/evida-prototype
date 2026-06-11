/* _nav-helpers.js — shared navigation helpers for Evida screen files */

/* ---- SVG icon primitives ---- */
var SVG_MOON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
var SVG_SUN  = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
var SVG_BELL = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>';
var SVG_BACK = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>';
var SVG_SEND = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2" fill="currentColor" stroke="none"/></svg>';
var SVG_CHEVRON_DOWN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';
var SVG_CHECK_CIRCLE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';

var SETUP_ICONS = {
  'booking':       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  'wearables':     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="14" r="4"/><line x1="9" y1="7" x2="15" y2="7"/><line x1="9" y1="19" x2="15" y2="19"/></svg>',
  'records':       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>',
  'questionnaire': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
  'verify':        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>'
};

var SHEET_ICONS = {
  'documents': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
  'ask-evi':   '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>',
  'messages':  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/></svg>',
  'faq':       '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  'profile':   '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  'settings':  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l-.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  'wearable':  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="14" r="4"/><line x1="12" y1="10" x2="12" y2="14"/><line x1="9.17" y1="7" x2="14.83" y2="7"/><line x1="9" y1="19" x2="15" y2="19"/></svg>'
};

var SIDEBAR_ICONS = {
  'dashboard':    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
  'insights':     '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
  'appointments': '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  'documents':    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
  'ask evi':      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>',
  'messages':     '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/></svg>',
  'faq':          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  'profile':      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  'settings':     '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l-.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  'wearables':    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="14" r="4"/><line x1="9" y1="7" x2="15" y2="7"/><line x1="9" y1="19" x2="15" y2="19"/></svg>',
  'contact':      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.34 6.34l.94-.94a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>'
};

var SIDEBAR_LOGO = '<svg width="32" height="32" viewBox="68 25 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M123.386 81.6125C123.386 83.4833 121.889 84.9998 120.042 84.9998H102.486V63.8291H123.386V81.6125Z" fill="white"/><path d="M68.32 32.5751C68.32 30.7043 69.8172 29.1877 71.664 29.1877H89.2203V50.3584H68.32V32.5751Z" fill="white"/><path d="M71.664 85.0001C69.8172 85.0001 68.32 83.4835 68.32 81.6127L68.32 63.8293H89.2202V85.0001H71.664Z" fill="white"/><path d="M120.117 34.0259C115.586 34.0259 111.914 37.6742 111.914 42.1747C111.914 46.6753 115.586 50.3237 120.117 50.3237C124.647 50.3237 128.32 46.6753 128.32 42.1747C128.32 37.6742 124.647 34.0259 120.117 34.0259Z" fill="white"/><path d="M110.715 25C106.17 25 102.486 28.6484 102.486 33.1489C102.486 37.6494 106.17 41.2979 110.715 41.2979C115.26 41.2979 118.944 37.6494 118.944 33.1489C118.944 28.6484 115.26 25 110.715 25Z" fill="white"/><path d="M120.09 50.3235L112.489 40.4017L102.486 33.1489V50.3235H120.09Z" fill="white"/></svg>';

var SIDEBAR_ITEMS = [
  { label: 'Dashboard',       href: 'dashboard.html',             key: 'dashboard'  },
  { label: 'Data & Insights', href: 'insights.html',              key: 'insights'   },
  { label: 'Wearables',       href: 'wearables.html',             key: 'wearables'  },
  { label: 'Appointments',    href: 'dashboard.html#appointments', key: null         },
  { label: 'Documents',       href: 'documents.html',             key: 'documents'  },
  { label: 'Ask Evi',         href: 'ask-evi.html',               key: 'ask-evi'    },
  { label: 'Messages',        href: 'messages.html',              key: 'messages'   },
  { label: 'Contact Us',      href: 'contact.html',               key: 'contact'    },
  { label: 'FAQ',             href: 'faq.html',                   key: 'faq'        },
  { label: 'Profile',         href: 'profile.html',               key: 'profile'    },
  { label: 'Settings',        href: 'settings.html',              key: 'settings'   }
];

/* ---- Sheet Nav ---- */
var SCROLL_POS = 0;
function toggleNavSheet() {
  var o = document.getElementById('navOverlay'), s = document.getElementById('navSheet');
  if (o) o.classList.toggle('open'); if (s) s.classList.toggle('open');
  if (o && o.classList.contains('open')) {
    SCROLL_POS = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = '-' + SCROLL_POS + 'px';
    document.body.style.width = '100%';
  } else {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, SCROLL_POS);
  }
}
function closeNavSheet() {
  var o = document.getElementById('navOverlay'), s = document.getElementById('navSheet');
  if (o) o.classList.remove('open'); if (s) s.classList.remove('open');
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  window.scrollTo(0, SCROLL_POS);
}
function navTo(url) { closeNavSheet(); setTimeout(function(){ window.location.href = url; }, 120); }

/* ---- Toast ---- */
var toastTimer;
function showToast(msg) {
  var t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function() { t.classList.remove('visible'); }, 2500);
}

/* ---- Bottom Nav Active Highlighter ---- */
var SHEET_PAGES = ['messages', 'profile', 'settings', 'faq', 'documents', 'post-consult', 'wearables', 'contact', 'questionnaire'];
function initBottomNav() {
  var items = document.querySelectorAll('.bottom-nav .nav-item');
  var page = window.location.pathname.split('/').pop().replace(/\.html$/, '') || 'dashboard';
  for (var i = 0; i < items.length; i++) {
    var href = items[i].getAttribute('data-href') || '';
    var onclick = items[i].getAttribute('onclick') || '';
    var isMoreBtn = onclick.indexOf('toggleNavSheet') !== -1;
    var active = false;
    if (isMoreBtn) {
      active = SHEET_PAGES.indexOf(page) !== -1;
    } else {
      active = href === page || (page === '' && href === 'dashboard');
    }
    items[i].classList.toggle('active', active);
  }
}

/* ---- Notification Bell ---- */
function initNotifications() {
  // Target only the notification bell, not the dark-mode toggle (which shares the class)
  var bell = document.querySelector('.notif-bell[aria-label="Notifications"]');
  if (!bell) return;
  var badge = bell.querySelector('.notif-badge');
  var badgeHtml = badge ? badge.outerHTML : '<span class="notif-badge" style="display:none">0</span>';
  bell.innerHTML = SVG_BELL + badgeHtml;
  badge = bell.querySelector('.notif-badge');
  var count = EvidaStore.prefs.notifCount();
  if (badge) {
    badge.textContent = count > 99 ? '99+' : count;
    if (count <= 0) badge.style.display = 'none';
  }
  bell.addEventListener('click', function(e) {
    e.stopPropagation();
    showToast('No new notifications');
  });
}

/* ---- Dark Mode Toggle ---- */
function toggleDarkMode() {
  var html = document.documentElement;
  var isDark = html.classList.toggle('dark-mode');
  EvidaStore.prefs.setDarkMode(isDark);
  updateDarkToggleLabel(isDark);
}

function updateDarkToggleLabel(isDark) {
  if (isDark === undefined) isDark = document.documentElement.classList.contains('dark-mode');
  var sidebarBtn = document.getElementById('sidebarDarkToggle');
  if (sidebarBtn) sidebarBtn.textContent = isDark ? 'Light mode' : 'Dark mode';
  // Replace emoji/text on header icon buttons with proper SVG
  var allToggles = document.querySelectorAll('[onclick*="toggleDarkMode"]:not(#sidebarDarkToggle)');
  for (var i = 0; i < allToggles.length; i++) {
    allToggles[i].innerHTML = isDark ? SVG_SUN : SVG_MOON;
    allToggles[i].setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

function initDarkMode() {
  try {
    var isDark = EvidaStore.prefs.darkMode();
    if (isDark) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
    updateDarkToggleLabel(isDark);
  } catch(_) {}
}

/* ---- Nav Sheet Icon Injector ---- */
function initNavSheet() {
  var page = window.location.pathname.split('/').pop().replace(/\.html$/, '');
  var items = document.querySelectorAll('.nav-sheet .sheet-item');
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    if (item.querySelector('.si-icon')) continue;
    var onclick = item.getAttribute('onclick') || '';
    var matched = null;
    var keys = Object.keys(SHEET_ICONS);
    for (var k = 0; k < keys.length; k++) {
      if (onclick.indexOf(keys[k]) !== -1) { matched = keys[k]; break; }
    }
    if (matched) {
      var iconSpan = document.createElement('span');
      iconSpan.className = 'si-icon';
      iconSpan.innerHTML = SHEET_ICONS[matched];
      item.insertBefore(iconSpan, item.firstChild);
    }
    if (page && onclick.indexOf(page) !== -1) {
      item.classList.add('active');
    }
  }
}

/* ---- Sidebar Builder ---- */
function initSidebar() {
  var nav = document.querySelector('.sidebar');
  if (!nav) return;

  var page = window.location.pathname.split('/').pop().replace(/\.html$/, '') || 'dashboard';
  var activePage = page.indexOf('doc-') === 0 ? 'documents' : page;

  var html = '<div class="logo-wrap">' + SIDEBAR_LOGO + '<span style="color:white;font-family:var(--font-display);font-size:20px;font-weight:700;letter-spacing:-0.02em">Evida</span></div>';

  for (var i = 0; i < SIDEBAR_ITEMS.length; i++) {
    var item = SIDEBAR_ITEMS[i];
    var isActive = item.key !== null && activePage === item.key;
    var labelKey = item.label.toLowerCase().replace('&', '').replace(/\s+/g, ' ').trim();
    var iconHtml = '';
    var ikeys = Object.keys(SIDEBAR_ICONS);
    for (var k = 0; k < ikeys.length; k++) {
      if (labelKey.indexOf(ikeys[k]) !== -1) {
        iconHtml = '<span class="nid-icon">' + SIDEBAR_ICONS[ikeys[k]] + '</span>';
        break;
      }
    }
    html += '<button class="nav-item-desktop' + (isActive ? ' active' : '') + '" onclick="window.location.href=\'' + item.href + '\'">' + iconHtml + item.label + '</button>';
  }

  html += '<div class="sidebar-spacer"></div>';
  html += '<button class="sidebar-dark-toggle" id="sidebarDarkToggle" onclick="toggleDarkMode()">Dark mode</button>';

  nav.innerHTML = html;
  updateDarkToggleLabel();
}

/* ---- Back Button Chevron ---- */
function initBackButtons() {
  var btns = document.querySelectorAll('.back-btn');
  for (var i = 0; i < btns.length; i++) {
    if (!btns[i].querySelector('svg')) btns[i].innerHTML = SVG_BACK;
  }
}

/* ---- Send Button Icon ---- */
function initSendButtons() {
  var btns = document.querySelectorAll('button.send, button[class*="send-btn"]');
  for (var i = 0; i < btns.length; i++) {
    if (!btns[i].querySelector('svg')) btns[i].innerHTML = SVG_SEND;
  }
}

/* ---- Checklist Chevrons ---- */
function initChevrons() {
  var chevrons = document.querySelectorAll('.ch-chevron');
  for (var i = 0; i < chevrons.length; i++) {
    if (!chevrons[i].querySelector('svg')) chevrons[i].innerHTML = SVG_CHEVRON_DOWN;
  }
}

/* ---- Setup Card Icons (onboarding) ---- */
function initSetupIcons() {
  var cards = document.querySelectorAll('.setup-card');
  for (var i = 0; i < cards.length; i++) {
    var card = cards[i];
    var icon = card.querySelector('.status-icon');
    if (!icon || icon.querySelector('svg')) continue;
    var onclick = card.getAttribute('onclick') || '';
    var matched = null;
    var keys = Object.keys(SETUP_ICONS);
    for (var k = 0; k < keys.length; k++) {
      if (onclick.toLowerCase().indexOf(keys[k]) !== -1) { matched = keys[k]; break; }
    }
    if (!matched && (onclick.indexOf('Verification') !== -1 || onclick.indexOf('verify') !== -1)) matched = 'verify';
    if (matched) icon.innerHTML = SETUP_ICONS[matched];
  }
}

/* ---- Pull to Refresh ---- */
function initPullToRefresh() {
  var shell = document.querySelector('.app-body');
  if (!shell) return;
  var startY = 0, pulling = false;
  shell.addEventListener('touchstart', function(e) {
    if (window.scrollY > 0) return;
    startY = e.touches[0].clientY;
    pulling = true;
  }, { passive: true });
  shell.addEventListener('touchmove', function(e) {
    if (!pulling || window.scrollY > 0) return;
    var dy = e.touches[0].clientY - startY;
    var el = document.querySelector('.ptr-indicator');
    if (!el) return;
    if (dy > 0 && dy < 120) {
      el.style.height = Math.min(dy, 36) + 'px';
      el.classList.add('visible');
    }
  }, { passive: true });
  shell.addEventListener('touchend', function() {
    pulling = false;
    var el = document.querySelector('.ptr-indicator');
    if (el) {
      el.style.height = '';
      el.classList.remove('visible');
    }
  }, { passive: true });
}

/* ---- Swipe Gesture Stub ---- */
function initSwipeGestures() {
  var containers = document.querySelectorAll('[data-swipe]');
  for (var i = 0; i < containers.length; i++) {
    (function(el) {
      var startX = 0, startY = 0;
      el.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      }, { passive: true });
      el.addEventListener('touchend', function(e) {
        var dx = e.changedTouches[0].clientX - startX;
        var dy = e.changedTouches[0].clientY - startY;
        if (Math.abs(dx) > Math.abs(dy) * 1.5 && Math.abs(dx) > 60) {
          var action = dx > 0 ? 'swipe-right' : 'swipe-left';
          el.dispatchEvent(new CustomEvent('swipe', { detail: { dir: action } }));
        }
      }, { passive: true });
    })(containers[i]);
  }
}

/* ---- Init on DOM ready ---- */
document.addEventListener('DOMContentLoaded', function() {
  initDarkMode();
  initBottomNav();
  initNotifications();
  initNavSheet();
  initSidebar();
  initBackButtons();
  initSendButtons();
  initChevrons();
  initSetupIcons();
  var page = window.location.pathname.split('/').pop().replace(/\.html$/, '');
  var flowPages = ['login', 'onboarding', 'booking'];
  if (flowPages.indexOf(page) === -1) {
    initPullToRefresh();
    initSwipeGestures();
  }
});
