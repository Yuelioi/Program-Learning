/**
 * @Usage: open web serve
 * @Install: pnpm install rollup-plugin-livereload -D
 */

// rollup.config.js

import livereload from "rollup-plugin-livereload";
export default {
    // ...
    plugins: [livereload()],
};

// use
