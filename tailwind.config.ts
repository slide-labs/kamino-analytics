import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
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
