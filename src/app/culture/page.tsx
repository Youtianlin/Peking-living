"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const subSections = [
  { label: "说话方式", desc: "北京人说话 vs 湖南人，\'您\'这个字的文化重量", href: "/culture/speech" },
  { label: "饭局规矩", desc: "在北京吃饭，有些规矩湖南人真的不懂", href: "/culture/dining" },
  { label: "湖南口音", desc: "在北京，我的湖南口音经历了什么", href: "/culture/accent" },
  { label: "交友恋爱", desc: "在北京交朋友、谈恋爱，和湖南完全不一样", href: "/culture/relationships" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function CulturePage() {
  return (
    <div style={{ minHeight: "100vh", background: "#161412", color: "#e6ddd2" }}>
      <div style={{ padding: "120px 24px 64px", maxWidth: 1100, margin: "0 auto" }}>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          style={{
            fontSize: 12, letterSpacing: "0.22em",
            color: "rgba(230,221,210,0.45)", marginBottom: 16,
          }}
        >
          04 · 文化差异
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
          style={{
            fontFamily: '"ZCOOL XiaoWei", "Noto Serif SC", serif',
            fontSize: "clamp(32px, 6vw, 56px)", fontWeight: 400,
            letterSpacing: "0.03em", lineHeight: 1.15, marginBottom: 20,
          }}
        >
          北京人的规矩
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
          style={{ fontSize: 16, color: "#b0a594", maxWidth: 560, lineHeight: 1.7 }}
        >
          在北京，有些事湖南人真的不懂。一个北大社会学学生的田野观察。
        </motion.p>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 120px" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 14,
          }}
        >
          {subSections.map((s, i) => (
            <motion.div key={s.label} custom={i} initial="hidden" animate="visible" variants={cardVariants}>
              <Link
                href={s.href}
                style={{
                  display: "flex", flexDirection: "column", justifyContent: "flex-end",
                  height: 200, padding: 28, background: "#1e1c19",
                  border: "1px solid #2d2a26", borderRadius: 16,
                  textDecoration: "none", color: "inherit",
                  transition: "border-color 0.4s ease, transform 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#4a4540";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#2d2a26";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <h3 style={{ fontFamily: '"Noto Serif SC", serif', fontSize: 18, fontWeight: 600, color: "#e6ddd2", marginBottom: 8 }}>
                  {s.label}
                </h3>
                <p style={{ fontSize: 13, color: "#b0a594", lineHeight: 1.6 }}>{s.desc}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }} style={{ marginTop: 64 }}>
          <Link href="/" style={{ fontSize: 13, color: "#7d7668", textDecoration: "none", letterSpacing: "0.06em", transition: "color 0.3s ease" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#e6ddd2"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#7d7668"; }}>
            ← 返回索引
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
