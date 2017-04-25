'use strict';

exports.__esModule = true;
exports.annotationVisibilityShow = exports.annotationVisibilityHide = exports.annotationVisibilityToggle = exports.visibilityInitialValues = undefined;

var _createReducer;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reduxAct = require('redux-act');

var _createMetaAction = require('./utils/createMetaAction');

var _createMetaAction2 = _interopRequireDefault(_createMetaAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var visibilityInitialValues = exports.visibilityInitialValues = {
  features: true,
  translations: true,
  parts: true,
  orfs: true,
  orfTranslations: true,
  axis: true,
  cutsites: true,
  reverseSequence: true
};

//./caretPosition.js


// ------------------------------------
// Actions
// ------------------------------------
var annotationVisibilityToggle = exports.annotationVisibilityToggle = (0, _createMetaAction2.default)('annotationVisibilityToggle');
//eg: annotationVisibilityToggle('features')
var annotationVisibilityHide = exports.annotationVisibilityHide = (0, _createMetaAction2.default)('annotationVisibilityHide');
var annotationVisibilityShow = exports.annotationVisibilityShow = (0, _createMetaAction2.default)('annotationVisibilityShow');

// ------------------------------------
// Reducer
// ------------------------------------
var annotationVisibility = (0, _reduxAct.createReducer)((_createReducer = {}, _createReducer[annotationVisibilityToggle] = function (state, payload) {
  var _extends2;

  return _extends({}, state, (_extends2 = {}, _extends2[payload] = !state[payload], _extends2));
}, _createReducer[annotationVisibilityHide] = function (state, payload) {
  var _extends3;

  return _extends({}, state, (_extends3 = {}, _extends3[payload] = false, _extends3));
}, _createReducer[annotationVisibilityShow] = function (state, payload) {
  var _extends4;

  return _extends({}, state, (_extends4 = {}, _extends4[payload] = true, _extends4));
}, _createReducer), visibilityInitialValues);

exports.default = annotationVisibility;