class Event {
  constructor(client, name) {
    if (!client || !name) throw new Error()

    this.name = name
    this.client = client
    this.client.on(name, this.run)
  }

  run() {
    throw new Error()
  }
}

module.exports = Event
