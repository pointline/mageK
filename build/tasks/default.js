import gulp from 'gulp'
import args from './util/args'
import watch from 'gulp-watch'
import {createThemePath} from './util/tool'
import gulpSequence from 'gulp-sequence'

gulp.task('default', function (cb) {
  if (args.watch) {
    let [themeSrc] = createThemePath()
    for (var theme in themeSrc) {
      watch(themeSrc[theme], function () {
        gulp.start(['scripts', 'html', 'phtml', 'less', 'xml', 'php', 'imagepng', 'imagejpg', 'imagegif'])
      })
    }
  }
  gulpSequence('clean', ['scripts', 'html', 'phtml', 'less', 'xml', 'php', 'imagepng', 'imagejpg', 'imagegif'], cb)
})
