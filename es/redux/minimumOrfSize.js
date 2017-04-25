var _createReducer;

//./caretPosition.js
import { createReducer } from 'redux-act';
import createAction from './utils/createMetaAction';

// ------------------------------------
// Actions
// ------------------------------------
export var minimumOrfSizeUpdate = createAction('minimumOrfSizeUpdate');

// ------------------------------------
// Reducer
// ------------------------------------
export default createReducer((_createReducer = {}, _createReducer[minimumOrfSizeUpdate] = function (state, payload) {
  if (payload === undefined) debugger;
  return payload;
}, _createReducer), 300);

export function getMinimumOrfSize(state) {
  return state;
}