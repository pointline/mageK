import fs from 'fs'
import themeConfig from '../../configs/themes'
import sysConfig from './systemConfig'
import mkdirp from 'mkdirp'
import outputFileSync from 'output-file-sync'
import util from 'gulp-util'
import gulp from 'gulp'
import args from './args'
import merage from 'merge-stream'
import pkg from '../../../package.json'

/**
 * [checkPath]
 * @param  {[string]} path [description]
 * @return {[boolean]}      [description]
 */
const checkPath = function (path) {
  return fs.existsSync(path)
}

/**
 * [createThemePath]
 * @param  {String} [ext=''] [description]
 * @return {[Array]}            [description]
 */
const createThemePath = function (ext = '') {
  if (!_isThemeConfig()) {
    return []
  }

  if (_isThemeCheck().join('') !== '') {
    return []
  }

  let sourceSrc = []
  let sourceDest = []
  let theme = args.theme
  if (ext) {
    ext = `**/*.${ext}`
  } else {
    ext = `**/*`
  }
  if (themeConfig[theme]) {
    sourceSrc[theme] = `./${themeConfig[theme].area}/${themeConfig[theme].src}/${ext}`
    sourceDest[theme] = `../app/design/${themeConfig[theme].area}/${themeConfig[theme].src}`
    return [sourceSrc, sourceDest]
  }
  for (let theme in themeConfig) {
    sourceSrc[theme] = `./${themeConfig[theme].area}/${themeConfig[theme].src}/${ext}`
    sourceDest[theme] = `../app/design/${themeConfig[theme].area}/${themeConfig[theme].src}`
  }

  return [sourceSrc, sourceDest]
}

/**
 * [createBasePath]
 * @param  {String} [theme=''] [description]
 * @return {[type]}            [description]
 */
const createBasePath = function (theme = '') {
  let src = `./${themeConfig[theme].area}/${themeConfig[theme].src}`

  return src
}

/**
 * [cleanPath]
 * @return {[Array]} [description]
 */
const cleanPath = function () {
  let cleanDest = []
  let theme = args.theme
  if (theme === 'all') {
    for (let theme in themeConfig) {
      let dest = `../../app/design/${themeConfig[theme].area}/${themeConfig[theme].src}`
      cleanDest.push(dest.slice(0, dest.lastIndexOf('/') + 1))
    }
    return cleanDest
  }
  if (themeConfig[theme]) {
    let dest = `../../app/design/${themeConfig[theme].area}/${themeConfig[theme].src}`
    cleanDest.push(dest.slice(0, dest.lastIndexOf('/') + 1))
    return cleanDest
  }
}

/**
 * [initTheme]
 * @return {[type]} [description]
 */
const initTheme = function () {
  if (!_isThemeConfig()) {
    return
  }
  _createTheme()
}

/**
 * [_createTheme]
 * @return {[type]} [description]
 */
const _createTheme = function () {
  let Dirs = []
  for (let key in themeConfig) {
    let basePath = createBasePath(key)
    if (checkPath(basePath)) {
      util.log(util.colors.red(`The ${key} theme already exists`))
      continue
    }
    for (let module of sysConfig['modulesDir']) {
      _createThemeModule(basePath, `Magento_${module}`)
    }
    Dirs.push(`${basePath}/web/css/source`)
    Dirs.push(`${basePath}/web/css/source/lib`)
    Dirs.push(`${basePath}/web/images`)
    Dirs.push(`${basePath}/web/js`)
    Dirs.push(`${basePath}/web/fonts`)
    Dirs.push(`${basePath}/media`)
    Dirs.push(`${basePath}/i18n`)

    let registration = fs.readFileSync('./build/static/registration.php', 'utf8')
    let registrationReplate = registration.replace(/mThemePath/ig, `${themeConfig[key].area}/${themeConfig[key].src}`)

    let theme = fs.readFileSync('./build/static/theme.xml', 'utf8')
    let themeReplate = theme.replace(/mThemeName/ig, `${themeConfig[key].name}`)

    outputFileSync(`${basePath}/registration.php`, registrationReplate)
    outputFileSync(`${basePath}/theme.xml`, themeReplate)

    gulp.src('./build/static/etc/view.xml').pipe(gulp.dest(`${basePath}/etc/`))
    gulp.src('./build/static/media/preview.jpg').pipe(gulp.dest(`${basePath}/media/`))
    gulp.src('./build/static/less/styles-l.less').pipe(gulp.dest(`${basePath}/web/css/`))
    gulp.src('./build/static/less/styles-m.less').pipe(gulp.dest(`${basePath}/web/css/`))
    gulp.src('./build/static/less/_theme.less').pipe(gulp.dest(`${basePath}/web/css/source/`))

    util.log(util.colors.green(`Theme ${key} created successfully`))
  }
  Dirs.forEach(dir => {
    mkdirp(dir)
  })
}

/**
 * [_createThemeModule]
 * @param  {[String]} basePath [description]
 * @param  {[String]} module   [description]
 * @return {[type]}          [description]
 */
const _createThemeModule = function (basePath, module) {
  let Dirs = []
  Dirs.push(`${basePath}/${module}`)
  Dirs.push(`${basePath}/${module}/web/css/source`)
  Dirs.push(`${basePath}/${module}/web/js`)
  Dirs.push(`${basePath}/${module}/layout`)
  Dirs.push(`${basePath}/${module}/template`)

  gulp.src('./build/static/requirejs-config.js').pipe(gulp.dest(`${basePath}/${module}`))

  Dirs.forEach(dir => {
    mkdirp(dir)
  })
}

/**
 * [merageStream]
 * @param  {[Array]} arg [description]
 * @return {[type]}     [description]
 */
const merageStream = function (...arg) {
  return merage(...arg)
}

/**
 * [_isThemeConfig]
 * @return {[boolean]} [description]
 */
const _isThemeConfig = function () {
  if (Object.keys(themeConfig).length === 0) {
    util.log(util.colors.green(`Please set the theme configuration file first
Theme config: ${pkg.name}/build/configs/themes.js
      `))
    return false
  }
  return true
}

/**
 * [_isThemeCheck]
 * @return {[Array]} [description]
 */
const _isThemeCheck = function () {
  let themeArr = []
  for (let theme in themeConfig) {
    let basePath = createBasePath(theme)
    if (!checkPath(basePath)) {
      util.log(util.colors.red(`Please execute gulp init first to create a theme ${theme}
        `))
      themeArr.push(theme)
    }
  }

  return themeArr
}

export {initTheme, createThemePath, merageStream, cleanPath}
