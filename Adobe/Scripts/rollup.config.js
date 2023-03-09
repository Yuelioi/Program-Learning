import typescript from "rollup-plugin-typescript2";
import { uglify } from "rollup-plugin-uglify";
import { readFileSync } from "fs";

// set NODE_ENV = ts-link
const tsConfig = JSON.parse(readFileSync("tsconfig-ae.json"));
// process.env.NODE_ENV = 'tsx-linker';

const env = process.env.NODE_ENV || "development";
const config = tsConfig.env[env];
export default {
    input: "./src/main/1.tsx",
    output: {
        file: config.outputFile,
        format: "iife",
        name: "MyApp",
    },
    plugins: [typescript({ tsconfig: "tsconfig.json" }), ...config.rollup.plugins],
};
