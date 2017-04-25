import drawCircularLabel2 from './drawCircularLabel2';
import map from 'lodash/map';
import randomcolor from 'randomcolor';
import drawDirectedPiePiece from './drawDirectedPiePiece';
import getRangeAngles from './getRangeAnglesSpecial';
import lruMemoize from 'lru-memoize';
import PositionAnnotationOnCircle from './PositionAnnotationOnCircle';
import React from 'react';

function DeletionLayers(props) {
  var radius = props.radius,
      sequenceLength = props.sequenceLength,
      _props$deletionLayers = props.deletionLayers,
      deletionLayers = _props$deletionLayers === undefined ? {} : _props$deletionLayers,
      annotationHeight = props.annotationHeight,
      deletionLayerClicked = props.deletionLayerClicked;

  if (!Object.keys(deletionLayers).length) return null;
  var height = 0;
  var component = React.createElement(
    'g',
    {
      key: 'veDeletionLayers',
      className: 'veDeletionLayers' },
    map(deletionLayers, function (deletionLayer, index) {
      if (!(deletionLayer.start > -1 && deletionLayer.end > -1 && sequenceLength > 0)) {
        return;
      }
      var radiusToUse = radius + annotationHeight / 2;
      height = annotationHeight;

      var _getRangeAngles = getRangeAngles(deletionLayer, sequenceLength),
          startAngle = _getRangeAngles.startAngle,
          endAngle = _getRangeAngles.endAngle,
          totalAngle = _getRangeAngles.totalAngle;

      var path = drawDirectedPiePiece({
        radius: radiusToUse,
        annotationHeight: annotationHeight,
        totalAngle: totalAngle,
        arrowheadLength: 0,
        tailThickness: 1 //deletionLayer specific
      });
      return React.createElement(
        'g',
        {
          onClick: function onClick(event) {
            deletionLayerClicked({ event: event, annotation: deletionLayer });
          },
          style: {
            cursor: 'pointer'
          },
          className: 'veDeletionLayerLabel',
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
            text: 'Deletion',
            id: deletionLayer.id
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
            className: 'veDeletionLayer'
            // strokeWidth=".5"
            // stroke={ 'black' }
            , fill: deletionLayer.color || randomcolor(),
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

export default lruMemoize(5, undefined, true)(DeletionLayers);