'use strict';

exports.__esModule = true;
exports.default = drawArc;

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
        height = _ref.height,
        totalAngle = _ref.totalAngle;

    var tailHeight = height * tailThickness;

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
module.exports = exports['default'];