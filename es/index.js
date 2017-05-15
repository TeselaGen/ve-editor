var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// import cleanSequenceData from './utils/cleanSequenceData';
// import deepEqual from 'deep-equal';
import './coreStyle.css';
import reducer, { actions } from './redux';
import s from './selectors';
import { connect } from 'react-redux';
import React from 'react';
import addMetaToActionCreators from './redux/utils/addMetaToActionCreators';
import { bindActionCreators } from 'redux';
import VectorInteractionWrapper from './VectorInteractionWrapper';
import _HoverHelper from './HoverHelper';
export { default as CircularView } from './CircularView';
export { default as RowView } from './RowView';
export { default as RowItem } from './RowItem';
export { default as VeToolBar } from './VeToolBar';
export { default as CutsiteFilter } from './CutsiteFilter';
export { default as LinearView } from './LinearView';
export { default as StatusBar } from './StatusBar';
export { default as HoverHelper } from './HoverHelper';

export default function createVectorEditor(_ref) {
  var namespace = _ref.namespace,
      _ref$actionOverrides = _ref.actionOverrides,
      actionOverrides = _ref$actionOverrides === undefined ? fakeActionOverrides : _ref$actionOverrides;

  var meta = { namespace: namespace };
  var HoverHelper = function HoverHelper(props) {
    return React.createElement(_HoverHelper, _extends({}, props, {
      meta: meta
    }));
  };
  var metaActions = addMetaToActionCreators(actions, meta);
  var overrides = addMetaToActionCreators(actionOverrides(metaActions), meta);
  //rebind the actions with dispatch and meta
  metaActions = _extends({}, metaActions, overrides);

  function mapDispatchToActions(dispatch, props) {
    var _props$actionOverride = props.actionOverrides,
        actionOverrides = _props$actionOverride === undefined ? fakeActionOverrides : _props$actionOverride;
    //add meta to all action creators before passing them to the override function
    // var metaActions = addMetaToActionCreators(actions, meta)

    var metaOverrides = addMetaToActionCreators(actionOverrides(metaActions), meta);
    //rebind the actions with dispatch and meta
    var actionsToPass = _extends({}, metaActions, metaOverrides);
    return _extends({}, bindActionCreators(actionsToPass, dispatch), { dispatch: dispatch });
  }

  var VectorEditorContainer = connect(function (state, props) {
    var VectorEditor = state.VectorEditor;
    //then use the fake blankEditor data as a substitute

    var editorState = VectorEditor[meta.namespace];
    var cutsites = s.filteredCutsitesSelector(editorState).cutsitesArray;
    var filteredRestrictionEnzymes = s.filteredRestrictionEnzymesSelector(editorState);
    var orfs = s.orfsSelector(editorState);
    var selectedCutsites = s.selectedCutsitesSelector(editorState);
    var allCutsites = s.cutsitesSelector(editorState);
    var translations = s.translationsSelector(editorState);
    var sequenceLength = s.sequenceLengthSelector(editorState);
    return _extends({}, editorState, {
      selectedCutsites: selectedCutsites,
      sequenceLength: sequenceLength,
      allCutsites: allCutsites,
      filteredRestrictionEnzymes: filteredRestrictionEnzymes,
      sequenceData: _extends({}, editorState.sequenceData, {
        cutsites: cutsites,
        orfs: orfs,
        translations: translations
      }),
      HoverHelper: HoverHelper,
      // HoverHelper: _HoverHelper,
      meta: meta
    }, props);
  }, mapDispatchToActions);
  var VectorEditor = VectorEditorContainer(VectorInteractionWrapper);

  return { veActions: metaActions, veSelectors: s, VectorEditor: VectorEditor, VectorEditorContainer: VectorEditorContainer, HoverHelper: HoverHelper };
}
export { reducer };

function fakeActionOverrides() {
  return {};
}