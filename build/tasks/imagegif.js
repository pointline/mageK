import gulp from 'gulp'
import {createThemePath, merageStream} from './util/tool'
import plumber from 'gulp-plumber'
import imagemin from 'gulp-imagemin'
import gulpif from 'gulp-if'
import args from './util/args'

gulp.task('imagegif', () => {
  let [gifSrc, gifDest] = createThemePath('gif')
  let gifDir = []
  /* eslint indent: "off" */
  for (let key in gifSrc) {
    gifDir.push(gulp.src(gifSrc[key])
    .pipe(plumber())
    .pipe(gulpif(args.production, imagemin([
      imagemin.gifsicle({optimizationLevel: 3})
    ])))
    .pipe(plumber.stop())
    .pipe(gulp.dest(gifDest[key])))
  }

  return merageStream(...gifDir)
})
