'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tab = tab;
exports.panel = panel;
exports.sources = sources;
exports.files = files;
exports.file = file;
exports.fileIndex = fileIndex;
exports.editorLine = editorLine;
exports.callstack = callstack;
exports.frames = frames;
exports.frame = frame;
exports.breakpoints = breakpoints;
exports.scope = scope;
exports.source = source;
exports.paused = paused;
exports.layout = layout;

var _path = require('path');

var _actions = require('../actions');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function tab() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? 'sources' : arguments[0];
  var _ref = arguments[1];
  var type = _ref.type;
  var payload = _ref.payload;

  if (type !== _actions.FOCUS_TAB) return state;
  return (payload + '').toLowerCase();
}

function panel() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? 'console' : arguments[0];
  var _ref2 = arguments[1];
  var type = _ref2.type;
  var payload = _ref2.payload;

  if (type !== _actions.FOCUS_PANEL) return state;
  return payload;
}

function sources() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var _ref3 = arguments[1];
  var type = _ref3.type;
  var payload = _ref3.payload;

  if (type !== _actions.RECEIVE_SOURCES) return state;
  return payload;
}

function files() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var _ref4 = arguments[1];
  var type = _ref4.type;
  var payload = _ref4.payload;

  if (type !== _actions.RECEIVE_SOURCES) return state;
  var sources = payload.map(function (s) {
    return s.name;
  });
  var nonNative = sources.filter(function (s) {
    return s[0] === '/';
  });
  var native = sources.filter(function (s) {
    return s[0] !== '/';
  });
  return [].concat(_toConsumableArray(nonNative), _toConsumableArray(native));
}

function file() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
  var _ref5 = arguments[1];
  var type = _ref5.type;
  var payload = _ref5.payload;

  if (type !== _actions.SELECT_FILE) return state;
  return payload;
}

function fileIndex() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
  var _ref6 = arguments[1];
  var type = _ref6.type;
  var payload = _ref6.payload;

  if (type !== _actions.SET_FILE_INDEX) return state;
  return payload;
}

function editorLine() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
  var _ref7 = arguments[1];
  var type = _ref7.type;
  var payload = _ref7.payload;

  if (type !== _actions.SET_EDITOR_LINE) return state;
  return payload;
}

function callstack() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var _ref8 = arguments[1];
  var type = _ref8.type;
  var payload = _ref8.payload;

  if (type !== _actions.RECEIVE_CALLSTACK) return state;
  return payload.map(function (_ref9) {
    var functionName = _ref9.functionName;
    var _ref9$location = _ref9.location;
    var l = _ref9$location.lineNumber;
    var c = _ref9$location.columnNumber;
    var url = _ref9$location.url;
    return (functionName || '(anonymous function)') + ' ' + (0, _path.basename)(url) + ':' + l + ':' + c;
  });
}

function frames() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var _ref10 = arguments[1];
  var type = _ref10.type;
  var payload = _ref10.payload;

  if (type !== _actions.RECEIVE_CALLSTACK) return state;
  return payload;
}

function frame() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var _ref11 = arguments[1];
  var type = _ref11.type;
  var payload = _ref11.payload;

  if (type !== _actions.SELECT_FRAME) return state;
  return payload;
}

function breakpoints() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var _ref12 = arguments[1];
  var type = _ref12.type;
  var payload = _ref12.payload;

  if (type !== _actions.RECEIVE_BREAKPOINTS) return state;
  return payload;
}

function scope() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var _ref13 = arguments[1];
  var type = _ref13.type;
  var payload = _ref13.payload;

  if (type !== _actions.RECEIVE_SCOPE) return state;
  return payload;
}

function source() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var _ref14 = arguments[1];
  var type = _ref14.type;
  var payload = _ref14.payload;

  if (type !== _actions.RECEIVE_SOURCE) return state;
  return payload;
}

function paused() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
  var _ref15 = arguments[1];
  var type = _ref15.type;

  if (type !== _actions.RESUME || type !== _actions.PAUSE) return state;
  return type === _actions.PAUSE;
}

function layout() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var _ref16 = arguments[1];
  var type = _ref16.type;
  var payload = _ref16.payload;

  if (type !== _actions.SET_DIMENSIONS) return state;
  return payload;
}
//# sourceMappingURL=index.js.map