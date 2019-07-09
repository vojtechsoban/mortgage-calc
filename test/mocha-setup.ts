import 'jsdom-global/register'
import 'isomorphic-fetch'
import { JSDOM } from 'jsdom'
import path from 'path'
import { addPath } from 'app-module-path'
import * as enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

declare var global: any
declare var window: any

enzyme.configure({ disableLifecycleMethods: true, adapter: new Adapter() })


const sourceDirname = path.resolve(__dirname, '..')
console.log(`Test sourceDirName=${sourceDirname}`)
addPath(sourceDirname)
global.sourceDirname = sourceDirname

const jsdom = new JSDOM('<!DOCTYPE html><html><head/><body/></html>', { url: 'http://localhost' })
global.window = jsdom.window
global.document = jsdom.window.document
global.navigator = { userLanguage: 'en', userAgent: 'mocha' }

global.localStorage = {
  getItem: () => {
  },
  setItem: () => {
  },
}

global.self = global.window

copyProps(window, global)

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce((result, prop) => ({
      ...result,
      [prop]: Object.getOwnPropertyDescriptor(src, prop),
    }), {})
  Object.defineProperties(target, props)
}
