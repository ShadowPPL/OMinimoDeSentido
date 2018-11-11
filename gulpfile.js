var gulp = require('gulp');
var browserSync = require('browser-sync').create();

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function () {
  // Bootstrap
  gulp.src([
      './node_modules/bootstrap/dist/**/*',
      '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
      '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
    ])
    .pipe(gulp.dest('./vendor/bootstrap'));

  // jQuery
  gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('./vendor/jquery'));

});

// Configure the browserSync task
gulp.task('browserSync', function () {
  browserSync.init({
      server: {
          baseDir: "./",
      },
      port: 8080,
  });
});

gulp.task('watch',function () {
  gulp.watch(['./css/*.css'], browserSync.reload);
  gulp.watch(['./**/*.html'], browserSync.reload);
});

// Dev task
gulp.task('dev', gulp.parallel('browserSync', 'watch'));

// Default task
gulp.task('default',  gulp.series('vendor','dev'));
