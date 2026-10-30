"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "./Reveal";

export default function ProductGrid({ title, categories, products }) {
  const [active, setActive] = useState("all");
  const filtered =
    active === "all" ? products : products.filter((p) => p.category === active);

  return (
    <section className="plist" id="collection">
      <div className="plist__head">
        <h2 className="plist__title">{title}</h2>
        <nav className="plist__filters">
          {categories.map((c) => (
            <button
              key={c.key}
              className={`plist__filter ${active === c.key ? "is-active" : ""}`}
              onClick={() => setActive(c.key)}
            >
              {active === c.key && <span className="plist__dash">—</span>}
              {c.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="plist__grid">
        {filtered.map((p, i) => (
          <Reveal
            as="a"
            href={p.href || "#"}
            className="pcard"
            key={p.id}
            delay={(i % 3) * 90}
          >
            <div className="pcard__media">
              {p.isNew && <span className="pcard__badge">New</span>}
              <Image
                src={p.default}
                alt={p.name}
                fill
                sizes="(max-width:760px) 100vw, 33vw"
                className="pcard__img pcard__img--default"
              />
              <Image
                src={p.hover}
                alt=""
                fill
                sizes="(max-width:760px) 100vw, 33vw"
                className="pcard__img pcard__img--hover"
                aria-hidden="true"
              />
            </div>

            <div className="pcard__info">
              <div className="pcard__text">
                <h3 className="pcard__name">{p.name}</h3>
                <p className="pcard__collection">{p.collection}</p>
                <p className="pcard__brand">{p.brand}</p>
              </div>
              <span className="pcard__price">{p.price}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
