'use strict';

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _AnnotationPositioner = require('../AnnotationPositioner');

var _AnnotationPositioner2 = _interopRequireDefault(_AnnotationPositioner);

var _AnnotationContainerHolder = require('../AnnotationContainerHolder');

var _AnnotationContainerHolder2 = _interopRequireDefault(_AnnotationContainerHolder);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./style.css');

var _getXStartAndWidthOfRangeWrtRow = require('../getXStartAndWidthOfRangeWrtRow');

var _getXStartAndWidthOfRangeWrtRow2 = _interopRequireDefault(_getXStartAndWidthOfRangeWrtRow);

var _getOverlapsOfPotentiallyCircularRanges = require('ve-range-utils/getOverlapsOfPotentiallyCircularRanges');

var _getOverlapsOfPotentiallyCircularRanges2 = _interopRequireDefault(_getOverlapsOfPotentiallyCircularRanges);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    return _react2.default.createElement(
        _AnnotationContainerHolder2.default,
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

            var overlaps = (0, _getOverlapsOfPotentiallyCircularRanges2.default)(lineageLine, row, sequenceLength);
            return overlaps.map(function (overlap, index2) {
                var _getXStartAndWidthOfR = (0, _getXStartAndWidthOfRangeWrtRow2.default)(overlap, row, bpsPerRow, charWidth, sequenceLength),
                    xStart = _getXStartAndWidthOfR.xStart,
                    width = _getXStartAndWidthOfR.width;

                var lineageStart = overlap.start === lineageLine.start;
                var lineageEnd = overlap.end === lineageLine.end;

                return [_react2.default.createElement(
                    _AnnotationPositioner2.default,
                    {
                        height: lineageLineHeight,
                        width: width,
                        key: index,
                        top: 0
                        // className={classnames() } 
                        , left: xStart + (lineageLine.inBetweenBps ? charWidth / 1.2 : 0)
                    },
                    _react2.default.createElement(
                        'g',
                        null,
                        _react2.default.createElement('rect', { fill: color, x: '0', y: '0', height: lineageLineHeight, width: width }),
                        rangeSpansSequence && lineageStart && _react2.default.createElement('rect', { fill: '#408CE1', x: '0', y: '0', height: lineageLineHeight, width: 4 }),
                        rangeSpansSequence && lineageEnd && _react2.default.createElement('rect', { fill: '#408CE1', x: width - 4, y: '0', height: lineageLineHeight, width: 4 })
                    )
                )];
            });
        })
    );
}

exports.default = LineageLines;
module.exports = exports['default'];