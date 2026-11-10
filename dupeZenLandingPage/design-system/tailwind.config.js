/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './design-system.html',
    './src/**/*.{js,ts,jsx,tsx,html}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
        writer: ['var(--font-writer)', 'sans-serif'],
      },
      colors: {
        zed: {
          bg: 'var(--background)',
          surface: 'var(--surface-background)',
          elevated: 'var(--elevated_surface-background)',
          panel: 'var(--panel-background)',
          border: 'var(--border)',
          'border-focus': 'var(--border-focused)',
          'border-selected': 'var(--border-selected)',
          text: 'var(--text)',
          'text-muted': 'var(--text-muted)',
          'text-accent': 'var(--text-accent)',
          icon: 'var(--icon)',
          'icon-muted': 'var(--icon-muted)',
          
          /* Semantic Status */
          info: 'var(--info)',
          'info-bg': 'var(--info-background)',
          success: 'var(--success)',
          'success-bg': 'var(--success-background)',
          warning: 'var(--warning)',
          'warning-bg': 'var(--warning-background)',
          error: 'var(--error)',
          'error-bg': 'var(--error-background)',
          
          /* Accents */
          blue: '#5c78e2',
          cyan: '#6eb4bf',
          purple: '#b477cf',
          green: '#a1c181',
          amber: '#dec184',
          red: '#d07277',
        },
        editor: {
          bg: 'var(--editor-background)',
          fg: 'var(--editor-foreground)',
          gutter: 'var(--editor-gutter-background)',
          'active-line': 'var(--editor-active_line-background)',
          'highlight-line': 'var(--editor-highlighted_line-background)',
          'line-number': 'var(--editor-line_number)',
          'active-line-number': 'var(--editor-active_line_number)',
          'wrap-guide': 'var(--editor-wrap_guide)',
          'indent-guide': 'var(--editor-indent_guide)',
        },
        syntax: {
          keyword: 'var(--syntax-keyword-color)',
          function: 'var(--syntax-function-color)',
          string: 'var(--syntax-string-color)',
          number: 'var(--syntax-number-color)',
          comment: 'var(--syntax-comment-color)',
          operator: 'var(--syntax-operator-color)',
          type: 'var(--syntax-type-color)',
          variable: 'var(--syntax-variable-color)',
          property: 'var(--syntax-property-color)',
          constant: 'var(--syntax-constant-color)',
        },
        player: {
          0: 'var(--players-0-cursor)',
          1: 'var(--players-1-cursor)',
          2: 'var(--players-2-cursor)',
          3: 'var(--players-3-cursor)',
          4: 'var(--players-4-cursor)',
          5: 'var(--players-5-cursor)',
          6: 'var(--players-6-cursor)',
          7: 'var(--players-7-cursor)',
        }
      },
      borderRadius: {
        'xs': 'var(--radius-xs)',
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
      },
      boxShadow: {
        'zed-subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'zed-panel': '0 4px 20px -2px rgba(0, 0, 0, 0.25)',
        'zed-dropdown': '0 10px 30px -4px rgba(0, 0, 0, 0.35)',
        'zed-glow': '0 0 40px -10px rgba(92, 120, 226, 0.25)',
      }
    }
  },
  plugins: []
};
