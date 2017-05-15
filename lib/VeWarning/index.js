'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./style.css');

var _warningOutline = require('react-icons/lib/ti/warning-outline');

var _warningOutline2 = _interopRequireDefault(_warningOutline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function VeWarning(props) {
  var message = props.message,
      rest = _objectWithoutProperties(props, ['message']);

  return _react2.default.createElement(
    'div',
    _extends({ className: 'veWarningMessage' }, rest),
    _react2.default.createElement(_warningOutline2.default, null),
    message
  );
}

exports.default = VeWarning;
module.exports = exports['default'];