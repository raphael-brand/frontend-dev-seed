var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var bsConfig = require('./bs-config.json');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var uglifyjs = require('gulp-uglifyjs');
var concat = require('gulp-concat');
var prefix = require('gulp-autoprefixer');


var prefixerOptions = {
  browsers: ['last 2 versions']
};

/**
 * Compile pug files into HTML
 */
gulp.task('templates', function () {

  var YOUR_LOCALS = {
    "message": "This app is powered by gulp.pug recipe for BrowserSync"
  };

  return gulp.src('./app/*.pug')
    .pipe(pug({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./dist/'));
});

/**
 * Important!!
 * Separate task for the reaction to `.pug` files
 */
gulp.task('pug-watch', ['templates'], reload);

gulp.task('css-vendor', function () {
  return gulp.src([
    'bower_components/bootstrap-sass-no-js/vendor/assets/stylesheets/bootstrap.scss'
  ])
    .pipe(sass()).on('error', sass.logError)
    .pipe(gulp.dest('./dist/css'));
});
/**
 * Sass task for live injecting into all browsers
 */
gulp.task('sass', function () {
  return gulp.src([
    './app/sass/**/*.sass'])
    .pipe(sass({outputStyle: 'expanded'})).on('error', sass.logError)
    .pipe(prefix(prefixerOptions))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('sass-watch', ['sass'], reload);

gulp.task('js-vendor', function () {
  return gulp.src(['bower_components/requirejs/require.js'])
        .pipe(uglifyjs())
        .pipe(gulp.dest('./dist/js'))
});

gulp.task('js', function () {
  return gulp.src(['app/js/main.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./dist/js'))
});

gulp.task('js-watch', ['js'], reload);

gulp.task('vendor-scripts', ['js-vendor', 'css-vendor']);

/**
 * Serve and watch the scss/pug files for changes
 */
gulp.task('default', ['sass', 'js', 'templates'], function () {

  browserSync(bsConfig);
  gulp.watch('./app/js/*.js', ['js-watch'], reload);
  gulp.watch('./app/sass/**/*.sass', ['sass-watch'], reload);
  gulp.watch('./app/*.pug', ['pug-watch'], reload);
});
