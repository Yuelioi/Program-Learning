import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { cep, runAction } from "vite-cep-plugin";
import cepConfig from "./cep.config";
import path from "path";
import { extendscriptConfig } from "./vite.es.config";

const extensions = [".js", ".ts", ".tsx"];

const devDist = "dist";
const cepDist = "cep";

const src = path.resolve(__dirname, "src");
const root = path.resolve(src, "js");
const outDir = path.resolve(__dirname, "dist", "cep");
// const outDir = path.resolve("C:\\Program Files (x86)\\Common Files\\Adobe\\CEP\\extensions\\cep2");

const debugReact = false;
const isProduction = process.env.NODE_ENV === "production";
const isMetaPackage = process.env.ZIP_PACKAGE === "true";
const isPackage = process.env.ZXP_PACKAGE === "true" || isMetaPackage;
const isServe = process.env.SERVE_PANEL === "true";
const action = process.env.ACTION;

let input = {};
cepConfig.panels.map((panel) => {
    input[panel.name] = path.resolve(root, panel.mainPath);
});

const config = {
    cepConfig,
    isProduction,
    isPackage,
    isMetaPackage,
    isServe,
    debugReact,
    dir: `${__dirname}/${devDist}`,
    cepDist: cepDist,
    zxpDir: `${__dirname}/${devDist}/zxp`,
    zipDir: `${__dirname}/${devDist}/zip`,
    packages: cepConfig.installModules || [],
};

if (action) {
    runAction(config, action);
    process.exit();
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), cep(config)],
    resolve: {
        alias: [
            { find: "@esTypes", replacement: path.resolve(__dirname, "src") },
            { find: "@src", replacement: path.resolve(__dirname, "src") },
            { find: "@js", replacement: path.resolve(__dirname, "src", "js") },
            { find: "@jsx", replacement: path.resolve(__dirname, "src", "jsx") },
            { find: "@jslib", replacement: path.resolve(__dirname, "src", "js", "lib") },
            { find: "@jsxlib", replacement: path.resolve(__dirname, "src", "jsx", "lib") },
            { find: "@types-for-adobe", replacement: path.resolve(__dirname, "node_modules", "types-for-adobe") },
        ],
    },
    root,
    clearScreen: false,
    server: {
        port: cepConfig.port,
    },
    preview: {
        port: cepConfig.servePort,
    },

    build: {
        sourcemap: isPackage ? cepConfig.zxp.sourceMap : cepConfig.build?.sourceMap,
        watch: {
            include: "src/jsx/**",
        },

        rollupOptions: {
            input,
            output: {
                manualChunks: {},
                preserveModules: false,
                format: "cjs",
            },
        },
        target: "chrome74",
        outDir,
    },
});

// rollup es3 build
const outPathExtendscript = path.join("dist", "cep", "jsx", "index.js");
// const outPathExtendscript = path.join("C:\\Program Files (x86)\\Common Files\\Adobe\\CEP\\extensions\\cep2\\jsx\\index.js");
extendscriptConfig(
    `src/jsx/index.ts`,
    outPathExtendscript,
    cepConfig,
    extensions,
    isProduction,
    isPackage
);
