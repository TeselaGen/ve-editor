'use strict';

exports.__esModule = true;
exports.default = calculateTickMarkPositionsForGivenRange;

var _normalizePositionByRangeLength = require('ve-range-utils/normalizePositionByRangeLength');

var _normalizePositionByRangeLength2 = _interopRequireDefault(_normalizePositionByRangeLength);

var _getRangeLength = require('ve-range-utils/getRangeLength');

var _getRangeLength2 = _interopRequireDefault(_getRangeLength);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function calculateTickMarkPositionsForGivenRange(_ref) {
    var tickSpacing = _ref.tickSpacing,
        range = _ref.range,
        sequenceLength = _ref.sequenceLength;


    var rangeLength = (0, _getRangeLength2.default)(range, sequenceLength);

    var firstTickOffsetFromRangeStart;
    if (range.start > range.end) {
        // range spans origin, so make sure the 0 bp is included!
        firstTickOffsetFromRangeStart = (sequenceLength - range.start) % tickSpacing + 1;
    } else {
        firstTickOffsetFromRangeStart = tickSpacing - range.start % tickSpacing;
    }
    var tickMarks = [];
    if (range.start === 0) tickMarks.push(0);
    for (var tick = firstTickOffsetFromRangeStart - 1; tick < rangeLength; tick += tickSpacing) {
        tickMarks.push((0, _normalizePositionByRangeLength2.default)(tick, sequenceLength));
    }
    return tickMarks;
};
module.exports = exports['default'];