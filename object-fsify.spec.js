import objectFsify from './object-fsify'
import test from 'ava'
import fs from 'fs'

test('it saves a file', t => {
  const a = objectFsify([], 'testFile.json')
  t.deepEqual([], a)
  a.push(10)
  a.push(20)
  a.push(33)

  t.is(fs.readFileSync('testFile.json', 'utf8'), '[10,20,33]')
})

test('it will pick it up on the next use', t => {
  const a = objectFsify([], 'testFile.json')
  t.deepEqual([10, 20, 33], a)
  a.push(10)
  a.push(20)
  a.push(33)
  t.is(fs.readFileSync('testFile.json', 'utf8'), '[10,20,33,10,20,33]')
  fs.unlinkSync('testFile.json')
})
