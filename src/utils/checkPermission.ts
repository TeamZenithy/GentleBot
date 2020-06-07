import { Message, PermissionString } from 'discord.js'

export default (msg: Message, type: PermissionString) =>
  msg.member.hasPermission(type)
