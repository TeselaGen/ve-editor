import './style.css';
import forEach from 'lodash/forEach';
import PropTypes from 'prop-types';
import React from 'react';
import featureColorMap from '../../constants/featureColorMap.json';

// import './style.css'
import getXStartAndWidthOfRowAnnotation from '../getXStartAndWidthOfRowAnnotation';

import getAnnotationRangeType from 've-range-utils/getAnnotationRangeType';
import Feature from './Feature';
import AnnotationContainerHolder from '../AnnotationContainerHolder';
import AnnotationPositioner from '../AnnotationPositioner';

function Features(props) {
    var _props$annotationRang = props.annotationRanges,
        annotationRanges = _props$annotationRang === undefined ? [] : _props$annotationRang,
        bpsPerRow = props.bpsPerRow,
        charWidth = props.charWidth,
        _props$annotationHeig = props.annotationHeight,
        annotationHeight = _props$annotationHeig === undefined ? 12 : _props$annotationHeig,
        _props$spaceBetweenAn = props.spaceBetweenAnnotations,
        spaceBetweenAnnotations = _props$spaceBetweenAn === undefined ? 2 : _props$spaceBetweenAn,
        featureClicked = props.featureClicked,
        featureRightClicked = props.featureRightClicked,
        HoverHelper = props.HoverHelper;

    if (annotationRanges.length === 0) {
        return null;
    }
    var maxAnnotationYOffset = 0;
    var annotationsSVG = [];
    forEach(annotationRanges, function (annotationRange, index) {
        if (annotationRange.yOffset > maxAnnotationYOffset) {
            maxAnnotationYOffset = annotationRange.yOffset;
        }
        var annotation = annotationRange.annotation;
        var annotationColor = annotation.color || "#BBBBBB";
        if (annotation.type) {
            if (featureColorMap[annotation.type]) {
                annotationColor = featureColorMap[annotation.type];
            }
        }
        var result = getXStartAndWidthOfRowAnnotation(annotationRange, bpsPerRow, charWidth);
        annotationsSVG.push(React.createElement(
            HoverHelper,
            {
                passJustOnMouseOverAndClassname: true
                // onHover={function () {
                //     debugger
                // }}
                , key: 'feature' + index,
                id: annotation.id
            },
            React.createElement(
                'div',
                { onClick: function onClick() {} },
                React.createElement(
                    AnnotationPositioner,
                    {
                        height: annotationHeight,
                        width: result.width,
                        key: index,
                        top: annotationRange.yOffset * (annotationHeight + spaceBetweenAnnotations),
                        left: result.xStart
                    },
                    React.createElement(Feature, {
                        key: index,
                        featureClicked: featureClicked,
                        featureRightClicked: featureRightClicked,
                        annotation: annotation,
                        color: annotationColor,
                        widthInBps: annotationRange.end - annotationRange.start + 1,
                        charWidth: charWidth,
                        forward: annotation.forward,
                        rangeType: getAnnotationRangeType(annotationRange, annotation, annotation.forward),
                        height: annotationHeight,
                        name: annotation.name })
                )
            )
        ));
    });
    var containerHeight = (maxAnnotationYOffset + 1) * (annotationHeight + spaceBetweenAnnotations);
    return React.createElement(
        AnnotationContainerHolder,
        {
            className: 'veRowViewFeatureContainer',
            containerHeight: containerHeight },
        annotationsSVG
    );
}

process.env.NODE_ENV !== "production" ? Features.propTypes = {
    annotationRanges: PropTypes.arrayOf(PropTypes.shape({
        start: PropTypes.number.isRequired,
        end: PropTypes.number.isRequired,
        yOffset: PropTypes.number.isRequired,
        annotation: PropTypes.shape({
            start: PropTypes.number.isRequired,
            end: PropTypes.number.isRequired,
            forward: PropTypes.bool.isRequired,
            id: PropTypes.string.isRequired
        })
    })),
    charWidth: PropTypes.number.isRequired,
    bpsPerRow: PropTypes.number.isRequired,
    annotationHeight: PropTypes.number.isRequired,
    spaceBetweenAnnotations: PropTypes.number.isRequired,
    sequenceLength: PropTypes.number.isRequired,
    featureClicked: PropTypes.func.isRequired
} : void 0;

export default Features;