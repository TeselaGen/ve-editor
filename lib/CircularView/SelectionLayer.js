'use strict';

exports.__esModule = true;

var _Caret = require('./Caret');

var _Caret2 = _interopRequireDefault(_Caret);

var _sector = require('paths-js/sector');

var _sector2 = _interopRequireDefault(_sector);

var _getRangeAnglesSpecial = require('./getRangeAnglesSpecial');

var _getRangeAnglesSpecial2 = _interopRequireDefault(_getRangeAnglesSpecial);

var _lruMemoize = require('lru-memoize');

var _lruMemoize2 = _interopRequireDefault(_lruMemoize);

var _PositionAnnotationOnCircle = require('./PositionAnnotationOnCircle');

var _PositionAnnotationOnCircle2 = _interopRequireDefault(_PositionAnnotationOnCircle);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draggableClassnames = require('../constants/draggableClassnames');

var _draggableClassnames2 = _interopRequireDefault(_draggableClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    var _getRangeAngles = (0, _getRangeAnglesSpecial2.default)(selectionLayer, sequenceLength),
        startAngle = _getRangeAngles.startAngle,
        endAngle = _getRangeAngles.endAngle,
        totalAngle = _getRangeAngles.totalAngle;

    var section = (0, _sector2.default)({
        center: [0, 0], //the center is always 0,0 for our annotations :) we rotate later!
        r: innerRadius,
        R: radius,
        start: 0,
        end: totalAngle
    });

    var section2 = (0, _sector2.default)({
        center: [0, 0], //the center is always 0,0 for our annotations :) we rotate later!
        r: innerRadius,
        R: radius,
        start: 0,
        end: Math.PI * 2 - totalAngle
    });

    return _react2.default.createElement(
        'g',
        { key: 'veSelectionLayer' + index, className: 'veSelectionLayer' },
        _react2.default.createElement(
            _PositionAnnotationOnCircle2.default,
            {
                className: 'selectionLayerWrapper',
                sAngle: startAngle,
                eAngle: endAngle,
                height: 0 },
            _react2.default.createElement('path', {
                className: 'selectionLayer',
                style: { opacity: .3 },
                d: section.path.print(),
                fill: color || "rgb(0, 153, 255)" })
        ),
        _react2.default.createElement(
            _PositionAnnotationOnCircle2.default,
            {
                className: 'selectionLayerInverseWrapper',
                sAngle: endAngle,
                eAngle: startAngle,
                height: 0 },
            _react2.default.createElement('path', {
                className: 'selectionLayerInverse',
                style: { opacity: .2 },
                d: section2.path.print(),
                fill: color || "red" })
        ),
        !showCaret && _react2.default.createElement(_Caret2.default, {
            key: 'caret1',
            className: 'selectionLayerCaret ' + _draggableClassnames2.default.selectionStart,
            caretPosition: start,
            sequenceLength: sequenceLength,
            innerRadius: innerRadius,
            outerRadius: radius
        }),
        !showCaret && _react2.default.createElement(_Caret2.default, {
            key: 'caret2',
            className: 'selectionLayerCaret ' + _draggableClassnames2.default.selectionEnd,
            caretPosition: end + 1,
            sequenceLength: sequenceLength,
            innerRadius: innerRadius,
            outerRadius: radius
        })
    );
}

exports.default = (0, _lruMemoize2.default)(5, undefined, true)(SelectionLayer);
module.exports = exports['default'];