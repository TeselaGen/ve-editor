'use strict';

exports.__esModule = true;
exports.addYourOwnEnzymeClose = exports.addYourOwnEnzymeReset = exports.addYourOwnEnzymeUpdate = undefined;

var _createReducer;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //./selectionLayer.js


var _reduxAct = require('redux-act');

var _createMetaAction = require('./utils/createMetaAction');

var _createMetaAction2 = _interopRequireDefault(_createMetaAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Actions
// ------------------------------------
var addYourOwnEnzymeUpdate = exports.addYourOwnEnzymeUpdate = (0, _createMetaAction2.default)('ADD_YOUR_OWN_ENZYME_UPDATE');
var addYourOwnEnzymeReset = exports.addYourOwnEnzymeReset = (0, _createMetaAction2.default)('ADD_YOUR_OWN_ENZYME_RESET');
var addYourOwnEnzymeClose = exports.addYourOwnEnzymeClose = (0, _createMetaAction2.default)('ADD_YOUR_OWN_ENZYME_CLOSE');

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
exports.default = (0, _reduxAct.createReducer)((_createReducer = {}, _createReducer[addYourOwnEnzymeClose] = function (state) {
  return _extends({}, state, { isOpen: false });
}, _createReducer[addYourOwnEnzymeReset] = function (state) {
  var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return _extends({}, initialValues, payload);
}, _createReducer[addYourOwnEnzymeUpdate] = function (state, payload) {
  return payload;
}, _createReducer), initialValues);