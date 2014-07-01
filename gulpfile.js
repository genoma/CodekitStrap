var gulp = require('gulp');
var less = require('gulp-less');
var rename = require('gulp-rename');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');
var browserSync = require('browser-sync');
var changed = require('gulp-changed');
var rimraf = require('gulp-rimraf');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');

var onError = function (err) {
  gutil.beep();
  console.log(err);
};

// compile CoffeeScript
gulp.task('coffee', function() {
    var stream = gulp.src('./coffeescript/*.coffee')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(changed('./coffeescript/*.coffee'))
    .pipe(coffee())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./js/'))
    .pipe(browserSync.reload({stream:true}));
    return stream;
});

// compile your custom plugins in CoffeeScript
gulp.task('coffee-plugins', function() {
  var stream = gulp.src('./p_coffeescript/*.coffee')
    .pipe(plumber())
    .pipe(changed('./p_coffeescript/*.coffee'))
    .pipe(coffee())
    .pipe(gulp.dest('./js/plugins/'))
    .pipe(browserSync.reload({stream:true}));
    return stream;
});

// Compile your less files
gulp.task('less', function () {
  var stream = gulp.src('./less/global.less')
    .pipe(plumber())
    .pipe(changed('./less/**/*.*'))
    .pipe(less())
    .pipe(rename('app.css'))
    .pipe(gulp.dest('./css/'))
    .pipe(browserSync.reload({stream:true}));
    return stream;
});

// Minify CSS file
gulp.task('minify-css', function() {
    var stream = gulp.src('./css/app.css')
      .pipe(minifycss())
      .pipe(rename('app.min.css'))
      .pipe(gulp.dest('./css/'));
    return stream;
});

// Minify your main javascript file
gulp.task('compress-js', function() {
    var stream = gulp.src('./js/app.js')
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('./js/'));
    return stream;
});

// Create a variable array with all the files needed by your webpages, in this case the index
var htmlFilesIndex = ['./templates/base/meta/index.html', './templates/base/header.html', './templates/index.html', './templates/base/footer.html'];

// this is an ideal about page which is made with the global header, footer, a custom content and a custom meta html
// var htmlFilesAbout = ['./templates/base/meta/about.html', './templates/base/header.html', './templates/index.html', './templates/base/footer.html'];

// build pages with provided files
gulp.task('build-html', function() {
    gulp.src(htmlFilesIndex)
    .pipe(changed('./templates/*.html'))
    .pipe(concat('index.html'))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.reload({stream:true}));

    // gulp.src(yourHtmlFiles)
    // .pipe(changed('./templates/*.html'))
    // .pipe(concat('about.html'))
    // .pipe(gulp.dest('./'))
    // .pipe(browserSync.reload({stream:true}));
});

// clean the dist folder
gulp.task('clean', function() {
  return gulp.src('dist', { read: false })
    .pipe(rimraf());
});

// Move the needed files and folders into a dist folder which can be deployed to the webserver
gulp.task('move', ['clean'], function() {
  var stream = gulp.src(['./bower_components/**/*.*', './css/**/*.*', './js/**/*.*', './*.html', './images/**/*.*'], { base: './' })
  .pipe(gulp.dest('dist'));
  return stream;
});

// Modify into the dist folder the html files
// to use the minified CSS and JS sources
gulp.task('dist-changes', ['move'], function() {
  var stream = gulp.src(['./dist/*.html'])
  .pipe(replace('app.css', 'app.min.css'))
  .pipe(gulp.dest('dist/'))
  .pipe(replace('app.js', 'app.min.js'))
  .pipe(gulp.dest('dist/'));
  return stream;
});

// browser-sync serve the work to
// your browser of choice
gulp.task('browser-sync', function() {
    browserSync.init(null, {
      server: {
        baseDir: "./"
      }
    });
});


// Final tasks
gulp.task('dist', ['dist-changes']);

gulp.task('build', ['minify-css', 'compress-js']);

gulp.task('default', ['browser-sync'], function() {
  gulp.watch('./coffeescript/*.coffee', ['coffee']);
  gulp.watch('./p_coffeescript/*.coffee', ['coffee-plugins']);
  gulp.watch('./less/*.less', ['less']);
  gulp.watch('./templates/**/*.*', ['build-html']);
});
