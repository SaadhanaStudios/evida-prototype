(function () {
  var ENABLED_KEY = 'evida:uat:enabled';
  var isEnabled = (function () {
    try { return localStorage.getItem(ENABLED_KEY) === 'true'; } catch (_) { return false; }
  })();
  var hasDebugParam = window.location.search.indexOf('debug=1') >= 0;

  // If ?debug=1 is present but the toggle is off, sync it so nav persistence works.
  if (hasDebugParam && !isEnabled) {
    try { localStorage.setItem(ENABLED_KEY, 'true'); } catch (_) {}
    isEnabled = true;
  }

  // Snapshot real app data BEFORE any UAT overrides
  var APP_SNAPSHOT = {};
  var SNAPSHOT_KEYS = ['evida:wearable:devices', 'evida:booking:confirmed'];
  try {
    SNAPSHOT_KEYS.forEach(function (k) { APP_SNAPSHOT[k] = localStorage.getItem(k); });
  } catch (_) {}

  var PAGE = location.pathname.split('/').pop() || 'index';
  var ALL_PAGES = ['login.html','onboarding.html','booking.html','dashboard.html','post-consult.html','wearables.html','insights.html','faq.html'];
  var STATES = window.__UAT_STATES || [];

  function pad2(n) { return (n < 10 ? '0' : '') + n; }

  // ── Persistent toggle (renders on every page, active or not) ──────────────
  var toggleEl = document.createElement('div');
  toggleEl.id = 'uatToggle';
  toggleEl.innerHTML =
    '<style>' +
    '#uatToggle{position:fixed;bottom:12px;right:12px;z-index:99999}' +
    '#uatToggle .uat-gear{width:36px;height:36px;border-radius:50%;border:1px solid rgba(255,255,255,0.15);background:rgba(10,14,26,0.85);backdrop-filter:blur(6px);color:rgba(255,255,255,0.7);cursor:pointer;display:grid;place-items:center;transition:all 150ms;box-shadow:0 2px 8px rgba(0,0,0,0.2)}' +
    '#uatToggle .uat-gear:hover{background:var(--evida-teal);color:white;border-color:var(--evida-teal)}' +
    '#uatToggle .uat-gear.active{background:var(--evida-teal);color:white;border-color:var(--evida-teal)}' +
    '@media(max-width:600px){#uatToggle .uat-gear{width:32px;height:32px}}' +
    '</style>';
  var gear = document.createElement('button');
  gear.className = 'uat-gear' + (isEnabled ? ' active' : '');
  gear.title = isEnabled ? 'UAT mode active — click to disable' : 'UAT mode — click to enable state explorer';
  gear.setAttribute('aria-label', gear.title);
  gear.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="pointer-events:none"><circle cx="8" cy="8" r="2.5" stroke="currentColor" stroke-width="1.2"/><path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3 3l1.5 1.5M11.5 11.5l1.5 1.5M3 13l1.5-1.5M11.5 4.5l1.5-1.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>';
  gear.addEventListener('click', function () {
    var next = !isEnabled;
    try { localStorage.setItem(ENABLED_KEY, String(next)); } catch (_) {}
    location.reload();
  });
  toggleEl.appendChild(gear);
  document.body.appendChild(toggleEl);

  // ── If UAT is off, stop here ─────────────────────────────────────────────
  if (!isEnabled) return;

  // ── UAT is active — build the full toolbar ──────────────────────────────

  // Prepend a "Live" pill that restores REAL app data across ALL pages
  STATES.unshift({
    id: 'live',
    label: 'Live',
    setup: function () {
      try {
        SNAPSHOT_KEYS.forEach(function (k) {
          if (APP_SNAPSHOT[k] !== undefined) {
            localStorage.setItem(k, APP_SNAPSHOT[k]);
          }
        });
      } catch (_) {}
      location.reload();
    }
  });

  var savedKey = 'evida:uat:state:' + PAGE;
  var current = (function () {
    try {
      var v = localStorage.getItem(savedKey);
      if (v === 'live') v = null;
      return STATES.find(function (s) { return s.id === v; }) ? v : (STATES[0] && STATES[0].id);
    } catch (_) { return STATES[0] && STATES[0].id; }
  })();

  window.__uatSetLive = function () {
    try {
      ALL_PAGES.forEach(function (p) { localStorage.removeItem('evida:uat:state:' + p); });
    } catch (_) {}
    current = 'live';
    var dots = document.querySelectorAll('.uat-pill');
    dots.forEach(function (d) { d.classList.toggle('uat-pill--active', d.dataset.uatId === 'live'); });
    var badge = document.getElementById('uatBadge');
    if (badge) { badge.textContent = 'Live'; }
  };

  window.__uatGoLive = function () {
    try {
      ALL_PAGES.forEach(function (p) { localStorage.removeItem('evida:uat:state:' + p); });
    } catch (_) {}
    location.reload();
  };

  function apply(id) {
    current = id;
    try { localStorage.setItem(savedKey, id); } catch (_) {}
    STATES.forEach(function (s) {
      if (s.reset) { try { s.reset(); } catch (_) {} }
    });
    var found = STATES.find(function (s) { return s.id === id; });
    if (found && found.setup) { try { found.setup(); } catch (e) { console.warn('UAT state error:', e); } }
    var dots = document.querySelectorAll('.uat-pill');
    dots.forEach(function (d) { d.classList.toggle('uat-pill--active', d.dataset.uatId === id); });
    var badge = document.getElementById('uatBadge');
    if (badge && found) { badge.textContent = found.label; }
  }

  // Build toolbar
  var tb = document.createElement('div');
  tb.id = 'uatToolbar';
  tb.innerHTML =
    '<style>' +
    '#uatToolbar{position:fixed;bottom:0;left:0;right:0;z-index:9999;background:rgba(10,14,26,0.93);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,0.08);padding:6px 12px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;justify-content:center;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif}' +
    '#uatToolbar .uat-label{color:rgba(255,255,255,0.5);font-size:10px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;margin-right:4px;white-space:nowrap}' +
    '#uatToolbar .uat-pill{font-size:11px;padding:4px 12px;border-radius:999px;border:1px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.7);background:transparent;cursor:pointer;transition:all 150ms;white-space:nowrap}' +
    '#uatToolbar .uat-pill:hover{border-color:var(--evida-teal);color:white}' +
    '#uatToolbar .uat-pill--active{background:var(--evida-teal);border-color:var(--evida-teal);color:white;font-weight:600}' +
    '#uatToolbar .uat-close{font-size:14px;color:rgba(255,255,255,0.4);background:none;border:none;cursor:pointer;padding:2px 6px;margin-left:auto}' +
    '#uatToolbar .uat-badge{margin-left:auto;font-size:10px;padding:2px 10px;border-radius:999px;background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.6)}' +
    '@media(max-width:600px){#uatToolbar{padding:4px 8px;gap:4px}#uatToolbar .uat-pill{font-size:10px;padding:3px 8px}}' +
    '</style>';

  var label = document.createElement('span');
  label.className = 'uat-label';
  label.textContent = 'UAT';
  tb.appendChild(label);

  STATES.forEach(function (s) {
    var pill = document.createElement('button');
    pill.className = 'uat-pill' + (s.id === current ? ' uat-pill--active' : '');
    pill.dataset.uatId = s.id;
    pill.textContent = s.label;
    pill.addEventListener('click', function () { apply(s.id); });
    tb.appendChild(pill);
  });

  var badge = document.createElement('span');
  badge.id = 'uatBadge';
  badge.className = 'uat-badge';
  var found = STATES.find(function (s) { return s.id === current; });
  badge.textContent = found ? found.label : '';
  tb.appendChild(badge);

  document.body.appendChild(tb);

  // Escape key to close nav sheet
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var overlay = document.getElementById('navOverlay');
      if (overlay && overlay.classList.contains('open')) {
        if (typeof closeNavSheet === 'function') closeNavSheet();
      }
    }
  });

  // Ensure the UAT toolbar sits above the gear toggle
  var toggleStyle = document.createElement('style');
  toggleStyle.textContent = '#uatToggle{bottom:52px}';
  document.head.appendChild(toggleStyle);

  // Apply initial state (skip "live" — it reloads, so never apply on page load)
  if (current !== 'live') {
    apply(current);
  }
})();
