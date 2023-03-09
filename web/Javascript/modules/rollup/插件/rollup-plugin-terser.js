/**
 * @Usage: compile code
 * @Install: pnpm install rollup-plugin-terser -D
 */

// rollup.config.js

import terser from "rollup-plugin-terser";
export default {
    // ...
    plugins: [terser()],
};
