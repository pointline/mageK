import gulp from 'gulp'
import {createThemePath, merageStream} from './util/tool'
import plumber from 'gulp-plumber'

gulp.task('php', () => {
  let [phpSrc, phpDest] = createThemePath('php')
  let phpDir = []
  /* eslint indent: "off" */
  for (let key in phpSrc) {
    phpDir.push(gulp.src(phpSrc[key])
    .pipe(plumber())
    .pipe(plumber.stop())
    .pipe(gulp.dest(phpDest[key])))
  }

  return merageStream(...phpDir)
})
