var gulp = require('gulp');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var react = require('gulp-react');
var peg = require('gulp-peg');
var clean = require('gulp-clean');
var less = require('gulp-less');
var mocha = require('gulp-mocha');
var coffee = require('gulp-coffee');


var watching = false;
function onError(err) {
  if(watching) {
    this.emit('end');
  }
  else {
    console.log(err.toString());
  }
}


gulp.task('default', ['all']);

gulp.task('all',['browserify','styles','libs','test']);

gulp.task('browserify', ['bin'], function() {
  gulp.src('bin/main.js')
    .pipe(browserify({insertGlobals: true,debug: true,}))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
});

gulp.task('bin', function() {
  gulp.src('src/**/*.jsx')
    .pipe(react())
    .pipe(gulp.dest('bin'));
  gulp.src('src/**/*.js')
    .pipe(gulp.dest('bin'));
  gulp.src('src/**/*.mem')
    .pipe(gulp.dest('bin'));
  gulp.src('src/**/*.pegjs')
    .pipe(peg())
    .pipe(gulp.dest('bin'));
  gulp.src('src/**/*.coffee')
    .pipe(coffee())
    .on('error', onError)
    .pipe(gulp.dest('bin'));
});

gulp.task('styles',function() {
  gulp.src('src/main.less')
  .pipe(less())
  .pipe(gulp.dest('dist'));
});

gulp.task('libs',function() {
  gulp.src('lib/**/*.*')
    .pipe(gulp.dest('dist'));
});

gulp.task('clean',function() {
  gulp.src('bin/**/*.js',{read:false})
    .pipe(clean());
});

gulp.task ('test',['bin'],function() {
  gulp.src('test/**/*.js')
    .pipe(mocha({reporter:'spec'}))
    .on("error",onError);
});

gulp.task('watch',function() {
  watching=true;
  gulp.watch('src/**/*.*',['all','test']);
  gulp.watch('test/**/*.*',['test']);
});
