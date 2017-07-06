import gulp from 'gulp'
import gulpSequence from 'gulp-sequence'

gulp.task('default', gulpSequence('clean', 'scripts', 'html', 'phtml', 'less', 'xml', 'php', 'imagepng', 'imagejpg', 'imagegif'))
