# TODOs

## Project feature todos

* test
  * share objects between tests
  * mock services & utils in tests to isolate unrelated input / output changes
  * use [rewire](https://github.com/jhnns/rewire) to test unexported functions
  * ~~UI tests~~
  * ~~reducers test~~
* ~~dev tools~~
* persist / load state - maybe part of Redux Dev tools
* ~~prod config / bundle app for static web~~
* add styles and pack them, configure loaders
* i18n using [react-intl](https://github.com/yahoo/react-intl)


## Application feature todos
* mortgage parameters
  * fix inserting mortgage parameters: find correct index and slice actual parameters
  * write test for inserting parameters
* extra payments
  * order extra payments to enable inserting extra payments
  * use a flag to determine amount type (absolute / relative) of extra payment
  * ~~add extra payment specification to the form: constant payment / duration; amount type~~
  * ~~enable removing extra payments~~

## Knowledge todos

* redux, learn redux !!!
    * when to use store.subscribe, connect, bindActionCreators, etc. take some inspiration from [jchapron/redux-friendlist-demo repository](https://github.com/jchapron/redux-friendlist-demo), particularry from the file     [FriendListApp.js](https://github.com/jchapron/redux-friendlist-demo/blob/master/src/containers/FriendListApp.js)
