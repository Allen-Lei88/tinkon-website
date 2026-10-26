"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function MobileNavigation({ children }: { children: ReactNode }) {
  const navigationRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const navigation = navigationRef.current;
    if (!navigation) return;

    const close = () => { navigation.open = false; };
    const dismissOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !navigation.contains(event.target)) close();
    };
    const dismissWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && navigation.open) {
        close();
        navigation.querySelector("summary")?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 1051px)");

    document.addEventListener("pointerdown", dismissOutside);
    document.addEventListener("keydown", dismissWithEscape);
    window.addEventListener("popstate", close);
    window.addEventListener("hashchange", close);
    window.addEventListener("pageshow", close);
    desktop.addEventListener("change", close);

    return () => {
      document.removeEventListener("pointerdown", dismissOutside);
      document.removeEventListener("keydown", dismissWithEscape);
      window.removeEventListener("popstate", close);
      window.removeEventListener("hashchange", close);
      window.removeEventListener("pageshow", close);
      desktop.removeEventListener("change", close);
    };
  }, []);

  return (
    <details
      className="mobile-nav"
      ref={navigationRef}
      onClick={(event) => {
        if (event.target instanceof Element && event.target.closest("a")) {
          event.currentTarget.open = false;
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          event.currentTarget.open = false;
        }
      }}
    >
      <summary>Menu</summary>
      <nav className="mobile-panel" aria-label="Mobile navigation">{children}</nav>
    </details>
  );
}
