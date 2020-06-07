import Model from '../model/commands'
import SmallRichEmbed from '../utils/embed.js'

export = class Invite extends Model {
  constructor() {
    super({
      cmds: ['초대', 'invite'],
      description: 'cmd_invite_desc',
      category: 'category_general',
      commandName: 'cmd_invite',
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
    Embed.addField(
      pkg.lang.get('invite'),
      pkg.lang.get('invite_desc', [
        `https://discordapp.com/api/oauth2/authorize?client_id=${pkg.client.user.id}&permissions=${pkg.client.config.bot.permission}&scope=bot`
      ]),
      true
    )
    pkg.msg.channel.send(Embed.get())
  }
}
