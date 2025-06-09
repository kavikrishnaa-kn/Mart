// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0a192f',
        electricYellow: '#ffe600',
        neonGreen: '#39ff14',
      },
      backgroundImage: {
        'tech-pattern': "url('/assets/bg-texture.png')", // optional textured bg
      },
    },
  },
  plugins: [],
};
