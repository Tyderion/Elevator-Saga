var gulp = require('gulp');
var gulpImports = require('gulp-imports');
var rename = require("gulp-rename");
var beautify = require('gulp-beautify');
var watch = require('gulp-watch');

gulp.task('imports', function() {
    gulp.src(['main.js'])
        .pipe(gulpImports())
        .pipe(beautify({indentSize: 4}))
        .pipe(rename('saga.js'))
        .pipe(gulp.dest('output'));
});

gulp.task('default', function() {
    gulp.start('imports');
});

gulp.task('watch', function() {
	gulp.watch('*.js', ['imports']);
})
