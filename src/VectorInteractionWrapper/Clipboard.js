import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

class Clipboard extends React.Component {
    static propTypes = {
        value: PropTypes.string.isRequired
    };

    static defaultProps = {
        className: "clipboard"
    };

    componentDidMount() {
        this.component.parentNode.addEventListener("keydown", this.handleKeyDown, false);
        this.component.parentNode.addEventListener("keyup", this.handleKeyUp, false);
    }

    componentWillUnmount() {
        this.component.parentNode.removeEventListener("keydown", this.handleKeyDown, false);
        this.component.parentNode.removeEventListener("keyup", this.handleKeyUp, false);
    }

    handleKeyDown = (e) => {
        var metaKeyIsDown = (e.ctrlKey || e.metaKey);
        var textIsSelected = window.getSelection().toString();

        if (!metaKeyIsDown || textIsSelected) {
            return;
        }

        var element = ReactDOM.findDOMNode(this);
        element.focus();
        element.select();
    };

    handleKeyUp = (e) => {
        var element = ReactDOM.findDOMNode(this);
        element.blur();
    };

    render() {
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
            zIndex: 100,
        };
        return <input 
          ref={(c)=> {
            if (c) {
                this.component = c
            }
        }}
          style={style}
          type="text" 
          readOnly={true} 
          value={value} 
          onPaste={this.props.onPaste}
          onCopy={this.props.onCopy}
          />;
    }
}

export default Clipboard;
