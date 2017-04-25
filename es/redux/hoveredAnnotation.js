var _createReducer;

//./caretPosition.js
import { createReducer } from 'redux-act';
import createAction from './utils/createMetaAction';

// ------------------------------------
// Actions
// ------------------------------------
export var hoveredAnnotationUpdate = createAction('HOVEREDANNOTATIONUPDATE');
export var hoveredAnnotationClear = createAction('HOVEREDANNOTATIONCLEAR');

// ------------------------------------
// Reducer
// ------------------------------------
export default createReducer((_createReducer = {}, _createReducer[hoveredAnnotationUpdate] = function (state, payload) {
  return payload;
}, _createReducer[hoveredAnnotationClear] = function (state, payload) {
  return '';
}, _createReducer), '');