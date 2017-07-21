var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var bsConfig = require('./bs-config.json');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var uglifyjs = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');

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
  //console.log('bootstrap not used ...');
  return gulp.src([
    'node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss'
  ])
    .pipe(sass()).on('error', sass.logError)
    .pipe(gulp.dest('./dist/css'))
    .pipe(reload({ stream: true }));
});
/**
 * Sass task for live injecting into all browsers
 */
gulp.task('sass', function () {
  return gulp.src([
    './app/sass/**/*.sass'])
    .pipe(sass()).on('error', sass.logError)
    .pipe(gulp.dest('./dist/css'))
    .pipe(reload({ stream: true }));
});

gulp.task('js-vendor', function () {

  var vendorConfig = require('./vendor.json');
  if (!vendorConfig ||
    (typeof vendorConfig.js.src == 'string' || vendorConfig.js.src.length === 0)) {
    throw new Error('no vendor scripts added. \nvendor.json:\nuse src["file.a.js"]')
  }
  vendorConfig.js.src.map((value) => {
    console.log('Building', value, '...');
    let suffix = ''
    suffix = (!/\.min/.test(value) ? '.min' : '');
    
    gulp.src(value)
      .pipe(uglifyjs({ output: { comments: /^!|@preserve|@?license|@cc_on/i } }))
      .pipe(rename({ "suffix": suffix }))
      .pipe(gulp.dest(vendorConfig.js.dest))
  });
});

gulp.task('js', function () {
  return gulp.src([
    'app/js/**/*.js']
  )
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(reload({ stream: true }))
});

gulp.task('vendor-scripts', ['templates', 'js-vendor'], reload);

/**
 * Serve and watch the scss/pug files for changes
 */
gulp.task('default', ['sass', 'js', 'templates'], function () {

  browserSync(bsConfig);
  gulp.watch('./app/js/**/*.js', ['js'], reload);
  gulp.watch('./app/sass/**/*.sass', ['sass'], reload);
  gulp.watch('./app/*.pug', ['pug-watch'], reload);
});
