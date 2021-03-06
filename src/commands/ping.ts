import Model from '../model/commands'
import SmallRichEmbed from '../utils/embed.js'

export = class Ping extends Model {
  constructor() {
    super({
      cmds: ['핑', 'ping', 'pong', '퐁'],
      description: 'cmd_ping_desc',
      category: 'category_general',
      commandName: 'cmd_ping',
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
    Promise.all([pkg.client.shard.fetchClientValues('ws.ping')]).then(
      (pings) => {
        const avgPing = pings[0].reduce((prev, pings) => prev + pings, 0)
        Embed.addField(
          pkg.lang.get('ping'),
          pkg.lang.get('ping_content', [
            Math.round(
              pkg.msg.guild === null
                ? pkg.client.ws.ping
                : pkg.msg.guild.shard.ping
            ),
            Math.round(avgPing / pkg.client.shard.count)
          ]),
          true
        )
        pkg.msg.channel.send(Embed.get())
      }
    )
  }
}
