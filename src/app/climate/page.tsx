"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const subSections = [
  { label: "沙尘暴", desc: "第一次经历沙尘暴，我以为世界末日了", href: "/climate/sandstorm" },
  { label: "杨絮", desc: "春天下的不是雨，是棉花", href: "/climate/catkins" },
  { label: "干燥", desc: "来北京第一周，我流了三次鼻血", href: "/climate/dryness" },
  { label: "暖气", desc: "湖南人第一次在冬天穿短袖", href: "/climate/heating" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function ClimatePage() {
  return (
    <div style={{ minHeight: "100vh", background: "#161412", color: "#e6ddd2" }}>
      <div style={{ padding: "120px 24px 64px", maxWidth: 1100, margin: "0 auto" }}>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          style={{
            fontSize: 12,
            letterSpacing: "0.22em",
            color: "rgba(230,221,210,0.45)",
            marginBottom: 16,
          }}
        >
          02 · 气候适应
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
          style={{
            fontFamily: '"ZCOOL XiaoWei", "Noto Serif SC", serif',
            fontSize: "clamp(32px, 6vw, 56px)",
            fontWeight: 400,
            letterSpacing: "0.03em",
            lineHeight: 1.15,
            marginBottom: 20,
          }}
        >
          北京没有岳阳的湿润
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
          style={{ fontSize: 16, color: "#b0a594", maxWidth: 560, lineHeight: 1.7 }}
        >
          气候是湖南人来北京最直接的震撼。从湿润的洞庭湖平原到干燥的华北，身体是最先感受到的。
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
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  height: 200,
                  padding: 28,
                  background: "#1e1c19",
                  border: "1px solid #2d2a26",
                  borderRadius: 16,
                  textDecoration: "none",
                  color: "inherit",
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{ marginTop: 64 }}
        >
          <Link
            href="/"
            style={{
              fontSize: 13, color: "#7d7668", textDecoration: "none",
              letterSpacing: "0.06em", transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#e6ddd2"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#7d7668"; }}
          >
            ← 返回索引
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
