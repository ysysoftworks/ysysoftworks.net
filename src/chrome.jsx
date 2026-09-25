/* YSY Softworks — shared chrome components (React, inline JSX). */

/* ---------- Placeholder art generator ----------
   Real covers are hotlink-protected by Google Sites. We generate a styled
   SVG cover per game based on a hash of its slug, so imagery reads strong
   even when the real key art can't load. When a user drops real URLs in,
   the real image overlays on top automatically. */
function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}
const PALETTES = [
  ["#0c1a2e", "#0284c7", "#f59e0b"],  // sky blue→amber
  ["#0b1d3a", "#0ea5e9", "#bae6fd"],  // deep sky blue
  ["#3d0a1a", "#e11d48", "#fb923c"],  // crimson
  ["#0a2e2e", "#14b8a6", "#a7f3d0"],  // teal
  ["#2c1a00", "#d97706", "#fde68a"],  // amber
  ["#0a1a2e", "#38bdf8", "#f0f9ff"],  // light blue
  ["#0a1d1a", "#22c55e", "#facc15"],  // forest
  ["#0a1a2e", "#0369a1", "#7dd3fc"],  // deep blue
  ["#1a1a2e", "#0284c7", "#bae6fd"],  // blue
];
function placeholderSVG(title, slug, genre) {
  const h = hashStr(slug);
  const [c1, c2, c3] = PALETTES[h % PALETTES.length];
  const angle = (h % 180);
  const initials = title.replace(/[^A-Za-z ]/g,"").split(/\s+/)
    .map(w => w[0]).filter(Boolean).slice(0,3).join("").toUpperCase();
  const r1 = 20 + (h % 30);
  const r2 = 40 + ((h >> 3) % 40);
  const svg = `
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600' preserveAspectRatio='xMidYMid slice'>
  <defs>
    <linearGradient id='g' x1='0' y1='0' x2='1' y2='1' gradientTransform='rotate(${angle} 0.5 0.5)'>
      <stop offset='0%' stop-color='${c1}'/>
      <stop offset='60%' stop-color='${c2}' stop-opacity='0.85'/>
      <stop offset='100%' stop-color='#07070c'/>
    </linearGradient>
    <radialGradient id='glow' cx='${30 + (h%40)}%' cy='${20 + (h%50)}%' r='60%'>
      <stop offset='0%' stop-color='${c3}' stop-opacity='0.55'/>
      <stop offset='60%' stop-color='${c3}' stop-opacity='0.0'/>
    </radialGradient>
    <pattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'>
      <path d='M 40 0 L 0 0 0 40' fill='none' stroke='rgba(255,255,255,0.04)' stroke-width='1'/>
    </pattern>
  </defs>
  <rect width='800' height='600' fill='url(#g)'/>
  <rect width='800' height='600' fill='url(#grid)'/>
  <circle cx='${620 - (h%200)}' cy='${180 + (h%120)}' r='${r2*3}' fill='${c3}' opacity='0.08'/>
  <circle cx='${200 + (h%180)}' cy='${420 + (h%60)}' r='${r1*3}' fill='${c2}' opacity='0.18'/>
  <rect width='800' height='600' fill='url(#glow)'/>
  <g opacity='0.12' transform='translate(${80 + (h%120)},${220 + (h%60)})'>
    <text x='0' y='0' font-family='Orbitron, sans-serif' font-weight='900' font-size='380' fill='${c3}'>${initials}</text>
  </g>
  <g transform='translate(48,500)'>
    <text font-family='JetBrains Mono, monospace' font-size='14' fill='rgba(255,255,255,0.6)' letter-spacing='2'>${(genre||"").toUpperCase()}</text>
    <text y='36' font-family='Orbitron, sans-serif' font-weight='800' font-size='32' fill='#fff' letter-spacing='1'>${title.replace(/—/g,"-").slice(0,28)}</text>
  </g>
  <rect x='0' y='580' width='800' height='20' fill='#07070c'/>
  <rect x='0' y='0' width='6' height='600' fill='${c3}' opacity='0.7'/>
</svg>`.trim();
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
}
function coverBg(g) { return placeholderSVG(g.title, g.slug, g.genre); }
window.coverBg = coverBg;


const YSY_NAV = [
  { label: "Home", href: "index.html", key: "home" },
  { label: "All Games", href: "games.html", key: "games" },
  { label: "Publishing", href: "publishing.html", key: "publishing" },
  { label: "Press", href: "press.html", key: "press" },
  { label: "Blog", href: "blog.html", key: "blog" },
  { label: "About", href: "about.html", key: "about" },
];

function YsyHeader({ active }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  return (
    <header className="chrome">
      <div className="chrome__inner">
        <a href="index.html" className="logo" aria-label="YSY Softworks home">
          <span className="logo__mark">Y</span>
          <span>YSY&nbsp;·&nbsp;SOFTWORKS</span>
        </a>
        <nav className="nav">
          {YSY_NAV.map(n => (
            <a key={n.key} href={n.href} {...(active === n.key ? { "data-active": "true" } : {})}>
              {n.label}
            </a>
          ))}
        </nav>
        <a className="chrome__cta" href="https://store.steampowered.com/publisher/ysysoftworks" target="_blank" rel="noopener">
          Steam ↗
        </a>
        <button
          className="nav-burger"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(o => !o)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
      {menuOpen && (
        <div className="mobile-nav">
          {YSY_NAV.map(n => (
            <a key={n.key} href={n.href}
              className={active === n.key ? "mobile-nav__link active" : "mobile-nav__link"}
              onClick={() => setMenuOpen(false)}>
              {n.label}
            </a>
          ))}
          <a className="mobile-nav__link" href="https://store.steampowered.com/publisher/ysysoftworks" target="_blank" rel="noopener">Steam ↗</a>
        </div>
      )}
    </header>
  );
}

function YsyFooter() {
  const s = window.YSY_STUDIO;
  return (
    <footer className="foot">
      <div className="foot__inner">
        <div>
          <div className="logo" style={{ marginBottom: 16 }}>
            <span className="logo__mark">Y</span>
            <span>YSY&nbsp;·&nbsp;SOFTWORKS</span>
          </div>
          <p style={{ color: "var(--ink-dim)", fontSize: 13, maxWidth: 360, margin: 0 }}>
            Global PC game developer &amp; publisher focused on Japanese ACG culture —
            visually stunning anime-style games across RPG, VN, strategy and action.
          </p>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            <li><a href="games.html">All games</a></li>
            <li><a href="games.html">Upcoming</a></li>
            <li><a href="press.html">Press kit</a></li>
            <li><a href="blog.html">Blog</a></li>
          </ul>
        </div>
        <div>
          <h4>Studio</h4>
          <ul>
            <li><a href="about.html">About</a></li>
            <li><a href="publishing.html">Publishing</a></li>
            <li><a href="press.html">Press</a></li>
            <li><a href="mailto:ysysoftworks@gmail.com">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4>Follow</h4>
          <ul>
            <li><a href={s.steam} target="_blank" rel="noopener">Steam ↗</a></li>
            <li><a href={s.twitter} target="_blank" rel="noopener">Twitter / X ↗</a></li>
            <li><a href={s.facebook} target="_blank" rel="noopener">Facebook ↗</a></li>
          </ul>
        </div>
      </div>
      <div className="foot__base">
        <span>© 2023–2026 YSY Softworks. All rights reserved.</span>
        <span>v 2.0 · Redesign concept</span>
      </div>
    </footer>
  );
}

/* ---------- Tile ---------- */
function GameTile({ g, href }) {
  return (
    <a className="tile" href={href || `game.html?slug=${g.slug}`}>
      <div className="tile__img" style={{ backgroundImage: coverBg(g) }} />
      <div className="tile__scrim" />
      <div className="tile__glow" />
      <span className="tile__status" data-s={g.status}>{g.status}</span>
      <div className="tile__body">
        <span className="tile__genre">{g.genre}</span>
        <h3 className="tile__title">{g.title}</h3>
      </div>
    </a>
  );
}

/* ---------- Tweaks (density) ---------- */
function Tweaks() {
  const [on, setOn] = React.useState(false);
  const [density, setDensity] = React.useState(() =>
    localStorage.getItem("ysy-density") || "default"
  );

  React.useEffect(() => {
    const root = document.documentElement;
    if (density === "default") root.removeAttribute("data-density");
    else root.setAttribute("data-density", density);
    localStorage.setItem("ysy-density", density);
  }, [density]);

  React.useEffect(() => {
    const handler = (e) => {
      if (!e.data) return;
      if (e.data.type === "__activate_edit_mode") setOn(true);
      if (e.data.type === "__deactivate_edit_mode") setOn(false);
    };
    window.addEventListener("message", handler);
    try { window.parent.postMessage({ type: "__edit_mode_available" }, "*"); } catch (_) {}
    return () => window.removeEventListener("message", handler);
  }, []);

  return (
    <div id="tweaks-panel" className={on ? "on" : ""}>
      <h5>Tweaks <span>/ density</span></h5>
      <div className="tw-row">
        {["compact","default","comfortable"].map(d => (
          <button
            key={d}
            className="tw-btn"
            data-on={density === d ? "1" : "0"}
            onClick={() => setDensity(d)}
          >{d}</button>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { YsyHeader, YsyFooter, GameTile, Tweaks });
