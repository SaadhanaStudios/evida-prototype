(function () {
  /* ─── Demo journey definitions ──────────────────────────────────────────── */
  var DEMO_QUESTIONNAIRE = {
    conditions:    'Hypertension (diagnosed 2019)',
    medications:   'Lisinopril 10mg daily',
    familyHistory: 'Father: type 2 diabetes, coronary artery disease',
    allergies:     'Penicillin (rash)',
    smoking: 'never', alcohol: 'light', exercise: 'moderate',
    diet: 'omnivore',
    goals: 'Lower cardiovascular risk, improve energy, build a sustainable exercise habit'
  };
  var DEMO_WEARABLE = { id: 'apple-watch', name: 'Apple Watch Series 9', brand: 'Apple' };
  var DEMO_ACCOUNT  = { name: 'James Chen', email: 'james.chen@gmail.com' };
  var FAIL_PAY_KEY  = 'evida:demo:fail-payment';

  function isoLocal(d) {
    var p = function (n) { return (n < 10 ? '0' : '') + n; };
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
  }
  /* Booking dates are relative to today; past=true puts both behind us (post-consult). */
  function demoBookingDetails(past) {
    var blood = new Date(), gp;
    if (past) {
      blood.setDate(blood.getDate() - 12);
      gp = new Date(); gp.setDate(gp.getDate() - 3);
    } else {
      blood.setDate(blood.getDate() + 1);
      if (blood.getDay() === 0) blood.setDate(blood.getDate() + 1); // clinics closed Sundays
      gp = new Date(blood);
      var added = 0;
      while (added < 5) { gp.setDate(gp.getDate() + 1); var dow = gp.getDay(); if (dow !== 0 && dow !== 6) added++; }
    }
    return { clinic: 'Randox — Oxford Circus', bloodDate: isoLocal(blood), bloodTime: '10:30', gpDate: isoLocal(gp), gpTime: '14:00' };
  }
  function seedBooked(past) {
    EvidaStore.clearAll();
    EvidaStore.account.save(Object.assign({}, DEMO_ACCOUNT, { savedAt: new Date().toISOString() }));
    EvidaStore.booking.confirm(demoBookingDetails(past));
  }

  var JOURNEYS = [
    {
      label: 'New user',
      desc: 'Fresh account — no booking',
      action: function () {
        EvidaStore.clearAll();
        window.location.href = 'login.html';
      }
    },
    {
      label: 'Baseline booked',
      desc: 'Booking confirmed, 33% ready',
      action: function () {
        seedBooked();
        window.location.href = 'dashboard.html';
      }
    },
    {
      label: 'Pre-consult complete',
      desc: 'All tasks done, 100% ready',
      action: function () {
        seedBooked();
        EvidaStore.questionnaire.save(DEMO_QUESTIONNAIRE);
        EvidaStore.idVerification.markUploaded();  // submitted, awaiting clinical review
        EvidaStore.wearables.connect(Object.assign({}, DEMO_WEARABLE, { connectedAt: new Date().toISOString() }));
        window.location.href = 'dashboard.html';
      }
    },
    {
      label: 'Post-consult',
      desc: 'Results ready, prevention plan',
      action: function () {
        seedBooked(true);
        EvidaStore.questionnaire.save(DEMO_QUESTIONNAIRE);
        EvidaStore.idVerification.markVerified();  // reviewed & approved before the consult
        EvidaStore.wearables.connect(Object.assign({}, DEMO_WEARABLE, { connectedAt: new Date().toISOString() }));
        EvidaStore.consultations.markCompleted();
        window.location.href = 'post-consult.html';
      }
    }
  ];

  /* ─── Gear button ───────────────────────────────────────────────────────── */
  var panelOpen = false;

  var css = document.createElement('style');
  css.textContent =
    '#demoGearWrap{position:fixed;bottom:12px;left:12px;z-index:99999}' +
    '#demoGear{width:36px;height:36px;border-radius:50%;border:1px solid rgba(255,255,255,0.15);' +
      'background:rgba(10,14,26,0.85);backdrop-filter:blur(6px);color:rgba(255,255,255,0.7);' +
      'cursor:pointer;display:grid;place-items:center;transition:all 150ms;' +
      'box-shadow:0 2px 8px rgba(0,0,0,0.2);outline:none}' +
    '#demoGear:hover,#demoGear.open{background:var(--evida-teal);color:white;border-color:var(--evida-teal)}' +
    '@media(max-width:600px){#demoGear{width:32px;height:32px}}' +

    '#demoPanel{position:fixed;bottom:56px;left:12px;z-index:99998;' +
      'background:rgba(10,14,26,0.95);backdrop-filter:blur(10px);' +
      'border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:14px;' +
      'min-width:210px;box-shadow:0 8px 24px rgba(0,0,0,0.4);' +
      'opacity:0;transform:translateY(8px) scale(0.97);pointer-events:none;' +
      'transition:opacity 150ms,transform 150ms;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif}' +
    '#demoPanel.open{opacity:1;transform:translateY(0) scale(1);pointer-events:auto}' +
    '#demoPanel .dp-title{font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;' +
      'color:rgba(255,255,255,0.4);margin-bottom:10px}' +
    '#demoPanel .dp-btn{display:block;width:100%;text-align:left;padding:8px 10px;border-radius:8px;' +
      'border:1px solid rgba(255,255,255,0.08);background:transparent;cursor:pointer;margin-bottom:6px;' +
      'color:white;transition:background 120ms,border-color 120ms;font-family:inherit}' +
    '#demoPanel .dp-btn:hover{background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.2)}' +
    '#demoPanel .dp-btn .dp-btn-label{font-size:12px;font-weight:600;display:block}' +
    '#demoPanel .dp-btn .dp-btn-desc{font-size:10px;color:rgba(255,255,255,0.45);margin-top:1px;display:block}' +
    '#demoPanel .dp-divider{height:1px;background:rgba(255,255,255,0.08);margin:8px 0}' +
    '#demoPanel .dp-btn.armed{border-color:rgba(255,120,80,0.6);background:rgba(255,120,80,0.08)}' +
    '#demoPanel .dp-btn.armed .dp-btn-label{color:#ff9d7a}' +
    '#demoPanel .dp-reset{display:block;width:100%;text-align:left;padding:7px 10px;border-radius:8px;' +
      'border:none;background:transparent;cursor:pointer;font-family:inherit;' +
      'font-size:12px;font-weight:600;color:rgba(255,100,100,0.8);transition:background 120ms}' +
    '#demoPanel .dp-reset:hover{background:rgba(255,80,80,0.1);color:#ff6464}' +
    '#demoOverlay{position:fixed;inset:0;z-index:99997;display:none}';
  document.head.appendChild(css);

  /* Panel HTML */
  var panel = document.createElement('div');
  panel.id = 'demoPanel';
  panel.innerHTML =
    '<div class="dp-title">Demo controls</div>' +
    JOURNEYS.map(function (j) {
      return '<button class="dp-btn" data-journey="' + j.label + '">' +
        '<span class="dp-btn-label">' + j.label + '</span>' +
        '<span class="dp-btn-desc">' + j.desc + '</span>' +
        '</button>';
    }).join('') +
    '<div class="dp-divider"></div>' +
    '<button class="dp-btn" id="dpFailPay">' +
      '<span class="dp-btn-label">Fail next payment</span>' +
      '<span class="dp-btn-desc">Shows the declined-card state once</span>' +
    '</button>' +
    '<div class="dp-divider"></div>' +
    '<button class="dp-btn" id="dpViewSite">' +
      '<span class="dp-btn-label">View website ↗</span>' +
      '<span class="dp-btn-desc">Open the Evida marketing site</span>' +
    '</button>' +
    '<div class="dp-divider"></div>' +
    '<button class="dp-reset">↩ Reset to zero</button>';
  document.body.appendChild(panel);

  /* Gear button */
  var wrap = document.createElement('div');
  wrap.id = 'demoGearWrap';
  var gear = document.createElement('button');
  gear.id = 'demoGear';
  gear.title = 'Demo controls';
  gear.setAttribute('aria-label', 'Demo controls');
  gear.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="pointer-events:none">' +
    '<circle cx="8" cy="8" r="2.5" stroke="currentColor" stroke-width="1.2"/>' +
    '<path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3 3l1.5 1.5M11.5 11.5l1.5 1.5M3 13l1.5-1.5M11.5 4.5l1.5-1.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>' +
    '</svg>';
  wrap.appendChild(gear);
  document.body.appendChild(wrap);

  /* Click-outside overlay */
  var overlay = document.createElement('div');
  overlay.id = 'demoOverlay';
  document.body.appendChild(overlay);

  /* ─── Toggle logic ──────────────────────────────────────────────────────── */
  function openPanel() {
    panelOpen = true;
    panel.classList.add('open');
    gear.classList.add('open');
    overlay.style.display = 'block';
  }
  function closePanel() {
    panelOpen = false;
    panel.classList.remove('open');
    gear.classList.remove('open');
    overlay.style.display = 'none';
  }

  gear.addEventListener('click', function (e) {
    e.stopPropagation();
    panelOpen ? closePanel() : openPanel();
  });
  overlay.addEventListener('click', closePanel);

  /* Journey buttons */
  panel.querySelectorAll('.dp-btn[data-journey]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var label = btn.dataset.journey;
      var journey = JOURNEYS.find(function (j) { return j.label === label; });
      if (journey) { closePanel(); journey.action(); }
    });
  });

  /* Fail-next-payment toggle (one-shot; consumed by booking.html handlePayment) */
  var failBtn = panel.querySelector('#dpFailPay');
  function renderFailState() {
    var armed = false;
    try { armed = localStorage.getItem(FAIL_PAY_KEY) === '1'; } catch (_) {}
    failBtn.classList.toggle('armed', armed);
    failBtn.querySelector('.dp-btn-desc').textContent = armed
      ? 'Armed — the next payment will decline'
      : 'Shows the declined-card state once';
  }
  failBtn.addEventListener('click', function () {
    try {
      if (localStorage.getItem(FAIL_PAY_KEY) === '1') localStorage.removeItem(FAIL_PAY_KEY);
      else localStorage.setItem(FAIL_PAY_KEY, '1');
    } catch (_) {}
    renderFailState(); // stays open so the armed state is visible
  });
  renderFailState();

  /* View website — leaves the patient app for the marketing site */
  var siteBtn = panel.querySelector('#dpViewSite');
  if (siteBtn) siteBtn.addEventListener('click', function () {
    closePanel();
    window.location.href = '/';
  });

  /* Reset button */
  panel.querySelector('.dp-reset').addEventListener('click', function () {
    closePanel();
    EvidaStore.clearAll();
    window.location.href = 'login.html';
  });

  /* Escape key closes panel */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && panelOpen) closePanel();
  });
})();
