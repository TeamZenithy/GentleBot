import Model from '../model/commands'
import SmallRichEmbed from '../utils/embed.js'
import checkOwner from '../utils/checkOwner'
import { Snowflake, SnowflakeUtil, User } from 'discord.js'

export = class Blacklist extends Model {
  constructor() {
    super({
      cmds: ['blacklist', 'ignore'],
      description: 'cmd_blacklist_desc',
      category: 'category_owners',
      commandName: 'cmd_blacklist',
      ownerOnly: true,
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
      Embed.addField(pkg.lang.get('cmd_warning'), pkg.lang.get('no_task'))
      Embed.setColor(14217046)
      return pkg.msg.channel.send(Embed.get())
    }
    const tasks = ['add', 'remove', 'list']
    if (tasks.includes(pkg.args[0])) {
      /**
       * Blacklist Add
       */
      if (pkg.args[0] == 'add') {
        const target = pkg.msg.mentions.members.first()
        if (
          target === undefined &&
          SnowflakeUtil.deconstruct(pkg.args[1]).increment === 0
        ) {
          Embed.setTitle(pkg.lang.get('fail_notarget'))
          Embed.setColor(16711680)
          return pkg.msg.channel.send(Embed.get())
        }
        let targetID: Snowflake
        if (target === undefined) targetID = pkg.args[1]
        else targetID = target.id
        let reason: String = !pkg.args[2] ? 'NO REASON PROVIDED' : pkg.args[2]
        if (parseInt(targetID) === NaN) {
          pkg.msg.channel.send('That ID seems invalid')
        } else {
          const _: number = parseInt(targetID) // Just a dummy for verify that targetID includes non-number-string
          pkg.client.db
            .query(
              `UPDATE black SET black = true, reason = "${reason}" WHERE aid = "${targetID}"`
            )
            .then(
              pkg.msg.channel.send(
                `<@${targetID}> has added to black. REASON : ${reason}`
              )
            )
        }
      }
      /**
       * Blacklist remove
       */
      if (pkg.args[0] == 'remove') {
        const target = pkg.msg.mentions.members.first()
        if (
          target === undefined &&
          SnowflakeUtil.deconstruct(pkg.args[1]).increment === 0
        ) {
          Embed.setTitle(pkg.lang.get('fail_notarget'))
          Embed.setColor(16711680)
          return pkg.msg.channel.send(Embed.get())
        }
        let targetID: Snowflake
        if (target === undefined) targetID = pkg.args[1]
        else targetID = target.id
        if (parseInt(targetID) === NaN) {
          pkg.msg.channel.send('That ID seems invalid')
        } else {
          const _: number = parseInt(targetID) // Just a dummy for verify that targetID includes non-number-string
          pkg.client.db
            .query(`UPDATE black SET black = false WHERE aid = "${targetID}"`)
            .then(
              pkg.msg.channel.send(`<@${targetID}> has removed from black.`)
            )
        }
      }
      /**
       * Blacklist list
       */
      if (pkg.args[0] == 'list') {
        const data = await pkg.client.db.query(
          `SELECT id, aid, black, reason FROM black;`
        )
        console.log(data[0])
        console.log(data[0].length)

        let result = data[0]

        let embedString: string = '```diff\n'
        let i: number = 0

        while (i < result.length) {
          if (result[i].black === 0) {
            const userInfo: User = await pkg.client.users.fetch(result[i].aid)
            embedString += `+ ${result[i].id}. ${result[i].aid}(${userInfo.username}#${userInfo.discriminator})\n`
          }
          i++
        }
        embedString += '```'
        pkg.msg.channel.send(embedString)
      }
    } else {
      pkg.msg.channel.send('Not listed on task list.')
    }
  }
}
