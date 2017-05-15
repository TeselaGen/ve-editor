import React from 'react'
import './style.css';

export default function Radio(props) {
  var {className, children, onChange, checked, label } = props;
  return (
    <label className={'__custom_radio_button ' + className}>
        <input 
          onChange={onChange}
          checked={checked}
          type="radio"
        />
        <i></i> {children} {label}
    </label>
  )
}