const Discord = require('discord.js')

const Model = require('../../model').command
class Ping extends Model {
  constructor(client) {
    super(client, {
      alias: ['ping', 'pong'],
      cmdName: 'ping',
    })
  }

  run(msg, client) {
    client.embed.init()
    client.embed.setColor('#0099ff')
    client.embed.addField(
      '🏓핑!',
      `⏳이 샤드의 API 핑은 **${Math.round(msg.guild.shard.ping)}ms** 에요!`,
      true
    )
    msg.channel.send(client.embed.get())
  }
}

module.exports = Ping
