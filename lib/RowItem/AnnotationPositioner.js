'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AnnotationPositioner = _react2.default.createClass({
    displayName: 'AnnotationPositioner',

    mixins: [_reactAddonsPureRenderMixin2.default],
    render: function render() {
        return _react2.default.createElement(
            'svg',
            {
                transform: this.props.transform || null,
                height: this.props.height + 5,
                className: this.props.className + ' veRowViewAnnotationPosition',
                width: this.props.width + 5,
                style: {
                    position: 'absolute',
                    top: this.props.top,
                    left: this.props.left
                }
            },
            this.props.children
        );
    }
});

exports.default = AnnotationPositioner;

// key={'feature' + annotation.id + 'start:' + annotationRange.start}

module.exports = exports['default'];