var _createReducer;

import { createReducer } from 'redux-act';
import createAction from './utils/createMetaAction';

// ------------------------------------
// Actions
// ------------------------------------
export var panelsShownUpdate = createAction('PANELS_SHOWN_UPDATE');

// ------------------------------------
// Reducer
// ------------------------------------
export default createReducer((_createReducer = {}, _createReducer[panelsShownUpdate] = function (state, payload) {
  return payload;
}, _createReducer), {
  sequence: true,
  circular: true,
  rail: true
});