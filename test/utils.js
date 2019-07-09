/**
 * Default success/error handler, also enabling write asynchronous code blocks synchronously using await.
 * Don't forget to write await even for functions that return void.
 * Example:
 * <pre>
 *   <code>
 *   it('test 1', mochaAsync(async () => {
 *     const result = await somethingAsync()
 *     expect(result).to.be.deep.equal(...)
 *   })
 *   </code>
 * </pre>
 * @param fn
 */
export function mochaAsync(fn) {
  return done => {
    fn.call().then(done, err => done(err))
  }
}

// intentionally dotted in order to fit in test package summary
export function getTestModuleName(filename = 'undefined.test.package') {
  const rootStart = filename.indexOf(global.sourceDirname)
  const testPathBase = rootStart >= 0
    ? filename.substr(rootStart + global.sourceDirname.length + 1)
    : filename.replace(/^\//, '')
  return testPathBase
    .replace(/(-tests?)?(\.jsx?)$/, '')
    .replace(/\//g, '.')
}

export function wait(timeout = 0) {
  return new Promise(resolve => { setTimeout(resolve, timeout) })
}

export async function simulateAsyncFn(result, sleep = 0) {
  await wait(sleep)
  return result
}

export function toString(object, indentation = false) {
  return JSON.stringify(object, null, indentation ? 2 : null)
}


export function restoreStubs(...stubs) {
  stubs.forEach(stub => { stub.restore() })
}
