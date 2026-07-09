type NavState = {
  parent: HTMLElement;
  overlay: HTMLElement;
  menu: HTMLElement;
};

const navStates = new WeakMap<HTMLElement, NavState>();

/** Mirrors Webflow's F(): sizes the overlay so absolute menu isn't clipped. */
function overlayHeight(nav: HTMLElement): number {
  const useDocHeight = nav.getAttribute("data-doc-height") === "1";
  let height = useDocHeight
    ? window.innerHeight
    : document.documentElement.clientHeight;

  if (getComputedStyle(nav).position !== "fixed") {
    height -= nav.getBoundingClientRect().height;
  }

  return Math.max(height, 0);
}

function initNavElement(nav: HTMLElement) {
  const menu = nav.querySelector<HTMLElement>(".w-nav-menu");
  const button = nav.querySelector<HTMLElement>(".w-nav-button");
  if (!menu || !button || navStates.has(nav)) return;

  let overlay = nav.querySelector<HTMLElement>(".w-nav-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "w-nav-overlay";
    overlay.setAttribute("data-wf-ignore", "");
    nav.appendChild(overlay);
  }

  overlay.style.display = "none";
  overlay.style.height = "";

  navStates.set(nav, {
    parent: menu.parentElement as HTMLElement,
    overlay,
    menu,
  });
}

function closeNav(nav: HTMLElement) {
  const state = navStates.get(nav);
  const button = nav.querySelector<HTMLElement>(".w-nav-button.w--open");

  if (state) {
    state.menu.removeAttribute("data-nav-menu-open");
    if (state.menu.parentElement === state.overlay) {
      state.parent.appendChild(state.menu);
    }
    state.overlay.style.display = "none";
    state.overlay.style.height = "";
  } else {
    const menu = nav.querySelector<HTMLElement>(".w-nav-menu");
    menu?.removeAttribute("data-nav-menu-open");
  }

  button?.classList.remove("w--open");
  nav.classList.remove("w--nav-menu-open");
  nav.querySelectorAll<HTMLElement>(".w-nav-button").forEach((btn) => {
    btn.setAttribute("aria-expanded", "false");
  });
}

function openNav(nav: HTMLElement, btn: HTMLElement) {
  const state = navStates.get(nav);
  if (!state) return;

  document.querySelectorAll<HTMLElement>(".w-nav.w--nav-menu-open").forEach((other) => {
    if (other !== nav) closeNav(other);
  });

  state.overlay.style.display = "block";
  state.overlay.style.height = `${overlayHeight(nav)}px`;
  state.overlay.appendChild(state.menu);
  state.menu.setAttribute("data-nav-menu-open", "");
  btn.classList.add("w--open");
  nav.classList.add("w--nav-menu-open");
  btn.setAttribute("aria-expanded", "true");
}

function navToggle(btn: HTMLElement) {
  const nav = btn.closest<HTMLElement>(".w-nav");
  if (!nav) return;
  initNavElement(nav);
  if (btn.classList.contains("w--open")) closeNav(nav);
  else openNav(nav, btn);
}

function onDocumentClick(e: MouseEvent) {
  const target = e.target;
  if (!(target instanceof Element)) return;

  const btn = target.closest<HTMLElement>(".w-nav-button");
  if (btn) {
    e.preventDefault();
    navToggle(btn);
    return;
  }

  if (!target.closest(".w-nav-menu") && !target.closest(".w-nav-overlay")) {
    document.querySelectorAll<HTMLElement>(".w-nav.w--nav-menu-open").forEach(closeNav);
  }
}

export function initNavInteractions() {
  document.querySelectorAll<HTMLElement>(".w-nav").forEach(initNavElement);
  document.addEventListener("click", onDocumentClick);
  return () => document.removeEventListener("click", onDocumentClick);
}
