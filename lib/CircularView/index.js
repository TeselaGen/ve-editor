'use strict';

exports.__esModule = true;
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _VeWarning = require('../VeWarning');

var _VeWarning2 = _interopRequireDefault(_VeWarning);

var _getRangeLength = require('ve-range-utils/getRangeLength');

var _getRangeLength2 = _interopRequireDefault(_getRangeLength);

var _PassThrough = require('../utils/PassThrough');

var _PassThrough2 = _interopRequireDefault(_PassThrough);

var _Labels2 = require('./Labels');

var _Labels3 = _interopRequireDefault(_Labels2);

var _SelectionLayer2 = require('./SelectionLayer');

var _SelectionLayer3 = _interopRequireDefault(_SelectionLayer2);

var _Caret2 = require('./Caret');

var _Caret3 = _interopRequireDefault(_Caret2);

var _Axis2 = require('./Axis');

var _Axis3 = _interopRequireDefault(_Axis2);

var _LineageLines = require('./LineageLines');

var _LineageLines2 = _interopRequireDefault(_LineageLines);

var _Orfs2 = require('./Orfs');

var _Orfs3 = _interopRequireDefault(_Orfs2);

var _Features2 = require('./Features');

var _Features3 = _interopRequireDefault(_Features2);

var _Primers2 = require('./Primers');

var _Primers3 = _interopRequireDefault(_Primers2);

var _DeletionLayers = require('./DeletionLayers');

var _DeletionLayers2 = _interopRequireDefault(_DeletionLayers);

var _ReplacementLayers = require('./ReplacementLayers');

var _ReplacementLayers2 = _interopRequireDefault(_ReplacementLayers);

var _Cutsites2 = require('./Cutsites');

var _Cutsites3 = _interopRequireDefault(_Cutsites2);

var _sortBy = require('lodash/sortBy');

var _sortBy2 = _interopRequireDefault(_sortBy);

var _PositionAnnotationOnCircle = require('./PositionAnnotationOnCircle');

var _PositionAnnotationOnCircle2 = _interopRequireDefault(_PositionAnnotationOnCircle);

var _getAngleForPositionMidpoint = require('./getAngleForPositionMidpoint');

var _getAngleForPositionMidpoint2 = _interopRequireDefault(_getAngleForPositionMidpoint);

var _normalizePositionByRangeLength = require('ve-range-utils/normalizePositionByRangeLength');

var _normalizePositionByRangeLength2 = _interopRequireDefault(_normalizePositionByRangeLength);

var _getPositionFromAngle = require('ve-range-utils/getPositionFromAngle');

var _getPositionFromAngle2 = _interopRequireDefault(_getPositionFromAngle);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDraggable = require('react-draggable');

var _reactDraggable2 = _interopRequireDefault(_reactDraggable);

require('./style.css');

var _draggableClassnames = require('../constants/draggableClassnames');

var _draggableClassnames2 = _interopRequireDefault(_draggableClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function noop() {}

// function toDegrees(radians) {
//     return radians / 2 / Math.PI * 360
// }

var CircularView = function (_React$Component) {
  _inherits(CircularView, _React$Component);

  function CircularView() {
    _classCallCheck(this, CircularView);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  CircularView.prototype.getNearestCursorPositionToMouseEvent = function getNearestCursorPositionToMouseEvent(event, sequenceLength, callback) {
    if (!event.clientX) {
      return;
    }
    var boundingRect = this.refs.circularView.getBoundingClientRect();
    //get relative click positions
    var clickX = event.clientX - boundingRect.left - boundingRect.width / 2;
    var clickY = event.clientY - boundingRect.top - boundingRect.height / 2;

    //get angle
    var angle = Math.atan2(clickY, clickX) + Math.PI / 2;
    if (angle < 0) angle += Math.PI * 2; //normalize the angle if necessary
    var nearestCaretPos = (0, _normalizePositionByRangeLength2.default)((0, _getPositionFromAngle2.default)(angle, sequenceLength, true), sequenceLength); //true because we're in between positions

    callback({
      className: event.target.className.animVal,
      shiftHeld: event.shiftKey,
      nearestCaretPos: nearestCaretPos,
      selectionStartGrabbed: event.target.classList.contains(_draggableClassnames2.default.selectionStart),
      selectionEndGrabbed: event.target.classList.contains(_draggableClassnames2.default.selectionEnd)

    });
  };

  CircularView.prototype.render = function render() {
    var _this2 = this;

    var propsToUse = _extends({}, this.props.veWrapperProvidedProps, this.props);
    var _propsToUse$width = propsToUse.width,
        width = _propsToUse$width === undefined ? 400 : _propsToUse$width,
        _propsToUse$height = propsToUse.height,
        height = _propsToUse$height === undefined ? 400 : _propsToUse$height,
        _propsToUse$scale = propsToUse.scale,
        scale = _propsToUse$scale === undefined ? 1 : _propsToUse$scale,
        centerText = propsToUse.centerText,
        _propsToUse$sequenceD = propsToUse.sequenceData,
        sequenceData = _propsToUse$sequenceD === undefined ? {
      features: {},
      primers: {},
      orfs: {},
      sequence: 'atgc',
      cutsites: {}
    } : _propsToUse$sequenceD,
        _propsToUse$hideName = propsToUse.hideName,
        hideName = _propsToUse$hideName === undefined ? false : _propsToUse$hideName,
        _propsToUse$HoverHelp = propsToUse.HoverHelper,
        HoverHelper = _propsToUse$HoverHelp === undefined ? _PassThrough2.default : _propsToUse$HoverHelp,
        _propsToUse$selection = propsToUse.selectionLayer,
        selectionLayer = _propsToUse$selection === undefined ? { start: -1, end: -1 } : _propsToUse$selection,
        _propsToUse$annotatio = propsToUse.annotationHeight,
        annotationHeight = _propsToUse$annotatio === undefined ? 15 : _propsToUse$annotatio,
        _propsToUse$spaceBetw = propsToUse.spaceBetweenAnnotations,
        spaceBetweenAnnotations = _propsToUse$spaceBetw === undefined ? 2 : _propsToUse$spaceBetw,
        _propsToUse$annotatio2 = propsToUse.annotationVisibility,
        annotationVisibility = _propsToUse$annotatio2 === undefined ? {} : _propsToUse$annotatio2,
        _propsToUse$caretPosi = propsToUse.caretPosition,
        caretPosition = _propsToUse$caretPosi === undefined ? -1 : _propsToUse$caretPosi,
        circularAndLinearTickSpacing = propsToUse.circularAndLinearTickSpacing,
        _propsToUse$editorDra = propsToUse.editorDragged,
        editorDragged = _propsToUse$editorDra === undefined ? noop : _propsToUse$editorDra,
        _propsToUse$editorDra2 = propsToUse.editorDragStarted,
        editorDragStarted = _propsToUse$editorDra2 === undefined ? noop : _propsToUse$editorDra2,
        _propsToUse$editorCli = propsToUse.editorClicked,
        editorClicked = _propsToUse$editorCli === undefined ? noop : _propsToUse$editorCli,
        _propsToUse$editorDra3 = propsToUse.editorDragStopped,
        editorDragStopped = _propsToUse$editorDra3 === undefined ? noop : _propsToUse$editorDra3,
        _propsToUse$featureCl = propsToUse.featureClicked,
        featureClicked = _propsToUse$featureCl === undefined ? noop : _propsToUse$featureCl,
        _propsToUse$primerCli = propsToUse.primerClicked,
        primerClicked = _propsToUse$primerCli === undefined ? noop : _propsToUse$primerCli,
        _propsToUse$deletionL = propsToUse.deletionLayerClicked,
        deletionLayerClicked = _propsToUse$deletionL === undefined ? noop : _propsToUse$deletionL,
        _propsToUse$replaceme = propsToUse.replacementLayerClicked,
        replacementLayerClicked = _propsToUse$replaceme === undefined ? noop : _propsToUse$replaceme,
        _propsToUse$orfClicke = propsToUse.orfClicked,
        orfClicked = _propsToUse$orfClicke === undefined ? noop : _propsToUse$orfClicke,
        _propsToUse$cutsiteCl = propsToUse.cutsiteClicked,
        cutsiteClicked = _propsToUse$cutsiteCl === undefined ? noop : _propsToUse$cutsiteCl,
        _propsToUse$featureOp = propsToUse.featureOptions,
        featureOptions = _propsToUse$featureOp === undefined ? {} : _propsToUse$featureOp,
        _propsToUse$additiona = propsToUse.additionalSelectionLayers,
        additionalSelectionLayers = _propsToUse$additiona === undefined ? [] : _propsToUse$additiona,
        _propsToUse$component = propsToUse.componentOverrides,
        componentOverrides = _propsToUse$component === undefined ? {} : _propsToUse$component,
        _propsToUse$maxAnnota = propsToUse.maxAnnotationsToDisplay,
        maxAnnotationsToDisplay = _propsToUse$maxAnnota === undefined ? {} : _propsToUse$maxAnnota,
        _propsToUse$lineageLi = propsToUse.lineageLines,
        lineageLines = _propsToUse$lineageLi === undefined ? [] : _propsToUse$lineageLi,
        _propsToUse$deletionL2 = propsToUse.deletionLayers,
        deletionLayers = _propsToUse$deletionL2 === undefined ? {} : _propsToUse$deletionL2,
        _propsToUse$replaceme2 = propsToUse.replacementLayers,
        replacementLayers = _propsToUse$replaceme2 === undefined ? {} : _propsToUse$replaceme2;
    var _componentOverrides$L = componentOverrides.Labels,
        Labels = _componentOverrides$L === undefined ? _Labels3.default : _componentOverrides$L,
        _componentOverrides$S = componentOverrides.SelectionLayer,
        SelectionLayer = _componentOverrides$S === undefined ? _SelectionLayer3.default : _componentOverrides$S,
        _componentOverrides$C = componentOverrides.Caret,
        Caret = _componentOverrides$C === undefined ? _Caret3.default : _componentOverrides$C,
        _componentOverrides$A = componentOverrides.Axis,
        Axis = _componentOverrides$A === undefined ? _Axis3.default : _componentOverrides$A,
        _componentOverrides$F = componentOverrides.Features,
        Features = _componentOverrides$F === undefined ? _Features3.default : _componentOverrides$F,
        _componentOverrides$P = componentOverrides.Primers,
        Primers = _componentOverrides$P === undefined ? _Primers3.default : _componentOverrides$P,
        _componentOverrides$O = componentOverrides.Orfs,
        Orfs = _componentOverrides$O === undefined ? _Orfs3.default : _componentOverrides$O,
        _componentOverrides$C2 = componentOverrides.Cutsites,
        Cutsites = _componentOverrides$C2 === undefined ? _Cutsites3.default : _componentOverrides$C2;
    var _sequenceData$sequenc = sequenceData.sequence,
        sequence = _sequenceData$sequenc === undefined ? 'atgc' : _sequenceData$sequenc;

    var sequenceLength = sequence;
    var sequenceName = hideName ? "" : sequenceData.name || "";
    circularAndLinearTickSpacing = circularAndLinearTickSpacing || (sequenceLength < 10 ? 1 : sequenceLength < 50 ? Math.ceil(sequenceLength / 5) : Math.ceil(sequenceLength / 100) * 10);
    var _annotationVisibility = annotationVisibility.features,
        showFeatures = _annotationVisibility === undefined ? true : _annotationVisibility,
        _annotationVisibility2 = annotationVisibility.primers,
        showPrimers = _annotationVisibility2 === undefined ? true : _annotationVisibility2,
        _annotationVisibility3 = annotationVisibility.orfs,
        showOrfs = _annotationVisibility3 === undefined ? true : _annotationVisibility3,
        _annotationVisibility4 = annotationVisibility.cutsites,
        showCutsites = _annotationVisibility4 === undefined ? true : _annotationVisibility4,
        _annotationVisibility5 = annotationVisibility.axis,
        showAxis = _annotationVisibility5 === undefined ? true : _annotationVisibility5,
        _annotationVisibility6 = annotationVisibility.lineageLines,
        showLineageLines = _annotationVisibility6 === undefined ? true : _annotationVisibility6,
        _annotationVisibility7 = annotationVisibility.axisNumbers,
        showAxisNumbers = _annotationVisibility7 === undefined ? false : _annotationVisibility7;
    var _maxAnnotationsToDisp = maxAnnotationsToDisplay.features,
        maxFeaturesToDisplay = _maxAnnotationsToDisp === undefined ? 50 : _maxAnnotationsToDisp,
        _maxAnnotationsToDisp2 = maxAnnotationsToDisplay.primers,
        maxPrimersToDisplay = _maxAnnotationsToDisp2 === undefined ? 50 : _maxAnnotationsToDisp2,
        _maxAnnotationsToDisp3 = maxAnnotationsToDisplay.orfs,
        maxOrfsToDisplay = _maxAnnotationsToDisp3 === undefined ? 50 : _maxAnnotationsToDisp3,
        _maxAnnotationsToDisp4 = maxAnnotationsToDisplay.cutsites,
        maxCutsitesToDisplay = _maxAnnotationsToDisp4 === undefined ? 100 : _maxAnnotationsToDisp4;

    var paredDownOrfs;
    var paredDownCutsites;
    var paredDownFeatures;
    var paredDownPrimers;

    var baseRadius = 80;
    var innerRadius = baseRadius - annotationHeight / 2; //tnr: -annotationHeight/2 because features are drawn from the center
    var radius = baseRadius;
    var annotationsSvgs = [];
    var labels = {};

    //RENDERING CONCEPTS:
    //-"Circular" annotations get a radius, and a curvature based on their radius:
    //<CircularFeature>
    //-Then we rotate the annotations as necessary (and optionally flip them):
    //<PositionAnnotationOnCircle>

    var layersToDraw = [{ layer: drawSequenceChars, zIndex: 10, layerName: 'SequenceChars' }, { layer: drawFeatures, zIndex: 20, layerName: 'Features' }, { layer: drawPrimers, zIndex: 20, layerName: 'Primers' }, { layer: drawCaret, zIndex: 15, layerName: 'Caret' }, { layer: drawSelectionLayer, zIndex: 10, layerName: 'SelectionLayer' }, { layer: drawAxis, zIndex: 0, layerName: 'Axis', spaceBefore: 0, spaceAfter: 0 }, { layer: drawReplacementLayers, zIndex: 20, layerName: 'ReplacementLayers', spaceAfter: 20 }, { layer: drawDeletionLayers, zIndex: 20, layerName: 'DeletionLayers', spaceAfter: 20 }, { layer: drawLineageLines, zIndex: 0, layerName: 'LineageLines' }, { layer: drawCutsites, zIndex: 10, layerName: 'Cutsites' }, { layer: drawOrfs, zIndex: 20, layerName: 'Orfs', spaceBefore: 10 }, { layer: drawLabels, zIndex: 30, layerName: 'Labels' }];

    var output = layersToDraw.map(function (_ref) {
      var layer = _ref.layer,
          _ref$spaceBefore = _ref.spaceBefore,
          spaceBefore = _ref$spaceBefore === undefined ? 0 : _ref$spaceBefore,
          _ref$spaceAfter = _ref.spaceAfter,
          spaceAfter = _ref$spaceAfter === undefined ? 0 : _ref$spaceAfter,
          zIndex = _ref.zIndex;

      //   console.warn('-------------------------------------')
      //   console.warn('layerName:',JSON.stringify(layerName,null,4))
      //   console.warn('radius before draw:',JSON.stringify(radius,null,4))
      radius += spaceBefore;
      var result = layer();
      if (!result) return null;
      radius += spaceAfter;
      // console.warn('radius after draw:',JSON.stringify(radius,null,4))
      return {
        result: result,
        // layer({
        //   radius,
        //   baseRadius,
        //   innerRadius,
        //   labels,
        //   annotationsSvgs,
        // }),
        zIndex: zIndex
      };
    }).filter(function (i) {
      return !!i;
    });
    annotationsSvgs = (0, _sortBy2.default)(output, 'zIndex').reduce(function (arr, _ref2) {
      var result = _ref2.result;

      return arr.concat(result);
    }, []);

    //debug hash marks
    // annotationsSvgs = annotationsSvgs.concat([0,50,100,150,190].map(function (pos) {
    //     return <text key={pos} transform={`translate(0,${-pos})`}>{pos}</text>
    // }))

    function drawFeatures() {
      //DRAW FEATURES
      if (showFeatures) {
        var _pareDownAnnotations = pareDownAnnotations(sequenceData.features, maxFeaturesToDisplay),
            annotationsToPass = _pareDownAnnotations[0],
            paredDown = _pareDownAnnotations[1];

        paredDownFeatures = paredDown;
        var results = Features(_extends({
          radius: radius,
          featureClicked: featureClicked,
          features: annotationsToPass,
          annotationHeight: annotationHeight,
          spaceBetweenAnnotations: spaceBetweenAnnotations,
          sequenceLength: sequenceLength,
          HoverHelper: HoverHelper
        }, featureOptions));
        //update the radius, labels, and svg
        radius += results.height;
        labels = _extends({}, labels, results.labels);
        return results.component;
      }
    }

    function drawPrimers() {
      //DRAW FEATURES
      if (showPrimers) {
        var _pareDownAnnotations2 = pareDownAnnotations(sequenceData.primers, maxPrimersToDisplay),
            annotationsToPass = _pareDownAnnotations2[0],
            paredDown = _pareDownAnnotations2[1];

        paredDownPrimers = paredDown;
        var results = Primers({
          radius: radius,
          primerClicked: primerClicked,
          primers: annotationsToPass,
          annotationHeight: annotationHeight,
          spaceBetweenAnnotations: spaceBetweenAnnotations,
          sequenceLength: sequenceLength,
          HoverHelper: HoverHelper
        });
        //update the radius, labels, and svg
        radius += results.height;
        labels = _extends({}, labels, results.labels);
        return results.component;
      }
    }

    function drawDeletionLayers() {
      var results = (0, _DeletionLayers2.default)({
        radius: radius,
        deletionLayerClicked: deletionLayerClicked,
        deletionLayers: deletionLayers,
        annotationHeight: annotationHeight,
        spaceBetweenAnnotations: spaceBetweenAnnotations,
        sequenceLength: sequenceLength,
        HoverHelper: HoverHelper
      });
      if (!results) return null;
      //update the radius, labels, and svg
      radius += results.height;
      labels = _extends({}, labels, results.labels);
      return results.component;
    }

    function drawReplacementLayers() {
      var results = (0, _ReplacementLayers2.default)({
        radius: radius,
        replacementLayerClicked: replacementLayerClicked,
        replacementLayers: replacementLayers,
        annotationHeight: annotationHeight,
        spaceBetweenAnnotations: spaceBetweenAnnotations,
        sequenceLength: sequenceLength,
        HoverHelper: HoverHelper
      });
      if (!results) return null;
      //update the radius, labels, and svg
      radius += results.height;
      labels = _extends({}, labels, results.labels);
      return results.component;
    }

    function drawOrfs() {
      //DRAW FEATURES
      if (showOrfs) {
        var _pareDownAnnotations3 = pareDownAnnotations(sequenceData.orfs, maxOrfsToDisplay),
            annotationsToPass = _pareDownAnnotations3[0],
            paredDown = _pareDownAnnotations3[1];

        paredDownOrfs = paredDown;
        var results = Orfs(_extends({
          radius: radius,
          orfClicked: orfClicked,
          orfs: annotationsToPass,
          annotationHeight: annotationHeight,
          spaceBetweenAnnotations: spaceBetweenAnnotations,
          sequenceLength: sequenceLength,
          HoverHelper: HoverHelper
        }, featureOptions));
        //update the radius, labels, and svg
        radius += results.height;
        labels = _extends({}, labels, results.labels);
        return results.component;
      }
    }

    function drawSequenceChars() {
      //DRAW CHARS (only if there are fewer than 85 of them)
      if (sequenceLength < 85) {
        radius += 25;
        sequenceData.sequence.split('').forEach(function (bp, index) {
          var tickAngle = (0, _getAngleForPositionMidpoint2.default)(index, sequenceLength);
          return _react2.default.createElement(
            _PositionAnnotationOnCircle2.default,
            {
              key: index,
              sAngle: tickAngle,
              eAngle: tickAngle,
              height: radius },
            _react2.default.createElement(
              'text',
              {
                transform: 'rotate(180)',
                style: { textAnchor: "middle", dominantBaseline: "central", fontSize: 'small' } },
              bp
            )
          );
        });
      }
    }

    function drawAxis() {
      if (showAxis) {
        var axisResult = Axis({
          showAxisNumbers: showAxisNumbers,
          radius: radius,
          sequenceLength: sequenceLength,
          circularAndLinearTickSpacing: circularAndLinearTickSpacing
        });
        //update the radius, and svg
        radius += axisResult.height;
        return axisResult.component;
      }
    }

    function drawLineageLines() {
      if (showLineageLines) {
        var result = (0, _LineageLines2.default)({
          radius: radius,
          sequenceLength: sequenceLength,
          annotationHeight: 6,
          HoverHelper: HoverHelper,
          lineageLines: lineageLines
        });
        //update the radius, and svg
        radius += result.height;
        return result.component;
      }
    }

    function drawCutsites() {
      //DRAW CUTSITES
      if (showCutsites) {
        var _pareDownAnnotations4 = pareDownAnnotations(sequenceData.cutsites, maxCutsitesToDisplay),
            annotationsToPass = _pareDownAnnotations4[0],
            paredDown = _pareDownAnnotations4[1];

        paredDownCutsites = paredDown;
        var cutsiteResults = Cutsites({
          cutsites: annotationsToPass,
          radius: radius,
          annotationHeight: annotationHeight,
          sequenceLength: sequenceLength,
          HoverHelper: HoverHelper,
          cutsiteClicked: cutsiteClicked
        });
        //update the radius, labels, and svg
        radius += cutsiteResults.height;
        labels = _extends({}, labels, cutsiteResults.labels);
        return cutsiteResults.component;
      }
    }

    function drawSelectionLayer() {
      //DRAW SELECTION LAYER
      var selectionLayers = [].concat(additionalSelectionLayers, Array.isArray(selectionLayer) ? selectionLayer : [selectionLayer]);
      return selectionLayers.map(function (selectionLayer, index) {
        if (selectionLayer.start >= 0 && selectionLayer.end >= 0 && sequenceLength > 0) {
          return SelectionLayer({
            index: index,
            selectionLayer: selectionLayer,
            sequenceLength: sequenceLength,
            baseRadius: baseRadius,
            radius: radius,
            innerRadius: innerRadius
          });
        }
      });
    }

    function drawCaret() {
      //DRAW CARET
      if (caretPosition !== -1 && selectionLayer.start < 0 && sequenceLength > 0) {
        //only render if there is no selection layer
        return _react2.default.createElement(Caret, {
          caretPosition: caretPosition,
          sequenceLength: sequenceLength,
          innerRadius: innerRadius,
          outerRadius: radius
        });
      }
    }

    function drawLabels() {
      var res = Labels({ HoverHelper: HoverHelper, labels: labels, outerRadius: radius });
      radius += res.height;
      return res.component;
    }

    return _react2.default.createElement(
      'div',
      { tabIndex: '0', className: 'veCircularView' },
      _react2.default.createElement(
        _reactDraggable2.default,
        {
          bounds: { top: 0, left: 0, right: 0, bottom: 0 },
          onDrag: function onDrag(event) {
            _this2.getNearestCursorPositionToMouseEvent(event, sequenceLength, editorDragged);
          },
          onStart: function onStart(event) {
            _this2.getNearestCursorPositionToMouseEvent(event, sequenceLength, editorDragStarted);
          },
          onStop: editorDragStopped
        },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            {
              key: 'circViewSvgCenterText',
              className: 'veCircularViewMiddleOfVectorText',
              style: { width: innerRadius, textAlign: 'center' } },
            _react2.default.createElement(
              'span',
              null,
              sequenceName,
              ' '
            ),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              'span',
              null,
              sequenceLength + ' bps'
            )
          ),
          _react2.default.createElement(
            'svg',
            {
              key: 'circViewSvg',
              onClick: function onClick(event) {
                _this2.getNearestCursorPositionToMouseEvent(event, sequenceLength, editorClicked);
              },
              style: { overflow: 'visible' },
              width: width,
              height: height,
              ref: 'circularView',
              className: 'circularViewSvg',
              viewBox: '-' + radius * scale + ' -' + radius * scale + ' ' + radius * 2 * scale + ' ' + radius * 2 * scale
            },
            annotationsSvgs
          ),
          _react2.default.createElement(
            'div',
            { className: 'veCircularViewWarningContainer1' },
            paredDownOrfs && _react2.default.createElement(_VeWarning2.default, { message: 'Warning: More than ' + maxOrfsToDisplay + ' Open Reading Frames. Displaying only the largest ' + maxOrfsToDisplay }),
            paredDownCutsites && _react2.default.createElement(_VeWarning2.default, { message: 'Only the first ' + maxCutsitesToDisplay + ' cut sites will be displayed. Filter the display by cut site by selecting your desired Restriction Enzyme type ' }),
            paredDownFeatures && _react2.default.createElement(_VeWarning2.default, { message: 'Warning: More than ' + maxFeaturesToDisplay + ' Features. Displaying only the largest ' + maxFeaturesToDisplay }),
            paredDownPrimers && _react2.default.createElement(_VeWarning2.default, { message: 'Warning: More than ' + maxPrimersToDisplay + ' Primers. Displaying only the largest ' + maxPrimersToDisplay })
          )
        )
      )
    );
  };

  return CircularView;
}(_react2.default.Component);

exports.default = CircularView;


function pareDownAnnotations(annotations, max) {
  var annotationsToPass = annotations;
  var paredDown = false;
  if (Object.keys(annotations).length > max) {
    paredDown = true;
    var sortedAnnotations = (0, _sortBy2.default)(annotations, function (annotation) {
      return -(0, _getRangeLength2.default)(annotation);
    });
    annotationsToPass = sortedAnnotations.slice(0, max).reduce(function (obj, item) {
      obj[item.id] = item;
      return obj;
    }, {});
  }
  return [annotationsToPass, paredDown];
}

// function (messages) {
//   messages.forEach(function ([displayMessage, message]) {
//     displayMessage && 
//   })
// }

module.exports = exports['default'];