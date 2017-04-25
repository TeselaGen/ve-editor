var _createReducer;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//./deletionLayers.js
import { createReducer } from 'redux-act';
import createAction from './utils/createMetaAction';
import omit from 'lodash/omit';
import randomColor from 'randomcolor';

// ------------------------------------
// Actions
// ------------------------------------
export var deletionLayerClear = createAction('deletionLayerClear');
export var deletionLayerUpdate = createAction('DELETION_LAYER_UPDATE');
export var deletionLayerDelete = createAction('DELETION_LAYER_DELETE');

// ------------------------------------
// Reducer
// ------------------------------------
export default createReducer((_createReducer = {}, _createReducer[deletionLayerClear] = function () {
  return {};
}, _createReducer[deletionLayerUpdate] = function (state, payload) {
  var _extends2;

  return _extends({}, state, (_extends2 = {}, _extends2[payload.id] = _extends({ color: randomColor({ hue: "red", luminosity: 'dark' }), id: payload.id }, payload.range), _extends2));
}, _createReducer[deletionLayerDelete] = function (state, payload) {
  return omit(state, payload.id);
}, _createReducer), {});