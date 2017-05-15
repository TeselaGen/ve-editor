'use strict';

exports.__esModule = true;
exports.getEditorByName = exports.actions = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// import pickBy from 'lodash/pickBy'
// import startsWith from 'lodash/startsWith'


exports.default = function () {
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
      newState[namespace] = (0, _redux.combineReducers)(reducers)(currentState, action);
    });
    stateToReturn = _extends({}, state, newState);
  } else {
    //just a normal action
    Object.keys(state).map(function (namespace) {
      newState[namespace] = (0, _redux.combineReducers)(reducers)(state[namespace], action);
    });
    stateToReturn = newState;
  }
  return stateToReturn;
};

var _redux = require('redux');

var _selectionLayer = require('./selectionLayer');

var fromSelectionLayer = _interopRequireWildcard(_selectionLayer);

var _caretPosition = require('./caretPosition');

var fromCaretPosition = _interopRequireWildcard(_caretPosition);

var _hoveredAnnotation = require('./hoveredAnnotation');

var fromHoveredAnnotation = _interopRequireWildcard(_hoveredAnnotation);

var _minimumOrfSize = require('./minimumOrfSize');

var fromMinimumOrfSize = _interopRequireWildcard(_minimumOrfSize);

var _sequenceData = require('./sequenceData');

var fromSequenceData = _interopRequireWildcard(_sequenceData);

var _annotationVisibility = require('./annotationVisibility');

var fromAnnotationVisibility = _interopRequireWildcard(_annotationVisibility);

var _annotationLabelVisibility = require('./annotationLabelVisibility');

var fromAnnotationLabelVisibility = _interopRequireWildcard(_annotationLabelVisibility);

var _selectedAnnotations = require('./selectedAnnotations');

var fromSelectedAnnotations = _interopRequireWildcard(_selectedAnnotations);

var _restrictionEnzymes = require('./restrictionEnzymes');

var fromRestrictionEnzymes = _interopRequireWildcard(_restrictionEnzymes);

var _deletionLayers = require('./deletionLayers');

var fromDeletionLayers = _interopRequireWildcard(_deletionLayers);

var _replacementLayers = require('./replacementLayers');

var fromReplacementLayers = _interopRequireWildcard(_replacementLayers);

var _panelsShown = require('./panelsShown');

var fromPanelsShown = _interopRequireWildcard(_panelsShown);

var _lineageLines = require('./lineageLines');

var fromLineageLines = _interopRequireWildcard(_lineageLines);

var _createMetaAction = require('./utils/createMetaAction');

var _createMetaAction2 = _interopRequireDefault(_createMetaAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var vectorEditorInitialize = (0, _createMetaAction2.default)('VECTOR_EDITOR_INITIALIZE');
var vectorEditorClear = (0, _createMetaAction2.default)('VECTOR_EDITOR_CLEAR');

//export the actions for use elsewhere
var actions = exports.actions = _extends({}, fromSelectionLayer, fromCaretPosition, fromRestrictionEnzymes, fromSelectedAnnotations, fromAnnotationLabelVisibility, fromAnnotationVisibility, fromSequenceData, fromMinimumOrfSize, fromHoveredAnnotation, fromDeletionLayers, fromReplacementLayers, fromLineageLines, fromPanelsShown, {
  vectorEditorInitialize: vectorEditorInitialize,
  vectorEditorClear: vectorEditorClear
});

//define the reducer
var reducers = {
  restrictionEnzymes: fromRestrictionEnzymes.default,
  selectedAnnotations: fromSelectedAnnotations.default,
  annotationLabelVisibility: fromAnnotationLabelVisibility.default,
  annotationVisibility: fromAnnotationVisibility.default,
  sequenceData: fromSequenceData.default,
  minimumOrfSize: fromMinimumOrfSize.default,
  hoveredAnnotation: fromHoveredAnnotation.default,
  caretPosition: fromCaretPosition.default,
  selectionLayer: fromSelectionLayer.default,
  lineageLines: fromLineageLines.default,
  panelsShown: fromPanelsShown.default,
  deletionLayers: fromDeletionLayers.default,
  replacementLayers: fromReplacementLayers.default
};

// export const getBlankEditor = (state) => (state.blankEditor)
var getEditorByName = exports.getEditorByName = function getEditorByName(state, editorName) {
  return state[editorName];
};