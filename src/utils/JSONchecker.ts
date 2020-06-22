export default (json: string) => {
  try {
    JSON.parse(json)
    return true
  } catch (err) {
    return false
  }
}
