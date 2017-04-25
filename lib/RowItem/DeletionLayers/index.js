'use strict';

exports.__esModule = true;

var _AnnotationPositioner = require('../AnnotationPositioner');

var _AnnotationPositioner2 = _interopRequireDefault(_AnnotationPositioner);

var _AnnotationContainerHolder = require('../AnnotationContainerHolder');

var _AnnotationContainerHolder2 = _interopRequireDefault(_AnnotationContainerHolder);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

require('./style.css');

var _getXStartAndWidthOfRangeWrtRow = require('../getXStartAndWidthOfRangeWrtRow');

var _getXStartAndWidthOfRangeWrtRow2 = _interopRequireDefault(_getXStartAndWidthOfRangeWrtRow);

var _getOverlapsOfPotentiallyCircularRanges = require('ve-range-utils/getOverlapsOfPotentiallyCircularRanges');

var _getOverlapsOfPotentiallyCircularRanges2 = _interopRequireDefault(_getOverlapsOfPotentiallyCircularRanges);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function mixin(target, source) {
    target = target.prototype;

    Object.getOwnPropertyNames(source).forEach(function (name) {
        var sourceProp = Object.getOwnPropertyDescriptor(source, name);

        if (name !== "constructor") {
            Object.defineProperty(target, name, sourceProp);
        }
    });
}

var DeletionLayers = function (_React$Component) {
    _inherits(DeletionLayers, _React$Component);

    function DeletionLayers() {
        _classCallCheck(this, DeletionLayers);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    DeletionLayers.prototype.render = function render() {
        var _props = this.props,
            charWidth = _props.charWidth,
            bpsPerRow = _props.bpsPerRow,
            row = _props.row,
            sequenceLength = _props.sequenceLength,
            deletionLayerClicked = _props.deletionLayerClicked,
            deletionLayerRightClicked = _props.deletionLayerRightClicked,
            _props$deletionLayers = _props.deletionLayers,
            deletionLayers = _props$deletionLayers === undefined ? {} : _props$deletionLayers,
            _props$deletionLineHe = _props.deletionLineHeight,
            deletionLineHeight = _props$deletionLineHe === undefined ? 6 : _props$deletionLineHe;


        var deletionLayersToUse = Object.keys(deletionLayers).map(function (key) {
            return deletionLayers[key];
        });
        if (!deletionLayersToUse.length) return null;
        return _react2.default.createElement(
            _AnnotationContainerHolder2.default,
            {
                className: 'veRowViewDeletionLayers',
                containerHeight: deletionLineHeight },
            deletionLayersToUse.sort(function (deletionLayer) {
                return deletionLayer.inBetweenBps ? 1 : 0;
            }).map(function (deletionLayer, index) {
                var rangeSpansSequence = deletionLayer.start === deletionLayer.end + 1 || deletionLayer.start === 0 && deletionLayer.end === sequenceLength - 1;
                var _deletionLayer$classN = deletionLayer.className,
                    className = _deletionLayer$classN === undefined ? '' : _deletionLayer$classN,
                    _deletionLayer$style = deletionLayer.style,
                    style = _deletionLayer$style === undefined ? {} : _deletionLayer$style,
                    color = deletionLayer.color;

                var overlaps = (0, _getOverlapsOfPotentiallyCircularRanges2.default)(deletionLayer, row, sequenceLength);
                return overlaps.map(function (overlap, index2) {
                    var _getXStartAndWidthOfR = (0, _getXStartAndWidthOfRangeWrtRow2.default)(overlap, row, bpsPerRow, charWidth, sequenceLength),
                        xStart = _getXStartAndWidthOfR.xStart,
                        width = _getXStartAndWidthOfR.width;

                    var deletionStart = overlap.start === deletionLayer.start;
                    var deletionEnd = overlap.end === deletionLayer.end;

                    return [_react2.default.createElement(
                        _AnnotationPositioner2.default,
                        {
                            height: deletionLineHeight,
                            width: width,
                            key: index,
                            top: 0
                            // className={classnames() } 
                            , left: xStart + (deletionLayer.inBetweenBps ? charWidth / 1.2 : 0)
                        },
                        _react2.default.createElement(
                            'g',
                            {
                                className: 'clickable',
                                onClick: function onClick(event) {
                                    deletionLayerClicked({ annotation: deletionLayer, event: event });
                                },
                                onContextMenu: function onContextMenu(event) {
                                    deletionLayerRightClicked({ annotation: deletionLayer, event: event });
                                }
                            },
                            _react2.default.createElement('rect', { fill: color, x: '0', y: '0', height: deletionLineHeight, width: width }),
                            rangeSpansSequence && deletionStart && _react2.default.createElement('rect', { fill: 'blue', x: '0', y: '0', height: deletionLineHeight, width: 4 }),
                            rangeSpansSequence && deletionEnd && _react2.default.createElement('rect', { fill: 'blue', x: width - 4, y: '0', height: deletionLineHeight, width: 4 })
                        )
                    )];
                });
            })
        );
    };

    return DeletionLayers;
}(_react2.default.Component);

mixin(DeletionLayers, _reactAddonsPureRenderMixin2.default);

exports.default = DeletionLayers;
module.exports = exports['default'];