import yargs from 'yargs'
import themeConfig from '../../configs/themes'

const args = yargs.options({
  'watch': {
    alias: 'w',
    type: 'boolean',
    default: false,
    desc: 'theme changes'
  },
  'theme': {
    alias: 't',
    type: 'string',
    default: 'all',
    desc: 'themes',
    choices: ['all', ...Object.keys(themeConfig)]
  },
  'production': {
    alias: 'prod',
    type: 'boolean',
    default: false,
    desc: 'Production mode'
  }
})
  .help()
  .argv

export default args
