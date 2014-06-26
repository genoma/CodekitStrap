var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var rename = require('gulp-rename');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var uncss = require('gulp-uncss');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var replace = require('gulp-replace');
var browserSync = require('browser-sync');
var changed = require('gulp-changed');

gulp.task('coffee', function() {
    var stream = gulp.src('./coffeescript/*.coffee')
    .pipe(changed('./coffeescript/*.coffee'))
    .pipe(coffee())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./js/'))
    .pipe(browserSync.reload({stream:true}));
    return stream;
});

gulp.task('coffee-plugins', function() {
  var stream = gulp.src('./p_coffeescript/*.coffee')
    .pipe(changed('./p_coffeescript/*.coffee'))
    .pipe(coffee())
    .pipe(gulp.dest('./js/plugins/'))
    .pipe(browserSync.reload({stream:true}));
    return stream;
});

gulp.task('less', function () {
  var stream = gulp.src('./less/global.less')
    .pipe(changed('./less/**/*.*'))
    .pipe(less())
    .pipe(rename('app.css'))
    .pipe(gulp.dest('./css/'))
    .pipe(browserSync.reload({stream:true}));
    return stream;
});

gulp.task('clean-css', function(cb) {
  gulp.src('./css/app.css')
  .pipe(uncss({
    html: ['index.html']
  }))
  .pipe(gulp.dest('./css/'));
  cb();
});

gulp.task('minify-css', ['clean-css'], function() {
    var stream = gulp.src('./css/app.css')
      .pipe(minifycss())
      .pipe(rename('app.min.css'))
      .pipe(gulp.dest('./css/'));
    return stream;
});

gulp.task('compress-js', function() {
    var stream = gulp.src('./js/app.js')
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('./js/'));
    return stream;
});


var htmlFilesIndex = ['./templates/base/meta/index.html', './templates/base/header.html', './templates/index.html', './templates/base/footer.html'];

gulp.task('build-index', function() {
    var stream = gulp.src(htmlFilesIndex)
    .pipe(changed('./templates/*.html'))
    .pipe(concat('index.html'))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.reload({stream:true}));
  return stream;
});


gulp.task('clean', function() {
  return gulp.src(['./dist/*'], { read:false })
  .pipe(clean());
});

gulp.task('move', ['clean'], function() {
  var stream = gulp.src(['./bower_components/**/*.*', './css/**/*.*', './js/**/*.*', './*.html'], { base: './' })
  .pipe(gulp.dest('dist'));
  return stream;
});

gulp.task('dist-changes', ['move'], function() {
  var stream = gulp.src(['./dist/*.html'])
  .pipe(replace('app.css', 'app.min.css'))
  .pipe(gulp.dest('dist/'))
  .pipe(replace('app.js', 'app.min.js'))
  .pipe(gulp.dest('dist/'));
  return stream;
});

gulp.task('browser-sync', function() {
    browserSync.init(null, {
      server: {
        baseDir: "./"
      }
    });
});


gulp.task('dist', ['dist-changes']);

gulp.task('build', ['minify-css', 'compress-js']);

gulp.task('default', ['browser-sync'], function() {
  gulp.watch('./coffeescript/*.coffee', ['coffee'])
  gulp.watch('./p_coffeescript/*.coffee', ['coffee-plugins'])
  gulp.watch('./less/*.less', ['less'])
  gulp.watch('./templates/**/*.*', ['build-index'])
});
