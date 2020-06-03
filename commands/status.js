const Model = require('../model/commands')
const SmallRichEmbed = require('../utils/embed.js')

const OS = require('os')

const Discord = require('discord.js')

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
        Embed.setThumbnail(`${pkg.client.user.displayAvatarURL()}`)
        Embed.addField(
          pkg.lang.get('status_bot_id'),
          `${pkg.client.user.id}`,
          true
        )
        Embed.addField(
          pkg.lang.get('status_bot_ram_usage'),
          (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + 'MB',
          true
        )
        Embed.addField(
          pkg.lang.get('status_bot_uptime'),
          duration(pkg.client.uptime).format(
            `D[${pkg.lang.get('day')}], H[${pkg.lang.get(
              'hour'
            )}], m[${pkg.lang.get('minute')}], s[${pkg.lang.get('second')}]`
          ),
          true
        )
        Embed.addField(
          pkg.lang.get('status_bot_servers_of_this_shard'),
          `${pkg.client.guilds.cache.size}`,
          true
        )
        Embed.addField(
          pkg.lang.get('status_bot_users_of_this_shard'),
          `${pkg.client.users.cache.size}`,
          true
        )
        Embed.addField(
          pkg.lang.get('status_bot_servers_of_all_shard'),
          `${totalGuilds}`,
          true
        )
        Embed.addField(
          pkg.lang.get('status_bot_users_of_all_shard'),
          `${totalMembers}`,
          true
        )
        Embed.addField(
          pkg.lang.get('status_bot_nodejs_ver'),
          `${process.version}`,
          true
        )
        Embed.addField(
          pkg.lang.get('status_bot_discordjs_ver'),
          `${Discord.version}`,
          true
        )
        Embed.addField(
          pkg.lang.get('status_bot_os_info'),
          `${OS.type().replace('_', ' ')} v.${OS.release()}`,
          true
        )
        pkg.msg.channel.send(Embed.get())
      })
      .catch(console.error)
  }
}