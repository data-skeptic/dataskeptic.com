"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = clientMiddleware;

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function clientMiddleware(client) {
  return function (store) {
    return function (next) {
      return function (action) {
        var promise = action.promise,
            types = action.types,
            rest = (0, _objectWithoutProperties3.default)(action, ["promise", "types"]);

        if (!promise) {
          return next(action);
        }

        var _types = (0, _slicedToArray3.default)(types, 3),
            REQUEST = _types[0],
            SUCCESS = _types[1],
            FAILURE = _types[2];

        next((0, _extends3.default)({}, rest, { type: REQUEST }));
        return promise(client, store.getState()).then(function (result) {
          return next((0, _extends3.default)({}, rest, { result: result, type: SUCCESS }));
        }, function (error) {
          return next((0, _extends3.default)({}, rest, { error: error, type: FAILURE }));
        });
      };
    };
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlZHV4L21pZGRsZXdhcmUvY2xpZW50TWlkZGxld2FyZS5qcyJdLCJuYW1lcyI6WyJjbGllbnRNaWRkbGV3YXJlIiwiY2xpZW50IiwicHJvbWlzZSIsImFjdGlvbiIsInR5cGVzIiwicmVzdCIsIm5leHQiLCJSRVFVRVNUIiwiU1VDQ0VTUyIsIkZBSUxVUkUiLCJ0eXBlIiwic3RvcmUiLCJnZXRTdGF0ZSIsInRoZW4iLCJyZXN1bHQiLCJlcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQUF3QixBOzs7Ozs7QUFBVCxTQUFBLEFBQVMsaUJBQVQsQUFBMEIsUUFBUSxBQUMvQztTQUFPLGlCQUFBO1dBQVMsZ0JBQUE7YUFBUSxrQkFBVTtZQUFBLEFBQ3hCLFVBRHdCLEFBQ0ksT0FESixBQUN4QjtZQUR3QixBQUNmLFFBRGUsQUFDSSxPQURKLEFBQ2Y7WUFEZSxBQUNMLDhDQURLLEFBQ0ksb0JBQ3BDOztZQUFJLENBQUosQUFBSyxTQUFTLEFBQ1o7aUJBQU8sS0FBUCxBQUFPLEFBQUssQUFDYjtBQUorQjs7a0RBQUEsQUFNSSxPQU5KO1lBQUEsQUFNekIsaUJBTnlCO1lBQUEsQUFNaEIsaUJBTmdCO1lBQUEsQUFNUCxpQkFDekI7O3dDQUFBLEFBQVUsUUFBTSxNQUFoQixBQUFzQixBQUN0Qjt1QkFBTyxBQUFRLFFBQVEsTUFBaEIsQUFBZ0IsQUFBTSxZQUF0QixBQUFrQyxLQUN2QyxrQkFBQTtpQkFBVSxnQ0FBQSxBQUFVLFFBQU0sUUFBaEIsUUFBd0IsTUFBbEMsQUFBVSxBQUE4QjtBQURuQyxTQUFBLEVBRUwsaUJBQUE7aUJBQVMsZ0NBQUEsQUFBVSxRQUFNLE9BQWhCLE9BQXVCLE1BQWhDLEFBQVMsQUFBNkI7QUFGeEMsQUFBTyxBQUlSO0FBWmU7QUFBVDtBQUFQLEFBYUQiLCJmaWxlIjoiY2xpZW50TWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvYW5kcmV3X3dvcmtzdGF0aW9uL0RvY3VtZW50cy9Xb3JrL2RhdGFza2VwdGljLmNvbSJ9