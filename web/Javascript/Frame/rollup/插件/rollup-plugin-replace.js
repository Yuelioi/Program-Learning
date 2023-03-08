/**
 * @Usage: use env
 * @Install: pnpm rollup-plugin-replace -D
 */

// rollup.config.js

import serve from "rollup-plugin-serve";
export default {
    // ...
    plugins: [replace()],
};
