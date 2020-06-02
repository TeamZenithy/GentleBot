const Model = require('../model/commands')
const SmallRichEmbed = require('../utils/embed.js')

module.exports = class Status extends Model {
  constructor() {
    super({
      cmds: ['상태', 'status'],
      description: 'cmd_ping_desc',
      category: 'category_general',
      commandName: 'cmd_ping',
      ownerOnly: false,
      requireVC: false
    })
  }

  async run(pkg) {
    const Embed = new SmallRichEmbed()
    Embed.addField(
      pkg.lang.get('ping'),
      pkg.lang.get('ping_content', [
        Math.round([
          pkg.msg.guild === null ? pkg.client.ws.ping : pkg.msg.guild.shard.ping
        ]),
        Math.round([pkg.client.ws.ping])
      ]),
      true
    )
    pkg.msg.channel.send(Embed.get())
  }
}
