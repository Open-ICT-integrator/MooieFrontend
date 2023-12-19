module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        'width': 'width'
      },
      transitionDuration: {
        '0': '0ms',
        '400': '400ms',
        '800': '800ms',
      },
      borderWidth: {
        '1': '1px',
      },
      borderRadius: {
        'standard': '3px',
      },
      padding: {
        '10': '10px',
        '12': '12px',
        '15': '15px',
        '25': '25px',
      },
      spacing: {
        xs: '1px',
        s: '10px',
        m: '15px',
        l: '20px',
        xl: '25px',
       }
    },
    colors: {
      'base-bg': '#f9fbfc',
      'red-100': '#ff4041',
      'red-200': '#d53031',
      'red-300': '#270a02',
      'red-400': '#381005',
      'red-dark-100': '#371f1f',
      'blue-100': '#2173f2',
      'blue-700': '#1863d3',
      'blue-light': '#123367',
      'blue-light-100': '#f5f9ff',
      'blue-hu': '#00a1e1',
      'blue-hu-hov': '#0088c8',
      'grey-100': '#dfe3e6',
      'white': '#ffffff',
      'black': '#000000',
      'grey-200': '#f6f8fa',
      'grey-700': '#6e798c',
      'grey-600': '#989eae',
      'yellow-100': '#ffe87a',
      'base-font-dark': '#464748',
      'border-grey-100': '#dfe2e6',
      'green': '#16a34a',
      'orange': "#fb923c",
      'dark-300': '#161b22',
      'dark-400': '#0d1117',
      'dark-500': '#30363d',
    },
  },
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
  plugins: [],
}