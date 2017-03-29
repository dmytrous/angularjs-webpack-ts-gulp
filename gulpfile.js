const path = require('path');
const config = require('./gulp.config')();
const gulp = require('gulp');
const gutil = require('gulp-util');
const $ = require('gulp-load-plugins')({ lazy: true });
const webpack = require('webpack');
const gulpWebpack = require('gulp-webpack');
const del = require('del');
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
      .pipe(gulpWebpack(require('./webpack.config.js'), webpack, (err, stats) => {
        if (err) {
          throw new gutil.PluginError('webpack', err);
        }

        gutil.log('[webpack]', stats.toString({
          colors: true,
          chunks: false,
          errorDetails: true,
        }));

        process.env.NODE_ENV = 'development' ? browserSync.reload() : false;
      }))
      .pipe(gulp.dest(`${config.path.dev}${config.dir.js}`));
});

// HTML
gulp.task('html', () => {
  return gulp.src([`${config.path.src}*.html`])
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

//SET environment variable
gulp.task('set:dev', () => {
  return process.env.NODE_ENV = 'development';
});

gulp.task('set:prod', () => {
  return process.env.NODE_ENV = 'production';
});

// Development server
gulp.task('serve', () => {

  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  browserSync.init({
    startPath: 'index.html',
    server: {
      baseDir: './dev',
    },
    port: 3004,
    open: false,
  });
});

gulp.task('browser:reload', () => {
  browserSync.reload();
});

gulp.task('watch:html', () => {
  return chokidar.watch(`${config.path.src}**/*.html`)
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

// Common Tasks
gulp.task('dev', ['clean:dev'],
    () => {
      runSequence(
          ['set:dev'],
          ['html', 'css:compile', 'webpack', 'serve', 'watch:css', 'watch:html']
      );
    });

