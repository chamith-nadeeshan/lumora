"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function BannerCarousel({ slides, interval = 5500 }) {
  const [index, setIndex] = useState(0);
  const sectionRef = useRef(null);
  const timer = useRef(null);

  const start = () => {
    clearInterval(timer.current);
    if (slides.length <= 1) return;
    timer.current = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      interval
    );
  };

  // auto-advance loop
  useEffect(() => {
    start();
    return () => clearInterval(timer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length, interval]);

  const go = (i) => {
    setIndex(i);
    start(); // restart timer after manual nav
  };

  // parallax applied to every slide image
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
      const shift = Math.max(-1, Math.min(1, progress)) * 60;
      el.querySelectorAll(".banner__parallax").forEach((p) => {
        p.style.transform = `translate3d(0, ${shift}px, 0) scale(1.22)`;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="banner" ref={sectionRef}>
      {slides.map((s, i) => (
        <div
          key={i}
          className={`banner__slide ${i === index ? "is-active" : ""}`}
          aria-hidden={i !== index}
        >
          <div className="banner__media">
            <div className="banner__parallax">
              <Image
                src={s.image}
                alt={s.title}
                fill
                priority={i === 0}
                sizes="100vw"
                className="banner__img"
              />
            </div>
            <div className="banner__scrim" />
          </div>

          <div className="banner__content">
            <p className="banner__eyebrow">{s.eyebrow}</p>
            <h2 className="banner__title">{s.title}</h2>
            <p className="banner__body">{s.body}</p>
            <a href={s.cta.href} className="banner__cta">{s.cta.label}</a>
          </div>
        </div>
      ))}

      <div className="banner__dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={i === index ? "is-active" : ""}
            aria-label={`Slide ${i + 1}`}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </section>
  );
}
