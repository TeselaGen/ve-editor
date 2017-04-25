'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// import relaxLabels from './relaxLabels';


var _polarToSpecialCartesian = require('../utils/polarToSpecialCartesian');

var _polarToSpecialCartesian2 = _interopRequireDefault(_polarToSpecialCartesian);

var _relaxLabelAngles = require('./relaxLabelAngles');

var _relaxLabelAngles2 = _interopRequireDefault(_relaxLabelAngles);

var _deepEqual = require('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

require('./style.css');

var _lruMemoize = require('lru-memoize');

var _lruMemoize2 = _interopRequireDefault(_lruMemoize);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function getHeightAndWidthOfLabel(text, fontWidth, fontHeight) {
  return {
    height: fontHeight,
    width: text.length * fontWidth
  };
}

function Labels(_ref) {
  var _ref$labels = _ref.labels,
      labels = _ref$labels === undefined ? {} : _ref$labels,
      HoverHelper = _ref.HoverHelper,
      outerRadius = _ref.outerRadius,
      _ref$condenseOverflow = _ref.condenseOverflowingXLabels,
      condenseOverflowingXLabels = _ref$condenseOverflow === undefined ? true : _ref$condenseOverflow;

  outerRadius += 25;
  var radius = outerRadius;
  var outerPointRadius = outerRadius - 35;

  var fontWidth = 8;
  var fontHeight = fontWidth * 1.5;

  var labelPoints = Object.keys(labels).map(function (key) {
    var label = labels[key];
    var annotationCenterAngle = label.annotationCenterAngle,
        annotationCenterRadius = label.annotationCenterRadius;


    return _extends({}, label, getHeightAndWidthOfLabel(label.text, fontWidth, fontHeight), {
      //three points define the label:
      innerPoint: _extends({}, (0, _polarToSpecialCartesian2.default)(annotationCenterRadius, annotationCenterAngle), {
        radius: annotationCenterRadius,
        angle: annotationCenterAngle
      }),
      outerPoint: _extends({}, (0, _polarToSpecialCartesian2.default)(outerPointRadius, annotationCenterAngle), {
        radius: outerPointRadius,
        angle: annotationCenterAngle
      })
    }, (0, _polarToSpecialCartesian2.default)(radius, annotationCenterAngle), {
      radius: radius + 10,
      angle: annotationCenterAngle
    });
  }).map(function (label) {
    label.labelAndSublabels = [label];
    return label;
  });

  var groupedLabels = (0, _relaxLabelAngles2.default)(labelPoints, fontHeight, outerRadius);
  return { component: _react2.default.createElement(
      'g',
      {
        key: 'veLabels',
        className: 'veLabels monospaceFont' },
      groupedLabels.map(function (label, index) {
        return LabelGroup({
          label: label,
          labelAndSublabels: label.labelAndSublabels,
          key: index,
          fontWidth: fontWidth,
          fontHeight: fontHeight,
          HoverHelper: HoverHelper,
          condenseOverflowingXLabels: condenseOverflowingXLabels,
          outerRadius: outerRadius
        });
      })
      //we use the <use> tag to position the hovered label group at the top of the stack
      //point events: none is to fix a click bug..
      //http://stackoverflow.com/questions/24078524/svg-click-events-not-firing-bubbling-when-using-use-element
      ,
      _react2.default.createElement('use', { style: { pointerEvents: 'none' }, xlinkHref: '#topLevelHomie' })
    ),
    height: 120
  };
}
exports.default = (0, _lruMemoize2.default)(5, _deepEqual2.default)(Labels);


function LabelGroup(_ref2) {
  var label = _ref2.label,
      HoverHelper = _ref2.HoverHelper,
      key = _ref2.key,
      rest = _objectWithoutProperties(_ref2, ['label', 'HoverHelper', 'key']);

  var labelAndSublabels = label.labelAndSublabels;

  var labelIds = {};
  labelAndSublabels.forEach(function (label) {
    labelIds[label.id] = true;
  });
  var multipleLabels = labelAndSublabels.length > 1;
  return (
    //wrap the entire label group in a HoverHelper
    _react2.default.createElement(
      HoverHelper,
      {
        mouseAware: true,
        key: key,
        id: labelIds },
      _react2.default.createElement(DrawLabelGroup, _extends({
        key: key
      }, _extends({ label: label, HoverHelper: HoverHelper }, rest, { className: 'DrawLabelGroup', multipleLabels: multipleLabels, labelAndSublabels: labelAndSublabels, labelIds: labelIds })))
    )
  );
}

function DrawLabelGroup(props) {
  var label = props.label,
      labelAndSublabels = props.labelAndSublabels,
      HoverHelper = props.HoverHelper,
      fontWidth = props.fontWidth,
      fontHeight = props.fontHeight,
      outerRadius = props.outerRadius,
      condenseOverflowingXLabels = props.condenseOverflowingXLabels,
      hoveredId = props.hoveredId,
      labelIds = props.labelIds,
      multipleLabels = props.multipleLabels,
      hovered = props.hovered,
      isIdHashmap = props.isIdHashmap,
      rest = _objectWithoutProperties(props, ['label', 'labelAndSublabels', 'HoverHelper', 'fontWidth', 'fontHeight', 'outerRadius', 'condenseOverflowingXLabels', 'hoveredId', 'labelIds', 'multipleLabels', 'hovered', 'isIdHashmap']);

  var text = label.text;

  var groupLabelXStart;

  //Add the number of unshown labels
  if (label.labelAndSublabels && label.labelAndSublabels.length > 1) {
    // if (label.x > 0) {
    text = '+' + (label.labelAndSublabels.length - 1) + ',' + text;
    // } else {
    //   text += ', +' + (label.labelAndSublabels.length - 1)
    // }
  }

  var labelLength = text.length * fontWidth;
  var maxLabelLength = labelAndSublabels.reduce(function (currentLength, _ref3) {
    var text = _ref3.text;

    if (text.length > currentLength) {
      return text.length;
    }
    return currentLength;
  }, 0);

  var maxLabelWidth = maxLabelLength * fontWidth;
  var labelOnLeft = label.x < 0;
  var labelXStart = label.x - (labelOnLeft ? labelLength : 0);
  //we're on the left side of the circle
  if (condenseOverflowingXLabels) {
    var distancePastBoundary = Math.abs(label.x + (labelOnLeft ? -labelLength : labelLength)) - (outerRadius + 90);
    if (distancePastBoundary > 0) {
      var numberOfCharsToChop = Math.ceil(distancePastBoundary / fontWidth) + 3;
      //   if (numberOfCharsToChop > text.length) numberOfCharsToChop = text.length
      //label overflows the boundaries!
      text = text.slice(0, -numberOfCharsToChop) + '...';
      groupLabelXStart = labelXStart + (labelOnLeft ? distancePastBoundary : -distancePastBoundary);
      labelXStart += labelOnLeft ? distancePastBoundary : 0;
    }
  }
  var dy = 20;
  var textYStart = label.y + dy / 2;

  //if label xStart or label xEnd don't fit within the canvas, we need to shorten the label..

  var content;
  var labelClass = "velabelText veCircularViewLabelText clickable ";

  if ((multipleLabels || groupLabelXStart !== undefined) && hovered) {
    //HOVERED: DRAW MULTIPLE LABELS IN A RECTANGLE
    var hoveredLabel;
    if (groupLabelXStart !== undefined) {
      labelXStart = groupLabelXStart;
    }
    labelAndSublabels.some(function (label) {
      if (label.id === hoveredId) {
        hoveredLabel = label;
        return true;
      }
    });
    if (!hoveredLabel) {
      hoveredLabel = label;
    }
    var labelYStart = label.y;

    var labelGroupHeight = labelAndSublabels.length * dy;
    var labelGroupBottom = label.y + labelGroupHeight;
    // var numberOfLabelsToFitAbove = 0
    if (labelGroupBottom > outerRadius + 10) {
      // var diff = labelGroupBottom - (outerRadius+10)
      //calculate new label y start if necessary (the group is too long)
      labelYStart -= (label.labelAndSublabels.length - 1) * dy;
      if (labelYStart < -outerRadius) {
        //we need to make another row of labels!

      }
    }

    var line = LabelLine([hoveredLabel.innerPoint, hoveredLabel.labelAndSublabels && hoveredLabel.labelAndSublabels.length > 0 ? hoveredLabel.outerPoint : {}, label], { style: { opacity: 1 } });
    content = [line, _react2.default.createElement(
      'g',
      { id: 'topLevelHomie', key: 'gGroup' },
      _react2.default.createElement('rect', {
        x: labelXStart - 4,
        y: labelYStart - dy / 2,
        width: maxLabelWidth + 10,
        height: labelGroupHeight + 4,
        fill: 'white',
        stroke: 'black'
      }),
      _react2.default.createElement(
        'text',
        {
          x: labelXStart,
          y: labelYStart,
          style: {} },
        labelAndSublabels.map(function (label, index) {
          return _react2.default.createElement(
            HoverHelper,
            {
              key: 'labelItem' + index,
              doNotTriggerOnMouseOut: true,
              id: label.id,
              passJustOnMouseOverAndClassname: true
            },
            _react2.default.createElement(
              'tspan',
              {
                x: labelXStart,
                textLength: label.text.length * fontWidth,
                lengthAdjust: 'spacing',
                onClick: label.onClick,
                dy: index === 0 ? dy / 2 : dy,
                style: { fill: label.color ? label.color : 'black' },
                className: labelClass + label.className },
              label.text
            )
          );
        })
      )
    )];
  } else {
    //DRAW A SINGLE LABEL
    content = [_react2.default.createElement(
      'title',
      { key: 'labeltitle' },
      label.text
    ), _react2.default.createElement(
      'text',
      {
        key: 'text',
        x: labelXStart,
        textLength: text.length * fontWidth,
        lengthAdjust: 'spacing',
        className: labelClass + label.className + (hovered ? ' veAnnotationHovered' : ''),
        y: textYStart,
        style: { fill: label.color ? label.color : 'black' } },
      text
    ), LabelLine([label.innerPoint, label.outerPoint, label], hovered ? { style: { opacity: 1 } } : {})];
  }
  return _react2.default.createElement(
    'g',
    _extends({}, rest, { onClick: label.onClick }),
    content
  );
}

function LabelLine(pointArray, options) {
  var points = '';
  pointArray.forEach(function (_ref4) {
    var x = _ref4.x,
        y = _ref4.y;

    if (!x) return;
    points += x + ',' + y + ' ';
  });
  return _react2.default.createElement('polyline', _extends({
    key: 'polyline',
    points: points,
    stroke: 'black',
    fill: 'none',
    strokeWidth: 1,
    style: {
      opacity: .4
    },
    className: 'veLabelLine'
  }, options));
}
module.exports = exports['default'];