const objectObservable = require('object-observable')
const fs = require('fs')

module.exports = (defaultValue, path, async = false) => {
  let fsValue
  try {
    fsValue = fs.readFileSync(path)
  } catch (err) {}
  if (fsValue) {
    fsValue = Object.assign(defaultValue, JSON.parse(fsValue))
  } else {
    fsValue = defaultValue
  }
  const persistedVariable = objectObservable.create(fsValue)
  objectObservable.observeInmediate(persistedVariable, change => {
    if (async) {
      fs.writeFile(path, JSON.stringify(persistedVariable), 'utf8')
    } else {
      fs.writeFileSync(path, JSON.stringify(persistedVariable), 'utf8')
    }
  })

  return persistedVariable
}
