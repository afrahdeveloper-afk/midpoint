"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { MediaFrame } from "@/components/custom/media-frame";

type RevealImageProps = React.ComponentProps<typeof MediaFrame> & {
  delay?: number;
  wrapperClassName?: string;
};

export function RevealImage({
  delay = 0,
  wrapperClassName,
  className,
  ...mediaProps
}: RevealImageProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const media = wrapper?.querySelector("[data-media-frame]");
    if (!wrapper || !media) return;

    if (reducedMotion) {
      gsap.set(wrapper, { clipPath: "inset(0% 0% 0% 0%)" });
      gsap.set(media, { clearProps: "transform" });
      return;
    }

    gsap.set(wrapper, { clipPath: "inset(0% 0% 100% 0%)" });
    gsap.set(media, { scale: 1.12 });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: wrapper, start: "top 85%", once: true },
    });
    tl.to(wrapper, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1.1,
      delay,
      ease: "power3.out",
    }).to(
      media,
      {
        scale: 1,
        duration: 1.3,
        delay,
        ease: "power3.out",
        // Drop the inline transform once settled so hover/CSS-driven
        // transforms on the same element aren't fighting an inline style.
        onComplete: () => gsap.set(media, { clearProps: "transform" }),
      },
      "<",
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [reducedMotion, delay]);

  return (
    <div ref={wrapperRef} className={wrapperClassName}>
      <MediaFrame {...mediaProps} className={className ?? "h-full w-full"} />
    </div>
  );
}
