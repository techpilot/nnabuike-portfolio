"use client";
import { useEffect, useRef, useState } from "react";

// 100 dots = 100 Nigerians. 39 stay dark (no electricity in 2023, IEA); the rest light up in a wave.
export default function DotGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div>
      <div ref={ref} className="dots" data-in={seen} role="img" aria-label="100 dots; 39 stay dark to show the 39% of Nigerians without electricity in 2023">
        {Array.from({ length: 100 }, (_, i) => (
          <i key={i} className={(i * 37) % 100 < 39 ? "off" : "on"} style={{ ["--i" as string]: i }} />
        ))}
      </div>
      <p className="dots-key">Each dot is 1 in 100 Nigerians. The dark ones had no electricity.</p>
    </div>
  );
}
