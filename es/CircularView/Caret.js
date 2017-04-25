import isNumber from 'lodash/isNumber';
import getRangeAngles from 've-range-utils/getRangeAngles';
import lruMemoize from 'lru-memoize';
import PositionAnnotationOnCircle from './PositionAnnotationOnCircle';
import React, { PropTypes } from 'react';
import draggableClassnames from '../constants/draggableClassnames';

function Caret(_ref) {
    var caretPosition = _ref.caretPosition,
        sequenceLength = _ref.sequenceLength,
        className = _ref.className,
        innerRadius = _ref.innerRadius,
        outerRadius = _ref.outerRadius;

    var _getRangeAngles = getRangeAngles({ start: caretPosition, end: caretPosition }, sequenceLength),
        startAngle = _getRangeAngles.startAngle,
        endAngle = _getRangeAngles.endAngle;

    if (!isNumber(startAngle)) {
        console.error("we've got a problem!");
    }
    return React.createElement(
        PositionAnnotationOnCircle,
        {
            key: 'caret',
            className: className + ' ' + draggableClassnames.caret,
            sAngle: startAngle,
            eAngle: endAngle,
            height: 0 },
        React.createElement('line', {
            className: className,
            strokeWidth: '2px',
            style: { opacity: 9, zIndex: 100, cursor: "ew-resize" } //tnr: the classname needs to be cursor here!
            , x1: 0,
            y1: -innerRadius,
            x2: 0,
            y2: -outerRadius,
            stroke: 'black' })
    );
}

export default lruMemoize(5, undefined, true)(Caret);