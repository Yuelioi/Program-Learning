/**
 * @Usage: read tsconfig.json in typescript
 * @link: https://www.npmjs.com/package/@rollup/plugin-typescript
 * @Install: pnpm install @rollup/plugin-typescript --save-dev
 * @requires: pnpm install tslib
 */

// rollup.config.js

import typescript from "@rollup/plugin-typescript";
export default {
    // ...
    plugins: [typescript()],
};
