import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

var AnnotationContainerHolder = function () {
    return (
      <div 
        className={this.props.className || "annotationContainer"}
        width="100%" 
        style={{height: this.props.containerHeight, position: 'relative', display: 'block'}}>
        {this.props.children}
      </div>
    );
    
}
export default AnnotationContainerHolder;
