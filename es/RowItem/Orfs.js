import React from 'react';
import getXStartAndWidthOfRowAnnotation from './getXStartAndWidthOfRowAnnotation';
import getAnnotationRangeType from 've-range-utils/getAnnotationRangeType';
import Orf from './Orf';
import AnnotationContainerHolder from './AnnotationContainerHolder';
import AnnotationPositioner from './AnnotationPositioner';
import PureRenderMixin from 'react-addons-pure-render-mixin';
var Orfs = React.createClass({
    displayName: 'Orfs',

    mixins: [PureRenderMixin],
    propTypes: {
        annotationRanges: React.PropTypes.array.isRequired,
        charWidth: React.PropTypes.number.isRequired,
        bpsPerRow: React.PropTypes.number.isRequired,
        annotationHeight: React.PropTypes.number.isRequired,
        spaceBetweenAnnotations: React.PropTypes.number.isRequired,
        orfClicked: React.PropTypes.func.isRequired
    },
    render: function render() {
        var _props = this.props,
            annotationRanges = _props.annotationRanges,
            bpsPerRow = _props.bpsPerRow,
            charWidth = _props.charWidth,
            annotationHeight = _props.annotationHeight,
            spaceBetweenAnnotations = _props.spaceBetweenAnnotations,
            orfClicked = _props.orfClicked,
            orfRightClicked = _props.orfRightClicked,
            row = _props.row;

        if (annotationRanges.length === 0) {
            return null;
        }
        var maxAnnotationYOffset = 0;
        var annotationsSVG = [];
        annotationRanges.forEach(function (annotationRange) {
            if (annotationRange.yOffset > maxAnnotationYOffset) {
                maxAnnotationYOffset = annotationRange.yOffset;
            }
            var annotation = annotationRange.annotation;
            var _annotation$internalS = annotation.internalStartCodonIndices,
                internalStartCodonIndices = _annotation$internalS === undefined ? [] : _annotation$internalS;

            var normalizedInternalStartCodonIndices = internalStartCodonIndices.filter(function (position) {
                if (position >= row.start && position <= row.end) return true;
            }).map(function (position) {
                return position - row.start;
            });

            var result = getXStartAndWidthOfRowAnnotation(annotationRange, bpsPerRow, charWidth);
            annotationsSVG.push(React.createElement(
                AnnotationPositioner,
                {
                    className: 'veRowViewOrfs',
                    height: annotationHeight,
                    width: result.width,
                    key: 'orf' + annotation.id + 'start:' + annotationRange.start,
                    top: annotationRange.yOffset * (annotationHeight + spaceBetweenAnnotations),
                    left: result.xStart
                },
                React.createElement(Orf, {
                    annotation: annotation,
                    color: annotation.color,
                    orfClicked: orfClicked,
                    orfRightClicked: orfRightClicked,
                    width: result.width,
                    charWidth: charWidth,
                    forward: annotation.forward,
                    frame: annotation.frame,
                    normalizedInternalStartCodonIndices: normalizedInternalStartCodonIndices,
                    rangeType: getAnnotationRangeType(annotationRange, annotation, annotation.forward),
                    height: annotationHeight,
                    name: annotation.name })
            ));
        });
        var containerHeight = (maxAnnotationYOffset + 1) * (annotationHeight + spaceBetweenAnnotations);
        return React.createElement(
            AnnotationContainerHolder,
            {
                className: 'Orfs',
                containerHeight: containerHeight },
            annotationsSVG
        );
    }
});
export default Orfs;