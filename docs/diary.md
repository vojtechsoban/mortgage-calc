Diary
=====

2016-06-12
----------

I was very confused why hot module replacement works perfectly on one machine and does not work on the other machine.
The problem was in the editor. While I'm using Idea I was doing some smoke tests with vim. It needs to be configured:
`set backupcopy=yes` so I put this config to `/etc/vim/vimrc`


2016-06-14
----------

2016-06-16
----------

* updated react, redux, etc.
* created todos
* discovered nice boilerlate [jchapron/redux-friendlist-demo](https://github.com/jchapron/redux-friendlist-demo)
* some basic functionality: logging clicked on a button by redux
* added some test boilerplate - not working yet

2016-06-16
----------

* hot module replacement stopped working, I've found the solution using _react-hmre_ on site
[Using Webpack's Hot Module Replacement with React](http://matthewlehner.net/react-hot-module-replacement-with-webpack)
* nice example how it would look without ES6:  [React - redux without ES6](http://blog.krawaller.se/posts/a-react-redux-example-app)
* created initial state object instead of passing the state as default argument.
* added jsx support to webpack - it does not resolve this type of extension by default
* added some basic (messy - WIP) form processing using redux-form

2016-07-07
----------

* added unit test support (Mocha + Chai) and some very stupid test

2016-07-12
----------

* created mortgage calculatin and tests
* removed POC tests

2016-07-13
----------

* created basic mortgage components and bound to mortgage calculation
* removed POC components
* found redux-form [issue](https://github.com/erikras/redux-form/issues/1249) with React [Unknown Prop Warning](https://facebook.github.io/react/warnings/unknown-prop.html), upgraded redux-form to 5.3.1

2016-07-15
----------
* created ActionTypes constants and refactored related code
* removed some orphaned "hello world" code
* moved CalculateMortgageReducer to the separated file
* created tests for CalculateMortgageReducer and Actions

2016-07-17
----------
* refactored Mortgage model to support variable parameters during mortgage
* added dash-assert dependency

2016-10-09
----------
* Extra payment - constant payment  scenario completed
