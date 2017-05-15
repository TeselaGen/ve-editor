var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import './style.css';
import WarningOutline from 'react-icons/lib/ti/warning-outline';

function VeWarning(props) {
  var message = props.message,
      rest = _objectWithoutProperties(props, ['message']);

  return React.createElement(
    'div',
    _extends({ className: 'veWarningMessage' }, rest),
    React.createElement(WarningOutline, null),
    message
  );
}

export default VeWarning;