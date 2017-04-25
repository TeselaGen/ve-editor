import normalizeRange from 've-range-utils/normalizeRange';
import drawCircularLabel2 from './drawCircularLabel2';
import map from 'lodash/map';
import randomcolor from 'randomcolor';
import drawDirectedPiePiece from './drawDirectedPiePiece';
import getRangeAngles from './getRangeAnglesSpecial';
import lruMemoize from 'lru-memoize';
import PositionAnnotationOnCircle from './PositionAnnotationOnCircle';
import React from 'react';

function ReplacementLayers(props) {
  var radius = props.radius,
      sequenceLength = props.sequenceLength,
      _props$replacementLay = props.replacementLayers,
      replacementLayers = _props$replacementLay === undefined ? {} : _props$replacementLay,
      annotationHeight = props.annotationHeight,
      replacementLayerClicked = props.replacementLayerClicked;

  if (!Object.keys(replacementLayers).length) return null;
  var height = 0;
  var component = React.createElement(
    'g',
    {
      key: 'veReplacementLayers',
      className: 'veReplacementLayers' },
    map(replacementLayers, function (replacementLayer, index) {
      var insertingAtCaret = !!(replacementLayer.caretPosition > -1);
      if (!insertingAtCaret && !(replacementLayer.start > -1 && replacementLayer.end > -1 && sequenceLength > 0)) {
        return;
      }
      var radiusToUse = radius + annotationHeight / 2;
      height = annotationHeight;

      var _getRangeAngles = getRangeAngles(insertingAtCaret ? normalizeRange({ start: replacementLayer.caretPosition, end: replacementLayer.caretPosition }, sequenceLength) : replacementLayer, sequenceLength),
          startAngle = _getRangeAngles.startAngle,
          endAngle = _getRangeAngles.endAngle,
          totalAngle = _getRangeAngles.totalAngle;

      var path = drawDirectedPiePiece({
        radius: radiusToUse,
        annotationHeight: annotationHeight,
        totalAngle: totalAngle,
        arrowheadLength: 0,
        tailThickness: 1 //replacementLayer specific
      });
      return React.createElement(
        'g',
        {
          onClick: function onClick(event) {
            replacementLayerClicked({ event: event, annotation: replacementLayer });
          },
          style: {
            cursor: 'pointer'
          },
          className: 'veReplacementLayerLabel',
          key: 'inlineLabel' + index
        },
        React.createElement(
          PositionAnnotationOnCircle,
          {
            key: 'item1',
            sAngle: startAngle + Math.PI //add PI because drawCircularLabel is drawing 180
            , eAngle: startAngle + Math.PI
          },
          drawCircularLabel2({
            centerAngle: startAngle, //used to flip label if necessary
            radius: radiusToUse + annotationHeight,
            fontSize: '20px',
            height: annotationHeight,
            text: insertingAtCaret ? 'Insertion' : 'Replacement',
            id: replacementLayer.id
          })
        ),
        React.createElement(
          PositionAnnotationOnCircle,
          {
            key: 'item2',
            sAngle: startAngle,
            eAngle: endAngle,
            forward: true },
          React.createElement('path', {
            className: 'veReplacementLayer'
            // strokeWidth=".5"
            // stroke={ 'black' }
            , fill: replacementLayer.color || randomcolor(),
            d: path.print()
          })
        )
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

export default lruMemoize(5, undefined, true)(ReplacementLayers);