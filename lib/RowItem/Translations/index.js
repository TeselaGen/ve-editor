'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require('./style.css');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _getAnnotationRangeType = require('ve-range-utils/getAnnotationRangeType');

var _getAnnotationRangeType2 = _interopRequireDefault(_getAnnotationRangeType);

var _AnnotationContainerHolder = require('../AnnotationContainerHolder');

var _AnnotationContainerHolder2 = _interopRequireDefault(_AnnotationContainerHolder);

var _AnnotationPositioner = require('../AnnotationPositioner');

var _AnnotationPositioner2 = _interopRequireDefault(_AnnotationPositioner);

var _Translation = require('./Translation');

var _Translation2 = _interopRequireDefault(_Translation);

var _getXStartAndWidthOfRowAnnotation = require('../getXStartAndWidthOfRowAnnotation');

var _getXStartAndWidthOfRowAnnotation2 = _interopRequireDefault(_getXStartAndWidthOfRowAnnotation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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
        var result = (0, _getXStartAndWidthOfRowAnnotation2.default)(annotationRange, bpsPerRow, charWidth);
        annotationsSVG.push(_react2.default.createElement(
            _AnnotationPositioner2.default,
            {
                height: annotationHeight,
                width: result.width,
                className: 'veRowViewTranslations',
                key: 'feature' + annotation.id + 'start:' + annotationRange.start,
                top: annotationRange.yOffset * (annotationHeight + spaceBetweenAnnotations),
                left: result.xStart
            },
            _react2.default.createElement(_Translation2.default, _extends({
                annotationRange: annotationRange,
                rangeType: (0, _getAnnotationRangeType2.default)(annotationRange, annotation, annotation.forward),
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
    return _react2.default.createElement(
        _AnnotationContainerHolder2.default,
        {
            containerHeight: containerHeight },
        annotationsSVG
    );
}

process.env.NODE_ENV !== "production" ? Translations.propTypes = {
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
    sequenceLength: _propTypes2.default.number.isRequired
} : void 0;

exports.default = Translations;
module.exports = exports['default'];