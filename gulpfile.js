var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');


gulp.task('watch', function () {
    gulp.watch(['./application/less/*.less'], ['less']);
    //gulp.watch('*.html', notifyLiveReload);
    // gulp.watch('css/*.css', notifyLiveReload);
});

gulp.task('less', function () {
  return gulp.src('./application/less/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./application/css'));
});