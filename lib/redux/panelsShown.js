'use strict';

exports.__esModule = true;
exports.panelsShownUpdate = undefined;

var _createReducer;

var _reduxAct = require('redux-act');

var _createMetaAction = require('./utils/createMetaAction');

var _createMetaAction2 = _interopRequireDefault(_createMetaAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Actions
// ------------------------------------
var panelsShownUpdate = exports.panelsShownUpdate = (0, _createMetaAction2.default)('PANELS_SHOWN_UPDATE');

// ------------------------------------
// Reducer
// ------------------------------------
exports.default = (0, _reduxAct.createReducer)((_createReducer = {}, _createReducer[panelsShownUpdate] = function (state, payload) {
  return payload;
}, _createReducer), {
  sequence: true,
  circular: true,
  rail: true
});