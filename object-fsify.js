const objectObservable = require('object-observable')
const fs = require('fs')

module.exports = (defaultValue, path, opts) => {
  const { async = false, indent } = opts || {}
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
    let json
    if (indent) {
      json = JSON.stringify(persistedVariable, null, indent)
    } else {
      json = JSON.stringify(persistedVariable)
    }
    if (async) {
      fs.writeFile(path, json, 'utf8')
    } else {
      fs.writeFileSync(path, json, 'utf8')
    }
  })

  return persistedVariable
}
