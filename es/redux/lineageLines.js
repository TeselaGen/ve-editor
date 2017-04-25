var _createReducer;

import { createReducer } from 'redux-act';
import createAction from './utils/createMetaAction';

// ------------------------------------
// Actions
// ------------------------------------
export var updateLineageLines = createAction('updateLineageLines');

// ------------------------------------
// Reducer
// ------------------------------------
export default createReducer((_createReducer = {}, _createReducer[updateLineageLines] = function (state, payload) {
	return payload;
}, _createReducer), []);