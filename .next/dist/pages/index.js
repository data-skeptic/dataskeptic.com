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
    _jsxFileName = '/Users/glozhkovoy/Work/dataskeptic.com/pages/index.js?entry';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Container = require('../components/Container');

var _Container2 = _interopRequireDefault(_Container);

var _Marker = require('../components/Marker');

var _Marker2 = _interopRequireDefault(_Marker);

var _Page = require('../hoc/Page');

var _Page2 = _interopRequireDefault(_Page);

var _Cards = require('../modules/Home/Components/Cards');

var _Cards2 = _interopRequireDefault(_Cards);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

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
            var _props = this.props,
                latestPost = _props.latestPost,
                latestEpisode = _props.latestEpisode,
                sponsor = _props.sponsor;

            latestPost = {
                name: 'The Latest on the Podcast',
                media: _react2.default.createElement('img', { src: 'http://via.placeholder.com/45x45', alt: 'avatar', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 22
                    }
                }),
                title: 'Interview with Rohan Kumar, GM for the Database Systems Group at Microsoft',
                description: 'This episode features discussion of database as a service, database migration, threat detection, R/python in SQL Server, and use cases',
                author: 'Kyle Polish',
                avatar: 'http://via.placeholder.com/45x45',
                date: 'June 12, 2017'
            };

            latestEpisode = {
                name: 'The Latest on the Podcast',
                media: _react2.default.createElement('img', { src: 'http://via.placeholder.com/45x45', alt: 'avatar', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 32
                    }
                }),
                title: 'Interview with Rohan Kumar, GM for the Database Systems Group at Microsoft',
                description: 'This episode features discussion of database as a service, database migration, threat detection, R/python in SQL Server, and use cases',
                author: 'Kyle Polish',
                avatar: 'http://via.placeholder.com/45x45',
                date: 'June 12, 2017'
            };

            return _react2.default.createElement(_Container2.default, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 41
                }
            }, _react2.default.createElement(Intro, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 42
                }
            }, _react2.default.createElement(_Marker2.default, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 43
                }
            }, 'Data Skeptic'), 'is your source for a perspective of scientific skepticism'), _react2.default.createElement(_Cards2.default, {
                latestPost: latestPost,
                latestEpisode: latestEpisode,
                sponsor: sponsor,
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 46
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

var Intro = _styledComponents2.default.h1.withConfig({
    displayName: 'pages__Intro'
})(['font-size:48px;padding:6px 0px;padding-left:50px;text-align:justify;margin-top:85px;border-left:4px solid ', ';color:', ''], function (props) {
    return props.theme.colors.dark;
}, function (props) {
    return props.theme.colors.dark;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbIkRhc2hib2FyZCIsInByb3BzIiwibGF0ZXN0UG9zdCIsImxhdGVzdEVwaXNvZGUiLCJzcG9uc29yIiwibmFtZSIsIm1lZGlhIiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsImF1dGhvciIsImF2YXRhciIsImRhdGUiLCJzdG9yZSIsImRpc3BhdGNoIiwiZ2V0U3RhdGUiLCJxdWVyeSIsInN0YXRlIiwicHJvbWlzZXMiLCJhbGwiLCJJbnRybyIsImgxIiwidGhlbWUiLCJjb2xvcnMiLCJkYXJrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0ksQUFHcUI7Ozs7Ozs7Ozs7aUNBUVI7eUJBQ3NDLEtBRHRDLEFBQzJDO2dCQUQzQyxBQUNBLG9CQURBLEFBQ0E7Z0JBREEsQUFDWSx1QkFEWixBQUNZO2dCQURaLEFBQzJCLGlCQUQzQixBQUMyQixBQUVoQzs7O3NCQUFhLEFBQ0gsQUFDTjs4REFBWSxLQUFMLEFBQVMsb0NBQW1DLEtBQTVDLEFBQWdEO2tDQUFoRDtvQ0FGRSxBQUVGLEFBQ1A7QUFETztpQkFBQTt1QkFGRSxBQUdGLEFBQ1A7NkJBSlMsQUFJSSxBQUNiO3dCQUxTLEFBS0QsQUFDUjt3QkFOUyxBQU1ELEFBQ1I7c0JBUEosQUFBYSxBQU9ILEFBR1Y7QUFWYSxBQUNUOzs7c0JBU1ksQUFDTixBQUNOOzhEQUFZLEtBQUwsQUFBUyxvQ0FBbUMsS0FBNUMsQUFBZ0Q7a0NBQWhEO29DQUZLLEFBRUwsQUFDUDtBQURPO2lCQUFBO3VCQUZLLEFBR0wsQUFDUDs2QkFKWSxBQUlDLEFBQ2I7d0JBTFksQUFLSixBQUNSO3dCQU5ZLEFBTUosQUFDUjtzQkFQSixBQUFnQixBQU9OLEFBR1Y7QUFWZ0IsQUFDWjs7bUNBVUEsMEJBQUE7OzhCQUFBO2dDQUFBLEFBQ0k7QUFESjtBQUFBLGFBQUEsa0JBQ0ssY0FBRDs7OEJBQUE7Z0NBQUEsQUFDSTtBQURKO0FBQUEsK0JBQ0ksdUJBQUE7OzhCQUFBO2dDQUFBO0FBQUE7QUFBQSxlQURKLEFBQ0ksaUJBRlIsQUFDSSxBQUlBOzRCQUFBLEFBQ2dCLEFBQ1o7K0JBRkosQUFFbUIsQUFDZjt5QkFISixBQUdhOzs4QkFIYjtnQ0FOUixBQUNJLEFBS0ksQUFPWDtBQVBXO0FBQ0k7Ozs7Ozt3QyxBQXBDYztvQkFBUSxBLHVCQUFBLEE7b0JBQVUsQSx1QixBQUFBO29CQUFXLEEsYyxBQUFBOzs7OztpQ0FDakQ7QSx3QyxBQUFRLEFBQ1I7QSwyQ0FBVyxBOzt1Q0FDWCxrQkFBQSxBQUFRLEksQUFBUixBQUFZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQixBQUxMOztBQThDckIsSUFBTSxtQ0FBQSxBQUFlO2lCQUFmO0FBQUEsQ0FBUSxpSUFNZSxpQkFBQTtXQUFTLE1BQUEsQUFBTSxNQUFOLEFBQVksT0FBckIsQUFBNEI7QUFObkQsR0FPTyxpQkFBQTtXQUFTLE1BQUEsQUFBTSxNQUFOLEFBQVksT0FBckIsQUFBNEI7QUFQekMsQUFBTSIsImZpbGUiOiJpbmRleC5qcz9lbnRyeSIsInNvdXJjZVJvb3QiOiIvVXNlcnMvZ2xvemhrb3ZveS9Xb3JrL2RhdGFza2VwdGljLmNvbSJ9