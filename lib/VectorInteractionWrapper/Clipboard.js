'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Clipboard = _react2.default.createClass({
    displayName: 'Clipboard',


    propTypes: {
        value: _react2.default.PropTypes.string.isRequired
    },

    getDefaultProps: function getDefaultProps() {
        return {
            className: "clipboard"
        };
    },

    componentDidMount: function componentDidMount() {
        this.component.parentNode.addEventListener("keydown", this.handleKeyDown, false);
        this.component.parentNode.addEventListener("keyup", this.handleKeyUp, false);
    },

    componentWillUnmount: function componentWillUnmount() {
        this.component.parentNode.removeEventListener("keydown", this.handleKeyDown, false);
        this.component.parentNode.removeEventListener("keyup", this.handleKeyUp, false);
    },

    handleKeyDown: function handleKeyDown(e) {
        var metaKeyIsDown = e.ctrlKey || e.metaKey;
        var textIsSelected = window.getSelection().toString();

        if (!metaKeyIsDown || textIsSelected) {
            return;
        }

        var element = _reactDom2.default.findDOMNode(this);
        element.focus();
        element.select();
    },

    handleKeyUp: function handleKeyUp(e) {
        var element = _reactDom2.default.findDOMNode(this);
        element.blur();
    },

    render: function render() {
        var _this = this;

        var value = this.props.value;
        var style = {
            position: 'fixed',
            // width: 0, //tnr: commented these out because they seem to be messing thing up if used...
            // height: 0,
            opacity: 0,
            left: 0,
            padding: 0,
            top: 0,
            margin: 0,
            zIndex: 100
        };
        return _react2.default.createElement('input', {
            ref: function ref(c) {
                if (c) {
                    _this.component = c;
                }
            },
            style: style,
            type: 'text',
            readOnly: true,
            value: value,
            onPaste: this.props.onPaste,
            onCopy: this.props.onCopy
        });
    }
});

exports.default = Clipboard;
module.exports = exports['default'];