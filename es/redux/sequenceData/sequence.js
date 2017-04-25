import { createReducer } from 'redux-act';
import createAction from '../utils/createMetaAction';

// ------------------------------------
// Actions
// ------------------------------------
export var addBps = createAction('addBps');

// ------------------------------------
// Reducer
// ------------------------------------
export default createReducer({}, '');