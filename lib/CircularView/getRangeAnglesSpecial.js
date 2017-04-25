'use strict';

exports.__esModule = true;
exports.default = getRangeAnglesSpecial;

var _getRangeAngles2 = require('ve-range-utils/getRangeAngles');

var _getRangeAngles3 = _interopRequireDefault(_getRangeAngles2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getRangeAnglesSpecial() {
    var _getRangeAngles$apply = _getRangeAngles3.default.apply(this, arguments),
        startAngle = _getRangeAngles$apply.startAngle,
        endAngle = _getRangeAngles$apply.endAngle,
        totalAngle = _getRangeAngles$apply.totalAngle,
        centerAngle = _getRangeAngles$apply.centerAngle;

    return {
        startAngle: startAngle,
        endAngle: endAngle - 0.00001, //we subtract a tiny amount because an angle of 2PI will cause nothing to be drawn!
        totalAngle: totalAngle - 0.00001, //we subtract a tiny amount because we don't want the range comparisons to treat the same angle as overlapping
        centerAngle: centerAngle
    };
}
module.exports = exports['default'];