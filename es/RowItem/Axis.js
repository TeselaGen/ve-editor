import normalizePositionByRangeLength from 've-range-utils/normalizePositionByRangeLength';
import getXStartAndWidthOfRangeWrtRow from './getXStartAndWidthOfRangeWrtRow';
import PropTypes from 'prop-types';
import React from 'react';
import calculateTickMarkPositionsForGivenRange from '../utils/calculateTickMarkPositionsForGivenRange';
import getXCenterOfRowAnnotation from './getXCenterOfRowAnnotation';

var Axis = function Axis(props) {
    var row = props.row,
        tickSpacing = props.tickSpacing,
        bpsPerRow = props.bpsPerRow,
        charWidth = props.charWidth,
        annotationHeight = props.annotationHeight,
        sequenceLength = props.sequenceLength;

    if (row.start === 0 && row.end === 0) {
        return null;
    }

    var _getXStartAndWidthOfR = getXStartAndWidthOfRangeWrtRow(row, row, bpsPerRow, charWidth, sequenceLength),
        xStart = _getXStartAndWidthOfR.xStart,
        width = _getXStartAndWidthOfR.width;
    //this function should take in a desired tickSpacing (eg 10 bps between tick mark)
    //and output an array of tickMarkPositions for the given row (eg, [0, 10, 20])


    var xEnd = xStart + width;

    var yStart = 0;
    var tickMarkPositions = calculateTickMarkPositionsForGivenRange({ tickSpacing: tickSpacing, range: row, sequenceLength: sequenceLength });
    var tickMarkSVG = [];

    tickMarkPositions.forEach(function (tickMarkPosition) {
        // var xCenter = getXCenterOfRowAnnotation({
        //     start: tickMarkPosition,
        //     end: tickMarkPosition
        // }, row, bpsPerRow, charWidth, sequenceLength);
        var xCenter = tickMarkPosition * charWidth + charWidth / 2;
        var yStart = 0;
        var yEnd = annotationHeight / 3;
        tickMarkSVG.push(React.createElement('path', {
            key: 'axisTickMark ' + row.rowNumber + ' ' + tickMarkPosition,
            d: "M" + xCenter + "," + yStart + " L" + xCenter + "," + yEnd,
            stroke: 'black' }));
        tickMarkSVG.push(React.createElement(
            'text',
            {
                key: 'axisTickMarkText ' + row.rowNumber + ' ' + tickMarkPosition,
                stroke: 'black',
                x: xCenter,
                y: annotationHeight,
                style: { "textAnchor": "middle", "fontSize": 10, "fontFamily": "Verdana" }
            },
            normalizePositionByRangeLength(row.start + tickMarkPosition, sequenceLength) + 1
        ));
    });

    return React.createElement(
        'svg',
        { className: 'veRowViewAxis veAxis', width: '100%', height: annotationHeight * 1.2 },
        tickMarkSVG,
        React.createElement('path', {
            key: 'axis ' + row.rowNumber,
            d: "M" + xStart + "," + yStart + " L" + xEnd + "," + yStart,
            stroke: 'black' })
    );
};

export default Axis;