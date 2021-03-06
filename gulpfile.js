var gulp = require('gulp'),
  htmlmin = require('gulp-htmlmin'),
  cleanCSS = require('gulp-clean-css'),
  uglify = require('gulp-uglify'),
  pump = require('pump'),
  concat = require('gulp-concat'),
  sass = require('gulp-sass'),
  imagemin = require('gulp-imagemin'),
  autoprefixer = require('gulp-autoprefixer'),
  plumber = require('gulp-plumber'),
  browserSync = require('browser-sync'),
  pug = require('gulp-pug');

var htmlSource = 'source/*.html',
  htmlDestination = 'build/',
  jekyllHtmlSource = 'website/*.html',
  pugSource = 'source/pug/*.pug',
  cssVendorSource = 'source/css/*.css',
  sassSource = 'source/sass/**/*.sass',
  cssDestination = 'build/assets/css/',
  jsVendorSource = 'source/js/vendors/*.js',
  jsAppSource = 'source/js/*.js',
  jsDestination = 'build/assets/js/',
  jsonSource = 'source/js/json/*.json',
  jsonDestination = 'build/assets/js/json/',
  imgSource = 'source/img/*',
  imgDestination = 'build/assets/img/',
  faviconSource = 'source/favicon/*',
  faviconDestination = 'build/assets/favicon/';

//Copy Jekyll File to source folder
gulp.task('jekyll', function() {
  gulp
    .src(jekyllHtmlSource)
    .pipe(plumber())
    .pipe(
      htmlmin({
        collapseWhitespace: true
      })
    )
    .pipe(gulp.dest('source/'));
});

//pug Task
gulp.task('pug', function() {
  return gulp
    .src(pugSource)
    .pipe(pug())
    .pipe(
      htmlmin({
        collapseWhitespace: true
      })
    )
    .pipe(gulp.dest(htmlDestination));
});

// html minify and copy to build folder
gulp.task('html', function() {
  gulp
    .src(htmlSource)
    .pipe(plumber())
    .pipe(
      htmlmin({
        collapseWhitespace: true
      })
    )
    .pipe(gulp.dest(htmlDestination));
});

//Minify Vendor Css and Concat them
gulp.task('minify-css', () => {
  return gulp
    .src(cssVendorSource)
    .pipe(plumber())
    .pipe(
      autoprefixer({
        browsers: ['cover 99.5%']
      })
    )
    .pipe(
      cleanCSS({
        compatibility: 'ie8'
      })
    )
    .pipe(concat('vendors.css'))
    .pipe(gulp.dest(cssDestination));
});

//sass
gulp.task('sass', function() {
  return gulp
    .src(sassSource)
    .pipe(plumber())
    .pipe(
      sass({
        outputStyle: 'compressed'
      })
    )
    .pipe(concat('style.css'))
    .pipe(gulp.dest(cssDestination));
});

//vendor js
gulp.task('vendorjs', function(cb) {
  pump(
    [
      gulp.src(jsVendorSource),
      plumber(),
      concat('vendors.js'),
      uglify(),
      gulp.dest(jsDestination)
    ],
    cb
  );
});

//app js
gulp.task('appjs', function(cb) {
  pump(
    [gulp.src(jsAppSource), plumber(), uglify(), gulp.dest(jsDestination)],
    cb
  );
});

//JSON Task
gulp.task('json', function() {
  gulp.src(jsonSource).pipe(gulp.dest(jsonDestination));
});

//image minify
gulp.task('img-minify', () => {
  gulp
    .src(imgSource)
    .pipe(imagemin())
    .pipe(plumber())
    .pipe(gulp.dest(imgDestination));
});

//favicon minify
gulp.task('favicon', () => {
  gulp
    .src(faviconSource)
    .pipe(imagemin())
    .pipe(plumber())
    .pipe(gulp.dest(faviconDestination));
});

//watch task
gulp.task('watch', function() {
  browserSync.init({
    server: {
      baseDir: './build'
    },
    notify: false
  });

  gulp.watch(jekyllHtmlSource, ['jekyll']);
  gulp.watch(pugSource, ['pug']);
  gulp.watch(htmlSource, ['html']);
  gulp.watch(cssVendorSource, ['minify-css']);
  gulp.watch(jsVendorSource, ['vendorjs']);
  gulp.watch(jsAppSource, ['appjs']);
  gulp.watch(jsonSource, ['json']);
  gulp.watch(imgSource, ['img-minify']);
  gulp.watch(faviconSource, ['favicon']);
  gulp.watch(sassSource, ['sass']);
  gulp
    .watch([
      'build/*.html',
      'build/assets/css/*.css',
      'build/assets/js/*.js',
      'build/assets/js/json/*.json',
      'build/assets/img/*',
      'build/assets/favicon/*'
    ])
    .on('change', browserSync.reload);
});

// Gulp Default Task
gulp.task('default', [
  'jekyll',
  'pug',
  'html',
  'minify-css',
  'vendorjs',
  'appjs',
  'json',
  'img-minify',
  'favicon',
  'sass',
  'watch'
]);
