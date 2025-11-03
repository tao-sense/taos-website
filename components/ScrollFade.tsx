"use client";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function ScrollFade({
  children,
  delay = 0,
  distance = 20,
  duration = 0.6,
}: {
  children: React.ReactNode;
  delay?: number;
  distance?: number;
  duration?: number;
}) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.15, // triggers when 15% visible
    triggerOnce: true, // runs once per load
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1], // smooth ease
        },
      });
    }
  }, [controls, inView, delay, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: distance }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
}