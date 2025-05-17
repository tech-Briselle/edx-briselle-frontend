// tailwind.config.cjs
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    theme: {
        extend: {
            fontFamily: {
                sans: ['Outfit', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                customBlue: '#1e40af',
                primary: '#2563eb', // Blue-600: Ideal for main brand color, buttons, links
                error: '#dc2626', // Red-600: Commonly used for form errors and critical alerts
                warning: '#f59e0b', // Amber-500: Standard for caution, warnings, or pending statuses
                success: '#16a34a', // Green-600: Signals successful actions, confirmations
                accent: '#7c3aed', // Purple-600: Great for secondary UI highlights or CTAs
                alert: '#eab308', // Yellow-500: Eye-catching alert without strong error connotation
                disabled: '#9ca3af', // Gray-400: Neutral tone for disabled elements/text
                delete:'#ff0000',  // Red-400: Neutral tone for disabled elements/text

                neutral: {
                    50: '#f9fafb',
                    100: '#f3f4f6',
                    200: '#e5e7eb',
                    300: '#d1d5db',
                    400: '#9ca3af',
                    500: '#6b7280',
                    600: '#4b5563',
                    700: '#374151',
                    800: '#1f2937',
                    900: '#111827',
                },

                background: {
                    DEFAULT: '#ffffff',
                    subtle: '#f9fafb',
                    muted: '#f3f4f6',
                    dark: '#111827',
                },

                text: {
                    primary: '#111827',
                    secondary: '#6b7280',
                    muted: '#9ca3af',
                    light: '#f9fafb',
                },

                border: {
                    DEFAULT: '#e5e7eb',
                    subtle: '#d1d5db',
                    dark: '#374151',
                },
                boxShadow: {
                    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
                    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
                },

            },

        },

        safelist: [
            'hover:bg-gray-100',
            'hover:bg-gray-200',
            'hover:bg-red-100',
            'hover:bg-blue-500',
            'dark:hover:bg-gray-800',
            'dark:hover:bg-blue-800',
            'dark:hover:bg-red-800',
            'dark:hover:bg-red-800',

            'text-primary', 'bg-primary',
            'text-error', 'bg-error',
            'text-warning', 'bg-warning',
            'text-success', 'bg-success',
            'text-accent', 'bg-accent',
            'text-alert', 'bg-alert',
            'text-disabled', 'bg-disabled',
            'text-delete', 'bg-delete',

            'dark:text-primary', 'dark:bg-primary',
            'dark:text-error', 'dark:bg-error',
            'dark:text-warning', 'dark:bg-warning',
            'dark:text-success', 'dark:bg-success',
            'dark:text-accent', 'dark:bg-accent',
            'dark:text-alert', 'dark:bg-alert',
            'dark:text-disabled', 'dark:bg-disabled',
        ],
    },

    plugins: [
        require('@tailwindcss'),
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/aspect-ratio'),
    ],
};
