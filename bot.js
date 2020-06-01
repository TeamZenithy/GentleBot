const Discord = require('discord.js')
const config = require('./config')
const logger = require('./utils/logger')
const UlangTS = require('ulangts')
const fs = require('fs')

const MySQL = require('mysql2/promise')

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

    this.on('debug', async (debugInfo) => {
      this.logger.debug(debugInfo)
    })

    this.on('error', async (error) => {
      this.logger.error(error.message)
    })

    this.on('ready', async () => {
      this.logger.info(
        `Login Success!\nBot id: ${this.user.id}\nBot Name: ${this.user.username}`
      )
      // Because this is node_modules file!!
      // eslint-disable-next-line new-cap
      const pool = new MySQL.createPool({
        host: config.db.host,
        user: _config.db.id,
        password: _config.db.pw,
        database: _config.db.schema
      })

      this.db = await pool.getConnection(async (conn) => conn)

      const activitiesList = [
        `${this.guilds.size} Servers | ${this.config.bot.prefix}help`,
        `${this.config.bot.candidate} v.${this.config.bot.version} | ${this.config.bot.prefix}help`,
        `${this.shard.count} Shards | ${this.config.bot.prefix}help`
      ]

      setInterval(() => {
        this.db.query('SELECT 1')
        const index = Math.floor(
          Math.random() * (activitiesList.length - 1) + 1
        )
        this.user.setActivity(activitiesList[index])
      }, 10000)
    })

    this.on('guildCreate', (guild) => {
      console.log('Joined a new guild: ' + guild.name)
      /**
       * TODO: Create frame for guild.
       * frame conatins default warn limit, default welcome message... etc.
       */
    })

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
