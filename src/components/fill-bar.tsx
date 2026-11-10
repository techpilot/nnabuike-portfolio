"use client";
import { useEffect, useRef, useState } from "react";

// A bar that fills once when it scrolls into view. `value` is 0 to 1.
export default function FillBar({ value }: { value: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="bar" data-in={seen} style={{ ["--v" as string]: value }} role="presentation">
      <i />
    </div>
  );
}
