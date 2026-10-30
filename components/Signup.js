"use client";

import { useState } from "react";
import Reveal from "./Reveal";

export default function Signup() {
  const [msg, setMsg] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setMsg("Thank you — welcome to the warm.");
    e.currentTarget.reset();
  };

  return (
    <Reveal as="section" className="signup">
      <h2 className="signup__title">Stay in the warm.</h2>
      <p className="signup__sub">
        Join us for new releases, slow-living notes and early access. No noise — only light.
      </p>
      <form className="signup__form" onSubmit={onSubmit}>
        <input type="email" placeholder="Your email address" required aria-label="Email address" />
        <button type="submit" className="btn btn--dark">Subscribe</button>
      </form>
      <p className="signup__msg" aria-live="polite">{msg}</p>
    </Reveal>
  );
}
