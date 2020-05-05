const config = require('./config.json')

const { ShardingManager } = require('discord.js')
const shard = new ShardingManager('./bot.js', {
  token: config.bot.token,
  autoSpawn: config.bot.sharding.auto,
})

shard.spawn(config.bot.sharding.count)

shard.on('launch', (shard) =>
  console.log(`[SHARD] Shard ${shard.id}/${shard.totalShards}`)
)
