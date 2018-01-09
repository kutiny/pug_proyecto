const gulp = require('gulp'),
  concat = require('gulp-concat'),
  sass = require('gulp-sass'),
  prefix = require('gulp-autoprefixer'),
  pug = require('gulp-pug'),
  server = require('browser-sync').create();

gulp.task('pug', ()=>{
  return gulp.src('dev/pug/*.pug')
      .pipe(pug())
      .pipe(gulp.dest('./public/'))
})

gulp.task('reload',()=>{
  server.reload;
})

gulp.task('sass',()=>{
  gulp.src('dev/scss/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(prefix({
      versions: ['last 2 versions']
    }))
    .pipe(gulp.dest('public/css/'))
    .pipe(server.stream())
})

gulp.task('default', ()=>{
  server.init({
    server: "./public/"
  });
  gulp.watch('dev/pug/**/*.pug', ['pug', 'reload']);
  gulp.watch('dev/scss/**/*.scss',['sass']);
  gulp.watch('public/index.html',server.reload);
})