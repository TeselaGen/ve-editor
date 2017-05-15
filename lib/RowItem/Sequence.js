'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sequence = function (_React$Component) {
    _inherits(Sequence, _React$Component);

    function Sequence() {
        _classCallCheck(this, Sequence);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    Sequence.prototype.render = function render() {
        var _props = this.props,
            sequence = _props.sequence,
            charWidth = _props.charWidth,
            _props$containerStyle = _props.containerStyle,
            containerStyle = _props$containerStyle === undefined ? {} : _props$containerStyle,
            children = _props.children,
            length = _props.length,
            height = _props.height,
            className = _props.className,
            _props$startOffset = _props.startOffset,
            startOffset = _props$startOffset === undefined ? 0 : _props$startOffset;

        var width = length * charWidth;

        var style = _extends({
            position: 'relative',
            height: height
        }, containerStyle);
        var textAttrs = {
            x: 0,
            y: height,
            textLength: width,
            lengthAdjust: "spacing"
        };

        return _react2.default.createElement(
            'div',
            { style: style, className: 'Sequence' },
            _react2.default.createElement(
                'svg',
                { style: { left: startOffset * charWidth, height: height, position: 'absolute' },
                    ref: 'rowViewTextContainer',
                    className: 'rowViewTextContainer', width: width, height: height },
                _react2.default.createElement(
                    'text',
                    _extends({ className: 'monospaceFont' }, textAttrs),
                    sequence
                )
            ),
            children
        );
    };

    return Sequence;
}(_react2.default.Component);

exports.default = Sequence;
module.exports = exports['default'];