'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _getXStartAndWidthOfRowAnnotation = require('./getXStartAndWidthOfRowAnnotation');

var _getXStartAndWidthOfRowAnnotation2 = _interopRequireDefault(_getXStartAndWidthOfRowAnnotation);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _intervalTree = require('interval-tree2');

var _intervalTree2 = _interopRequireDefault(_intervalTree);

var _getYOffset = require('../CircularView/getYOffset');

var _getYOffset2 = _interopRequireDefault(_getYOffset);

var _forEach = require('lodash/forEach');

var _forEach2 = _interopRequireDefault(_forEach);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CutsiteLabels = _react2.default.createClass({
    displayName: 'CutsiteLabels',

    mixins: [_reactAddonsPureRenderMixin2.default],
    propTypes: {
        annotationRanges: _react2.default.PropTypes.array.isRequired,
        charWidth: _react2.default.PropTypes.number.isRequired,
        bpsPerRow: _react2.default.PropTypes.number.isRequired,
        annotationHeight: _react2.default.PropTypes.number.isRequired,
        spaceBetweenAnnotations: _react2.default.PropTypes.number.isRequired,
        cutsiteClicked: _react2.default.PropTypes.func.isRequired
    },
    render: function render() {
        var _props = this.props,
            _props$annotationRang = _props.annotationRanges,
            annotationRanges = _props$annotationRang === undefined ? {} : _props$annotationRang,
            bpsPerRow = _props.bpsPerRow,
            charWidth = _props.charWidth,
            annotationHeight = _props.annotationHeight,
            spaceBetweenAnnotations = _props.spaceBetweenAnnotations,
            cutsiteClicked = _props.cutsiteClicked,
            _props$textWidth = _props.textWidth,
            textWidth = _props$textWidth === undefined ? 12 : _props$textWidth,
            HoverHelper = _props.HoverHelper;

        if (annotationRanges.length === 0) {
            return null;
        }
        var maxAnnotationYOffset = 0;
        var annotationsSVG = [];
        var rowCenter = bpsPerRow * textWidth / 2;
        var iTree = new _intervalTree2.default(rowCenter);
        (0, _forEach2.default)(annotationRanges, function (annotationRange, index) {
            var annotation = annotationRange.annotation;
            if (!annotation) {
                annotation = annotationRange;
            }
            var annotationLength = annotation.restrictionEnzyme.name.length * textWidth;

            var _getXStartAndWidthOfR = (0, _getXStartAndWidthOfRowAnnotation2.default)(annotationRange, bpsPerRow, charWidth),
                xStart = _getXStartAndWidthOfR.xStart;

            var xEnd = xStart + annotationLength;
            var rowLength = bpsPerRow * charWidth;
            if (xEnd > rowLength) {
                xStart = xStart - (xEnd - rowLength);
                xEnd = rowLength;
            }
            var yOffset = (0, _getYOffset2.default)(iTree, xStart, xEnd);
            iTree.add(xStart, xEnd, undefined, _extends({}, annotationRange, { yOffset: yOffset }));

            if (yOffset > maxAnnotationYOffset) {
                maxAnnotationYOffset = yOffset;
            }
            var height = yOffset * (annotationHeight + spaceBetweenAnnotations);
            annotationsSVG.push(_react2.default.createElement(
                HoverHelper,
                {
                    id: annotation.id,
                    key: 'cutsiteLabel' + index,
                    passJustOnMouseOverAndClassname: true
                },
                _react2.default.createElement(
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
        return _react2.default.createElement(
            'div',
            {
                width: '100%',
                style: { position: 'relative', height: containerHeight, display: 'block' },
                className: 'cutsiteContainer'
            },
            annotationsSVG
        );
    }
});
exports.default = CutsiteLabels;
module.exports = exports['default'];