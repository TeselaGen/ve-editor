import lruMemoize from 'lru-memoize';
import getAngleForPositionMidpoint from './getAngleForPositionMidpoint';
import PositionAnnotationOnCircle from './PositionAnnotationOnCircle';
import shouldFlipText from './shouldFlipText';
import React from 'react';
import calculateTickMarkPositionsForGivenRange from '../utils/calculateTickMarkPositionsForGivenRange';

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
  var tickPositions = calculateTickMarkPositionsForGivenRange({
    range: {
      start: 0,
      end: sequenceLength
    },
    tickSpacing: circularAndLinearTickSpacing,
    sequenceLength: sequenceLength
  });

  var tickMarksAndLabels = showAxisNumbers ? tickPositions.map(function (tickPosition, index) {
    var tickAngle = getAngleForPositionMidpoint(tickPosition, sequenceLength);
    return React.createElement(
      PositionAnnotationOnCircle,
      {
        key: 'axis' + index,
        sAngle: tickAngle,
        eAngle: tickAngle,
        height: radius },
      React.createElement(
        'text',
        {
          transform: (shouldFlipText(tickAngle) ? 'rotate(180)' : '') + (' translate(0, ' + (shouldFlipText(tickAngle) ? -textOffset : textOffset) + ')'),
          style: { textAnchor: "middle", dominantBaseline: "central", fontSize: 'small' } },
        tickPosition + 1
      ),
      React.createElement('rect', {
        width: tickMarkWidth,
        height: tickMarkHeight })
    );
  }) : '';
  var component = React.createElement(
    'g',
    {
      key: 'veAxis',
      className: 'veAxis' },
    React.createElement('circle', {
      className: 'veAxisFill',
      id: 'circularViewAxis',
      key: 'circleOuter',
      r: radius + ringThickness,
      style: { fill: '#FFFFB3', stroke: 'black', strokeWidth: .5 } }),
    React.createElement('circle', {
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

export default lruMemoize(5, undefined, true)(Axis);