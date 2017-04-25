import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

var AnnotationContainerHolder = React.createClass({
  displayName: 'AnnotationContainerHolder',

  mixins: [PureRenderMixin],

  render: function render() {
    return React.createElement(
      'div',
      {
        className: this.props.className || "annotationContainer",
        width: '100%',
        style: { height: this.props.containerHeight, position: 'relative', display: 'block' } },
      this.props.children
    );
  }
});
export default AnnotationContainerHolder;