'use strict';

exports.__esModule = true;
exports.minimumOrfSizeUpdate = undefined;

var _createReducer; //./caretPosition.js


exports.getMinimumOrfSize = getMinimumOrfSize;

var _reduxAct = require('redux-act');

var _createMetaAction = require('./utils/createMetaAction');

var _createMetaAction2 = _interopRequireDefault(_createMetaAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Actions
// ------------------------------------
var minimumOrfSizeUpdate = exports.minimumOrfSizeUpdate = (0, _createMetaAction2.default)('minimumOrfSizeUpdate');

// ------------------------------------
// Reducer
// ------------------------------------
exports.default = (0, _reduxAct.createReducer)((_createReducer = {}, _createReducer[minimumOrfSizeUpdate] = function (state, payload) {
  if (payload === undefined) debugger;
  return payload;
}, _createReducer), 300);
function getMinimumOrfSize(state) {
  return state;
}