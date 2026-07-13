export default function Footer() {
  return (
    <footer
      style={{
        padding: "64px 24px",
        borderTop: "1px solid #2d2a26",
        background: "#161412",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontSize: 13,
          color: "#7d7668",
          lineHeight: 1.8,
          letterSpacing: "0.04em",
        }}
      >
        本站内容均为个人原创，未经书面授权禁止转载或使用。
      </p>
      <p
        style={{
          fontSize: 13,
          color: "#7d7668",
          lineHeight: 1.8,
          letterSpacing: "0.04em",
          marginTop: 4,
        }}
      >
        这份指南还在生长。如果你也有想分享的北京故事，欢迎来信：
        <a
          href="mailto:2063702421@qq.com"
          style={{
            color: "#b0a594",
            textDecoration: "none",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#e6ddd2"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "#b0a594"; }}
        >
          2063702421@qq.com
        </a>
      </p>
    </footer>
  );
}
