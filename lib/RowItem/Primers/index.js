'use strict';

exports.__esModule = true;

var _Sequence = require('../Sequence');

var _Sequence2 = _interopRequireDefault(_Sequence);

var _getSequenceWithinRange = require('ve-range-utils/getSequenceWithinRange');

var _getSequenceWithinRange2 = _interopRequireDefault(_getSequenceWithinRange);

require('./style.css');

var _forEach = require('lodash/forEach');

var _forEach2 = _interopRequireDefault(_forEach);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _getXStartAndWidthOfRowAnnotation = require('../getXStartAndWidthOfRowAnnotation');

var _getXStartAndWidthOfRowAnnotation2 = _interopRequireDefault(_getXStartAndWidthOfRowAnnotation);

var _getAnnotationRangeType = require('ve-range-utils/getAnnotationRangeType');

var _getAnnotationRangeType2 = _interopRequireDefault(_getAnnotationRangeType);

var _Primer = require('./Primer');

var _Primer2 = _interopRequireDefault(_Primer);

var _AnnotationContainerHolder = require('../AnnotationContainerHolder');

var _AnnotationContainerHolder2 = _interopRequireDefault(_AnnotationContainerHolder);

var _AnnotationPositioner = require('../AnnotationPositioner');

var _AnnotationPositioner2 = _interopRequireDefault(_AnnotationPositioner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    (0, _forEach2.default)(annotationRanges, function (annotationRange, index) {
        var seqInRow = (0, _getSequenceWithinRange2.default)(annotationRange, sequence);
        if (annotationRange.yOffset > maxAnnotationYOffset) {
            maxAnnotationYOffset = annotationRange.yOffset;
        }
        var annotation = annotationRange.annotation;
        var result = (0, _getXStartAndWidthOfRowAnnotation2.default)(annotationRange, bpsPerRow, charWidth);
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
        annotationsSVG.push(_react2.default.createElement(
            HoverHelper,
            {
                passJustOnMouseOverAndClassname: true
                // onHover={function () {
                //     debugger
                // }}
                , key: 'primer' + index,
                id: annotation.id
            },
            _react2.default.createElement(
                'div',
                { onClick: function onClick() {} },
                _react2.default.createElement(
                    _AnnotationPositioner2.default,
                    {
                        height: annotationHeight,
                        width: result.width,
                        key: index,
                        top: annotationRange.yOffset * (annotationHeight + spaceBetweenAnnotations),
                        left: result.xStart
                    },
                    _react2.default.createElement(_Primer2.default, {
                        key: index,
                        primerClicked: primerClicked,
                        primerRightClicked: primerRightClicked,
                        annotation: annotation,
                        color: annotation.color,
                        widthInBps: annotationRange.end - annotationRange.start + 1,
                        charWidth: charWidth,
                        forward: annotation.forward,
                        rangeType: (0, _getAnnotationRangeType2.default)(annotationRange, annotation, annotation.forward),
                        height: annotationHeight,
                        name: annotation.name })
                )
            )
        ));
    });
    var containerHeight = (maxAnnotationYOffset + 1) * (annotationHeight + spaceBetweenAnnotations);

    return _react2.default.createElement(
        _AnnotationContainerHolder2.default,
        {
            className: 'veRowViewPrimerContainer',
            containerHeight: containerHeight },
        annotationsSVG
    );
}

// import './style.css'


process.env.NODE_ENV !== "production" ? Primers.propTypes = {
    annotationRanges: _propTypes2.default.arrayOf(_propTypes2.default.shape({
        start: _propTypes2.default.number.isRequired,
        end: _propTypes2.default.number.isRequired,
        yOffset: _propTypes2.default.number.isRequired,
        annotation: _propTypes2.default.shape({
            start: _propTypes2.default.number.isRequired,
            end: _propTypes2.default.number.isRequired,
            forward: _propTypes2.default.bool.isRequired,
            id: _propTypes2.default.string.isRequired
        })
    })),
    charWidth: _propTypes2.default.number.isRequired,
    bpsPerRow: _propTypes2.default.number.isRequired,
    annotationHeight: _propTypes2.default.number.isRequired,
    spaceBetweenAnnotations: _propTypes2.default.number.isRequired,
    sequenceLength: _propTypes2.default.number.isRequired,
    primerClicked: _propTypes2.default.func.isRequired
} : void 0;

exports.default = Primers;

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

module.exports = exports['default'];