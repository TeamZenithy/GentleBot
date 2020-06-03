const Model = require('../model/commands')
const SmallRichEmbed = require('../utils/embed.js')

const gitParser = require('git-last-commit')

module.exports = class GitHub extends Model {
  constructor() {
    super({
      cmds: ['github', 'repo', '깃헙', '깃허브'],
      description: 'cmd_github_desc',
      category: 'category_general',
      commandName: 'cmd_github',
      ownerOnly: false,
      requireVC: false
    })
  }

  async run(pkg) {
    const Embed = new SmallRichEmbed()

    gitParser.getLastCommit((_, commitInfo) => {
      Embed.setAuthor(
        'TeamZenithy/GentleBot',
        'https://cdn.discordapp.com/emojis/717700396642074714.png?v=1',
        'https://github.com/TeamZenithy/GentleBot'
      )
      Embed.addField(
        'Last Commit Info',
        pkg.lang.get('github_last_commit_info_desc', [
          `${commitInfo.shortHash}`,
          `https://github.com/TeamZenithy/GentleBot/commit/${commitInfo.hash}`,
          `${commitInfo.subject}`,
          `${commitInfo.committer.name}](https://github.com/${commitInfo.committer.name}`,
          `${commitInfo.branch}](https://github.com/TeamZenithy/GentleBot/brach/${commitInfo.branch}`
        ])
      )
      pkg.msg.channel.send(Embed.get())
    })
  }
}
