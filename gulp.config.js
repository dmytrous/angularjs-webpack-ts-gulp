module.exports = function () {
  let config = {
    path: {
      src: './src/',
      build: './build/',
      dev: './dev/',
    },
    dir: {
      app: 'app/',
      js: 'js/',
      css: 'css/',
    },
    entry: {
      main: 'app.ts',
    },
  };
  return config;
};
