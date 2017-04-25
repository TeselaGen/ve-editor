import React from 'react'
import './style.css';

export default class Radio extends React.Component {
  render () {
    var {className, children, onChange, checked, label } = this.props;
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
}