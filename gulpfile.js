var gulp = require('gulp');
var del = require('del');

// Clean the dist folder
gulp.task('clean', function(cb) {
   return del(['dist'], cb);
});

// Move the needed files and folders into a dist folder which can be deployed to the webserver
gulp.task('dist', ['clean'], function() {
  gulp.src(['./bower_components/**/*.*', './css/**/*.*', './js/**/*.*', './*.html', './templates/**/*.*', './images/**/*.*', './.htaccess', './fonts/**/*.*', './functions/**/*.*', './contents/**/*.*'], { base: './' })
  .pipe(gulp.dest('dist'));
});


// Copy Bootstrap Js's to the root project folder
gulp.task('pre-prepare', function(cb) {
  var pre = gulp.src(['./bootstrap/js/**/*.*/'], {base: './bootstrap/js'})
  .pipe(gulp.dest('js'));
  return pre;
});

// Copy fonts folder to the root project folder
gulp.task('font-prepare', function(cb) {
  var font = gulp.src(['./bootstrap/fonts/**/*.*/'], {base: './bootstrap/fonts'})
  .pipe(gulp.dest('fonts'));
  return font
});

// Delete the tests folder from js/
gulp.task('prepare', ['pre-prepare', 'font-prepare'], function() {
  return del(['./js/tests']);
});

// Call tasks
//
// `$ gulp prepare` after a bootstrap update copies all the relevant files to the root project folder
// `$ gulp dist` copies relevant files to the dist folder ready to be deployed into a server
