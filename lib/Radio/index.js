'use strict';

exports.__esModule = true;
exports.default = Radio;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Radio(props) {
  var className = props.className,
      children = props.children,
      onChange = props.onChange,
      checked = props.checked,
      label = props.label;

  return _react2.default.createElement(
    'label',
    { className: '__custom_radio_button ' + className },
    _react2.default.createElement('input', {
      onChange: onChange,
      checked: checked,
      type: 'radio'
    }),
    _react2.default.createElement('i', null),
    ' ',
    children,
    ' ',
    label
  );
}
module.exports = exports['default'];