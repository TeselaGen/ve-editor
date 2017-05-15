'use strict';

exports.__esModule = true;

var _getAnnotationNameAndStartStopString = require('../utils/getAnnotationNameAndStartStopString');

var _getAnnotationNameAndStartStopString2 = _interopRequireDefault(_getAnnotationNameAndStartStopString);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _orfFrameToColorMap = require('../constants/orfFrameToColorMap');

var _orfFrameToColorMap2 = _interopRequireDefault(_orfFrameToColorMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Orf(props) {
    var height = props.height,
        rangeType = props.rangeType,
        _props$normalizedInte = props.normalizedInternalStartCodonIndices,
        normalizedInternalStartCodonIndices = _props$normalizedInte === undefined ? [] : _props$normalizedInte,
        forward = props.forward,
        _props$frame = props.frame,
        frame = _props$frame === undefined ? 0 : _props$frame,
        annotation = props.annotation,
        width = props.width,
        orfClicked = props.orfClicked,
        orfRightClicked = props.orfRightClicked,
        charWidth = props.charWidth;

    var heightToUse = height / 1.5;
    var color = _orfFrameToColorMap2.default[frame];
    var arrow = null;
    var endCircle = null;
    var circle = _react2.default.createElement('circle', {
        key: 'circle',
        r: heightToUse / 2,
        cx: heightToUse / 2,
        cy: heightToUse / 2
    });
    if (rangeType === 'end' || rangeType === 'beginningAndEnd') {
        arrow = _react2.default.createElement('path', {
            transform: 'translate(' + (width - charWidth) + ',0) scale(' + charWidth / 64 + ',' + heightToUse / 64 + ')',
            d: rangeType === 'start' ? 'M0 16 L0 48 L16 64 L48 64 L64 48 L64 16 L48 0 L16 0 Z' : 'M0 64 L64 32 L0 0 Z'
        });
    }
    if (rangeType === 'start' || rangeType === 'beginningAndEnd') {
        endCircle = circle;
    }
    var internalStartCodonCircles = normalizedInternalStartCodonIndices.map(function (internalStartCodon, index) {
        return _react2.default.cloneElement(circle, { key: index, transform: 'translate(' + charWidth * internalStartCodon + ',0)' });
    });
    return _react2.default.createElement(
        'g',
        {
            onClick: function onClick(event) {
                orfClicked({ annotation: annotation, event: event });
            },
            onContextMenu: function onContextMenu(event) {
                orfRightClicked({ annotation: annotation, event: event });
            },
            className: 'veRowViewOrf clickable frame' + frame,
            strokeWidth: '1',
            stroke: color,
            fillOpacity: 1,
            fill: color,
            transform: forward ? null : 'translate(' + width + ',0) scale(-1,1)'
        },
        _react2.default.createElement('path', {
            transform: (rangeType === 'start' ? 'translate(' + charWidth + ',0)' : '') + ('scale(' + (width - (rangeType === 'middle' ? 0 : charWidth)) / 64 + ',' + heightToUse / 64 + ')'),
            d: 'M0 40 L64 40 L64 20 L0 20 Z'
        }),
        arrow,
        endCircle,
        internalStartCodonCircles,
        _react2.default.createElement(
            'title',
            null,
            ' ',
            (0, _getAnnotationNameAndStartStopString2.default)(annotation, { startText: 'Open Reading Frame:' }),
            ' '
        )
    );
}

process.env.NODE_ENV !== "production" ? Orf.propTypes = {
    width: _propTypes2.default.number.isRequired,
    charWidth: _propTypes2.default.number.isRequired,
    frame: _propTypes2.default.number.isRequired,
    height: _propTypes2.default.number.isRequired,
    rangeType: _propTypes2.default.string.isRequired,
    forward: _propTypes2.default.bool.isRequired
} : void 0;

exports.default = Orf;
module.exports = exports['default'];