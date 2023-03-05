import typescript from "rollup-plugin-typescript2";
import { uglify } from "rollup-plugin-uglify";
import { readFileSync } from "fs";

// set NODE_ENV = ts-link
const tsConfig = JSON.parse(readFileSync("tsconfig-ae.json"));
// process.env.NODE_ENV = 'tsx-linker';
switch (env) {

}

const env = process.env.NODE_ENV || "development";
const config = tsConfig.env[env];
console.log(config)
export default {
    input: config.rollup.input || "./src/main/main.tsx",
    output: {
        file: config.outputFile,
        format: "iife",
        name: "MyApp"
    },
    plugins: [
        typescript({ "tsconfig": "tsconfig.json" }),
        ...config.rollup.plugins
    ]
};
