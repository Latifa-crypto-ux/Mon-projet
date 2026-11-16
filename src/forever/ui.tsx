import React from "react";
import { AbsoluteFill, Easing, interpolate, random, useCurrentFrame } from "remotion";
import { C, H, W, sans, serif } from "./theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const ease = Easing.bezier(0.25, 0.1, 0.25, 1);

/** Fades a whole scene in and out. */
export const SceneFade: React.FC<{ dur: number; fadeIn?: number; fadeOut?: number; children: React.ReactNode }> = ({
  dur, fadeIn = 12, fadeOut = 12, children,
}) => {
  const f = useCurrentFrame();
  const o = Math.min(
    fadeIn ? interpolate(f, [0, fadeIn], [0, 1], clamp) : 1,
    fadeOut ? interpolate(f, [dur - fadeOut, dur], [1, 0], clamp) : 1,
  );
  return <AbsoluteFill style={{ opacity: o }}>{children}</AbsoluteFill>;
};

export const EmeraldBg: React.FC<{ cy?: string }> = ({ cy = "45%" }) => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(ellipse 85% 60% at 50% ${cy}, ${C.emeraldMid} 0%, ${C.emerald} 38%, ${C.deep} 100%)`,
    }}
  />
);

export const Vignette: React.FC = () => (
  <AbsoluteFill style={{ background: "radial-gradient(ellipse 75% 65% at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)" }} />
);

/** Soft floating bokeh particles. */
export const Bokeh: React.FC<{ seed: string; count?: number; color?: string; max?: number; speed?: number }> = ({
  seed, count = 26, color = C.goldLight, max = 26, speed = 0.6,
}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      {new Array(count).fill(0).map((_, i) => {
        const s = 4 + random(`${seed}s${i}`) * max;
        const x = random(`${seed}x${i}`) * W;
        const y0 = random(`${seed}y${i}`) * (H + 200);
        const v = (0.3 + random(`${seed}v${i}`)) * speed;
        const y = ((y0 - f * v) % (H + 200) + (H + 200)) % (H + 200) - 100;
        const tw = 0.25 + 0.35 * (0.5 + 0.5 * Math.sin(f / 18 + i));
        return (
          <div key={i} style={{
            position: "absolute", left: x, top: y, width: s, height: s, borderRadius: "50%",
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            opacity: tw, filter: `blur(${s > 18 ? 3 : 1}px)`,
          }} />
        );
      })}
    </AbsoluteFill>
  );
};

/** Elegant text reveal: fade, rise and de-blur. */
export const Reveal: React.FC<{ at: number; out?: number; children: React.ReactNode; style?: React.CSSProperties; dy?: number }> = ({
  at, out, children, style, dy = 26,
}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [at, at + 22], [0, 1], { ...clamp, easing: ease });
  const q = out === undefined ? 1 : interpolate(f, [out, out + 14], [1, 0], clamp);
  return (
    <div style={{
      opacity: p * q, transform: `translateY(${(1 - p) * dy}px)`, filter: `blur(${(1 - p) * 8}px)`, ...style,
    }}>{children}</div>
  );
};

export const Kicker: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = C.gold }) => (
  <div style={{ fontFamily: sans, fontWeight: 500, fontSize: 30, letterSpacing: 10, textTransform: "uppercase", color }}>{children}</div>
);

export const Title: React.FC<{ children: React.ReactNode; size?: number; color?: string; italic?: boolean }> = ({
  children, size = 84, color = C.white, italic,
}) => (
  <div style={{
    fontFamily: serif, fontWeight: 500, fontStyle: italic ? "italic" : "normal", fontSize: size,
    lineHeight: 1.08, color, textShadow: "0 4px 30px rgba(0,0,0,0.35)",
  }}>{children}</div>
);

export const GoldRule: React.FC<{ at: number; width?: number }> = ({ at, width = 140 }) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [at, at + 20], [0, 1], { ...clamp, easing: ease });
  return <div style={{ height: 2, width: width * p, margin: "26px auto", background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)` }} />;
};

/** Serrated aloe leaf path, base at (0,0), pointing up. */
export const aloeLeafPath = (len: number, width: number, teeth = 14) => {
  const pts: string[] = [];
  const edge = (side: 1 | -1) => {
    const arr: string[] = [];
    for (let i = 0; i <= teeth; i++) {
      const t = i / teeth;
      const y = -len * t;
      const half = (width / 2) * Math.pow(1 - t, 0.85);
      arr.push(`${side * half},${y}`);
      if (i < teeth) {
        const tt = (i + 0.5) / teeth;
        const h2 = (width / 2) * Math.pow(1 - tt, 0.85);
        arr.push(`${side * (h2 + 7 * (1 - tt))},${-len * tt - 6}`);
      }
    }
    return arr;
  };
  const left = edge(-1);
  const right = edge(1).reverse();
  pts.push(...left, `0,${-len - 10}`, ...right);
  return `M${pts.join(" L")} Z`;
};

export const AloeLeaf: React.FC<{ len: number; width: number; id: string; rim?: boolean }> = ({ len, width, id, rim = true }) => (
  <g>
    <defs>
      <linearGradient id={`g${id}`} x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor="#0c3f24" />
        <stop offset="0.45" stopColor={C.leaf} />
        <stop offset="0.6" stopColor="#4fa865" />
        <stop offset="1" stopColor="#0e4528" />
      </linearGradient>
    </defs>
    <path d={aloeLeafPath(len, width)} fill={`url(#g${id})`} />
    <path d={`M0,0 L0,${-len * 0.92}`} stroke="rgba(190,240,190,0.18)" strokeWidth={width * 0.06} />
    {rim && <path d={aloeLeafPath(len, width)} fill="none" stroke={C.goldLight} strokeOpacity={0.35} strokeWidth={2} />}
    {new Array(9).fill(0).map((_, i) => (
      <ellipse key={i} cx={(random(`${id}d${i}`) - 0.5) * width * 0.5 * (1 - i / 10)} cy={-len * (0.12 + 0.08 * i)}
        rx={5 + random(`${id}r${i}`) * 6} ry={4 + random(`${id}r${i}`) * 5} fill="rgba(255,255,255,0.55)" />
    ))}
  </g>
);

export const MintLeaf: React.FC<{ x: number; y: number; s: number; r: number }> = ({ x, y, s, r }) => (
  <g transform={`translate(${x},${y}) rotate(${r}) scale(${s})`}>
    <path d="M0,-70 C42,-48 48,22 0,70 C-48,22 -42,-48 0,-70Z" fill="#3fa35b" />
    <path d="M0,-70 C42,-48 48,22 0,70 C-48,22 -42,-48 0,-70Z" fill="url(#mintShade)" />
    <path d="M0,-62 L0,66" stroke="#bfe8c8" strokeOpacity={0.6} strokeWidth={2.5} />
    {[-40, -15, 10, 35].map((yy) => (
      <g key={yy}>
        <path d={`M0,${yy} Q18,${yy - 10} 30,${yy - 22}`} stroke="#bfe8c8" strokeOpacity={0.45} strokeWidth={1.8} fill="none" />
        <path d={`M0,${yy} Q-18,${yy - 10} -30,${yy - 22}`} stroke="#bfe8c8" strokeOpacity={0.45} strokeWidth={1.8} fill="none" />
      </g>
    ))}
  </g>
);

export const MintDefs: React.FC = () => (
  <defs>
    <linearGradient id="mintShade" x1="0" x2="1">
      <stop offset="0" stopColor="rgba(0,40,10,0.35)" />
      <stop offset="0.5" stopColor="rgba(255,255,255,0.08)" />
      <stop offset="1" stopColor="rgba(0,40,10,0.25)" />
    </linearGradient>
  </defs>
);
