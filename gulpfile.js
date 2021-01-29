var gulp = require('gulp');
var scss = require('gulp-sass');
var paths = require('./paths');

var compileScss = function (end) {
  gulp.src(paths.scss.src).pipe(scss()).pipe(gulp.dest(paths.scss.dest));
  end();
};

var compileJs = function (end) {
  gulp.src(paths.scripts.src).pipe(gulp.dest(paths.scripts.dest));
  end();
};

//compile files for frontend
var startFe = gulp.series([compileScss, compileJs]);

//task for all watchers
var watch = function (end) {
  gulp.watch([paths.watch.scss, paths.watch.js], gulp.series([compileScss, compileJs]));
  end();
};

module.exports.default = gulp.series([startFe, watch]);
