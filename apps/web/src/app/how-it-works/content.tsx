// @ts-nocheck
'use client'

import PageClient from '@/components/PageClient'
import { SHARED_SCRIPT_QUEUE } from '@/lib/site-scripts'
import HowItWorksAnimator from './HowItWorksAnimator'

const PAGE_HTML = `
<style>
/* === Process timeline rail === */
  
  /* process-main ko positioning context banao */
  .process-main {
    position: relative;
  }

  /* Rail wrapper — JS dynamically top + height set karega */
  .loop-rail {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    pointer-events: none;
    z-index: 1;
  }

  /* Track — grey background line */
  .loop-rail-track {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  background-color: rgba(33, 106, 116, 0.2);
  border-radius: 2px;
}

  /* Fill — colored line jo grow karegi */
  .loop-rail-fill {
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 0;
    background-color: #F8B6AA;
    border-radius: 2px;
    will-change: height;
  }

  /* Saare row variants — div-step-item__row, -copy, -copy reverse */
  [class*="div-step-item__row"] {
    position: relative !important;
  }

  /* Overflow visible taaki node clip na ho */
  [class*="div-step-item__row"],
  .div-step-item__image-wrap,
  .div-step-item__content {
    overflow: visible !important;
  }

  /* Default wrapper state — fill abhi nahi pahuncha */
  .loop-node-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    border-radius: 8px;
    z-index: 2;
    border: 5px solid #EEEDE7;
    background-color: #DBDAD1;
    transition: border-color 0.3s ease, background-color 0.3s ease;
  }

  /* Active state — fill jab is wrapper tak pahunch jaaye */
  .loop-node-wrapper.is-active {
    border-color: #F8B6AA;
    background-color: #FEF2A7;
  }

  /* Inner node dot */
  .loop-node {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 12px;
    border-radius: 999px;
    background-color: #2D2700;
    z-index: 2;
  }

  /* End wrapper — process-main ka direct child, normal flow mein */
  .process-main > .loop-node-wrapper {
    position: relative !important;
    top: auto !important;
    left: auto !important;
    transform: none !important;
    margin: 24px auto 0 !important;
  }

  /* End wrapper ke andar ka loop-node — wrapper ke center mein */
  .process-main > .loop-node-wrapper > .loop-node {
    position: absolute !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    margin: 0 !important;
  }

  /* Mobile (≤580px) — rail left edge pe, nodes row ke top-left pe */
@media (max-width: 765px) {
  /* Rail left mein move */
  .loop-rail {
    left: 40px;
    transform: translateX(-50%);
  }

  /* Row wrappers — row ke top mein, left aligned */
  .loop-node-wrapper {
    top: 30px;
    left: 40px;
    transform: translateX(-50%);
    width: 32px;
    height: 32px;
  }

  /* End wrapper override — left aligned (center se hata ke) */
  .process-main > .loop-node-wrapper {
  margin: 150px 0 0 40px !important;
  transform: translateX(-50%) !important;
}
}
</style>
<section class="nav-nav"><div data-animation="default" data-collapse="medium" data-duration="400" data-easing="ease-out" data-easing2="ease-in-out" data-doc-height="1" role="banner" class="nav-navbar w-nav"><div class="boxed-container-2"><div class="nav-wrapper w-container"><a href="/" class="a-navbar__brand w-nav-brand"><div class="code-embed-2 navbar__logo-svg w-embed"><svg class="navbar__logo-svg" width="120" viewBox="0 0 95 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.5564 22.2846C20.5564 23.021 19.9975 23.618 19.308 23.618H12.7543L12.7543 15.2845L20.5564 15.2845V22.2846Z" fill="white"/>
<path d="M1.52772e-06 2.98174C1.52772e-06 2.24535 0.558894 1.64838 1.24832 1.64838H7.80201V9.98186H1.52772e-06V2.98174Z" fill="white"/>
<path d="M1.24832 23.618C0.558892 23.618 3.16606e-07 23.021 2.86471e-07 22.2846L0 15.2845H7.80201L7.80201 23.618H1.24832Z" fill="white"/>
<path d="M19.3357 3.55281C17.6445 3.55281 16.2735 4.98894 16.2735 6.76049C16.2735 8.53205 17.6445 9.96818 19.3357 9.96818C21.0269 9.96818 22.3979 8.53205 22.3979 6.7605C22.3979 4.98894 21.0269 3.55281 19.3357 3.55281Z" fill="#FF5A5F"/>
<path d="M15.8263 0C14.1297 -7.92117e-08 12.7543 1.43613 12.7543 3.20768C12.7543 4.97924 14.1297 6.41536 15.8263 6.41536C17.5229 6.41536 18.8982 4.97924 18.8982 3.20768C18.8982 1.43613 17.5229 7.92117e-08 15.8263 0Z" fill="#FF5A5F"/>
<path d="M19.3259 9.96818L16.4885 6.06262L12.7543 3.20768V9.96818H19.3259Z" fill="#FF5A5F"/>
<path d="M30.8786 23.618V1.88418H43.1588V4.21887H33.3426V11.5625H42.5229V13.8972H33.3426V21.2833H43.3178V23.618H30.8786Z" fill="white"/>
<path d="M58.9215 7.31763L53.2782 23.618H50.8937L45.2504 7.31763H47.7938L52.0065 20.307H52.1654L56.378 7.31763H58.9215Z" fill="white"/>
<path d="M61.177 23.618V7.31763H63.5218V23.618H61.177ZM62.3693 4.60091C61.9122 4.60091 61.5181 4.43465 61.187 4.10213C60.8624 3.76962 60.7001 3.36989 60.7001 2.90295C60.7001 2.43602 60.8624 2.03629 61.187 1.70378C61.5181 1.37126 61.9122 1.205 62.3693 1.205C62.8263 1.205 63.2171 1.37126 63.5416 1.70378C63.8728 2.03629 64.0384 2.43602 64.0384 2.90295C64.0384 3.36989 63.8728 3.76962 63.5416 4.10213C63.2171 4.43465 62.8263 4.60091 62.3693 4.60091Z" fill="white"/>
<path d="M72.7395 23.9575C71.4678 23.9575 70.3451 23.6144 69.3714 22.9282C68.3978 22.2348 67.6361 21.2585 67.0863 19.9992C66.5365 18.7328 66.2617 17.2365 66.2617 15.5102C66.2617 13.7981 66.5365 12.3124 67.0863 11.0531C67.6361 9.79381 68.4011 8.82102 69.3814 8.13477C70.3617 7.44851 71.4943 7.10538 72.7793 7.10538C73.7728 7.10538 74.5577 7.28225 75.134 7.63599C75.7168 7.98266 76.1606 8.37885 76.4653 8.82456C76.7766 9.2632 77.0184 9.62401 77.1906 9.907H77.3893V1.88418H79.7341V23.618H77.4688V21.1135H77.1906C77.0184 21.4106 76.7733 21.7856 76.4554 22.2384C76.1374 22.6841 75.6837 23.0838 75.0942 23.4376C74.5047 23.7842 73.7198 23.9575 72.7395 23.9575ZM73.0575 21.7078C73.998 21.7078 74.7929 21.446 75.442 20.9225C76.0911 20.3919 76.5845 19.6596 76.9223 18.7257C77.2601 17.7848 77.429 16.6988 77.429 15.4678C77.429 14.2509 77.2635 13.1862 76.9323 12.2735C76.6011 11.3538 76.1109 10.6392 75.4618 10.1299C74.8127 9.6134 74.0113 9.35517 73.0575 9.35517C72.0639 9.35517 71.236 9.62755 70.5736 10.1723C69.9179 10.71 69.4244 11.4422 69.0932 12.369C68.7687 13.2888 68.6064 14.3217 68.6064 15.4678C68.6064 16.6281 68.772 17.6822 69.1032 18.6302C69.441 19.5712 69.9378 20.3211 70.5935 20.88C71.2559 21.4318 72.0772 21.7078 73.0575 21.7078Z" fill="white"/>
<path d="M88.0055 24C87.0384 24 86.1608 23.8054 85.3726 23.4163C84.5844 23.0201 83.9585 22.4506 83.4948 21.7078C83.0312 20.9578 82.7993 20.0523 82.7993 18.991C82.7993 18.0572 82.9715 17.3002 83.316 16.72C83.6604 16.1328 84.1207 15.673 84.697 15.3404C85.2732 15.0079 85.9091 14.7603 86.6046 14.5976C87.3067 14.4278 88.0121 14.2934 88.7208 14.1943C89.6481 14.067 90.3999 13.9715 90.9762 13.9078C91.559 13.8371 91.9829 13.7203 92.2479 13.5576C92.5195 13.3949 92.6552 13.1119 92.6552 12.7086V12.6237C92.6552 11.5767 92.387 10.7631 91.8505 10.1829C91.3206 9.60279 90.5158 9.31272 89.4362 9.31272C88.3168 9.31272 87.4392 9.57449 86.8033 10.098C86.1674 10.6216 85.7203 11.1805 85.462 11.7748L83.2365 10.9258C83.6339 9.9353 84.1638 9.16415 84.8261 8.61232C85.4951 8.05341 86.2237 7.66429 87.0119 7.44497C87.8068 7.21858 88.5884 7.10538 89.3567 7.10538C89.8468 7.10538 90.4098 7.16906 91.0457 7.2964C91.6882 7.41667 92.3075 7.66783 92.9036 8.04987C93.5064 8.43191 94.0065 9.0085 94.4039 9.77966C94.8013 10.5508 95 11.5837 95 12.8784V23.618H92.6552V21.4106H92.536C92.3771 21.7644 92.1121 22.1429 91.7412 22.5461C91.3703 22.9494 90.8768 23.2925 90.2608 23.5755C89.6448 23.8585 88.893 24 88.0055 24ZM88.3631 21.7502C89.2904 21.7502 90.072 21.5557 90.7079 21.1665C91.3504 20.7774 91.8339 20.2751 92.1585 19.6596C92.4896 19.0441 92.6552 18.3968 92.6552 17.7176V15.4253C92.5559 15.5527 92.3373 15.6694 91.9995 15.7755C91.6683 15.8746 91.2842 15.963 90.847 16.0409C90.4165 16.1116 89.9959 16.1753 89.5852 16.2319C89.1812 16.2814 88.8533 16.3238 88.6016 16.3592C87.9922 16.4441 87.4226 16.5821 86.8927 16.7731C86.3694 16.957 85.9455 17.2365 85.621 17.6115C85.303 17.9793 85.1441 18.4817 85.1441 19.1184C85.1441 19.9886 85.4454 20.6465 86.0482 21.0923C86.6576 21.5309 87.4292 21.7502 88.3631 21.7502Z" fill="white"/>
</svg>

</div></a><div class="menu-items-wrapper"><nav role="navigation" class="div-navbar__menu w-nav-menu"><a href="/how-it-works" aria-current="page" class="nav-link-3 w-nav-link w--current">How it works</a><a href="/membership" class="nav-link-3 w-nav-link">Membership</a><a href="/posts" class="nav-link-3 w-nav-link">Blog</a><a href="/about-us" class="nav-link-3 w-nav-link">About us</a><a href="/contact-us" class="nav-link-3 w-nav-link">Contact us</a></nav></div><div class="w-layout-blockcontainer link-block-2 w-container"><a data-wf--global-button---pop-up-trigger--variant="green-variants" href="/app/screens/login.html" class="global-button w-variant-62f42df2-6780-9e0b-4407-658c8b7f8080 modal-trigger-button w-button">Get Started</a></div><div class="div-navbar__burger w-nav-button"><div class="code-embed-3 w-embed"><svg class="nav-burger" width="24" height="18" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.5 5.5H13.8333M0.5 0.5H13.8333M0.5 10.5H13.8333" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"/>
</svg></div></div><div class="w-embed"></div></div></div></div></section><section data-theme="dark" class="section-hero-wrapper"><div class="hero-wrapper"><div class="div-announcement-bar"><div>Pilot now live — book your Baseline today</div></div><div class="div-hero-bg-image"><div class="boxed-container-howitworks"><div class="div-hero-content-left"><h1 class="h1-heading">Your Health Journey,</h1><div class="w-layout-hflex span-hero__heading-line2"><h1 class="h1-heading">Guided by</h1><h1 class="h1-headig-italic"> Evida</h1></div><div class="p-hero__subtext">Data. Insights. Action — three steps to a healthier you.</div><a data-wf--global-button---pop-up-trigger--variant="yellow-variants" href="/app/screens/login.html" class="global-button modal-trigger-button w-button">Get Started</a></div><svg class="image-36" viewBox="0 0 800 500" role="img" aria-label="Your health journey rising from Evida through Data, Insights and Action to confidence in your future health" style="width:100%;height:auto;max-width:798px;overflow:visible;"><path d="M40 470 L170 470" stroke="rgba(255,255,255,0.5)" stroke-width="2" fill="none"/><path d="M170 470 L275 468 C360 464 430 430 495 380 C560 335 600 300 625 255 C665 190 695 130 720 70" stroke="rgba(255,255,255,0.5)" stroke-width="2" fill="none" stroke-linecap="round" stroke-dasharray="2 8"/><path d="M275 462 L275 380" stroke="rgba(255,255,255,0.32)" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-dasharray="2 7"/><path d="M495 374 L495 302" stroke="rgba(255,255,255,0.32)" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-dasharray="2 7"/><path d="M625 249 L625 172" stroke="rgba(255,255,255,0.32)" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-dasharray="2 7"/><rect x="166" y="466" width="8" height="8" fill="#fef2a7"/><rect x="271" y="464" width="8" height="8" fill="#fef2a7"/><rect x="491" y="376" width="8" height="8" fill="#fef2a7"/><rect x="621" y="251" width="8" height="8" fill="#fef2a7"/><rect x="716" y="66" width="8" height="8" fill="#fef2a7"/><text x="40" y="444" text-anchor="start" style="font-family:Geist, sans-serif;font-weight:600;font-size:20px;letter-spacing:0.06em;" fill="#fff">EVIDA</text><text x="275" y="332" text-anchor="middle" style="font-family:Geist, sans-serif;font-weight:600;font-size:20px;letter-spacing:0.08em;" fill="#fff">DATA</text><text x="275" y="353" text-anchor="middle" style="font-family:Inter, sans-serif;font-weight:400;font-size:12.5px;letter-spacing:0;" fill="rgba(255,255,255,0.62)">Understand your</text><text x="275" y="369" text-anchor="middle" style="font-family:Inter, sans-serif;font-weight:400;font-size:12.5px;letter-spacing:0;" fill="rgba(255,255,255,0.62)">health signals</text><text x="495" y="252" text-anchor="middle" style="font-family:Geist, sans-serif;font-weight:600;font-size:20px;letter-spacing:0.08em;" fill="#fff">INSIGHTS</text><text x="495" y="273" text-anchor="middle" style="font-family:Inter, sans-serif;font-weight:400;font-size:12.5px;letter-spacing:0;" fill="rgba(255,255,255,0.62)">Personalised insights and</text><text x="495" y="289" text-anchor="middle" style="font-family:Inter, sans-serif;font-weight:400;font-size:12.5px;letter-spacing:0;" fill="rgba(255,255,255,0.62)">recommendations</text><text x="625" y="122" text-anchor="middle" style="font-family:Geist, sans-serif;font-weight:600;font-size:20px;letter-spacing:0.08em;" fill="#fff">ACTION</text><text x="625" y="143" text-anchor="middle" style="font-family:Inter, sans-serif;font-weight:400;font-size:12.5px;letter-spacing:0;" fill="rgba(255,255,255,0.62)">Take the right</text><text x="625" y="159" text-anchor="middle" style="font-family:Inter, sans-serif;font-weight:400;font-size:12.5px;letter-spacing:0;" fill="rgba(255,255,255,0.62)">next step</text><text x="706" y="30" text-anchor="middle" style="font-family:Inter, sans-serif;font-weight:500;font-size:13px;letter-spacing:0;" fill="rgba(255,255,255,0.85)">Confidence in your</text><text x="706" y="47" text-anchor="middle" style="font-family:Inter, sans-serif;font-weight:500;font-size:13px;letter-spacing:0;" fill="rgba(255,255,255,0.85)">future health</text></svg></div></div></div></section><style>
.hiw-trust{background:#fff;border-bottom:1px solid rgba(33,106,116,0.10);padding:22px 24px;font-family:var(--font-inter),Inter,sans-serif;}
.hiw-trust .ht-row{max-width:1080px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:14px 30px;}
.hiw-trust .ht-item{display:inline-flex;align-items:center;gap:9px;color:#09332e;font-size:13.5px;font-weight:500;}
@supports (animation-timeline: view()){.ev-reveal{animation:evReveal both;animation-timeline:view();animation-range:entry 6% entry 46%;}@keyframes evReveal{from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:none;}}}
</style><section class="hiw-trust" aria-label="Trust and credentials"><div class="ht-row"><span class="ht-item"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 2l8 3v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V5l8-3z" stroke="#216a74" stroke-width="1.6"/><path d="M8.5 12l2.4 2.4 4.4-5" stroke="#216a74" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>CQC Registered</span><span class="ht-item"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="#216a74" stroke-width="1.6"/><path d="M4 21c0-4 3.5-6 8-6s8 2 8 6" stroke="#216a74" stroke-width="1.6" stroke-linecap="round"/></svg>GMC-Licensed GPs</span><span class="ht-item"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><rect x="4" y="10" width="16" height="11" rx="2" stroke="#216a74" stroke-width="1.6"/><path d="M8 10V7a4 4 0 018 0v3" stroke="#216a74" stroke-width="1.6" stroke-linecap="round"/></svg>GDPR Compliant</span><span class="ht-item"><svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 3c3.4 4.4 6 7 6 10.4A6 6 0 016 13.4C6 10 8.6 7.4 12 3z" stroke="#216a74" stroke-width="1.6" stroke-linejoin="round"/></svg>Bloods analysed at Randox</span></div></section><section id="process-section" class="section-steps-section"><div class="div-steps-section"><div class="boxed-container-2"><div class="div-in-steps-section"><div data-w-id="ac434643-0213-a758-f26f-9945bbc795e5" style="" class="heading-layout"><div class="heading-wrap"><h2 class="h2-steps-section__title">Data. Insights. Action.</h2><p class="p-steps-section__subtitle">Connecting the dots between data, insights and action so that you can enjoy many more healthy years.</p></div></div><div data-w-id="ac434643-0213-a758-f26f-9945bbc795eb" style="" class="process-main"><div class="loop-rail"><div class="loop-rail-track"></div><div class="loop-rail-fill"></div></div><div class="div-step-item__row"><div class="loop-node-wrapper"><div class="loop-node"></div></div><div class="div-step-item__image-wrap"><img width="700" sizes="(max-width: 767px) 100vw, 700px" alt="" loading="lazy" src="/assets/69cb2ba27042ece99a236722/69f827beedd8a91c2105cf71_Track.png" srcset="/assets/69cb2ba27042ece99a236722/69f827beedd8a91c2105cf71_Track-p-500.png 500w, /assets/69cb2ba27042ece99a236722/69f827beedd8a91c2105cf71_Track-p-800.png 800w, /assets/69cb2ba27042ece99a236722/69f827beedd8a91c2105cf71_Track-p-1080.png 1080w, /assets/69cb2ba27042ece99a236722/69f827beedd8a91c2105cf71_Track.png 1400w" class="image-37"/></div><div class="div-step-item__content"><h3 class="h3-step-item__title">Data</h3><div class="p-step-item__subheading">Building your secure, comprehensive data record to reveal hidden patterns</div><div class="div-step-item__bullets"><div class="div-step-bullet"><img src="/assets/69cb2ba27042ece99a236722/69d7c7a65123a292f7b0b8f9_✦.svg" loading="lazy" alt=""/><h4 class="span-step-bullet__title">Diagnostic Tests</h4></div><div class="p-step-bullet__body">Start with setting your Baseline by visiting a nearby partner clinic for blood tests. Or, if you prefer, you can opt for in home testing with a nurse visit</div></div><div class="div-step-item__bullets"><div class="div-step-bullet"><img src="/assets/69cb2ba27042ece99a236722/69d7c7a65123a292f7b0b8f9_✦.svg" loading="lazy" alt=""/><h4 class="span-step-bullet__title">Medical History</h4></div><div class="p-step-bullet__body">Fill out a simple questionnaire to capture your medical history with automation coming soon</div></div><div class="div-step-item__bullets"><div class="div-step-bullet"><img src="/assets/69cb2ba27042ece99a236722/69d7c7a65123a292f7b0b8f9_✦.svg" loading="lazy" alt=""/><h4 class="span-step-bullet__title">Wearables (optional)</h4></div><div class="p-step-bullet__body">Seamlessly integrate your wearable data to your interactive Evida Dashboard, with immediate visibility on your health trends</div></div></div></div><div class="div-step-item__row-copy"><div class="div-step-item__image-wrap"><img width="700" sizes="(max-width: 767px) 100vw, 700px" alt="" loading="lazy" src="/assets/69cb2ba27042ece99a236722/69f827be31a476840c5242f9_Tailor.png" srcset="/assets/69cb2ba27042ece99a236722/69f827be31a476840c5242f9_Tailor-p-500.png 500w, /assets/69cb2ba27042ece99a236722/69f827be31a476840c5242f9_Tailor-p-800.png 800w, /assets/69cb2ba27042ece99a236722/69f827be31a476840c5242f9_Tailor-p-1080.png 1080w, /assets/69cb2ba27042ece99a236722/69f827be31a476840c5242f9_Tailor.png 1400w" class="image-37"/></div><div class="div-step-item__content"><h3 class="h3-step-item__title">Insights</h3><div class="p-step-item__subheading">Your dedicated 45-minute virtual GP health check for personalised insights</div><div class="div-step-item__bullets"><div class="div-step-bullet"><img src="/assets/69cb2ba27042ece99a236722/69d7c7a65123a292f7b0b8f9_✦.svg" loading="lazy" alt=""/><h4 class="span-step-bullet__title">45-minute virtual GP consult</h4></div><div class="p-step-bullet__body">A dedicated video appointment with a GP who has reviewed your results in advance.</div></div><div class="div-step-item__bullets"><div class="div-step-bullet"><img src="/assets/69cb2ba27042ece99a236722/69d7c7a65123a292f7b0b8f9_✦.svg" loading="lazy" alt=""/><h4 class="span-step-bullet__title">AI-supported clarity</h4></div><div class="p-step-bullet__body">Your data is synthesised to show what it means for you — our clinicians interpret it, never AI alone.</div></div><div class="div-step-item__bullets"><div class="div-step-bullet"><img src="/assets/69cb2ba27042ece99a236722/69d7c7a65123a292f7b0b8f9_✦.svg" loading="lazy" alt=""/><h4 class="span-step-bullet__title">Your prevention plan</h4></div><div class="p-step-bullet__body">Early risk factors flagged and a tailored prevention plan, with a free 6-month follow-up included.</div></div></div><div class="loop-node-wrapper"><div class="loop-node"></div></div></div><div class="div-step-item__row-copy reverse"><div class="loop-node-wrapper"><div class="loop-node"></div></div><div class="div-step-item__image-wrap reverse-2"><img width="175" src="/assets/69cb2ba27042ece99a236722/69d91c86fb6b83c3c238c6c0_Act.png" alt="" loading="lazy" class="image-37 reverse-3"/></div><div class="div-step-item__content reverse-4"><h3 class="h3-step-item__title reverse-5">Action</h3><div class="p-step-item__subheading reverse-6">Supporting you to take action from prevention through to treatment</div><div class="div-step-item__bullets"><div class="div-step-bullet"><img src="/assets/69cb2ba27042ece99a236722/69d7c7a65123a292f7b0b8f9_✦.svg" loading="lazy" alt=""/><h4 class="span-step-bullet__title">Daily support from Evi</h4></div><div class="p-step-bullet__body">Your AI companion and the Evida team help you stay on track with your health goals.</div></div><div class="div-step-item__bullets"><div class="div-step-bullet"><img src="/assets/69cb2ba27042ece99a236722/69d7c7a65123a292f7b0b8f9_✦.svg" loading="lazy" alt=""/><h4 class="span-step-bullet__title">A GP when you need one</h4></div><div class="p-step-bullet__body">Book a clinician whenever you need further clinical advice.</div></div><div class="div-step-item__bullets"><div class="div-step-bullet"><img src="/assets/69cb2ba27042ece99a236722/69d7c7a65123a292f7b0b8f9_✦.svg" loading="lazy" alt=""/><h4 class="span-step-bullet__title">A growing partner network</h4></div><div class="p-step-bullet__body">Simple referral for any further diagnostics or treatment.</div></div></div></div><div class="loop-node-wrapper"><div class="loop-node"></div></div></div><div data-w-id="ac434643-0213-a758-f26f-9945bbc79620" style="" class="heading-layout"><div class="div-steps-footer"><h2 class="p-steps-footer__label">The Evida loop</h2><p class="p-steps-footer__sub">3 steps to a healthier you.</p></div></div></div></div></div></section><style>
.hiw-panel{background:#f7f5ef;padding:clamp(56px,7vw,96px) 24px;font-family:var(--font-inter),Inter,sans-serif;color:#2d2700;}
.hiw-panel .hp-head{text-align:center;max-width:640px;margin:0 auto 46px;}
.hiw-panel .hp-eyebrow{margin:0 0 14px;color:#ff5a5f;font-size:12px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;}
.hiw-panel h2{margin:0;font-family:var(--font-geist),Geist,sans-serif;font-weight:400;font-size:clamp(30px,4vw,48px);line-height:1.1;letter-spacing:-0.01em;color:#09332e;}
.hiw-panel h2 em{font-style:italic;color:#216a74;}
.hiw-panel .hp-sub{margin:16px auto 0;max-width:52ch;font-size:17px;line-height:1.6;color:#575757;}
.hiw-panel .hp-grid{max-width:1080px;margin:0 auto;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;}
.hiw-panel .hp-card{background:#fff;border:1px solid rgba(33,106,116,0.14);border-radius:16px;padding:26px 24px;box-shadow:0 14px 34px rgba(15,77,78,.05);}
.hiw-panel .hp-ico{width:42px;height:42px;border-radius:11px;background:#eef5f3;display:flex;align-items:center;justify-content:center;margin-bottom:16px;}
.hiw-panel .hp-card h3{margin:0 0 7px;font-family:var(--font-geist),Geist,sans-serif;font-weight:500;font-size:18px;color:#09332e;}
.hiw-panel .hp-card p{margin:0;font-size:14px;line-height:1.55;color:#575757;}
.hiw-panel .hp-foot{margin:28px auto 0;text-align:center;font-size:14.5px;color:#216a74;font-weight:500;}
@media(max-width:860px){.hiw-panel .hp-grid{grid-template-columns:1fr;}}
</style><section class="hiw-panel" aria-label="What we measure"><div class="hp-head ev-reveal"><p class="hp-eyebrow">What we measure</p><h2>One blood draw. <em>A complete picture.</em></h2><p class="hp-sub">Your Baseline covers 100+ biomarkers across six systems &mdash; the signals that show how your body is really functioning, and where to act early.</p></div><div class="hp-grid"><article class="hp-card"><div class="hp-ico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z" stroke="#216a74" stroke-width="1.6" stroke-linejoin="round"/></svg></div><h3>Heart health</h3><p>Cholesterol, HDL &amp; LDL, triglycerides</p></article><article class="hp-card"><div class="hp-ico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 12h4l2-6 4 13 2-7h6" stroke="#216a74" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></div><h3>Metabolic health</h3><p>HbA1c, glucose, insulin</p></article><article class="hp-card"><div class="hp-ico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3c3.4 4.4 6 7 6 10.4A6 6 0 016 13.4C6 10 8.6 7.4 12 3z" stroke="#216a74" stroke-width="1.6" stroke-linejoin="round"/></svg></div><h3>Hormones</h3><p>Thyroid, cortisol, testosterone</p></article><article class="hp-card"><div class="hp-ico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4" stroke="#216a74" stroke-width="1.6"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" stroke="#216a74" stroke-width="1.5" stroke-linecap="round"/></svg></div><h3>Inflammation</h3><p>CRP, ESR and immune markers</p></article><article class="hp-card"><div class="hp-ico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M9 3h6M10 3v5.5L6 17a2 2 0 001.8 3h8.4A2 2 0 0018 17l-4-8.5V3" stroke="#216a74" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></div><h3>Kidney &amp; liver</h3><p>eGFR, creatinine, ALT</p></article><article class="hp-card"><div class="hp-ico"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 19C5 11 11 6 19 6c0 8-6 13-14 13z" stroke="#216a74" stroke-width="1.6" stroke-linejoin="round"/><path d="M6 18c2.5-3.5 5.5-5.5 9-7" stroke="#216a74" stroke-width="1.4" stroke-linecap="round"/></svg></div><h3>Vitamins &amp; minerals</h3><p>Vitamin D, B12, ferritin</p></article></div><p class="hp-foot ev-reveal">100+ biomarkers &middot; analysed at a Randox clinic &middot; results in ~72 hours</p></section><style>
.hiw-data{background:#09332e;padding:clamp(60px,8vw,100px) 24px;font-family:var(--font-inter),Inter,sans-serif;color:#f3f1e6;}
.hiw-data .hd-wrap{max-width:1140px;margin:0 auto;display:grid;grid-template-columns:0.85fr 1.15fr;gap:clamp(32px,5vw,60px);align-items:center;}
.hiw-data .hd-eyebrow{margin:0 0 16px;color:#ff8a82;font-size:12px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;}
.hiw-data h2{margin:0 0 18px;font-family:var(--font-geist),Geist,sans-serif;font-weight:400;font-size:clamp(28px,3.6vw,42px);line-height:1.12;letter-spacing:-0.01em;color:#fff;}
.hiw-data h2 em{font-style:italic;color:#fde68a;}
.hiw-data .hd-lead{margin:0 0 22px;font-size:16.5px;line-height:1.65;color:rgba(243,241,230,0.82);max-width:44ch;}
.hiw-data .hd-list{margin:0;padding:0;list-style:none;}
.hiw-data .hd-list li{position:relative;padding:8px 0 8px 26px;font-size:15px;color:rgba(243,241,230,0.9);}
.hiw-data .hd-list li::before{content:"✦";position:absolute;left:0;color:#ff8a82;}
.hiw-data .hd-frame{border-radius:14px;overflow:hidden;background:#fff;box-shadow:0 40px 80px rgba(0,0,0,.42);border:1px solid rgba(255,255,255,0.08);}
.hiw-data .hd-bar{display:flex;align-items:center;gap:7px;padding:11px 14px;background:#f4f6f5;border-bottom:1px solid rgba(0,0,0,0.06);}
.hiw-data .hd-bar span{width:10px;height:10px;border-radius:50%;background:#d3d7d6;}
.hiw-data .hd-frame img{width:100%;height:auto;display:block;}
@media(max-width:860px){.hiw-data .hd-wrap{grid-template-columns:1fr;}}
</style><section class="hiw-data" aria-label="Your Evida dashboard"><div class="hd-wrap"><div class="hd-copy ev-reveal"><p class="hd-eyebrow">Everything in one place</p><h2>Your whole picture, <em>always to hand</em></h2><p class="hd-lead">Bloods, wearables and history come together in one secure dashboard &mdash; so every trend is visible and nothing gets lost between appointments.</p><ul class="hd-list"><li>Wearable metrics, synced daily</li><li>Blood results with clear reference ranges</li><li>Your plan, documents and care-team messages</li></ul></div><!-- Screenshot: Evida app Data &amp; Insights view --><div class="hd-frame ev-reveal"><div class="hd-bar"><span></span><span></span><span></span></div><img src="/assets/img/dashboard.png" alt="The Evida Data and Insights dashboard showing wearable metrics, blood results and weekly activity" loading="lazy"/></div></div></section><style>
.hiw-gp{background:#fefdf5;padding:clamp(60px,8vw,100px) 24px;font-family:var(--font-inter),Inter,sans-serif;color:#2d2700;}
.hiw-gp .hg-wrap{max-width:1080px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:clamp(32px,5vw,60px);align-items:center;}
.hiw-gp .hg-photo{border-radius:18px;overflow:hidden;box-shadow:0 26px 60px rgba(15,77,78,.14);}
.hiw-gp .hg-photo img{width:100%;height:100%;object-fit:cover;display:block;aspect-ratio:7/5;}
.hiw-gp .hg-eyebrow{margin:0 0 16px;color:#ff5a5f;font-size:12px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;}
.hiw-gp h2{margin:0 0 18px;font-family:var(--font-geist),Geist,sans-serif;font-weight:400;font-size:clamp(28px,3.6vw,44px);line-height:1.12;letter-spacing:-0.01em;color:#09332e;}
.hiw-gp h2 em{font-style:italic;color:#216a74;}
.hiw-gp .hg-lead{margin:0 0 22px;font-size:16.5px;line-height:1.65;color:#575757;max-width:44ch;}
.hiw-gp .hg-list{margin:0;padding:0;list-style:none;}
.hiw-gp .hg-list li{position:relative;padding:11px 0 11px 26px;font-size:15px;line-height:1.5;color:#2d2700;border-top:1px solid rgba(33,106,116,0.1);}
.hiw-gp .hg-list li:first-child{border-top:0;}
.hiw-gp .hg-list li::before{content:"✦";position:absolute;left:0;top:11px;color:#ff5a5f;}
.hiw-gp .hg-list strong{color:#09332e;font-weight:600;}
@media(max-width:860px){.hiw-gp .hg-wrap{grid-template-columns:1fr;}}
</style><section class="hiw-gp" aria-label="Led by real doctors"><div class="hg-wrap"><!-- Photo: Unsplash (photo-1666214280557), free to use --><div class="hg-photo ev-reveal"><img src="/assets/img/consult.jpg" alt="An Evida GP talking a member through their results in person" loading="lazy"/></div><div class="hg-copy ev-reveal"><p class="hg-eyebrow">Data, read by humans</p><h2>Technology surfaces. <em>Doctors decide.</em></h2><p class="hg-lead">Every insight is read, interpreted and signed off by a real GP &mdash; never an algorithm alone. You are always seen by a person.</p><ul class="hg-list"><li><strong>GMC-licensed, NHS-experienced GPs.</strong></li><li><strong>45 unhurried minutes,</strong> your results read in advance.</li><li><strong>A named clinician</strong> for continuity across the year.</li></ul></div></div></section><style>
.hiw-cta{background:#09332e;color:#f3f1e6;padding:clamp(60px,8vw,104px) 24px;font-family:var(--font-inter),Inter,sans-serif;text-align:center;}
.hiw-cta .hc-inner{max-width:760px;margin:0 auto;}
.hiw-cta .hc-eyebrow{margin:0 0 16px;color:#ff8a82;font-size:12px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;}
.hiw-cta h2{margin:0 0 18px;font-family:var(--font-geist),Geist,sans-serif;font-weight:400;font-size:clamp(30px,4vw,48px);line-height:1.1;letter-spacing:-0.01em;color:#fff;}
.hiw-cta h2 em{font-style:italic;color:#fde68a;}
.hiw-cta .hc-anchor{margin:0 auto 34px;max-width:54ch;font-size:17px;line-height:1.65;color:rgba(243,241,230,0.82);}
.hiw-cta .hc-anchor strong{color:#fff;font-weight:600;}
.hiw-cta .hc-chips{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px 12px;margin-top:32px;}
.hiw-cta .hc-chip{display:inline-flex;align-items:center;gap:7px;border:1px solid rgba(255,255,255,0.22);border-radius:999px;padding:8px 15px;font-size:12.5px;font-weight:500;color:rgba(243,241,230,0.85);}
.hiw-cta .hc-chip::before{content:"";width:6px;height:6px;border-radius:50%;background:#ff8a82;}
</style><section class="hiw-cta" aria-label="Get started with Evida"><div class="hc-inner ev-reveal"><p class="hc-eyebrow">Ready when you are</p><h2>One baseline. <em>A year of proactive care.</em></h2><p class="hc-anchor">A private GP visit buys you ten minutes. <strong>&pound;320 a year &mdash; about &pound;27 a month &mdash;</strong> buys you a comprehensive blood panel, your wearable data joined up, and 90 minutes of unhurried GP time.</p><a data-wf--global-button---pop-up-trigger--variant="yellow-variants" href="/app/screens/login.html" class="global-button modal-trigger-button w-button">Get Started</a><div class="hc-chips"><span class="hc-chip">No referral needed</span><span class="hc-chip">Results in 72 hours</span><span class="hc-chip">Cancel anytime</span><span class="hc-chip">Works alongside your NHS GP</span></div></div></section><style>
.hiw-partners{background:#fefdf5;padding:clamp(40px,5vw,60px) 24px;text-align:center;font-family:var(--font-inter),Inter,sans-serif;border-top:1px solid rgba(33,106,116,0.08);}
.hiw-partners .pp-label{margin:0 0 22px;font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#888;}
.hiw-partners .pp-logos{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:16px 40px;}
.hiw-partners .pp-logo{font-family:var(--font-geist),Geist,sans-serif;font-size:22px;font-weight:500;letter-spacing:-0.01em;color:#216a74;opacity:.62;}
</style><section class="hiw-partners" aria-label="Our partners"><p class="pp-label">Built with trusted clinical and data partners</p><div class="pp-logos"><span class="pp-logo">Randox</span><span class="pp-logo">Semble</span><span class="pp-logo">Heidi</span><span class="pp-logo">Terra</span><span class="pp-logo">Stripe</span></div></section><section class="section-faq-section"><div class="boxed-container-2"><div class="div-faq-inner"><div class="div-faq-left"><h2 class="h2-faq-left__heading">The Answers</h2><h2 class="em-faq-left__heading-italic">You’re Looking For</h2></div><div class="div-faq-right"><div class="w-dyn-list"><div role="list" class="w-dyn-items"><div role="listitem" class="w-dyn-item"><div class="div-faq-item"><div class="div-faq-item__trigger"><img src="/assets/69cb2ba27042ece99a236722/69d7c7a65123a292f7b0b8f9_✦.svg" loading="lazy" alt="" class="span-faq-item__icon"/><h4 class="p-faq-item__question">What is included in a baseline health check?</h4><img width="16" src="/assets/69cb2ba27042ece99a236722/69df7bd21735bc178fc4ab3a_svgviewer-output.svg" alt="" loading="lazy" class="span-faq-item__toggle"/></div><div class="div-faq-item__answer-div"><div class="div-faq-item__answer">Your Baseline includes a comprehensive blood panel at a Randox clinic, a 45-minute consultation with a GP who has read your results in advance, and a personalised prevention plan you can act on — plus wearable integration and a 6-month follow-up.</div></div></div></div><div role="listitem" class="w-dyn-item"><div class="div-faq-item"><div class="div-faq-item__trigger"><img src="/assets/69cb2ba27042ece99a236722/69d7c7a65123a292f7b0b8f9_✦.svg" loading="lazy" alt="" class="span-faq-item__icon"/><h4 class="p-faq-item__question">How soon can I book an appointment?</h4><img width="16" src="/assets/69cb2ba27042ece99a236722/69df7bd21735bc178fc4ab3a_svgviewer-output.svg" alt="" loading="lazy" class="span-faq-item__toggle"/></div><div class="div-faq-item__answer-div"><div class="div-faq-item__answer">You can book your blood test as soon as you join. Results come back in about 72 hours, and your 45-minute GP consultation follows within a few days.</div></div></div></div><div role="listitem" class="w-dyn-item"><div class="div-faq-item"><div class="div-faq-item__trigger"><img src="/assets/69cb2ba27042ece99a236722/69d7c7a65123a292f7b0b8f9_✦.svg" loading="lazy" alt="" class="span-faq-item__icon"/><h4 class="p-faq-item__question">Is my health information secure with Evida?</h4><img width="16" src="/assets/69cb2ba27042ece99a236722/69df7bd21735bc178fc4ab3a_svgviewer-output.svg" alt="" loading="lazy" class="span-faq-item__toggle"/></div><div class="div-faq-item__answer-div"><div class="div-faq-item__answer">Yes. Your health data is encrypted, confidential, and visible only to you and your clinical team.</div></div></div></div><div role="listitem" class="w-dyn-item"><div class="div-faq-item"><div class="div-faq-item__trigger"><img src="/assets/69cb2ba27042ece99a236722/69d7c7a65123a292f7b0b8f9_✦.svg" loading="lazy" alt="" class="span-faq-item__icon"/><h4 class="p-faq-item__question">Do I need a wearable device to use Evida?</h4><img width="16" src="/assets/69cb2ba27042ece99a236722/69df7bd21735bc178fc4ab3a_svgviewer-output.svg" alt="" loading="lazy" class="span-faq-item__toggle"/></div><div class="div-faq-item__answer-div"><div class="div-faq-item__answer">No. Your baseline bloods, history and consultation give you a complete plan on their own. A wearable adds richer day-to-day context if you have one — and Evida connects Apple, Oura, Garmin and Whoop.</div></div></div></div><div role="listitem" class="w-dyn-item"><div class="div-faq-item"><div class="div-faq-item__trigger"><img src="/assets/69cb2ba27042ece99a236722/69d7c7a65123a292f7b0b8f9_✦.svg" loading="lazy" alt="" class="span-faq-item__icon"/><h4 class="p-faq-item__question">What are the biomarkers in the blood test?</h4><img width="16" src="/assets/69cb2ba27042ece99a236722/69df7bd21735bc178fc4ab3a_svgviewer-output.svg" alt="" loading="lazy" class="span-faq-item__toggle"/></div><div class="div-faq-item__answer-div"><div class="div-faq-item__answer">Your panel covers 100+ biomarkers — across heart health, metabolism, hormones, inflammation, and kidney and liver function — the markers that show how your body is really functioning and where to act early.</div></div></div></div></div></div></div></div></div></section><section class="section-cta-section"><div class="div-cta-inner"><div class="boxed-container-2"><div class="div-cta-content"><div class="h2-cta-heading"><h2 class="span-cta-heading__regular">Ready to own</h2><div class="span-cta-heading__line2"><h2 class="span-cta-heading__regular">your</h2><h2 class="em-cta-heading__italic">health?</h2></div></div><a data-wf--global-button---pop-up-trigger--variant="yellow-variants" href="/app/screens/login.html" class="global-button modal-trigger-button w-button">Get Started</a></div></div></div></section><section class="footer-footer"><div class="boxed-container-2"><div class="div-footer"><div class="div-footer-top"><div class="div-footer-newsletter"><div class="div-footer-logo-mobile"><a href="/" class="w-inline-block"><img src="/assets/69cb2ba27042ece99a236722/69cb98b5235358c0cf7a7159_Group-273.svg" loading="lazy" alt="" class="img-footer-logo__img"/></a></div><div class="h3-footer-newsletter__heading"><h3 class="span-footer-newsletter__regular">Subscribe to our</h3><h3 class="em-footer-newsletter__italic">newsletters</h3></div><div class="form-footer-newsletter__form"><div class="form-block w-form"><form id="email-form" name="email-form" data-name="Email Form" method="get" class="form-4" data-wf-page-id="69d91c73b7e7ba75b217cf4f" data-wf-element-id="b2f73c00-99c2-041a-7473-e5b4ff7641e8" data-turnstile-sitekey="0x4AAAAAAAQTptj2So4dx43e"><input class="text-field-copy w-input" maxlength="256" name="email" data-name="Email" placeholder="Your email address" type="email" id="email" required=""/><input type="submit" data-wait="Please wait..." class="button-sleek-3 w-button" value="Submit"/></form><div class="w-form-done"><div>Thank you! Your submission has been received!</div></div><div class="w-form-fail"><div>Oops! Something went wrong while submitting the form.</div></div></div></div></div><div class="w-layout-hflex flex-block-8"><div class="div-footer-nav"><div class="p-footer-nav__label">EXPLORE</div><a href="/how-it-works" aria-current="page" class="a-footer-nav__link w--current">How it works</a><a href="/membership" class="a-footer-nav__link">Membership</a><a href="/about-us" class="a-footer-nav__link">About us</a><a href="/posts" class="a-footer-nav__link">Blog</a></div><div class="div-footer-contact"><div class="p-footer-contact__label">CONTACT US</div><a href="mailto:hello@evida.uk" class="a-footer-contact__email">hello@evida.uk</a><div class="p-footer-contact__address">71-75 Shelton Street, Covent Garden, London, WC2H 9JQ</div></div><div class="div-footer-logo"><a href="/" class="w-inline-block"><img src="/assets/69cb2ba27042ece99a236722/69cb98b5235358c0cf7a7159_Group-273.svg" loading="lazy" alt="" class="img-footer-logo__img"/></a></div></div></div><div class="div-footer-bottom"><div class="div-footer-social"><a href="https://www.instagram.com/evida.health" target="_blank" class="a-footer-social__link w-inline-block"><img src="/assets/69cb2ba27042ece99a236722/69d7d369b6c327122635f1f0_Instagram.svg" loading="lazy" alt=""/></a><a href="https://www.linkedin.com/company/evidahealth/" target="_blank" class="a-footer-social__link w-inline-block"><img src="/assets/69cb2ba27042ece99a236722/69d7d3682aeb121430245d74_Linkedin.svg" loading="lazy" alt=""/></a><a href="https://evidahealth.substack.com/" target="_blank" class="a-footer-social__link w-inline-block"><img src="/assets/69cb2ba27042ece99a236722/69d7d110b1c6100deddabbc2_substack.svg" loading="lazy" alt=""/></a></div><div class="w-layout-hflex flex-block-7"><div class="div-footer-legal"><a href="/privacy-policy" class="a-footer-legal__link">Privacy Policy</a></div><div class="p-footer-copyright">© 2026 Evida — Copyright</div></div></div></div></div></section><!-- Google Tag Manager (noscript) -->
<noscript><iframe src=""
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->

















`

export default function Content() {
  return (
    <>
      <PageClient html={PAGE_HTML} scripts={SHARED_SCRIPT_QUEUE} />
      <HowItWorksAnimator />
    </>
  );
}
