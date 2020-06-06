import Model from '../model/commands'
import SmallRichEmbed from '../utils/embed.js'
import { GuildMember } from 'discord.js'

export = class Ban extends Model {
  constructor() {
    super({
      cmds: ['ban', '밴'],
      description: 'cmd_ping_desc',
      category: 'category_general',
      commandName: 'cmd_ping',
      ownerOnly: false,
      requireVC: false
    })
  }

  async run(pkg: any) {
    const Embed = new SmallRichEmbed()
    const target = pkg.msg.mentions.members.first()
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
  }
}
