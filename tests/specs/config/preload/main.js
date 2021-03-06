
global.count = 0

function done(test) {
  if (++count === 3) {
    test.next()
  }
}


var configData = seajs.config.data

seajs.config({
  preload: ['./preload/a']
})

var lenBeforeUse = configData.preload.length

seajs.use(['../../test'], function(test) {
  test.assert(lenBeforeUse === 1, lenBeforeUse)
  test.assert(configData.preload.length === 0, configData.preload.length)
  test.assert(global.A === 'a', 'preload a.js')
  done(test)
})

seajs.config({
  preload: ['./preload/b']
})

seajs.use(['../../test'], function(test) {
  test.assert(configData.preload.length === 0, configData.preload.length)
  test.assert(global.B === 'b', 'preload b.js')
  done(test)
})


seajs.config({
  preload: [
    [].map ? '' : './preload/es5-safe',
    global.JSON ? '' : './preload/json2'
  ]
})

seajs.use(['../../test'], function(test) {
  test.assert([].map, 'preload es5-safe')
  test.assert(global.JSON, 'preload json2')
  done(test)
});

