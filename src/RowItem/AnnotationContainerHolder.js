import React from 'react';


var AnnotationContainerHolder = function (props) {
    return (
      <div 
        className={props.className || "annotationContainer"}
        width="100%" 
        style={{height: props.containerHeight, position: 'relative', display: 'block'}}>
        {props.children}
      </div>
    );
    
}
export default AnnotationContainerHolder;
