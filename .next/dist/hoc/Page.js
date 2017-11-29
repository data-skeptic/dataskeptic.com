'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _jsxFileName = '/Users/andrew_workstation/Documents/Work/dataskeptic.com/hoc/Page.js';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _initStore = require('../redux/initStore');

var _initStore2 = _interopRequireDefault(_initStore);

var _client = require('../client');

var _client2 = _interopRequireDefault(_client);

var _Layout = require('../components/Layout');

var _Layout2 = _interopRequireDefault(_Layout);

var _RoutingDimmer = require('./RoutingDimmer');

var _RoutingDimmer2 = _interopRequireDefault(_RoutingDimmer);

require('mdn-polyfills/Object.assign');

require('mdn-polyfills/String.prototype.startsWith');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

if (process.browser) {
  window.RichTextEditor = require('react-rte').default;
}

var page = function page(WrappedComponent) {
  var DimmedComponent = (0, _RoutingDimmer2.default)(WrappedComponent);

  var Page = function (_Component) {
    (0, _inherits3.default)(Page, _Component);
    (0, _createClass3.default)(Page, null, [{
      key: 'getInitialProps',
      value: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(context) {
          var cookie, client, store, otherProps;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  cookie = context.req && context.req.headers.cookie;
                  client = (0, _client2.default)(cookie);
                  store = (0, _initStore2.default)(undefined, client);

                  if (!WrappedComponent.getInitialProps) {
                    _context.next = 9;
                    break;
                  }

                  _context.next = 6;
                  return WrappedComponent.getInitialProps((0, _extends3.default)({}, context, { store: store }));

                case 6:
                  _context.t0 = _context.sent;
                  _context.next = 10;
                  break;

                case 9:
                  _context.t0 = {};

                case 10:
                  otherProps = _context.t0;
                  return _context.abrupt('return', (0, _extends3.default)({}, otherProps, { initialState: store.getState(), cookie: cookie }));

                case 12:
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

    function Page(props) {
      (0, _classCallCheck3.default)(this, Page);

      var _this = (0, _possibleConstructorReturn3.default)(this, (Page.__proto__ || (0, _getPrototypeOf2.default)(Page)).call(this, props));

      var client = (0, _client2.default)(process.browser ? undefined : props.cookie);
      _this.store = (0, _initStore2.default)(props.initialState, client);
      return _this;
    }

    (0, _createClass3.default)(Page, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            initialState = _props.initialState,
            cookie = _props.cookie,
            rest = (0, _objectWithoutProperties3.default)(_props, ['initialState', 'cookie']);

        return _react2.default.createElement(_reactRedux.Provider, { store: this.store, __source: {
            fileName: _jsxFileName,
            lineNumber: 39
          }
        }, _react2.default.createElement(_Layout2.default, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 40
          }
        }, _react2.default.createElement(DimmedComponent, (0, _extends3.default)({}, rest, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 41
          }
        }))));
      }
    }]);
    return Page;
  }(_react.Component);

  return Page;
};

exports.default = page;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvYy9QYWdlLmpzIl0sIm5hbWVzIjpbInByb2Nlc3MiLCJicm93c2VyIiwid2luZG93IiwiUmljaFRleHRFZGl0b3IiLCJyZXF1aXJlIiwiZGVmYXVsdCIsInBhZ2UiLCJEaW1tZWRDb21wb25lbnQiLCJXcmFwcGVkQ29tcG9uZW50IiwiUGFnZSIsImNvbnRleHQiLCJjb29raWUiLCJyZXEiLCJoZWFkZXJzIiwiY2xpZW50Iiwic3RvcmUiLCJ1bmRlZmluZWQiLCJnZXRJbml0aWFsUHJvcHMiLCJvdGhlclByb3BzIiwiaW5pdGlhbFN0YXRlIiwiZ2V0U3RhdGUiLCJwcm9wcyIsInJlc3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7QUFFQSxJQUFJLFFBQUosQUFBWSxTQUFTLEFBQ25CO1NBQUEsQUFBTyxpQkFBaUIscUJBQXhCLEFBQTZDLEFBQzlDOzs7QUFJRCxJQUFNLE9BQU8sU0FBUCxBQUFPLHVCQUFvQixBQUMvQjtNQUFNLGtCQUFrQiw2QkFETyxBQUMvQixBQUF3QixBQUFjOztNQURQLEFBRXpCLDZCQUZ5QjtrQ0FBQTs7V0FBQTt5QkFBQTs2R0FBQSxBQUdBLFNBSEE7cUNBQUE7d0VBQUE7c0JBQUE7K0NBQUE7cUJBSXJCO0FBSnFCLDJCQUlaLFFBQUEsQUFBUSxPQUFPLFFBQUEsQUFBUSxJQUFSLEFBQVksUUFKZixBQUl1QixBQUM1QztBQUxxQiwyQkFLWixzQkFMWSxBQUtaLEFBQVcsQUFDcEI7QUFOcUIsMEJBTWIseUJBQUEsQUFBVSxXQU5HLEFBTWIsQUFBcUI7O3VCQUVoQixpQkFSUSxBQVFTLGlCQVJUO29DQUFBO0FBQUE7QUFBQTs7a0NBQUE7eUJBU2pCLGlCQUFBLEFBQWlCLDJDQUFqQixBQUFzQyxXQUFTLE9BVDlCLEFBU2pCOztxQkFUaUI7eUNBQUE7a0NBQUE7QUFBQTs7cUJBQUE7Z0NBQUEsQUFVdkI7O3FCQUZFO0FBUnFCLHdDQUFBOzhFQUFBLEFBWWYsY0FBWSxjQUFjLE1BWlgsQUFZVyxBQUFNLFlBQVksUUFaN0I7O3FCQUFBO3FCQUFBO2tDQUFBOztBQUFBO3NCQUFBO0FBQUE7O3FDQUFBO2tDQUFBO0FBQUE7O2VBQUE7QUFBQSxBQWU3QjtBQWY2Qjs7a0JBZTdCLEFBQVksT0FBTzswQ0FBQTs7b0lBQUEsQUFDWCxBQUNOOztVQUFNLFNBQVMsc0JBQVcsUUFBQSxBQUFRLFVBQVIsQUFBa0IsWUFBWSxNQUF4RCxBQUFlLEFBQStDLEFBQzlEO1lBQUEsQUFBSyxRQUFRLHlCQUFVLE1BQVYsQUFBZ0IsY0FIWixBQUdqQixBQUFhLEFBQThCO2FBQzVDO0FBbkI0Qjs7O1dBQUE7K0JBb0JwQjtxQkFDbUMsS0FEbkMsQUFDd0M7WUFEeEMsQUFDQyxzQkFERCxBQUNDO1lBREQsQUFDZSxnQkFEZixBQUNlO1lBRGYsQUFDMEIsdUVBQ2pDOzsrQkFDRSwwQkFBQSxZQUFVLE9BQU8sS0FBakIsQUFBc0I7c0JBQXRCO3dCQUFBLEFBQ0U7QUFERjtTQUFBLGtCQUNFLHVCQUFBOztzQkFBQTt3QkFBQSxBQUNFO0FBREY7QUFBQSx5Q0FDRSxBQUFDLDRDQUFELEFBQXFCOztzQkFBckI7d0JBSE4sQUFDRSxBQUNFLEFBQ0UsQUFJUDtBQUpPO0FBQUE7QUF6QnFCO0FBQUE7V0FBQTtXQWdDL0I7O1NBQUEsQUFBTyxBQUNSO0FBakNEOztrQkFtQ2UsQSIsImZpbGUiOiJQYWdlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9hbmRyZXdfd29ya3N0YXRpb24vRG9jdW1lbnRzL1dvcmsvZGF0YXNrZXB0aWMuY29tIn0=