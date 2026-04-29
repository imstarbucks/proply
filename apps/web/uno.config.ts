import { UNOCSS_CONFIG } from "@proply/styles/uno";
import { defineConfig } from "unocss";

export default defineConfig({
	...UNOCSS_CONFIG,
	content: {
		filesystem: [
			"app/**/*.{ts,tsx,js,jsx,html,mdx}",
			"../../packages/components/src/**/*.{ts,tsx}",
		],
	},
});
