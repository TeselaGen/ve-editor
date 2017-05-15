import React from 'react';

var AnnotationPositioner = function AnnotationPositioner(props) {
  return React.createElement(
    'svg',
    {
      transform: props.transform || null,
      height: props.height + 5,
      className: props.className + ' veRowViewAnnotationPosition',
      width: props.width + 5,
      style: {
        position: 'absolute',
        top: props.top,
        left: props.left
      }
    },
    props.children
  );
};

export default AnnotationPositioner;

// key={'feature' + annotation.id + 'start:' + annotationRange.start}