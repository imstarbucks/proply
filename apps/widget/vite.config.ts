import { resolve } from "node:path";
import preact from "@preact/preset-vite";
import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [preact(), UnoCSS({ mode: "shadow-dom" })],
	build: {
		lib: {
			entry: resolve(import.meta.dirname, "src/index.tsx"),
			name: "ProplyWidget",
			fileName: "widget",
			formats: ["iife"],
		},
		cssCodeSplit: false,
	},
});
