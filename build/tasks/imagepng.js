import gulp from 'gulp'
import {createThemePath, merageStream} from './util/tool'
import plumber from 'gulp-plumber'
import imagemin from 'gulp-imagemin'
import gulpif from 'gulp-if'
import args from './util/args'

gulp.task('imagepng', () => {
  let [pngSrc, pngDest] = createThemePath('png')
  let pngDir = []
  /* eslint indent: "off" */
  for (let key in pngSrc) {
    pngDir.push(gulp.src(pngSrc[key])
    .pipe(plumber())
    .pipe(gulpif(args.production, imagemin([
      imagemin.optipng({optimizationLevel: 7})
    ])))
    .pipe(plumber.stop())
    .pipe(gulp.dest(pngDest[key])))
  }

  return merageStream(...pngDir)
})
