"use client";

import { useEffect } from "react";
import { initNavInteractions } from "@/lib/init-nav";
import type { ScriptItem } from "@/lib/site-scripts";

export type { ScriptItem };

export default function PageClient({
  html,
  scripts,
}: {
  html: string;
  scripts: ScriptItem[];
}) {
  useEffect(() => {
    return initNavInteractions();
  }, []);

  useEffect(() => {
    let i = 0;
    const added: HTMLScriptElement[] = [];

    function loadNext() {
      if (i >= scripts.length) return;
      const item = scripts[i++];
      const el = document.createElement("script");
      if (item.src) {
        el.src = item.src;
      } else {
        el.textContent = item.inline ?? "";
      }
      el.onload = el.onerror = loadNext;
      document.body.appendChild(el);
      added.push(el);
      if (!item.src) loadNext();
    }

    loadNext();

    return () => {
      added.forEach((el) => el.remove());
    };
  }, [scripts]);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
