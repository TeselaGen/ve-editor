'use strict';

exports.__esModule = true;

var _AddYourOwnEnzyme = require('../AddYourOwnEnzyme');

var _AddYourOwnEnzyme2 = _interopRequireDefault(_AddYourOwnEnzyme);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./style.css');

var _ModalDialog = require('../../../components/ModalDialog');

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function AddYourOwnEnzymeModalWrapper(props) {
  var dispatch = props.dispatch,
      isOpen = props.isOpen;

  function handleClose() {
    dispatch({
      type: 'ADD_YOUR_OWN_ENZYME_CLOSE'
    });
  }
  return _react2.default.createElement(
    _ModalDialog.ModalComponent,
    {
      open: isOpen,
      // dontCloseOnClickOutside: true,
      handleClose: handleClose
    },
    _react2.default.createElement(_AddYourOwnEnzyme2.default, { handleClose: handleClose })
  );
}

AddYourOwnEnzymeModalWrapper = (0, _reactRedux.connect)(function (state) {
  return {
    isOpen: state.VectorEditor.addYourOwnEnzyme.isOpen
  };
})(AddYourOwnEnzymeModalWrapper);
exports.default = AddYourOwnEnzymeModalWrapper;
module.exports = exports['default'];