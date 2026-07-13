"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import SplashScreen from "@/components/SplashScreen";
import GuideIndex from "@/components/GuideIndex";
import Footer from "@/components/Footer";

const navLinks = [
  { label: "索引", href: "/" },
  { label: "美食", href: "/food" },
  { label: "气候", href: "/climate" },
  { label: "生活", href: "/living" },
  { label: "景点", href: "/travel" },
  { label: "求学", href: "/study" },
  { label: "文化", href: "/culture" },
];

export default function Home() {
  const [entered, setEntered] = useState(() => {
    if (typeof window !== "undefined") return sessionStorage.getItem("entered") === "true";
    return false;
  });
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!entered) {
    return <SplashScreen onEnter={() => { sessionStorage.setItem("entered", "true"); setEntered(true); }} />;
  }

  return (
    <>
      {/* Responsive breakpoints */}
      <style>{`
        @keyframes fadeIn { to { opacity: 1; } }
        .nav-desktop { display: flex; }
        .nav-hamburger { display: none; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 60,
            background: "#161412",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 32,
          }}
        >
          {navLinks.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: '"Noto Serif SC", serif',
                fontSize: 24,
                color: "#e6ddd2",
                textDecoration: "none",
                letterSpacing: "0.06em",
                opacity: 0,
                animation: `fadeIn 0.4s ${i * 0.06}s forwards`,
              }}
            >
              {l.label}
            </Link>
          ))}
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              position: "absolute",
              top: 20,
              right: 24,
              background: "none",
              border: "none",
              color: "#e6ddd2",
              fontSize: 28,
              cursor: "pointer",
              padding: 8,
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* Fixed header bar */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 56,
          paddingLeft: 24,
          paddingRight: 24,
          background: scrolled
            ? "rgba(22, 20, 18, 0.82)"
            : "rgba(22, 20, 18, 0.55)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderBottom: scrolled
            ? "1px solid rgba(45, 42, 38, 0.6)"
            : "1px solid transparent",
          transition: "background 0.5s ease, border-bottom 0.5s ease",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: '"Noto Serif SC", serif',
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: "0.03em",
            color: "#e6ddd2",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          湖南人北京生存指南
        </Link>

        {/* Desktop nav */}
        <nav
          className="nav-desktop"
          style={{ alignItems: "center", gap: 24 }}
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                fontSize: 13,
                letterSpacing: "0.04em",
                color: "#a39788",
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#e6ddd2"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#a39788"; }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(true)}
          style={{
            flexDirection: "column",
            gap: 5,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 4,
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: 20,
                height: 1.5,
                background: "#e6ddd2",
                borderRadius: 1,
              }}
            />
          ))}
        </button>
      </header>

      <GuideIndex />

      <Footer />
    </>
  );
}
