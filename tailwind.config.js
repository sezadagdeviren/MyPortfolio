/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: {
                    primary: '#0a0a0f',
                    secondary: '#12121a',
                    tertiary: '#1a1a26',
                },
                neon: {
                    cyan: '#00d4ff',
                    magenta: '#ff00ff',
                    green: '#00ff88',
                    orange: '#ffaa00',
                    red: '#ff0055',
                },
            },
        },
    },
    plugins: [],
}
