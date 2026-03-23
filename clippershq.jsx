import { useState, useEffect, useRef } from "react";

const DISCORD = "https://discord.gg/3EAcQVfq";
const L = {
  clip: "data:image/webp;base64,UklGRpIAAABXRUJQVlA4IIYAAACQBQCdASpAAEAAPtFkqU8oJaQiKhzIAQAaCWkAAHDilA+1al0mlQLB+6cUtniCKDS78qLMgAD+9BWp61XDBOcWUGl2rxbucoCiXXkpJkUOKRIQl84c74EHzZlXe9CPwO+Wh7MgnaoEX9fyGNknP0ZHgFs8LhdoderFlcMY3tAqWJT/0AAAAA==",
  grateful: "data:image/webp;base64,UklGRuAEAABXRUJQVlA4INQEAABwFACdASpAAEAAPrVCmUunI6IhufxKqOAWiWwAuzNVhvSJ7B24A4sNDb9c9Nps289WYJuYxKc2oExwmyltZl0aUdn30CknIP5JkLLe7/tFBNSp88eystkH5EGkqsJdS18nYMa6RM4aOe+LeMSUpUTs89sjCYnpHkhjvxcoB0YFwisA/HfUNAm9JSt/xk9rN3tA19SZbt2C4fAREi+X+8t8Xc3MDYg53Sgwwk/AAP7l4YocKZjRX6/IqgHe6vjoKFhM55Fa39pJZx/ml46lt9p1R1L6dYWIzHmSPYEukIWKzWrbbaOHONKhoK98+me6OmXZ5tPEJhDXISyYNpyakl4KDGcK8rhZpUFUk9PvHJDWUoYwGMYDzkzNdC5j8Q03EdJp1BMs02pZGjlvol5hE/dT1rd9EvvdatUyT+xefwcd6fwf1uzaVmWeHXJI0CkHaGu1kWbm4+78Ut6vdXS36cHQoiMZWvhKp4DBxuvAz2tADfgnKMjuQj4vZIySHyQFITkw2Huc7iuOpzmEUvDZ7wgRcOzusIYV92JEKO9TfSxUbgzAmEg0rx+fJ0bMFEYpTe2WLUlOJJi2kLSjLB2QYdKBQGTAxnGXXYXJklDOTX/dUkzCek/M8ItKoOOhS4CF+ze75I5HzHZPLKUQpsqSiSUz5lAd04kiu1FFLaKRE8uIrdWAoCcqZbdEvOIinAFIQcwTpDTYoB2rE7OhG4QBNEirvfghDHi45Vz3XmqPWpQfy6E7iDEBZ62TG9AMkdk5J7L9deKH+7ihJdXMppxn6DI5u79HKhCofPPSsirGIk6lUmAZcIS8sBVQ53l582T++tblDPWsg0RzCQLGeHWWHdK+L6zYzCjEzKD3DAmIudtDPB3PtloBzb1BcMdQU2ZaOzf9uf+w5NQsBECJex6YzNPLYHqSZvlIsVOAKKg6/v7L7BOiL89aRYZxWx4Z3Zz8jkUYnAyE5WgejUeJ/vAdWR0AiD+3KRbbbQGbZmefLJSq3h+eNFx4yjPx1DE2toQgH3rIc8LcTf6IJQMVBAv3gFD4QYzyvF0/dYHw7oqt5xgnDR8JvZzk11oDayov2ReydqS1T2pNGrmC0hhuisFJQjGlClcGk7kOJoFO4lxSVhxUjdKF2dPJ2srv8IYAAueZPC9W21eAvoIyvwyK3uQp4ZY3DilZH2ylNg+dRUPHevM3WQgMzYvgwQV+/Tb5zfPe42CM0Tq6DQMxviWs3JzFPOLzKI7xx6BVK4gZ1fLsS+jGAXlqetGxtGSm+8MBKdf9rVHFLrgO+gXBpPH7OH6PPdT8RqzO+q3kMzVtCV/Hw/jgSYJFR+DoNBg2qV0UB44w0DrKGdtyMwr5kEo0kE6TpGbOZCdqXbzhrHwd4fNm4PdAFGfOO608QKgyZAuPorzgq0alw+FchR+tebEYtHgUvwDcgniMkphKwm9CC96Tigrg4xEq7H2NQAtgTyp7mcYNMJDkskOd0aV+Amd7awOC+7Hn4mJ/S7zRHyU58sy/mTbPnsPzn/kDfuP8Eb6mG7+WCOuPQqqPLNQs5pdUYlp43bzN8XoeNsOyzniwBl8mWiPz+Z/i4bwPuELrSedZx93//jixgVbDRd7kMfeS/jO+jDf1YwsEwqQIy+hYcNcZBrSxfRmZAAA=",
  hapday: "data:image/webp;base64,UklGRugBAABXRUJQVlA4INwBAAAQDACdASpAAEAAPtFUpUuoJKOhsfcaSQAaCWgAzmftKXRgPEA6QHmA/V3JAN5J8m7MALOOMCtZlgaQJnhAGoMtvEfzNzjr29xmFV19e6wFw2XoM9zv7u5oVgFLSFqn3eZfj3iSugMTfgAA/ulpH/9CT/+Js/+Js7aXzqwNtg7tuFqfPc3sVUVxOfPM7i1w2d9qn/B/mnmzAauM/M/cZJXeDj9F/ryJYMtgv+O0XO5B3m6pQPB6FOQ1jAWCHE5j1ljp1ALDYuZMQKl46vK4R7i2yB4ChtSvC25KGkoyEQcPqrIot5Cd6AgPImMF+KLqPU+xNHYYNGoBOEMm8jjgwUQIqsjoIOxBOmJ/95yIKAt0zxBEcD28yEr2k/ZeJO67yOHSH9j3rqASnGbEJzqfEBUj7mrynWZh8kKRkW23yX+9HQMtVKb+YATr5fShfkbDzrLgwOsdGIytWknk4Z3EtyTk8udZjCId2Nn4iaI7dESZ6cIKeGjjPPY5zjUNSdEMIclFQ1XfKJovnGaAS8B3cnEX4ia6ivppcVU8eSaU9zUhHkk7RctBhz7VDWOQ5/rqYIYqIz0IemukZ+udVoeL5amLespTu/Mq48brb1ATfpS7IUCsslv59g4sFlrAAA==",
  gainz: "data:image/webp;base64,UklGRroBAABXRUJQVlA4IK4BAABQCQCdASpAAEAAPtFcqEyoJSQiMBYJAQAaCWcA0u61kw4RAQQH5d5+vN89M+wJ+sJzrhdsndJjBm+ubw3ZfbJoPuGUhHFVpX+0Dg+aieLjM1VH8AD+9L5+bAA2QXj/CgZJit1QstoN0HwwANgu7JpFulBe31aT/s/xNJC81WbaSh1euqZ5GhDvHRlb8qZ1Z/TrJLWNOGFf1GYMyygrvrjWvjyWnB9dW6iy7/3AbXdzZgb0o3fo3sxxGGsD8g63KGUd9rkrfKJKmPAPqYi2XRabsKPoTfQBakxtgJebP55/ofov0g2EdqrV2iwzGtAdnLxeGVn4+dsc2JbfTHq3bnhWPoAyIxUdWK3nWWreVcH42fGukKH+IviOIqgJgR2C/hwybEdE9gRWBMxmeQF2s1McvSkbtEkpcI5IdoPoXK9s7CkdXhSEWja/f1eI/8FaNRUdDqmf4LUlVEo5fUK2lj8Fs/FKLH6pe4/t9jsGoEZXhJVP7HSQULek/bz8TyLJe2SyRmD1IroaTO9MGQg/xrORuMuxUzg3Dt4bnn7l31IS1gLWnnECwkXL1i7ZwAAA",
};

function useInView(t = 0.15) {
  const r = useRef();
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: t });
    if (r.current) o.observe(r.current);
    return () => o.disconnect();
  }, []);
  return [r, v];
}

const G = {
  txt: "0 0 20px rgba(255,255,255,0.2), 0 0 50px rgba(255,255,255,0.06)",
  txtH: "0 0 25px rgba(255,255,255,0.35), 0 0 60px rgba(255,255,255,0.1)",
  sub: "0 0 10px rgba(255,255,255,0.06)",
  btnW: "0 0 15px rgba(255,255,255,0.15), 0 0 35px rgba(255,255,255,0.06)",
  btnWH: "0 0 30px rgba(255,255,255,0.4), 0 0 60px rgba(255,255,255,0.12), 0 0 90px rgba(255,255,255,0.04)",
  btnG: "0 0 8px rgba(255,255,255,0.06)",
  btnGH: "0 0 20px rgba(255,255,255,0.2), 0 0 45px rgba(255,255,255,0.06)",
  dot: "0 0 8px rgba(255,255,255,0.3)",
  nav: "0 0 12px rgba(255,255,255,0.12), 0 0 25px rgba(255,255,255,0.04)",
  navH: "0 0 20px rgba(255,255,255,0.3), 0 0 40px rgba(255,255,255,0.08)",
  logo: "0 0 14px rgba(255,255,255,0.1)",
};

function TriBtn({ children, href, filled, delay = 0 }) {
  const [h, setH] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ textDecoration: "none", animation: "fi 0.7s " + delay + "s both" }}>
      <div style={{
        padding: "16px 52px 16px 24px",
        clipPath: "polygon(0% 0%, 80% 0%, 100% 50%, 80% 100%, 0% 100%)",
        background: filled ? "#fff" : "rgba(255,255,255,0.07)",
        color: filled ? "#000" : "#fff",
        fontSize: "14px", fontWeight: 700, fontFamily: "inherit",
        cursor: "pointer", whiteSpace: "nowrap",
        transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
        boxShadow: h ? (filled ? G.btnWH : G.btnGH) : (filled ? G.btnW : G.btnG),
        transform: h ? "translateX(3px) scale(1.02)" : "none",
        letterSpacing: "-0.2px",
        textShadow: !filled && h ? "0 0 10px rgba(255,255,255,0.2)" : "none",
      }}>{children}</div>
    </a>
  );
}

function ResultRow({ r, vis }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "16px 18px", borderRadius: "10px",
      background: h ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.01)",
      border: "1px solid " + (h ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.025)"),
      transition: "all 0.3s", flexWrap: "wrap", gap: "10px",
      opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(14px)",
      boxShadow: h ? "0 0 20px rgba(255,255,255,0.02)" : "none",
    }}>
      <div style={{ flex: 1, minWidth: "120px" }}>
        <div style={{ fontSize: "13px", fontWeight: 700, textShadow: h ? G.txtH : G.sub }}>{r.n}</div>
        <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.18)", marginTop: "1px", textShadow: G.sub }}>{r.p}</div>
      </div>
      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.15)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>Views</div>
          <div style={{ fontSize: "16px", fontWeight: 800, letterSpacing: "-0.5px", textShadow: h ? G.txtH : G.sub }}>{r.v}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.15)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>Earned</div>
          <div style={{ fontSize: "16px", fontWeight: 800, letterSpacing: "-0.5px", textShadow: h ? G.txtH : G.sub }}>{r.e}</div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [sc, setSc] = useState(false);
  const [playing, setPlaying] = useState(false);
  useEffect(() => { const h = () => setSc(window.scrollY > 40); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);

  const [sR, sV] = useInView();
  const [pR, pV] = useInView(0.1);
  const [rR, rV] = useInView(0.1);
  const [cR, cV] = useInView();

  const campaigns = [
    { n: "GainzAlgo Growth", v: "48M+", e: "$62K", p: "TikTok \u00b7 YT" },
    { n: "Grateful Music Push", v: "22M+", e: "$31K", p: "TikTok \u00b7 IG" },
    { n: "Hapday AI Launch", v: "31M+", e: "$44K", p: "All Platforms" },
    { n: "Streamer Highlights", v: "115M+", e: "$89K", p: "YT \u00b7 TikTok" },
  ];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <style>{[
        "*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}",
        "body{background:#000;overflow-x:hidden;-webkit-font-smoothing:antialiased}",
        "html{scroll-behavior:smooth}",
        "::selection{background:rgba(255,255,255,0.1);color:#fff}",
        "::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.05);border-radius:2px}",
        "@keyframes fi{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}",
        "@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}",
        "@keyframes pulse{0%,100%{opacity:.35}50%{opacity:1}}",
        "@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}",
        "@keyframes breathe{0%,100%{box-shadow:0 0 12px rgba(255,255,255,0.08)}50%{box-shadow:0 0 22px rgba(255,255,255,0.18)}}",
        "@keyframes lineG{0%,100%{opacity:.25}50%{opacity:.65}}",
        "@keyframes glowPulse{0%,100%{text-shadow:0 0 20px rgba(255,255,255,0.15)}50%{text-shadow:0 0 30px rgba(255,255,255,0.3),0 0 60px rgba(255,255,255,0.1)}}",
      ].join("\n")}</style>

      {/* particles */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} style={{ position: "absolute", left: (Math.sin(i * 7) * 50 + 50) + "%", top: (Math.cos(i * 5) * 50 + 50) + "%", width: (i % 3 * 0.4 + 0.5) + "px", height: (i % 3 * 0.4 + 0.5) + "px", borderRadius: "50%", background: "rgba(255,255,255,0.1)", boxShadow: "0 0 4px rgba(255,255,255,0.05)", animation: "float " + (14 + i) + "s " + (i * 0.6) + "s infinite ease-in-out" }} />
        ))}
      </div>

      <div style={{ position: "relative", zIndex: 1, fontFamily: "'Inter',system-ui,sans-serif", color: "#fff" }}>

        {/* NAV */}
        <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 32px", height: "56px", display: "flex", alignItems: "center", justifyContent: "space-between", background: sc ? "rgba(0,0,0,0.82)" : "transparent", backdropFilter: sc ? "blur(16px)" : "none", borderBottom: sc ? "1px solid rgba(255,255,255,0.04)" : "none", transition: "all 0.4s" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", animation: "fi 0.5s 0.1s both" }}>
            <img src={L.clip} alt="" style={{ width: "28px", height: "28px", borderRadius: "7px", animation: "breathe 3s infinite", boxShadow: G.logo }} />
            <span style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "-0.3px", textShadow: "0 0 12px rgba(255,255,255,0.15)" }}>ClippersHQ</span>
          </div>
          <a href={DISCORD} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", animation: "fi 0.5s 0.15s both" }}>
            <div style={{ clipPath: "polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%)", padding: "8px 24px 8px 12px", background: "#fff", color: "#000", fontSize: "11px", fontWeight: 700, fontFamily: "inherit", boxShadow: G.nav, transition: "box-shadow 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = G.navH}
              onMouseLeave={e => e.currentTarget.style.boxShadow = G.nav}>Join Discord</div>
          </a>
        </nav>

        {/* HERO */}
        <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "80px 20px 40px", position: "relative" }}>
          <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: "500px", height: "500px", background: "radial-gradient(circle,rgba(255,255,255,0.025),transparent 60%)", borderRadius: "50%", filter: "blur(40px)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: "680px" }}>
            {/* Social proof with logos */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 16px 5px 5px", borderRadius: "100px", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", marginBottom: "24px", animation: "fi 0.6s 0.15s both", boxShadow: "0 0 15px rgba(255,255,255,0.02)" }}>
              <div style={{ display: "flex" }}>
                {[L.gainz, L.grateful, L.hapday].map((src, i) => (
                  <img key={i} src={src} alt="" style={{ width: "26px", height: "26px", borderRadius: "50%", border: "2px solid #000", marginLeft: i > 0 ? "-6px" : "0", position: "relative", zIndex: 3 - i, boxShadow: "0 0 6px rgba(255,255,255,0.08)" }} />
                ))}
              </div>
              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", fontWeight: 600, textShadow: "0 0 8px rgba(255,255,255,0.06)" }}>2B+ views generated</span>
            </div>

            <h1 style={{ fontSize: "clamp(36px,7vw,68px)", fontWeight: 800, lineHeight: 1, letterSpacing: "-2.5px", margin: "0 0 16px", textShadow: "0 0 30px rgba(255,255,255,0.25), 0 0 60px rgba(255,255,255,0.08), 0 0 100px rgba(255,255,255,0.03)", animation: "fi 0.8s 0.25s both" }}>
              The #1 Clipping<br />Agency
            </h1>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.3)", lineHeight: 1.6, maxWidth: "400px", margin: "0 auto 32px", animation: "fi 0.7s 0.35s both", textShadow: "0 0 8px rgba(255,255,255,0.04)" }}>
              5,000+ clippers distribute your content everywhere. Or clip and earn per view.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <TriBtn href={DISCORD} filled delay={0.45}>{"I'm a Creator"}</TriBtn>
              <TriBtn href={DISCORD} delay={0.55}>{"I'm a Clipper"}</TriBtn>
            </div>
          </div>

          {/* VSL */}
          <div style={{ marginTop: "48px", width: "100%", maxWidth: "580px", animation: "fi 0.9s 0.7s both" }}>
            <div style={{ borderRadius: "16px", overflow: "hidden", background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.06)", aspectRatio: "16/9", position: "relative", boxShadow: "0 0 30px rgba(255,255,255,0.02), 0 12px 40px rgba(0,0,0,0.4)" }}>
              {playing ? (
                <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=1&modestbranding=1&rel=0" style={{ width: "100%", height: "100%", border: "none" }} allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowFullScreen />
              ) : (
                <div onClick={() => setPlaying(true)} style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: "linear-gradient(135deg, #0a0a0a, #111)", position: "relative" }}>
                  <img src="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.35 }} />
                  <div style={{ width: "68px", height: "68px", borderRadius: "50%", background: "rgba(255,255,255,0.1)", border: "2px solid rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 2, boxShadow: "0 0 25px rgba(255,255,255,0.12), 0 0 50px rgba(255,255,255,0.04)", transition: "all 0.3s" }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 35px rgba(255,255,255,0.25), 0 0 70px rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.15)"; e.currentTarget.style.transform = "scale(1.08)"; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 0 25px rgba(255,255,255,0.12), 0 0 50px rgba(255,255,255,0.04)"; e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.transform = "scale(1)"; }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff" style={{ filter: "drop-shadow(0 0 6px rgba(255,255,255,0.3))" }}><polygon points="8 5 20 12 8 19" /></svg>
                  </div>
                  <div style={{ position: "absolute", bottom: "16px", left: "20px", zIndex: 2, display: "flex", alignItems: "center", gap: "8px" }}>
                    <img src={L.clip} alt="" style={{ width: "20px", height: "20px", borderRadius: "5px", boxShadow: "0 0 6px rgba(255,255,255,0.08)" }} />
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.45)", textShadow: "0 0 10px rgba(0,0,0,0.8), 0 0 6px rgba(255,255,255,0.06)" }}>ClippersHQ - How It Works</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* BRAND LOGOS */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", padding: "24px 20px", display: "flex", alignItems: "center", justifyContent: "center", gap: "36px", flexWrap: "wrap" }}>
          {[{ src: L.gainz, name: "GainzAlgo" }, { src: L.grateful, name: "Grateful" }, { src: L.hapday, name: "Hapday AI" }].map((b, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", opacity: 0.35, transition: "opacity 0.3s", cursor: "default" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.7"}
              onMouseLeave={e => e.currentTarget.style.opacity = "0.35"}>
              <img src={b.src} alt="" style={{ width: "28px", height: "28px", borderRadius: "8px", boxShadow: "0 0 8px rgba(255,255,255,0.06)" }} />
              <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "-0.2px", textShadow: "0 0 6px rgba(255,255,255,0.06)" }}>{b.name}</span>
            </div>
          ))}
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.1)", fontStyle: "italic", textShadow: "0 0 4px rgba(255,255,255,0.03)" }}>+ 50 more creators</span>
        </div>

        {/* STATS */}
        <section ref={sR} style={{ padding: "56px 20px", maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1px" }}>
            {[{ v: "$500K+", l: "Paid" }, { v: "5K+", l: "Clippers" }, { v: "2B+", l: "Views" }, { v: "50+", l: "Campaigns" }].map((s, i) => (
              <div key={i} style={{ padding: "24px 12px", textAlign: "center", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: i === 0 ? "12px 0 0 12px" : i === 3 ? "0 12px 12px 0" : "0", opacity: sV ? 1 : 0, transform: sV ? "none" : "translateY(16px)", transition: "all 0.5s " + (i * 0.08) + "s" }}>
                <div style={{ fontSize: "clamp(24px,3.5vw,34px)", fontWeight: 800, letterSpacing: "-1px", textShadow: "0 0 20px rgba(255,255,255,0.2), 0 0 45px rgba(255,255,255,0.06)" }}>{s.v}</div>
                <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.22)", marginTop: "4px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1.5px", textShadow: "0 0 6px rgba(255,255,255,0.04)" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* PROCESS */}
        <section ref={pR} style={{ padding: "40px 20px 72px", maxWidth: "480px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <span style={{ fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.2)", textTransform: "uppercase", letterSpacing: "3px", textShadow: "0 0 8px rgba(255,255,255,0.04)" }}>Process</span>
            <h2 style={{ fontSize: "clamp(22px,3.5vw,30px)", fontWeight: 800, letterSpacing: "-1px", marginTop: "8px", textShadow: G.txt }}>How it works</h2>
          </div>
          <div style={{ position: "relative", paddingLeft: "32px" }}>
            <div style={{ position: "absolute", left: "9px", top: 0, bottom: 0, width: "1px", background: "linear-gradient(rgba(255,255,255,0.04),rgba(255,255,255,0.1),rgba(255,255,255,0.04))", boxShadow: "0 0 4px rgba(255,255,255,0.03)", animation: pV ? "lineG 3s infinite" : "none" }} />
            {[{ t: "Join Discord", d: "Click Creator or Clipper. We onboard you in minutes." }, { t: "Clippers post", d: "Your content gets distributed across TikTok, Reels & Shorts." }, { t: "Track & earn", d: "Real-time tracking. Every view counted, every dollar transparent." }].map((s, i) => (
              <div key={i} style={{ position: "relative", marginBottom: "28px", paddingLeft: "20px", opacity: pV ? 1 : 0, transform: pV ? "none" : "translateX(-12px)", transition: "all 0.5s " + (i * 0.12 + 0.1) + "s" }}>
                <div style={{ position: "absolute", left: "-12px", top: "3px", width: "8px", height: "8px", borderRadius: "50%", background: "#fff", boxShadow: "0 0 8px rgba(255,255,255,0.3), 0 0 16px rgba(255,255,255,0.1)" }} />
                <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.18)", fontWeight: 700, marginBottom: "3px", textShadow: "0 0 4px rgba(255,255,255,0.04)" }}>{"Step " + (i + 1)}</div>
                <div style={{ fontSize: "14px", fontWeight: 700, marginBottom: "3px", textShadow: "0 0 10px rgba(255,255,255,0.1)" }}>{s.t}</div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.28)", lineHeight: 1.55, textShadow: "0 0 6px rgba(255,255,255,0.03)" }}>{s.d}</div>
              </div>
            ))}
          </div>
        </section>

        {/* RESULTS */}
        <section ref={rR} style={{ padding: "40px 20px 72px", maxWidth: "660px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <span style={{ fontSize: "10px", fontWeight: 700, color: "rgba(255,255,255,0.2)", textTransform: "uppercase", letterSpacing: "3px", textShadow: "0 0 8px rgba(255,255,255,0.04)" }}>Results</span>
            <h2 style={{ fontSize: "clamp(22px,3.5vw,30px)", fontWeight: 800, letterSpacing: "-1px", marginTop: "8px", textShadow: G.txt }}>Real numbers</h2>
          </div>
          <div style={{ display: "grid", gap: "6px" }}>
            {campaigns.map((r, i) => (<ResultRow key={i} r={r} vis={rV} />))}
          </div>
        </section>

        {/* MARQUEE */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.025)", overflow: "hidden", padding: "12px 0" }}>
          <div style={{ display: "flex", animation: "marquee 22s linear infinite", whiteSpace: "nowrap" }}>
            {Array.from({ length: 30 }).map((_, i) => {
              const items = ["ClippersHQ", "\u00b7", "$500K+ Paid", "\u00b7", "5K+ Clippers", "\u00b7", "2B+ Views", "\u00b7", "50+ Creators", "\u00b7"];
              const t = items[i % items.length];
              return <span key={i} style={{ padding: "0 16px", fontSize: "10px", fontWeight: 600, color: t === "\u00b7" ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.07)", textTransform: "uppercase", letterSpacing: "2px", flexShrink: 0, textShadow: t !== "\u00b7" ? "0 0 6px rgba(255,255,255,0.03)" : "none" }}>{t}</span>;
            })}
          </div>
        </div>

        {/* CTA */}
        <section ref={cR} style={{ padding: "88px 20px", textAlign: "center", position: "relative" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "400px", height: "400px", background: "radial-gradient(circle,rgba(255,255,255,0.02),transparent 55%)", borderRadius: "50%", filter: "blur(30px)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1, opacity: cV ? 1 : 0, transform: cV ? "none" : "translateY(16px)", transition: "all 0.6s" }}>
            <h2 style={{ fontSize: "clamp(24px,4.5vw,42px)", fontWeight: 800, letterSpacing: "-1.5px", lineHeight: 1.05, marginBottom: "12px", textShadow: "0 0 25px rgba(255,255,255,0.22), 0 0 55px rgba(255,255,255,0.06)", animation: cV ? "glowPulse 4s infinite" : "none" }}>{"Stop watching."}<br />{"Start earning."}</h2>
            <p style={{ color: "rgba(255,255,255,0.22)", fontSize: "13px", marginBottom: "28px", textShadow: "0 0 6px rgba(255,255,255,0.04)" }}>Join the Discord. Pick your role.</p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <TriBtn href={DISCORD} filled>{"I'm a Creator"}</TriBtn>
              <TriBtn href={DISCORD}>{"I'm a Clipper"}</TriBtn>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ borderTop: "1px solid rgba(255,255,255,0.025)", padding: "24px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: "800px", margin: "0 auto", flexWrap: "wrap", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <img src={L.clip} alt="" style={{ width: "20px", height: "20px", borderRadius: "5px", boxShadow: "0 0 6px rgba(255,255,255,0.06)" }} />
            <span style={{ fontWeight: 700, fontSize: "12px", textShadow: "0 0 6px rgba(255,255,255,0.06)" }}>ClippersHQ</span>
          </div>
          <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.1)", textShadow: "0 0 4px rgba(255,255,255,0.02)" }}>{"\u00a9 2026 ClippersHQ"}</span>
        </footer>
      </div>
    </>
  );
}
