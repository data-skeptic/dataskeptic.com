'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reducer;

var ROUTING_INIT = 'trueup-employer/router/ROUTING_INIT';

var ROUTING_START = 'trueup-employer/router/ROUTING_START';
var ROUTING_COMPLETE = 'trueup-employer/router/ROUTING_COMPLETE';

var initialState = {
  routing: false
};

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case ROUTING_START:
      return {
        routing: true,
        from: action.from,
        to: action.to
      };
    case ROUTING_COMPLETE:
      return {
        routing: false
      };
    default:
      return state;
  }
}

// Action Creators
var routingInit = exports.routingInit = function routingInit() {
  return { type: ROUTING_INIT };
};
var routingStart = exports.routingStart = function routingStart(from, to) {
  return {
    type: ROUTING_START,
    from: from,
    to: to
  };
};
var routingComplete = exports.routingComplete = function routingComplete() {
  return { type: ROUTING_COMPLETE };
};

// Selectors
var isRouting = exports.isRouting = function isRouting(state) {
  return state.router.routing;
};
var isRoutingToDifferentPage = exports.isRoutingToDifferentPage = function isRoutingToDifferentPage(state) {
  return state.router.routing && state.router.from !== state.router.to.split('?')[0];
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlZHV4L21vZHVsZXMvcm91dGVyLmpzIl0sIm5hbWVzIjpbInJlZHVjZXIiLCJST1VUSU5HX0lOSVQiLCJST1VUSU5HX1NUQVJUIiwiUk9VVElOR19DT01QTEVURSIsImluaXRpYWxTdGF0ZSIsInJvdXRpbmciLCJzdGF0ZSIsImFjdGlvbiIsInR5cGUiLCJmcm9tIiwidG8iLCJyb3V0aW5nSW5pdCIsInJvdXRpbmdTdGFydCIsInJvdXRpbmdDb21wbGV0ZSIsImlzUm91dGluZyIsInJvdXRlciIsImlzUm91dGluZ1RvRGlmZmVyZW50UGFnZSIsInNwbGl0Il0sIm1hcHBpbmdzIjoiOzs7OztrQkFxQndCLEE7O0FBbEJ4QixJQUFNLGVBQU4sQUFBcUI7O0FBQ3JCLElBQU0sZ0JBQU4sQUFBc0I7QUFDdEIsSUFBTSxtQkFBTixBQUF5Qjs7QUFZekIsSUFBTTtXQUFOLEFBQTRCLEFBQ2pCO0FBRGlCLEFBQzFCOztBQUdhLFNBQUEsQUFBUyxVQUdmO01BRlAsQUFFTyw0RUFGUSxBQUVSO01BRFAsQUFDTyw2RUFEVSxBQUNWLEFBQ1A7O1VBQVEsT0FBUixBQUFlLEFBQ2I7U0FBQSxBQUFLLEFBQ0g7O2lCQUFPLEFBQ0ksQUFDVDtjQUFNLE9BRkQsQUFFUSxBQUNiO1lBQUksT0FITixBQUFPLEFBR00sQUFFZjtBQUxTLEFBQ0w7U0FJSixBQUFLLEFBQ0g7O2lCQUFBLEFBQU8sQUFDSSxBQUViO0FBSFMsQUFDTDtBQUdGO2FBWkosQUFZSSxBQUFPLEFBRVo7Ozs7QUFFRDtBQUNPLElBQU0sb0NBQWMsU0FBZCxBQUFjLGNBQUE7U0FBZSxFQUFFLE1BQWpCLEFBQWUsQUFBUTtBQUEzQztBQUNBLElBQU0sc0NBQWUsU0FBZixBQUFlLGFBQUEsQUFBQyxNQUFELEFBQWUsSUFBZjs7VUFBdUMsQUFDM0QsQUFDTjtVQUZpRSxBQUdqRTtRQUgwQixBQUF1QztBQUFBLEFBQ2pFO0FBREs7QUFLQSxJQUFNLDRDQUFrQixTQUFsQixBQUFrQixrQkFBQTtTQUFlLEVBQUUsTUFBakIsQUFBZSxBQUFRO0FBQS9DOztBQUVQO0FBQ08sSUFBTSxnQ0FBWSxTQUFaLEFBQVksVUFBQSxBQUFDLE9BQUQ7U0FBaUMsTUFBQSxBQUFNLE9BQXZDLEFBQThDO0FBQWhFO0FBQ0EsSUFBTSw4REFBMkIsU0FBM0IsQUFBMkIseUJBQUEsQUFBQyxPQUFEO1NBQ3RDLE1BQUEsQUFBTSxPQUFOLEFBQWEsV0FBVyxNQUFBLEFBQU0sT0FBTixBQUFhLFNBQVMsTUFBQSxBQUFNLE9BQU4sQUFBYSxHQUFiLEFBQWdCLE1BQWhCLEFBQXNCLEtBRDlCLEFBQ1EsQUFBMkI7QUFEcEUiLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9hbmRyZXdfd29ya3N0YXRpb24vRG9jdW1lbnRzL1dvcmsvZGF0YXNrZXB0aWMuY29tIn0=