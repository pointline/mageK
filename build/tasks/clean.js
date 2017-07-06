import gulp from 'gulp'
import del from 'del'
import {cleanPath} from './util/tool'

gulp.task('clean', () => {
  let clean = cleanPath()
  return del(clean, {force: true})
})
