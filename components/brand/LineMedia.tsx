"use client";
import { useEffect, useRef, useState } from "react";
import { Media } from "@/components/media/Media";
import { IcZoom } from "@/components/icons";
import type { MatKey } from "@/data/images";
import { prefersReduced } from "@/lib/hooks";

const STEP = 4000; // ms per image

type Props = {
  keys: MatKey[];
  seed: number;
  sizes: string;
  /** Accessible name of the button ("View full image: Basins"). */
  label: string;
  /** Open the lightbox on this photo. */
  onOpen: (key: MatKey) => void;
};

/**
 * A product-line card's image, a button opening the gallery on the photo shown. With several
 * photos (the line image + the brand's `extra` photos for that line) they cross-fade in turn while
 * the card is on screen, with small progress bars; paused on hover/focus; reduced motion shows the first.
 */
export function LineMedia({ keys, seed, sizes, label, onOpen }: Props) {
  const [cur, setCur] = useState(0);
  const box = useRef<HTMLButtonElement>(null);
  const hold = useRef(false);
  const n = keys.length;

  useEffect(() => {
    const el = box.current;
    if (n < 2 || !el || prefersReduced() || !("IntersectionObserver" in window)) return;
    let t = 0;
    const io = new IntersectionObserver(([en]) => {
      clearInterval(t);
      if (en.isIntersecting) t = window.setInterval(() => !hold.current && setCur((c) => (c + 1) % n), STEP);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      clearInterval(t);
    };
  }, [n]);

  return (
    <button
      className="lm"
      type="button"
      ref={box}
      aria-label={label}
      aria-haspopup="dialog"
      onClick={(e) => {
        e.currentTarget.focus(); // Safari: the lightbox returns focus here
        onOpen(keys[cur]);
      }}
      onMouseEnter={() => (hold.current = true)}
      onMouseLeave={() => (hold.current = false)}
      onFocus={() => (hold.current = true)}
      onBlur={() => (hold.current = false)}
    >
      {n < 2 ? (
        <Media k={keys[0]} seed={seed} sizes={sizes} />
      ) : (
        keys.map((key, i) => (
          <span key={key} className={"lm-s" + (i === cur ? " on" : "")}>
            <Media k={key} seed={seed} sizes={sizes} />
          </span>
        ))
      )}
      <span className="lm-zoom" aria-hidden="true"><IcZoom w="1.5" /></span>
      {n > 1 && (
        <span className="lm-bars" aria-hidden="true">
          {keys.map((key, i) => <i key={key} className={i === cur ? "on" : undefined}></i>)}
        </span>
      )}
    </button>
  );
}
