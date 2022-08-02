module.exports = {
    content: [
        "./src/pages/**/*.{js,jsx,ts,tsx}",
        "./src/components/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'terracotta': {
                    DEFAULT: '#E07A5F',
                    '50': '#FEFAF9',
                    '100': '#FAECE8',
                    '200': '#F4CFC6',
                    '300': '#EDB3A3',
                    '400': '#E79681',
                    '500': '#E07A5F',
                    '600': '#D75330',
                    '700': '#AD3F22',
                    '800': '#7E2E18',
                    '900': '#4F1D0F'
                }, 'juniper': {
                    DEFAULT: '#768B8E',
                    '50': '#DBE0E1',
                    '100': '#D0D7D8',
                    '200': '#B9C4C5',
                    '300': '#A3B1B3',
                    '400': '#8C9EA0',
                    '500': '#768B8E',
                    '600': '#5C6D70',
                    '700': '#434F51',
                    '800': '#2A3132',
                    '900': '#101314'
                }
            },
        },
        plugins: [],
    }
}