"use client";
import { useEffect, useState } from "react";

const chapters = [
  ["origin", "Origin"], ["spark", "Spark"], ["research", "Research"],
  ["proof", "Proof"], ["voice", "Voice"], ["next", "Next"],
] as const;

export default function ChapterRail() {
  const [active, setActive] = useState("origin");

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - innerHeight;
        document.documentElement.style.setProperty("--p", String(max > 0 ? Math.min(1, scrollY / max) : 0));
      });
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    chapters.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => { removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); io.disconnect(); };
  }, []);

  return (
    <>
      <div className="progress" aria-hidden="true" />
      <nav className="rail" aria-label="Story chapters">
        {chapters.map(([id, label], i) => (
          <a key={id} href={`#${id}`} aria-current={active === id}>{`${i + 1}  ${label}`}</a>
        ))}
      </nav>
    </>
  );
}
