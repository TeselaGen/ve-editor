'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./style.css');

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

var _draggableClassnames = require('../../constants/draggableClassnames');

var _draggableClassnames2 = _interopRequireDefault(_draggableClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Caret(props) {
    var charWidth = props.charWidth,
        row = props.row,
        sequenceLength = props.sequenceLength,
        caretPosition = props.caretPosition,
        _props$className = props.className,
        className = _props$className === undefined ? '' : _props$className;

    if (row.start <= caretPosition && row.end + 1 >= caretPosition || row.end === sequenceLength - 1 && row.end < caretPosition) {
        //the second logical operator catches the special case where we're at the very end of the sequence..
        var cursorEl = _react2.default.createElement('div', { className: " veRowViewCaret " + className, style: { left: (caretPosition - row.start) * charWidth - 2 } });
        return cursorEl;
    } else {
        return null;
    }
}

exports.default = (0, _pure2.default)(Caret);
module.exports = exports['default'];