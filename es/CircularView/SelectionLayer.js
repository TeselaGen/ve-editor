import Caret from './Caret';
import sector from 'paths-js/sector';
import getRangeAngles from './getRangeAnglesSpecial';
import lruMemoize from 'lru-memoize';
import PositionAnnotationOnCircle from './PositionAnnotationOnCircle';
import PropTypes from 'prop-types';
import React from 'react';
import draggableClassnames from '../constants/draggableClassnames';

function SelectionLayer(_ref) {
    var selectionLayer = _ref.selectionLayer,
        sequenceLength = _ref.sequenceLength,
        radius = _ref.radius,
        innerRadius = _ref.innerRadius,
        index = _ref.index;
    var color = selectionLayer.color,
        start = selectionLayer.start,
        end = selectionLayer.end,
        _selectionLayer$showC = selectionLayer.showCaret,
        showCaret = _selectionLayer$showC === undefined ? false : _selectionLayer$showC;

    var _getRangeAngles = getRangeAngles(selectionLayer, sequenceLength),
        startAngle = _getRangeAngles.startAngle,
        endAngle = _getRangeAngles.endAngle,
        totalAngle = _getRangeAngles.totalAngle;

    var section = sector({
        center: [0, 0], //the center is always 0,0 for our annotations :) we rotate later!
        r: innerRadius,
        R: radius,
        start: 0,
        end: totalAngle
    });

    var section2 = sector({
        center: [0, 0], //the center is always 0,0 for our annotations :) we rotate later!
        r: innerRadius,
        R: radius,
        start: 0,
        end: Math.PI * 2 - totalAngle
    });

    return React.createElement(
        'g',
        { key: 'veSelectionLayer' + index, className: 'veSelectionLayer' },
        React.createElement(
            PositionAnnotationOnCircle,
            {
                className: 'selectionLayerWrapper',
                sAngle: startAngle,
                eAngle: endAngle,
                height: 0 },
            React.createElement('path', {
                className: 'selectionLayer',
                style: { opacity: .3 },
                d: section.path.print(),
                fill: color || "rgb(0, 153, 255)" })
        ),
        React.createElement(
            PositionAnnotationOnCircle,
            {
                className: 'selectionLayerInverseWrapper',
                sAngle: endAngle,
                eAngle: startAngle,
                height: 0 },
            React.createElement('path', {
                className: 'selectionLayerInverse',
                style: { opacity: .2 },
                d: section2.path.print(),
                fill: color || "red" })
        ),
        !showCaret && React.createElement(Caret, {
            key: 'caret1',
            className: 'selectionLayerCaret ' + draggableClassnames.selectionStart,
            caretPosition: start,
            sequenceLength: sequenceLength,
            innerRadius: innerRadius,
            outerRadius: radius
        }),
        !showCaret && React.createElement(Caret, {
            key: 'caret2',
            className: 'selectionLayerCaret ' + draggableClassnames.selectionEnd,
            caretPosition: end + 1,
            sequenceLength: sequenceLength,
            innerRadius: innerRadius,
            outerRadius: radius
        })
    );
}

export default lruMemoize(5, undefined, true)(SelectionLayer);