import config = require('./config.json')

import { ShardingManager } from 'discord.js'
const shardMgr = new ShardingManager('./bot.js', {
  token: config.bot.token,
  totalShards: config.bot.sharding.count || 'auto'
})

shardMgr.on('shardCreate', (shard) =>
  console.log(
    `[SHARD] Shard ${shard.id + 1}/${shardMgr.totalShards} is launching...`
  )
)

shardMgr.spawn(config.bot.sharding.count)
