var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import getXStartAndWidthOfRowAnnotation from './getXStartAndWidthOfRowAnnotation';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import intervalTree2 from 'interval-tree2';
import getYOffset from '../CircularView/getYOffset';
import forEach from 'lodash/forEach';

var CutsiteLabels = React.createClass({
    displayName: 'CutsiteLabels',

    mixins: [PureRenderMixin],
    propTypes: {
        annotationRanges: React.PropTypes.array.isRequired,
        charWidth: React.PropTypes.number.isRequired,
        bpsPerRow: React.PropTypes.number.isRequired,
        annotationHeight: React.PropTypes.number.isRequired,
        spaceBetweenAnnotations: React.PropTypes.number.isRequired,
        cutsiteClicked: React.PropTypes.func.isRequired
    },
    render: function render() {
        var _props = this.props,
            _props$annotationRang = _props.annotationRanges,
            annotationRanges = _props$annotationRang === undefined ? {} : _props$annotationRang,
            bpsPerRow = _props.bpsPerRow,
            charWidth = _props.charWidth,
            annotationHeight = _props.annotationHeight,
            spaceBetweenAnnotations = _props.spaceBetweenAnnotations,
            cutsiteClicked = _props.cutsiteClicked,
            _props$textWidth = _props.textWidth,
            textWidth = _props$textWidth === undefined ? 12 : _props$textWidth,
            HoverHelper = _props.HoverHelper;

        if (annotationRanges.length === 0) {
            return null;
        }
        var maxAnnotationYOffset = 0;
        var annotationsSVG = [];
        var rowCenter = bpsPerRow * textWidth / 2;
        var iTree = new intervalTree2(rowCenter);
        forEach(annotationRanges, function (annotationRange, index) {
            var annotation = annotationRange.annotation;
            if (!annotation) {
                annotation = annotationRange;
            }
            var annotationLength = annotation.restrictionEnzyme.name.length * textWidth;

            var _getXStartAndWidthOfR = getXStartAndWidthOfRowAnnotation(annotationRange, bpsPerRow, charWidth),
                xStart = _getXStartAndWidthOfR.xStart;

            var xEnd = xStart + annotationLength;
            var rowLength = bpsPerRow * charWidth;
            if (xEnd > rowLength) {
                xStart = xStart - (xEnd - rowLength);
                xEnd = rowLength;
            }
            var yOffset = getYOffset(iTree, xStart, xEnd);
            iTree.add(xStart, xEnd, undefined, _extends({}, annotationRange, { yOffset: yOffset }));

            if (yOffset > maxAnnotationYOffset) {
                maxAnnotationYOffset = yOffset;
            }
            var height = yOffset * (annotationHeight + spaceBetweenAnnotations);
            annotationsSVG.push(React.createElement(
                HoverHelper,
                {
                    id: annotation.id,
                    key: 'cutsiteLabel' + index,
                    passJustOnMouseOverAndClassname: true
                },
                React.createElement(
                    'div',
                    {
                        className: '',
                        onClick: function onClick(event) {
                            cutsiteClicked({ event: event, annotation: annotation });
                            event.stopPropagation();
                        },
                        style: {
                            // left: xStart,
                            position: 'absolute',
                            top: height,
                            // display: 'inline-block',
                            // position: (relative) ? 'relative' : 'absolute',
                            // // float: 'left',
                            'left': xStart,
                            'zIndex': 10
                            // left: '100 % ',
                        }
                    },
                    annotation.restrictionEnzyme.name
                )
            ));
        });
        var containerHeight = (maxAnnotationYOffset + 1) * (annotationHeight + spaceBetweenAnnotations);
        return React.createElement(
            'div',
            {
                width: '100%',
                style: { position: 'relative', height: containerHeight, display: 'block' },
                className: 'cutsiteContainer'
            },
            annotationsSVG
        );
    }
});
export default CutsiteLabels;