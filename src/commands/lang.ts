import Model from '../model/commands'
import SmallRichEmbed from '../utils/embed.js'

const supportLangs = ['en', 'ko']
export = class Lang extends Model {
  constructor() {
    super({
      cmds: ['언어', 'language', 'lang'],
      description: 'cmd_lang_desc',
      category: 'category_general',
      commandName: 'cmd_lang',
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
    if (supportLangs.includes(pkg.args[0])) {
      pkg.client.db.query(
        `UPDATE users SET lang = "${pkg.args[0]}" WHERE aid = "${pkg.msg.author.id}"`
      )
      if (pkg.args[0] === 'ko') {
        Embed.addField(
          pkg.lang.get('changedLanguage'),
          pkg.lang.get('changedLanguageWith', ['한국어'])
        )
        pkg.msg.channel.send(Embed.get())
      } else if (pkg.args[0] === 'en') {
        Embed.addField(
          pkg.lang.get('changedLanguage'),
          pkg.lang.get('changedLanguageWith', ['English'])
        )
        pkg.msg.channel.send(Embed.get())
      }
    } else {
      Embed.addField(
        pkg.lang.get('UnsupportLanguage'),
        pkg.lang.get('SupportLanguageList')
      )
      Embed.addField(
        pkg.lang.get('howtochangelang'),
        pkg.lang.get('howtochangelang_solution', [pkg.client.config.bot.prefix])
      )
      pkg.msg.channel.send(Embed.get())
    }
  }
}
