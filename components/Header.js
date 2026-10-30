"use client";

import { useEffect, useRef, useState } from "react";

const LINKS = [
  { href: "#collection", label: "Shop" },
  { href: "#story", label: "Our Story" },
  { href: "#journal", label: "Journal" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const el = headerRef.current;
      if (!el) return;
      if (y > lastY.current && y > 200) el.style.transform = "translateY(-100%)";
      else el.style.transform = "translateY(0)";
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="announce">
        <p>Complimentary shipping on all orders over $200 — every lamp, hand-finished to order.</p>
      </div>

      <header className="header" ref={headerRef}>
        <div className="header__inner">
          <button
            className="header__burger"
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span></span><span></span><span></span>
          </button>

          <nav className="nav nav--left">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="nav__link">{l.label}</a>
            ))}
          </nav>

          <a href="#top" className="brand" aria-label="Lumora home">LUMORA</a>

          <nav className="nav nav--right">
            <span className="nav__region">USD</span>
            <a href="#" className="nav__link" aria-label="Account">Account</a>
            <a href="#" className="nav__link nav__cart">Cart <span className="nav__count">0</span></a>
          </nav>
        </div>
      </header>

      <div className={`mobile-menu ${open ? "is-open" : ""}`}>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
        ))}
        <a href="#" onClick={() => setOpen(false)}>Account</a>
        <a href="#" onClick={() => setOpen(false)}>Cart (0)</a>
      </div>
    </>
  );
}
