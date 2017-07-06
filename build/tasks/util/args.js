import yargs from 'yargs'
import {taskList} from './systemConfig'
import themeConfig from '../../configs/themes'

const args = yargs.options({
  'watch': {
    alias: 'w',
    type: 'string',
    default: 'js',
    desc: 'Monitor subject change',
    choices: Object.keys(taskList)
  },
  'theme': {
    alias: 't',
    type: 'string',
    default: 'all',
    desc: 'themes',
    choices: ['all', ...Object.keys(themeConfig)]
  },
  'production': {
    alias: 'p',
    type: 'boolean',
    default: false,
    desc: 'Production mode'
  }
})
  .help()
  .argv

export default args
