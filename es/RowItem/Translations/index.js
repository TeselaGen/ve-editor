var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import './style.css';
import PropTypes from 'prop-types';
import React from 'react';
import getAnnotationRangeType from 've-range-utils/getAnnotationRangeType';
import AnnotationContainerHolder from '../AnnotationContainerHolder';
import AnnotationPositioner from '../AnnotationPositioner';
import Translation from './Translation';
import getXStartAndWidthOfRowAnnotation from '../getXStartAndWidthOfRowAnnotation';

function Translations(props) {
    var annotationRanges = props.annotationRanges,
        bpsPerRow = props.bpsPerRow,
        charWidth = props.charWidth,
        annotationHeight = props.annotationHeight,
        spaceBetweenAnnotations = props.spaceBetweenAnnotations,
        rest = _objectWithoutProperties(props, ['annotationRanges', 'bpsPerRow', 'charWidth', 'annotationHeight', 'spaceBetweenAnnotations']);

    if (annotationRanges.length === 0) {
        return null;
    }
    var maxAnnotationYOffset = 0;
    var annotationsSVG = [];
    annotationRanges.forEach(function (annotationRange) {
        if (annotationRange.yOffset > maxAnnotationYOffset) {
            //TODO: consider abstracting out the code to calculate the necessary height for the annotation container
            maxAnnotationYOffset = annotationRange.yOffset;
        }
        var annotation = annotationRange.annotation;
        var result = getXStartAndWidthOfRowAnnotation(annotationRange, bpsPerRow, charWidth);
        annotationsSVG.push(React.createElement(
            AnnotationPositioner,
            {
                height: annotationHeight,
                width: result.width,
                className: 'veRowViewTranslations',
                key: 'feature' + annotation.id + 'start:' + annotationRange.start,
                top: annotationRange.yOffset * (annotationHeight + spaceBetweenAnnotations),
                left: result.xStart
            },
            React.createElement(Translation, _extends({
                annotationRange: annotationRange,
                rangeType: getAnnotationRangeType(annotationRange, annotation, annotation.forward),
                widthInBps: annotationRange.end - annotationRange.start + 1,
                charWidth: charWidth,
                height: annotationHeight
            }, rest))
        ));
        // transform={"scale(" + transformX + ",.2) "}
        // annotationsSVG = annotationsSVG.concat(translationSVG);
    });
    var containerHeight = (maxAnnotationYOffset + 1) * (annotationHeight + spaceBetweenAnnotations);
    // height={containerHeight}
    return React.createElement(
        AnnotationContainerHolder,
        {
            containerHeight: containerHeight },
        annotationsSVG
    );
}

process.env.NODE_ENV !== "production" ? Translations.propTypes = {
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
    sequenceLength: PropTypes.number.isRequired
} : void 0;

export default Translations;