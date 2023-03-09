/**
 * @Usage: to import json file directly
 * @Install: pnpm install rollup-plugin-json -D
 */

// rollup.config.js

import json from 'rollup-plugin-json'
export default {
    // ...
    plugins: [
        json()
    ]
}


// use

import { name } from from './package.json'