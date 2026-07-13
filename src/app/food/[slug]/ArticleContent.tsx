"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Article } from "@/lib/articles";

function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children, ...props }) => {
          const id =
            typeof children === "string"
              ? children.toLowerCase().replace(/\s+/g, "-")
              : undefined;
          return (
            <h2
              id={id}
              style={{
                fontFamily: '"Noto Serif SC", serif',
                fontSize: 24,
                fontWeight: 700,
                color: "#e6ddd2",
                marginTop: 48,
                marginBottom: 16,
                paddingBottom: 12,
                borderBottom: "1px solid #2d2a26",
                lineHeight: 1.3,
              }}
              {...props}
            >
              {children}
            </h2>
          );
        },
        h3: ({ children, ...props }) => (
          <h3
            style={{
              fontFamily: '"Noto Serif SC", serif',
              fontSize: 19,
              fontWeight: 600,
              color: "#e6ddd2",
              marginTop: 32,
              marginBottom: 12,
              lineHeight: 1.4,
            }}
            {...props}
          >
            {children}
          </h3>
        ),
        p: ({ children, ...props }) => (
          <p
            style={{
              fontSize: 15,
              color: "#c5bfb2",
              lineHeight: 1.85,
              marginBottom: 16,
            }}
            {...props}
          >
            {children}
          </p>
        ),
        strong: ({ children, ...props }) => (
          <strong style={{ color: "#e6ddd2", fontWeight: 600 }} {...props}>
            {children}
          </strong>
        ),
        a: ({ children, href, ...props }) => (
          <a
            href={href}
            style={{
              color: "#c25b3a",
              textDecoration: "underline",
              textUnderlineOffset: 3,
              textDecorationThickness: 1,
              transition: "color 0.3s ease",
            }}
            {...props}
          >
            {children}
          </a>
        ),
        ul: ({ children, ...props }) => (
          <ul
            style={{
              paddingLeft: 24,
              marginBottom: 16,
              listStyle: "none",
            }}
            {...props}
          >
            {children}
          </ul>
        ),
        ol: ({ children, ...props }) => (
          <ol
            style={{
              paddingLeft: 24,
              marginBottom: 16,
            }}
            {...props}
          >
            {children}
          </ol>
        ),
        li: ({ children, ...props }) => (
          <li
            style={{
              fontSize: 15,
              color: "#c5bfb2",
              lineHeight: 1.85,
              marginBottom: 6,
              position: "relative",
            }}
            {...props}
          >
            {children}
          </li>
        ),
        blockquote: ({ children, ...props }) => (
          <blockquote
            style={{
              borderLeft: "3px solid #c25b3a",
              paddingLeft: 20,
              margin: "24px 0",
              fontStyle: "italic",
              color: "#b0a594",
            }}
            {...props}
          >
            {children}
          </blockquote>
        ),
        img: ({ src, alt, ...props }) => (
          <img
            src={src}
            alt={alt}
            style={{
              width: "100%",
              maxWidth: "100%",
              borderRadius: 12,
              margin: "24px 0",
              border: "1px solid #2d2a26",
            }}
            {...props}
          />
        ),
        hr: (props) => (
          <hr
            style={{
              border: "none",
              borderTop: "1px solid #2d2a26",
              margin: "40px 0",
            }}
            {...props}
          />
        ),
        table: ({ children, ...props }) => (
          <div style={{ overflowX: "auto", marginBottom: 24 }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 14,
              }}
              {...props}
            >
              {children}
            </table>
          </div>
        ),
        thead: ({ children, ...props }) => <thead {...props}>{children}</thead>,
        tbody: ({ children, ...props }) => <tbody {...props}>{children}</tbody>,
        th: ({ children, ...props }) => (
          <th
            style={{
              textAlign: "left",
              padding: "10px 16px",
              borderBottom: "2px solid #2d2a26",
              color: "#e6ddd2",
              fontWeight: 600,
              fontFamily: '"Noto Serif SC", serif',
            }}
            {...props}
          >
            {children}
          </th>
        ),
        td: ({ children, ...props }) => (
          <td
            style={{
              padding: "10px 16px",
              borderBottom: "1px solid #2d2a26",
              color: "#b0a594",
            }}
            {...props}
          >
            {children}
          </td>
        ),
        code: ({ children, ...props }) => (
          <code
            style={{
              background: "#272420",
              padding: "2px 8px",
              borderRadius: 4,
              fontSize: 13,
              color: "#c4a04a",
              fontFamily: "monospace",
            }}
            {...props}
          >
            {children}
          </code>
        ),
        pre: ({ children, ...props }) => (
          <pre
            style={{
              background: "#1e1c19",
              padding: "20px 24px",
              borderRadius: 12,
              overflow: "auto",
              border: "1px solid #2d2a26",
              marginBottom: 24,
            }}
            {...props}
          >
            {children}
          </pre>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

export function ArticleContent({
  article,
  category,
}: {
  article: Article;
  category: string;
}) {
  return (
    <div style={{ minHeight: "100vh", background: "#161412", color: "#e6ddd2" }}>
      {/* Banner */}
      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: "clamp(240px, 35vh, 400px)",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
        }}
      >
        <img
          src={article.cover}
          alt={article.title}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(22,20,18,0.3) 0%, rgba(22,20,18,0.7) 60%, #161412 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 760,
            margin: "0 auto",
            padding: "0 24px 40px",
            width: "100%",
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
            style={{
              fontSize: 11,
              letterSpacing: "0.2em",
              color: "rgba(230,221,210,0.5)",
              marginBottom: 12,
            }}
          >
            美食地图 · {article.date}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] as const }}
            style={{
              fontFamily: '"ZCOOL XiaoWei", "Noto Serif SC", serif',
              fontSize: "clamp(24px, 4vw, 42px)",
              fontWeight: 400,
              letterSpacing: "0.03em",
              lineHeight: 1.2,
              marginBottom: 12,
            }}
          >
            {article.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] as const }}
            style={{
              fontSize: 14,
              color: "#b0a594",
              lineHeight: 1.7,
            }}
          >
            {article.summary}
          </motion.p>
        </div>
      </div>

      {/* Article body */}
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
        style={{
          maxWidth: 760,
          margin: "0 auto",
          padding: "48px 24px 80px",
        }}
      >
        <MarkdownRenderer content={article.content} />

        {/* Back link */}
        <div style={{ marginTop: 64, paddingTop: 32, borderTop: "1px solid #2d2a26" }}>
          <Link
            href={`/${category}`}
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
            ← 返回美食地图
          </Link>
        </div>
      </motion.article>
    </div>
  );
}
