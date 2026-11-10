"use client";
import { useEffect, useRef, useState } from "react";

// battery: whether the battery is part of that configuration. pcm: whether the PCM store is.
const modes = [
  {
    id: "base", label: "Battery (as built)", cut: 0, battery: true, pcm: false,
    day: "As built: by day PV feeds refrigeration and charges the 52.5 kWh lithium-ion battery.",
    night: "At the absent of sunlight the battery takes over, so refrigeration keeps running.",
  },
  {
    id: "pcm", label: "PCM instead", cut: 7.1, battery: false, pcm: true,
    day: "By day PV runs refrigeration, which also charges the PCM store.",
    night: "At the absent of sunlight refrigeration stops and the PCM supplies the cold room. In the model: smoother temperature control, less compressor cycling, longer autonomy.",
  },
  {
    id: "hybrid", label: "Battery + PCM hybrid", cut: 7.3, battery: true, pcm: true, // confirm 7.3 with him
    day: "By day PV runs refrigeration and charges both the battery and the PCM. The best case in the model.",
    night: "At the absent of sunlight the battery keeps refrigeration running while the PCM also feeds the cold room.",
  },
];
const snow: [number, number][] = [[556, 0], [578, -1], [600, -2], [622, -0.5], [644, -1.5], [664, -2.5], [588, -3]];

// Live schematic of the cold room study. Pick a configuration and a time of day; the diagram and the saving respond.
export default function EnergyFlow() {
  const [i, setI] = useState(0);
  const [shown, setShown] = useState(0);
  const [live, setLive] = useState(false);
  const [phase, setPhase] = useState<"day" | "night">("day");
  const [auto, setAuto] = useState(true);
  const cur = useRef(0);
  const box = useRef<HTMLElement>(null);
  const m = modes[i];

  useEffect(() => {
    const to = m.cut, from = cur.current, t0 = performance.now();
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const tick = (t: number) => {
      const p = reduce ? 1 : Math.min(1, (t - t0) / 700);
      cur.current = from + (to - from) * (1 - (1 - p) ** 3);
      setShown(cur.current);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [i, m.cut]);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Day and night alternate on their own until the visitor picks one.
  useEffect(() => {
    if (!live || !auto || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setPhase((p) => (p === "day" ? "night" : "day")), 6500);
    return () => clearInterval(id);
  }, [live, auto]);

  const part = (on: boolean) => `part${on ? " in" : ""}`;
  const text = Math.abs(shown - m.cut) < 0.05 ? String(m.cut) : shown.toFixed(1);
  const pick = (p: "day" | "night") => { setPhase(p); setAuto(false); };
  // Refrigeration runs by day, and at night only if a battery is feeding it.
  const running = phase === "day" || m.battery;

  return (
    <figure ref={box} className="flow-card" data-live={live} data-phase={live ? phase : undefined} data-run={running}>
      <div className="flow-top">
        <div className="seg" role="group" aria-label="Cold room configuration">
          {modes.map((x, k) => (
            <button key={x.id} type="button" aria-pressed={k === i} onClick={() => setI(k)}>{x.label}</button>
          ))}
        </div>
        <div className="seg" role="group" aria-label="Time of day">
          <button type="button" aria-pressed={phase === "day"} onClick={() => pick("day")}>Sunny</button>
          <button type="button" aria-pressed={phase === "night"} onClick={() => pick("night")}>Sunless</button>
        </div>
        <p className="cut"><b className="display">{text}%</b>lower annual heat-pump energy</p>
      </div>
      <svg viewBox="0 0 720 400" role="img" aria-label="Schematic: sunlight feeds a PV array. By day the PV array powers refrigeration, which cools a cold room. At night a battery keeps refrigeration running, or, with PCM storage, the PCM supplies the cold room directly.">
        <defs>
          <clipPath id="pv-clip"><polygon points="40,250 84,180 214,180 170,250" /></clipPath>
          <clipPath id="tank-clip"><rect x="540" y="300" width="150" height="66" rx="8" /></clipPath>
          <mask id="crescent"><rect x="40" y="30" width="60" height="64" fill="#fff" /><circle cx="80" cy="55" r="17" fill="#000" /></mask>
        </defs>

        <g className="day">
          <g transform="translate(70 62)">
            <g className="spin">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => <line key={a} x1="0" y1="-30" x2="0" y2="-42" transform={`rotate(${a})`} className="ray" />)}
            </g>
            <circle r="20" className="sun" />
          </g>
          <path className="flow warm" d="M78 88 L96 178" />
          <path className="flow warm" d="M96 80 L140 178" />
        </g>
        <g className="night">
          <circle cx="70" cy="62" r="20" className="moon" mask="url(#crescent)" />
          {[[104, 40], [116, 70], [96, 92]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="2" className="moon" />)}
        </g>

        <polygon points="40,250 84,180 214,180 170,250" className="body" />
        <g clipPath="url(#pv-clip)">
          <path className="grid" d="M116 180 L72 250 M149 180 L105 250 M181 180 L137 250 M62 215 H192" />
          <g className="sweep"><polygon points="-10,260 20,170 44,170 14,260" className="sheen day" /></g>
        </g>
        <text className="lbl" x="127" y="290" textAnchor="middle">PV array</text>

        {/* PV to refrigeration: daytime only */}
        <g className="day"><path className="flow warm" d="M200 215 H372" /></g>

        {/* Battery: PV charges it by day, it feeds refrigeration at night */}
        <g className={part(m.battery)}>
          <g className="day"><path className="flow warm" d="M186 180 C186 110 210 62 250 62" /></g>
          <g className="night"><path className="flow warm" d="M356 62 H422 V170" /></g>
          <rect x="350" y="52" width="6" height="20" rx="2" className="body" />
          <rect x="250" y="34" width="100" height="56" rx="6" className="body" />
          <rect x="258" y="42" width="84" height="40" rx="3" className="batt" />
          <text className="lbl" x="300" y="112" textAnchor="middle">Battery</text>
        </g>

        {/* Refrigeration unit: dims and the fan stops when it has no power */}
        <g className={running ? "unit" : "unit idle"}>
          <rect x="372" y="170" width="100" height="90" rx="10" className="body" />
          <g className="fan">
            <circle cx="422" cy="215" r="28" className="ring" />
            {[0, 120, 240].map((a) => <ellipse key={a} cx="422" cy="200" rx="6" ry="13" transform={`rotate(${a} 422 215)`} className="blade" />)}
          </g>
          <text className="lbl" x="422" y="290" textAnchor="middle">Refrigeration</text>
        </g>
        {/* Refrigeration to cold room: only while refrigeration runs */}
        <g className={part(running)}><path className="flow cold" d="M472 215 H540" /></g>

        <rect x="540" y="110" width="150" height="145" rx="8" className="body" />
        {[556, 598, 640].map((x) => <rect key={x} x={x} y="226" width="34" height="26" rx="3" className="crate" />)}
        {snow.map(([x, d]) => <circle key={x} cx={x} cy="126" r="2.4" className="snow" style={{ animationDelay: `${d}s` }} />)}
        <text className="lbl" x="615" y="100" textAnchor="middle">Cold room</text>

        {/* PCM store: charged by day (flow into the store), supplies the cold room at night (flow out of it) */}
        <g className={part(m.pcm)}>
          <g className="day"><path className="flow cold rev" d="M615 300 V255" /></g>
          <g className="night"><path className="flow cold" d="M615 300 V255" /></g>
          <rect x="540" y="300" width="150" height="66" rx="8" className="body" />
          <g clipPath="url(#tank-clip)">
            <g className="level"><path className="wave" d="M500 332 q20 -10 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 V370 H500 Z" /></g>
          </g>
          <text className="lbl" x="615" y="356" textAnchor="middle">PCM store</text>
        </g>
      </svg>
      <figcaption>{phase === "day" ? m.day : m.night} Schematic, simplified. Savings are versus the battery system, from the master&rsquo;s TRNSYS model.</figcaption>
    </figure>
  );
}