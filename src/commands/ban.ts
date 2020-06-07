import Model from '../model/commands'
import SmallRichEmbed from '../utils/embed.js'
import { GuildMember, Permissions } from 'discord.js'
import checkPermission from '../utils/checkPermission'

export = class Ban extends Model {
  constructor() {
    super({
      cmds: ['ban', '밴'],
      description: 'cmd_ban_desc',
      category: 'category_moderation',
      commandName: 'cmd_ban',
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
    if (checkPermission(pkg.msg, 'BAN_MEMBERS')) {
      const target = pkg.msg.mentions.members.first()
      if (target === undefined) {
        Embed.setTitle(pkg.lang.get('fail_notarget'))
        Embed.setColor(16711680)
        return pkg.msg.channel.send(Embed.get())
      }
      target
        .ban()
        .then((target: GuildMember) => {
          Embed.setTitle(pkg.lang.get('ban_success', [target.user.tag]))
          pkg.msg.channel.send(Embed.get())
        })
        .catch(() => {
          Embed.setTitle(pkg.lang.get('ban_fail', [target.user.tag]))
          Embed.setColor(16711680)
          pkg.msg.channel.send(Embed.get())
        })
    } else {
      Embed.setTitle(pkg.lang.get('fail_permission', ['BAN_MEMBERS']))
      Embed.setColor(16711680)
      pkg.msg.channel.send(Embed.get())
    }
  }
}
