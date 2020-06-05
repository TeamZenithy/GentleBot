import Model from '../model/commands'
import SmallRichEmbed from '../utils/embed.js'
import checkOwner from '../utils/checkOwner'
import unique from 'uuniquets'

export = class Help extends Model {
  constructor() {
    super({
      cmds: ['도움', 'help', '도움말', 'manual'],
      description: 'cmd_help_desc',
      category: 'category_general',
      commandName: 'cmd_help',
      ownerOnly: false,
      requireVC: false
    })
  }

  async run(pkg) {
    const Embed = new SmallRichEmbed()
    if (pkg.args.length < 1) {
      const sorted = {}
      unique(pkg.client.commands).forEach((command) => {
        if (command.commandName && !sorted[command.category]) {
          sorted[`${command.category}`] = `\`${command.commandName.replace(
            'cmd_',
            ''
          )}\``
        } else if (command.commandName) {
          sorted[`${command.category}`] += `, \`${command.commandName.replace(
            'cmd_',
            ''
          )}\``
        }
      })

      Object.keys(sorted).forEach((sortedKey) => {
        if (sortedKey && sorted[sortedKey]) {
          Embed.addField(
            pkg.lang.get(sortedKey) || pkg.lang.get('desc_none'),
            sorted[sortedKey],
            true
          )
        }
      })

      Embed.addField(
        pkg.lang.get('tip'),
        pkg.lang.get('tip_desc', [pkg.client.config.bot.prefix])
      )
      pkg.msg.channel.send(Embed.get())
    } else {
      const cmd = pkg.client.commands.get(pkg.args[0])
      if (!cmd) {
        Embed.addField(
          pkg.lang.get('cmd_warning'),
          pkg.lang.get('cmd_not_found'),
          true
        )
        Embed.setColor(16713993)
        return pkg.msg.channel.send(Embed.get())
      }

      if (cmd.ownerOnly && !checkOwner(pkg.msg.author.id)) {
        Embed.addField(
          pkg.lang.get('cmd_warning'),
          pkg.lang.get('cmd_owners_only_warn'),
          true
        )
        Embed.setColor(14217046)
        return pkg.msg.channel.send(Embed.get())
      }

      Embed.addField(
        pkg.lang.get(cmd.commandName),
        pkg.lang.get(cmd.description, [pkg.client.config.bot.prefix]) ||
          pkg.lang.get('desc_none')
      )
      pkg.msg.channel.send(Embed.get())
    }
  }
}
