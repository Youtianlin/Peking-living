"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./SplashScreen.module.css";

const IMAGES = [
  "/bg/realsmarthome-beijing-2044138_1920.jpg",
  "/bg/jeremy888-city-5772040_1920.jpg",
  "/bg/jplenio-temple-of-heaven-3675835_1920.jpg",
  "/bg/jack_jiao-forbidden-city-4428906_1920.jpg",
  "/bg/gyosimon-peking-1798593_1920.jpg",
  "/bg/jeremy888-temple-6846973_1920.jpg",
  "/bg/peggy_marco-roof-1028250_1920.jpg",
];

const INTERVAL = 5000;

interface Props {
  onEnter: () => void;
}

export default function SplashScreen({ onEnter }: Props) {
  const [current, setCurrent] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % IMAGES.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, []);

  const handleEnter = () => {
    setExiting(true);
    setTimeout(onEnter, 800);
  };

  return (
    <motion.div
      className={styles.splash}
      animate={exiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* background carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className={styles.bgImage}
          style={{ backgroundImage: `url(${IMAGES[current]})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </AnimatePresence>

      <div className={styles.overlay} />

      {/* center content */}
      <div className={styles.centerContent}>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: -16 }}
          animate={exiting ? { opacity: 0, y: -16 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          湖南人北京生存指南
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={exiting ? { opacity: 0, y: 16 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <button className={styles.entry} onClick={handleEnter}>
            <span className={styles.ornament} />
            <span className={styles.line} />
            <span className={styles.entryText}>进 入 指 南</span>
            <span className={styles.line} />
            <span className={styles.ornament} />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
