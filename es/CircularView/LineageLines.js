import color from 'color';
import randomcolor from 'randomcolor';
import drawDirectedPiePiece from './drawDirectedPiePiece';
import getRangeAngles from './getRangeAnglesSpecial';
import lruMemoize from 'lru-memoize';
import PositionAnnotationOnCircle from './PositionAnnotationOnCircle';
import React from 'react';

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
  var component = React.createElement(
    'g',
    {
      key: 'veLineageLines',
      className: 'veLineageLines' },
    lineageLinesToUse.map(function (lineageLine, index) {
      if (!(lineageLine.start > -1 && lineageLine.end > -1 && sequenceLength > 0)) {
        return;
      }
      height = annotationHeight;

      var _getRangeAngles = getRangeAngles(lineageLine, sequenceLength),
          startAngle = _getRangeAngles.startAngle,
          endAngle = _getRangeAngles.endAngle,
          totalAngle = _getRangeAngles.totalAngle;

      var path = drawDirectedPiePiece({
        radius: radius + annotationHeight / 2,
        annotationHeight: annotationHeight,
        totalAngle: totalAngle,
        arrowheadLength: 0,
        tailThickness: 1 //lineageLine specific
      });
      return React.createElement(
        HoverHelper,
        {
          id: lineageLine.id,
          passJustOnMouseOverAndClassname: true,
          key: 'lineageLine' + index
        },
        function (_ref) {
          var hovered = _ref.hovered;

          var colorToUse = hovered ? color(lineageLine.color).lighten(.1).hex() : lineageLine.color;
          return React.createElement(
            PositionAnnotationOnCircle,
            {
              sAngle: startAngle,
              eAngle: endAngle,
              forward: true },
            React.createElement('path', {
              className: 'veLineageLine',
              strokeWidth: hovered ? 1.5 : 0,
              stroke: colorToUse,
              fill: colorToUse || randomcolor(),
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

export default lruMemoize(5, undefined, true)(LineageLines);