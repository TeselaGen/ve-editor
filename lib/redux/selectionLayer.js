'use strict';

exports.__esModule = true;
exports.selectionLayerUpdate = exports.selectionLayerClear = undefined;

var _createReducer; //./selectionLayer.js


var _reduxAct = require('redux-act');

var _createMetaAction = require('./utils/createMetaAction');

var _createMetaAction2 = _interopRequireDefault(_createMetaAction);

var _caretPosition = require('./caretPosition');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------
// Actions
// ------------------------------------
var selectionLayerClear = exports.selectionLayerClear = (0, _createMetaAction2.default)('selectionLayerClear');
var selectionLayerUpdate = exports.selectionLayerUpdate = (0, _createMetaAction2.default)('selectionLayerUpdate');

//important, keep this here in the order of the file and let it use the commonjs syntax! 
// ------------------------------------
// Reducer
// ------------------------------------
exports.default = (0, _reduxAct.createReducer)((_createReducer = {}, _createReducer[_caretPosition.caretPositionUpdate] = function () {
  //clear the selection layer if the caret is updated!
  return {
    start: -1,
    end: -1
  };
}, _createReducer[selectionLayerClear] = function () {
  return {
    start: -1,
    end: -1
  };
}, _createReducer[selectionLayerUpdate] = function (state, newSelectionLayer) {
  if (process.env.NODE_ENV !== 'production') {
    if (!(newSelectionLayer.start >= 0 && newSelectionLayer.end >= 0)) {
      console.error('we should never be here! selectionLayerUpdate must always be called with a valid selection layer');
      debugger;
    }
  }
  return newSelectionLayer;
}, _createReducer), {
  start: -1,
  end: -1
});