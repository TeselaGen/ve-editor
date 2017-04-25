'use strict';

exports.__esModule = true;
exports.allRestrictionEnzymesUpdate = exports.addRestrictionEnzyme = exports.filteredRestrictionEnzymesAdd = exports.filteredRestrictionEnzymesReset = exports.filteredRestrictionEnzymesUpdate = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createReducer, _createReducer2;
// import takaraEnzymeList from '../../../../enzymeListFull.json';


var _redux = require('redux');

var _reduxAct = require('redux-act');

var _createMetaAction = require('./utils/createMetaAction');

var _createMetaAction2 = _interopRequireDefault(_createMetaAction);

var _specialCutsiteFilterOptions = require('../constants/specialCutsiteFilterOptions');

var _specialCutsiteFilterOptions2 = _interopRequireDefault(_specialCutsiteFilterOptions);

var _defaultEnzymeList = require('./utils/defaultEnzymeList.json');

var _defaultEnzymeList2 = _interopRequireDefault(_defaultEnzymeList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Actions
// ------------------------------------
var filteredRestrictionEnzymesUpdate = exports.filteredRestrictionEnzymesUpdate = (0, _createMetaAction2.default)('FILTERED_RESTRICTION_ENZYMES_UPDATE');
var filteredRestrictionEnzymesReset = exports.filteredRestrictionEnzymesReset = (0, _createMetaAction2.default)('FILTERED_RESTRICTION_ENZYMES_RESET');
var filteredRestrictionEnzymesAdd = exports.filteredRestrictionEnzymesAdd = (0, _createMetaAction2.default)('FILTERED_RESTRICTION_ENZYMES_ADD');
var addRestrictionEnzyme = exports.addRestrictionEnzyme = (0, _createMetaAction2.default)('ADD_RESTRICTION_ENZYME');
var allRestrictionEnzymesUpdate = exports.allRestrictionEnzymesUpdate = (0, _createMetaAction2.default)('ALL_RESTRICTION_ENZYMES_UPDATE');
// ------------------------------------
// Reducer
// ------------------------------------
var initialState = [_specialCutsiteFilterOptions2.default.single];
exports.default = (0, _redux.combineReducers)({
  filteredRestrictionEnzymes: (0, _reduxAct.createReducer)((_createReducer = {}, _createReducer[filteredRestrictionEnzymesReset] = function (state, payload) {
    return initialState;
  }, _createReducer[filteredRestrictionEnzymesUpdate] = function (state, payload) {
    return payload;
  }, _createReducer[filteredRestrictionEnzymesAdd] = function (state, payload) {
    if (!payload.value || !payload.label) debugger; //tnr: it must have these things
    return [].concat(state, [payload]);
  }, _createReducer), initialState),
  allRestrictionEnzymes: (0, _reduxAct.createReducer)((_createReducer2 = {}, _createReducer2[addRestrictionEnzyme] = function (state, payload) {
    var _extends2;

    if (!payload.name || !payload.site || !payload.forwardRegex || !payload.reverseRegex || !payload.topSnipOffset && payload.topSnipOffset !== 0 || !payload.bottomSnipOffset && payload.bottomSnipOffset !== 0) debugger; //tnr: it should have all these properties
    return _extends({}, state, (_extends2 = {}, _extends2[payload.name] = payload, _extends2));
  }, _createReducer2[allRestrictionEnzymesUpdate] = function (state, payload) {
    return payload;
  }, _createReducer2), _defaultEnzymeList2.default)
});