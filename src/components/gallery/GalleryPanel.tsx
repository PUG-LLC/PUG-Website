'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useTransform, useSpring, MotionValue } from 'framer-motion';
import { GalleryItem } from '@/data/gallery-items';

interface PanelLayout {
  id: string;
  left: string;
  top: string;
  rotate: number;
  scale: number;
  zIndex: number;
  depth: number; // 0 = closest (moves more), 1 = farthest (moves less)
}

interface GalleryPanelProps {
  item: GalleryItem;
  layout: PanelLayout;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  index: number;
  isReady: boolean;
}

// Panel sizes alternate between portrait and landscape to add rhythm
const PANEL_SIZES = [
  { w: 340, h: 460 }, // portrait large
  { w: 280, h: 380 }, // portrait small
  { w: 400, h: 280 }, // landscape
  { w: 300, h: 420 }, // portrait medium
  { w: 320, h: 440 }, // portrait medium-large
  { w: 260, h: 360 }, // portrait small
];

export function GalleryPanel({ item, layout, mouseX, mouseY, index, isReady }: GalleryPanelProps) {
  const [isHovered, setIsHovered] = useState(false);
  const size = PANEL_SIZES[index % PANEL_SIZES.length];

  // Parallax: closer panels move more (depth 0 = full movement, depth 1 = minimal)
  const parallaxStrength = (1 - layout.depth) * 40; // px range
  const moveX = useTransform(mouseX, [-0.5, 0.5], [-parallaxStrength, parallaxStrength]);
  const moveY = useTransform(mouseY, [-0.5, 0.5], [-parallaxStrength * 0.7, parallaxStrength * 0.7]);

  const springMoveX = useSpring(moveX, { stiffness: 35, damping: 22 });
  const springMoveY = useSpring(moveY, { stiffness: 35, damping: 22 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: layout.scale * 0.94 }}
      animate={isReady ? {
        opacity: 1,
        y: 0,
        scale: isHovered ? layout.scale * 1.04 : layout.scale,
      } : {}}
      transition={{
        opacity: { duration: 1.4, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] },
        y:       { duration: 1.4, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] },
        scale:   { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
      }}
      style={{
        position: 'absolute',
        left: layout.left,
        top: layout.top,
        zIndex: isHovered ? 100 : layout.zIndex,
        translateX: springMoveX,
        translateY: springMoveY,
        rotate: isHovered ? layout.rotate * 0.4 : layout.rotate,
        transformOrigin: 'center center',
      }}
      className="cursor-pointer select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main panel container */}
      <div
        className="relative overflow-hidden"
        style={{
          width: size.w,
          height: size.h,
          boxShadow: isHovered
            ? '0 40px 80px -12px rgba(0,0,0,0.18), 0 8px 24px -4px rgba(0,0,0,0.10)'
            : '0 20px 60px -10px rgba(0,0,0,0.12), 0 4px 16px -4px rgba(0,0,0,0.06)',
          transition: 'box-shadow 0.6s ease',
        }}
      >
        {/* Image */}
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          style={{
            transform: isHovered ? 'scale(1.06)' : 'scale(1.0)',
            transition: 'transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
          sizes={`${size.w}px`}
        />

        {/* Subtle frosted-glass overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.0) 50%, rgba(0,0,0,0.25) 100%)',
          }}
        />

        {/* Hover info overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-x-0 bottom-0 px-5 py-5"
          style={{
            background: 'linear-gradient(to top, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.0) 100%)',
          }}
        >
          <motion.div
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 8, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            {item.category && (
              <p className="text-[9px] uppercase tracking-[0.22em] text-neutral-400 mb-1">
                {item.category}
              </p>
            )}
            <h3
              className="text-[13px] text-neutral-800 leading-snug"
              style={{ fontFamily: 'var(--font-instrument-serif)', fontWeight: 400 }}
            >
              {item.title}
            </h3>
            {item.year && (
              <p className="text-[9px] text-neutral-400 mt-1.5 tracking-wide">{item.year}</p>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Depth shadow plane (decorative layer behind the panel) */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          transform: `translateZ(-${layout.depth * 20}px) translateX(${layout.rotate * 0.5}px) translateY(${Math.abs(layout.rotate) * 0.8}px)`,
          background: 'rgba(0,0,0,0.04)',
          filter: 'blur(8px)',
          borderRadius: '2px',
        }}
      />
    </motion.div>
  );
}
