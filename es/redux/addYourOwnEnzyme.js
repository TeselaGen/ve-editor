var _createReducer;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//./selectionLayer.js
import { createReducer } from 'redux-act';
import createAction from './utils/createMetaAction';
// ------------------------------------
// Actions
// ------------------------------------
export var addYourOwnEnzymeUpdate = createAction('ADD_YOUR_OWN_ENZYME_UPDATE');
export var addYourOwnEnzymeReset = createAction('ADD_YOUR_OWN_ENZYME_RESET');
export var addYourOwnEnzymeClose = createAction('ADD_YOUR_OWN_ENZYME_CLOSE');

// ------------------------------------
// Reducer
// ------------------------------------
var initialValues = {
  name: 'Example Enzyme',
  sequence: 'ggatcc',
  chop_top_index: 1,
  chop_bottom_index: 5,
  inputSequenceToTestAgainst: '',
  isOpen: false
};
export default createReducer((_createReducer = {}, _createReducer[addYourOwnEnzymeClose] = function (state) {
  return _extends({}, state, { isOpen: false });
}, _createReducer[addYourOwnEnzymeReset] = function (state) {
  var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return _extends({}, initialValues, payload);
}, _createReducer[addYourOwnEnzymeUpdate] = function (state, payload) {
  return payload;
}, _createReducer), initialValues);