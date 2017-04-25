var _createReducer;

//./selectionLayer.js
import { createReducer } from 'redux-act';
import createAction from './utils/createMetaAction';

// ------------------------------------
// Actions
// ------------------------------------
export var selectionLayerClear = createAction('selectionLayerClear');
export var selectionLayerUpdate = createAction('selectionLayerUpdate');

import { caretPositionUpdate } from './caretPosition'; //important, keep this here in the order of the file and let it use the commonjs syntax! 
// ------------------------------------
// Reducer
// ------------------------------------
export default createReducer((_createReducer = {}, _createReducer[caretPositionUpdate] = function () {
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