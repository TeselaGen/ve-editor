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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Caret = function (_React$Component) {
    _inherits(Caret, _React$Component);

    function Caret() {
        _classCallCheck(this, Caret);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    Caret.prototype.render = function render() {
        var _props = this.props,
            charWidth = _props.charWidth,
            row = _props.row,
            sequenceLength = _props.sequenceLength,
            caretPosition = _props.caretPosition,
            _props$className = _props.className,
            className = _props$className === undefined ? '' : _props$className;

        if (row.start <= caretPosition && row.end + 1 >= caretPosition || row.end === sequenceLength - 1 && row.end < caretPosition) {
            //the second logical operator catches the special case where we're at the very end of the sequence..
            var cursorEl = _react2.default.createElement('div', { className: " veRowViewCaret " + className, style: { left: (caretPosition - row.start) * charWidth - 2 } });
            return cursorEl;
        } else {
            return null;
        }
    };

    return Caret;
}(_react2.default.Component);

exports.default = (0, _pure2.default)(Caret);
module.exports = exports['default'];