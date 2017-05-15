var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import PropTypes from 'prop-types';
import React from 'react';
import getXStartAndWidthOfRowAnnotation from './getXStartAndWidthOfRowAnnotation';
import intervalTree2 from 'interval-tree2';
import getYOffset from '../CircularView/getYOffset';
import forEach from 'lodash/forEach';

function CutsiteLabels(props) {
    var _props$annotationRang = props.annotationRanges,
        annotationRanges = _props$annotationRang === undefined ? {} : _props$annotationRang,
        bpsPerRow = props.bpsPerRow,
        charWidth = props.charWidth,
        annotationHeight = props.annotationHeight,
        spaceBetweenAnnotations = props.spaceBetweenAnnotations,
        cutsiteClicked = props.cutsiteClicked,
        _props$textWidth = props.textWidth,
        textWidth = _props$textWidth === undefined ? 12 : _props$textWidth,
        HoverHelper = props.HoverHelper;

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

process.env.NODE_ENV !== "production" ? CutsiteLabels.propTypes = {
    annotationRanges: PropTypes.array.isRequired,
    charWidth: PropTypes.number.isRequired,
    bpsPerRow: PropTypes.number.isRequired,
    annotationHeight: PropTypes.number.isRequired,
    spaceBetweenAnnotations: PropTypes.number.isRequired,
    cutsiteClicked: PropTypes.func.isRequired
} : void 0;

export default CutsiteLabels;