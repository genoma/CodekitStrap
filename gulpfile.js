var gulp = require('gulp');
var del = require('del');

// Clean the dist folder
gulp.task('clean', function() {
   return del(['dist/*']);
});

// Move the needed files and folders into a dist folder which can be deployed to the webserver
gulp.task('move', ['clean'], function() {
  gulp.src(['./bower_components/**/*.*', './css/**/*.*', './js/**/*.*', './*.html', './templates/**/*.*', './images/**/*.*', './.htaccess'], { base: './' })
  .pipe(gulp.dest('dist'));
});


//
// FINAL TASKS
//

// PREPARE THE PROJECT AFTER A
// BOOTSTRAP SUBMODULE UPDATE

// Copy everything from Bootstrap to
// root JS folder
gulp.task('pre-prepare', function() {
  gulp.src(['./bootstrap/js/**/*.*/'], {base: './bootstrap/js'})
  .pipe(gulp.dest('js'));
});

// Delete the tests folder
gulp.task('post-prepare', function() {
  return del(['js/tests']);
});

// Assemble the final task
gulp.task('prepare', ['pre-prepare', 'post-prepare']);

gulp.task('dist', ['clean', 'move']);
