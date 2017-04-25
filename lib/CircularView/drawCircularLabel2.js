'use strict';

exports.__esModule = true;
exports.default = drawCircularLabel2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _shouldFlipText = require('./shouldFlipText');

var _shouldFlipText2 = _interopRequireDefault(_shouldFlipText);

var _path = require('paths-js/path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function polarToSpecialCartesian(radius, angleInRadians) {
    //the 0 angle returns the 0,1 point on the unit circle instead of the 1,0 point like normal
    return {
        x: radius * Math.cos(angleInRadians - Math.PI / 2),
        y: radius * Math.sin(angleInRadians - Math.PI / 2)
    };
}

// draws a directed piece of the pie with an arrowhead, starts at 0 angle, only draws in one direction (use transforms to move it around the ) 
function drawArc(_ref) {
    var flip = _ref.flip,
        _ref$tailThickness = _ref.tailThickness,
        tailThickness = _ref$tailThickness === undefined ? .6 : _ref$tailThickness,
        _ref$arrowheadLength = _ref.arrowheadLength,
        arrowheadLength = _ref$arrowheadLength === undefined ? 1 : _ref$arrowheadLength,
        radius = _ref.radius,
        height = _ref.height;

    var tailHeight = height * tailThickness;
    var totalAngle = Math.PI * 2 - .000001;
    var tailInnerRadius = radius - tailHeight / 2;

    // var arrowheadAngle = totalAngle / 2
    var arrowheadAngle = arrowheadLength / (Math.PI * 2);

    if (totalAngle < arrowheadAngle) {
        //set arrowhead length to the angle in radians length
        arrowheadAngle = totalAngle;
    }
    var arcAngle = totalAngle - arrowheadAngle;

    //the main points we need to draw the arrow and in the order we draw them in:
    var arcLeftBottom = polarToSpecialCartesian(tailInnerRadius, arrowheadAngle);
    var arcRightBottom = polarToSpecialCartesian(tailInnerRadius, totalAngle);

    var largeArcFlag = arcAngle > Math.PI ? 1 : 0;
    var path;
    if (!flip) {
        path = (0, _path2.default)().moveto(arcLeftBottom.x, arcLeftBottom.y).arc({ rx: tailInnerRadius, ry: tailInnerRadius, xrot: 0, largeArcFlag: largeArcFlag, sweepFlag: 1, x: arcRightBottom.x, y: arcRightBottom.y });
    } else {
        path = (0, _path2.default)().moveto(arcRightBottom.x, arcRightBottom.y).arc({ rx: tailInnerRadius, ry: tailInnerRadius, xrot: 0, largeArcFlag: largeArcFlag, sweepFlag: 0, x: arcLeftBottom.x, y: arcLeftBottom.y });
    }
    return path;
}

function drawCircularLabel2(_ref2) {
    var centerAngle = _ref2.centerAngle,
        _ref2$fontSize = _ref2.fontSize,
        fontSize = _ref2$fontSize === undefined ? '12px' : _ref2$fontSize,
        radius = _ref2.radius,
        height = _ref2.height,
        text = _ref2.text,
        id = _ref2.id;

    return _react2.default.createElement(
        'g',
        null,
        _react2.default.createElement('path', {
            key: 'labelPath',
            fill: 'none'
            // stroke='red'
            // strokeWidth='4px'
            , d: drawArc({
                flip: (0, _shouldFlipText2.default)(centerAngle),
                radius: radius,
                height: height,
                tailThickness: 1 //feature specific
            }).print()
            // d={`
            //     M 0 0
            //     m -${radius}}, 0
            //     a ${radius}},${radius}} 0 1,1 (${radius * 2}} ),0
            //     a ${radius}},${radius}} 0 1,1 -(${radius * 2}} ),0
            // `}
            // M cx cy
            // m -r, 0
            // a r,r 0 1,1 (r * 2),0
            // a r,r 0 1,1 -(r * 2),0
            , id: id + '-featureInlineLabel' }),
        ',',
        _react2.default.createElement(
            'text',
            {
                key: 'labelText',
                stroke: 'black',
                fontSize: fontSize,
                textAnchor: 'middle',
                dy: (0, _shouldFlipText2.default)(centerAngle) ? 11 : -3
            },
            _react2.default.createElement(
                'textPath',
                {

                    // ref={(node) => {
                    //        node && node.setAttribute("startOffset", '50%')
                    //      }}
                    xlinkHref: '#' + id + '-featureInlineLabel',
                    startOffset: "50%"
                },
                text
            )
        )
    );
}
module.exports = exports['default'];