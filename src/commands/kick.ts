import Model from '../model/commands'
import SmallRichEmbed from '../utils/embed.js'
import { GuildMember } from 'discord.js'
import checkPermission from '../utils/checkPermission'

export = class Kick extends Model {
  constructor() {
    super({
      cmds: ['kick', '킥'],
      description: 'cmd_kick_desc',
      category: 'category_moderation',
      commandName: 'cmd_kick',
      ownerOnly: false,
      requireVC: false,
      requireGuild: true
    })
  }

  async run(pkg: any) {
    const Embed = new SmallRichEmbed()
    if (this.requireGuild === true && pkg.msg.guild === null) {
      Embed.setTitle(pkg.lang.get('guild_only_cmd'))
      Embed.setColor(16711680)
      return pkg.msg.channel.send(Embed.get())
    }
    const target = pkg.msg.mentions.members.first()
    if (checkPermission(pkg.msg, 'KICK_MEMBERS')) {
      target
        .kick()
        .then((target: GuildMember) => {
          Embed.setTitle(pkg.lang.get('kick_success', [target.user.tag]))
          pkg.msg.channel.send(Embed.get())
        })
        .catch(() => {
          Embed.setTitle(pkg.lang.get('kick_fail', [target.user.tag]))
          Embed.setColor(16711680)
          pkg.msg.channel.send(Embed.get())
        })
    } else {
      Embed.setTitle(pkg.lang.get('fail_permission', ['KICK_MEMBERS']))
      Embed.setColor(16711680)
      pkg.msg.channel.send(Embed.get())
    }
  }
}
