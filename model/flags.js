const cmdCategory = {
  0: 'default',
  1: 'music',
  2: 'game',
  3: 'etc',
  4: 'moderation',
  5: 'owner',
}

const convert = (a) => {
  const keys = Object.keys(a)
  const vals = Object.values(a)

  for (let i = 0; i < vals.length; i++) {
    if (a[vals[i]]) return a
    a[vals[i]] = keys[i]
  }

  return a
}

module.exports.cmdCategory = convert(cmdCategory)
