
'use strict';

var gulp = require('gulp');
var bsConfig = require('./bs-config.json');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var uglifyjs = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');


var gulpLoadPlugins = require('gulp-load-plugins');
var _gulpLoadPlugins2 = _interopRequireDefault(gulpLoadPlugins);
var del = require('del');
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var gutil = require('gulp-util');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var $ = (0, _gulpLoadPlugins2.default)();

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
  console.log('bootstrap not used ...');
  return gulp.src([
    'node_modules/bootstrap-xxl/scss/bootstrap.scss'
  ])
    .pipe($.plumber())
    //.pipe($.sourcemaps.init())
    .pipe($.sass().on('error', $.sass.logError))
    //.pipe($.sourcemaps.write('.'))
    .pipe($.autoprefixer({browsers: ['last 1 version']}))
    .pipe($.rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/css'))
    .pipe($.minifyCss())
    .pipe(gulp.dest('./dist/css'))
});
/**
 * Sass task for live injecting into all browsers
 */
gulp.task('sass', function () {
  return gulp.src([
    './app/sass/*.sass'])
    .pipe(sass()).on('error', sass.logError)
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('sass-watch', ['sass'], reload);

gulp.task('js-vendor', function () {

  var vendorConfig = require('./vendor.json');
  if (!vendorConfig ||
    (typeof vendorConfig.js.src == 'string' || vendorConfig.js.src.length === 0)) {
    throw new Error('no vendor scripts added. \nvendor.json:\nuse src["file.a.js"]')
  }
  vendorConfig.js.src.map((value) => {
    console.log('Building', value, '...');
    var suffix = (!/\.min/.test(value) ? '.min' : '');
    
    gulp.src(value)
      .pipe(uglifyjs({ output: { comments: /^!|@preserve|@?license|@cc_on/i } }))
      .pipe(rename({ "suffix": suffix }))
      .pipe(gulp.dest(vendorConfig.js.dest))
  });
});

gulp.task('js', function () {
  return gulp.src([
    'app/js/test-module.js',
    'app/js/animation.js',
    'app/js/main.js']
  )
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./dist/js'))
});

gulp.task('vendor-scripts', ['js-vendor'], reload);

/**
 * Serve and watch the scss/pug files for changes
 */
gulp.task('default', ['sass', 'js', 'templates'], function () {

  browserSync(bsConfig);
  gulp.watch('./app/js/*.js', ['js-watch'], reload);
  gulp.watch('./app/sass/*.sass', ['sass-watch'], reload);
  gulp.watch('./app/*.pug', ['pug-watch'], reload);
});
