'use strict';

exports.__esModule = true;

var _getAnnotationNameAndStartStopString = require('../../utils/getAnnotationNameAndStartStopString');

var _getAnnotationNameAndStartStopString2 = _interopRequireDefault(_getAnnotationNameAndStartStopString);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Feature = _react2.default.createClass({
    displayName: 'Feature',

    mixins: [_reactAddonsPureRenderMixin2.default],
    propTypes: {
        widthInBps: _react2.default.PropTypes.number.isRequired,
        charWidth: _react2.default.PropTypes.number.isRequired,
        height: _react2.default.PropTypes.number.isRequired,
        rangeType: _react2.default.PropTypes.string.isRequired,
        name: _react2.default.PropTypes.string.isRequired,
        forward: _react2.default.PropTypes.bool.isRequired,
        featureClicked: _react2.default.PropTypes.func.isRequired
    },

    render: function render() {
        var _props = this.props,
            widthInBps = _props.widthInBps,
            charWidth = _props.charWidth,
            height = _props.height,
            rangeType = _props.rangeType,
            forward = _props.forward,
            name = _props.name,
            _props$pointiness = _props.pointiness,
            pointiness = _props$pointiness === undefined ? 8 : _props$pointiness,
            _props$fontWidth = _props.fontWidth,
            fontWidth = _props$fontWidth === undefined ? 12 : _props$fontWidth,
            _props$color = _props.color,
            color = _props$color === undefined ? 'orange' : _props$color,
            featureClicked = _props.featureClicked,
            featureRightClicked = _props.featureRightClicked,
            annotation = _props.annotation;


        var width = widthInBps * charWidth;
        var charWN = charWidth; //charWN is normalized
        if (charWidth < 15) {
            //allow the arrow width to adapt
            if (width > 15) {
                charWN = 15; //tnr: replace 15 here with a non-hardcoded number..
            } else {
                charWN = width;
            }
        }
        var widthMinusOne = width - charWN;
        var path;
        // starting from the top left of the feature
        if (rangeType === 'middle') {
            //draw a rectangle
            path = '\n            M 0,0 \n            L ' + (width - pointiness / 2) + ',0\n            Q ' + (width + pointiness / 2) + ',' + height / 2 + ' ' + (width - pointiness / 2) + ',' + height + '\n            L ' + 0 + ',' + height + '\n            Q ' + pointiness + ',' + height / 2 + ' ' + 0 + ',' + 0 + '\n            z';
        } else if (rangeType === 'start') {
            path = '\n            M 0,0 \n            L ' + (width - pointiness / 2) + ',0 \n            Q ' + (width + pointiness / 2) + ',' + height / 2 + ' ' + (width - pointiness / 2) + ',' + height + '\n            L 0,' + height + ' \n            z';
        } else if (rangeType === 'beginningAndEnd') {
            path = '\n            M 0,0 \n            L ' + widthMinusOne + ',0 \n            L ' + width + ',' + height / 2 + ' \n            L ' + widthMinusOne + ',' + height + ' \n            L 0,' + height + ' \n            z';
        } else {
            path = '\n          M 0,0 \n          L ' + widthMinusOne + ',0 \n          L ' + width + ',' + height / 2 + ' \n          L ' + widthMinusOne + ',' + height + ' \n          L 0,' + height + ' \n          Q ' + pointiness + ',' + height / 2 + ' ' + 0 + ',' + 0 + '\n          z';
        }
        var nameToDisplay = name;
        var textLength = name.length * fontWidth;
        var textOffset = widthMinusOne / 4;
        if (textLength > widthMinusOne) {
            textOffset = 0;
            nameToDisplay = '';
        }
        // path=path.replace(/ /g,'')
        // path=path.replace(/\n/g,'')
        return _react2.default.createElement(
            'g',
            {
                className: 'veRowViewFeature clickable',
                onClick: function onClick(event) {
                    featureClicked({ annotation: annotation, event: event });
                },
                onContextMenu: function onContextMenu(event) {
                    featureRightClicked({ annotation: annotation, event: event });
                }
            },
            _react2.default.createElement(
                'title',
                null,
                (0, _getAnnotationNameAndStartStopString2.default)(annotation)
            ),
            _react2.default.createElement('path', {
                strokeWidth: '1',
                stroke: 'black',
                fill: color,
                transform: forward ? null : "translate(" + width + ",0) scale(-1,1) ",
                d: path }),
            _react2.default.createElement(
                'text',
                { style: { fill: 'black', fontSize: '.75em' }, transform: 'translate(' + textOffset + ',' + (height - 2) + ')' },
                nameToDisplay
            )
        );
    }
});
exports.default = Feature;
module.exports = exports['default'];