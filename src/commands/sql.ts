import Model from '../model/commands'
import SmallRichEmbed from '../utils/embed.js'
import checkOwner from '../utils/checkOwner'

export default class Sql extends Model {
  constructor() {
    super({
      cmds: ['sql', 'db'],
      description: 'cmd_sql_desc',
      category: 'category_owners',
      commandName: 'cmd_sql',
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

    if (!pkg.args.length) {
      Embed.addField(pkg.lang.get('cmd_warning'), pkg.lang.get('no_cmd'))
      Embed.setColor(14217046)
      return pkg.msg.channel.send(Embed.get())
    }

    let args = pkg.args.join(' ')
    pkg.client.logger.info(
      `${pkg.msg.author.tag}(${pkg.msg.author.id}) Executed follwing sql command:${args}`
    )
    let minified = false
    if (args.includes(' --minify')) {
      args = args.replace(' --minify', '')
      minified = true
    }

    try {
      await pkg.client.db.query(args).then((output) => {
        let result
        if (minified) {
          result = JSON.stringify(output[0])
        } else {
          result = JSON.stringify(output[0], null, 2)
        }

        Embed.setAuthor(pkg.lang.get('compile_compiling'))
        Embed.setColor(4873670)
        if (args.length > 1000) {
          args = args.substr(0, 1000) + '...'
        }
        if (result.length > 1000) {
          result = result.substr(0, 1000) + '...'
        }
        Embed.addField(
          pkg.lang.get('compile_input'),
          `\`\`\`sql\n${args} \`\`\``
        )
        Embed.addField(
          pkg.lang.get('compile_output'),
          `\`\`\`json\n${result} \n\`\`\``
        )
        pkg.msg.channel.send(Embed.get())
      })
    } catch (e) {
      Embed.setAuthor(pkg.lang.get('compile_err'))
      Embed.setColor(16711680)
      if (args.length > 1000) {
        args = args.substr(0, 1000) + '...'
      }
      Embed.addField(pkg.lang.get('compile_input'), `\`\`\`js\n${args} \`\`\``)
      Embed.addField(
        pkg.lang.get('compile_output_error'),
        `\`\`\`js\n${e} \n\`\`\``
      )
      pkg.msg.channel.send(Embed.get())
    }
  }
}
