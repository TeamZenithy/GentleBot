import Model from '../model/commands'
import SmallRichEmbed from '../utils/embed.js'

import OS from 'os'

import Discord from 'discord.js'

import { duration } from 'moment'
import 'moment-duration-format'

export = class Status extends Model {
  constructor() {
    super({
      cmds: ['상태', 'status'],
      description: 'cmd_status_desc',
      category: 'category_general',
      commandName: 'cmd_status',
      ownerOnly: false,
      requireVC: false,
      requireGuild: false
    })
  }

  async run(pkg: any) {
    const Embed = new SmallRichEmbed()
    if (this.requireGuild === true && pkg.msg.guild === null) {
      Embed.setTitle(pkg.lang.get('guild_only_cmd'))
      Embed.setColor(16711680)
      return pkg.msg.channel.send(Embed.get())
    }
    const getAllSahrdInfo = [
      pkg.client.shard.fetchClientValues('guilds.cache.size'),
      pkg.client.shard.broadcastEval(
        'this.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0)'
      )
    ]

    Promise.all(getAllSahrdInfo)
      .then((results) => {
        const totalGuilds = results[0].reduce(
          (prev: number, guildCount: number) => prev + guildCount,
          0
        )
        const totalMembers = results[1].reduce(
          (prev: number, memberCount: number) => prev + memberCount,
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
          duration(pkg.client.uptime)['format'](
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
          `${OS.type().replace('_', ' ')} ${OS.release()}`,
          true
        )
        pkg.msg.channel.send(Embed.get())
      })
      .catch(console.error)
  }
}
