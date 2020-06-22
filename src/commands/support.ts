import Model from '../model/commands'
import SmallRichEmbed from '../utils/embed.js'

export = class Support extends Model {
  constructor() {
    super({
      cmds: ['지원', 'support'],
      description: 'cmd_support_desc',
      category: 'category_general',
      commandName: 'cmd_support',
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
    Embed.addField(pkg.lang.get('support'), pkg.lang.get('support_desc'), true)
    pkg.msg.channel.send(Embed.get())
  }
}
