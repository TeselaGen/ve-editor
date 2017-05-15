import classnames from 'classnames';
import AnnotationPositioner from '../AnnotationPositioner';
import AnnotationContainerHolder from '../AnnotationContainerHolder';
import React from 'react';

import './style.css';

import getXStartAndWidthOfRangeWrtRow from '../getXStartAndWidthOfRangeWrtRow';
import getOverlapsOfPotentiallyCircularRanges from 've-range-utils/getOverlapsOfPotentiallyCircularRanges';

function LineageLines(props) {
    var charWidth = props.charWidth,
        bpsPerRow = props.bpsPerRow,
        row = props.row,
        sequenceLength = props.sequenceLength,
        _props$lineageLines = props.lineageLines,
        lineageLines = _props$lineageLines === undefined ? [] : _props$lineageLines,
        _props$lineageLineHei = props.lineageLineHeight,
        lineageLineHeight = _props$lineageLineHei === undefined ? 6 : _props$lineageLineHei;


    var lineageLinesToUse = lineageLines;
    if (!Array.isArray(lineageLines)) {
        lineageLinesToUse = [lineageLines];
    }
    return React.createElement(
        AnnotationContainerHolder,
        {
            className: 'veRowViewLineageLines',
            containerHeight: lineageLineHeight },
        lineageLinesToUse.sort(function (lineageLine) {
            return lineageLine.inBetweenBps ? 1 : 0;
        }).map(function (lineageLine, index) {
            var rangeSpansSequence = lineageLine.start === lineageLine.end + 1 || lineageLine.start === 0 && lineageLine.end === sequenceLength - 1;
            var _lineageLine$classNam = lineageLine.className,
                className = _lineageLine$classNam === undefined ? '' : _lineageLine$classNam,
                _lineageLine$style = lineageLine.style,
                style = _lineageLine$style === undefined ? {} : _lineageLine$style,
                color = lineageLine.color;

            var overlaps = getOverlapsOfPotentiallyCircularRanges(lineageLine, row, sequenceLength);
            return overlaps.map(function (overlap, index2) {
                var _getXStartAndWidthOfR = getXStartAndWidthOfRangeWrtRow(overlap, row, bpsPerRow, charWidth, sequenceLength),
                    xStart = _getXStartAndWidthOfR.xStart,
                    width = _getXStartAndWidthOfR.width;

                var lineageStart = overlap.start === lineageLine.start;
                var lineageEnd = overlap.end === lineageLine.end;

                return [React.createElement(
                    AnnotationPositioner,
                    {
                        height: lineageLineHeight,
                        width: width,
                        key: index,
                        top: 0
                        // className={classnames() } 
                        , left: xStart + (lineageLine.inBetweenBps ? charWidth / 1.2 : 0)
                    },
                    React.createElement(
                        'g',
                        null,
                        React.createElement('rect', { fill: color, x: '0', y: '0', height: lineageLineHeight, width: width }),
                        rangeSpansSequence && lineageStart && React.createElement('rect', { fill: '#408CE1', x: '0', y: '0', height: lineageLineHeight, width: 4 }),
                        rangeSpansSequence && lineageEnd && React.createElement('rect', { fill: '#408CE1', x: width - 4, y: '0', height: lineageLineHeight, width: 4 })
                    )
                )];
            });
        })
    );
}

export default LineageLines;