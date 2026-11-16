import React from "react";
import { AbsoluteFill, interpolate, random, useCurrentFrame } from "remotion";
import { C, sans } from "./theme";
import {
  AloeLeaf, Bokeh, EmeraldBg, GoldRule, Kicker, MintDefs, MintLeaf, Reveal, SceneFade, Title, Vignette, ease,
} from "./ui";
import { ProductOnPedestal } from "./Product";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const center: React.CSSProperties = { position: "absolute", left: 0, right: 0, textAlign: "center", padding: "0 80px" };

/* ───────────── Scene 1 · Hook (4 s) ───────────── */
export const S1Hook: React.FC = () => {
  const f = useCurrentFrame();
  const zoom = interpolate(f, [0, 120], [1.0, 1.14], { ...clamp, easing: ease });
  const impact = 24;
  const dropY = f < impact ? -120 + (980 + 120) * Math.pow(f / impact, 2) : 980;
  const after = f - impact;
  return (
    <SceneFade dur={120} fadeIn={0}>
      <EmeraldBg cy="40%" />
      <AbsoluteFill style={{ transform: `scale(${zoom}) translateY(${-f * 0.6}px)`, transformOrigin: "50% 55%" }}>
        <svg width={1080} height={1920} style={{ position: "absolute", filter: "blur(9px)", opacity: 0.55 }}>
          <g transform="translate(260,2050) rotate(-24)"><AloeLeaf id="b1" len={1300} width={190} rim={false} /></g>
          <g transform="translate(860,2050) rotate(22)"><AloeLeaf id="b2" len={1350} width={200} rim={false} /></g>
        </svg>
        <svg width={1080} height={1920} style={{ position: "absolute" }}>
          <g transform="translate(400,2000) rotate(-9)"><AloeLeaf id="l1" len={1250} width={230} /></g>
          <g transform="translate(700,2000) rotate(10)"><AloeLeaf id="l2" len={1200} width={220} /></g>
          <g transform="translate(540,2020) rotate(1)"><AloeLeaf id="l0" len={1420} width={300} /></g>
          {/* falling drop */}
          {f < impact + 2 && (
            <g transform={`translate(540,${dropY})`}>
              <path d="M0,-34 C14,-12 20,4 20,12 A20,20 0 0 1 -20,12 C-20,4 -14,-12 0,-34Z" fill="rgba(235,255,245,0.85)" />
              <ellipse cx={-6} cy={8} rx={5} ry={7} fill="white" />
            </g>
          )}
          {/* splash */}
          {after >= 0 && (
            <g transform="translate(540,1000)">
              {[0, 8].map((d) => {
                const t = Math.max(0, after - d);
                return <ellipse key={d} rx={20 + t * 9} ry={6 + t * 2.4} fill="none" stroke="rgba(230,255,240,0.8)"
                  strokeWidth={3} opacity={interpolate(t, [0, 30], [0.9, 0], clamp)} />;
              })}
              {new Array(9).fill(0).map((_, i) => {
                const a = -Math.PI * (0.1 + 0.8 * (i / 8));
                const v = 9 + random(`sp${i}`) * 7;
                const t = Math.min(after, 30);
                const x = Math.cos(a) * v * t;
                const y = Math.sin(a) * v * t + 0.55 * t * t;
                return <circle key={i} cx={x} cy={y} r={3 + random(`spr${i}`) * 4} fill="rgba(240,255,248,0.9)"
                  opacity={interpolate(after, [0, 28], [1, 0], clamp)} />;
              })}
            </g>
          )}
        </svg>
        {/* golden rim light */}
        <AbsoluteFill style={{ background: "radial-gradient(ellipse 50% 30% at 50% 18%, rgba(241,221,166,0.28), transparent 70%)" }} />
      </AbsoluteFill>
      <Bokeh seed="s1" count={22} />
      <Vignette />
      <div style={{ ...center, top: 250 }}>
        <Reveal at={14}><Title size={78}>Et si votre routine</Title></Reveal>
        <Reveal at={24}><Title size={78} italic color={C.goldLight}>commençait par plus</Title></Reveal>
        <Reveal at={34}><Title size={78} italic color={C.goldLight}>de fraîcheur ?</Title></Reveal>
      </div>
    </SceneFade>
  );
};

/* ───────────── Scene 2 · Product reveal (5 s) ───────────── */
export const S2Reveal: React.FC = () => {
  const f = useCurrentFrame();
  const p = interpolate(f, [0, 45], [0, 1], { ...clamp, easing: ease });
  const zoom = interpolate(f, [0, 150], [1.0, 1.08], clamp);
  return (
    <SceneFade dur={150}>
      <EmeraldBg cy="62%" />
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 45% 30% at 50% 58%, rgba(241,221,166,${0.32 * p}), transparent 70%)` }} />
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 70%" }}>
        <div style={{ position: "absolute", inset: 0, opacity: p, transform: `translateY(${(1 - p) * 70}px)`,
          filter: `brightness(${0.35 + 0.65 * p}) blur(${(1 - p) * 8}px)` }}>
          <ProductOnPedestal tubeH={1000} baseY={1480} sweepAt={50} />
        </div>
        {/* low mist */}
        {[0, 1, 2].map((i) => (
          <div key={i} style={{
            position: "absolute", top: 1440 + i * 60, left: -200 + Math.sin(f / 40 + i) * 80, width: 1480, height: 200,
            background: "radial-gradient(ellipse at center, rgba(230,245,236,0.13), transparent 70%)", filter: "blur(20px)",
          }} />
        ))}
      </AbsoluteFill>
      <Bokeh seed="s2" count={18} speed={0.4} />
      <Vignette />
      <div style={{ ...center, top: 190 }}>
        <Reveal at={30}><Kicker>Découvrez</Kicker></Reveal>
        <Reveal at={42}><div style={{ marginTop: 18 }}><Title size={92}>Forever Bright</Title></div></Reveal>
        <Reveal at={50}><Title size={64} italic color={C.goldLight}>Toothgel</Title></Reveal>
      </div>
    </SceneFade>
  );
};

/* ───────────── Scene 3 · Ingredients (6 s) ───────────── */
const AloeSlices: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <svg width={760} height={760} viewBox="-380 -380 760 760">
      <defs>
        <radialGradient id="gel" cx="0.5" cy="0.45" r="0.6">
          <stop offset="0" stopColor="rgba(235,255,225,0.95)" />
          <stop offset="0.7" stopColor="rgba(170,225,160,0.85)" />
          <stop offset="1" stopColor="rgba(110,180,100,0.9)" />
        </radialGradient>
      </defs>
      {[0, 1, 2].map((i) => {
        const y = -150 + i * 150 + Math.sin(f / 22 + i) * 6;
        return (
          <g key={i} transform={`translate(${(i - 1) * 30},${y}) rotate(${-8 + i * 6})`}>
            <path d="M-230,0 Q0,-120 230,0 Q0,70 -230,0Z" fill="#1f6b37" />
            <path d="M-214,0 Q0,-104 214,0 Q0,56 -214,0Z" fill="url(#gel)" />
            {new Array(14).fill(0).map((_, k) => (
              <circle key={k} cx={(random(`g${i}${k}`) - 0.5) * 300} cy={(random(`h${i}${k}`) - 0.6) * 60} r={2 + random(`r${i}${k}`) * 3}
                fill="rgba(255,255,255,0.7)" />
            ))}
            <path d="M-160,-30 Q0,-80 160,-30" stroke="rgba(255,255,255,0.7)" strokeWidth={4} fill="none" strokeLinecap="round" />
          </g>
        );
      })}
    </svg>
  );
};

const Honeycomb: React.FC = () => {
  const f = useCurrentFrame();
  const r = 62;
  const hex = (cx: number, cy: number) =>
    new Array(6).fill(0).map((_, i) => {
      const a = (Math.PI / 3) * i + Math.PI / 6;
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    }).join(" ");
  const cells: [number, number][] = [];
  for (let row = -3; row <= 3; row++)
    for (let col = -3; col <= 3; col++) {
      const x = col * r * Math.sqrt(3) + (row % 2 ? (r * Math.sqrt(3)) / 2 : 0);
      const y = row * r * 1.5;
      if (Math.hypot(x, y) < 300) cells.push([x, y]);
    }
  return (
    <svg width={760} height={760} viewBox="-380 -380 760 760">
      <defs>
        <radialGradient id="honey" cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#ffe3a0" />
          <stop offset="0.5" stopColor="#e0a33a" />
          <stop offset="1" stopColor="#8a5212" />
        </radialGradient>
      </defs>
      {cells.map(([x, y], i) => {
        const glow = 0.75 + 0.25 * Math.sin(f / 15 + i);
        return (
          <g key={i}>
            <polygon points={hex(x, y)} fill="#b77d22" stroke="#f1dda6" strokeOpacity={0.6} strokeWidth={3} />
            <polygon points={hex(x, y)} fill="url(#honey)" opacity={glow} transform={`translate(${x},${y}) scale(0.82) translate(${-x},${-y})`} />
            <ellipse cx={x - 16} cy={y - 18} rx={12} ry={7} fill="rgba(255,255,255,0.55)" />
          </g>
        );
      })}
    </svg>
  );
};

export const S3Ingredients: React.FC = () => {
  const f = useCurrentFrame();
  const slide = interpolate(f, [80, 104], [0, -1080], { ...clamp, easing: ease });
  const drift = interpolate(f, [0, 180], [30, -30], clamp);
  return (
    <SceneFade dur={180}>
      <EmeraldBg cy="45%" />
      <Bokeh seed="s3" count={20} speed={0.5} />
      <AbsoluteFill style={{ transform: `translateX(${slide}px)` }}>
        {/* A — Aloe vera */}
        <AbsoluteFill style={{ transform: `translateX(${drift}px)` }}>
          <div style={{ position: "absolute", top: 560, left: 160, width: 760, height: 760, borderRadius: "50%",
            border: `2px solid ${C.gold}`, opacity: 0.45 }} />
          <div style={{ position: "absolute", top: 560, left: 160 }}><AloeSlices /></div>
        </AbsoluteFill>
        <div style={{ ...center, top: 1400 }}>
          <Reveal at={10}><Kicker>Ingrédient n°1</Kicker></Reveal>
          <Reveal at={18}><div style={{ marginTop: 14 }}><Title size={104}>Aloe vera</Title></div></Reveal>
        </div>
        {/* B — Propolis + mint */}
        <AbsoluteFill style={{ left: 1080 }}>
          <div style={{ position: "absolute", top: 520, left: 160, transform: `translateX(${drift}px)` }}><Honeycomb /></div>
          <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
            <MintDefs />
            <MintLeaf x={190} y={560} s={1.3} r={-35} />
            <MintLeaf x={900} y={1180} s={1.5} r={40} />
            <MintLeaf x={830} y={600} s={0.9} r={20} />
          </svg>
          <div style={{ ...center, top: 1330 }}>
            <Reveal at={104}><Kicker>Ingrédient n°2</Kicker></Reveal>
            <Reveal at={112}><div style={{ marginTop: 14 }}><Title size={104}>Propolis</Title></div></Reveal>
            <GoldRule at={126} />
            <Reveal at={132}><Title size={58} italic color={C.goldLight}>Saveur menthe naturelle</Title></Reveal>
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
      <Vignette />
    </SceneFade>
  );
};

/* ───────────── Scene 4 · Texture & freshness (7 s) ───────────── */
export const S4Freshness: React.FC = () => {
  const f = useCurrentFrame();
  const draw = interpolate(f, [5, 95], [1, 0], { ...clamp, easing: ease });
  const rot = interpolate(f, [0, 210], [-4, 4], clamp);
  const ribbon = "M180,820 C180,560 520,500 600,640 C680,780 460,900 380,780 C300,660 520,560 700,620 C860,672 900,860 760,960";
  const len = 2200;
  const items = ["Sans fluor", "Pour toute la famille", "Fraîcheur au quotidien"];
  return (
    <SceneFade dur={210}>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 80% 60% at 50% 35%, #ffffff 0%, ${C.mint} 55%, #cfe8da 100%)` }} />
      {/* rising bubbles */}
      <AbsoluteFill>
        {new Array(24).fill(0).map((_, i) => {
          const s = 10 + random(`bb${i}`) * 34;
          const x = random(`bx${i}`) * 1080;
          const y = 1950 - ((f * (1.2 + random(`bv${i}`) * 2) + random(`by${i}`) * 1900) % 2000);
          return <div key={i} style={{ position: "absolute", left: x, top: y, width: s, height: s, borderRadius: "50%",
            border: "2px solid rgba(17,96,63,0.22)", background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(255,255,255,0.1) 60%)" }} />;
        })}
      </AbsoluteFill>
      <AbsoluteFill style={{ transform: `rotate(${rot}deg) scale(${1 + f * 0.0006})`, transformOrigin: "50% 40%" }}>
        <svg width={1080} height={1920} style={{ position: "absolute" }}>
          <MintDefs />
          <MintLeaf x={150} y={420} s={1.4} r={-30} />
          <MintLeaf x={930} y={1060} s={1.6} r={35} />
          <MintLeaf x={880} y={360} s={0.9} r={60} />
          <g style={{ filter: "drop-shadow(0 22px 26px rgba(10,68,48,0.28))" }}>
            <path d={ribbon} fill="none" stroke="#f4f7f4" strokeWidth={96} strokeLinecap="round" strokeDasharray={len} strokeDashoffset={len * draw} />
          </g>
          <path d={ribbon} fill="none" stroke="#dfe9e3" strokeWidth={96} strokeLinecap="round" strokeDasharray={len} strokeDashoffset={len * draw} opacity={0.35} transform="translate(0,14)" />
          <path d={ribbon} fill="none" stroke="#ffffff" strokeWidth={30} strokeLinecap="round" strokeDasharray={len} strokeDashoffset={len * draw} transform="translate(-10,-22)" />
          <path d={ribbon} fill="none" stroke="rgba(150,200,175,0.35)" strokeWidth={6} strokeLinecap="round" strokeDasharray={len} strokeDashoffset={len * draw} transform="translate(8,26)" />
        </svg>
      </AbsoluteFill>
      <div style={{ ...center, top: 1200 }}>
        {items.map((t, i) => (
          <Reveal key={t} at={70 + i * 32}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 26, margin: "26px 0" }}>
              <div style={{ width: 18, height: 18, transform: "rotate(45deg)", background: C.gold }} />
              <div style={{ fontFamily: sans, fontWeight: 600, fontSize: 52, color: C.emerald, letterSpacing: 1 }}>{t}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </SceneFade>
  );
};

/* ───────────── Scene 5 · Hero + call to action (8 s) ───────────── */
export const S5Final: React.FC<{ whatsapp: string; price: string; seller: string }> = ({ whatsapp, price, seller }) => {
  const f = useCurrentFrame();
  const t = interpolate(f, [110, 145], [0, 1], { ...clamp, easing: ease });
  const tubeH = interpolate(t, [0, 1], [1000, 700]);
  const baseY = interpolate(t, [0, 1], [1480, 1040]);
  const pedOpacity = 1;
  const sway = Math.sin(f / 30) * 10 * (1 - t);
  return (
    <SceneFade dur={240} fadeOut={0}>
      <EmeraldBg cy={`${interpolate(t, [0, 1], [60, 35])}%`} />
      <svg width={1080} height={1920} style={{ position: "absolute", filter: "blur(14px)", opacity: 0.4 }}>
        <g transform="translate(80,2100) rotate(-28)"><AloeLeaf id="f1" len={1400} width={220} rim={false} /></g>
        <g transform="translate(1000,2100) rotate(26)"><AloeLeaf id="f2" len={1450} width={230} rim={false} /></g>
      </svg>
      <AbsoluteFill style={{ background: `radial-gradient(circle 420px at 50% ${interpolate(t, [0, 1], [54, 32])}%, rgba(241,221,166,0.35), transparent 70%)` }} />
      <Bokeh seed="s5" count={24} speed={0.4} />
      <AbsoluteFill style={{ transform: `translateX(${sway}px)`, opacity: pedOpacity }}>
        <ProductOnPedestal tubeH={tubeH} baseY={baseY} pedW={interpolate(t, [0, 1], [620, 460])} sweepAt={20} />
      </AbsoluteFill>
      <Vignette />
      {/* phase 1 headline */}
      <div style={{ ...center, top: 220 }}>
        <Reveal at={12} out={100}><Title size={88}>Votre Forever Bright</Title></Reveal>
        <Reveal at={22} out={100}><Title size={88} italic color={C.goldLight}>vous attend.</Title></Reveal>
      </div>
      {/* phase 2 end card */}
      <div style={{ ...center, top: 1150 }}>
        <Reveal at={140}><Title size={80}>Forever Bright Toothgel</Title></Reveal>
        <Reveal at={148}><div style={{ marginTop: 18, fontFamily: sans, fontSize: 28, letterSpacing: 6, color: C.gold, textTransform: "uppercase" }}>
          Aloe vera · Propolis · Sans fluor</div></Reveal>
        <Reveal at={160}>
          <div style={{ margin: "56px auto 0", display: "inline-flex", alignItems: "center", gap: 22, padding: "26px 54px", borderRadius: 999,
            background: "linear-gradient(180deg, #2bb673, #1a8f55)", boxShadow: "0 18px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.35)" }}>
            <svg width={48} height={48} viewBox="0 0 24 24"><path fill="white" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.2c0-.1-.2-.2-.4-.3Z"/></svg>
            <div style={{ fontFamily: sans, fontWeight: 600, fontSize: 44, color: "white" }}>Commandez sur WhatsApp</div>
          </div>
        </Reveal>
        <Reveal at={172}><div style={{ marginTop: 40, fontFamily: sans, fontWeight: 600, fontSize: 70, letterSpacing: 3, color: C.white }}>{whatsapp}</div></Reveal>
        {price && <Reveal at={182}><div style={{ marginTop: 18, fontFamily: sans, fontWeight: 500, fontSize: 40, color: C.goldLight }}>{price}</div></Reveal>}
      </div>
      <div style={{ ...center, top: 1830 }}>
        <Reveal at={176} dy={0}><div style={{ fontFamily: sans, fontSize: 24, letterSpacing: 3, color: "rgba(251,253,249,0.7)" }}>{seller}</div></Reveal>
      </div>
    </SceneFade>
  );
};
