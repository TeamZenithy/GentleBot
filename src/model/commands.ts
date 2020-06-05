export default class CommandModel {
  cmds: string
  description: string
  category: string
  commandName: string
  ownerOnly: boolean
  requireVC: boolean
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

  run(pkg: object) {
    throw new Error('Error! There was nothing in run() method!')
  }
}
