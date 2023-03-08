/**
 * @Usage: read tsconfig.json in typescript
 * @Install: pnpm install rollup-plugin-typescript -D
 */

// rollup.config.js

import typescript from "rollup-plugin-typescript2";
export default {
    // ...
    plugins: [typescript()],
};
