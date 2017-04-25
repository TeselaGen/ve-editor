var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import { combineReducers } from 'redux';
import selectionLayer, * as fromSelectionLayer from './selectionLayer';
import addYourOwnEnzyme, * as fromAddYourOwnEnzyme from './addYourOwnEnzyme';
import caretPosition, * as fromCaretPosition from './caretPosition';
import hoveredAnnotation, * as fromHoveredAnnotation from './hoveredAnnotation';
import minimumOrfSize, * as fromMinimumOrfSize from './minimumOrfSize';
import sequenceData, * as fromSequenceData from './sequenceData';
import annotationVisibility, * as fromAnnotationVisibility from './annotationVisibility';
import annotationLabelVisibility, * as fromAnnotationLabelVisibility from './annotationLabelVisibility';
import selectedAnnotations, * as fromSelectedAnnotations from './selectedAnnotations';
import restrictionEnzymes, * as fromRestrictionEnzymes from './restrictionEnzymes';
import deletionLayers, * as fromDeletionLayers from './deletionLayers';
import replacementLayers, * as fromReplacementLayers from './replacementLayers';
import panelsShown, * as fromPanelsShown from './panelsShown';
import lineageLines, * as fromLineageLines from './lineageLines';

// import pickBy from 'lodash/pickBy'
// import startsWith from 'lodash/startsWith'
import createAction from './utils/createMetaAction';

var vectorEditorInitialize = createAction('VECTOR_EDITOR_INITIALIZE');
var vectorEditorClear = createAction('VECTOR_EDITOR_CLEAR');

//export the actions for use elsewhere
export var actions = _extends({}, fromSelectionLayer, fromCaretPosition, fromRestrictionEnzymes, fromSelectedAnnotations, fromAnnotationLabelVisibility, fromAnnotationVisibility, fromSequenceData, fromMinimumOrfSize, fromHoveredAnnotation, fromDeletionLayers, fromReplacementLayers, fromLineageLines, fromPanelsShown, {
  vectorEditorInitialize: vectorEditorInitialize,
  vectorEditorClear: vectorEditorClear
});

//define the reducer
var reducers = {
  restrictionEnzymes: restrictionEnzymes,
  selectedAnnotations: selectedAnnotations,
  annotationLabelVisibility: annotationLabelVisibility,
  annotationVisibility: annotationVisibility,
  sequenceData: sequenceData,
  minimumOrfSize: minimumOrfSize,
  hoveredAnnotation: hoveredAnnotation,
  caretPosition: caretPosition,
  selectionLayer: selectionLayer,
  lineageLines: lineageLines,
  panelsShown: panelsShown,
  deletionLayers: deletionLayers,
  replacementLayers: replacementLayers
};

var topLevelReducers = {
  addYourOwnEnzyme: addYourOwnEnzyme
};

export default function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  var namespaces;
  var newState = {};
  if (action.meta && action.meta.EditorNamespace) {
    namespaces = Array.isArray(action.meta.EditorNamespace) ? action.meta.EditorNamespace : [action.meta.EditorNamespace];
  }
  var stateToReturn;
  if (namespaces) {
    //we're dealing with an action specific to a given editor
    namespaces.forEach(function (namespace) {
      var currentState = state[namespace];
      if (action.type === 'VECTOR_EDITOR_INITIALIZE') {
        //merge the exisiting state with the new payload of props (if you want to do a clean wipe, use VECTOR_EDITOR_CLEAR)
        currentState = _extends({}, state[namespace], action.payload);
      }
      if (action.type === 'VECTOR_EDITOR_CLEAR') {
        currentState = undefined;
      }
      newState[namespace] = combineReducers(reducers)(currentState, action);
    });
    stateToReturn = _extends({}, state, newState);
  } else {
    //just a normal action
    Object.keys(state).map(function (namespace) {
      newState[namespace] = combineReducers(reducers)(state[namespace], action);
    });
    stateToReturn = newState;
  }
  return _extends({}, stateToReturn, combineReducers(topLevelReducers)(state, action));
}

// export const getBlankEditor = (state) => (state.blankEditor)
export var getEditorByName = function getEditorByName(state, editorName) {
  return state[editorName];
};