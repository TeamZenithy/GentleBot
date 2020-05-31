module.exports = class CommandModel {
  constructor(info) {
    if (!info) return
    this.cmds = info.cmds
    this.description = info.description
    this.category = info.category
    this.commandName = info.commandName
    this.ownerOnly = info.ownerOnly
    this.requireVC = info.requireVC
    console.log(`Successfully Loaded ${this.commandName}.\nCommand Structure:
┗─Commands: ${this.cmds}
┗─Description: ${this.description}
┗─Category: ${this.category}\n`)
  }

  run() {
    throw new Error('Error! There was nothing in run() method!')
  }
}
