const Discord = require('discord.js')
const config = require('./config')
const logger = require('./utils/logger')
const UlangTS = require('ulangts')
const fs = require('fs')

// const MySQL = require('mysql2/promise')

class GentleBot extends Discord.Client {
  constructor(_config) {
    super()
    /**
     * Basic Initializer
     */
    this.config = _config
    this.logger = logger
    this.commands = new Map()
    // eslint-disable-next-line no-unused-expressions
    this.db
    this.i18n = new UlangTS(require('./i18n'))
    /**
     * Sharing Part
     */
    this.shardId = process.argv[1]
    this.shardCount = process.argv[2]
    this.fetchAllMembers = true

    /**
     * Try to load events
     */
    fs.readdir('./events/', (err, files) => {
      if (err) return this.logger.error(err)

      files.forEach((file) => {
        const event = require(`./events/${file}`)
        const eventName = file.split('.')[0]

        client.on(eventName, (a, b, c) => event(this, a, b, c))
      })
    })

    /**
     * Try to load commands.
     * If some command occurs error, It will skip that command.
     */
    fs.readdir('./commands/', (err, files) => {
      if (err) return this.logger.error(err)

      files.forEach((file) => {
        try {
          if (!file.endsWith('.js') || file.startsWith('model')) return
          const Prop = require(`./commands/${file}`)
          const temp = new Prop()

          temp.cmds.forEach((alia) => {
            this.commands.set(alia, temp)
          })
        } catch (error) {
          this.logger.debug(`Failed to loading commands: ${file} ${error}`)
        }
      })
    })
  }

  login() {
    super.login(this.config.bot.token)
  }
}

const client = new GentleBot(config)
client.login()
