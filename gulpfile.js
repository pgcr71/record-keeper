var gulp = require('gulp');
var scss = require('gulp-sass');
// scss.compiler = require('node-sass');
    
gulp.task('compile-scss', function () {
    return gulp.src('./src/styles.scss')
        .pipe(scss())
        .pipe(gulp.dest('dest'))
})

gulp.task('scss:watch',function(){
    return gulp.watch('./src/scss/**/*.scss', gulp.series(['compile-scss']))
})

gulp.task('default', gulp.series(['compile-scss','scss:watch']))