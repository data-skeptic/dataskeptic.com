'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _regenerator = require('next/node_modules/babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('next/node_modules/babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('next/node_modules/babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('next/node_modules/babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('next/node_modules/babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('next/node_modules/babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('next/node_modules/babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('next/node_modules/babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class,
    _jsxFileName = '/Users/ilya/Work/dataskeptic.com/pages/index.js?entry';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Container = require('../components/Container');

var _Container2 = _interopRequireDefault(_Container);

var _Page = require('../hoc/Page');

var _Page2 = _interopRequireDefault(_Page);

var _Home = require('../modules/Home/Container/Home');

var _Home2 = _interopRequireDefault(_Home);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Dashboard = (0, _Page2.default)(_class = function (_Component) {
  (0, _inherits3.default)(Dashboard, _Component);

  function Dashboard() {
    (0, _classCallCheck3.default)(this, Dashboard);
    return (0, _possibleConstructorReturn3.default)(this, (Dashboard.__proto__ || (0, _getPrototypeOf2.default)(Dashboard)).apply(this, arguments));
  }

  (0, _createClass3.default)(Dashboard, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_Container2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 16
        }
      }, _react2.default.createElement(_Home2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 17
        }
      }));
    }
  }], [{
    key: 'getInitialProps',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref2) {
        var _ref2$store = _ref2.store,
            dispatch = _ref2$store.dispatch,
            getState = _ref2$store.getState,
            query = _ref2.query;
        var state, promises;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                state = getState();
                promises = [];
                _context.next = 4;
                return _promise2.default.all(promises);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getInitialProps(_x) {
        return _ref.apply(this, arguments);
      }

      return getInitialProps;
    }()
  }]);
  return Dashboard;
}(_react.Component)) || _class;

exports.default = Dashboard;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbIkRhc2hib2FyZCIsInN0b3JlIiwiZGlzcGF0Y2giLCJnZXRTdGF0ZSIsInF1ZXJ5Iiwic3RhdGUiLCJwcm9taXNlcyIsImFsbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBR3FCLEE7Ozs7Ozs7Ozs7NkJBT1YsQUFDUDs2QkFDRSwwQkFBQTs7b0JBQUE7c0JBQUEsQUFDRTtBQURGO0FBQUEsT0FBQTs7b0JBQ0U7c0JBRkosQUFDRSxBQUNFLEFBR0w7QUFISztBQUFBOzs7Ozs7Z0NBVHlCLEE7WSxBQUFTLHVCQUFBLEE7WSxBQUFVLHVCQUFBLEE7WUFBWSxBLGMsQUFBQTs7Ozs7bUJBQ3REO0Esd0JBQVEsQUFDUixBO0EsMkIsQUFBVzs7dUJBQ1gsa0JBQUEsQUFBUSxJQUFSLEFBQVksQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JBSkQsQSIsImZpbGUiOiJpbmRleC5qcz9lbnRyeSIsInNvdXJjZVJvb3QiOiIvVXNlcnMvaWx5YS9Xb3JrL2RhdGFza2VwdGljLmNvbSJ9