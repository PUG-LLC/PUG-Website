"use client";

import React, { useEffect, useRef } from "react";
import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { galleryItems, GalleryItem } from "@/data/gallery-items";

const CARD_W = 520;
const CARD_H = 330;
const N = galleryItems.length;

// Per-slot step in 3D cascade
const STEP_X = 115; // px rightward per slot
const STEP_Y = -68; // px upward per slot
const STEP_Z = -90; // px into screen per slot

// ── Single card component ────────────────────────────────────────────────────
interface CardProps {
  item: GalleryItem;
  index: number;
  scrollIndex: MotionValue<number>;
}

function GalleryCard({ item, index, scrollIndex }: CardProps) {
  // offset = 0 → active (front). offset > 0 → behind.  offset < 0 → passed.
  const offset = useTransform(scrollIndex, (s) => index - s);

  const tx = useTransform(offset, (o) => o * STEP_X);
  const ty = useTransform(offset, (o) => o * STEP_Y);
  const tz = useTransform(offset, (o) => o * STEP_Z);

  // Passed cards (-0.4 → 0) fade in/out; back cards lightly fade
  const opacity = useTransform(offset, [-0.4, 0, N - 1], [0, 1, 0.4]);

  return (
    <motion.div
      style={{
        position: "absolute",
        left: "50%",
        top: "52%",
        width: CARD_W,
        height: CARD_H,
        marginLeft: -(CARD_W / 2),
        marginTop: -(CARD_H / 2),
        translateX: tx,
        translateY: ty,
        translateZ: tz,
        opacity,
        overflow: "hidden",
        boxShadow: "0 28px 70px rgba(0,0,0,0.22), 0 6px 18px rgba(0,0,0,0.10)",
      }}
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes={`${CARD_W}px`}
        className="object-cover"
        priority={index < 2}
      />
    </motion.div>
  );
}

// ── Scene ────────────────────────────────────────────────────────────────────
export function GalleryScene() {
  const mouseNX = useMotionValue(0);
  const mouseNY = useMotionValue(0);
  const springNX = useSpring(mouseNX, { stiffness: 40, damping: 28 });
  const springNY = useSpring(mouseNY, { stiffness: 40, damping: 28 });

  const rotY = useTransform(springNX, (v) => v * 6 - 5);
  const rotX = useTransform(springNY, (v) => v * 4);

  // Raw scroll target (0 … N-1); spring gives the inertia feel
  const rawIndex = useMotionValue(0);
  const scrollIndex = useSpring(rawIndex, {
    stiffness: 50,
    damping: 20,
    mass: 1.1,
  });
  const rawRef = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseNX.set(e.clientX / window.innerWidth - 0.5);
      mouseNY.set(e.clientY / window.innerHeight - 0.5);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      // Normalise: ~500px total trackpad swipe advances 1 card
      const delta = e.deltaY / 500;
      rawRef.current = Math.max(0, Math.min(N - 1, rawRef.current + delta));
      rawIndex.set(rawRef.current);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("wheel", onWheel);
    };
  }, [mouseNX, mouseNY, rawIndex]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        perspective: "900px",
        perspectiveOrigin: "50% 52%",
        zIndex: 1,
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          transformStyle: "preserve-3d",
          rotateX: rotX,
          rotateY: rotY,
        }}
      >
        {galleryItems.map((item, i) => (
          <GalleryCard
            key={item.id}
            item={item}
            index={i}
            scrollIndex={scrollIndex}
          />
        ))}
      </motion.div>
    </div>
  );
}
