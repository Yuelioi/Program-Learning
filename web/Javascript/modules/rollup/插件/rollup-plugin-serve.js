/**
 * @Usage: open web serve
 * @Install: pnpm install rollup-plugin-serve -D
 */

// rollup.config.js

import serve from "rollup-plugin-serve";
export default {
    // ...
    plugins: [serve(
        oepn:true,
        port:5001,
        openPage:'/public/index.html'
    )],
};


