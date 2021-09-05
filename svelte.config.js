const sveltePreprocess = require('svelte-preprocess');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
  compilerOptions: {
    dev: !prod
  },
  emitCss: prod,
  hotReload: !prod,
  preprocess: sveltePreprocess({ 
    sourceMap: !prod,
    scss: {
      prependData:  `@import "src/styles/variables.scss";`,
    },
    // postcss
    // npm i -D postcss autoprefixer postcss-loader  브라우저 벤더 접두사 추가해주는 것 논의필요
  }),
}
