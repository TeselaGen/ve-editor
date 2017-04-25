function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import AddYourOwnEnzyme from '../AddYourOwnEnzyme';
import React from 'react';
import './style.css';
import { ModalComponent } from '../../../components/ModalDialog';
import { connect } from 'react-redux';

var AddYourOwnEnzymeModalWrapper = function (_React$Component) {
  _inherits(AddYourOwnEnzymeModalWrapper, _React$Component);

  function AddYourOwnEnzymeModalWrapper() {
    _classCallCheck(this, AddYourOwnEnzymeModalWrapper);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  AddYourOwnEnzymeModalWrapper.prototype.render = function render() {
    var _props = this.props,
        dispatch = _props.dispatch,
        isOpen = _props.isOpen;

    function handleClose() {
      dispatch({
        type: 'ADD_YOUR_OWN_ENZYME_CLOSE'
      });
    }
    return React.createElement(
      ModalComponent,
      {
        open: isOpen,
        // dontCloseOnClickOutside: true,
        handleClose: handleClose
      },
      React.createElement(AddYourOwnEnzyme, { handleClose: handleClose })
    );
  };

  return AddYourOwnEnzymeModalWrapper;
}(React.Component);

AddYourOwnEnzymeModalWrapper = connect(function (state) {
  return {
    isOpen: state.VectorEditor.addYourOwnEnzyme.isOpen
  };
})(AddYourOwnEnzymeModalWrapper);
export default AddYourOwnEnzymeModalWrapper;