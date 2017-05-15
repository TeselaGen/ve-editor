import AddYourOwnEnzyme from '../AddYourOwnEnzyme';
import React from 'react'
import './style.css';
import {ModalComponent} from '../../../components/ModalDialog'
import { connect } from 'react-redux'

function AddYourOwnEnzymeModalWrapper(props) {
  var {
    dispatch,
    isOpen
  } = props;
  function handleClose() {
    dispatch({
      type: 'ADD_YOUR_OWN_ENZYME_CLOSE'
    })
  }
  return (
    <ModalComponent {
        ...{
            open: isOpen,
            // dontCloseOnClickOutside: true,
            handleClose,
        }
    }
    > 
      <AddYourOwnEnzyme {...{handleClose}}></AddYourOwnEnzyme>
    </ModalComponent>
  )
}

AddYourOwnEnzymeModalWrapper = connect(function (state) {
  return {
    isOpen: state.VectorEditor.addYourOwnEnzyme.isOpen
  }
})(AddYourOwnEnzymeModalWrapper)
export default AddYourOwnEnzymeModalWrapper