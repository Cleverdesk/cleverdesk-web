var gulp = require('gulp');
var gls = require('gulp-live-server');
var babel = require("gulp-babel");
var gutil = require('gulp-util');
var jsdoc = require("gulp-jsdoc3");

const jsdocConf = {
  opts: {
    destination: 'public/doc'
  },
  templates: {
    systemName: "Cleverdesk"
  }
};

gutil.log(`
Cleverdesk-Web  Copyright (C) 2016  Cleverdesk
This program comes with ABSOLUTELY NO WARRANTY.
This is free software, and you are welcome to redistribute it
under certain conditions.
`);

gulp.task('compile', function() {
  gulp.src("public/src/**/*.js")
      .pipe(babel())
      .pipe(gulp.dest("public/dist"));
});

gulp.task('doc', function() {
  gulp.src("public/src/**/*.js")
      .pipe(jsdoc(jsdocConf));
});

gulp.task('serve-compile', function() {
  gulp.src("public/src/**/*.js")
      .pipe(babel())
      .pipe(gulp.dest("public/dist"));

  gulp.watch("public/src/**/*.js", function (file) {
    gulp.src("public/src/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("public/dist"));
  });
});

gulp.task('serve-doc', function() {
  gulp.src("public/src/**/*.js")
    .pipe(jsdoc(jsdocConf));


  gulp.watch("public/src/**/*.js", function (file) {
    gulp.src("public/src/**/*.js")
      .pipe(jsdoc(jsdocConf));
  });
});

gulp.task('serve', ['serve-compile', 'serve-doc'], function() {
  //1. serve with default settings
  var server = gls.static('public', 3000); //equals to gls.static('public', 3000);
  server.start();

  //use gulp.watch to trigger server actions(notify, start or stop)
  gulp.watch(['public/*','public/**/*'], function (file) {
    server.notify.apply(server, [file]);
  });
});
