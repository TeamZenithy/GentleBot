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
    const Embed = new client.embed()
    Embed.init()
    Embed.setColor('#0099ff')
    Embed.addField(
      '🏓핑!',
      `⏳이 샤드의 API 핑은 **${Math.round(msg.guild.shard.ping)}ms** 에요!`,
      true
    )
    Embed.setFooter('GentleBot by Team Zenithy')
    msg.channel.send(Embed.get())
  }
}

module.exports = Ping
