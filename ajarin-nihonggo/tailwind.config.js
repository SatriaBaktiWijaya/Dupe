/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"Lilex"', '"Zed Mono"', 'monospace'],
        japanese: ['"Hiragino Sans"', '"Meiryo"', '"Noto Sans JP"', 'sans-serif'],
      },
      colors: {
        zed: {
          bg: 'var(--background)',
          surface: 'var(--surface-background)',
          elevated: 'var(--elevated_surface-background)',
          panel: 'var(--panel-background)',
          element: 'var(--element-background)',
          'element-hover': 'var(--element-hover)',
          'element-active': 'var(--element-active)',
          border: 'var(--border)',
          'border-variant': 'var(--border-variant)',
          'border-focus': 'var(--border-focused)',
          text: 'var(--text)',
          'text-muted': 'var(--text-muted)',
          'text-accent': 'var(--text-accent)',
          accent: '#5c78e2',
          cyan: '#6eb4bf',
          purple: '#b477cf',
          green: '#a1c181',
          amber: '#dec184',
          red: '#d07277',
        },
        syntax: {
          keyword: 'var(--syntax-keyword-color)',
          fn: 'var(--syntax-function-color)',
          str: 'var(--syntax-string-color)',
          num: 'var(--syntax-number-color)',
          comment: 'var(--syntax-comment-color)',
          type: 'var(--syntax-type-color)',
          op: 'var(--syntax-operator-color)',
        }
      },
      borderRadius: {
        xs: 'var(--radius-xs, 2px)',
        sm: 'var(--radius-sm, 4px)',
        md: 'var(--radius-md, 6px)',
        lg: 'var(--radius-lg, 8px)',
        xl: 'var(--radius-xl, 12px)',
        '2xl': 'var(--radius-2xl, 16px)',
      },
      boxShadow: {
        'zed-subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'zed-panel': '0 4px 20px -2px rgba(0, 0, 0, 0.25)',
        'zed-glow': '0 0 30px -5px rgba(92, 120, 226, 0.25)',
      }
    },
  },
  plugins: [],
};

