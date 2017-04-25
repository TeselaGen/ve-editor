'use strict';

exports.__esModule = true;
exports.hoveredAnnotationClear = exports.hoveredAnnotationUpdate = undefined;

var _createReducer; //./caretPosition.js


var _reduxAct = require('redux-act');

var _createMetaAction = require('./utils/createMetaAction');

var _createMetaAction2 = _interopRequireDefault(_createMetaAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Actions
// ------------------------------------
var hoveredAnnotationUpdate = exports.hoveredAnnotationUpdate = (0, _createMetaAction2.default)('HOVEREDANNOTATIONUPDATE');
var hoveredAnnotationClear = exports.hoveredAnnotationClear = (0, _createMetaAction2.default)('HOVEREDANNOTATIONCLEAR');

// ------------------------------------
// Reducer
// ------------------------------------
exports.default = (0, _reduxAct.createReducer)((_createReducer = {}, _createReducer[hoveredAnnotationUpdate] = function (state, payload) {
  return payload;
}, _createReducer[hoveredAnnotationClear] = function (state, payload) {
  return '';
}, _createReducer), '');