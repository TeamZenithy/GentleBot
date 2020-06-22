export = async (client: any, error: string | number) => {
  client.logger.error(error)
}
