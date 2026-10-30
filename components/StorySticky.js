"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

const PANELS = [
  {
    nav: "Our Story",
    title: "Our Story",
    body: "Lumora was founded on a belief in slower living and the pleasure of pause. We design lighting that invites you to recline, unwind, and reconnect. Thoughtfully shaped for warmth and ease, every piece is created to elevate the everyday moments of rest.",
    media: "/images/section-ourstory/our%20story.jpg",
    type: "image",
    alt: "Woman resting beside the water in warm, natural light",
  },
  {
    nav: "Our Process",
    title: "Our Process",
    body: "From first sketch to final finish, each Lumora piece follows a considered journey of design, testing, and refinement. We combine modern tools with hands-on craftsmanship, ensuring every form, angle, and detail meets our standard for enduring calm.",
    media: "/images/section-ourstory/our%20process.mp4",
    type: "video",
    alt: "Our process — crafting a Lumora lamp",
  },
  {
    nav: "Our Materials",
    title: "Our Materials",
    body: "We choose materials that age beautifully — solid timber, natural linen, and mouth-blown glass. Each is selected for its honesty and warmth, chosen to be touched daily and to grow more characterful with every passing year.",
    media: "/images/section-ourstory/our%20material.jpg",
    type: "image",
    alt: "Natural materials — timber, linen and glass",
  },
];

export default function StorySticky() {
  const [active, setActive] = useState(0);
  const panelRefs = useRef([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.index));
        });
      },
      // fire when a panel crosses the vertical midpoint of the viewport
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );
    panelRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const goTo = (i) =>
    panelRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <section className="story" id="story-scroll">
      {/* Left — sticky navigation */}
      <aside className="story__nav">
        <ul>
          {PANELS.map((p, i) => (
            <li key={p.nav}>
              <button
                type="button"
                className={`story__navitem ${i === active ? "is-active" : ""}`}
                onClick={() => goTo(i)}
              >
                <span className="story__navline" aria-hidden="true" />
                {p.nav}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Middle — scrolling content */}
      <div className="story__content">
        {PANELS.map((p, i) => (
          <article
            key={p.nav}
            ref={(el) => (panelRefs.current[i] = el)}
            data-index={i}
            className={`story__panel ${i === active ? "is-active" : ""}`}
          >
            <h2 className="story__title">{p.title}</h2>
            <p className="story__body">{p.body}</p>
            <a href="#" className="story__cta">Read more</a>
          </article>
        ))}
      </div>

      {/* Right — sticky crossfading media (images + looping video) */}
      <div className="story__media">
        {PANELS.map((p, i) =>
          p.type === "video" ? (
            <video
              key={p.nav}
              className={`story__img ${i === active ? "is-active" : ""}`}
              src={`${BASE}${p.media}`}
              aria-label={p.alt}
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <Image
              key={p.nav}
              src={p.media}
              alt={p.alt}
              fill
              sizes="(max-width:900px) 100vw, 44vw"
              priority={i === 0}
              className={`story__img ${i === active ? "is-active" : ""}`}
            />
          )
        )}
      </div>
    </section>
  );
}
