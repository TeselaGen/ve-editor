'use strict';

exports.__esModule = true;

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

var _randomcolor = require('randomcolor');

var _randomcolor2 = _interopRequireDefault(_randomcolor);

var _drawDirectedPiePiece = require('./drawDirectedPiePiece');

var _drawDirectedPiePiece2 = _interopRequireDefault(_drawDirectedPiePiece);

var _getRangeAnglesSpecial = require('./getRangeAnglesSpecial');

var _getRangeAnglesSpecial2 = _interopRequireDefault(_getRangeAnglesSpecial);

var _lruMemoize = require('lru-memoize');

var _lruMemoize2 = _interopRequireDefault(_lruMemoize);

var _PositionAnnotationOnCircle = require('./PositionAnnotationOnCircle');

var _PositionAnnotationOnCircle2 = _interopRequireDefault(_PositionAnnotationOnCircle);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function LineageLines(props) {
  var radius = props.radius,
      HoverHelper = props.HoverHelper,
      sequenceLength = props.sequenceLength,
      _props$lineageLines = props.lineageLines,
      lineageLines = _props$lineageLines === undefined ? [] : _props$lineageLines,
      annotationHeight = props.annotationHeight;

  var lineageLinesToUse = lineageLines;
  if (!Array.isArray(lineageLines)) {
    lineageLinesToUse = [lineageLines];
  }
  var height = 0;
  var component = _react2.default.createElement(
    'g',
    {
      key: 'veLineageLines',
      className: 'veLineageLines' },
    lineageLinesToUse.map(function (lineageLine, index) {
      if (!(lineageLine.start > -1 && lineageLine.end > -1 && sequenceLength > 0)) {
        return;
      }
      height = annotationHeight;

      var _getRangeAngles = (0, _getRangeAnglesSpecial2.default)(lineageLine, sequenceLength),
          startAngle = _getRangeAngles.startAngle,
          endAngle = _getRangeAngles.endAngle,
          totalAngle = _getRangeAngles.totalAngle;

      var path = (0, _drawDirectedPiePiece2.default)({
        radius: radius + annotationHeight / 2,
        annotationHeight: annotationHeight,
        totalAngle: totalAngle,
        arrowheadLength: 0,
        tailThickness: 1 //lineageLine specific
      });
      return _react2.default.createElement(
        HoverHelper,
        {
          id: lineageLine.id,
          passJustOnMouseOverAndClassname: true,
          key: 'lineageLine' + index
        },
        function (_ref) {
          var hovered = _ref.hovered;

          var colorToUse = hovered ? (0, _color2.default)(lineageLine.color).lighten(.1).hex() : lineageLine.color;
          return _react2.default.createElement(
            _PositionAnnotationOnCircle2.default,
            {
              sAngle: startAngle,
              eAngle: endAngle,
              forward: true },
            _react2.default.createElement('path', {
              className: 'veLineageLine',
              strokeWidth: hovered ? 1.5 : 0,
              stroke: colorToUse,
              fill: colorToUse || (0, _randomcolor2.default)(),
              d: path.print()
            })
          );
        }
      );
    }).filter(function (el) {
      return el;
    })
  );
  return {
    component: component,
    height: height
  };
}

exports.default = (0, _lruMemoize2.default)(5, undefined, true)(LineageLines);
module.exports = exports['default'];