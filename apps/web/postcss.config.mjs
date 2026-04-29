export default {
	plugins: {
		"@unocss/postcss": {
			content: [
				"./app/**/*.{html,js,ts,jsx,tsx,mdx}",
				"../../packages/components/src/**/*.{ts,tsx}",
			],
		},
	},
};
