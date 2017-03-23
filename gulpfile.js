var gulp = require('gulp');
var pug = require('gulp-pug');
var stylus = require('gulp-stylus');

gulp.task('pug2html', function buildHTML(){
   return gulp.src('*.pug')
   .pipe(pug())
   .pipe(gulp.dest('.'));
});

gulp.task('stylus2css', function buildCSS(){
   return gulp.src('*.styl')
   .pipe(stylus())
   .pipe(gulp.dest('.'));
});

gulp.task('default', ['pug2html', 'stylus2css']);
