'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _reduxDevtoolsExtension = require('redux-devtools-extension');

var _clientMiddleware = require('./middleware/clientMiddleware');

var _clientMiddleware2 = _interopRequireDefault(_clientMiddleware);

var _routerMiddleware = require('./middleware/routerMiddleware');

var _routerMiddleware2 = _interopRequireDefault(_routerMiddleware);

var _router = require('./modules/router');

var _reducer = require('./modules/reducer');

var _reducer2 = _interopRequireDefault(_reducer);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var initStore = function initStore() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var client = arguments[1];

  if (process.browser && window.__store) {
    return window.__store;
  }

  var middleware = [(0, _routerMiddleware2.default)(), (0, _clientMiddleware2.default)(client)];

  var store = (0, _redux.createStore)(_reducer2.default, initialState, (0, _reduxDevtoolsExtension.composeWithDevTools)(_redux.applyMiddleware.apply(undefined, middleware)));

  if (process.browser) {
    window.__store = store;
    store.dispatch((0, _router.routingInit)());
  }

  return store;
};

exports.default = initStore;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlZHV4L2luaXRTdG9yZS5qcyJdLCJuYW1lcyI6WyJpbml0U3RvcmUiLCJpbml0aWFsU3RhdGUiLCJjbGllbnQiLCJwcm9jZXNzIiwiYnJvd3NlciIsIndpbmRvdyIsIl9fc3RvcmUiLCJtaWRkbGV3YXJlIiwic3RvcmUiLCJkaXNwYXRjaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7OztBQUVBLElBQU0sWUFBWSxTQUFaLEFBQVksWUFBK0I7TUFBOUIsQUFBOEIsbUZBQWYsQUFBZTtNQUFYLEFBQVcsbUJBQy9DOztNQUFJLFFBQVEsQUFBUixXQUFtQixPQUFPLEFBQTlCLFNBQXVDLEFBQ3JDO1dBQU8sT0FBTyxBQUFkLEFBQ0Q7QUFFRDs7TUFBTSxhQUFhLENBQUMsdUJBQUQsWUFBcUIsZ0NBQWlCLEFBQWpCLEFBQXJCLEFBQW5CLEFBRUE7O01BQU0sUUFBUSwyQ0FFWixBQUZZLGNBR1osaURBQW9CLHdDQUFtQixBQUFuQixBQUFwQixBQUhZLEFBQWQsQUFNQTs7TUFBSSxRQUFRLEFBQVosU0FBcUIsQUFDbkI7V0FBTyxBQUFQLFVBQWlCLEFBQWpCLEFBQ0E7VUFBTSxBQUFOLFNBQWUsWUFBZixBQUNEO0FBRUQ7O1NBQU8sQUFBUCxBQUNEO0FBbkJEOztrQkFxQmUsQSIsImZpbGUiOiJpbml0U3RvcmUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2FuZHJld193b3Jrc3RhdGlvbi9Eb2N1bWVudHMvV29yay9kYXRhc2tlcHRpYy5jb20ifQ==