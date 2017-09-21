'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('next/node_modules/babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var development = {
  isProduction: false,
  url: 'http://localhost:3000',
  port: 3000,
  apiPort: 8000
};

var production = {
  isProduction: true,
  url: process.env.URL,
  port: 80,
  apiPort: 80
};

var environment = process.env.NODE_ENV === 'production' ? production : development;

var common = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.API_HOST || 'localhost',
  apiPort: process.env.API_PORT || 3030,
  app: {
    title: 'Portal'
  }
};

var config = (0, _extends3.default)({}, common, environment);

exports.default = config;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbmZpZy5qcyJdLCJuYW1lcyI6WyJkZXZlbG9wbWVudCIsImlzUHJvZHVjdGlvbiIsInVybCIsInBvcnQiLCJhcGlQb3J0IiwicHJvZHVjdGlvbiIsInByb2Nlc3MiLCJlbnYiLCJVUkwiLCJlbnZpcm9ubWVudCIsIk5PREVfRU5WIiwiY29tbW9uIiwiaG9zdCIsIkhPU1QiLCJQT1JUIiwiYXBpSG9zdCIsIkFQSV9IT1NUIiwiQVBJX1BPUlQiLCJhcHAiLCJ0aXRsZSIsImNvbmZpZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNO2dCQUFjLEFBQ0osQUFDZDtPQUZrQixBQUViLEFBQ0w7UUFIa0IsQUFHWixBQUNOO1dBSkYsQUFBb0IsQUFJVDtBQUpTLEFBQ2xCOztBQU1GLElBQU07Z0JBQWEsQUFDSCxBQUNkO09BQUssUUFBQSxBQUFRLElBRkksQUFFQSxBQUNqQjtRQUhpQixBQUdYLEFBQ047V0FKRixBQUFtQixBQUlSO0FBSlEsQUFDakI7O0FBTUYsSUFBTSxjQUNKLFFBQUEsQUFBUSxJQUFSLEFBQVksYUFBWixBQUF5QixlQUF6QixBQUF3QyxhQUQxQyxBQUN1RDs7QUFFdkQsSUFBTTtRQUNFLFFBQUEsQUFBUSxJQUFSLEFBQVksUUFETCxBQUNhLEFBQzFCO1FBQU0sUUFBQSxBQUFRLElBRkQsQUFFSyxBQUNsQjtXQUFTLFFBQUEsQUFBUSxJQUFSLEFBQVksWUFIUixBQUdvQixBQUNqQztXQUFTLFFBQUEsQUFBUSxJQUFSLEFBQVksWUFKUixBQUlvQixBQUNqQzs7V0FMRixBQUFlLEFBS1IsQUFDSTtBQURKLEFBQ0g7QUFOVyxBQUNiOztBQVNGLElBQU0sb0NBQUEsQUFBYyxRQUFwQixBQUFNLEFBQXlCOztrQkFFaEIsQSIsImZpbGUiOiJjb25maWcuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2lseWEvV29yay9kYXRhc2tlcHRpYy5jb20ifQ==