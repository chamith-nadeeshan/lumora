"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Reveal from "./Reveal";

export default function HScrollGallery({ heading, items }) {
  const trackRef = useRef(null);
  const barRef = useRef(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });
  const barDrag = useRef(false);
  const [thumb, setThumb] = useState({ width: 30, left: 0 });

  const recompute = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const ratio = el.scrollWidth > 0 ? el.clientWidth / el.scrollWidth : 1;
    const width = Math.max(10, Math.min(100, ratio * 100));
    const left = max > 0 ? (el.scrollLeft / max) * (100 - width) : 0;
    setThumb({ width, left });
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    recompute();
    el.addEventListener("scroll", recompute, { passive: true });
    window.addEventListener("resize", recompute);

    const onWheel = (e) => {
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;
      const delta =
        Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      const atStart = el.scrollLeft <= 0;
      const atEnd = el.scrollLeft >= max - 1;
      if ((delta < 0 && atStart) || (delta > 0 && atEnd)) return;
      e.preventDefault();
      e.stopPropagation();
      el.scrollLeft += delta;
    };
    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("scroll", recompute);
      window.removeEventListener("resize", recompute);
      el.removeEventListener("wheel", onWheel);
    };
  }, []);

  const onPointerDown = (e) => {
    const el = trackRef.current;
    drag.current = {
      active: true,
      startX: e.clientX,
      startLeft: el.scrollLeft,
      moved: false,
    };
    el.classList.add("is-dragging");
  };
  const onPointerMove = (e) => {
    if (!drag.current.active) return;
    const el = trackRef.current;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startLeft - dx;
  };
  const endDrag = () => {
    drag.current.active = false;
    trackRef.current?.classList.remove("is-dragging");
  };
  // prevent a drag from triggering the card link click
  const onClickCapture = (e) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const seek = (clientX) => {
    const el = trackRef.current;
    const bar = barRef.current;
    if (!el || !bar) return;
    const rect = bar.getBoundingClientRect();
    const frac = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    el.scrollLeft = frac * (el.scrollWidth - el.clientWidth);
  };

  return (
    <section className="gallery">
      <Reveal className="gallery__heading">
        <h2>{heading}</h2>
      </Reveal>

      <div
        className="hscroll"
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
      >
        {items.map((it, i) => (
          <Reveal
            as="a"
            href={it.href || "#"}
            className="hscard"
            key={it.caption}
            delay={i * 90}
            style={{ "--ar": it.ar || 1, "--h": it.h || "28rem" }}
          >
            <div className="hscard__media">
              <Image
                src={it.image}
                alt={it.caption}
                fill
                sizes="(max-width:760px) 70vw, 30vw"
                className="hscard__img"
                draggable={false}
              />
            </div>
            <figcaption className="hscard__caption">{it.caption}</figcaption>
          </Reveal>
        ))}
      </div>

      <div
        className="hbar"
        ref={barRef}
        onPointerDown={(e) => {
          barDrag.current = true;
          seek(e.clientX);
        }}
        onPointerMove={(e) => barDrag.current && seek(e.clientX)}
        onPointerUp={() => (barDrag.current = false)}
        onPointerLeave={() => (barDrag.current = false)}
      >
        <span
          className="hbar__thumb"
          style={{ width: `${thumb.width}%`, left: `${thumb.left}%` }}
        />
      </div>
    </section>
  );
}
