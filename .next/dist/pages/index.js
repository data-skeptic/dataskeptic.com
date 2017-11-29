'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class,
    _jsxFileName = '/Users/andrew_workstation/Documents/Work/dataskeptic.com/pages/index.js?entry';

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

var _SubscribeForm = require('../modules/Home/Components/SubscribeForm');

var _SubscribeForm2 = _interopRequireDefault(_SubscribeForm);

var _reactFinalForm = require('react-final-form');

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
                        lineNumber: 24
                    }
                }),
                title: 'Interview with Rohan Kumar, GM for the Database Systems Group at Microsoft',
                description: 'This episode features discussion of database as a service, database migration, threat detection, R/python in SQL Server, and use cases',
                author: 'Kyle Polish',
                avatar: 'http://via.placeholder.com/45x45',
                date: 'June 12, 2017'
            };

            latestEpisode = {
                name: 'The Latest on the Blog',
                media: _react2.default.createElement('img', { src: 'http://via.placeholder.com/45x45', alt: 'avatar', __source: {
                        fileName: _jsxFileName,
                        lineNumber: 34
                    }
                }),
                title: 'Everything I`ve learned about the USC/L.A. Times poll',
                description: 'In statistics, two random variables might depend on one another. We call this conditional dependence... ',
                author: 'Christine Zhang',
                avatar: 'http://via.placeholder.com/45x45',
                date: 'June 9,  2017'
            };
            sponsor = {
                name: 'Daily sponsor',
                media: 'http://via.placeholder.com/45x45',
                title: 'Thanks to Brilliant for sponsoring this week`s episode of Data Skeptic',
                promo: 'Please visit http://brilliant.org/dataskeptics but only if you`re clever'

            };

            return _react2.default.createElement(_Container2.default, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 50
                }
            }, _react2.default.createElement(Intro, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 51
                }
            }, _react2.default.createElement(_Marker2.default, {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 52
                }
            }, 'Data Skeptic'), ' is your source for a perspective of scientific skepticism'), _react2.default.createElement(_Cards2.default, {
                latestPost: latestPost,
                latestEpisode: latestEpisode,
                sponsor: sponsor,
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 55
                }
            }), _react2.default.createElement(_reactFinalForm.Form, {
                onSubmit: function onSubmit(data) {
                    return alert(data);
                },
                render: _SubscribeForm2.default, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 60
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbIkRhc2hib2FyZCIsInByb3BzIiwibGF0ZXN0UG9zdCIsImxhdGVzdEVwaXNvZGUiLCJzcG9uc29yIiwibmFtZSIsIm1lZGlhIiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsImF1dGhvciIsImF2YXRhciIsImRhdGUiLCJwcm9tbyIsImRhdGEiLCJhbGVydCIsInN0b3JlIiwiZGlzcGF0Y2giLCJnZXRTdGF0ZSIsInF1ZXJ5Iiwic3RhdGUiLCJwcm9taXNlcyIsImFsbCIsIkludHJvIiwiaDEiLCJ0aGVtZSIsImNvbG9ycyIsImRhcmsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7OztJLEFBRXFCOzs7Ozs7Ozs7O2lDQVFSO3lCQUNzQyxLQUR0QyxBQUMyQztnQkFEM0MsQUFDQSxvQkFEQSxBQUNBO2dCQURBLEFBQ1ksdUJBRFosQUFDWTtnQkFEWixBQUMyQixpQkFEM0IsQUFDMkIsQUFFaEM7OztzQkFBYSxBQUNILEFBQ047OERBQVksS0FBTCxBQUFTLG9DQUFtQyxLQUE1QyxBQUFnRDtrQ0FBaEQ7b0NBRkUsQUFFRixBQUNQO0FBRE87aUJBQUE7dUJBRkUsQUFHRixBQUNQOzZCQUpTLEFBSUksQUFDYjt3QkFMUyxBQUtELEFBQ1I7d0JBTlMsQUFNRCxBQUNSO3NCQVBKLEFBQWEsQUFPSCxBQUdWO0FBVmEsQUFDVDs7O3NCQVNZLEFBQ04sQUFDTjs4REFBWSxLQUFMLEFBQVMsb0NBQW1DLEtBQTVDLEFBQWdEO2tDQUFoRDtvQ0FGSyxBQUVMLEFBQ1A7QUFETztpQkFBQTt1QkFGSyxBQUdMLEFBQ1A7NkJBSlksQUFJQyxBQUNiO3dCQUxZLEFBS0osQUFDUjt3QkFOWSxBQU1KLEFBQ1I7c0JBUEosQUFBZ0IsQUFPTixBQUVWO0FBVGdCLEFBQ1o7O3NCQVFJLEFBQ0UsQUFDTjt1QkFGSSxBQUVFLEFBQ047dUJBSEksQUFHRSxBQUNOO3VCQUpKLEFBQVEsQUFJRSxBQUlWOztBQVJRLEFBQ0o7O21DQVFBLDBCQUFBOzs4QkFBQTtnQ0FBQSxBQUNJO0FBREo7QUFBQSxhQUFBLGtCQUNLLGNBQUQ7OzhCQUFBO2dDQUFBLEFBQ0k7QUFESjtBQUFBLCtCQUNJLHVCQUFBOzs4QkFBQTtnQ0FBQTtBQUFBO0FBQUEsZUFESixBQUNJLGlCQUZSLEFBQ0ksQUFJQTs0QkFBQSxBQUNnQixBQUNaOytCQUZKLEFBRW1CLEFBQ2Y7eUJBSEosQUFHYTs7OEJBSGI7Z0NBTEosQUFLSSxBQUtBO0FBTEE7QUFDSTswQkFLVSxrQkFBQSxBQUFDLE1BQUQ7MkJBQVUsTUFBVixBQUFVLEFBQU07QUFEOUIsQUFFSTt3Q0FGSjs4QkFBQTtnQ0FYUixBQUNJLEFBVUksQUFLWDtBQUxXO0FBQ0k7Ozs7Ozt3Q0FoRGMsQTtvQkFBUSxBLHVCQUFBLEE7b0JBQVUsQSx1QkFBQSxBO29CQUFXLEEsYyxBQUFBOzs7OztpQ0FDakQ7QSx3Q0FBUSxBQUNSLEE7QSwyQyxBQUFXOzt1Q0FDWCxrQkFBQSxBQUFRLElBQVIsQUFBWSxBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkFMTCxBOztBQXdEckIsSUFBTSxtQ0FBQSxBQUFlO2lCQUFmO0FBQUEsQ0FBUSxpSUFNZSxpQkFBQTtXQUFTLE1BQUEsQUFBTSxNQUFOLEFBQVksT0FBckIsQUFBNEI7QUFObkQsR0FPTyxpQkFBQTtXQUFTLE1BQUEsQUFBTSxNQUFOLEFBQVksT0FBckIsQUFBNEI7QUFQekMsQUFBTSIsImZpbGUiOiJpbmRleC5qcz9lbnRyeSIsInNvdXJjZVJvb3QiOiIvVXNlcnMvYW5kcmV3X3dvcmtzdGF0aW9uL0RvY3VtZW50cy9Xb3JrL2RhdGFza2VwdGljLmNvbSJ9