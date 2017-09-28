'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('next/node_modules/babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('next/node_modules/babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var formatUrl = function formatUrl(path) {
  var adjustedPath = path[0] !== '/' ? '/' + path : path;
  if (process.browser) {
    // Prepend `/api` to relative URL, to proxy to API server.
    return '/api' + adjustedPath;
  }
  // Prepend host and port of the API server to the path.
  return 'http://localhost:' + _config2.default.apiPort + adjustedPath;
};

var cached = void 0;

var cache = function cache(client) {
  if (process.browser) {
    if (cached) {
      return cached;
    }
    cached = client;
  }
  return client;
};

var initClient = function initClient(cookie) {
  var send = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(request) {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (cookie) {
                request.set('Cookie', cookie);
              }
              _context.prev = 1;
              _context.next = 4;
              return request;

            case 4:
              return _context.abrupt('return', _context.sent.body);

            case 7:
              _context.prev = 7;
              _context.t0 = _context['catch'](1);

              if (!(_context.t0.status === 404)) {
                _context.next = 11;
                break;
              }

              return _context.abrupt('return', null);

            case 11:
              if (!_context.t0.response.body) {
                _context.next = 13;
                break;
              }

              throw _context.t0.response.body;

            case 13:
              throw _context.t0;

            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[1, 7]]);
    }));

    return function send(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  return cache({
    get: function get(path) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return send(_superagent2.default.get(formatUrl(path)).accept('json').query(params.params || params));
    }, // hack to accommodate webapp ApiClient API

    post: function post(path) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var asParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      return send(_superagent2.default.post(formatUrl(path)).accept('json').type(asParams ? 'form' : 'json').send(data));
    },

    put: function put(path) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return send(_superagent2.default.put(formatUrl(path)).accept('json').type('json').send(data));
    },

    del: function del(path) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return send(_superagent2.default.del(formatUrl(path)).accept('json').send(params.params || params));
    }
  });
};

exports.default = initClient;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsaWVudC5qcyJdLCJuYW1lcyI6WyJmb3JtYXRVcmwiLCJwYXRoIiwiYWRqdXN0ZWRQYXRoIiwicHJvY2VzcyIsImJyb3dzZXIiLCJhcGlQb3J0IiwiY2FjaGVkIiwiY2FjaGUiLCJjbGllbnQiLCJpbml0Q2xpZW50IiwiY29va2llIiwic2VuZCIsInJlcXVlc3QiLCJzZXQiLCJib2R5Iiwic3RhdHVzIiwicmVzcG9uc2UiLCJnZXQiLCJwYXJhbXMiLCJhY2NlcHQiLCJxdWVyeSIsInBvc3QiLCJkYXRhIiwiYXNQYXJhbXMiLCJ0eXBlIiwicHV0IiwiZGVsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTSxZQUFZLFNBQVosQUFBWSxVQUFBLEFBQUMsTUFBeUIsQUFDMUM7TUFBTSxlQUFlLEtBQUEsQUFBSyxPQUFMLEFBQVksTUFBTSxNQUFsQixBQUF3QixPQUE3QyxBQUFvRCxBQUNwRDtNQUFJLFFBQUosQUFBWSxTQUFTLEFBQ25CO0FBQ0E7b0JBQUEsQUFBYyxBQUNmO0FBQ0Q7QUFDQTsrQkFBMkIsaUJBQTNCLEFBQWtDLFVBQWxDLEFBQTRDLEFBQzdDO0FBUkQ7O0FBVUEsSUFBSSxjQUFKOztBQUVBLElBQU0sUUFBUSxTQUFSLEFBQVEsTUFBQSxBQUFDLFFBQVcsQUFDeEI7TUFBSSxRQUFKLEFBQVksU0FBUyxBQUNuQjtRQUFBLEFBQUksUUFBUSxBQUNWO2FBQUEsQUFBTyxBQUNSO0FBQ0Q7YUFBQSxBQUFTLEFBQ1Y7QUFDRDtTQUFBLEFBQU8sQUFDUjtBQVJEOztBQVVBLElBQU0sYUFBYSxTQUFiLEFBQWEsV0FBQSxBQUFDLFFBQVcsQUFDN0I7TUFBTSxtQkFBQTt3RkFBTyxpQkFBQSxBQUFPLFNBQVA7b0VBQUE7a0JBQUE7MkNBQUE7aUJBQ1g7a0JBQUEsQUFBSSxRQUFRLEFBQ1Y7d0JBQUEsQUFBUSxJQUFSLEFBQVksVUFBWixBQUFzQixBQUN2QjtBQUhVOzhCQUFBOzhCQUFBO3FCQUFBLEFBS0s7O2lCQUxMOzZEQUFBLEFBS2M7O2lCQUxkOzhCQUFBOzhDQUFBOztvQkFPTCxZQUFBLEFBQU0sV0FQRCxBQU9ZLE1BUFo7Z0NBQUE7QUFBQTtBQUFBOzsrQ0FBQSxBQVFBOztpQkFSQTttQkFVTCxZQUFBLEFBQU0sU0FWRCxBQVVVLE1BVlY7Z0NBQUE7QUFBQTtBQUFBOztvQkFXRCxZQUFBLEFBQU0sU0FYTCxBQVdjOztpQkFYZDs2QkFBQTs7aUJBQUE7aUJBQUE7OEJBQUE7O0FBQUE7a0NBQUE7QUFBUDs7NkJBQUE7OEJBQUE7QUFBQTtBQUFOLEFBaUJBOzs7U0FDTyxhQUFBLEFBQUMsTUFBRDtVQUFBLEFBQWUsNkVBQWYsQUFBd0I7YUFDM0IsS0FDRSxxQkFBQSxBQUNHLElBQUksVUFEUCxBQUNPLEFBQVUsT0FEakIsQUFFRyxPQUZILEFBRVUsUUFGVixBQUdHLE1BQU0sT0FBQSxBQUFPLFVBTGYsQUFDSCxBQUNFLEFBRzBCO0FBTm5CLE9BT04sQUFFTDs7VUFBTSxjQUFBLEFBQ0osTUFESTtVQUFBLEFBRUosMkVBRkksQUFFVztVQUZYLEFBR0osK0VBSEksQUFHaUI7YUFFckIsS0FDRSxxQkFBQSxBQUNHLEtBQUssVUFEUixBQUNRLEFBQVUsT0FEbEIsQUFFRyxPQUZILEFBRVUsUUFGVixBQUdHLEtBQUssV0FBQSxBQUFXLFNBSG5CLEFBRzRCLFFBSDVCLEFBSUcsS0FWRCxBQUtKLEFBQ0UsQUFJUTtBQW5CRCxBQXNCWDs7U0FBSyxhQUFBLEFBQUMsTUFBRDtVQUFBLEFBQWUsMkVBQWYsQUFBc0I7YUFDekIsS0FDRSxxQkFBQSxBQUFXLElBQUksVUFBZixBQUFlLEFBQVUsT0FBekIsQUFBZ0MsT0FBaEMsQUFBdUMsUUFBdkMsQUFBK0MsS0FBL0MsQUFBb0QsUUFBcEQsQUFBNEQsS0FGM0QsQUFDSCxBQUNFLEFBQWlFO0FBeEIxRCxBQTJCWDs7U0FBSyxhQUFBLEFBQUMsTUFBRDtVQUFBLEFBQWUsNkVBQWYsQUFBd0I7YUFDM0IsS0FDRSxxQkFBQSxBQUNHLElBQUksVUFEUCxBQUNPLEFBQVUsT0FEakIsQUFFRyxPQUZILEFBRVUsUUFGVixBQUdHLEtBQUssT0FBQSxBQUFPLFVBTGQsQUFDSCxBQUNFLEFBR3lCO0FBaEMvQixBQUFPLEFBQU0sQUFtQ2Q7QUFuQ2MsQUFDWCxHQURLO0FBbEJUOztrQkF1RGUsQSIsImZpbGUiOiJjbGllbnQuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2dsb3poa292b3kvV29yay9kYXRhc2tlcHRpYy5jb20ifQ==