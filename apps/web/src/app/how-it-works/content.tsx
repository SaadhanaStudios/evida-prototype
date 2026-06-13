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

</div></a><div class="menu-items-wrapper"><nav role="navigation" class="div-navbar__menu w-nav-menu"><a href="/how-it-works" aria-current="page" class="nav-link-3 w-nav-link w--current">How it works</a><a href="/membership" class="nav-link-3 w-nav-link">Membership</a><a href="/posts" class="nav-link-3 w-nav-link">Blog</a><a href="/about-us" class="nav-link-3 w-nav-link">About us</a><a href="/contact-us" class="nav-link-3 w-nav-link">Contact us</a></nav></div><div class="w-layout-blockcontainer link-block-2 w-container"><a data-wf--global-button---pop-up-trigger--variant="green-variants" href="/how-it-works#" class="global-button w-variant-62f42df2-6780-9e0b-4407-658c8b7f8080 modal-trigger-button w-button">Get Started</a></div><div class="div-navbar__burger w-nav-button"><div class="code-embed-3 w-embed"><svg class="nav-burger" width="24" height="18" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.5 5.5H13.8333M0.5 0.5H13.8333M0.5 10.5H13.8333" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"/>
</svg></div></div><div class="w-embed"></div></div></div></div></section><section data-theme="dark" class="section-hero-wrapper"><div class="hero-wrapper"><div class="div-announcement-bar"><div>Pilot now open — limited places available</div></div><div class="div-hero-bg-image"><div class="boxed-container-howitworks"><div class="div-hero-content-left"><h1 class="h1-heading">Your Health Journey,</h1><div class="w-layout-hflex span-hero__heading-line2"><h1 class="h1-heading">Guided by</h1><h1 class="h1-headig-italic"> Evida</h1></div><div class="p-hero__subtext">3 steps to your healthier future</div><a data-wf--global-button---pop-up-trigger--variant="yellow-variants" href="/how-it-works#" class="global-button modal-trigger-button w-button">Get Started</a></div><img src="/assets/69cb2ba27042ece99a236722/69d91c7a3034eed1a984c17d_hero-line.png" loading="lazy" sizes="(max-width: 798px) 100vw, 798px" srcset="/assets/69cb2ba27042ece99a236722/69d91c7a3034eed1a984c17d_hero-line-p-500.png 500w, /assets/69cb2ba27042ece99a236722/69d91c7a3034eed1a984c17d_hero-line.png 798w" alt="" class="image-36"/></div></div></div></section><section id="process-section" class="section-steps-section"><div class="div-steps-section"><div class="boxed-container-2"><div class="div-in-steps-section"><div data-w-id="ac434643-0213-a758-f26f-9945bbc795e5" style="" class="heading-layout"><div class="heading-wrap"><h2 class="h2-steps-section__title">Track. Tailor. Act.</h2><p class="p-steps-section__subtitle">Connecting the dots between data, insights and action so that you can enjoy many more healthy years.</p></div></div><div data-w-id="ac434643-0213-a758-f26f-9945bbc795eb" style="" class="process-main"><div class="loop-rail"><div class="loop-rail-track"></div><div class="loop-rail-fill"></div></div><div class="div-step-item__row"><div class="loop-node-wrapper"><div class="loop-node"></div></div><div class="div-step-item__image-wrap"><img width="700" sizes="(max-width: 767px) 100vw, 700px" alt="" loading="lazy" src="/assets/69cb2ba27042ece99a236722/69f827beedd8a91c2105cf71_Track.png" srcset="/assets/69cb2ba27042ece99a236722/69f827beedd8a91c2105cf71_Track-p-500.png 500w, /assets/69cb2ba27042ece99a236722/69f827beedd8a91c2105cf71_Track-p-800.png 800w, /assets/69cb2ba27042ece99a236722/69f827beedd8a91c2105cf71_Track-p-1080.png 1080w, /assets/69cb2ba27042ece99a236722/69f827beedd8a91c2105cf71_Track.png 1400w" class="image-37"/></div><div class="div-step-item__content"><h3 class="h3-step-item__title">Track</h3><div class="p-step-item__subheading">Building your secure, comprehensive data record to reveal hidden patterns</div><div class="div-step-item__bullets"><div class="div-step-bullet"><img src="/assets/69cb2ba27042ece99a236722/69d7c7a65123a292f7b0b8f9_✦.svg" loading="lazy" alt=""/><h4 class="span-step-bullet__title">Diagnostics Tests</h4></div><div class="p-step-bullet__body">Start with setting your Baseline by visiting a nearby partner clinic for blood tests. Or, if you prefer, you can opt for in home testing with a nurse visit</div></div><div class="div-step-item__bullets"><div class="div-step-bullet"><img src="/assets/69cb2ba27042ece99a236722/69d7c7a65123a292f7b0b8f9_✦.svg" loading="lazy" alt=""/><h4 class="span-step-bullet__title">Medical History</h4></div><div class="p-step-bullet__body">Fill out a simple questionnaire to capture your medical history with automation coming soon</div></div><div class="div-step-item__bullets"><div class="div-step-bullet"><img src="/assets/69cb2ba27042ece99a236722/69d7c7a65123a292f7b0b8f9_✦.svg" loading="lazy" alt=""/><h4 class="span-step-bullet__title">Wearables (optional)</h4></div><div class="p-step-bullet__body">Seamlessly integrate your wearable data to your interactive Evida Dashboard, with immediate visibility on your health trends</div></div></div></div><div class="div-step-item__row-copy"><div class="div-step-item__image-wrap"><img width="700" sizes="(max-width: 767px) 100vw, 700px" alt="" loading="lazy" src="/assets/69cb2ba27042ece99a236722/69f827be31a476840c5242f9_Tailor.png" srcset="/assets/69cb2ba27042ece99a236722/69f827be31a476840c5242f9_Tailor-p-500.png 500w, /assets/69cb2ba27042ece99a236722/69f827be31a476840c5242f9_Tailor-p-800.png 800w, /assets/69cb2ba27042ece99a236722/69f827be31a476840c5242f9_Tailor-p-1080.png 1080w, /assets/69cb2ba27042ece99a236722/69f827be31a476840c5242f9_Tailor.png 1400w" class="image-37"/></div><div class="div-step-item__content"><h3 class="h3-step-item__title">Tailor</h3><div class="p-step-item__subheading">Your dedicated 45 minute virtual GP health check for personalised insights</div><div class="p-step-bullet__body">A virtual GP  consult supported by AI-enabled analysis in the loop giving clarity on what your data means for you. Your GP will identify early risk factors and deliver a tailored longevity plan, with a 6-month free follow-up appointment included in the plan.</div></div><div class="loop-node-wrapper"><div class="loop-node"></div></div></div><div class="div-step-item__row-copy reverse"><div class="loop-node-wrapper"><div class="loop-node"></div></div><div class="div-step-item__image-wrap reverse-2"><img width="175" src="/assets/69cb2ba27042ece99a236722/69d91c86fb6b83c3c238c6c0_Act.png" alt="" loading="lazy" class="image-37 reverse-3"/></div><div class="div-step-item__content reverse-4"><h3 class="h3-step-item__title reverse-5">Act</h3><div class="p-step-item__subheading reverse-6">Supporting you to take action from prevention through to treatment</div><div class="p-step-bullet__body reverse-7">Taking action is what matters. Our daily AI companion and Evida team are here to support your health goals.<br/><br/>Our GPs are readily available for booking if and when you need further clinical advice and we have a growing partner network to facilitate any further diagnostics and treatment.</div></div></div><div class="loop-node-wrapper"><div class="loop-node"></div></div></div><div data-w-id="ac434643-0213-a758-f26f-9945bbc79620" style="" class="heading-layout"><div class="div-steps-footer"><h2 class="p-steps-footer__label">The Evida loop</h2><p class="p-steps-footer__sub">3 steps to your healthier future.</p></div></div></div></div></div></section><section class="section-faq-section"><div class="boxed-container-2"><div class="div-faq-inner"><div class="div-faq-left"><h2 class="h2-faq-left__heading">The Answers</h2><h2 class="em-faq-left__heading-italic">You’re Looking For</h2></div><div class="div-faq-right"><div class="w-dyn-list"><div role="list" class="w-dyn-items"><div role="listitem" class="w-dyn-item"><div class="div-faq-item"><div class="div-faq-item__trigger"><img src="/assets/69cb2ba27042ece99a236722/69d7c7a65123a292f7b0b8f9_✦.svg" loading="lazy" alt="" class="span-faq-item__icon"/><h4 class="p-faq-item__question">What is included in a baseline health check?</h4><img width="16" src="/assets/69cb2ba27042ece99a236722/69df7bd21735bc178fc4ab3a_svgviewer-output.svg" alt="" loading="lazy" class="span-faq-item__toggle"/></div><div class="div-faq-item__answer-div"><div class="div-faq-item__answer">A baseline health check provides a snapshot of your overall health. It includes essential assessments like blood tests, vitals, and lifestyle screening, helping you and your doctor spot potential risks early.</div></div></div></div><div role="listitem" class="w-dyn-item"><div class="div-faq-item"><div class="div-faq-item__trigger"><img src="/assets/69cb2ba27042ece99a236722/69d7c7a65123a292f7b0b8f9_✦.svg" loading="lazy" alt="" class="span-faq-item__icon"/><h4 class="p-faq-item__question">How soon can I book an appointment?</h4><img width="16" src="/assets/69cb2ba27042ece99a236722/69df7bd21735bc178fc4ab3a_svgviewer-output.svg" alt="" loading="lazy" class="span-faq-item__toggle"/></div><div class="div-faq-item__answer-div"><div class="div-faq-item__answer">In most cases, you can schedule a virtual GP consultation within the same day. Availability will depend on the doctor’s schedule and your preferred time slot.</div></div></div></div><div role="listitem" class="w-dyn-item"><div class="div-faq-item"><div class="div-faq-item__trigger"><img src="/assets/69cb2ba27042ece99a236722/69d7c7a65123a292f7b0b8f9_✦.svg" loading="lazy" alt="" class="span-faq-item__icon"/><h4 class="p-faq-item__question">Is my health information secure with Evida?</h4><img width="16" src="/assets/69cb2ba27042ece99a236722/69df7bd21735bc178fc4ab3a_svgviewer-output.svg" alt="" loading="lazy" class="span-faq-item__toggle"/></div><div class="div-faq-item__answer-div"><div class="div-faq-item__answer">Absolutely. We use end-to-end encryption and follow strict data protection standards to ensure your medical information remains private and secure.</div></div></div></div><div role="listitem" class="w-dyn-item"><div class="div-faq-item"><div class="div-faq-item__trigger"><img src="/assets/69cb2ba27042ece99a236722/69d7c7a65123a292f7b0b8f9_✦.svg" loading="lazy" alt="" class="span-faq-item__icon"/><h4 class="p-faq-item__question">Do I need a wearable device to use Evida?</h4><img width="16" src="/assets/69cb2ba27042ece99a236722/69df7bd21735bc178fc4ab3a_svgviewer-output.svg" alt="" loading="lazy" class="span-faq-item__toggle"/></div><div class="div-faq-item__answer-div"><div class="div-faq-item__answer">No, wearables will enhance the experience by providing more data for our clinicians and integrated ongoing feedback to achieving your health goals. However, Evida is so much more. The baseline blood tests and medical history are sufficient for a comprehensive consult with our clinicians including a health check and tailored personalised prevention plan.</div></div></div></div><div role="listitem" class="w-dyn-item"><div class="div-faq-item"><div class="div-faq-item__trigger"><img src="/assets/69cb2ba27042ece99a236722/69d7c7a65123a292f7b0b8f9_✦.svg" loading="lazy" alt="" class="span-faq-item__icon"/><h4 class="p-faq-item__question">What are the biomarkers in the blood test?</h4><img width="16" src="/assets/69cb2ba27042ece99a236722/69df7bd21735bc178fc4ab3a_svgviewer-output.svg" alt="" loading="lazy" class="span-faq-item__toggle"/></div><div class="div-faq-item__answer-div"><div class="div-faq-item__answer">Biomarkers are biological markers measured through a blood test that give insight into how your body is functioning.</div></div></div></div></div></div></div></div></div></section><section class="section-cta-section"><div class="div-cta-inner"><div class="boxed-container-2"><div class="div-cta-content"><div class="h2-cta-heading"><h2 class="span-cta-heading__regular">Ready to own</h2><div class="span-cta-heading__line2"><h2 class="span-cta-heading__regular">your</h2><h2 class="em-cta-heading__italic">health?</h2></div></div><a data-wf--global-button---pop-up-trigger--variant="yellow-variants" href="/how-it-works#" class="global-button modal-trigger-button w-button">Get Started</a></div></div></div></section><section class="footer-footer"><div class="boxed-container-2"><div class="div-footer"><div class="div-footer-top"><div class="div-footer-newsletter"><div class="div-footer-logo-mobile"><a href="/" class="w-inline-block"><img src="/assets/69cb2ba27042ece99a236722/69cb98b5235358c0cf7a7159_Group-273.svg" loading="lazy" alt="" class="img-footer-logo__img"/></a></div><div class="h3-footer-newsletter__heading"><h3 class="span-footer-newsletter__regular">Subscribe to our</h3><h3 class="em-footer-newsletter__italic">newsletters</h3></div><div class="form-footer-newsletter__form"><div class="form-block w-form"><form id="email-form" name="email-form" data-name="Email Form" method="get" class="form-4" data-wf-page-id="69d91c73b7e7ba75b217cf4f" data-wf-element-id="b2f73c00-99c2-041a-7473-e5b4ff7641e8" data-turnstile-sitekey="0x4AAAAAAAQTptj2So4dx43e"><input class="text-field-copy w-input" maxlength="256" name="email" data-name="Email" placeholder="Your email address" type="email" id="email" required=""/><input type="submit" data-wait="Please wait..." class="button-sleek-3 w-button" value="Submit"/></form><div class="w-form-done"><div>Thank you! Your submission has been received!</div></div><div class="w-form-fail"><div>Oops! Something went wrong while submitting the form.</div></div></div></div></div><div class="w-layout-hflex flex-block-8"><div class="div-footer-nav"><div class="p-footer-nav__label">EXPLORE</div><a href="/how-it-works" aria-current="page" class="a-footer-nav__link w--current">How it works</a><a href="/membership" class="a-footer-nav__link">Membership</a><a href="/about-us" class="a-footer-nav__link">About us</a><a href="/posts" class="a-footer-nav__link">Blog</a></div><div class="div-footer-contact"><div class="p-footer-contact__label">CONTACT US</div><a href="mailto:hello@evida.uk" class="a-footer-contact__email">hello@evida.uk</a><div class="p-footer-contact__address">71-75 Shelton Street, Covent Garden, London, WC2H 9JQ</div></div><div class="div-footer-logo"><a href="/" class="w-inline-block"><img src="/assets/69cb2ba27042ece99a236722/69cb98b5235358c0cf7a7159_Group-273.svg" loading="lazy" alt="" class="img-footer-logo__img"/></a></div></div></div><div class="div-footer-bottom"><div class="div-footer-social"><a href="https://www.instagram.com/evida.health" target="_blank" class="a-footer-social__link w-inline-block"><img src="/assets/69cb2ba27042ece99a236722/69d7d369b6c327122635f1f0_Instagram.svg" loading="lazy" alt=""/></a><a href="https://www.linkedin.com/company/evidahealth/" target="_blank" class="a-footer-social__link w-inline-block"><img src="/assets/69cb2ba27042ece99a236722/69d7d3682aeb121430245d74_Linkedin.svg" loading="lazy" alt=""/></a><a href="https://evidahealth.substack.com/" target="_blank" class="a-footer-social__link w-inline-block"><img src="/assets/69cb2ba27042ece99a236722/69d7d110b1c6100deddabbc2_substack.svg" loading="lazy" alt=""/></a></div><div class="w-layout-hflex flex-block-7"><div class="div-footer-legal"><a href="/privacy-policy" class="a-footer-legal__link">Privacy Policy</a></div><div class="p-footer-copyright">© 2026 Evida — Copyright</div></div></div></div></div></section><div class="div-modal-overlay modal-overlay"><div class="div-modal-box modal-box"><img src="/assets/69cb2ba27042ece99a236722/69d786f31b377099138def08_x.svg" loading="lazy" alt="" class="modal-close"/><div class="div-modal-content"><h3 class="h3-modal-title">Stay in the loop</h3><div class="p-modal-subtext">Get the latest updates, tips, and insights delivered straight to your inbox. No spam, ever.</div></div><div id="hubspot-getstarted-form" class="form-modal-form"></div></div></div><!-- Google Tag Manager (noscript) -->
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
