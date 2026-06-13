"use client";

import { useEffect } from "react";

export default function HowItWorksAnimator() {
  useEffect(() => {
    const init = async () => {
      const gsap = (await import("gsap")).default;
      const ScrollTrigger = (await import("gsap/ScrollTrigger")).default;
      gsap.registerPlugin(ScrollTrigger);

      /* Hero fade-in */
      const hero = document.querySelector(".section-hero-wrapper");
      if (hero) {
        gsap.fromTo(
          hero.querySelectorAll(".h1-heading, .h1-headig-italic, .p-hero__subtext"),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.6,
            ease: "power2.out",
          }
        );
      }

      /* Process rail animation */
      const processMain = document.querySelector(".process-main");
      const rail = document.querySelector(".loop-rail");
      const fill = document.querySelector(".loop-rail-fill");
      const nodes = gsap.utils.toArray(".loop-node") as Element[];
      const wrappers = gsap.utils.toArray(
        ".loop-node-wrapper"
      ) as Element[];

      if (!processMain || !rail || !fill || nodes.length < 2) return;

      const getNodeOffsetFromProcessMain = (node: Element) => {
        const nodeRect = node.getBoundingClientRect();
        const processMainRect = processMain.getBoundingClientRect();
        return nodeRect.top + nodeRect.height / 2 - processMainRect.top;
      };

      const updateRailDimensions = () => {
        const firstOffset = getNodeOffsetFromProcessMain(nodes[0]);
        const lastOffset = getNodeOffsetFromProcessMain(
          nodes[nodes.length - 1]
        );
        gsap.set(rail, {
          top: firstOffset,
          height: lastOffset - firstOffset,
        });
        gsap.set(fill, { top: 0 });
      };

      gsap.set(fill, { height: 0 });

      gsap.to(fill, {
        height: () => {
          const firstOffset = getNodeOffsetFromProcessMain(nodes[0]);
          const lastOffset = getNodeOffsetFromProcessMain(
            nodes[nodes.length - 1]
          );
          return lastOffset - firstOffset;
        },
        ease: "none",
        scrollTrigger: {
          trigger: nodes[0],
          start: "center center",
          endTrigger: nodes[nodes.length - 1],
          end: "center center",
          scrub: true,
          invalidateOnRefresh: true,
          onRefresh: updateRailDimensions,
        },
      });

      wrappers.forEach((wrapper) => {
        ScrollTrigger.create({
          trigger: wrapper,
          start: "top center",
          onEnter: () => wrapper.classList.add("is-active"),
          onLeaveBack: () => wrapper.classList.remove("is-active"),
        });
      });

      updateRailDimensions();

      if (typeof ResizeObserver !== "undefined") {
        const ro = new ResizeObserver(() => ScrollTrigger.refresh());
        ro.observe(processMain);
      }
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }
  }, []);

  return null;
}
