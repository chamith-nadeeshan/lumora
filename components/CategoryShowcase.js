"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "./Reveal";

const CATEGORIES = [
  {
    label: "Table Lamps",
    img: "/images/image-g1/Woman_reading_beside_lamp_6f4d10a8.jpg",
    body: "A warm centrepiece for any room. Our table lamps cast soft, considered light — crafted to make a space feel instantly calmer.",
  },
  {
    label: "Bedside Lamps",
    img: "/images/image-g1/Woman_reading_book_in_bedroom_510c9af5.jpg",
    body: "The last light you touch at night. A gentle, dimmable glow designed for winding down and reading in bed.",
  },
  {
    label: "Reading Lamps",
    img: "/images/image-g1/Man_reading_book_in_lounge_416225be.jpg",
    body: "Light made for long pages. Focused yet soft illumination that stays easy on the eyes, hour after hour.",
  },
  {
    label: "Desk Lamps",
    img: "/images/image-g1/Man_writing_in_notebook_7ed64cec.jpg",
    body: "Quiet focus, beautifully lit. Clean-lined desk lamps that bring warmth and clarity to where you work.",
  },
  {
    label: "Ambient Lighting",
    img: "/images/image-g1/Couple_relaxing_on_sofa_2870e94c.jpg",
    body: "Set the mood of the whole room. Layered, low-glare light for evenings that ask you to slow down.",
  },
];

export default function CategoryShowcase() {
  const [active, setActive] = useState(2);
  const current = CATEGORIES[active];

  return (
    <Reveal as="section" className="showcase">
      <div className="showcase__media">
        <div className="showcase__main">
          {CATEGORIES.map((c, i) => (
            <Image
              key={c.label}
              src={c.img}
              alt={c.label}
              fill
              sizes="(max-width:760px) 100vw, 560px"
              priority={i === 2}
              className={`showcase__img ${i === active ? "is-active" : ""}`}
            />
          ))}
        </div>

        <div className="showcase__thumbs">
          {CATEGORIES.map((c, i) => (
            <button
              key={c.label}
              className={`showcase__thumb ${i === active ? "is-active" : ""}`}
              onClick={() => setActive(i)}
              aria-label={c.label}
              onMouseEnter={() => setActive(i)}
            >
              <Image src={c.img} alt="" fill sizes="48px" />
            </button>
          ))}
        </div>
      </div>

      <div className="showcase__text">
        <ul className="showcase__list">
          {CATEGORIES.map((c, i) => (
            <li key={c.label}>
              <button
                className={`showcase__cat ${i === active ? "is-active" : ""}`}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
              >
                {i === active && <span className="showcase__dash">—</span>}
                {c.label}
              </button>
            </li>
          ))}
        </ul>

        <p className="showcase__body">{current.body}</p>

        <a href="#" className="showcase__cta">
          Shop {current.label}
        </a>
      </div>
    </Reveal>
  );
}
