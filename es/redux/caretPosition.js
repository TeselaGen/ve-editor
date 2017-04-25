var _createReducer;

// import moveCaret from '../VectorInteractionWrapper/moveCaret'
// import handleCaretMoved from '../VectorInteractionWrapper/handleCaretMoved'
//./caretPosition.js
import { createReducer } from 'redux-act';
import createAction from './utils/createMetaAction';

// ------------------------------------
// Actions
// ------------------------------------
export var caretPositionClear = createAction('caretPositionClear');
export var caretPositionUpdate = createAction('caretPositionUpdate');

import { selectionLayerUpdate } from './selectionLayer'; //important, keep this here in the order of the file and let it use the commonjs syntax! 


// ------------------------------------
// Reducer
// ------------------------------------
export default createReducer((_createReducer = {}, _createReducer[selectionLayerUpdate] = function () {
  //clear the caret if the selection layer is updated!
  return -1;
}, _createReducer[caretPositionClear] = function () {
  return -1;
}, _createReducer[caretPositionUpdate] = function (_ref, payload) {
  var start = _ref.start;

  return typeof payload === 'string' ? parseInt(payload) : payload;
}, _createReducer), -1);

// ------------------------------------
// Thunks
// ------------------------------------
// export function moveCaret ({shiftHeld, type, meta}) {
// 	return function (dispatch, getState) {
//         var {sequenceData, bpsPerRow, caretPosition, selectionLayer} = getState().VectorEditor[meta.namespace]
//         var sequenceLength = sequenceData.sequence.length
//         var {circular} = sequenceData
//         var moveBy = moveCaret({sequenceLength, bpsPerRow, caretPosition, selectionLayer, shiftHeld, type})
//         handleCaretMoved({
//             moveBy, 
//             circular, 
//             sequenceLength, 
//             bpsPerRow, 
//             caretPosition, 
//             selectionLayer, 
//             shiftHeld, 
//             type,
//             caretMoved: function (newCaretPosition) {
//                 dispatch(caretPositionUpdate(newCaretPosition, meta))
//             }, 
//             selectionUpdated: function (newSelectionLayer) {
//                 dispatch(caretPositionUpdate(newSelectionLayer, meta))
//             }
//         })
// 	}
// }