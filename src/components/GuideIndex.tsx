"use client";

import { useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./GuideIndex.module.css";

interface Category {
  num: string;
  title: string;
  desc: string;
  href: string;
  span: "hero" | "wide" | "sm";
  image: string;
}

const categories: Category[] = [
  {
    num: "01",
    title: "美食地图",
    desc: "北京湘菜馆测评，湖南舌头鉴定，去哪买剁辣椒",
    href: "/food",
    span: "hero",
    image: "/bg/food_card.jpg",
  },
  {
    num: "02",
    title: "气候适应",
    desc: "沙尘暴、杨絮、干燥、暖气——湖南人对北京天气的全部震撼",
    href: "/climate",
    span: "sm",
    image: "/bg/climate_card.jpg",
  },
  {
    num: "03",
    title: "生活指南",
    desc: "租房、交通、医保、办证，在北京活下去的基本功",
    href: "/living",
    span: "sm",
    image: "/bg/living_card.jpg",
  },
  {
    num: "04",
    title: "文化差异",
    desc: "说话、吃饭、交朋友，湖南人和北京人全都不一样",
    href: "/culture",
    span: "wide",
    image: "/bg/culture_card.jpg",
  },
  {
    num: "05",
    title: "景点攻略",
    desc: "不只有故宫长城，我私藏的北京好去处",
    href: "/travel",
    span: "sm",
    image: "/bg/travel_card.jpg",
  },
  {
    num: "06",
    title: "求学就业",
    desc: "北京高校、实习校招、湖南老乡会",
    href: "/study",
    span: "sm",
    image: "/bg/study_card.jpg",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const spanKey = {
  hero: styles.spanHero,
  wide: styles.spanWide,
  sm: styles.spanSm,
};

export default function GuideIndex() {
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <div className={styles.page}>
      {/* SVG noise texture */}
      <svg className={styles.noise} aria-hidden="true">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" opacity="0.04" />
      </svg>

      {/* Image banner */}
      <div className={styles.banner}>
        <div
          className={styles.bannerImg}
          style={{
            backgroundImage: "url(/bg/realsmarthome-beijing-2044138_1920.jpg)",
          }}
        />
        <div className={styles.bannerOverlay} />
        <div className={styles.bannerContent}>
          <div className={styles.bannerContentInner}>
            <motion.h2
              className={styles.bannerHeading}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              索引
            </motion.h2>
          </div>
        </div>
      </div>

      {/* Bento grid */}
      <div className={styles.wrapper}>
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {categories.map((cat) => (
            <Link
              key={cat.num}
              href={cat.href}
              legacyBehavior
              passHref
            >
              <motion.a
                className={`${styles.card} ${spanKey[cat.span]}`}
                variants={cardVariants}
                onMouseMove={handleMouseMove}
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(30,28,25,0.15), rgba(30,28,25,0.45) 50%, rgba(30,28,25,0.88)), url(${cat.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <span className={styles.num}>{cat.num}</span>
                <h3 className={styles.cardTitle}>{cat.title}</h3>
                <p className={styles.cardDesc}>{cat.desc}</p>
              </motion.a>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
