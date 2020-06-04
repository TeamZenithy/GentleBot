const Model = require('../model/commands')
const SmallRichEmbed = require('../utils/embed.js')

module.exports = class Ban extends Model {
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

  async run(pkg) {
    const Embed = new SmallRichEmbed()
    const target = pkg.msg.mentions.members.first()
    target
      .ban()
      .then((target) => {
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