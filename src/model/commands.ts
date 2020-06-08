export default class CommandModel {
  cmds: string
  description: string
  category: string
  commandName: string
  ownerOnly: boolean
  requireVC: boolean
  requireGuild: boolean
  constructor(info) {
    if (!info) return
    this.cmds = info.cmds
    this.description = info.description
    this.category = info.category
    this.commandName = info.commandName
    this.ownerOnly = info.ownerOnly
    this.requireVC = info.requireVC
    this.requireGuild = info.requireGuild
    console.log(`Successfully Loaded ${this.commandName}.\nCommand Structure:
┗─Commands: ${this.cmds}
┗─Description: ${this.description}
┗─Category: ${this.category}\n`)
  }

  run(_pkg: any) {
    throw new Error('Error! There was nothing in run() method!')
  }
}
