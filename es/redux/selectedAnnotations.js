var _createReducer;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import getReverseComplementSequenceString from 've-sequence-utils/getReverseComplementSequenceString';
import getSequenceWithinRange from 've-range-utils/getSequenceWithinRange';
import sequenceSelector from '../selectors/sequenceSelector';
import Clipboard from 'clipboard';
import basicContext from 'basiccontext';
import 'basiccontext/dist/basicContext.min.css';
import 'basiccontext/dist/themes/default.min.css';
import without from 'lodash/without';
import sequenceLengthSelector from '../selectors/sequenceLengthSelector';
//./caretPosition.js
import updateSelectionOrCaret from '../utils/selectionAndCaretUtils/updateSelectionOrCaret';
import { createReducer } from 'redux-act';
import createAction from './utils/createMetaAction';
import * as caretPositionActions from './caretPosition';
import * as selectionLayerActions from './selectionLayer';
import bindActionCreatorsWithMeta from './utils/bindActionCreatorsWithMeta';
// ------------------------------------
// Actions
// ------------------------------------
// export const anno = createAction('VE_ANNOTATION_CLICK')
export var annotationSelect = createAction('VE_ANNOTATION_SELECT');
export var updateSelectedAnnotation = createAction('VE_ANNOTATION_UPDATE_SELECTED');
export var annotationDeselect = createAction('VE_ANNOTATION_DESELECT');
export var annotationDeselectAll = createAction('VE_ANNOTATION_DESELECT_ALL');

var annotationSelectionActions = {
	annotationSelect: annotationSelect,
	annotationDeselect: annotationDeselect,
	updateSelectedAnnotation: updateSelectedAnnotation,
	annotationDeselectAll: annotationDeselectAll
};

// ------------------------------------
// Thunks
// ------------------------------------
export function cutsiteClicked(_ref, meta) {
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

export function featureClicked(_ref2, meta) {
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

export function featureRightClicked(_ref3, meta) {
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

		basicContext.show(items, event);
	};
}

export function primerClicked(_ref4, meta) {
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

export function primerRightClicked(_ref5, meta) {
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
		basicContext.show(items, event);
	};
}

export function orfClicked(_ref6, meta) {
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

export function translationClicked(_ref7, meta) {
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

export function translationRightClicked(_ref8, meta) {
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
		basicContext.show(items, event);
	};
}

export function translationDoubleClicked(_ref9, meta) {
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

export function deletionLayerClicked(_ref10, meta) {
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

export function deletionLayerRightClicked(_ref11, meta) {
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

		basicContext.show(items, event);
	};
}

export function replacementLayerClicked(_ref12, meta) {
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

export function replacementLayerRightClicked(_ref13, meta) {
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

		basicContext.show(items, event);
	};
}

export function selectionLayerRightClicked(_ref14, meta) {
	var event = _ref14.event,
	    annotation = _ref14.annotation,
	    _ref14$extraItems = _ref14.extraItems,
	    extraItems = _ref14$extraItems === undefined ? [] : _ref14$extraItems;

	event.preventDefault();
	event.stopPropagation();
	return function (dispatch, getState) {
		var editorState = getState().VectorEditor[meta.namespace];
		var sequence = sequenceSelector(editorState);
		var selectionLayer = editorState.selectionLayer;

		var selectedSeq = getSequenceWithinRange(selectionLayer, sequence);
		function makeTextCopyable(stringToCopy) {
			var text = '';
			var clipboard = new Clipboard('.basicContext', {
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
				makeTextCopyable(getReverseComplementSequenceString(selectedSeq));
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

		basicContext.show(items, event);
	};
}

export function orfRightClicked(_ref15, meta) {
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
		basicContext.show(items, event);
	};
}

export function updateSelectionOrCaretBasedOnAnnotation(_ref16) {
	var _ref16$event = _ref16.event,
	    event = _ref16$event === undefined ? {} : _ref16$event,
	    _ref16$annotation = _ref16.annotation,
	    annotation = _ref16$annotation === undefined ? {} : _ref16$annotation,
	    meta = _ref16.meta,
	    dispatch = _ref16.dispatch,
	    getState = _ref16.getState;

	var shiftHeld = event.shiftKey;
	var newRangeOrCaret = annotation.caretPosition > -1 ? annotation.caretPosition : annotation.annotationType === 'cutsite' ? annotation.topSnipPosition : { start: annotation.start, end: annotation.end };

	var _bindActionCreatorsWi = bindActionCreatorsWithMeta(_extends({}, annotationSelectionActions, caretPositionActions, selectionLayerActions), dispatch, meta),
	    selectionLayerUpdate = _bindActionCreatorsWi.selectionLayerUpdate,
	    caretPositionUpdate = _bindActionCreatorsWi.caretPositionUpdate;

	var editorState = getState().VectorEditor[meta.namespace];
	var caretPosition = editorState.caretPosition,
	    selectionLayer = editorState.selectionLayer;

	var sequenceLength = sequenceLengthSelector(editorState);
	updateSelectionOrCaret({ shiftHeld: shiftHeld, sequenceLength: sequenceLength, newRangeOrCaret: newRangeOrCaret, caretPosition: caretPosition, selectionLayer: selectionLayer, selectionLayerUpdate: selectionLayerUpdate, caretPositionUpdate: caretPositionUpdate });
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
export default createReducer((_createReducer = {}, _createReducer[annotationSelect] = function (state, payload) {
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
	var idStack = without(state.idStack, id);
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