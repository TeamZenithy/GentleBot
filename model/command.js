const cmdFlag = require('./flags').cmdCategory
class Command {
  constructor(client, data) {
    if (!client || !data) throw new Error()

    this.client = client
    this.rawData = data
    this.permission = data.permission || 0
    this.requireOwner = data.requireOwner || false
    this.alias = data.alias
    this.cmdName = data.cmdName || cmdFlag.default
    this.category = data.category || 'default'

    this.alias.forEach((alias) => this.client.commands.set(alias, this))
  }

  run() {
    throw new Error()
  }
}

module.exports = Command
