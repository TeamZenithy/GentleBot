import config from '../config.json'

export default class SmallRichEmbed {
  result: any
  constructor() {
    this.result = {
      embed: {
        color: config.bot.color,
        fields: [],
        timestamp: Date.now(),
        footer: {
          text: `${config.bot.name} ${config.bot.candidate} v.${config.bot.version} by Team. Zenithy`,
          iconURL: ''
        },
        description: '',
        author: {
          name: '',
          iconURL: '',
          url: ''
        },
        image: {
          uri: ''
        },
        url: '',
        title: '',
        thumbnail: {
          url: ''
        }
      }
    }
  }

  addField(title: string, value: string, inline?: boolean) {
    this.result.embed.fields.push({
      name: title || null,
      value: value || null,
      inline: inline || false
    })
  }

  setAuthor(name: string, iconURL?: string, url?: string) {
    this.result.embed.author.name = name || null
    this.result.embed.author.iconURL = iconURL || null
    this.result.embed.author.url = url || null
  }

  setColor(color: string | number) {
    this.result.embed.color = color || this.result.embed.color
  }

  setDescription(text: string) {
    this.result.embed.description = text || null
  }

  setImage(uri: string) {
    this.result.embed.image.uri = uri || null
  }

  setThumbnail(uri: string) {
    this.result.embed.thumbnail.url = uri || null
  }

  setTitle(text: string) {
    this.result.embed.title = text || null
  }

  setUrl(text: string, url: string) {
    this.result.embed.title = text || null
    this.result.embed.url = url || null
  }

  setFooter(text: string, image?: string) {
    this.result.embed.footer.text =
      text ||
      `${config.bot.name} ${config.bot.candidate} v.${config.bot.version} by Team. Zenithy`
    this.result.embed.footer.iconURL = image || null
  }

  init() {
    this.result = {
      embed: {
        color: config.bot.color,
        fields: [],
        timestamp: Date.now(),
        footer: {
          text: `${config.bot.name} ${config.bot.candidate} v.${config.bot.version} by Team. Zenithy`,
          iconURL: ''
        },
        description: '',
        author: {
          name: '',
          iconURL: '',
          url: ''
        },
        image: {
          uri: ''
        },
        url: '',
        title: '',
        thumbnail: {
          url: ''
        }
      }
    }
  }

  get() {
    return this.result
  }
}
