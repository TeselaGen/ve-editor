'use strict';

exports.__esModule = true;

var _lruMemoize = require('lru-memoize');

var _lruMemoize2 = _interopRequireDefault(_lruMemoize);

var _getAngleForPositionMidpoint = require('./getAngleForPositionMidpoint');

var _getAngleForPositionMidpoint2 = _interopRequireDefault(_getAngleForPositionMidpoint);

var _PositionAnnotationOnCircle = require('./PositionAnnotationOnCircle');

var _PositionAnnotationOnCircle2 = _interopRequireDefault(_PositionAnnotationOnCircle);

var _shouldFlipText = require('./shouldFlipText');

var _shouldFlipText2 = _interopRequireDefault(_shouldFlipText);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _calculateTickMarkPositionsForGivenRange = require('../utils/calculateTickMarkPositionsForGivenRange');

var _calculateTickMarkPositionsForGivenRange2 = _interopRequireDefault(_calculateTickMarkPositionsForGivenRange);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Axis(_ref) {
  var radius = _ref.radius,
      sequenceLength = _ref.sequenceLength,
      showAxisNumbers = _ref.showAxisNumbers,
      circularAndLinearTickSpacing = _ref.circularAndLinearTickSpacing,
      _ref$tickMarkHeight = _ref.tickMarkHeight,
      tickMarkHeight = _ref$tickMarkHeight === undefined ? 10 : _ref$tickMarkHeight,
      _ref$tickMarkWidth = _ref.tickMarkWidth,
      tickMarkWidth = _ref$tickMarkWidth === undefined ? 1 : _ref$tickMarkWidth,
      _ref$textOffset = _ref.textOffset,
      textOffset = _ref$textOffset === undefined ? 20 : _ref$textOffset,
      _ref$ringThickness = _ref.ringThickness,
      ringThickness = _ref$ringThickness === undefined ? 6 : _ref$ringThickness;

  var height = ringThickness + (showAxisNumbers ? textOffset + tickMarkHeight : 0);
  // var radius = radius + height
  var tickPositions = (0, _calculateTickMarkPositionsForGivenRange2.default)({
    range: {
      start: 0,
      end: sequenceLength
    },
    tickSpacing: circularAndLinearTickSpacing,
    sequenceLength: sequenceLength
  });

  var tickMarksAndLabels = showAxisNumbers ? tickPositions.map(function (tickPosition, index) {
    var tickAngle = (0, _getAngleForPositionMidpoint2.default)(tickPosition, sequenceLength);
    return _react2.default.createElement(
      _PositionAnnotationOnCircle2.default,
      {
        key: 'axis' + index,
        sAngle: tickAngle,
        eAngle: tickAngle,
        height: radius },
      _react2.default.createElement(
        'text',
        {
          transform: ((0, _shouldFlipText2.default)(tickAngle) ? 'rotate(180)' : '') + (' translate(0, ' + ((0, _shouldFlipText2.default)(tickAngle) ? -textOffset : textOffset) + ')'),
          style: { textAnchor: "middle", dominantBaseline: "central", fontSize: 'small' } },
        tickPosition + 1
      ),
      _react2.default.createElement('rect', {
        width: tickMarkWidth,
        height: tickMarkHeight })
    );
  }) : '';
  var component = _react2.default.createElement(
    'g',
    {
      key: 'veAxis',
      className: 'veAxis' },
    _react2.default.createElement('circle', {
      className: 'veAxisFill',
      id: 'circularViewAxis',
      key: 'circleOuter',
      r: radius + ringThickness,
      style: { fill: '#FFFFB3', stroke: 'black', strokeWidth: .5 } }),
    _react2.default.createElement('circle', {
      id: 'circularViewAxis',
      key: 'circle',
      r: radius,
      style: { fill: 'white', stroke: 'black', strokeWidth: .5 } }),
    tickMarksAndLabels
  );
  return {
    component: component,
    height: height
  };
}

exports.default = (0, _lruMemoize2.default)(5, undefined, true)(Axis);
module.exports = exports['default'];