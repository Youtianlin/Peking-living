"""Resize images and embed them as base64 data URIs in HTML — v2 with full animations."""
import os, base64, io
from PIL import Image

SRC = r"E:\AIGC\个人开发\湖南人北京生存指南\public\bg"
MAX_W = 1200
QUALITY = 65

# ── Step 1: encode all images ──
b64 = {}
for f in sorted(os.listdir(SRC)):
    path = os.path.join(SRC, f)
    if not os.path.isfile(path):
        continue
    img = Image.open(path)
    if img.mode in ("RGBA", "P"):
        img = img.convert("RGB")
    w, h = img.size
    if w > MAX_W:
        ratio = MAX_W / w
        img = img.resize((MAX_W, int(h * ratio)), Image.LANCZOS)
    buf = io.BytesIO()
    img.save(buf, format="JPEG", quality=QUALITY, optimize=True)
    b64[f] = f"data:image/jpeg;base64,{base64.b64encode(buf.getvalue()).decode()}"
    orig_kb = os.path.getsize(path) / 1024
    new_kb = buf.tell() / 1024
    print(f"  {f}: {orig_kb:.0f}KB → {new_kb:.0f}KB")

total_b64 = sum(len(v) for v in b64.values()) / 1024
print(f"  Total base64: {total_b64:.0f}KB")

im = b64  # shorthand

# ── Step 2: build HTML ──
SPLASH_IMGS = [
    "realsmarthome-beijing-2044138_1920.jpg",
    "jeremy888-city-5772040_1920.jpg",
    "jplenio-temple-of-heaven-3675835_1920.jpg",
    "jack_jiao-forbidden-city-4428906_1920.jpg",
    "gyosimon-peking-1798593_1920.jpg",
    "jeremy888-temple-6846973_1920.jpg",
    "peggy_marco-roof-1028250_1920.jpg",
]

# Pre-compute splash image URIs for JS array
splash_uris = ",\n    ".join(f'"{im[name]}"' for name in SPLASH_IMGS)

html = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>湖南人北京生存指南</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700&family=Noto+Sans+SC:wght@300;400;500&family=ZCOOL+XiaoWei&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{{box-sizing:border-box;margin:0;padding:0}}
html{{scroll-behavior:smooth}}
body{{
  font-family:"Noto Sans SC","PingFang SC","Microsoft YaHei",sans-serif;
  line-height:1.7;color:#e6ddd2;background:#161412;
  -webkit-font-smoothing:antialiased;overflow-x:hidden;
}}

/* ══════ SPLASH ══════ */
#splash{{
  position:fixed;inset:0;z-index:1000;background:#161412;
  display:flex;flex-direction:column;justify-content:space-between;align-items:center;
  padding:clamp(36px,9vh,80px) 24px clamp(44px,9vh,88px);
  transition:opacity .8s ease;
}}
#splash.hide{{opacity:0;pointer-events:none}}
.splash-bg-layer{{
  position:absolute;inset:0;z-index:0;
  background-size:cover;background-position:center;
  transition:opacity 1.5s ease;
}}
.splash-bg-layer.front{{z-index:1}}
.splash-bg-layer.back{{z-index:0}}
.splash-bg-layer.fading{{opacity:0}}
.splash-bg-layer::after{{
  content:"";position:absolute;inset:0;
  background:linear-gradient(to bottom,rgba(22,20,18,.55),rgba(22,20,18,.15) 35%,transparent 55%),
             linear-gradient(to top,rgba(22,20,18,.6),rgba(22,20,18,.2) 35%,transparent 55%);
}}
.splash-title{{
  position:relative;z-index:2;text-align:center;
  font-family:"ZCOOL XiaoWei","Noto Serif SC",serif;
  font-size:clamp(28px,5vw,52px);font-weight:400;letter-spacing:.06em;
  color:rgba(230,221,210,.92);
  text-shadow:0 1px 8px rgba(0,0,0,.35),0 0 32px rgba(0,0,0,.12);
  user-select:none;line-height:1.2;
  opacity:0;transform:translateY(-16px);
  transition:opacity .9s ease,transform .9s ease;
}}
.splash-title.visible{{opacity:1;transform:translateY(0)}}
.splash-btn-wrap{{
  position:relative;z-index:2;
  opacity:0;transform:translateY(16px);
  transition:opacity .8s ease,transform .8s ease;
}}
.splash-btn-wrap.visible{{opacity:1;transform:translateY(0)}}
.splash-btn{{
  display:flex;align-items:center;gap:14px;
  background:none;border:none;cursor:pointer;padding:10px 8px;
  font-family:inherit;outline:none;
}}
.splash-ornament{{
  display:block;width:5px;height:5px;border:1px solid rgba(230,221,210,.35);
  transform:rotate(45deg);transition:all .5s;
}}
.splash-line{{display:block;width:40px;height:1px;background:rgba(230,221,210,.2);transition:all .5s}}
.splash-text{{font-size:14px;letter-spacing:.28em;color:rgba(230,221,210,.65);transition:all .5s;white-space:nowrap}}
.splash-btn:hover .splash-ornament{{border-color:#c25b3a;background:rgba(194,91,58,.15);transform:rotate(45deg) scale(1.25)}}
.splash-btn:hover .splash-line{{width:100px;background:#c25b3a}}
.splash-btn:hover .splash-text{{color:#e6ddd2;letter-spacing:.36em}}

/* ══════ NAVBAR ══════ */
#navbar{{
  position:fixed;top:0;left:0;right:0;z-index:100;
  display:flex;align-items:center;justify-content:space-between;
  height:56px;padding:0 24px;
  background:rgba(22,20,18,.82);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);
  border-bottom:1px solid rgba(45,42,38,.6);transition:background .5s;
}}
#navbar.transparent{{background:rgba(22,20,18,.55);border-bottom-color:transparent}}
.nav-title{{font-family:"Noto Serif SC",serif;font-size:15px;font-weight:600;letter-spacing:.03em;color:#e6ddd2;text-decoration:none;white-space:nowrap}}
.nav-links{{display:flex;align-items:center;gap:24px}}
.nav-links a{{font-size:13px;letter-spacing:.04em;color:#a39788;text-decoration:none;transition:color .3s}}
.nav-links a:hover{{color:#e6ddd2}}
.nav-hamburger{{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:4px}}
.nav-hamburger span{{display:block;width:20px;height:1.5px;background:#e6ddd2;border-radius:1px}}
#mobile-menu{{
  display:none;position:fixed;inset:0;z-index:99;background:#161412;
  flex-direction:column;align-items:center;justify-content:center;gap:32px;
}}
#mobile-menu.open{{display:flex}}
#mobile-menu a{{
  font-family:"Noto Serif SC",serif;font-size:24px;color:#e6ddd2;text-decoration:none;
  letter-spacing:.06em;opacity:0;animation:menuIn .5s forwards;
}}
#mobile-menu a:nth-child(1){{animation-delay:0s}} #mobile-menu a:nth-child(2){{animation-delay:.06s}}
#mobile-menu a:nth-child(3){{animation-delay:.12s}} #mobile-menu a:nth-child(4){{animation-delay:.18s}}
#mobile-menu a:nth-child(5){{animation-delay:.24s}} #mobile-menu a:nth-child(6){{animation-delay:.3s}}
.menu-close{{position:absolute;top:20px;right:24px;background:none;border:none;color:#e6ddd2;font-size:28px;cursor:pointer;padding:8px;line-height:1}}
@keyframes menuIn{{to{{opacity:1}}}}

/* ══════ BANNER ══════ */
.banner{{
  position:relative;width:100%;height:45vh;min-height:320px;overflow:hidden;
  background-image:url({im['realsmarthome-beijing-2044138_1920.jpg']});
  background-size:cover;background-position:center;
}}
.banner::after{{
  content:"";position:absolute;inset:0;
  background:linear-gradient(to bottom,rgba(22,20,18,.3),rgba(22,20,18,.15) 40%,rgba(22,20,18,.65) 75%,#161412);
}}
.banner-content{{
  position:absolute;bottom:0;left:0;right:0;z-index:2;
  max-width:1100px;margin:0 auto;padding:0 24px 48px;
}}
.banner-breadcrumb{{
  font-size:12px;letter-spacing:.22em;color:rgba(230,221,210,.5);margin-bottom:12px;
  opacity:0;transform:translateY(16px);
  animation:bannerFadeIn .8s .1s forwards;
}}
.banner-heading{{
  font-family:"ZCOOL XiaoWei","Noto Serif SC",serif;
  font-size:clamp(36px,7vw,64px);font-weight:400;letter-spacing:.04em;
  color:#e6ddd2;line-height:1.15;
  opacity:0;transform:translateY(20px);
  animation:bannerFadeIn .8s .25s forwards;
}}
@keyframes bannerFadeIn{{to{{opacity:1;transform:translateY(0)}}}}

/* ══════ GRID ══════ */
.grid-wrapper{{max-width:1100px;margin:0 auto;padding:64px 24px 120px}}
.grid{{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:200px;gap:14px}}
.card{{
  position:relative;display:flex;flex-direction:column;justify-content:flex-end;
  padding:28px;border:1px solid #2d2a26;border-radius:16px;overflow:hidden;
  text-decoration:none;color:inherit;
  transition:border-color .4s,transform .4s cubic-bezier(.34,1.56,.64,1);
  opacity:0;transform:translateY(48px) scale(.96);
}}
.card.entered{{
  opacity:1;transform:translateY(0) scale(1);
  transition:opacity .75s cubic-bezier(.16,1,.3,1) var(--card-delay,0s),
             transform .75s cubic-bezier(.16,1,.3,1) var(--card-delay,0s),
             border-color .4s,transform .4s cubic-bezier(.34,1.56,.64,1);
}}
.card:hover{{border-color:#4a4540;transform:translateY(-2px)}}
.card.entered:hover{{transform:translateY(-2px)}}
.card::before{{
  content:"";position:absolute;inset:0;z-index:1;
  background:radial-gradient(500px circle at var(--mx,50%) var(--my,50%),rgba(230,221,210,.06),transparent 60%);
  opacity:0;transition:opacity .4s;pointer-events:none;
}}
.card:hover::before{{opacity:1}}
.card>*{{position:relative;z-index:2}}
.card-bg{{position:absolute;inset:0;z-index:0;background-size:cover;background-position:center}}
.card-bg::after{{
  content:"";position:absolute;inset:0;
  background:linear-gradient(to bottom,rgba(30,28,25,.15),rgba(30,28,25,.45) 50%,rgba(30,28,25,.88));
}}
.card-num{{font-size:11px;letter-spacing:.18em;color:#7d7668;margin-bottom:12px}}
.card-title{{font-family:"Noto Serif SC",serif;font-size:20px;font-weight:600;letter-spacing:.02em;color:#e6ddd2;margin-bottom:8px;line-height:1.25}}
.card-desc{{font-size:13px;font-weight:300;line-height:1.6;color:#b0a594;max-width:32ch}}
.span-hero{{grid-column:span 2;grid-row:span 2}}
.span-hero .card-title{{font-size:28px}}
.span-hero .card-desc{{font-size:14px}}
.span-wide{{grid-column:span 2;grid-row:span 1}}
.span-sm{{grid-column:span 1;grid-row:span 1}}

/* ══════ SECTIONS ══════ */
.section{{max-width:720px;margin:0 auto;padding:100px 24px;border-top:1px solid #2d2a26}}
.section-num{{display:block;font-size:11px;letter-spacing:.2em;color:#7d7668;margin-bottom:16px}}
.section-title{{font-family:"Noto Serif SC",serif;font-size:28px;color:#e6ddd2;margin-bottom:12px;font-weight:600}}
.section-desc{{color:#b0a594;font-style:italic;font-size:15px;margin-bottom:24px}}
.section-placeholder{{padding:32px;background:#1e1c19;border-radius:12px;border:1px solid #2d2a26;text-align:center;color:#7d7668;font-size:14px}}

/* ══════ IMAGE BREAKS ══════ */
.img-break{{
  position:relative;width:100%;height:45vh;min-height:300px;
  background-size:cover;background-position:center;
}}
.img-break::after{{
  content:"";position:absolute;inset:0;
  background:linear-gradient(to bottom,#161412,transparent 30%,transparent 70%,#161412);
}}
.img-break-label{{
  position:absolute;bottom:40px;right:40px;z-index:1;
  font-family:"ZCOOL XiaoWei","Noto Serif SC",serif;
  font-size:13px;letter-spacing:.2em;color:rgba(230,221,210,.35);
}}

/* ══════ FOOTER ══════ */
.site-footer{{padding:64px 24px;border-top:1px solid #2d2a26}}
.footer-inner{{max-width:720px;margin:0 auto;display:flex;flex-direction:column;align-items:center;text-align:center}}
.footer-title{{font-family:"Noto Serif SC",serif;font-size:18px;font-weight:600}}
.footer-sub{{color:#7d7668;font-size:13px;margin-top:4px}}
.footer-links{{display:flex;flex-wrap:wrap;justify-content:center;gap:20px;margin-top:24px}}
.footer-links a{{font-size:13px;color:#b0a594;text-decoration:none;transition:color .3s}}
.footer-links a:hover{{color:#e6ddd2}}
.footer-bottom{{color:#7d7668;font-size:12px;margin-top:32px}}

/* ══════ SCROLL FADE-IN ══════ */
.reveal{{opacity:0;transform:translateY(36px);transition:opacity .8s ease,transform .8s ease}}
.reveal.visible{{opacity:1;transform:translateY(0)}}

/* ══════ RESPONSIVE ══════ */
@media(max-width:768px){{
  .nav-links{{display:none}}
  .nav-hamburger{{display:flex}}
  .banner{{height:35vh;min-height:240px}}
  .grid{{grid-template-columns:1fr;grid-auto-rows:180px;gap:12px}}
  .span-hero,.span-wide,.span-sm{{grid-column:span 1;grid-row:span 1}}
  .span-hero .card-title{{font-size:20px}}
  .span-hero .card-desc{{font-size:13px}}
  .grid-wrapper{{padding:48px 20px 80px}}
  .section{{padding:72px 20px}}
  .section-title{{font-size:24px}}
}}
</style>
</head>
<body>

<!-- ══════ SPLASH ══════ -->
<div id="splash">
  <div class="splash-bg-layer front" id="splashBgFront"
       style="background-image:url({im[SPLASH_IMGS[0]]})"></div>
  <div class="splash-bg-layer back" id="splashBgBack"></div>
  <h1 class="splash-title" id="splashTitle">湖南人北京生存指南</h1>
  <div class="splash-btn-wrap" id="splashBtnWrap">
    <button class="splash-btn" id="splashBtn">
      <span class="splash-ornament"></span><span class="splash-line"></span>
      <span class="splash-text">进 入 指 南</span>
      <span class="splash-line"></span><span class="splash-ornament"></span>
    </button>
  </div>
</div>

<!-- ══════ NAVBAR ══════ -->
<nav id="navbar" class="transparent">
  <a href="#" class="nav-title">湖南人北京生存指南</a>
  <div class="nav-links">
    <a href="#climate">气候</a><a href="#living">生活</a><a href="#food">美食</a>
    <a href="#travel">景点</a><a href="#study">求学</a><a href="#culture">文化</a>
  </div>
  <button class="nav-hamburger" onclick="toggleMenu()"><span></span><span></span><span></span></button>
</nav>

<!-- ══════ MOBILE MENU ══════ -->
<div id="mobile-menu">
  <a href="#climate" onclick="toggleMenu()">气候</a><a href="#living" onclick="toggleMenu()">生活</a>
  <a href="#food" onclick="toggleMenu()">美食</a><a href="#travel" onclick="toggleMenu()">景点</a>
  <a href="#study" onclick="toggleMenu()">求学</a><a href="#culture" onclick="toggleMenu()">文化</a>
  <button class="menu-close" onclick="toggleMenu()">&times;</button>
</div>

<!-- ══════ BANNER ══════ -->
<div class="banner">
  <div class="banner-content">
    <p class="banner-breadcrumb">个人笔记</p>
    <h2 class="banner-heading">索引</h2>
  </div>
</div>

<!-- ══════ BENTO GRID ══════ -->
<div class="grid-wrapper">
  <div class="grid">
    <a href="#food" class="card span-hero" data-card-delay="0.00">
      <div class="card-bg" style="background-image:url({im['food_card.jpg']})"></div>
      <span class="card-num">01</span><h3 class="card-title">美食地图</h3>
      <p class="card-desc">北京湘菜馆测评，湖南舌头鉴定，去哪买剁辣椒</p>
    </a>
    <a href="#climate" class="card span-sm" data-card-delay="0.07">
      <div class="card-bg" style="background-image:url({im['climate_card.jpg']})"></div>
      <span class="card-num">02</span><h3 class="card-title">气候适应</h3>
      <p class="card-desc">沙尘暴、杨絮、干燥、暖气——湖南人对北京天气的全部震撼</p>
    </a>
    <a href="#living" class="card span-sm" data-card-delay="0.14">
      <div class="card-bg" style="background-image:url({im['living_card.jpg']})"></div>
      <span class="card-num">03</span><h3 class="card-title">生活指南</h3>
      <p class="card-desc">租房、交通、医保、办证，在北京活下去的基本功</p>
    </a>
    <a href="#culture" class="card span-wide" data-card-delay="0.21">
      <div class="card-bg" style="background-image:url({im['culture_card.jpg']})"></div>
      <span class="card-num">04</span><h3 class="card-title">文化差异</h3>
      <p class="card-desc">说话、吃饭、交朋友，湖南人和北京人全都不一样</p>
    </a>
    <a href="#travel" class="card span-sm" data-card-delay="0.28">
      <div class="card-bg" style="background-image:url({im['travel_card.jpg']})"></div>
      <span class="card-num">05</span><h3 class="card-title">景点攻略</h3>
      <p class="card-desc">不只有故宫长城，我私藏的北京好去处</p>
    </a>
    <a href="#study" class="card span-sm" data-card-delay="0.35">
      <div class="card-bg" style="background-image:url({im['study_card.jpg']})"></div>
      <span class="card-num">06</span><h3 class="card-title">求学就业</h3>
      <p class="card-desc">北京高校、实习校招、湖南老乡会</p>
    </a>
  </div>
</div>

<!-- ══════ SECTIONS ══════ -->
<section id="food" class="section reveal">
  <span class="section-num">01</span><h3 class="section-title">美食地图</h3>
  <p class="section-desc">北京湘菜馆测评与个人推荐。</p>
  <div class="section-placeholder">内容正在撰写中…</div>
</section>
<section id="climate" class="section reveal">
  <span class="section-num">02</span><h3 class="section-title">气候适应</h3>
  <p class="section-desc">从湖南到北京的天气冲击。</p>
  <div class="section-placeholder">内容正在撰写中…</div>
</section>
<div class="img-break" style="background-image:url({im['jeremy888-temple-6846973_1920.jpg']})"><span class="img-break-label">北京</span></div>
<section id="living" class="section reveal">
  <span class="section-num">03</span><h3 class="section-title">生活指南</h3>
  <p class="section-desc">租房、交通、医保、办证。</p>
  <div class="section-placeholder">内容正在撰写中…</div>
</section>
<section id="culture" class="section reveal">
  <span class="section-num">04</span><h3 class="section-title">文化差异</h3>
  <p class="section-desc">湖南人与北京人的社会学观察。</p>
  <div class="section-placeholder">内容正在撰写中…</div>
</section>
<div class="img-break" style="background-image:url({im['jack_jiao-forbidden-city-4428906_1920.jpg']})"><span class="img-break-label">紫禁城</span></div>
<section id="travel" class="section reveal">
  <span class="section-num">05</span><h3 class="section-title">景点攻略</h3>
  <p class="section-desc">我私藏的北京好去处。</p>
  <div class="section-placeholder">内容正在撰写中…</div>
</section>
<section id="study" class="section reveal">
  <span class="section-num">06</span><h3 class="section-title">求学就业</h3>
  <p class="section-desc">北京高校与就业经验。</p>
  <div class="section-placeholder">内容正在撰写中…</div>
</section>

<!-- ══════ FOOTER ══════ -->
<footer class="site-footer reveal">
  <div class="footer-inner">
    <p class="footer-title">北京生存指南</p><p class="footer-sub">一个岳阳人的私人记录</p>
    <div class="footer-links">
      <a href="#climate">气候</a><a href="#living">生活</a><a href="#food">美食</a>
      <a href="#travel">景点</a><a href="#study">求学</a><a href="#culture">文化</a>
    </div>
    <p class="footer-bottom">Built by a Hunan person in Beijing · 2026</p>
  </div>
</footer>

<script>
(function(){{

// ── SPLASH IMAGES ──
var splashImgs = [
  {splash_uris}
];
var splashIdx = 0;
var front = document.getElementById("splashBgFront");
var back = document.getElementById("splashBgBack");

function crossfadeSplash() {{
  var next = (splashIdx + 1) % splashImgs.length;

  // 先把 back 层设为下一张图，然后让 front 淡出
  back.style.backgroundImage = "url(" + splashImgs[next] + ")";
  back.style.transition = "none";
  back.style.opacity = "1";
  back.style.zIndex = "0";

  // Force reflow
  back.offsetHeight;

  front.style.transition = "opacity 1.5s ease";
  front.style.opacity = "0";

  // After transition, swap roles
  setTimeout(function() {{
    front.style.transition = "none";
    front.style.opacity = "1";
    front.style.backgroundImage = "url(" + splashImgs[next] + ")";
    splashIdx = next;
  }}, 1550);
}}

var splashTimer = setInterval(crossfadeSplash, 5000);

// ── SPLASH ENTRANCE ──
// Title and button fade in on load
setTimeout(function() {{
  document.getElementById("splashTitle").classList.add("visible");
}}, 100);

setTimeout(function() {{
  document.getElementById("splashBtnWrap").classList.add("visible");
}}, 400);

// ── ENTER SITE ──
window.enterSite = function() {{
  clearInterval(splashTimer);
  document.getElementById("splash").classList.add("hide");

  // After splash fades out, trigger card stagger
  setTimeout(function() {{
    document.querySelectorAll(".card").forEach(function(c) {{
      var delay = parseFloat(c.getAttribute("data-card-delay") || "0");
      c.style.setProperty("--card-delay", delay + "s");
      c.classList.add("entered");
    }});
  }}, 200);
}};

document.getElementById("splashBtn").addEventListener("click", function(e) {{
  e.stopPropagation();
  enterSite();
}});

// ── NAVBAR SCROLL ──
window.addEventListener("scroll", function() {{
  var n = document.getElementById("navbar");
  if (window.scrollY > 10) n.classList.remove("transparent");
  else n.classList.add("transparent");
}});

// ── MOBILE MENU ──
window.toggleMenu = function() {{
  document.getElementById("mobile-menu").classList.toggle("open");
}};

// ── CARD HOVER GLOW ──
document.querySelectorAll(".card").forEach(function(c) {{
  c.addEventListener("mousemove", function(e) {{
    var r = c.getBoundingClientRect();
    c.style.setProperty("--mx", (e.clientX - r.left) + "px");
    c.style.setProperty("--my", (e.clientY - r.top) + "px");
  }});
}});

// ── SCROLL REVEAL ──
var obs = new IntersectionObserver(function(entries) {{
  entries.forEach(function(e) {{
    if (e.isIntersecting) e.target.classList.add("visible");
  }});
}}, {{ threshold: .15 }});

document.querySelectorAll(".reveal").forEach(function(el) {{
  obs.observe(el);
}});

}})();
</script>
</body>
</html>"""

OUT = r"E:\AIGC\个人开发\湖南人北京生存指南\preview.html"
with open(OUT, "w", encoding="utf-8") as f:
    f.write(html)

size_kb = os.path.getsize(OUT) / 1024
print(f"\nDone! preview.html = {size_kb:.0f}KB")
