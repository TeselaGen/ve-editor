import _getRangeAngles from 've-range-utils/getRangeAngles';
export default function getRangeAnglesSpecial() {
    var _getRangeAngles$apply = _getRangeAngles.apply(this, arguments),
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