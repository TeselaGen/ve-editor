'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sequence = _react2.default.createClass({
    displayName: 'Sequence',

    mixins: [_reactAddonsPureRenderMixin2.default],
    render: function render() {
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
    }
});

exports.default = Sequence;
module.exports = exports['default'];