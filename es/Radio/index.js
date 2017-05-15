import React from 'react';
import './style.css';

export default function Radio(props) {
  var className = props.className,
      children = props.children,
      onChange = props.onChange,
      checked = props.checked,
      label = props.label;

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
}