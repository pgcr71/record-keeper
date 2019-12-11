var gulp = require('gulp');
var scss = require('gulp-sass');
var nodemon = require('gulp-nodemon')
// scss.compiler = require('node-sass');
    
gulp.task('compile-scss', function () {
    return gulp.src('./src/styles.scss')
        .pipe(scss())
        .pipe(gulp.dest('dest'))
})

gulp.task('start-server',function(){
   return nodemon({
        script: './src/backend/server.js',
        watch: ["./src/backend/server.js"],
        ext: 'js'
    }).on('restart', () => {
    gulp.src('./src/backend/server.js');
  });
})

gulp.task('scss:watch',function(){
    return gulp.watch('./src/scss/**/*.scss', gulp.series(['compile-scss']))
})

gulp.task('watch', gulp.series(['compile-scss','start-server','scss:watch']))

