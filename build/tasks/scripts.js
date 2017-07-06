import gulp from 'gulp'
import plumber from 'gulp-plumber'
import gulpBabel from 'gulp-babel'
import {createThemePath, merageStream} from './util/tool'
import gulpif from 'gulp-if'
import eslint from 'gulp-eslint'
import util from 'gulp-util'
import args from './util/args'
import uglify from 'gulp-uglify'

gulp.task('scripts', () => {
  let [scriptSrc, scriptDest] = createThemePath('js')
  let scriptsDir = []
  /* eslint indent: "off" */
  for (let key in scriptSrc) {
    scriptsDir.push(gulp.src(scriptSrc[key])
    .pipe(plumber())
    .pipe(eslint({
      useEslintrc: true
    }))
    .pipe(gulpif(args.production, eslint.results(results => {
        console.log('\t')
        console.log(`Theme ${key}`)
        // Called once for all ESLint results.
        util.log(util.colors.green(`Total Results: ${results.length}`))
        util.log(util.colors.yellow(`Total Warnings: ${results.warningCount}`))
        util.log(util.colors.red(`Total Errors: ${results.errorCount}`))
    })))
    .pipe(eslint.format())
    .pipe(gulpBabel())
    .pipe(gulpif(args.production, uglify({

    })))
    .pipe(plumber.stop())
    .pipe(gulp.dest(scriptDest[key])))
  }

  return merageStream(...scriptsDir)
})
