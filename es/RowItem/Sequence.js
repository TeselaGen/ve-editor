var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

var Sequence = React.createClass({
    displayName: 'Sequence',

    mixins: [PureRenderMixin],
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

        return React.createElement(
            'div',
            { style: style, className: 'Sequence' },
            React.createElement(
                'svg',
                { style: { left: startOffset * charWidth, height: height, position: 'absolute' },
                    ref: 'rowViewTextContainer',
                    className: 'rowViewTextContainer', width: width, height: height },
                React.createElement(
                    'text',
                    _extends({ className: 'monospaceFont' }, textAttrs),
                    sequence
                )
            ),
            children
        );
    }
});

export default Sequence;