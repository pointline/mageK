import gulp from 'gulp'
import {createThemePath, merageStream} from './util/tool'
import plumber from 'gulp-plumber'

gulp.task('xml', () => {
  let [xmlSrc, xmlDest] = createThemePath('xml')
  let xmlDir = []
  /* eslint indent: "off" */
  for (let key in xmlSrc) {
    xmlDir.push(gulp.src(xmlSrc[key])
    .pipe(plumber())
    .pipe(plumber.stop())
    .pipe(gulp.dest(xmlDest[key])))
  }

  return merageStream(...xmlDir)
})
