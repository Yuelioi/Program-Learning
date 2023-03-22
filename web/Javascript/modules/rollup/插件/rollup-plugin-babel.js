// pnpm install --save-dev @rollup/plugin-babel @babel/core @babel/preset-env
// https://www.npmjs.com/package/@rollup/plugin-babel

/* .babelrc
{
    "presets": [
        "@babel/preset-env"
    ]
}
*/

import { babel } from "@rollup/plugin-babel";

export default {
    input: "src/index.js",
    output: {
        file: "dist/bundle.js",
        format: "umd",
    },
    plugins: [babel({ babelHelpers: "bundled" })],
};
