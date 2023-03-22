// pnpm install @rollup/plugin-alias --save-dev

import alias from "@rollup/plugin-alias";

plugins: [
    // ...
    alias({
        entries: [
            { find: "utils", replacement: "../../../utils" },
            { find: "batman-1.0.0", replacement: "./joker-1.5.0" },
        ],
    }),
];
