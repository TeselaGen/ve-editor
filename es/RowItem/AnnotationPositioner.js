import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

var AnnotationPositioner = React.createClass({
    displayName: 'AnnotationPositioner',

    mixins: [PureRenderMixin],
    render: function render() {
        return React.createElement(
            'svg',
            {
                transform: this.props.transform || null,
                height: this.props.height + 5,
                className: this.props.className + ' veRowViewAnnotationPosition',
                width: this.props.width + 5,
                style: {
                    position: 'absolute',
                    top: this.props.top,
                    left: this.props.left
                }
            },
            this.props.children
        );
    }
});

export default AnnotationPositioner;

// key={'feature' + annotation.id + 'start:' + annotationRange.start}