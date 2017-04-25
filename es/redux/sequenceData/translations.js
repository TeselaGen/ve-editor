var _createReducer;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import omit from 'lodash/omit';
import { createReducer } from 'redux-act';
import createAction from '../utils/createMetaAction';
import bsonObjectid from 'bson-objectid';
// ------------------------------------
// Actions
// ------------------------------------
// export const caretPositionClear = createAction('caretPositionClear')
export var createTranslation = createAction('CREATE_TRANSLATION');
export var deleteTranslation = createAction('DELETE_TRANSLATION');

// ------------------------------------
// Reducer
// ------------------------------------
export default createReducer((_createReducer = {}, _createReducer[createTranslation] = function (state, payload) {
  var _extends2;

  if (!payload.id) {
    payload = _extends({}, payload, { id: bsonObjectid().toString() });
  }
  return _extends({}, state, (_extends2 = {}, _extends2[payload.id] = payload, _extends2));
}, _createReducer[deleteTranslation] = function (state, payload) {
  return omit(state, payload.id);
}, _createReducer), {});

// function myReducer (state={}, action) {
// 	var newState = {}
// 	if (Array.isArray(state)) {
// 		state.forEach(function(item){
// 			newState[item.id || bsonId()] = item
// 		});
// 	} else {
// 		newState = state
// 	}
// 	if (action.type === 'HELLO WORLD') {
// 		return {newState, hello: 'world'}
// 	}
// 	// etc....

// 	return newState
// }