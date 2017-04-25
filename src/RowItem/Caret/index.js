import React from 'react';
import './style.css';
import pure from 'recompose/pure'
import draggableClassnames from '../../constants/draggableClassnames';

export default class Caret extends React.Component{
  render() {
      var {
          charWidth,
          row,
          sequenceLength,
          caretPosition,
          className=''
      } = this.props;
      if (row.start <= caretPosition && row.end + 1 >= caretPosition || (row.end === sequenceLength - 1 && row.end < caretPosition)) {
          //the second logical operator catches the special case where we're at the very end of the sequence..
          var cursorEl = (<div className={ " veRowViewCaret " + className} style={{left: ((caretPosition - row.start) * charWidth) - 2}}/>);
          return (cursorEl);
      } else {
          return null;
      }
  }
}


export default pure(Caret);
