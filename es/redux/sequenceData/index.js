import createAction from '../utils/createMetaAction';
import features from './features';
import primers from './primers';
import sequence from './sequence';
import translations from './translations';
import { combineReducers } from 'redux';
import cleanSequenceData from '../../utils/cleanSequenceData';
// export * from './sharedActionCreators';
export * from './primers';
// export * from './features';
// export * from './sequence';
// export * from './circular';
export * from './translations';
import { createReducer } from 'redux-act';

// ------------------------------------
// Actions
// ------------------------------------

var _updateSequenceData = createAction('SEQUENCE_DATA_UPDATE');
export var updateSequenceData = function updateSequenceData(seqData) {
	for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		rest[_key - 1] = arguments[_key];
	}

	return _updateSequenceData.apply(undefined, [cleanSequenceData(seqData)].concat(rest));
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function (state, action) {
	var stateToPass = state;
	if (action.type === 'SEQUENCE_DATA_UPDATE') {
		stateToPass = action.payload;
	}
	return combineReducers({
		primers: primers,
		features: features,
		sequence: sequence,
		circular: createReducer({}, true),
		translations: translations,
		name: createReducer({}, ''),
		fromFileUpload: createReducer({}, false)
	})(stateToPass, action);
}