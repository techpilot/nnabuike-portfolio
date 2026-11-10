"use client";
import { useEffect, useRef } from "react";

type Props = { src: string; poster: string; width: number; height: number; label: string };

// Loads nothing until near the viewport, plays only while visible, loops, stays muted.
// Reduced-motion and Save-Data users keep the poster only.
export default function LazyVideo({ src, poster, width, height, label }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || saveData) return;
    el.muted = true;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!el.getAttribute("src")) el.src = src;
          el.play().catch(() => {});
        } else el.pause();
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [src]);
  return (
    <video ref={ref} poster={poster} width={width} height={height} muted loop playsInline preload="none"
      disablePictureInPicture aria-label={label} />
  );
}
