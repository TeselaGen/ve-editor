function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import './style.css';

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

    return React.createElement(
      'label',
      { className: '__custom_radio_button ' + className },
      React.createElement('input', {
        onChange: onChange,
        checked: checked,
        type: 'radio'
      }),
      React.createElement('i', null),
      ' ',
      children,
      ' ',
      label
    );
  };

  return Radio;
}(React.Component);

export { Radio as default };