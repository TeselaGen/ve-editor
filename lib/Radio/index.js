'use strict';

exports.__esModule = true;
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Radio = function (_React$Component) {
  _inherits(Radio, _React$Component);

  function Radio() {
    _classCallCheck(this, Radio);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Radio.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        children = _props.children,
        onChange = _props.onChange,
        checked = _props.checked,
        label = _props.label;

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
  };

  return Radio;
}(_react2.default.Component);

exports.default = Radio;
module.exports = exports['default'];