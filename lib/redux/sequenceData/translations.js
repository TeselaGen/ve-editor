'use strict';

exports.__esModule = true;
exports.deleteTranslation = exports.createTranslation = undefined;

var _createReducer;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _reduxAct = require('redux-act');

var _createMetaAction = require('../utils/createMetaAction');

var _createMetaAction2 = _interopRequireDefault(_createMetaAction);

var _bsonObjectid = require('bson-objectid');

var _bsonObjectid2 = _interopRequireDefault(_bsonObjectid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Actions
// ------------------------------------
// export const caretPositionClear = createAction('caretPositionClear')
var createTranslation = exports.createTranslation = (0, _createMetaAction2.default)('CREATE_TRANSLATION');
var deleteTranslation = exports.deleteTranslation = (0, _createMetaAction2.default)('DELETE_TRANSLATION');

// ------------------------------------
// Reducer
// ------------------------------------
exports.default = (0, _reduxAct.createReducer)((_createReducer = {}, _createReducer[createTranslation] = function (state, payload) {
  var _extends2;

  if (!payload.id) {
    payload = _extends({}, payload, { id: (0, _bsonObjectid2.default)().toString() });
  }
  return _extends({}, state, (_extends2 = {}, _extends2[payload.id] = payload, _extends2));
}, _createReducer[deleteTranslation] = function (state, payload) {
  return (0, _omit2.default)(state, payload.id);
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