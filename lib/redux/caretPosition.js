'use strict';

exports.__esModule = true;
exports.caretPositionUpdate = exports.caretPositionClear = undefined;

var _createReducer; // import moveCaret from '../VectorInteractionWrapper/moveCaret'
// import handleCaretMoved from '../VectorInteractionWrapper/handleCaretMoved'
//./caretPosition.js


var _reduxAct = require('redux-act');

var _createMetaAction = require('./utils/createMetaAction');

var _createMetaAction2 = _interopRequireDefault(_createMetaAction);

var _selectionLayer = require('./selectionLayer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Actions
// ------------------------------------
var caretPositionClear = exports.caretPositionClear = (0, _createMetaAction2.default)('caretPositionClear');
var caretPositionUpdate = exports.caretPositionUpdate = (0, _createMetaAction2.default)('caretPositionUpdate');

//important, keep this here in the order of the file and let it use the commonjs syntax! 


// ------------------------------------
// Reducer
// ------------------------------------
exports.default = (0, _reduxAct.createReducer)((_createReducer = {}, _createReducer[_selectionLayer.selectionLayerUpdate] = function () {
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