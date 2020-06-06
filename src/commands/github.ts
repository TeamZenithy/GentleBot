import Model from '../model/commands'
import SmallRichEmbed from '../utils/embed.js'

import gitParser from 'git-last-commit'

export = class GitHub extends Model {
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

  async run(pkg: any) {
    const Embed = new SmallRichEmbed()

    gitParser.getLastCommit((_, commitInfo) => {
      Embed.setAuthor(
        'TeamZenithy/GentleBot',
        'https://cdn.discordapp.com/emojis/717700396642074714.png?v=1',
        'https://github.com/TeamZenithy/GentleBot'
      )
      Embed.addField(
        pkg.lang.get('github_last_commit_info'),
        pkg.lang.get('github_last_commit_info_desc', [
          `${commitInfo.shortHash}`,
          `https://github.com/TeamZenithy/GentleBot/commit/${commitInfo.hash}`,
          `${commitInfo.subject}`,
          `${commitInfo.committer.name}`,
          `${commitInfo.committer.name}`,
          `https://github.com/${commitInfo.committer.name}`,
          `${commitInfo.branch}`,
          `https://github.com/TeamZenithy/GentleBot/brach/${commitInfo.branch}`
        ])
      )
      pkg.msg.channel.send(Embed.get())
    })
  }
}
