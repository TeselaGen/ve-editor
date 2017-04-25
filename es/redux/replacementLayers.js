var _createReducer;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//./selectionLayer.js
import { createReducer } from 'redux-act';
import createAction from './utils/createMetaAction';
import omit from 'lodash/omit';
import randomColor from 'randomcolor';

// ------------------------------------
// Actions
// ------------------------------------
export var replacementLayerClear = createAction('replacementLayerClear');
export var replacementLayerUpdate = createAction('REPLACEMENT_LAYER_UPDATE');
export var replacementLayerDelete = createAction('REPLACEMENT_LAYER_DELETE');

// ------------------------------------
// Reducer
// ------------------------------------
export default createReducer((_createReducer = {}, _createReducer[replacementLayerClear] = function () {
  return {};
}, _createReducer[replacementLayerUpdate] = function (state, payload) {
  var _extends2;

  return _extends({}, state, (_extends2 = {}, _extends2[payload.id] = _extends({ color: randomColor({ hue: "green", luminosity: 'dark' }), id: payload.id }, payload.range), _extends2));
}, _createReducer[replacementLayerDelete] = function (state, payload) {
  return omit(state, payload.id);
}, _createReducer), {});