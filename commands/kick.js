const Model = require('../model/commands')
const SmallRichEmbed = require('../utils/embed.js')

module.exports = class Kick extends Model {
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
    // const Embed = new SmallRichEmbed()
    var member = pkg.msg.mentions.members.first()
    // Kick
    member
      .kick()
      .then((member) => {
        // Successmessage
        pkg.msg.channel.send(
          ':wave: ' +
            member.displayName +
            ' has been successfully kicked :point_right: '
        )
      })
      .catch(() => {
        // Failmessage
        pkg.msg.channel.send('Access Denied')
      })
  }
}
