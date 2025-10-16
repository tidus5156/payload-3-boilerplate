/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
  prefix: '',
  safelist: [
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        '2xl': '2rem',
        DEFAULT: '1rem',
        lg: '2rem',
        md: '2rem',
        sm: '1rem',
        xl: '2rem',
      },
      screens: {
        '2xl': '86rem',
        lg: '64rem',
        md: '48rem',
        sm: '40rem',
        xl: '80rem',
      },
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'fade-in-down': 'fade-in-down 0.6s ease-out',
        'scale-in': 'scale-in 0.4s ease-out',
        'slide-in-left': 'slide-in-left 0.5s ease-out',
        'slide-in-right': 'slide-in-right 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-gold': 'linear-gradient(135deg, #C9A961 0%, #E8D7B3 100%)',
        'gradient-navy': 'linear-gradient(135deg, #1B3A6D 0%, #5A9FD4 100%)',
        'gradient-accent': 'linear-gradient(135deg, #C9A961 0%, #1B3A6D 100%)',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'glow-gold': '0 0 20px rgba(201, 169, 97, 0.3)',
        'glow-navy': '0 0 20px rgba(27, 58, 109, 0.3)',
        'card-hover': '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        // Allay Property Management Brand Colors
        deepNavy: '#1B3A6D',
        skyBlue: '#5A9FD4',
        warmGold: '#C9A961',
        warmGoldHover: '#B8985F',
        warmGoldDark: '#9A7D3C', // WCAG AA compliant for text on white (4.5:1)
        warmGoldLight: '#E8D7B3', // Light backgrounds
        sageGreen: '#7A9B76',
        charcoal: '#2D3436',
        warmGray: '#6C757D',
        lightGray: '#F5F7FA',

        // Accessible Text Colors
        textPrimary: '#1B3A6D', // deepNavy - excellent contrast
        textSecondary: '#4A5568',
        textMuted: '#6C757D',

        // Shadcn/UI Default Colors (preserved for compatibility)
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        background: 'hsl(var(--background))',
        border: 'hsla(var(--border))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        foreground: 'hsl(var(--foreground))',
        input: 'hsl(var(--input))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        ring: 'hsl(var(--ring))',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        success: 'hsl(var(--success))',
        error: 'hsl(var(--error))',
        warning: 'hsl(var(--warning))',
      },
      fontFamily: {
        // Allay Property Management Typography (Next.js font variables)
        heading: ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
        body: ['var(--font-open-sans)', 'Open Sans', 'sans-serif'],

        // Default Geist fonts (preserved for admin/UI)
        mono: ['var(--font-geist-mono)'],
        sans: ['var(--font-geist-sans)'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(201, 169, 97, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(201, 169, 97, 0.6)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--text)',
            '--tw-prose-headings': 'var(--text)',
            h1: {
              fontSize: '3.5rem',
              fontWeight: 'normal',
              marginBottom: '0.25em',
            },
          },
        },
      }),
    },
  },
}
