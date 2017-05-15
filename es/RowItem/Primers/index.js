import Sequence from '../Sequence';
import getSequenceWithinRange from 've-range-utils/getSequenceWithinRange';
import './style.css';
import forEach from 'lodash/forEach';
import PropTypes from 'prop-types';
import React from 'react';

// import './style.css'
import getXStartAndWidthOfRowAnnotation from '../getXStartAndWidthOfRowAnnotation';

import getAnnotationRangeType from 've-range-utils/getAnnotationRangeType';
import Primer from './Primer';
import AnnotationContainerHolder from '../AnnotationContainerHolder';
import AnnotationPositioner from '../AnnotationPositioner';

function Primers(props) {
    var _props$annotationRang = props.annotationRanges,
        annotationRanges = _props$annotationRang === undefined ? [] : _props$annotationRang,
        bpsPerRow = props.bpsPerRow,
        charWidth = props.charWidth,
        _props$annotationHeig = props.annotationHeight,
        annotationHeight = _props$annotationHeig === undefined ? 12 : _props$annotationHeig,
        _props$spaceBetweenAn = props.spaceBetweenAnnotations,
        spaceBetweenAnnotations = _props$spaceBetweenAn === undefined ? 2 : _props$spaceBetweenAn,
        primerClicked = props.primerClicked,
        primerRightClicked = props.primerRightClicked,
        HoverHelper = props.HoverHelper,
        _props$sequence = props.sequence,
        sequence = _props$sequence === undefined ? '' : _props$sequence;

    if (annotationRanges.length === 0) {
        return null;
    }
    var maxAnnotationYOffset = 0;
    var annotationsSVG = [];
    forEach(annotationRanges, function (annotationRange, index) {
        var seqInRow = getSequenceWithinRange(annotationRange, sequence);
        if (annotationRange.yOffset > maxAnnotationYOffset) {
            maxAnnotationYOffset = annotationRange.yOffset;
        }
        var annotation = annotationRange.annotation;
        var result = getXStartAndWidthOfRowAnnotation(annotationRange, bpsPerRow, charWidth);
        // var isStart = annotationRange.enclosingRangeType === "beginningAndEnd" || annotationRange.enclosingRangeType === "beginningAndEnd"
        // console.log('annotationRange:', annotationRange)
        // console.log('isStart:', isStart)
        // var {color='orange'} = annotation
        // var {startOffset} = result
        // var width = seqInRow.length * charWidth
        // var height = annotationHeight
        // var bufferBottom = 4
        // var bufferLeft = 2
        // var arrowHeight = isStart ? 8 : 0
        annotationsSVG.push(React.createElement(
            HoverHelper,
            {
                passJustOnMouseOverAndClassname: true
                // onHover={function () {
                //     debugger
                // }}
                , key: 'primer' + index,
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
                    React.createElement(Primer, {
                        key: index,
                        primerClicked: primerClicked,
                        primerRightClicked: primerRightClicked,
                        annotation: annotation,
                        color: annotation.color,
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
            className: 'veRowViewPrimerContainer',
            containerHeight: containerHeight },
        annotationsSVG
    );
}

process.env.NODE_ENV !== "production" ? Primers.propTypes = {
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
    primerClicked: PropTypes.func.isRequired
} : void 0;

export default Primers;

// <Sequence
//     key={index}
//     sequence={seqInRow}
//     startOffset={startOffset}
//     height={height}
//     containerStyle={{
//         marginTop: 8,
//         marginBottom: 6,
//     }}
//     length={seqInRow.length}
//     charWidth={charWidth}>
//     <svg style={{left: startOffset * charWidth, height: annotationHeight, position: 'absolute'}} 
//         ref="rowViewTextContainer" 
//         onClick={function (event) {
//           primerClicked({event, annotation})
//         }}
//         onContextMenu={function (event) {
//           primerRightClicked({event, annotation})
//         }}
//         className="rowViewTextContainer clickable" width={width} height={height}>
//         <polyline 
//           points={`${-bufferLeft},0 ${-bufferLeft},${-arrowHeight}, ${charWidth/2},0 ${width},0 ${width},${height + bufferBottom} ${-bufferLeft},${height + bufferBottom} ${-bufferLeft},0`} 
//           fill="none" 
//           stroke={color} 
//           strokeWidth="2px"/>
//     </svg>
// </Sequence>