import gulp from 'gulp'
import {createThemePath, merageStream} from './util/tool'
import plumber from 'gulp-plumber'

gulp.task('html', () => {
  let [htmlSrc, htmlDest] = createThemePath('html')
  let htmlDir = []
  /* eslint indent: "off" */
  for (let key in htmlSrc) {
    htmlDir.push(gulp.src(htmlSrc[key])
    .pipe(plumber())
    .pipe(plumber.stop())
    .pipe(gulp.dest(htmlDest[key])))
  }

  return merageStream(...htmlDir)
})
