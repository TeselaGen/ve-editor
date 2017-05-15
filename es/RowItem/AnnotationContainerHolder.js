import React from 'react';

var AnnotationContainerHolder = function AnnotationContainerHolder(props) {
  return React.createElement(
    "div",
    {
      className: props.className || "annotationContainer",
      width: "100%",
      style: { height: props.containerHeight, position: 'relative', display: 'block' } },
    props.children
  );
};
export default AnnotationContainerHolder;