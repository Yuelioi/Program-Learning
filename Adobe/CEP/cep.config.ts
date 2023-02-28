import { CEP_Config } from "vite-cep-plugin";
import { version } from "./package.json";


const config: CEP_Config = {
    version,
    id: "com.yuelili.cep",
    displayName: "PR Tools",
    symlink: "local",
    port: 3010,
    servePort: 5010,
    startingDebugPort: 8870,
    extensionManifestVersion: 6.0,
    requiredRuntimeVersion: 9.0,
    hosts: [
        {
            name: "AEFT",
            version: "[0.0,99.9]",
        },
        {
            name: "PPRO",
            version: "[0.0,99.9]",
        },
        {
            name: "ILST",
            version: "[0.0,99.9]",
        },
        {
            name: "PHXS",
            version: "[0.0,99.9]",
        },
        {
            name: "FLPR",
            version: "[0.0,99.9]",
        },
    ],

    type: "Panel",
    iconDarkNormal: "./src/assets/light-icon.png",
    iconNormal: "./src/assets/dark-icon.png",
    iconDarkNormalRollOver: "./src/assets/light-icon.png",
    iconNormalRollOver: "./src/assets/dark-icon.png",
    parameters: ["--v=0", "--enable-nodejs", "--mixed-context"],
    width: 500,
    height: 550,

    panels: [
        {
            mainPath: "./main/index.html",
            name: "main",
            panelDisplayName: "Bolt CEP",
            autoVisible: true,
            width: 600,
            height: 650,
        },

    ],
    build: {
        jsxBin: "off", // "off" | "copy" | "replace";
        sourceMap: true,
    },
    zxp: {
        country: "US",
        province: "CA",
        org: "MyCompany",
        password: "mypassword",
        tsa: "http://timestamp.digicert.com/",
        sourceMap: false,
        jsxBin: "off",
    },
    installModules: [],
    copyAssets: ["public"],
    copyZipAssets: [],
};
export default config;