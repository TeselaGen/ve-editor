import React from 'react';
import './style.css';
import pure from 'recompose/pure';
import draggableClassnames from '../../constants/draggableClassnames';

function Caret(props) {
    var charWidth = props.charWidth,
        row = props.row,
        sequenceLength = props.sequenceLength,
        caretPosition = props.caretPosition,
        _props$className = props.className,
        className = _props$className === undefined ? '' : _props$className;

    if (row.start <= caretPosition && row.end + 1 >= caretPosition || row.end === sequenceLength - 1 && row.end < caretPosition) {
        //the second logical operator catches the special case where we're at the very end of the sequence..
        var cursorEl = React.createElement('div', { className: " veRowViewCaret " + className, style: { left: (caretPosition - row.start) * charWidth - 2 } });
        return cursorEl;
    } else {
        return null;
    }
}

export default pure(Caret);