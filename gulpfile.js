'use strict';

var bowerFiles = require('main-bower-files');
var concat = require('gulp-concat');
var del = require('del');
var eslint = require('gulp-eslint');
var gls = require('gulp-live-server');
var gulp = require('gulp');
var inject = require('gulp-inject');
var minifyCss = require('gulp-clean-css');
var ngAnnotate = require('gulp-ng-annotate');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

var cssFilesToInject = [
  'www/lib/**/*.css',
  'www/css/**/*.css'  
];
var cssMinFilesToInject = [
  'www/css/**/*.min.css'
];
var jsFilesToInject = [
  'www/lib/angular.js',
  'www/lib/**/*.js',
  'www/app/module.js',
  'www/app/**/module.js',
  '!www/app/**/controller.js',
  'www/app/**/*.js'
];
var jsMinFilesToInject = [
  'www/js/**/*.min.js'
];

gulp.task('compile', function onBuild(done) {
  runSequence(
    'clean', 'eslint',
    ['bower', 'copy:fonts', 'sass'],
    'inject', 'watch', done
  );
});

gulp.task('compile:prod', function onBuildProd(done) {
  runSequence(
    'clean', 'eslint', 'bower', 'copy:fonts',
    'sass:prod', 'js:prod', 'inject:prod', done
  );
});

gulp.task('bower', function onBower(done) {
  gulp.src(bowerFiles())
    .pipe(gulp.dest('www/lib/'))
    .on('end', done);
});

gulp.task('clean', function onClean(done) {
  del.sync([
    'www/css', 'www/js', 'www/lib'
  ]);
  done();
});

gulp.task('copy:fonts', function onCopyFonts(done) {
  runSequence([
    'copy:fonts-roboto',
    'copy:fonts-fa',
    'copy:fonts-md-icon'
  ], done);
});

gulp.task('copy:fonts-fa', function onCopy(done) {
  var src = ['bower_components/font-awesome/fonts/*'];
  var dest = 'www/fonts/FontAwesome';
  del([dest]).then(function onDel() {
    return gulp.src(src)
      .pipe(gulp.dest(dest))
      .on('end', done);
  });
});

gulp.task('copy:fonts-roboto', function onCopy(done) {
  var src = ['bower_components/roboto-fontface/fonts/Roboto/**/*'];
  var dest = 'www/fonts/Roboto';
  del([dest]).then(function onDel() {
    return gulp.src(src)
      .pipe(gulp.dest(dest))
      .on('end', done);
  });
});

gulp.task('copy:fonts-md-icon', function onCopy(done) {
  var src = ['bower_components/material-design-icons/iconfont/*'];
  var dest = 'www/fonts/MaterialIcons';
  del([dest]).then(function onDel() {
    return gulp.src(src)
      .pipe(gulp.dest(dest))
      .on('end', done);
  });
});

gulp.task('eslint', function onEslint() {
  return gulp.src(['www/app/**/*.js', '!www/app/**/*min.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .on('error', function onError() {
      process.exit(1);
    });
});

gulp.task('inject', function onInject(done) {
  gulp.src('www/index.html')
    .pipe(inject(gulp.src(cssFilesToInject, { read: false }), { relative: true, name: 'style', empty: true }))
    .pipe(inject(gulp.src(jsFilesToInject, { read: false }), { relative: true, name: 'script', empty: true }))
    .pipe(gulp.dest('www'))
    .on('end', done);
});

gulp.task('inject:prod', function onInjectProd(done) {
  gulp.src('www/index.html')
    .pipe(inject(gulp.src(cssMinFilesToInject, { read: false }), { relative: true, name: 'style', empty: true }))
    .pipe(inject(gulp.src(jsMinFilesToInject, { read: false }), { relative: true, name: 'script', empty: true }))
    .pipe(gulp.dest('www'))
    .on('end', done);
});

gulp.task('js:prod', function onJsProd(done) {
  gulp.src(jsFilesToInject)
    .pipe(concat('app.min.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('www/js/'))
    .on('end', done);
});

gulp.task('sass', function onSass(done) {
  gulp.src('scss/app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('www/css/'))
    .on('end', done);
});

gulp.task('sass:prod', function onSassProd(done) {
  gulp.src('scss/app.scss')
    .pipe(sass())
    .pipe(minifyCss({ specialComments: 0, processImport: 0 }))
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest('www/css/'))
    .on('end', done);
});

gulp.task('serve', ['compile'], function onServe() {
  gls.new('app.js').start();
});

gulp.task('serve:prod', function onServe() {
  gls.new('app.js').start();
});

gulp.task('watch', function onWatch() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
  gulp.watch(jsFilesToInject, ['inject'])
    .on('error', function onError(error) {
      if (/enoent/i.test(error.code));
    });
});

gulp.task('default', ['serve', 'watch']);
gulp.task('build', ['compile:prod']);
