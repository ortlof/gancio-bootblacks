#!/usr/bin/env node
const pkg = require('../package.json')
const path = require('path')
const usersCLI = require('./cli/users')
const eventsCLI = require('./cli/events')

process.env.cwd = process.env.GANCIO_DATA || path.resolve('./')

process.chdir(path.resolve(__dirname, '..'))

async function start () {
  require('@nuxt/cli-edge').run(['start', '--modern'])
    .catch((error) => {
      console.error(error)
      process.exit(2)
    })
}

console.info(`📅 ${pkg.name} - v${pkg.version} - ${pkg.description} (nodejs: ${process.version})`)

require('yargs')
  .usage('Usage $0 <command> [options]')
  .option('config', {
    alias: 'c',
    describe: 'Configuration file',
    default: path.resolve(process.env.cwd, 'config.json'),
    coerce: config_path => {
      const absolute_config_path = path.resolve(process.env.cwd, config_path)
      process.env.config_path = absolute_config_path
      return absolute_config_path
    }})
  .command(['start', 'run', '$0'], 'Start gancio', {}, start)
  .command(['users'], 'Manage users', usersCLI)
  .command(['events'], 'Manage events', eventsCLI)
  .help('h')
  .alias('h', 'help')
  .epilog('Made with ❤ by underscore hacklab - https://gancio.org')
  .recommendCommands()
  .demandCommand(1, '')
  .argv
