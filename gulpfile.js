// TODO: Fix less compiler behaviour with something better than
// handleError(err) function.

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var del = require('del');

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

// compile CoffeeScrip    t
gulp.task('coffee', function() {
    var stream = gulp.src('./coffeescript/*.coffee')
    .pipe(sourcemaps.init())
    .pipe($.changed('./coffeescript/*.coffee'))
    .pipe($.coffee({bare: true}))
    // .pipe($.uglify())
    .pipe($.concat('app.js'))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('./js/'))
    .pipe(browserSync.reload({stream:true}));
    return stream;
});

// compile your custom plugins in CoffeeScript
gulp.task('coffee-plugins', function() {
  var stream = gulp.src('./p_coffeescript/*.coffee')
    .pipe(sourcemaps.init())
    .pipe($.changed('./p_coffeescript/*.coffee'))
    .pipe($.coffee({bare: true}))
    .pipe(sourcemaps.write('../../maps'))
    .pipe(gulp.dest('./js/plugins/'))
    .pipe(browserSync.reload({stream:true}));
    return stream;
});

// Compile your less files
gulp.task('less', function() {
  var stream = gulp.src('./less/global.less')
    .pipe(sourcemaps.init())
    .pipe($.changed('./less/**/*.*'))
    .pipe($.less()).on('error', handleError)
    .pipe($.autoprefixer("last 1 version", "> 1%", "ie 8", "ie 7", { cascade: true }))
    .pipe($.rename('app.css'))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('./css/'))
    .pipe(browserSync.reload({stream:true}))
    return stream;
});

// Clean the dist folder
gulp.task('clean', function() {
   return del(['dist/*']);
});

// Move the needed files and folders into a dist folder which can be deployed to the webserver
gulp.task('move', ['clean', 'minify'], function() {
  var stream = gulp.src(['./bower_components/**/*.*', './css/**/*.*', './js/**/*.*', './*.html', './images/**/*.*', './.htaccess'], { base: './' })
  .pipe(gulp.dest('dist'));
  return stream;
});

// browser-sync serve the work to
// your browser of choice
gulp.task('browser-sync', ['coffee', 'coffee-plugins', 'less'], function() {
  browserSync.init(['./*.html', './templates/*.html'], {
    server: {
      baseDir: "./"
    },
    ghostMode: {
      clicks: false,
      location: false,
      forms: false,
      scroll: false
    }
  });
});



//
// FINAL TASKS
//

// Minify and Uglify
gulp.task('minify', function() {
  gulp.src('./css/app.css')
    .pipe($.minifyCss())
    .pipe(gulp.dest('./css'));
  gulp.src('./js/app.js')
    .pipe($.uglify())
    .pipe(gulp.dest('./js/'))
});

gulp.task('dist', ['move']);

gulp.task('default', ['browser-sync'], function() {
  gulp.watch('./coffeescript/*.coffee', ['coffee']);
  gulp.watch('./p_coffeescript/*.coffee', ['coffee-plugins']);
  gulp.watch('./less/*.less', ['less']);
});
