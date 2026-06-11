/* Ask Evi — floating chatbot, bottom-right on every signed-in screen.
   Click-to-open (never auto-pops, per UAT feedback). Canned answers only;
   the full experience lives in ask-evi.html. */
(function () {
  // The full chatbot page doesn't need the mini widget on top of itself
  if (/ask-evi\.html$/.test(location.pathname)) return;

  var REPLIES = [
    { match: /fast|blood test|prepare/i,
      text: 'For your blood test: fast for 10–12 hours beforehand — water is fine. Allow 30 minutes at the clinic and arrive 5 minutes early. Your results go straight to your Evida GP.' },
    { match: /result|report|when/i,
      text: 'Blood results take 4–5 working days to process. You won’t receive them directly — your GP reviews them with you during your 45-minute consultation, so nothing is left unexplained.' },
    { match: /hba1c|cholesterol|ldl|vitamin|biomarker/i,
      text: 'Your Baseline measures 42 biomarkers including HbA1c (blood sugar), cholesterol, vitamin D, and inflammation markers. You can explore each one with the ? tooltips in Data & Insights.' },
    { match: /cancel|refund/i,
      text: 'You can cancel within 14 days for a full refund. After that, your membership runs for the full 12 months. Details are in the FAQ under Membership & pricing.' },
    { match: /price|cost|pay|discount/i,
      text: 'Evida membership is £320/year, which includes your Baseline blood panel, GP consultation, prevention plan, and 12 months of tracking. Discount codes are entered at payment.' }
  ];
  var FALLBACK = 'Good question — I can help with bookings, biomarkers, results, and membership. For anything more detailed, open the full Ask Evi chat below.';

  var css = document.createElement('style');
  css.textContent =
    '#eviFab{position:fixed;bottom:16px;right:16px;z-index:9990;width:52px;height:52px;border-radius:50%;' +
      'border:none;background:var(--color-primary,#147D77);color:white;cursor:pointer;' +
      'display:grid;place-items:center;box-shadow:0 4px 14px rgba(0,0,0,0.22);transition:transform 150ms,box-shadow 150ms}' +
    '#eviFab:hover{transform:scale(1.06);box-shadow:0 6px 18px rgba(0,0,0,0.28)}' +
    '@media(max-width:600px){#eviFab{bottom:80px;right:12px;width:48px;height:48px}}' +

    '#eviPanel{position:fixed;bottom:80px;right:16px;z-index:9991;width:320px;max-width:calc(100vw - 32px);' +
      'background:var(--evida-surface,#fff);border:1px solid var(--evida-border,#E3E6EC);border-radius:16px;' +
      'box-shadow:0 12px 36px rgba(0,0,0,0.18);display:flex;flex-direction:column;overflow:hidden;' +
      'opacity:0;transform:translateY(10px) scale(0.98);pointer-events:none;transition:opacity 160ms,transform 160ms;' +
      'font-family:var(--font-body,-apple-system,sans-serif)}' +
    '#eviPanel.open{opacity:1;transform:translateY(0) scale(1);pointer-events:auto}' +
    '@media(max-width:600px){#eviPanel{bottom:140px}}' +
    '#eviPanel .ev-head{background:linear-gradient(120deg,var(--evida-navy,#0B2240),var(--evida-teal-dark,#0E5F5B));' +
      'color:white;padding:14px 16px;display:flex;align-items:center;gap:10px}' +
    '#eviPanel .ev-head .ev-dot{width:8px;height:8px;border-radius:50%;background:#5BE3A9;flex-shrink:0}' +
    '#eviPanel .ev-head .ev-title{font-size:14px;font-weight:700;flex:1}' +
    '#eviPanel .ev-head .ev-sub{font-size:10px;opacity:0.75;display:block;font-weight:400;margin-top:1px}' +
    '#eviPanel .ev-close{background:none;border:none;color:rgba(255,255,255,0.8);font-size:18px;cursor:pointer;padding:2px 4px}' +
    '#eviPanel .ev-body{padding:14px;height:260px;overflow-y:auto;display:flex;flex-direction:column;gap:8px;background:var(--evida-bg,#F7F8FA)}' +
    '#eviPanel .ev-msg{max-width:85%;padding:9px 12px;border-radius:12px;font-size:12px;line-height:1.5}' +
    '#eviPanel .ev-msg.evi{background:white;border:1px solid var(--evida-border,#E3E6EC);border-bottom-left-radius:4px;align-self:flex-start;color:var(--evida-fg,#1A2433)}' +
    '#eviPanel .ev-msg.me{background:var(--color-primary,#147D77);color:white;border-bottom-right-radius:4px;align-self:flex-end}' +
    '#eviPanel .ev-chips{display:flex;flex-wrap:wrap;gap:6px;padding:0 14px 10px;background:var(--evida-bg,#F7F8FA)}' +
    '#eviPanel .ev-chip{font-size:11px;font-weight:600;padding:5px 10px;border-radius:999px;border:1px solid var(--evida-border,#E3E6EC);' +
      'background:white;color:var(--evida-teal-dark,#0E5F5B);cursor:pointer;transition:background 120ms}' +
    '#eviPanel .ev-chip:hover{background:var(--evida-teal-light,#E3F2F0)}' +
    '#eviPanel .ev-input-row{display:flex;gap:8px;padding:10px;border-top:1px solid var(--evida-border,#E3E6EC);background:var(--evida-surface,#fff)}' +
    '#eviPanel .ev-input-row input{flex:1;height:38px;border:1px solid var(--evida-border,#E3E6EC);border-radius:10px;padding:0 12px;' +
      'font-size:12px;outline:none;font-family:inherit;color:var(--evida-fg,#1A2433);background:var(--evida-surface,#fff)}' +
    '#eviPanel .ev-input-row input:focus{border-color:var(--color-primary,#147D77)}' +
    '#eviPanel .ev-input-row button{width:38px;height:38px;border-radius:10px;border:none;background:var(--color-primary,#147D77);' +
      'color:white;cursor:pointer;display:grid;place-items:center;flex-shrink:0}' +
    '#eviPanel .ev-full{display:block;text-align:center;font-size:11px;font-weight:600;color:var(--color-primary,#147D77);' +
      'padding:8px;background:var(--evida-surface,#fff);cursor:pointer;border-top:1px solid var(--evida-border,#E3E6EC)}' +
    '#eviPanel .ev-full:hover{background:var(--evida-bg,#F7F8FA)}';
  document.head.appendChild(css);

  var fab = document.createElement('button');
  fab.id = 'eviFab';
  fab.title = 'Ask Evi';
  fab.setAttribute('aria-label', 'Ask Evi — chat assistant');
  fab.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="pointer-events:none"><path d="M21 11.5a8.38 8.38 0 0 1-9 8.4 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.2A8.38 8.38 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5z"/></svg>';
  document.body.appendChild(fab);

  var panel = document.createElement('div');
  panel.id = 'eviPanel';
  panel.innerHTML =
    '<div class="ev-head">' +
      '<span class="ev-dot"></span>' +
      '<span class="ev-title">Ask Evi<span class="ev-sub">General health info — not medical advice</span></span>' +
      '<button class="ev-close" aria-label="Close">×</button>' +
    '</div>' +
    '<div class="ev-body" id="eviBody">' +
      '<div class="ev-msg evi">Hi! I’m Evi. Ask me about your bookings, biomarkers, or how Evida works.</div>' +
    '</div>' +
    '<div class="ev-chips">' +
      '<button class="ev-chip">How do I prepare for my blood test?</button>' +
      '<button class="ev-chip">When do I get my results?</button>' +
      '<button class="ev-chip">What does HbA1c mean?</button>' +
    '</div>' +
    '<div class="ev-input-row">' +
      '<input type="text" id="eviInput" placeholder="Type a question…">' +
      '<button id="eviSend" aria-label="Send"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button>' +
    '</div>' +
    '<a class="ev-full" onclick="window.location.href=\'ask-evi.html\'">Open full Ask Evi →</a>';
  document.body.appendChild(panel);

  function openPanel()  { panel.classList.add('open'); setTimeout(function () { document.getElementById('eviInput').focus(); }, 180); }
  function closePanel() { panel.classList.remove('open'); }

  fab.addEventListener('click', function () {
    panel.classList.contains('open') ? closePanel() : openPanel();
  });
  panel.querySelector('.ev-close').addEventListener('click', closePanel);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && panel.classList.contains('open')) closePanel();
  });

  function addMsg(text, who) {
    var body = document.getElementById('eviBody');
    var div = document.createElement('div');
    div.className = 'ev-msg ' + who;
    div.textContent = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }

  function answer(q) {
    var hit = REPLIES.find(function (r) { return r.match.test(q); });
    setTimeout(function () { addMsg(hit ? hit.text : FALLBACK, 'evi'); }, 650);
  }

  function send(text) {
    var q = (text || document.getElementById('eviInput').value).trim();
    if (!q) return;
    addMsg(q, 'me');
    document.getElementById('eviInput').value = '';
    answer(q);
  }

  panel.querySelector('#eviSend').addEventListener('click', function () { send(); });
  panel.querySelector('#eviInput').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') send();
  });
  panel.querySelectorAll('.ev-chip').forEach(function (chip) {
    chip.addEventListener('click', function () { send(chip.textContent); });
  });
})();
