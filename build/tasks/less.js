import gulp from 'gulp'
import lesshint from 'gulp-lesshint'
import plumber from 'gulp-plumber'
import cleanCSS from 'gulp-clean-css'
import gulpif from 'gulp-if'
import args from './util/args'
import util from 'gulp-util'
import {createThemePath, merageStream} from './util/tool'

gulp.task('less', () => {
  let [lessSrc, lessDest] = createThemePath('less')
  let lessDir = []
  /* eslint indent: "off" */
  for (let key in lessSrc) {
    lessDir.push(gulp.src(lessSrc[key])
    .pipe(plumber())
    .pipe(lesshint())
    .pipe(lesshint.reporter())
    .pipe(gulpif(args.production, cleanCSS({debug: true}, function (details) {
      console.log('\t')
      console.log(`Theme ${key}`)
      util.log(util.colors.green(`Before compression: ${details.name} [${details.stats.originalSize}]`))
      util.log(util.colors.green(`After compression: ${details.name} [${details.stats.minifiedSize}]`))
    })))
    .pipe(plumber.stop())
    .pipe(gulp.dest(lessDest[key])))
  }

  return merageStream(...lessDir)
})
