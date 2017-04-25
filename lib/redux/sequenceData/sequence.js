'use strict';

exports.__esModule = true;
exports.addBps = undefined;

var _reduxAct = require('redux-act');

var _createMetaAction = require('../utils/createMetaAction');

var _createMetaAction2 = _interopRequireDefault(_createMetaAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Actions
// ------------------------------------
var addBps = exports.addBps = (0, _createMetaAction2.default)('addBps');

// ------------------------------------
// Reducer
// ------------------------------------
exports.default = (0, _reduxAct.createReducer)({}, '');