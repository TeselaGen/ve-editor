'use strict';

exports.__esModule = true;
exports.updateSequenceData = undefined;

var _primers = require('./primers');

Object.keys(_primers).forEach(function (key) {
	if (key === "default" || key === "__esModule") return;
	Object.defineProperty(exports, key, {
		enumerable: true,
		get: function get() {
			return _primers[key];
		}
	});
});

var _translations = require('./translations');

Object.keys(_translations).forEach(function (key) {
	if (key === "default" || key === "__esModule") return;
	Object.defineProperty(exports, key, {
		enumerable: true,
		get: function get() {
			return _translations[key];
		}
	});
});

exports.default = function (state, action) {
	var stateToPass = state;
	if (action.type === 'SEQUENCE_DATA_UPDATE') {
		stateToPass = action.payload;
	}
	return (0, _redux.combineReducers)({
		primers: _primers2.default,
		features: _features2.default,
		sequence: _sequence2.default,
		circular: (0, _reduxAct.createReducer)({}, true),
		translations: _translations2.default,
		name: (0, _reduxAct.createReducer)({}, ''),
		fromFileUpload: (0, _reduxAct.createReducer)({}, false)
	})(stateToPass, action);
};

var _createMetaAction = require('../utils/createMetaAction');

var _createMetaAction2 = _interopRequireDefault(_createMetaAction);

var _features = require('./features');

var _features2 = _interopRequireDefault(_features);

var _primers2 = _interopRequireDefault(_primers);

var _sequence = require('./sequence');

var _sequence2 = _interopRequireDefault(_sequence);

var _translations2 = _interopRequireDefault(_translations);

var _redux = require('redux');

var _cleanSequenceData = require('../../utils/cleanSequenceData');

var _cleanSequenceData2 = _interopRequireDefault(_cleanSequenceData);

var _reduxAct = require('redux-act');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Actions
// ------------------------------------

// export * from './features';
// export * from './sequence';
// export * from './circular';
var _updateSequenceData = (0, _createMetaAction2.default)('SEQUENCE_DATA_UPDATE');
// export * from './sharedActionCreators';
var updateSequenceData = exports.updateSequenceData = function updateSequenceData(seqData) {
	for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		rest[_key - 1] = arguments[_key];
	}

	return _updateSequenceData.apply(undefined, [(0, _cleanSequenceData2.default)(seqData)].concat(rest));
};

// ------------------------------------
// Reducer
// ------------------------------------