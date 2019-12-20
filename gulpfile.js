var gulp = require('gulp');
var scss = require('gulp-sass');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();
var paths = require('./paths')

console.log(paths)
var serve = function () {
    browserSync.init({

    })
}

var reload =function (done) {
    server.reload();
    done();
}

var compileScss = function (end) {
    gulp.src(paths.scss.src)
        .pipe(scss())
        .pipe(gulp.dest(paths.scss.dest))
    end()
}

var compileJs = function (end) {
    gulp.src(paths.scripts.src)
        .pipe(gulp.dest(paths.scripts.dest))
    end()
}

//compile files for frontend
var startFe = gulp.series([compileScss, compileJs])

//task for all watchers
var watch = function (end) {
    gulp.watch([paths.watch.scss,paths.watch.js], gulp.series([compileScss,compileJs]));
    end()
};

var nm = function (end) {
    nodemon({
        script: './src/backend/server.js',
        watch: ["./src/backend/**/*.js"],
        ext: 'js'
    }).on('restart', () => {

    })
    end()
}

module.exports.default = gulp.series([startFe, watch, nm])

