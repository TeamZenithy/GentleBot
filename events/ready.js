module.exports = async (client, msg) => {
  const config = require('../config')
  const MySQL = require('mysql2/promise')

  client.logger.info(
    `Login Success!\nBot id: ${client.user.id}\nBot Name: ${client.user.username}`
  )
  // Because this is node_modules file!!
  // eslint-disable-next-line new-cap
  const pool = new MySQL.createPool({
    host: config.db.host,
    user: config.db.id,
    password: config.db.pw,
    database: config.db.schema
  })

  client.db = await pool.getConnection(async (conn) => conn)

  const activitiesList = [
    `${client.config.bot.candidate} v.${client.config.bot.version} | ${client.config.bot.prefix}help`,
    `${client.shard.count} Shards | ${client.config.bot.prefix}help`
  ]

  setInterval(() => {
    client.db.query('SELECT 1')
    const index = Math.floor(Math.random() * (activitiesList.length - 1) + 1)
    client.user.setActivity(activitiesList[index])
  }, 10000)
}
