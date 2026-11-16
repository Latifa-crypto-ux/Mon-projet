import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { S1Hook, S2Reveal, S3Ingredients, S4Freshness, S5Final } from "./Scenes";

export type ForeverBrightProps = { whatsapp: string; price: string; seller: string };

// Timeline @30fps — 0:00 hook · 0:04 reveal · 0:09 ingredients · 0:15 freshness · 0:22 final → 0:30
export const ForeverBright: React.FC<ForeverBrightProps> = ({ whatsapp, price, seller }) => (
  <AbsoluteFill style={{ backgroundColor: "#03140d" }}>
    <Sequence durationInFrames={120}><S1Hook /></Sequence>
    <Sequence from={120} durationInFrames={150}><S2Reveal /></Sequence>
    <Sequence from={270} durationInFrames={180}><S3Ingredients /></Sequence>
    <Sequence from={450} durationInFrames={210}><S4Freshness /></Sequence>
    <Sequence from={660} durationInFrames={240}><S5Final whatsapp={whatsapp} price={price} seller={seller} /></Sequence>
  </AbsoluteFill>
);
