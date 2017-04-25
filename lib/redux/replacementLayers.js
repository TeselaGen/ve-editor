'use strict';

exports.__esModule = true;
exports.replacementLayerDelete = exports.replacementLayerUpdate = exports.replacementLayerClear = undefined;

var _createReducer;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //./selectionLayer.js


var _reduxAct = require('redux-act');

var _createMetaAction = require('./utils/createMetaAction');

var _createMetaAction2 = _interopRequireDefault(_createMetaAction);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _randomcolor = require('randomcolor');

var _randomcolor2 = _interopRequireDefault(_randomcolor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Actions
// ------------------------------------
var replacementLayerClear = exports.replacementLayerClear = (0, _createMetaAction2.default)('replacementLayerClear');
var replacementLayerUpdate = exports.replacementLayerUpdate = (0, _createMetaAction2.default)('REPLACEMENT_LAYER_UPDATE');
var replacementLayerDelete = exports.replacementLayerDelete = (0, _createMetaAction2.default)('REPLACEMENT_LAYER_DELETE');

// ------------------------------------
// Reducer
// ------------------------------------
exports.default = (0, _reduxAct.createReducer)((_createReducer = {}, _createReducer[replacementLayerClear] = function () {
  return {};
}, _createReducer[replacementLayerUpdate] = function (state, payload) {
  var _extends2;

  return _extends({}, state, (_extends2 = {}, _extends2[payload.id] = _extends({ color: (0, _randomcolor2.default)({ hue: "green", luminosity: 'dark' }), id: payload.id }, payload.range), _extends2));
}, _createReducer[replacementLayerDelete] = function (state, payload) {
  return (0, _omit2.default)(state, payload.id);
}, _createReducer), {});