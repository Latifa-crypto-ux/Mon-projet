import React from "react";
import { Composition } from "remotion";
import { HelloWorld } from "./HelloWorld";
import { ForeverBright } from "./forever/ForeverBright";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ForeverBright"
        component={ForeverBright}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          whatsapp: "+227 82 42 41 44",
          price: "",
          seller: "Foreverbytifa · Distributeur indépendant Forever",
        }}
      />
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
