'use strict';

exports.__esModule = true;
exports.default = getXStartAndWidthOfRangeWrtRow;

var _normalizePositionByRangeLength = require('ve-range-utils/normalizePositionByRangeLength');

var _normalizePositionByRangeLength2 = _interopRequireDefault(_normalizePositionByRangeLength);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getXStartAndWidthOfRangeWrtRow(range, row, bpsPerRow, charWidth, sequenceLength) {
    var xStart = (0, _normalizePositionByRangeLength2.default)(range.start - row.start, sequenceLength) * charWidth;
    var obj = {
        xStart: xStart,
        width: (0, _normalizePositionByRangeLength2.default)(range.end + 1 - range.start, sequenceLength + 1) * charWidth
    };
    if (xStart > bpsPerRow * charWidth) debugger;
    return obj;
} // import getOverlapsOfPotentiallyCircularRanges from 've-range-utils/getOverlapsOfPotentiallyCircularRanges';
// import normalizePositionByRangeLength from 've-range-utils/normalizePositionByRangeLength';
// module.exports = function getXStartAndWidthOfRangeWrtRow(range, row, bpsPerRow, charWidth, sequenceLength) {
//     var overlaps = getOverlapsOfPotentiallyCircularRanges(range, row, sequenceLength);
//     return overlaps.map(function (overlap) {
//     	return {
//     		...overlap,
//         	xStart: normalizePositionByRangeLength(overlap.start - row.start, sequenceLength) * charWidth,
//         	width: (normalizePositionByRangeLength(range.end + 1 - range.start, sequenceLength)) * charWidth,

//     	}
//     })
// };

;
module.exports = exports['default'];