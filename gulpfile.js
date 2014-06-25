var gulp = require('gulp');
var slim = require('gulp-slim');
var sass = require('gulp-ruby-sass');
var plumber = require('gulp-plumber');
var prefixer = require('gulp-autoprefixer');
var coffee = require('gulp-coffee');

gulp.task('slim', function(){
  gulp.src('*.slim')
    .pipe(plumber())
    .pipe(slim())
    .pipe(gulp.dest('.'));
});

gulp.task('sass', function(){
  gulp.src('css/*.sass')
    .pipe(plumber())
    .pipe(sass())
    .pipe(prefixer('last 2 version'))
    .pipe(gulp.dest('css'));
});

gulp.task('coffee', function(){
  gulp.src('js/*.coffee')
    .pipe(plumber())
    .pipe(coffee())
    .pipe(gulp.dest('js'));
});

gulp.task('default', ['slim', 'sass', 'coffee'], function(){
  gulp.watch('*.slim', ['slim']);
  gulp.watch('css/*.sass', ['sass']);
  gulp.watch('js/*.coffee', ['coffee']);
});
