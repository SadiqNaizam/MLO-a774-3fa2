import type { Config } from "tailwindcss";
import defaultTheme from 'tailwindcss/defaultTheme'; // Import defaultTheme

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)', // Will now be 0.25rem
				md: 'calc(var(--radius) - 0.125rem)', // Adjusted for smaller base radius, e.g. 2px if radius is 4px
				sm: 'calc(var(--radius) - 0.1875rem)'  // e.g. 1px if radius is 4px (or consider fixed small values like 2px)
                                                    // Or more simply: md: 'calc(var(--radius) * 0.75)', sm: 'calc(var(--radius) * 0.5)'
                                                    // Let's use simpler relative values:
                                                    // md: 'calc(var(--radius) - 2px)' as before, sm: 'calc(var(--radius) - 3px)' for 1px if radius is 4px.
                                                    // The original calculation was fine for 0.5rem: md (0.5rem - 2px), sm (0.5rem - 4px).
                                                    // For 0.25rem (4px): md (4px - 2px = 2px), sm (4px - 4px = 0px).
                                                    // Let's make sm `calc(var(--radius) - 2px)` and remove md or set it to `var(--radius)`
                                                    // The design specifies "slightly rounded corners (e.g., 4px radius)".
                                                    // So `lg` should be this 4px. `md` and `sm` should be smaller or equal.
                                                    // lg: 'var(--radius)' -> 4px
                                                    // md: 'calc(var(--radius) - 2px)' -> 2px
                                                    // sm: 'calc(var(--radius) - 3px)' -> 1px (let's stick with existing subtractions if they still make sense or simplify)
                                                    // Given --radius is 0.25rem (4px):
                                                    // lg: 0.25rem (4px)
                                                    // md: calc(0.25rem - 2px) => calc(4px - 2px) = 2px (0.125rem)
                                                    // sm: calc(0.25rem - 4px) => calc(4px - 4px) = 0px (0rem)
                                                    // This seems fine.
			},
			fontFamily: { // Add font families
				sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
				mono: ['var(--font-mono)', ...defaultTheme.fontFamily.mono],
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;