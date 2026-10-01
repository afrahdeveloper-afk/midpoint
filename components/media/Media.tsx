import Image from "next/image";
import { useId } from "react";
import { IMGS, isPhoto, posOf, type MatKey, type ProceduralKey } from "@/data/images";
import { MATERIALS } from "@/lib/materials";

/** A procedural SVG material (marble, stone, mosaic…), deterministic for a given seed. */
export function Material({ k, seed }: { k: ProceduralKey; seed?: number }) {
  const id = "m" + useId().replace(/[^a-zA-Z0-9_-]/g, "");
  return (
    <svg
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: MATERIALS[k](id, seed) }}
    />
  );
}

type MediaProps = {
  k: MatKey;
  /** Seed for procedural materials (ignored for photos) — same values as the original. */
  seed?: number;
  /** next/image `sizes` for photos. */
  sizes: string;
  /** Preload (LCP hero image). */
  preload?: boolean;
  /** Fetch priority hint (the LCP hero image uses "high"). */
  fetchPriority?: "high" | "low" | "auto";
};

/**
 * Fills its (positioned) parent with either a photo — `next/image` with the original
 * object-position focal point — or a procedural material. Replaces `MAT[key]()`.
 */
export function Media({ k, seed, sizes, preload, fetchPriority }: MediaProps) {
  if (isPhoto(k)) {
    return (
      <Image
        className="ph"
        src={IMGS[k]}
        alt=""
        fill
        sizes={sizes}
        preload={preload}
        fetchPriority={fetchPriority}
        draggable={false}
        style={{ objectPosition: posOf(k) }}
      />
    );
  }
  return <Material k={k} seed={seed} />;
}
