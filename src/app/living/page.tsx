"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const subSections = [
  { label: "租房攻略", desc: "各区怎么选、租金大概多少、避坑指南", href: "/living/rent" },
  { label: "交通出行", desc: "北京地铁初体验，和岳阳交通的对比", href: "/living/transport" },
  { label: "医保看病", desc: "外地人在北京怎么用医保", href: "/living/medical" },
  { label: "办证指南", desc: "居住证、身份证补办等各种证的办理流程", href: "/living/documents" },
  { label: "购物消费", desc: "去哪买东西、线上线下渠道对比", href: "/living/shopping" },
  { label: "通信网络", desc: "手机卡、宽带怎么选", href: "/living/telecom" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.12 * i, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function LivingPage() {
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
          03 · 生活指南
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
          北京有 16 个区，我住海淀
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
          style={{ fontSize: 16, color: "#b0a594", maxWidth: 560, lineHeight: 1.7 }}
        >
          在北京活下去的基本功。从租房到医保，每一个湖南来的人都得从头学起。
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
