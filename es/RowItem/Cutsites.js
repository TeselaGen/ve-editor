var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import isPositionWithinRange from 've-range-utils/isPositionWithinRange';
import norm from 've-range-utils/normalizePositionByRangeLength';
import assign from 'lodash/assign';
import PropTypes from 'prop-types';
import React from 'react';
import areNonNegativeIntegers from 'validate.io-nonnegative-integer-array';
import getOverlapsOfPotentiallyCircularRanges from 've-range-utils/getOverlapsOfPotentiallyCircularRanges';
import getXStartAndWidthOfRangeWrtRow from './getXStartAndWidthOfRangeWrtRow';
var snipStyle = {
    height: "111%",
    // background: 'black',
    position: "absolute",
    top: 3,
    width: "2px"
};
var snipConnectorStyle = {
    height: "2px",
    // background: 'black',
    position: "absolute",
    top: 3
};

// var cursor = getCursorForRow(caretPosition, row, bpsPerRow, snipStyle, charWidth, true);

function getSnipForRow(snipPosition, row, sequenceLength, bpsPerRow, snipStyle, charWidth, index) {
    if (!isPositionWithinRange(snipPosition, row)) return;

    var _getXStartAndWidthOfR = getXStartAndWidthOfRangeWrtRow({ start: snipPosition, end: snipPosition }, row, bpsPerRow, charWidth, sequenceLength),
        xStart = _getXStartAndWidthOfR.xStart;
    //TODO: refactor this get position in row into a helper function!
    //it is used here and in the caret position calculations!
    // if (row.start <= snipPosition && row.end + 1 >= snipPosition 
    //     || (row.end === sequenceLength - 1 && row.end < snipPosition) //catch the special case where we're at the very end of the sequence..
    //     ) {

    // }

    var newCursorStyle = assign({}, snipStyle, {
        left: xStart
    });
    var cursorEl = React.createElement('div', { key: index, className: 'veRowViewCutsite snip', style: newCursorStyle });
    return cursorEl;
}

function getSnipConnector(snipRange, row, sequenceLength, bpsPerRow, snipConnectorStyle, charWidth, index) {
    //tnr: we basically need to first determine what the range start and end are..
    // var _snipRange = {
    //     ...snipRange,
    //     end: norm(snipRange.end-1,sequenceLength)
    // }
    //then mask the range by the row

    var overlaps = getOverlapsOfPotentiallyCircularRanges(snipRange, _extends({}, row, { end: row.end + 1 }), sequenceLength);
    return overlaps.map(function (overlap, index2) {
        var _getXStartAndWidthOfR2 = getXStartAndWidthOfRangeWrtRow(overlap, row, bpsPerRow, charWidth, sequenceLength),
            xStart = _getXStartAndWidthOfR2.xStart,
            width = _getXStartAndWidthOfR2.width;

        width -= charWidth;
        //the second logical operator catches the special case where we're at the very end of the sequence..
        var newCursorStyle = assign({}, snipConnectorStyle, {
            left: xStart,
            width: width
        });
        var cursorEl = React.createElement('div', { key: index + index2, className: 'veRowViewCutsite snipConnector', style: newCursorStyle });
        return cursorEl;
    });
}

function Cutsites(props) {
    var annotationRanges = props.annotationRanges,
        charWidth = props.charWidth,
        bpsPerRow = props.bpsPerRow,
        row = props.row,
        sequenceLength = props.sequenceLength,
        topStrand = props.topStrand;

    var snips = [];
    var snipConnectors = [];
    Object.keys(annotationRanges).forEach(function (key) {
        var annotationRange = annotationRanges[key];
        var annotation = annotationRange.annotation;

        if (!annotation) {
            annotation = annotationRange;
        }
        var _annotation = annotation,
            topSnipPosition = _annotation.topSnipPosition,
            bottomSnipPosition = _annotation.bottomSnipPosition,
            upstreamBottomSnip = _annotation.upstreamBottomSnip,
            upstreamTopSnip = _annotation.upstreamTopSnip,
            upstreamTopBeforeBottom = _annotation.upstreamTopBeforeBottom,
            topSnipBeforeBottom = _annotation.topSnipBeforeBottom;

        topSnipPosition = topSnipPosition && Number(topSnipPosition);
        bottomSnipPosition = bottomSnipPosition && Number(bottomSnipPosition);
        upstreamTopSnip = upstreamTopSnip && Number(upstreamTopSnip);
        upstreamBottomSnip = upstreamBottomSnip && Number(upstreamBottomSnip);

        snipStyle = _extends({}, snipStyle, { background: annotation.restrictionEnzyme.color || 'black' });
        snipConnectorStyle = _extends({}, snipConnectorStyle, { background: annotation.restrictionEnzyme.color || 'black' });

        var newSnip;
        var newConnector;
        var snipRange = {};

        if (areNonNegativeIntegers([bottomSnipPosition, topSnipPosition])) {
            if (topStrand) {
                // if (isPositionWithinRange(topSnipPosition, row)) {}
                newSnip = getSnipForRow(topSnipPosition, row, sequenceLength, bpsPerRow, snipStyle, charWidth, key + 'downstream');
                if (newSnip) {
                    snips.push(newSnip);
                }
            } else {
                newSnip = getSnipForRow(bottomSnipPosition, row, sequenceLength, bpsPerRow, snipStyle, charWidth, key + 'downstream');
                if (newSnip) {
                    snips.push(newSnip);
                }
                if (topSnipBeforeBottom) {
                    snipRange.start = topSnipPosition;
                    snipRange.end = bottomSnipPosition;
                } else {
                    snipRange.start = bottomSnipPosition;
                    snipRange.end = topSnipPosition;
                }
                newConnector = getSnipConnector(snipRange, row, sequenceLength, bpsPerRow, snipConnectorStyle, charWidth, key + 'downstreamConnector');
                snipConnectors.push(newConnector);
            }
        }
        if (areNonNegativeIntegers([upstreamBottomSnip, upstreamTopSnip])) {
            if (topStrand) {
                newSnip = getSnipForRow(upstreamTopSnip, row, sequenceLength, bpsPerRow, snipStyle, charWidth, key + 'upstream');
                if (newSnip) {
                    snips.push(newSnip);
                }
            } else {
                newSnip = getSnipForRow(upstreamBottomSnip, row, sequenceLength, bpsPerRow, snipStyle, charWidth, key + 'upstream');
                if (newSnip) {
                    snips.push(newSnip);
                }
                if (upstreamTopBeforeBottom) {
                    snipRange.start = upstreamTopSnip;
                    snipRange.end = upstreamBottomSnip;
                } else {
                    snipRange.start = upstreamBottomSnip;
                    snipRange.end = upstreamTopSnip;
                }
                newConnector = getSnipConnector(snipRange, row, sequenceLength, bpsPerRow, snipConnectorStyle, charWidth, key + 'upstreamConnector');
                snipConnectors.push(newConnector);
            }
        }
    });
    return React.createElement(
        'div',
        null,
        snips,
        snipConnectors
    );
}

process.env.NODE_ENV !== "production" ? Cutsites.propTypes = {
    // annotationRanges: React.PropTypes.object.isRequired,
    charWidth: PropTypes.number.isRequired,
    bpsPerRow: PropTypes.number.isRequired,
    row: PropTypes.object.isRequired,
    sequenceLength: PropTypes.number.isRequired,
    topStrand: PropTypes.bool.isRequired
} : void 0;

export default Cutsites;