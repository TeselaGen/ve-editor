'use strict';

exports.__esModule = true;
exports.deletionLayerDelete = exports.deletionLayerUpdate = exports.deletionLayerClear = undefined;

var _createReducer;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //./deletionLayers.js


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
var deletionLayerClear = exports.deletionLayerClear = (0, _createMetaAction2.default)('deletionLayerClear');
var deletionLayerUpdate = exports.deletionLayerUpdate = (0, _createMetaAction2.default)('DELETION_LAYER_UPDATE');
var deletionLayerDelete = exports.deletionLayerDelete = (0, _createMetaAction2.default)('DELETION_LAYER_DELETE');

// ------------------------------------
// Reducer
// ------------------------------------
exports.default = (0, _reduxAct.createReducer)((_createReducer = {}, _createReducer[deletionLayerClear] = function () {
  return {};
}, _createReducer[deletionLayerUpdate] = function (state, payload) {
  var _extends2;

  return _extends({}, state, (_extends2 = {}, _extends2[payload.id] = _extends({ color: (0, _randomcolor2.default)({ hue: "red", luminosity: 'dark' }), id: payload.id }, payload.range), _extends2));
}, _createReducer[deletionLayerDelete] = function (state, payload) {
  return (0, _omit2.default)(state, payload.id);
}, _createReducer), {});