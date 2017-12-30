import 'jsdom-global/register'
import { JSDOM } from 'jsdom'
import path from 'path'
import { addPath } from 'app-module-path'
// import { configure } from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16'

// configure({ disableLifecycleMethods: true, adapter: new Adapter() });

const sourceDirname = path.resolve(__dirname, '..');
addPath(sourceDirname);

const jsdom = new JSDOM('<!DOCTYPE html><html><head /><body /></html>');
global.window = jsdom.window;
global.document = jsdom.window.document;
global.self = global.window;
global.window.localStorage = {};

copyProps(window, global);

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce((result, prop) => ({
      ...result,
      [prop]: Object.getOwnPropertyDescriptor(src, prop),
    }), {});
  Object.defineProperties(target, props)
}
