# object-fsify

file system persisted variables as simple as it ever will be with the help of ES6 Proxies magic.

```javascript
// myAwesomeNodejsScript.js
const a = objectFsify([], 'myArray.json')

a.push(10)
// myArray.json is now '[10]')
a.push(20)
// myArray.json is now '[10, 20]')
a.push(33)
// myArray.json is now '[10,20,33]')

// of course it works the same with objects
const a = objectFsify({} 'myObject.json')

a.b = 10
// myObject.json is now '{b: 10}')
```

When you run the script `myAwesomeNodejsScript.js` again, all the numbers will be there twice in the array as you would expect-file is loaded up when you initialise the `a` variable.
