/*!
 * speedt-mysql
 * Copyright(c) 2014 speedt <13837186852@qq.com>
 * MIT Licensed
 */
'use strict';

var gulp = require("gulp");
var babel = require("gulp-babel");
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');

gulp.task("clean", () => {
  return gulp.src("dist/*").pipe(clean({ force: true }));
});

gulp.task("default", ['copy'], () => {
  return gulp.src("src/**/*.js")
             .pipe(babel())
             .pipe(uglify())
             .pipe(gulp.dest("dist"));
});

gulp.task("copy", () => {
  return gulp.src("src/package.json")
             .pipe(gulp.dest("dist"));
});