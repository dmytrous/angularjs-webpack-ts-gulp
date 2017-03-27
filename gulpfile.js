const path = require('path');
const config = require('./gulp.config')();
const gulp = require('gulp');
const $ = require('gulp-load-plugins')({ lazy: true });
const webpack = require('webpack');
const gulpWebpack = require('gulp-webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const del = require('del');
const sass = require('gulp-sass');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync');
const chokidar = require('chokidar');

/**Tasks
 *   Scripts
 *   HTML
 *   CSS
 *   ASSETS
 *   HELPERS
 *   WATCHERS
 *   COMMON
 */

// Scripts task
gulp.task('webpack', () => {
  return gulp.src(config.path.src)
      .pipe(gulpWebpack(require('./webpack.config.js'), webpack, () => {
        process.env.NODE_ENV = 'development' ? browserSync.reload() : false;
      }))
      .pipe(gulp.dest(`${config.path.dev}${config.dir.js}`));
});

// HTML
gulp.task('html', () => {
  return gulp.src(`${config.path.src}**/*.html`)
      .pipe(gulp.dest(config.path.dev));
});

// CSS
gulp.task('css:compile', () => {
  return gulp.src(`${config.path.src}${config.dir.css}*.scss`)
      .pipe($.sourcemaps.init())
      .pipe($.sass({
        outputStyle: 'expanded',
        precision: 10,
      }))
      .pipe($.autoprefixer({ browsers: 'last 2 version' }))
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest(`${config.path.dev}${config.dir.css}`));
});

// Helpers tasks
gulp.task('clean', () => {
  del(config.path.dev);
  del(config.path.build);
});

gulp.task('clean:dev', () => {
  del.sync(config.path.dev);
});

gulp.task('set:dev', () => {
  return process.env.NODE_ENV = 'development';
});

gulp.task('set:prod', () => {
  return process.env.NODE_ENV = 'production';
});

// Static Server + watching scss/html files
gulp.task('serve', () => {

  if (process.env.NODE_ENV !== 'development') {
    return;
  };

  let compiler = require('webpack');
  let webpackConfig = require('./webpack.config');

  browserSync.init({
    server: './dev',
    port: 3004,
    open: false,
    middleware: [
      webpackDevMiddleware(compiler, {
        // IMPORTANT: dev middleware can't access config, so we should
        // provide publicPath by ourselves
        publicPath: webpackConfig.output.publicPath,

        // pretty colored output
        stats: { colors: true }

        // for other settings see
        // http://webpack.github.io/docs/webpack-dev-middleware.html
      }),
    ],
  });
});

gulp.task('browser:reload', () => {
  browserSync.reload();
});

gulp.task('watch:html', () => {
  return chokidar.watch(`${config.path.src}*.html`)
      .on('change', () => {
        runSequence('html', 'browser:reload');
      });
});

gulp.task('watch:css', () => {
  return chokidar.watch(`${config.path.src}${config.dir.css}**/*.scss`)
      .on('change', () => {
        runSequence('css:compile', 'browser:reload');
      });
});

gulp.task('watch:js', () => {
  return chokidar.watch(`${config.path.dev}${config.dir.js}**/*.*.js`)
      .on('change', () => {
          console.log('RELLLL')
      });
});

// gulp.task('watch:dev', () => {
//   chokidar.watch(`${config.path.src}${config.dir.css}**/*.scss`)
//       .on('change', () => {
//         gulp.run('css:compile');
//         browserSync.reload();
//       });
//   gulp.watch(`${config.path.dev}${config.dir.js}main.bundle.js`, () => {
//     browserSync.reload();
//
//   });
//   chokidar.watch(`${config.path.src}*.html`)
//       .on('change', () => {
//         gulp.run('html');
//         browserSync.reload();
//       });
// });

// gulp.task('watch:js', () => {
//   chokidar.watch(`./dev/js/main.bundle.js`)
//       .on('change', () => {
//         console.log('SUKA');
//         browserSync.reload();
//       });
// });

// Common Tasks
gulp.task('dev', ['clean:dev'],
    () => {
  runSequence(
      ['set:dev'],
      ['html', 'css:compile', 'webpack', 'serve', 'watch:css', 'watch:html', 'watch:js']
  );
});

