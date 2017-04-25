var _createReducer;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import { visibilityInitialValues } from './annotationVisibility';

//./caretPosition.js
import { createReducer } from 'redux-act';
import createAction from './utils/createMetaAction';

// ------------------------------------
// Actions
// ------------------------------------
export var toggleAnnotationLabelVisibility = createAction('toggleAnnotationLabelVisibility');

// ------------------------------------
// Reducer
// ------------------------------------
export default createReducer((_createReducer = {}, _createReducer[toggleAnnotationLabelVisibility] = function (state, payload) {
  var _extends2;

  return _extends({}, state, (_extends2 = {}, _extends2[payload] = !state[payload], _extends2));
}, _createReducer), visibilityInitialValues);