import { Message } from 'discord.js'

export = async (client: any, msg: Message) => {
  if (msg.author.bot) return
  if (!msg.content.startsWith(client.config.bot.prefix)) return

  const checkblack = await client.db.query(
    `SELECT black from black WHERE aid = "${msg.author.id}"`
  )
  if (!checkblack[0][0]) {
    client.db.query(
      `INSERT INTO black (aid, black) VALUES ("${msg.author.id}", false)`
    )
    client.db.release()
  } else {
    if (checkblack[0][0].black) return
  }

  const userData = (
    await client.db.query(`SELECT * FROM users WHERE aid="${msg.author.id}"`)
  )[0][0]
  client.logger.info(`${JSON.stringify(userData)}, Requested Command : ${msg}`)
  if (!userData) {
    client.db.query(`INSERT INTO users (aid) VALUES ("${msg.author.id}")`)
    client.db.release()
    return module.exports(client, msg)
  }

  const lang = client.i18n.get(userData.lang)
  const args = msg.content
    .slice(client.config.bot.prefix.length)
    .trim()
    .split(/ +/g)
  const command = args.shift().toLowerCase()

  const cmd = client.commands.get(command)
  if (!cmd) return

  const compress = {
    client: client,
    msg: msg,
    args: args,
    data: userData,
    lang: lang
  }
  cmd.run(compress)
}
