import gulp from 'gulp'
import {createThemePath, merageStream} from './util/tool'
import plumber from 'gulp-plumber'

gulp.task('phtml', () => {
  let [phtmlSrc, phtmlDest] = createThemePath('phtml')
  let phtmlDir = []
  /* eslint indent: "off" */
  for (let key in phtmlSrc) {
    phtmlDir.push(gulp.src(phtmlSrc[key])
    .pipe(plumber())
    .pipe(plumber.stop())
    .pipe(gulp.dest(phtmlDest[key])))
  }

  return merageStream(...phtmlDir)
})
