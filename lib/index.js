'use strict';

exports.__esModule = true;
exports.reducer = exports.StatusBar = exports.LinearView = exports.CutsiteFilter = exports.VeToolBar = exports.RowItem = exports.RowView = exports.CircularView = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // import cleanSequenceData from './utils/cleanSequenceData';
// import deepEqual from 'deep-equal';


var _CircularView = require('./CircularView');

Object.defineProperty(exports, 'CircularView', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_CircularView).default;
  }
});

var _RowView = require('./RowView');

Object.defineProperty(exports, 'RowView', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_RowView).default;
  }
});

var _RowItem = require('./RowItem');

Object.defineProperty(exports, 'RowItem', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_RowItem).default;
  }
});

var _VeToolBar = require('./VeToolBar');

Object.defineProperty(exports, 'VeToolBar', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_VeToolBar).default;
  }
});

var _CutsiteFilter = require('./CutsiteFilter');

Object.defineProperty(exports, 'CutsiteFilter', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_CutsiteFilter).default;
  }
});

var _LinearView = require('./LinearView');

Object.defineProperty(exports, 'LinearView', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_LinearView).default;
  }
});

var _StatusBar = require('./StatusBar');

Object.defineProperty(exports, 'StatusBar', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_StatusBar).default;
  }
});
exports.default = createVectorEditor;

require('./coreStyle.css');

var _redux = require('./redux');

var _redux2 = _interopRequireDefault(_redux);

var _selectors = require('./selectors');

var _selectors2 = _interopRequireDefault(_selectors);

var _reactRedux = require('react-redux');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _addMetaToActionCreators = require('./redux/utils/addMetaToActionCreators');

var _addMetaToActionCreators2 = _interopRequireDefault(_addMetaToActionCreators);

var _redux3 = require('redux');

var _VectorInteractionWrapper = require('./VectorInteractionWrapper');

var _VectorInteractionWrapper2 = _interopRequireDefault(_VectorInteractionWrapper);

var _HoverHelper2 = require('./HoverHelper');

var _HoverHelper3 = _interopRequireDefault(_HoverHelper2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createVectorEditor(_ref) {
  var namespace = _ref.namespace,
      _ref$actionOverrides = _ref.actionOverrides,
      actionOverrides = _ref$actionOverrides === undefined ? fakeActionOverrides : _ref$actionOverrides;

  var meta = { namespace: namespace };
  var HoverHelper = function HoverHelper(props) {
    return _react2.default.createElement(_HoverHelper3.default, _extends({}, props, {
      meta: meta
    }));
  };
  var metaActions = (0, _addMetaToActionCreators2.default)(_redux.actions, meta);
  var overrides = (0, _addMetaToActionCreators2.default)(actionOverrides(metaActions), meta);
  //rebind the actions with dispatch and meta
  metaActions = _extends({}, metaActions, overrides);

  function mapDispatchToActions(dispatch, props) {
    var _props$actionOverride = props.actionOverrides,
        actionOverrides = _props$actionOverride === undefined ? fakeActionOverrides : _props$actionOverride;
    //add meta to all action creators before passing them to the override function
    // var metaActions = addMetaToActionCreators(actions, meta)

    var metaOverrides = (0, _addMetaToActionCreators2.default)(actionOverrides(metaActions), meta);
    //rebind the actions with dispatch and meta
    var actionsToPass = _extends({}, metaActions, metaOverrides);
    return _extends({}, (0, _redux3.bindActionCreators)(actionsToPass, dispatch), { dispatch: dispatch });
  }

  var VectorEditorContainer = (0, _reactRedux.connect)(function (state, props) {
    var VectorEditor = state.VectorEditor;
    //then use the fake blankEditor data as a substitute

    var editorState = VectorEditor[meta.namespace];
    var cutsites = _selectors2.default.filteredCutsitesSelector(editorState).cutsitesArray;
    var filteredRestrictionEnzymes = _selectors2.default.filteredRestrictionEnzymesSelector(editorState);
    var orfs = _selectors2.default.orfsSelector(editorState);
    var selectedCutsites = _selectors2.default.selectedCutsitesSelector(editorState);
    var allCutsites = _selectors2.default.cutsitesSelector(editorState);
    var translations = _selectors2.default.translationsSelector(editorState);
    var sequenceLength = _selectors2.default.sequenceLengthSelector(editorState);
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
  var VectorEditor = VectorEditorContainer(_VectorInteractionWrapper2.default);

  return { veActions: metaActions, veSelectors: _selectors2.default, VectorEditor: VectorEditor, VectorEditorContainer: VectorEditorContainer, HoverHelper: HoverHelper };
}
exports.reducer = _redux2.default;


function fakeActionOverrides() {
  return {};
}