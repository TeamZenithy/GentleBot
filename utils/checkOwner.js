const owners = require('../config.json').owners
module.exports = (id) => owners.includes(id)
