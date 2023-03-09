/**
 * @Usage: use node modules
 * @Install: pnpm install rollup-plugin-node-resolve -D
 */

// rollup.config.js

import resolve from 'rollup-plugin-node-resolve'
export default {
    // ...
    plugins: [
        resolve()
    ]
}


// use

import _ from from 'lodash-es'