'use strict';

exports.__esModule = true;
exports.annotationDeselectAll = exports.annotationDeselect = exports.updateSelectedAnnotation = exports.annotationSelect = undefined;

var _createReducer;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
//./caretPosition.js


exports.cutsiteClicked = cutsiteClicked;
exports.featureClicked = featureClicked;
exports.featureRightClicked = featureRightClicked;
exports.primerClicked = primerClicked;
exports.primerRightClicked = primerRightClicked;
exports.orfClicked = orfClicked;
exports.translationClicked = translationClicked;
exports.translationRightClicked = translationRightClicked;
exports.translationDoubleClicked = translationDoubleClicked;
exports.deletionLayerClicked = deletionLayerClicked;
exports.deletionLayerRightClicked = deletionLayerRightClicked;
exports.replacementLayerClicked = replacementLayerClicked;
exports.replacementLayerRightClicked = replacementLayerRightClicked;
exports.selectionLayerRightClicked = selectionLayerRightClicked;
exports.orfRightClicked = orfRightClicked;
exports.updateSelectionOrCaretBasedOnAnnotation = updateSelectionOrCaretBasedOnAnnotation;

var _getReverseComplementSequenceString = require('ve-sequence-utils/getReverseComplementSequenceString');

var _getReverseComplementSequenceString2 = _interopRequireDefault(_getReverseComplementSequenceString);

var _getSequenceWithinRange = require('ve-range-utils/getSequenceWithinRange');

var _getSequenceWithinRange2 = _interopRequireDefault(_getSequenceWithinRange);

var _sequenceSelector = require('../selectors/sequenceSelector');

var _sequenceSelector2 = _interopRequireDefault(_sequenceSelector);

var _clipboard = require('clipboard');

var _clipboard2 = _interopRequireDefault(_clipboard);

var _basiccontext = require('basiccontext');

var _basiccontext2 = _interopRequireDefault(_basiccontext);

require('basiccontext/dist/basicContext.min.css');

require('basiccontext/dist/themes/default.min.css');

var _without = require('lodash/without');

var _without2 = _interopRequireDefault(_without);

var _sequenceLengthSelector = require('../selectors/sequenceLengthSelector');

var _sequenceLengthSelector2 = _interopRequireDefault(_sequenceLengthSelector);

var _updateSelectionOrCaret = require('../utils/selectionAndCaretUtils/updateSelectionOrCaret');

var _updateSelectionOrCaret2 = _interopRequireDefault(_updateSelectionOrCaret);

var _reduxAct = require('redux-act');

var _createMetaAction = require('./utils/createMetaAction');

var _createMetaAction2 = _interopRequireDefault(_createMetaAction);

var _caretPosition = require('./caretPosition');

var caretPositionActions = _interopRequireWildcard(_caretPosition);

var _selectionLayer = require('./selectionLayer');

var selectionLayerActions = _interopRequireWildcard(_selectionLayer);

var _bindActionCreatorsWithMeta = require('./utils/bindActionCreatorsWithMeta');

var _bindActionCreatorsWithMeta2 = _interopRequireDefault(_bindActionCreatorsWithMeta);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Actions
// ------------------------------------
// export const anno = createAction('VE_ANNOTATION_CLICK')
var annotationSelect = exports.annotationSelect = (0, _createMetaAction2.default)('VE_ANNOTATION_SELECT');
var updateSelectedAnnotation = exports.updateSelectedAnnotation = (0, _createMetaAction2.default)('VE_ANNOTATION_UPDATE_SELECTED');
var annotationDeselect = exports.annotationDeselect = (0, _createMetaAction2.default)('VE_ANNOTATION_DESELECT');
var annotationDeselectAll = exports.annotationDeselectAll = (0, _createMetaAction2.default)('VE_ANNOTATION_DESELECT_ALL');

var annotationSelectionActions = {
	annotationSelect: annotationSelect,
	annotationDeselect: annotationDeselect,
	updateSelectedAnnotation: updateSelectedAnnotation,
	annotationDeselectAll: annotationDeselectAll
};

// ------------------------------------
// Thunks
// ------------------------------------
function cutsiteClicked(_ref, meta) {
	var event = _ref.event,
	    annotation = _ref.annotation;

	event.preventDefault();
	event.stopPropagation();
	return function (dispatch, getState) {
		var args = { event: event, annotation: annotation, meta: meta, dispatch: dispatch, getState: getState };
		updateSelectionOrCaretBasedOnAnnotation(args);
		dispatch(annotationDeselectAll(undefined, meta));
		dispatch(annotationSelect(annotation, meta));
	};
}

function featureClicked(_ref2, meta) {
	var event = _ref2.event,
	    annotation = _ref2.annotation;

	event.preventDefault();
	event.stopPropagation();
	return function (dispatch, getState) {
		var args = { event: event, annotation: annotation, meta: meta, dispatch: dispatch, getState: getState };
		updateSelectionOrCaretBasedOnAnnotation(args);
		dispatch(annotationDeselectAll(undefined, meta));
		dispatch(annotationSelect(annotation, meta));
	};
}

function featureRightClicked(_ref3, meta) {
	var event = _ref3.event,
	    annotation = _ref3.annotation;

	event.preventDefault();
	event.stopPropagation();
	return function (dispatch, getState) {
		var items = [{ title: 'View Translation', icon: 'ion-plus-round', fn: function fn() {
				dispatch({
					type: 'CREATE_TRANSLATION',
					meta: meta,
					payload: { start: annotation.start, end: annotation.end, forward: annotation.forward }
				});
			} }];

		_basiccontext2.default.show(items, event);
	};
}

function primerClicked(_ref4, meta) {
	var event = _ref4.event,
	    annotation = _ref4.annotation;

	event.preventDefault();
	event.stopPropagation();
	return function (dispatch, getState) {
		var args = { event: event, annotation: annotation, meta: meta, dispatch: dispatch, getState: getState };
		updateSelectionOrCaretBasedOnAnnotation(args);
		dispatch(annotationDeselectAll(undefined, meta));
		dispatch(annotationSelect(annotation, meta));
	};
}

function primerRightClicked(_ref5, meta) {
	var event = _ref5.event,
	    annotation = _ref5.annotation;

	event.preventDefault();
	event.stopPropagation();
	return function (dispatch, getState) {
		var items = [{ title: 'View Translation', icon: 'ion-plus-round', fn: function fn() {
				dispatch({
					type: 'CREATE_TRANSLATION',
					meta: meta,
					payload: { start: annotation.start, end: annotation.end, forward: annotation.forward }
				});
			} }];
		_basiccontext2.default.show(items, event);
	};
}

function orfClicked(_ref6, meta) {
	var event = _ref6.event,
	    annotation = _ref6.annotation;

	event.preventDefault();
	event.stopPropagation();
	return function (dispatch, getState) {
		var args = { event: event, annotation: annotation, meta: meta, dispatch: dispatch, getState: getState };
		updateSelectionOrCaretBasedOnAnnotation(args);
		dispatch(annotationDeselectAll(undefined, meta));
		dispatch(annotationSelect(annotation, meta));
	};
}

function translationClicked(_ref7, meta) {
	var event = _ref7.event,
	    codonRange = _ref7.codonRange,
	    annotation = _ref7.annotation;

	event.preventDefault();
	event.stopPropagation();
	return function (dispatch, getState) {
		var args = { event: event, annotation: codonRange, meta: meta, dispatch: dispatch, getState: getState };
		updateSelectionOrCaretBasedOnAnnotation(args);
		dispatch(annotationDeselectAll(undefined, meta));
		// dispatch(annotationSelect(annotation, meta))
	};
}

function translationRightClicked(_ref8, meta) {
	var event = _ref8.event,
	    codonRange = _ref8.codonRange,
	    annotation = _ref8.annotation;

	event.preventDefault();
	event.stopPropagation();
	return function (dispatch, getState) {
		if (annotation.isOrf) {
			return;
		}
		var items = [{ title: 'Delete Translation', icon: 'ion-plus-round', fn: function fn() {
				dispatch({
					type: 'DELETE_TRANSLATION',
					meta: meta,
					payload: annotation
				});
			} }];
		_basiccontext2.default.show(items, event);
	};
}

function translationDoubleClicked(_ref9, meta) {
	var event = _ref9.event,
	    annotation = _ref9.annotation;

	event.preventDefault();
	event.stopPropagation();
	return function (dispatch, getState) {
		var args = { event: event, annotation: annotation, meta: meta, dispatch: dispatch, getState: getState };
		updateSelectionOrCaretBasedOnAnnotation(args);
		dispatch(annotationDeselectAll(undefined, meta));
		dispatch(annotationSelect(annotation, meta));
	};
}

function deletionLayerClicked(_ref10, meta) {
	var event = _ref10.event,
	    annotation = _ref10.annotation;

	event.preventDefault();
	event.stopPropagation();
	return function (dispatch, getState) {
		var args = { event: event, annotation: annotation, meta: meta, dispatch: dispatch, getState: getState };
		updateSelectionOrCaretBasedOnAnnotation(args);
		dispatch(annotationDeselectAll(undefined, meta));
		dispatch(annotationSelect(annotation, meta));
	};
}

function deletionLayerRightClicked(_ref11, meta) {
	var event = _ref11.event,
	    annotation = _ref11.annotation;

	event.preventDefault();
	event.stopPropagation();
	return function (dispatch, getState) {
		var items = [{ title: 'Remove Deletion', icon: 'ion-plus-round', fn: function fn() {
				dispatch({
					type: 'DELETION_LAYER_DELETE',
					meta: meta,
					payload: _extends({}, annotation)
				});
			} }];

		_basiccontext2.default.show(items, event);
	};
}

function replacementLayerClicked(_ref12, meta) {
	var event = _ref12.event,
	    annotation = _ref12.annotation;

	event.preventDefault();
	event.stopPropagation();
	return function (dispatch, getState) {
		var args = { event: event, annotation: annotation, meta: meta, dispatch: dispatch, getState: getState };
		updateSelectionOrCaretBasedOnAnnotation(args);
		dispatch(annotationDeselectAll(undefined, meta));
		dispatch(annotationSelect(annotation, meta));
	};
}

function replacementLayerRightClicked(_ref13, meta) {
	var event = _ref13.event,
	    annotation = _ref13.annotation;

	event.preventDefault();
	event.stopPropagation();
	return function (dispatch, getState) {
		var items = [{ title: 'Remove Edit', icon: 'ion-plus-round', fn: function fn() {
				dispatch({
					type: 'REPLACEMENT_LAYER_DELETE',
					meta: meta,
					payload: _extends({}, annotation)
				});
			} }];

		_basiccontext2.default.show(items, event);
	};
}

function selectionLayerRightClicked(_ref14, meta) {
	var event = _ref14.event,
	    annotation = _ref14.annotation,
	    _ref14$extraItems = _ref14.extraItems,
	    extraItems = _ref14$extraItems === undefined ? [] : _ref14$extraItems;

	event.preventDefault();
	event.stopPropagation();
	return function (dispatch, getState) {
		var editorState = getState().VectorEditor[meta.namespace];
		var sequence = (0, _sequenceSelector2.default)(editorState);
		var selectionLayer = editorState.selectionLayer;

		var selectedSeq = (0, _getSequenceWithinRange2.default)(selectionLayer, sequence);
		function makeTextCopyable(stringToCopy) {
			var text = '';
			var clipboard = new _clipboard2.default('.basicContext', {
				text: function text() {
					return stringToCopy;
				}
			});
			clipboard.on('success', function () {
				if (text.length === 0) {
					console.log('No Sequence To Copy');
				} else {
					console.log('Selection Copied!');
				}
			});
			clipboard.on('error', function () {
				console.error('Error copying selection.');
			});
		}
		var items = [{ title: 'Copy', fn: function fn() {
				makeTextCopyable(selectedSeq);
			} }, { title: 'Copy Reverse Complement', fn: function fn() {
				makeTextCopyable((0, _getReverseComplementSequenceString2.default)(selectedSeq));
			} }, { title: 'View Translation', fn: function fn() {
				dispatch({
					type: 'CREATE_TRANSLATION',
					meta: meta,
					payload: _extends({}, annotation, { forward: true })
				});
			} }, { title: 'View Reverse Translation', fn: function fn() {
				dispatch({
					type: 'CREATE_TRANSLATION',
					meta: meta,
					payload: _extends({}, annotation, { forward: false })
				});
			} }].concat(extraItems);

		_basiccontext2.default.show(items, event);
	};
}

function orfRightClicked(_ref15, meta) {
	var event = _ref15.event,
	    annotation = _ref15.annotation;

	event.preventDefault();
	event.stopPropagation();
	return function (dispatch, getState) {
		var items = [{ title: 'View Translation', icon: 'ion-plus-round', fn: function fn() {
				dispatch({
					type: 'CREATE_TRANSLATION',
					meta: meta,
					payload: { start: annotation.start, end: annotation.end, forward: annotation.forward }
				});
			} }];
		_basiccontext2.default.show(items, event);
	};
}

function updateSelectionOrCaretBasedOnAnnotation(_ref16) {
	var _ref16$event = _ref16.event,
	    event = _ref16$event === undefined ? {} : _ref16$event,
	    _ref16$annotation = _ref16.annotation,
	    annotation = _ref16$annotation === undefined ? {} : _ref16$annotation,
	    meta = _ref16.meta,
	    dispatch = _ref16.dispatch,
	    getState = _ref16.getState;

	var shiftHeld = event.shiftKey;
	var newRangeOrCaret = annotation.caretPosition > -1 ? annotation.caretPosition : annotation.annotationType === 'cutsite' ? annotation.topSnipPosition : { start: annotation.start, end: annotation.end };

	var _bindActionCreatorsWi = (0, _bindActionCreatorsWithMeta2.default)(_extends({}, annotationSelectionActions, caretPositionActions, selectionLayerActions), dispatch, meta),
	    selectionLayerUpdate = _bindActionCreatorsWi.selectionLayerUpdate,
	    caretPositionUpdate = _bindActionCreatorsWi.caretPositionUpdate;

	var editorState = getState().VectorEditor[meta.namespace];
	var caretPosition = editorState.caretPosition,
	    selectionLayer = editorState.selectionLayer;

	var sequenceLength = (0, _sequenceLengthSelector2.default)(editorState);
	(0, _updateSelectionOrCaret2.default)({ shiftHeld: shiftHeld, sequenceLength: sequenceLength, newRangeOrCaret: newRangeOrCaret, caretPosition: caretPosition, selectionLayer: selectionLayer, selectionLayerUpdate: selectionLayerUpdate, caretPositionUpdate: caretPositionUpdate });
}

// annotationDeselectAll()
// annotationSelect(feature)


// export function cutsiteClicked(event, cutsite, meta, options = {}) {
// 	var args1 = arguments
// 	var shiftHeld = event.shiftKey

// 	return function (dispatch, getState) {
// 		var actions = bindActionCreatorsWithMeta({ ...annotationSelectionActions,...caretPositionActions, ...selectionLayerActions}, dispatch, meta)
// 		var {selectionLayerUpdate, 
// 			caretPositionUpdate, 
// 			annotationSelect,
// 			annotationDeselectAll
// 		} = actions

// 		var editorState = getState().VectorEditor[meta]
// 		var {caretPosition, selectionLayer} = editorState
// 		var sequenceLength = sequenceLengthSelector(editorState)
// 		var updateSelectionOrCaretArgs = {shiftHeld, sequenceLength, newCaret, caretPosition, selectionLayer, selectionLayerUpdate, caretPositionUpdate}
// 		if (options.doSomethingDifferent) {
// 			options.doSomethingDifferent({...arguments, args1, meta, cutsite, editorState, ...actions, ...updateSelectionOrCaretArgs })
// 		} else {
// 			annotationDeselectAll()
// 			annotationSelect(cutsite)
// 			updateSelectionOrCaret(updateSelectionOrCaretArgs)
// 		}

// 	}
// }

// ------------------------------------
// Reducer
// ------------------------------------
var startingState = {
	idMap: {},
	idStack: []
};
exports.default = (0, _reduxAct.createReducer)((_createReducer = {}, _createReducer[annotationSelect] = function (state, payload) {
	var _extends2;

	if (!payload.id) debugger;
	var newState = {
		idMap: _extends({}, state.idMap, (_extends2 = {}, _extends2[payload.id] = payload, _extends2)),
		idStack: [].concat(state.idStack, [payload.id])
	};
	return newState;
}, _createReducer[annotationDeselect] = function (state, payload) {
	var id = payload.id || payload;
	var idMap = _extends({}, state.idMap);
	delete idMap[id];
	var idStack = (0, _without2.default)(state.idStack, id);
	return {
		idMap: idMap,
		idStack: idStack
	};
}, _createReducer[updateSelectedAnnotation] = function (state, payload) {
	var _extends3;

	var id = payload.id;
	var idMap = _extends({}, state.idMap);
	if (!idMap[id]) {
		return state;
	}
	return {
		idMap: _extends({}, idMap, (_extends3 = {}, _extends3[id] = _extends({}, idMap[id], payload), _extends3)),
		idStack: state.idStack
	};
}, _createReducer[annotationDeselectAll] = function () {
	return startingState;
}, _createReducer), startingState);

// // ------------------------------------
// // Selectors
// // ------------------------------------
// export function getSelectedCutsites (state) {
// 	var {idStack, idMap} = state
// 	var cutsiteIdMap = {}
// 	var cutsiteIdStack = idStack.filter(function (id) {
//       if (idMap[id].annotationType === 'cutsite') {
// 	      cutsiteIdMap[id] = idMap[id]
// 	      return true
//       }
//     })
// 	return {
// 		idStack: cutsiteIdStack,
// 		idMap: cutsiteIdMap
// 	}
// }