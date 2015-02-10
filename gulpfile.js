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


// Prepare the project after a
// Bootstrap submodule update

gulp.task('pre-prepare', function(cb) {
  var pre = gulp.src(['./bootstrap/js/**/*.*/'], {base: './bootstrap/js'})
  .pipe(gulp.dest('js'));
  return pre;
});

gulp.task('font-prepare', function(cb) {
  var font = gulp.src(['./bootstrap/fonts/**/*.*/'], {base: './bootstrap/fonts'})
  .pipe(gulp.dest('fonts'));
  return font
});

// Delete the tests folder
gulp.task('prepare', ['pre-prepare', 'font-prepare'], function() {
  return del(['./js/tests']);
});

