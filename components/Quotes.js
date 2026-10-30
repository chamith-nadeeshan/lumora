"use client";

import { useEffect, useState } from "react";
import Reveal from "./Reveal";

const QUOTES = [
  {
    text: "Relaxed luxury, redefined. The glow is unlike anything else in our home.",
    author: "— Marin H., Melbourne",
  },
  {
    text: "It arrived like a piece of art. We dim it every evening and the room just exhales.",
    author: "— Davíd L., Lisbon",
  },
  {
    text: "Beautifully made, quietly perfect. Exactly the softness our bedroom was missing.",
    author: "— Priya S., London",
  },
];

export default function Quotes() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % QUOTES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <Reveal as="section" className="quotes">
      <div className="quotes__track">
        {QUOTES.map((q, i) => (
          <figure key={i} className={`quote ${i === index ? "is-active" : ""}`}>
            <blockquote>&ldquo;{q.text}&rdquo;</blockquote>
            <figcaption>{q.author}</figcaption>
          </figure>
        ))}
      </div>
      <div className="quotes__dots">
        {QUOTES.map((_, i) => (
          <button
            key={i}
            aria-label={`Testimonial ${i + 1}`}
            className={i === index ? "is-active" : ""}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </Reveal>
  );
}
