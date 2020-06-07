import Model from '../model/commands'
import SmallRichEmbed from '../utils/embed.js'

export = class Sayd extends Model {
  constructor() {
    super({
      cmds: ['따라해', 'sayd'],
      description: 'cmd_sayd_desc',
      category: 'category_general',
      commandName: 'cmd_sayd',
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
    try {
      pkg.msg.delete().catch()
      pkg.msg.channel.send(`${pkg.msg.author.username}: ${pkg.args.join(' ')}`)
    } catch (error) {
      Embed.addField(
        pkg.lang.get('cmd_warning'),
        pkg.lang.get('cmd_sayd_warning'),
        true
      )
      pkg.msg.channel.send(Embed.get())
    }
  }
}
