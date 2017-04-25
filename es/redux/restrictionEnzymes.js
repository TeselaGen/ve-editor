var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createReducer, _createReducer2;

import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';
import createAction from './utils/createMetaAction';
import specialCutsiteFilterOptions from '../constants/specialCutsiteFilterOptions';
// import takaraEnzymeList from '../../../../enzymeListFull.json';
import defaultEnzymeList from './utils/defaultEnzymeList.json';
// ------------------------------------
// Actions
// ------------------------------------
export var filteredRestrictionEnzymesUpdate = createAction('FILTERED_RESTRICTION_ENZYMES_UPDATE');
export var filteredRestrictionEnzymesReset = createAction('FILTERED_RESTRICTION_ENZYMES_RESET');
export var filteredRestrictionEnzymesAdd = createAction('FILTERED_RESTRICTION_ENZYMES_ADD');
export var addRestrictionEnzyme = createAction('ADD_RESTRICTION_ENZYME');
export var allRestrictionEnzymesUpdate = createAction('ALL_RESTRICTION_ENZYMES_UPDATE');
// ------------------------------------
// Reducer
// ------------------------------------
var initialState = [specialCutsiteFilterOptions.single];
export default combineReducers({
  filteredRestrictionEnzymes: createReducer((_createReducer = {}, _createReducer[filteredRestrictionEnzymesReset] = function (state, payload) {
    return initialState;
  }, _createReducer[filteredRestrictionEnzymesUpdate] = function (state, payload) {
    return payload;
  }, _createReducer[filteredRestrictionEnzymesAdd] = function (state, payload) {
    if (!payload.value || !payload.label) debugger; //tnr: it must have these things
    return [].concat(state, [payload]);
  }, _createReducer), initialState),
  allRestrictionEnzymes: createReducer((_createReducer2 = {}, _createReducer2[addRestrictionEnzyme] = function (state, payload) {
    var _extends2;

    if (!payload.name || !payload.site || !payload.forwardRegex || !payload.reverseRegex || !payload.topSnipOffset && payload.topSnipOffset !== 0 || !payload.bottomSnipOffset && payload.bottomSnipOffset !== 0) debugger; //tnr: it should have all these properties
    return _extends({}, state, (_extends2 = {}, _extends2[payload.name] = payload, _extends2));
  }, _createReducer2[allRestrictionEnzymesUpdate] = function (state, payload) {
    return payload;
  }, _createReducer2), defaultEnzymeList)
});