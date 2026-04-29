import { UNOCSS_CONFIG } from "@proply/styles/uno";
import { defineConfig } from "unocss";

export default defineConfig({
	...UNOCSS_CONFIG,
	content: {
		filesystem: [
			"src/**/*.{ts,tsx,js,jsx,html}",
			"../../packages/components/src/**/*.{ts,tsx}",
		],
	},
});
