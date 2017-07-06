import gulp from 'gulp'
import {createThemePath, merageStream} from './util/tool'
import plumber from 'gulp-plumber'
import imagemin from 'gulp-imagemin'
import gulpif from 'gulp-if'
import args from './util/args'

gulp.task('imagejpg', () => {
  let [jpgSrc, jpgDest] = createThemePath('jpg')
  let jpgDir = []
  /* eslint indent: "off" */
  for (let key in jpgSrc) {
    jpgDir.push(gulp.src(jpgSrc[key])
    .pipe(plumber())
    .pipe(gulpif(args.production, imagemin([
      imagemin.jpegtran({progressive: true})
    ])))
    .pipe(plumber.stop())
    .pipe(gulp.dest(jpgDest[key])))
  }

  return merageStream(...jpgDir)
})
