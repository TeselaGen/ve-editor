var _createReducer;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

export var visibilityInitialValues = {
  features: true,
  translations: true,
  parts: true,
  orfs: true,
  orfTranslations: true,
  axis: true,
  cutsites: true,
  reverseSequence: true
};

//./caretPosition.js
import { createReducer } from 'redux-act';
import createAction from './utils/createMetaAction';

// ------------------------------------
// Actions
// ------------------------------------
export var annotationVisibilityToggle = createAction('annotationVisibilityToggle');
//eg: annotationVisibilityToggle('features')
export var annotationVisibilityHide = createAction('annotationVisibilityHide');
export var annotationVisibilityShow = createAction('annotationVisibilityShow');

// ------------------------------------
// Reducer
// ------------------------------------
var annotationVisibility = createReducer((_createReducer = {}, _createReducer[annotationVisibilityToggle] = function (state, payload) {
  var _extends2;

  return _extends({}, state, (_extends2 = {}, _extends2[payload] = !state[payload], _extends2));
}, _createReducer[annotationVisibilityHide] = function (state, payload) {
  var _extends3;

  return _extends({}, state, (_extends3 = {}, _extends3[payload] = false, _extends3));
}, _createReducer[annotationVisibilityShow] = function (state, payload) {
  var _extends4;

  return _extends({}, state, (_extends4 = {}, _extends4[payload] = true, _extends4));
}, _createReducer), visibilityInitialValues);

export default annotationVisibility;