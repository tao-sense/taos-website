"use client";

import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

type ScrollFadeProps = {
  children: React.ReactNode;
  delay?: number;
  distance?: number;
  duration?: number;
  type?:
    | "fade-up"
    | "fade-down"
    | "fade-left"
    | "fade-right"
    | "zoom-in"
    | "stagger";
  staggerChildren?: number;
};

export default function ScrollFade({
  children,
  delay = 0,
  distance = 20,
  duration = 0.6,
  type = "fade-up",
  staggerChildren = 0.15,
}: ScrollFadeProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.15,
    triggerOnce: true,
  });

  // Animation variants
  const variants: Record<string, Variants> = {
    "fade-up": {
      hidden: { opacity: 0, y: distance },
      visible: { opacity: 1, y: 0 },
    },
    "fade-down": {
      hidden: { opacity: 0, y: -distance },
      visible: { opacity: 1, y: 0 },
    },
    "fade-left": {
      hidden: { opacity: 0, x: -distance },
      visible: { opacity: 1, x: 0 },
    },
    "fade-right": {
      hidden: { opacity: 0, x: distance },
      visible: { opacity: 1, x: 0 },
    },
    "zoom-in": {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1 },
    },
    "stagger": {
      hidden: { opacity: 1 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren,
          delayChildren: delay,
        },
      },
    },
  };

  const childVariant: Variants = {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    },
  };

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      variants={variants[type]}
      initial="hidden"
      animate={controls}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      }}
    >
      {type === "stagger" ? (
        <>
          {Array.isArray(children)
            ? children.map((child, i) => (
                <motion.div key={i} variants={childVariant}>
                  {child}
                </motion.div>
              ))
            : children}
        </>
      ) : (
        children
      )}
    </motion.div>
  );
}