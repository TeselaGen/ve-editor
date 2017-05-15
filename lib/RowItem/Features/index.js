'use strict';

exports.__esModule = true;

require('./style.css');

var _forEach = require('lodash/forEach');

var _forEach2 = _interopRequireDefault(_forEach);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _featureColorMap = require('../../constants/featureColorMap.json');

var _featureColorMap2 = _interopRequireDefault(_featureColorMap);

var _getXStartAndWidthOfRowAnnotation = require('../getXStartAndWidthOfRowAnnotation');

var _getXStartAndWidthOfRowAnnotation2 = _interopRequireDefault(_getXStartAndWidthOfRowAnnotation);

var _getAnnotationRangeType = require('ve-range-utils/getAnnotationRangeType');

var _getAnnotationRangeType2 = _interopRequireDefault(_getAnnotationRangeType);

var _Feature = require('./Feature');

var _Feature2 = _interopRequireDefault(_Feature);

var _AnnotationContainerHolder = require('../AnnotationContainerHolder');

var _AnnotationContainerHolder2 = _interopRequireDefault(_AnnotationContainerHolder);

var _AnnotationPositioner = require('../AnnotationPositioner');

var _AnnotationPositioner2 = _interopRequireDefault(_AnnotationPositioner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    (0, _forEach2.default)(annotationRanges, function (annotationRange, index) {
        if (annotationRange.yOffset > maxAnnotationYOffset) {
            maxAnnotationYOffset = annotationRange.yOffset;
        }
        var annotation = annotationRange.annotation;
        var annotationColor = annotation.color || "#BBBBBB";
        if (annotation.type) {
            if (_featureColorMap2.default[annotation.type]) {
                annotationColor = _featureColorMap2.default[annotation.type];
            }
        }
        var result = (0, _getXStartAndWidthOfRowAnnotation2.default)(annotationRange, bpsPerRow, charWidth);
        annotationsSVG.push(_react2.default.createElement(
            HoverHelper,
            {
                passJustOnMouseOverAndClassname: true
                // onHover={function () {
                //     debugger
                // }}
                , key: 'feature' + index,
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
                    _react2.default.createElement(_Feature2.default, {
                        key: index,
                        featureClicked: featureClicked,
                        featureRightClicked: featureRightClicked,
                        annotation: annotation,
                        color: annotationColor,
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
            className: 'veRowViewFeatureContainer',
            containerHeight: containerHeight },
        annotationsSVG
    );
}

// import './style.css'


process.env.NODE_ENV !== "production" ? Features.propTypes = {
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
    featureClicked: _propTypes2.default.func.isRequired
} : void 0;

exports.default = Features;
module.exports = exports['default'];