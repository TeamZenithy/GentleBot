import { Client } from 'discord.js'
import config from './config.json'
import logger from './utils/logger'
import UlangTS = require('ulangts')
import fs = require('fs')

class GentleBot extends Client {
  public config: object
  public logger: object | any
  public commands: object | any
  public db: object
  public i18n: object
  public shardId: string
  public shardCount: string
  public fetchAllMembers: boolean

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
        try {
          const event = require(`./events/${file}`)
          const eventName: any = file.split('.')[0]

          client.on(eventName, (a, b, c) => event(this, a, b, c))
        } catch (error) {
          this.logger.error(`Failed to load event: ${file} ${error}`)
        }
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
          this.logger.error(`Failed to load command: ${file} ${error}`)
        }
      })
    })
  }
}

const client = new GentleBot(config)
client.login(config.bot.token)
