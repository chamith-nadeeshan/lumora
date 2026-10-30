"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

const SLIDES = [
  {
    tone: "dusk",
    lamp: "lamp--dome",
    eyebrow: "New — The Aurelle Collection",
    title: "Warmth, perfected.",
    sub: "Table lamps crafted for the quiet hours — when the day slows and the light softens.",
    cta: { href: "#collection", label: "Shop the collection" },
  },
  {
    tone: "sand",
    lamp: "lamp--column",
    eyebrow: "Hand-finished in small batches",
    title: "Light, made slow.",
    sub: "Each shade is turned, dyed and assembled by hand — no two quite alike.",
    cta: { href: "#story", label: "Discover our craft" },
  },
  {
    tone: "clay",
    lamp: "lamp--globe",
    eyebrow: "Designed to endure",
    title: "A gentler glow.",
    sub: "Dimmable, warm-toned light that flatters the room and everyone in it.",
    cta: { href: "#collection", label: "Explore" },
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const timer = useRef(null);

  const start = useCallback(() => {
    clearInterval(timer.current);
    timer.current = setInterval(
      () => setIndex((i) => (i + 1) % SLIDES.length),
      6000
    );
  }, []);

  useEffect(() => {
    start();
    return () => clearInterval(timer.current);
  }, [start]);

  const go = (i) => {
    setIndex(i);
    start();
  };

  return (
    <section className="hero hero--video">
      <video
        className="hero__video"
        src={`${BASE}/videos/landing-bg.mp4`}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />
      <div className="hero__scrim" aria-hidden="true" />

      {SLIDES.map((s, i) => (
        <div
          key={i}
          className={`hero__slide ${i === index ? "is-active" : ""}`}
          data-tone={s.tone}
        >
          <div className="hero__art">
            <div className={`lamp ${s.lamp}`}></div>
          </div>
          <div className="hero__content">
            <p className="eyebrow">{s.eyebrow}</p>
            <h1 className="hero__title">{s.title}</h1>
            <p className="hero__sub">{s.sub}</p>
            <a href={s.cta.href} className="btn btn--light">{s.cta.label}</a>
          </div>
        </div>
      ))}

      <div className="hero__dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            className={i === index ? "is-active" : ""}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </section>
  );
}
