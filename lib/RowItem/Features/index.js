'use strict';

exports.__esModule = true;

require('./style.css');

var _forEach = require('lodash/forEach');

var _forEach2 = _interopRequireDefault(_forEach);

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

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _AnnotationContainerHolder = require('../AnnotationContainerHolder');

var _AnnotationContainerHolder2 = _interopRequireDefault(_AnnotationContainerHolder);

var _AnnotationPositioner = require('../AnnotationPositioner');

var _AnnotationPositioner2 = _interopRequireDefault(_AnnotationPositioner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import './style.css'
var Features = _react2.default.createClass({
    displayName: 'Features',

    mixins: [_reactAddonsPureRenderMixin2.default],
    propTypes: {
        annotationRanges: _react.PropTypes.arrayOf(_react.PropTypes.shape({
            start: _react.PropTypes.number.isRequired,
            end: _react.PropTypes.number.isRequired,
            yOffset: _react.PropTypes.number.isRequired,
            annotation: _react.PropTypes.shape({
                start: _react.PropTypes.number.isRequired,
                end: _react.PropTypes.number.isRequired,
                forward: _react.PropTypes.bool.isRequired,
                id: _react.PropTypes.string.isRequired
            })
        })),
        charWidth: _react.PropTypes.number.isRequired,
        bpsPerRow: _react.PropTypes.number.isRequired,
        annotationHeight: _react.PropTypes.number.isRequired,
        spaceBetweenAnnotations: _react.PropTypes.number.isRequired,
        sequenceLength: _react.PropTypes.number.isRequired,
        featureClicked: _react.PropTypes.func.isRequired
    },
    render: function render() {
        var _props = this.props,
            _props$annotationRang = _props.annotationRanges,
            annotationRanges = _props$annotationRang === undefined ? [] : _props$annotationRang,
            bpsPerRow = _props.bpsPerRow,
            charWidth = _props.charWidth,
            _props$annotationHeig = _props.annotationHeight,
            annotationHeight = _props$annotationHeig === undefined ? 12 : _props$annotationHeig,
            _props$spaceBetweenAn = _props.spaceBetweenAnnotations,
            spaceBetweenAnnotations = _props$spaceBetweenAn === undefined ? 2 : _props$spaceBetweenAn,
            featureClicked = _props.featureClicked,
            featureRightClicked = _props.featureRightClicked,
            HoverHelper = _props.HoverHelper;

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
});
exports.default = Features;
module.exports = exports['default'];