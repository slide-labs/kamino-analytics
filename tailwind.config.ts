import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'kamino-blue-dark': '#091326',
        'kamino-blue-light': '#49AFE9',
        'kamino-midnight-blue': '#151C2E',
        'kamino-steel-blue': '#98B0C1',
      },
    },
  },
  plugins: [],
}
export default config
