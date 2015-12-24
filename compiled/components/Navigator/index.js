'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('../../style');

var style = _interopRequireWildcard(_style);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Navigator = function Navigator(_ref) {
  var items = _ref.items;
  var top = _ref.top;
  var left = _ref.left;
  var width = _ref.width;
  var height = _ref.height;
  var focused = _ref.focused;
  var index = _ref.index;
  var selectFile = _ref.actions.selectFile;
  return _react2.default.createElement('list', {
    label: 'Navigator',
    focused: focused,
    selected: index,
    'class': [style.panel, style.list],
    width: width,
    top: top,
    height: height,
    items: items,
    mouse: true,
    keys: true,
    vi: true,
    inputOnFocused: true,
    onSelectItem: function onSelectItem(_ref2) {
      var item = _ref2.content;
      return selectFile(item);
    }
  });
};

exports.default = Navigator;
//# sourceMappingURL=index.js.map