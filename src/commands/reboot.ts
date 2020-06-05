import Model from '../model/commands'
import SmallRichEmbed from '../utils/embed.js'
import checkOwner from '../utils/checkOwner'

export default class Reboot extends Model {
  constructor() {
    super({
      cmds: ['reboot', 'restart', '재시작', '재시동'],
      description: 'cmd_reboot_desc',
      category: 'category_owners',
      commandName: 'cmd_reboot',
      ownerOnly: true,
      requireVC: false
    })
  }

  async run(pkg) {
    const Embed = new SmallRichEmbed()

    if (this.ownerOnly && !checkOwner(pkg.msg.author.id)) {
      Embed.addField(
        pkg.lang.get('cmd_warning'),
        pkg.lang.get('cmd_owners_only_warn'),
        true
      )
      Embed.setColor(14217046)
      return pkg.msg.channel.send(Embed.get())
    }

    Embed.addField(
      pkg.lang.get('reboot'),
      pkg.lang.get('reboot_desc', [pkg.client.shard.count]),
      true
    )
    pkg.msg.channel.send(Embed.get()).then(() => {
      pkg.client.logger.info(
        `${pkg.msg.author.tag}(${pkg.msg.author.id}) has rebooted bot.`
      )
      pkg.client.shard.broadcastEval('process.exit(0)')
    })
  }
}
