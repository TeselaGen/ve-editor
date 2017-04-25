'use strict';

exports.__esModule = true;
exports.toggleAnnotationLabelVisibility = undefined;

var _createReducer;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//./caretPosition.js


var _annotationVisibility = require('./annotationVisibility');

var _reduxAct = require('redux-act');

var _createMetaAction = require('./utils/createMetaAction');

var _createMetaAction2 = _interopRequireDefault(_createMetaAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Actions
// ------------------------------------
var toggleAnnotationLabelVisibility = exports.toggleAnnotationLabelVisibility = (0, _createMetaAction2.default)('toggleAnnotationLabelVisibility');

// ------------------------------------
// Reducer
// ------------------------------------
exports.default = (0, _reduxAct.createReducer)((_createReducer = {}, _createReducer[toggleAnnotationLabelVisibility] = function (state, payload) {
  var _extends2;

  return _extends({}, state, (_extends2 = {}, _extends2[payload] = !state[payload], _extends2));
}, _createReducer), _annotationVisibility.visibilityInitialValues);