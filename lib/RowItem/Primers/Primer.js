'use strict';

exports.__esModule = true;

var _getAnnotationNameAndStartStopString = require('../../utils/getAnnotationNameAndStartStopString');

var _getAnnotationNameAndStartStopString2 = _interopRequireDefault(_getAnnotationNameAndStartStopString);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Primer(props) {
    var widthInBps = props.widthInBps,
        charWidth = props.charWidth,
        height = props.height,
        rangeType = props.rangeType,
        forward = props.forward,
        name = props.name,
        _props$pointiness = props.pointiness,
        pointiness = _props$pointiness === undefined ? 8 : _props$pointiness,
        _props$fontWidth = props.fontWidth,
        fontWidth = _props$fontWidth === undefined ? 9 : _props$fontWidth,
        _props$color = props.color,
        color = _props$color === undefined ? 'orange' : _props$color,
        primerClicked = props.primerClicked,
        primerRightClicked = props.primerRightClicked,
        annotation = props.annotation;


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
    // starting from the top left of the primer
    if (rangeType === 'middle') {
        //draw a rectangle
        path = '\n        M 0,0 \n        L ' + (width - pointiness / 2) + ',0\n        Q ' + (width + pointiness / 2) + ',' + height / 2 + ' ' + (width - pointiness / 2) + ',' + height + '\n        L ' + 0 + ',' + height + '\n        Q ' + pointiness + ',' + height / 2 + ' ' + 0 + ',' + 0 + '\n        z';
    } else if (rangeType === 'start') {
        path = '\n        M 0,0 \n        L ' + (width - pointiness / 2) + ',0 \n        Q ' + (width + pointiness / 2) + ',' + height / 2 + ' ' + (width - pointiness / 2) + ',' + height + '\n        L 0,' + height + ' \n        z';
    } else if (rangeType === 'beginningAndEnd') {
        path = '\n        M 0,0 \n        L ' + widthMinusOne + ',0 \n        L ' + width + ',' + height / 2 + ' \n        L ' + widthMinusOne + ',' + height + ' \n        L 0,' + height + ' \n        z';
    } else {
        path = '\n      M 0,0 \n      L ' + widthMinusOne + ',0 \n      L ' + width + ',' + height / 2 + ' \n      L ' + widthMinusOne + ',' + height + ' \n      L 0,' + height + ' \n      Q ' + pointiness + ',' + height / 2 + ' ' + 0 + ',' + 0 + '\n      z';
    }

    function getTextWidth(text, font) {
        // re-use canvas object for better performance
        var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
        var context = canvas.getContext("2d");
        context.font = font;
        var metrics = context.measureText(text);
        return metrics.width;
    }
    var textLength = getTextWidth(name, 'normal 10pt Maven Pro');
    var nameToDisplay = name;
    // var textLength = name.length * fontWidth
    var textOffset = rangeType === 'end' && !forward ? 14 : 6;
    if (textLength - 30 > widthMinusOne) {
        textOffset = 0;
        nameToDisplay = '';
    }
    // path=path.replace(/ /g,'')
    // path=path.replace(/\n/g,'')
    return _react2.default.createElement(
        'g',
        {
            className: 'veRowViewPrimer clickable',
            onClick: function onClick(event) {
                primerClicked({ annotation: annotation, event: event });
            },
            onContextMenu: function onContextMenu(event) {
                primerRightClicked({ annotation: annotation, event: event });
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
            { style: { fill: 'black', fontSize: '10px' }, transform: 'translate(' + textOffset + ',' + (height - 2) + ')' },
            nameToDisplay
        )
    );
}

process.env.NODE_ENV !== "production" ? Primer.propTypes = {
    widthInBps: _propTypes2.default.number.isRequired,
    charWidth: _propTypes2.default.number.isRequired,
    height: _propTypes2.default.number.isRequired,
    rangeType: _propTypes2.default.string.isRequired,
    name: _propTypes2.default.string.isRequired,
    forward: _propTypes2.default.bool.isRequired,
    primerClicked: _propTypes2.default.func.isRequired
} : void 0;

exports.default = Primer;
module.exports = exports['default'];