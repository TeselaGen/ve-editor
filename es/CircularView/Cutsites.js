import getRangeAngles from './getRangeAnglesSpecial';
import lruMemoize from 'lru-memoize';
import PositionAnnotationOnCircle from './PositionAnnotationOnCircle';
import React from 'react';
import each from 'lodash/each';
function Cutsites(_ref) {
  var radius = _ref.radius,
      HoverHelper = _ref.HoverHelper,
      cutsiteClicked = _ref.cutsiteClicked,
      cutsites = _ref.cutsites,
      _ref$cutsiteWidth = _ref.cutsiteWidth,
      cutsiteWidth = _ref$cutsiteWidth === undefined ? 1 : _ref$cutsiteWidth,
      _ref$annotationHeight = _ref.annotationHeight,
      annotationHeight = _ref$annotationHeight === undefined ? 15 : _ref$annotationHeight,
      sequenceLength = _ref.sequenceLength;

  radius += annotationHeight;
  var svgGroup = [];
  var labels = {};
  var index = 0;
  each(cutsites, function (annotation, key) {
    index++;
    function onClick(event) {
      cutsiteClicked({ event: event, annotation: annotation });
      event.stopPropagation();
    }
    if (!(annotation.topSnipPosition > -1)) {
      debugger; //we need this to be present 
    }

    var _getRangeAngles = getRangeAngles({ start: annotation.topSnipPosition, end: annotation.topSnipPosition }, sequenceLength),
        startAngle = _getRangeAngles.startAngle;
    //expand the end angle if annotation spans the origin


    labels[annotation.id] = {
      annotationCenterAngle: startAngle,
      annotationCenterRadius: radius,
      text: annotation.restrictionEnzyme.name,
      color: annotation.restrictionEnzyme.color,
      className: ' veCutsiteLabel',
      id: annotation.id,
      onClick: onClick
    };
    if (!annotation.id) debugger;

    svgGroup.push(React.createElement(
      HoverHelper,
      {
        id: annotation.id,
        key: 'cutsite' + index,
        passJustOnMouseOverAndClassname: true
      },
      React.createElement(
        PositionAnnotationOnCircle,
        {
          className: 'cutsiteDrawing',
          sAngle: startAngle,
          eAngle: startAngle,
          height: radius
        },
        React.createElement('rect', {
          width: cutsiteWidth,
          height: annotationHeight })
      )
    ));
  });
  return {
    height: annotationHeight,
    labels: labels,
    component: React.createElement(
      'g',
      { key: 'cutsites', className: 'cutsites' },
      svgGroup
    ) };
}

export default lruMemoize(5, undefined, true)(Cutsites);