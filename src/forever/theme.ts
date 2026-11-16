import { loadFont as loadSerif } from "@remotion/google-fonts/CormorantGaramond";
import { loadFont as loadSans } from "@remotion/google-fonts/Montserrat";

export const serif = loadSerif("normal", { weights: ["500", "600"], subsets: ["latin"] }).fontFamily;
loadSerif("italic", { weights: ["500"], subsets: ["latin"] });
export const sans = loadSans("normal", { weights: ["400", "500", "600"], subsets: ["latin"] }).fontFamily;

export const C = {
  deep: "#03140d",
  emerald: "#0a4430",
  emeraldMid: "#11603f",
  leaf: "#2f8a4e",
  leafDark: "#0f4d2c",
  gold: "#d6b26a",
  goldLight: "#f1dda6",
  white: "#fbfdf9",
  mint: "#e6f4ec",
};

export const W = 1080;
export const H = 1920;
