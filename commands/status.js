const Model = require('../model/commands')
const SmallRichEmbed = require('../utils/embed.js')

const OS = require('os')
const OSUTILS = require('os-utils')

const { duration } = require('moment')
require('moment-duration-format')

module.exports = class Status extends Model {
  constructor() {
    super({
      cmds: ['상태', 'status'],
      description: 'cmd_status_desc',
      category: 'category_general',
      commandName: 'cmd_status',
      ownerOnly: false,
      requireVC: false
    })
  }

  async run(pkg) {
    const Embed = new SmallRichEmbed()
    const getAllSahrdInfo = [
      pkg.client.shard.fetchClientValues('guilds.cache.size'),
      pkg.client.shard.broadcastEval(
        'this.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0)'
      )
    ]

    Promise.all(getAllSahrdInfo)
      .then((results) => {
        const totalGuilds = results[0].reduce(
          (prev, guildCount) => prev + guildCount,
          0
        )
        const totalMembers = results[1].reduce(
          (prev, memberCount) => prev + memberCount,
          0
        )
        Embed.addField(
          'RAM 사용량',
          (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + 'MB',
          true
        )
        Embed.addField(
          '봇 업타임',
          duration(pkg.client.uptime).format('D[일], H[시간], m[분], s[초]'),
          true
        )
        Embed.addField(
          '이 샤드의 서버수',
          `${pkg.client.guilds.cache.size}`,
          true
        )
        Embed.addField(
          '이 샤드의 유저수',
          `${pkg.client.users.cache.size}`,
          true
        )
        Embed.addField('모든 샤드의 서버수', `${totalGuilds}`, true)
        Embed.addField('모든 샤드의 유저수', `${totalMembers}`, true)
        pkg.msg.channel.send(Embed.get())
      })
      .catch(console.error)
  }
}
