"use client";
import { useEffect, useRef } from "react";

const W = 1400, H = 210;

export default function NameSignoff({ name = "Nnabuike Ngwu" }: { name?: string }) {
  const root = useRef<HTMLElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const spot = useRef<SVGCircleElement>(null);
  const turb = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    const el = root.current, s = svg.current, c = spot.current, t = turb.current;
    if (!el || !s || !c || !t) return;
    // Reduced motion: show the name crisp and still.
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { c.setAttribute("r", "2000"); return; }

    let hovering = false, raf = 0, last = 0, seed = 1;
    let x = W / 2, y = 110, tx = x, ty = y;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!hovering) { tx = W / 2 + 560 * Math.sin(now / 2600); ty = 110 + 20 * Math.sin(now / 1700); }
      x += (tx - x) * 0.12; y += (ty - y) * 0.12;          // eased follow
      c.setAttribute("cx", x.toFixed(1)); c.setAttribute("cy", y.toFixed(1));
      if (now - last > 110) { last = now; seed = (seed % 60) + 1; t.setAttribute("seed", String(seed)); } // grain shimmer
    };
    // Only animate while the band is on screen.
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      if (e.isIntersecting) raf = requestAnimationFrame(frame);
    });
    io.observe(el);

    const move = (e: PointerEvent) => {
      const r = s.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * W;
      ty = ((e.clientY - r.top) / r.height) * H;
      hovering = true;
    };
    const leave = () => { hovering = false; };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      io.disconnect(); cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  const text = { x: W / 2, y: 160, textAnchor: "middle" as const, fontSize: 190, textLength: 1300, lengthAdjust: "spacingAndGlyphs" as const };

  return (
    <section ref={root} className="signoff" aria-label={name}>
      {[16.66, 33.33, 50, 66.66, 83.33].map((l, i) => (
        <i key={l} className="scan" style={{ left: `${l}%`, ["--d" as string]: `${i * 0.9}s` }} aria-hidden="true" />
      ))}
      <svg ref={svg} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={name}>
        <defs>
          {/* Grain: ragged edges (displacement) + random speckle holes (thresholded noise). */}
          <filter id="ns-grain" x="-4%" y="-15%" width="108%" height="140%" colorInterpolationFilters="sRGB">
            <feTurbulence ref={turb} type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="1" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="16" xChannelSelector="R" yChannelSelector="G" result="d" />
            <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  9 0 0 0 -3.7" result="cut" />
            <feComposite in="d" in2="cut" operator="in" />
          </filter>
          <radialGradient id="ns-spot">
            <stop offset="0" stopColor="#fff" />
            <stop offset="0.6" stopColor="#fff" stopOpacity="0.85" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="ns-mask" maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
            <circle ref={spot} cx={W / 2} cy="110" r="150" fill="url(#ns-spot)" />
          </mask>
        </defs>
        <text className="ns-text ns-grain" filter="url(#ns-grain)" aria-hidden="true" {...text}>{name}</text>
        <text className="ns-text ns-crisp" mask="url(#ns-mask)" aria-hidden="true" {...text}>{name}</text>
      </svg>
    </section>
  );
}
