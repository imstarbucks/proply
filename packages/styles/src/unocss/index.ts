import { presetWind4, type UserConfig } from "unocss";

export const THEME_DEFAULTS = {
	"--color-canvas": "#0a0a0a",
	"--color-surface": "#141414",
	"--color-ink": "#f5f5f5",
	"--color-ink-soft": "#888888",
	"--color-ink-faint": "#444444",
	"--color-line": "#2a2a2a",
	"--color-subtle": "#1c1c1c",
	"--color-accent": "#d4a843",
	"--color-accent-light": "#e0bc6a",
	"--color-gold": "#d4a843",
	"--color-gold-light": "#1a1508",
	"--color-error": "#e05c5c",
	"--color-bubble-user": "#d4a843",
	"--color-bubble-bot": "#1c1c1c",
	"--font-display": "'Cormorant Garamond', Georgia, serif",
	"--font-body": "'DM Sans', system-ui, sans-serif",
} as const;

export const UNOCSS_CONFIG: UserConfig = {
	presets: [presetWind4()],
	theme: {
		colors: {
			canvas: "var(--color-canvas)",
			surface: "var(--color-surface)",
			ink: {
				DEFAULT: "var(--color-ink)",
				soft: "var(--color-ink-soft)",
				faint: "var(--color-ink-faint)",
			},
			line: "var(--color-line)",
			subtle: "var(--color-subtle)",
			accent: {
				DEFAULT: "var(--color-accent)",
				light: "var(--color-accent-light)",
			},
			gold: {
				DEFAULT: "var(--color-gold)",
				light: "var(--color-gold-light)",
			},
			error: "var(--color-error)",
			bubble: {
				user: "var(--color-bubble-user)",
				bot: "var(--color-bubble-bot)",
			},
		},
		fontFamily: {
			display: "var(--font-display)",
			body: "var(--font-body)",
		},
	},
	content: {
		filesystem: [
			"src/**/*.{ts,tsx,js,jsx,html}",
			"app/**/*.{ts,tsx,js,jsx,html}",
			"../../packages/components/src/**/*.{ts,tsx}",
		],
	},
};
