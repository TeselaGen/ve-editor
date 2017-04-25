var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import './style.css';
import WarningOutline from 'react-icons/lib/ti/warning-outline';

var VeWarning = function (_React$Component) {
  _inherits(VeWarning, _React$Component);

  function VeWarning() {
    _classCallCheck(this, VeWarning);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  VeWarning.prototype.render = function render() {
    var _props = this.props,
        message = _props.message,
        rest = _objectWithoutProperties(_props, ['message']);

    return React.createElement(
      'div',
      _extends({ className: 'veWarningMessage' }, rest),
      React.createElement(WarningOutline, null),
      message
    );
  };

  return VeWarning;
}(React.Component);

export default VeWarning;