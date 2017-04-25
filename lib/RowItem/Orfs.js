'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _getXStartAndWidthOfRowAnnotation = require('./getXStartAndWidthOfRowAnnotation');

var _getXStartAndWidthOfRowAnnotation2 = _interopRequireDefault(_getXStartAndWidthOfRowAnnotation);

var _getAnnotationRangeType = require('ve-range-utils/getAnnotationRangeType');

var _getAnnotationRangeType2 = _interopRequireDefault(_getAnnotationRangeType);

var _Orf = require('./Orf');

var _Orf2 = _interopRequireDefault(_Orf);

var _AnnotationContainerHolder = require('./AnnotationContainerHolder');

var _AnnotationContainerHolder2 = _interopRequireDefault(_AnnotationContainerHolder);

var _AnnotationPositioner = require('./AnnotationPositioner');

var _AnnotationPositioner2 = _interopRequireDefault(_AnnotationPositioner);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Orfs = _react2.default.createClass({
    displayName: 'Orfs',

    mixins: [_reactAddonsPureRenderMixin2.default],
    propTypes: {
        annotationRanges: _react2.default.PropTypes.array.isRequired,
        charWidth: _react2.default.PropTypes.number.isRequired,
        bpsPerRow: _react2.default.PropTypes.number.isRequired,
        annotationHeight: _react2.default.PropTypes.number.isRequired,
        spaceBetweenAnnotations: _react2.default.PropTypes.number.isRequired,
        orfClicked: _react2.default.PropTypes.func.isRequired
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

            var result = (0, _getXStartAndWidthOfRowAnnotation2.default)(annotationRange, bpsPerRow, charWidth);
            annotationsSVG.push(_react2.default.createElement(
                _AnnotationPositioner2.default,
                {
                    className: 'veRowViewOrfs',
                    height: annotationHeight,
                    width: result.width,
                    key: 'orf' + annotation.id + 'start:' + annotationRange.start,
                    top: annotationRange.yOffset * (annotationHeight + spaceBetweenAnnotations),
                    left: result.xStart
                },
                _react2.default.createElement(_Orf2.default, {
                    annotation: annotation,
                    color: annotation.color,
                    orfClicked: orfClicked,
                    orfRightClicked: orfRightClicked,
                    width: result.width,
                    charWidth: charWidth,
                    forward: annotation.forward,
                    frame: annotation.frame,
                    normalizedInternalStartCodonIndices: normalizedInternalStartCodonIndices,
                    rangeType: (0, _getAnnotationRangeType2.default)(annotationRange, annotation, annotation.forward),
                    height: annotationHeight,
                    name: annotation.name })
            ));
        });
        var containerHeight = (maxAnnotationYOffset + 1) * (annotationHeight + spaceBetweenAnnotations);
        return _react2.default.createElement(
            _AnnotationContainerHolder2.default,
            {
                className: 'Orfs',
                containerHeight: containerHeight },
            annotationsSVG
        );
    }
});
exports.default = Orfs;
module.exports = exports['default'];