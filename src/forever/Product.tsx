import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { C } from "./theme";

const TUBE_RATIO = 732 / 1833;

/** The real tube photo, with a gold light sweep masked to its silhouette. */
export const Tube: React.FC<{ height: number; sweepAt?: number; sweepDur?: number }> = ({ height, sweepAt = 30, sweepDur = 45 }) => {
  const f = useCurrentFrame();
  const w = height * TUBE_RATIO;
  const pos = interpolate(f, [sweepAt, sweepAt + sweepDur], [-60, 160], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const src = staticFile("tube.png");
  return (
    <div style={{ position: "relative", width: w, height }}>
      <Img src={src} style={{ width: w, height, filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.45))" }} />
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(105deg, transparent ${pos - 18}%, rgba(255,232,170,0.55) ${pos}%, transparent ${pos + 18}%)`,
        WebkitMaskImage: `url(${src})`, WebkitMaskSize: "100% 100%",
        maskImage: `url(${src})`, maskSize: "100% 100%",
        mixBlendMode: "screen",
      }} />
      {/* soft edge light on the right side */}
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(90deg, rgba(0,40,20,0.10), transparent 30%, transparent 75%, rgba(214,178,106,0.22))`,
        WebkitMaskImage: `url(${src})`, WebkitMaskSize: "100% 100%",
        maskImage: `url(${src})`, maskSize: "100% 100%",
      }} />
    </div>
  );
};

/** Emerald pedestal seen slightly from above. */
export const Pedestal: React.FC<{ width: number; depth?: number }> = ({ width, depth = 300 }) => {
  const ry = width * 0.16;
  return (
    <svg width={width + 40} height={depth + ry * 2 + 40} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="pedBody" x1="0" x2="1">
          <stop offset="0" stopColor="#031a10" />
          <stop offset="0.35" stopColor={C.emeraldMid} />
          <stop offset="0.55" stopColor="#1b7a52" />
          <stop offset="1" stopColor="#021309" />
        </linearGradient>
        <radialGradient id="pedTop" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0" stopColor="#1f8a5d" />
          <stop offset="1" stopColor="#0a4430" />
        </radialGradient>
        <linearGradient id="pedFade" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0.5" stopColor="white" />
          <stop offset="1" stopColor="black" />
        </linearGradient>
        <mask id="pedMask"><rect x="0" y="0" width={width + 40} height={depth + ry * 2 + 40} fill="url(#pedFade)" /></mask>
      </defs>
      <g transform="translate(20,20)" mask="url(#pedMask)">
        <path d={`M0,${ry} L0,${ry + depth} A${width / 2},${ry} 0 0 0 ${width},${ry + depth} L${width},${ry} Z`} fill="url(#pedBody)" />
        <ellipse cx={width / 2} cy={ry} rx={width / 2} ry={ry} fill="url(#pedTop)" />
        <ellipse cx={width / 2} cy={ry} rx={width / 2 - 2} ry={ry - 2} fill="none" stroke={C.goldLight} strokeOpacity={0.55} strokeWidth={2.5} />
        <ellipse cx={width / 2} cy={ry} rx={width * 0.2} ry={ry * 0.32} fill="rgba(0,0,0,0.45)" style={{ filter: "blur(10px)" }} />
      </g>
    </svg>
  );
};

/** Tube standing on the pedestal, centred at x = 540. `baseY` = pedestal top centre. */
export const ProductOnPedestal: React.FC<{ tubeH: number; baseY: number; pedW?: number; sweepAt?: number }> = ({
  tubeH, baseY, pedW = 620, sweepAt,
}) => {
  const ry = pedW * 0.16;
  const tw = tubeH * TUBE_RATIO;
  return (
    <>
      <div style={{ position: "absolute", left: 540 - pedW / 2 - 20, top: baseY - ry - 20 }}>
        <Pedestal width={pedW} />
      </div>
      <div style={{ position: "absolute", left: 540 - tw / 2, top: baseY - tubeH + ry * 0.15 }}>
        <Tube height={tubeH} sweepAt={sweepAt} />
      </div>
    </>
  );
};
