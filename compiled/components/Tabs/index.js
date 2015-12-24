'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('../../style');

var style = _interopRequireWildcard(_style);

var _reactFunctional = require('react-functional');

var _reactFunctional2 = _interopRequireDefault(_reactFunctional);

var _actions = require('../../actions');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tabs = function Tabs(_ref) {
  var items = _ref.items;
  var top = _ref.top;
  var left = _ref.left;
  var width = _ref.width;
  var height = _ref.height;
  var tab = _ref.tab;
  var dispatch = _ref.dispatch;
  return _react2.default.createElement('listbar', {
    'class': style.list,
    top: top,
    left: left,
    width: width,
    height: height,
    autoCommandKeys: true,
    items: items,
    onSelectTab: function onSelectTab(_ref2) {
      var tab = _ref2.data.cmd.text;
      return dispatch((0, _actions.focusTab)(tab));
    }
  });
};

exports.default = Tabs;
//# sourceMappingURL=index.js.map