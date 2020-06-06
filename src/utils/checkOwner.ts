import { owners } from '../config.json'
import { Snowflake } from 'discord.js'
export default (id: Snowflake) => owners.includes(id)
