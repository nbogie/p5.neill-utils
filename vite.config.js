import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "P5NeillUtils",
            // the proper extensions will be added
            fileName: "p5.neill-utils",
            formats: ["es", "umd"],
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            // external: ["vue"],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    // vue: "Vue",
                },
            },
        },
    },
});
