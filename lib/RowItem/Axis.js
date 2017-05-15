'use strict';

exports.__esModule = true;

var _normalizePositionByRangeLength = require('ve-range-utils/normalizePositionByRangeLength');

var _normalizePositionByRangeLength2 = _interopRequireDefault(_normalizePositionByRangeLength);

var _getXStartAndWidthOfRangeWrtRow = require('./getXStartAndWidthOfRangeWrtRow');

var _getXStartAndWidthOfRangeWrtRow2 = _interopRequireDefault(_getXStartAndWidthOfRangeWrtRow);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _calculateTickMarkPositionsForGivenRange = require('../utils/calculateTickMarkPositionsForGivenRange');

var _calculateTickMarkPositionsForGivenRange2 = _interopRequireDefault(_calculateTickMarkPositionsForGivenRange);

var _getXCenterOfRowAnnotation = require('./getXCenterOfRowAnnotation');

var _getXCenterOfRowAnnotation2 = _interopRequireDefault(_getXCenterOfRowAnnotation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    var _getXStartAndWidthOfR = (0, _getXStartAndWidthOfRangeWrtRow2.default)(row, row, bpsPerRow, charWidth, sequenceLength),
        xStart = _getXStartAndWidthOfR.xStart,
        width = _getXStartAndWidthOfR.width;
    //this function should take in a desired tickSpacing (eg 10 bps between tick mark)
    //and output an array of tickMarkPositions for the given row (eg, [0, 10, 20])


    var xEnd = xStart + width;

    var yStart = 0;
    var tickMarkPositions = (0, _calculateTickMarkPositionsForGivenRange2.default)({ tickSpacing: tickSpacing, range: row, sequenceLength: sequenceLength });
    var tickMarkSVG = [];

    tickMarkPositions.forEach(function (tickMarkPosition) {
        // var xCenter = getXCenterOfRowAnnotation({
        //     start: tickMarkPosition,
        //     end: tickMarkPosition
        // }, row, bpsPerRow, charWidth, sequenceLength);
        var xCenter = tickMarkPosition * charWidth + charWidth / 2;
        var yStart = 0;
        var yEnd = annotationHeight / 3;
        tickMarkSVG.push(_react2.default.createElement('path', {
            key: 'axisTickMark ' + row.rowNumber + ' ' + tickMarkPosition,
            d: "M" + xCenter + "," + yStart + " L" + xCenter + "," + yEnd,
            stroke: 'black' }));
        tickMarkSVG.push(_react2.default.createElement(
            'text',
            {
                key: 'axisTickMarkText ' + row.rowNumber + ' ' + tickMarkPosition,
                stroke: 'black',
                x: xCenter,
                y: annotationHeight,
                style: { "textAnchor": "middle", "fontSize": 10, "fontFamily": "Verdana" }
            },
            (0, _normalizePositionByRangeLength2.default)(row.start + tickMarkPosition, sequenceLength) + 1
        ));
    });

    return _react2.default.createElement(
        'svg',
        { className: 'veRowViewAxis veAxis', width: '100%', height: annotationHeight * 1.2 },
        tickMarkSVG,
        _react2.default.createElement('path', {
            key: 'axis ' + row.rowNumber,
            d: "M" + xStart + "," + yStart + " L" + xEnd + "," + yStart,
            stroke: 'black' })
    );
};

exports.default = Axis;
module.exports = exports['default'];