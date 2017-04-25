import React from 'react';
import ReactDOM from 'react-dom';

var Clipboard = React.createClass({
    displayName: 'Clipboard',


    propTypes: {
        value: React.PropTypes.string.isRequired
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

        var element = ReactDOM.findDOMNode(this);
        element.focus();
        element.select();
    },

    handleKeyUp: function handleKeyUp(e) {
        var element = ReactDOM.findDOMNode(this);
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
        return React.createElement('input', {
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

export default Clipboard;