'use strict';

var gulp = require('gulp'),
nodemon = require('gulp-nodemon'),
plugins = require('gulp-load-plugins')(),
wiredep = require('wiredep').stream,
inject = require('gulp-inject');



gulp.task('dev',['bowerinject'], function () {
  return plugins.nodemon({
    watch: ['**/*.*'],
    script: 'server.js'
  });
});

gulp.task('default', ['dev'], function(){
});

gulp.task('bowerinject', function () {  
  gulp.src('./views/layout.jade') 
    .pipe(wiredep({
      ignorePath: '../web',
      directory: './web/vendor',
      bowerJson: require('./bower.json'),
    }))
    .pipe(gulp.dest('./views'));
});