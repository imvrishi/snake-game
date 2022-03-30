import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/game.ts",
  output: {
    format: "iife",
    file: "docs/script.js",
  },
  plugins: [typescript(), terser()],
};
