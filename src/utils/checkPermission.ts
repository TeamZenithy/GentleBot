import { Message, Permissions } from 'discord.js'

export default (msg: Message, type: Permissions) =>
  msg.member.hasPermission(type)
