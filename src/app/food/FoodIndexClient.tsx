"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useRef, type CSSProperties } from "react";
import type { ArticleMeta } from "@/lib/articles";

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.12 * i, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

function ArticleCard({ article, index }: { article: ArticleMeta; index: number }) {
  const router = useRouter();
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setGlow({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.div custom={index} initial="hidden" animate="visible" variants={cardVariants}>
      <div
        ref={cardRef}
        onClick={() => router.push(`/food/${article.slug}`)}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={
          {
            display: "flex",
            flexDirection: "column",
            height: 340,
            background: "#1e1c19",
            border: "1px solid #2d2a26",
            borderRadius: 16,
            textDecoration: "none",
            color: "inherit",
            overflow: "hidden",
            transition: "border-color 0.4s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1)",
            transform: hovered ? "translateY(-4px)" : "translateY(0)",
            borderColor: hovered ? "#4a4540" : "#2d2a26",
            "--mx": `${glow.x}%`,
            "--my": `${glow.y}%`,
            position: "relative",
            cursor: "pointer",
          } as CSSProperties
        }
      >
        {/* Radial glow overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: hovered ? 0.6 : 0,
            transition: "opacity 0.4s ease",
            background:
              "radial-gradient(circle 220px at var(--mx) var(--my), rgba(194,91,58,0.08), transparent 70%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* Cover image */}
        <div
          style={{
            height: "55%",
            width: "100%",
            overflow: "hidden",
            position: "relative",
            flexShrink: 0,
          }}
        >
          <img
            src={article.cover}
            alt={article.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
              transform: hovered ? "scale(1.05)" : "scale(1)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(22,20,18,0.5) 0%, transparent 40%)",
            }}
          />
        </div>

        {/* Text */}
        <div
          style={{
            flex: 1,
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <h3
            style={{
              fontFamily: '"Noto Serif SC", serif',
              fontSize: 18,
              fontWeight: 600,
              color: "#e6ddd2",
              marginBottom: 6,
              lineHeight: 1.3,
            }}
          >
            {article.title}
          </h3>
          <p
            style={{
              fontSize: 13,
              color: "#b0a594",
              lineHeight: 1.6,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {article.summary}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function FoodIndexClient({ articles }: { articles: ArticleMeta[] }) {
  return (
    <div style={{ minHeight: "100vh", background: "#161412", color: "#e6ddd2" }}>
      {/* Banner */}
      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: "clamp(320px, 45vh, 520px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Background image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(/bg/food_index_bg.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Gradient overlays */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(22,20,18,0.35) 0%, rgba(22,20,18,0.65) 60%, #161412 100%)",
          }}
        />
        {/* Gold accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "clamp(200px, 30vw, 360px)",
            height: 1,
            background: "linear-gradient(to right, transparent, rgba(196,160,74,0.5), transparent)",
          }}
        />

        {/* Text */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            padding: "0 24px",
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            style={{
              fontSize: 12,
              letterSpacing: "0.22em",
              color: "rgba(230,221,210,0.5)",
              marginBottom: 20,
            }}
          >
            01 · 美食地图
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
            style={{
              fontFamily: '"ZCOOL XiaoWei", "Noto Serif SC", serif',
              fontSize: "clamp(28px, 5vw, 52px)",
              fontWeight: 400,
              letterSpacing: "0.04em",
              lineHeight: 1.15,
              marginBottom: 18,
              color: "#e6ddd2",
            }}
          >
            如何在北京不被饿死
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
            style={{
              fontSize: 15,
              color: "#b0a594",
              maxWidth: 580,
              margin: "0 auto",
              lineHeight: 1.8,
            }}
          >
            在北京待过的湖南朋友都知道，北京这个地方真没什么好吃的。故此，写下了几篇珍藏的美食测评，希望大家不会饿死在北京。
          </motion.p>
        </div>
      </div>

      {/* Article cards */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 24px 120px" }}>
        {articles.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ textAlign: "center", color: "#7d7668", fontSize: 15 }}
          >
            还没写呢，饿着肚子等一等……
          </motion.p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 18,
            }}
          >
            {articles.map((article, i) => (
              <ArticleCard key={article.slug} article={article} index={i} />
            ))}
          </div>
        )}

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ marginTop: 64 }}
        >
          <Link
            href="/"
            style={{
              fontSize: 13,
              color: "#7d7668",
              textDecoration: "none",
              letterSpacing: "0.06em",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#e6ddd2";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#7d7668";
            }}
          >
            ← 返回索引
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
