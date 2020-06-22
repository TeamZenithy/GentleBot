import { Guild } from 'discord.js'

export = async (client: any, guild: Guild) => {
  client.logger.info('Joined a new guild: ' + guild.name)
  /**
   * TODO: Create frame for guild.
   * frame conatins default warn limit, default welcome message... etc.
   */
}
