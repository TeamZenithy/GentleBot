import Model from '../model/commands'
import SmallRichEmbed from '../utils/embed.js'

export = class Kick extends Model {
  constructor() {
    super({
      cmds: ['kick', '킥'],
      description: 'cmd_ping_desc',
      category: 'category_general',
      commandName: 'cmd_ping',
      ownerOnly: false,
      requireVC: false
    })
  }

  async run(pkg) {
    const Embed = new SmallRichEmbed()
    const target = pkg.msg.mentions.members.first()
    target
      .kick()
      .then((target) => {
        Embed.setTitle(pkg.lang.get('kick_success', [target.user.tag]))
        pkg.msg.channel.send(Embed.get())
      })
      .catch(() => {
        Embed.setTitle(pkg.lang.get('kick_fail', [target.user.tag]))
        Embed.setColor(16711680)
        pkg.msg.channel.send(Embed.get())
      })
  }
}
