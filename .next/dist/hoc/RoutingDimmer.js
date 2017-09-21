'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('next/node_modules/babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('next/node_modules/babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _jsxFileName = '/Users/ilya/Work/dataskeptic.com/hoc/RoutingDimmer.js';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _router = require('../redux/modules/router');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var routingDimmer = function routingDimmer(WrappedComponent) {
  var _dec, _class;

  var RoutingDimmer = (_dec = (0, _reactRedux.connect)(function (state) {
    return {
      changingPage: (0, _router.isRoutingToDifferentPage)(state)
    };
  }), _dec(_class = function (_Component) {
    (0, _inherits3.default)(RoutingDimmer, _Component);

    function RoutingDimmer() {
      (0, _classCallCheck3.default)(this, RoutingDimmer);
      return (0, _possibleConstructorReturn3.default)(this, (RoutingDimmer.__proto__ || (0, _getPrototypeOf2.default)(RoutingDimmer)).apply(this, arguments));
    }

    (0, _createClass3.default)(RoutingDimmer, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            changingPage = _props.changingPage,
            rest = (0, _objectWithoutProperties3.default)(_props, ['changingPage']);

        var style = changingPage ? { opacity: 0.4 } : {};
        return _react2.default.createElement('div', { style: style, __source: {
            fileName: _jsxFileName,
            lineNumber: 14
          }
        }, _react2.default.createElement(WrappedComponent, (0, _extends3.default)({}, rest, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 15
          }
        })));
      }
    }]);
    return RoutingDimmer;
  }(_react.Component)) || _class);

  return RoutingDimmer;
};

exports.default = routingDimmer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvYy9Sb3V0aW5nRGltbWVyLmpzIl0sIm5hbWVzIjpbInJvdXRpbmdEaW1tZXIiLCJSb3V0aW5nRGltbWVyIiwiY2hhbmdpbmdQYWdlIiwic3RhdGUiLCJwcm9wcyIsInJlc3QiLCJzdHlsZSIsIm9wYWNpdHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBLElBQU0sZ0JBQWdCLFNBQWhCLEFBQWdCLGdDQUFvQjtZQUFBOztNQUFBLEFBSWxDLGlEQUhHLGlCQUFBOztvQkFDTyxzQ0FEUCxBQUFVLEFBQ0gsQUFBeUI7QUFEdEIsQUFDakI7QUFGc0MsQUFDdkMsR0FBQSx1Q0FEdUM7MkNBQUE7OzZCQUFBOzBDQUFBO2tKQUFBO0FBQUE7OztXQUFBOytCQUs3QjtxQkFDMkIsS0FEM0IsQUFDZ0M7WUFEaEMsQUFDQyxzQkFERCxBQUNDO1lBREQsQUFDa0IsdURBQ3pCOztZQUFNLFFBQVEsZUFBZSxFQUFFLFNBQWpCLEFBQWUsQUFBVyxRQUF4QyxBQUFnRCxBQUNoRDsrQkFDRSxjQUFBLFNBQUssT0FBTCxBQUFZO3NCQUFaO3dCQUFBLEFBQ0U7QUFERjtTQUFBLGdDQUNFLEFBQUMsNkNBQUQsQUFBc0I7O3NCQUF0Qjt3QkFGSixBQUNFLEFBQ0UsQUFHTDtBQUhLO0FBQUE7QUFWZ0M7QUFBQTtXQUFBOzBCQWdCeEM7O1NBQUEsQUFBTyxBQUNSO0FBakJEOztrQkFtQmUsQSIsImZpbGUiOiJSb3V0aW5nRGltbWVyLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9pbHlhL1dvcmsvZGF0YXNrZXB0aWMuY29tIn0=