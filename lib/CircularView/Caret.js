'use strict';

exports.__esModule = true;

var _isNumber = require('lodash/isNumber');

var _isNumber2 = _interopRequireDefault(_isNumber);

var _getRangeAngles2 = require('ve-range-utils/getRangeAngles');

var _getRangeAngles3 = _interopRequireDefault(_getRangeAngles2);

var _lruMemoize = require('lru-memoize');

var _lruMemoize2 = _interopRequireDefault(_lruMemoize);

var _PositionAnnotationOnCircle = require('./PositionAnnotationOnCircle');

var _PositionAnnotationOnCircle2 = _interopRequireDefault(_PositionAnnotationOnCircle);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draggableClassnames = require('../constants/draggableClassnames');

var _draggableClassnames2 = _interopRequireDefault(_draggableClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Caret(_ref) {
    var caretPosition = _ref.caretPosition,
        sequenceLength = _ref.sequenceLength,
        className = _ref.className,
        innerRadius = _ref.innerRadius,
        outerRadius = _ref.outerRadius;

    var _getRangeAngles = (0, _getRangeAngles3.default)({ start: caretPosition, end: caretPosition }, sequenceLength),
        startAngle = _getRangeAngles.startAngle,
        endAngle = _getRangeAngles.endAngle;

    if (!(0, _isNumber2.default)(startAngle)) {
        console.error("we've got a problem!");
    }
    return _react2.default.createElement(
        _PositionAnnotationOnCircle2.default,
        {
            key: 'caret',
            className: className + ' ' + _draggableClassnames2.default.caret,
            sAngle: startAngle,
            eAngle: endAngle,
            height: 0 },
        _react2.default.createElement('line', {
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

exports.default = (0, _lruMemoize2.default)(5, undefined, true)(Caret);
module.exports = exports['default'];