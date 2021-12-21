module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    content: ["./src/**/*.{html,js}"],
    darkMode: "media", // or 'media' or 'class'
    theme: {
        extend: {
            transitionProperty: {
                'height': 'height',
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('daisyui'),
    ],
}
