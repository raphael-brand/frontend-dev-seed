var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var bsConfig = require('./bs-config.json');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var uglify = require('gulp-uglify');
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

gulp.task('json', function () {
  return gulp.src(['./app/js/data.json'])
    .pipe(gulp.dest('./dist/js'))
})

gulp.task('css-vendor', function () {
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
    .pipe(sass({ outputStyle: 'expanded' })).on('error', sass.logError)
    .pipe(prefix(prefixerOptions))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(reload({ stream: true }));
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

gulp.task('js-watch', ['js'], reload);

gulp.task('vendor-scripts', ['js-vendor', 'css-vendor']);

/**
 * Serve and watch the scss/pug files for changes
 */
gulp.task('default', ['sass', 'js', 'templates', 'json'], function () {

  browserSync(bsConfig);
  gulp.watch('./app/js/*.js', ['js-watch'], reload);
  gulp.watch('./app/sass/**/*.sass', ['sass-watch'], reload);
  gulp.watch('./app/*.pug', ['pug-watch'], reload);
});
