import React from 'react'
import './style.css';
import WarningOutline from 'react-icons/lib/ti/warning-outline';

class VeWarning extends React.Component {
  render() {
    var {message, ...rest} = this.props;
    return (
      <div className='veWarningMessage' {...rest}>
        <WarningOutline/>
        {message}
      </div>
      )
  }
}

export default VeWarning
