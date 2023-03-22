/**
 * @Usage: use commonjs modules
 * @Install: pnpm install @rollup/plugin-commonjs -D
 */

// rollup.config.js

import commonjs from "@rollup/plugin-commonjs";
export default {
    // ...
    plugins: [commonjs()],
};

// cjs-test.js
module.exports = {
    foo: "bar",
};

// index.js

import cjs from "./cjs-test";
log(cjs);
