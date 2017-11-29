'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = routerMiddleware;

var _index = require('next/dist/lib/router/index.js');

var _index2 = _interopRequireDefault(_index);

var _router = require('../modules/router');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function routerMiddleware() {
  var listening = void 0;
  return function (store) {
    return function (next) {
      return function (action) {
        if (process.browser && !listening) {
          _index2.default.onRouteChangeStart = function (url) {
            if (_index2.default.paused) {
              throw new Error('Abort route: paused');
            }
            return next((0, _router.routingStart)(_index2.default.pathname, url));
          };
          _index2.default.onRouteChangeComplete = function () {
            return next((0, _router.routingComplete)());
          };
          _index2.default.onRouteChangeError = function () {
            return next((0, _router.routingComplete)());
          };
          listening = true;
        }
        return next(action);
      };
    };
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlZHV4L21pZGRsZXdhcmUvcm91dGVyTWlkZGxld2FyZS5qcyJdLCJuYW1lcyI6WyJyb3V0ZXJNaWRkbGV3YXJlIiwibGlzdGVuaW5nIiwicHJvY2VzcyIsImJyb3dzZXIiLCJvblJvdXRlQ2hhbmdlU3RhcnQiLCJwYXVzZWQiLCJFcnJvciIsIm5leHQiLCJwYXRobmFtZSIsInVybCIsIm9uUm91dGVDaGFuZ2VDb21wbGV0ZSIsIm9uUm91dGVDaGFuZ2VFcnJvciIsImFjdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBR3dCLEE7O0FBSHhCOzs7O0FBQ0E7Ozs7OztBQUVlLFNBQVMsQUFBVCxtQkFBNEIsQUFDekM7TUFBSSxpQkFBSixBQUNBO1NBQU8saUJBQUE7V0FBUyxnQkFBQTthQUFRLGtCQUFVLEFBQ2hDO1lBQUksUUFBUSxBQUFSLFdBQW1CLENBQUMsQUFBeEIsV0FBbUMsQUFDakM7MEJBQU8sQUFBUCxxQkFBNEIsZUFBTyxBQUNqQztnQkFBSSxnQkFBTyxBQUFYLFFBQW1CLEFBQ2pCO29CQUFNLElBQUksQUFBSixNQUFVLEFBQVYsQUFBTixBQUNEO0FBQ0Q7bUJBQU8sS0FBSywwQkFBYSxnQkFBTyxBQUFwQixVQUE4QixBQUE5QixBQUFMLEFBQVAsQUFDRDtBQUxELEFBTUE7MEJBQU8sQUFBUCx3QkFBK0IsWUFBQTttQkFBTSxLQUFLLFlBQUwsQUFBTjtBQUEvQixBQUNBOzBCQUFPLEFBQVAscUJBQTRCLFlBQUE7bUJBQU0sS0FBSyxZQUFMLEFBQU47QUFBNUIsQUFDQTtzQkFBWSxBQUFaLEFBQ0Q7QUFDRDtlQUFPLEtBQUssQUFBTCxBQUFQLEFBQ0Q7QUFiZTtBQUFUO0FBQVAsQUFjRCIsImZpbGUiOiJyb3V0ZXJNaWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9hbmRyZXdfd29ya3N0YXRpb24vRG9jdW1lbnRzL1dvcmsvZGF0YXNrZXB0aWMuY29tIn0=