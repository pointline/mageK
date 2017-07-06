import gulp from 'gulp'
import args from './util/args'
import {createThemePath} from './util/tool'
import {taskList} from './util/systemConfig'

gulp.task('build', () => {
  let [themeSrc] = createThemePath(`${taskList[args.watch]}`)
  for (let key in themeSrc) {
    if (args.watch) {
      gulp.watch(themeSrc[key], taskList[args.watch])
    }
  }
})
