(function () {
  /* ─── Demo journey definitions ──────────────────────────────────────────── */
  var DEMO_QUESTIONNAIRE = {
    conditions:    'Hypertension (diagnosed 2019)',
    medications:   'Lisinopril 10mg daily',
    familyHistory: 'Father: type 2 diabetes, coronary artery disease',
    allergies:     'Penicillin (rash)',
    smoking: 'never', alcohol: 'light', exercise: 'moderate'
  };
  var DEMO_WEARABLE = { id: 'apple-watch', name: 'Apple Watch Series 9', brand: 'Apple' };

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
        EvidaStore.clearAll();
        EvidaStore.booking.confirm();
        window.location.href = 'dashboard.html';
      }
    },
    {
      label: 'Pre-consult complete',
      desc: 'All tasks done, 100% ready',
      action: function () {
        EvidaStore.clearAll();
        EvidaStore.booking.confirm();
        EvidaStore.questionnaire.save(DEMO_QUESTIONNAIRE);
        EvidaStore.idVerification.setVerified();
        EvidaStore.wearables.connect(Object.assign({}, DEMO_WEARABLE, { connectedAt: new Date().toISOString() }));
        window.location.href = 'dashboard.html';
      }
    },
    {
      label: 'Post-consult',
      desc: 'Results ready, prevention plan',
      action: function () {
        EvidaStore.clearAll();
        EvidaStore.booking.confirm();
        EvidaStore.questionnaire.save(DEMO_QUESTIONNAIRE);
        EvidaStore.idVerification.setVerified();
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
    '#demoGearWrap{position:fixed;bottom:12px;right:12px;z-index:99999}' +
    '#demoGear{width:36px;height:36px;border-radius:50%;border:1px solid rgba(255,255,255,0.15);' +
      'background:rgba(10,14,26,0.85);backdrop-filter:blur(6px);color:rgba(255,255,255,0.7);' +
      'cursor:pointer;display:grid;place-items:center;transition:all 150ms;' +
      'box-shadow:0 2px 8px rgba(0,0,0,0.2);outline:none}' +
    '#demoGear:hover,#demoGear.open{background:var(--evida-teal);color:white;border-color:var(--evida-teal)}' +
    '@media(max-width:600px){#demoGear{width:32px;height:32px}}' +

    '#demoPanel{position:fixed;bottom:56px;right:12px;z-index:99998;' +
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
