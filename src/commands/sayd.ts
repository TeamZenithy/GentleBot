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
      requireVC: false
    })
  }

  async run(pkg) {
    try {
      pkg.msg.delete().catch()
      pkg.msg.channel.send(`${pkg.msg.author.username}: ${pkg.args.join(' ')}`)
    } catch (error) {
      const Embed = new SmallRichEmbed()
      Embed.addField(
        pkg.lang.get('cmd_warning'),
        pkg.lang.get('cmd_sayd_warning'),
        true
      )
      pkg.msg.channel.send(Embed.get())
    }
  }
}
