'use strict';

exports.__esModule = true;
exports.updateLineageLines = undefined;

var _createReducer;

var _reduxAct = require('redux-act');

var _createMetaAction = require('./utils/createMetaAction');

var _createMetaAction2 = _interopRequireDefault(_createMetaAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Actions
// ------------------------------------
var updateLineageLines = exports.updateLineageLines = (0, _createMetaAction2.default)('updateLineageLines');

// ------------------------------------
// Reducer
// ------------------------------------
exports.default = (0, _reduxAct.createReducer)((_createReducer = {}, _createReducer[updateLineageLines] = function (state, payload) {
	return payload;
}, _createReducer), []);