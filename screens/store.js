/* =============================================================================
   Evida prototype — store.js
   -----------------------------------------------------------------------------
   Single source of truth for all client-side persisted state.

   WHY THIS EXISTS
     Before this module, localStorage reads/writes were scattered across 8
     screens with inconsistent key naming and ad-hoc JSON.parse/try-catch at
     every call site. This module centralises every key behind a typed,
     namespaced API so that:
       1. The prototype has one place to look for "what state exists".
       2. Handover to a real app is trivial — this file IS the data-model
          contract. Each namespace below maps to a backend resource, and each
          getter/setter documents the shape engineering must support.

   DESIGN RULES (keep these if you extend it)
     - Never read/write localStorage directly in a screen again. Add a method
       here instead.
     - Stored KEY STRINGS are frozen (see KEYS) so existing UAT sessions keep
       their data. The API may be tidier than the underlying key — that's fine.
     - Every getter is null/parse-safe and returns a sensible default. A
       screen should never have to wrap a call in try/catch.
     - Value SHAPES are documented in JSDoc. These are the contract.

   USAGE
     <script src="store.js"></script>   // load before any screen script
     EvidaStore.wearables.list()        // -> Device[]
     EvidaStore.booking.confirm()
     EvidaStore.prefs.darkMode()        // -> boolean

    KEY MAP (stored key  →  namespace.method  →  backend resource)
      evida:wearable:devices      wearables.*       GET/POST /me/devices        (Terra)
      evida:booking:confirmed     booking.*         POST /consults              (booking)
      evida:consultations:had     consultations.*   GET  /me/consultations
      evida:onboarding:completed  onboarding.*      PATCH /me { onboardedAt }
      evida:onboarding:tour       onboarding.tour*  (client-only, drop on rebuild)
      evida:medical:questionnaire questionnaire.*   PUT  /me/questionnaire
      evida:partial:account       account.partial*  (client-only signup resume)
      evida:account:saved         account.saved*    POST /auth/signup
      evida_notif_count           prefs.notif*      GET  /me/notifications?unread
      evida_dark_mode             prefs.darkMode*   PATCH /me/preferences
   UAT-only (tooling, not product data — excluded from handover data model):
     evida:uat:enabled, evida:uat:state:<page>
   ========================================================================== */
(function (global) {
  'use strict';

  /* Frozen key strings — do NOT rename without a migration. ------------------ */
  var KEYS = {
    accountSaved:          'evida:account:saved',
    bookingConfirmed:      'evida:booking:confirmed',
    consultationsHad:      'evida:consultations:had',
    consultationsLast:     'evida:consultations:last',
    darkMode:              'evida_dark_mode',     // legacy underscore key — preserved
    medicalQuestionnaire:  'evida:medical:questionnaire',
    notifChannels:         'evida:prefs:notif:channels',
    notifCount:            'evida_notif_count',   // legacy underscore key — preserved
    onboardingCompleted:   'evida:onboarding:completed',
    onboardingSetupTasks:  'evida:onboarding:setup:tasks',
    onboardingTour:        'evida:onboarding:tour',
    idVerified:            'evida:profile:id-verified',
    partialAccount:        'evida:partial:account',
    profileSaved:          'evida:profile:saved',
    wearableDevices:       'evida:wearable:devices'
  };

  /* Low-level safe primitives ------------------------------------------------ */
  function readRaw(key, fallback) {
    try {
      var v = localStorage.getItem(key);
      return v === null ? (fallback === undefined ? null : fallback) : v;
    } catch (_) { return fallback === undefined ? null : fallback; }
  }
  function writeRaw(key, value) {
    try { localStorage.setItem(key, value); return true; } catch (_) { return false; }
  }
  function removeRaw(key) {
    try { localStorage.removeItem(key); return true; } catch (_) { return false; }
  }
  function readJSON(key, fallback) {
    var raw = readRaw(key, null);
    if (raw === null) return fallback;
    try { return JSON.parse(raw); } catch (_) { return fallback; }
  }
  function writeJSON(key, obj) { return writeRaw(key, JSON.stringify(obj)); }

  /* ---------------------------------------------------------------------------
     wearables — connected health devices (Terra-style integration)
     Shape: Device = { id:string, name:string, brand?:string,
                       connectedAt?:string(ISO), ...screen-specific fields }
     ------------------------------------------------------------------------ */
  var wearables = {
    /** @returns {Array} list of connected devices ([] if none) */
    list: function () { return readJSON(KEYS.wearableDevices, []); },
    /** Replace the whole device list. @param {Array} devices */
    set: function (devices) { return writeJSON(KEYS.wearableDevices, devices || []); },
    /** @returns {boolean} */
    isConnected: function (id) {
      return this.list().some(function (d) { return d && d.id === id; });
    },
    /** Add a device if not already present. @param {Object} device */
    connect: function (device) {
      var list = this.list();
      if (!device || list.some(function (d) { return d && d.id === device.id; })) return false;
      list.push(device);
      return this.set(list);
    },
    /** Remove a device by id. */
    disconnect: function (id) {
      return this.set(this.list().filter(function (d) { return !d || d.id !== id; }));
    },
    clear: function () { return removeRaw(KEYS.wearableDevices); }
  };

  /* ---------------------------------------------------------------------------
     booking — has the member confirmed an upcoming consult?
     Stored as the string 'true' when confirmed; absent otherwise.
     ------------------------------------------------------------------------ */
  var booking = {
    isConfirmed: function () { return readRaw(KEYS.bookingConfirmed, null) === 'true'; },
    confirm: function () { return writeRaw(KEYS.bookingConfirmed, 'true'); },
    clear: function () { return removeRaw(KEYS.bookingConfirmed); }
  };

  /* ---------------------------------------------------------------------------
     onboarding — first-run completion flag + in-tour step pointer
     completed: timestamp string (Date.now()); tour: 1-based step int
     ------------------------------------------------------------------------ */
  var onboarding = {
    isCompleted: function () { return readRaw(KEYS.onboardingCompleted, null) !== null; },
    /** @returns {number|null} epoch ms, or null if never completed */
    completedAt: function () {
      var v = readRaw(KEYS.onboardingCompleted, null);
      return v === null ? null : parseInt(v, 10);
    },
    markCompleted: function () { return writeRaw(KEYS.onboardingCompleted, Date.now().toString()); },
    /** @returns {number} current 1-based tour step (default 1) */
    tourStep: function () { return parseInt(readRaw(KEYS.onboardingTour, '1'), 10) || 1; },
    setTourStep: function (step) { return writeRaw(KEYS.onboardingTour, String(step)); },
    clearTour: function () { return removeRaw(KEYS.onboardingTour); },
    /** @returns {string[]} list of completed setup task IDs */
    setupTasks: function () { return readJSON(KEYS.onboardingSetupTasks, []); },
    /** @param {string} taskId */
    completeTask: function (taskId) {
      var tasks = this.setupTasks();
      if (tasks.indexOf(taskId) === -1) {
        tasks.push(taskId);
        return writeJSON(KEYS.onboardingSetupTasks, tasks);
      }
      return false;
    },
    /** @param {string} taskId @returns {boolean} */
    isTaskDone: function (taskId) {
      return this.setupTasks().indexOf(taskId) !== -1;
    },
    clearSetupTasks: function () { return removeRaw(KEYS.onboardingSetupTasks); }
  };

  /* ---------------------------------------------------------------------------
     questionnaire — medical history capture
     Shape: { meds, supps, family, lifestyle, completedAt:string(ISO) }
     ------------------------------------------------------------------------ */
  var questionnaire = {
    /** @returns {Object|null} */
    get: function () { return readJSON(KEYS.medicalQuestionnaire, null); },
    isCompleted: function () { return this.get() !== null; },
    /** @param {Object} data — merged with completedAt timestamp */
    save: function (data) {
      var payload = Object.assign({}, data, { completedAt: new Date().toISOString() });
      return writeJSON(KEYS.medicalQuestionnaire, payload);
    },
    clear: function () { return removeRaw(KEYS.medicalQuestionnaire); }
  };

  /* ---------------------------------------------------------------------------
     account — signup resume (partial) + saved account
     partial: { ...whatever the signup form captured } | null
     saved:   { ...account fields }
     ------------------------------------------------------------------------ */
  var account = {
    partial: function () { return readJSON(KEYS.partialAccount, null); },
    setPartial: function (data) { return writeJSON(KEYS.partialAccount, data); },
    clearPartial: function () { return removeRaw(KEYS.partialAccount); },
    saved: function () { return readJSON(KEYS.accountSaved, null); },
    save: function (data) { return writeJSON(KEYS.accountSaved, data); }
  };

  /* ---------------------------------------------------------------------------
     prefs — UI preferences (notification badge count, dark mode)
     notifCount: int (default 3); darkMode: boolean stored as '1'/'0'
     ------------------------------------------------------------------------ */
  var prefs = {
    notifCount: function () { return parseInt(readRaw(KEYS.notifCount, '3'), 10) || 0; },
    setNotifCount: function (n) { return writeRaw(KEYS.notifCount, String(n)); },
    darkMode: function () { return readRaw(KEYS.darkMode, null) === '1'; },
    setDarkMode: function (on) { return writeRaw(KEYS.darkMode, on ? '1' : '0'); },
    /** @param {string} channel @returns {boolean} */
    notifChannel: function (channel) {
      var defaults = { email: true, push: true, sms: false, calendar: true,
                       'appt-sms': true, 'appt-email': true, 'checklist-email': true,
                       newsletter: true, promo: false };
      var all = readJSON(KEYS.notifChannels, null);
      return all && typeof all[channel] === 'boolean' ? all[channel] : defaults[channel] !== undefined ? defaults[channel] : true;
    },
    /** @param {string} channel @param {boolean} on */
    setNotifChannel: function (channel, on) {
      var all = readJSON(KEYS.notifChannels, {});
      all[channel] = !!on;
      return writeJSON(KEYS.notifChannels, all);
    }
  };

  /* ---------------------------------------------------------------------------
     consultations — post-consult summary state
     Shape: { hadConsultation:boolean, completedAt:number|null }
     ------------------------------------------------------------------------ */
  var consultations = {
    /** @returns {boolean} */
    hadConsultation: function () { return readRaw(KEYS.consultationsHad, null) === '1'; },
    /** @returns {number|null} epoch ms of last consult, or null */
    completedAt: function () {
      var v = readRaw(KEYS.consultationsLast, null);
      return v === null ? null : parseInt(v, 10);
    },
    /** Mark a consultation as completed (sets both had and timestamp) */
    markCompleted: function () {
      writeRaw(KEYS.consultationsHad, '1');
      return writeRaw(KEYS.consultationsLast, Date.now().toString());
    },
    /** Reset consultation state */
    reset: function () {
      removeRaw(KEYS.consultationsHad);
      return removeRaw(KEYS.consultationsLast);
    }
  };

  /* ---------------------------------------------------------------------------
      profile — member personal info (editable on Profile screen)
      Shape: { name:string, email:string, phone:string, dob:string, address:string }
      ------------------------------------------------------------------------ */
  var profile = {
    /** @returns {Object|null} saved profile or null */
    get: function () { return readJSON(KEYS.profileSaved, null); },
    /** @param {Object} data */
    save: function (data) { return writeJSON(KEYS.profileSaved, data); },
    clear: function () { return removeRaw(KEYS.profileSaved); }
  };

  /* ---------------------------------------------------------------------------
     idVerification — has the member uploaded their photo ID?
     ------------------------------------------------------------------------ */
  var idVerification = {
    isVerified: function () { return readRaw(KEYS.idVerified, null) === 'true'; },
    setVerified: function () { return writeRaw(KEYS.idVerified, 'true'); },
    clear: function () { return removeRaw(KEYS.idVerified); }
  };

  global.EvidaStore = {
    KEYS: KEYS,
    wearables: wearables,
    booking: booking,
    consultations: consultations,
    onboarding: onboarding,
    questionnaire: questionnaire,
    account: account,
    profile: profile,
    prefs: prefs,
    idVerification: idVerification,
    /** Clear all product state and legacy UAT state keys. */
    clearAll: function () {
      booking.clear(); questionnaire.clear(); wearables.clear();
      consultations.reset(); idVerification.clear();
      try {
        ['login.html','booking.html','dashboard.html','post-consult.html',
         'wearables.html','insights.html','faq.html'].forEach(function (p) {
          localStorage.removeItem('evida:uat:state:' + p);
        });
      } catch (_) {}
    },
    /* escape hatches for one-off / UAT use — prefer a namespace method */
    _readJSON: readJSON,
    _writeJSON: writeJSON,
    _readRaw: readRaw,
    _writeRaw: writeRaw,
    _removeRaw: removeRaw
  };
})(window);
