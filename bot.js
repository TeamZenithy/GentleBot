const Discord = require('discord.js')
const config = require('./config')
const logger = require('./utils/logger')
const embed = require('./utils/embed')

const commands = require('./commands')
const event = require('./event')

class GentleBot extends Discord.Client {
  constructor(_config) {
    super()
    this.config = _config
    this.logger = logger
    this.commands = new Map()
    this.embed = new embed()
    this.shardId = process.argv[1]
    this.shardCount = process.argv[2]
    this.fetchAllMembers = true

    this.on('debug', async (debugInfo) => {
      this.logger.debug(debugInfo)
    })

    this.on('error', async (error) => {
      this.logger.error(error.message)
    })

    this.on('ready', () => {
      this.logger.info(
        `Login Success!\nBot id: ${this.user.id}\nBot Name: ${this.user.username}`
      )
    })

    Object.values(event).forEach((e) => new e(this))
    Object.values(commands).forEach((raw) => new raw(this))
  }

  login() {
    super.login(this.config.bot.token)
  }
}

const client = new GentleBot(config)
client.login()
