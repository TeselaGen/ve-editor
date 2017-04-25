'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = PositionAnnotationOnCircle;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function PositionAnnotationOnCircle(_ref) {
    var children = _ref.children,
        _ref$height = _ref.height,
        height = _ref$height === undefined ? 0 : _ref$height,
        _ref$sAngle = _ref.sAngle,
        sAngle = _ref$sAngle === undefined ? 0 : _ref$sAngle,
        _ref$eAngle = _ref.eAngle,
        eAngle = _ref$eAngle === undefined ? 0 : _ref$eAngle,
        _ref$forward = _ref.forward,
        forward = _ref$forward === undefined ? true : _ref$forward,
        rest = _objectWithoutProperties(_ref, ['children', 'height', 'sAngle', 'eAngle', 'forward']);

    var sAngleDegs = sAngle * 360 / Math.PI / 2;
    var eAngleDegs = eAngle * 360 / Math.PI / 2;
    var transform;
    if (forward) {
        transform = 'translate(0,' + -height + ') rotate(' + sAngleDegs + ',0,' + height + ')';
    } else {
        transform = 'scale(-1,1) translate(0,' + -height + ') rotate(' + -eAngleDegs + ',0,' + height + ') ';
    }
    var props = _extends({ transform: transform }, rest);
    return _react2.default.cloneElement(children, props);
}
module.exports = exports['default'];