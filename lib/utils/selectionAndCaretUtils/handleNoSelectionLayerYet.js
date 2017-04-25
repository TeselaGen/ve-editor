'use strict';

exports.__esModule = true;
exports.default = handleNoSelectionLayerYet;

var _normalizePositionByRangeLength = require('ve-range-utils/normalizePositionByRangeLength');

var _normalizePositionByRangeLength2 = _interopRequireDefault(_normalizePositionByRangeLength);

var _getRangeLength = require('ve-range-utils/getRangeLength');

var _getRangeLength2 = _interopRequireDefault(_getRangeLength);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleNoSelectionLayerYet(_ref) {
    var caretPosition = _ref.caretPosition,
        selectionLayerUpdate = _ref.selectionLayerUpdate,
        nearestCaretPos = _ref.nearestCaretPos,
        sequenceLength = _ref.sequenceLength;

    //no selection layer yet, so we'll start one if necessary
    // 0 1 2 3 4 5 6 7 8 9
    //    c 
    //        n 
    //
    var dragEnd = {
        start: caretPosition,
        end: (0, _normalizePositionByRangeLength2.default)(nearestCaretPos - 1, sequenceLength, true)
    };
    var dragStart = {
        start: nearestCaretPos,
        end: (0, _normalizePositionByRangeLength2.default)(caretPosition - 1, sequenceLength, true)
    };
    if (caretPosition === nearestCaretPos) {
        return; // do nothing because nearestCaretPos === caretPosition
    } else if ((0, _getRangeLength2.default)(dragEnd, sequenceLength) < (0, _getRangeLength2.default)(dragStart, sequenceLength)) {
        selectionLayerUpdate(dragEnd);
    } else {
        selectionLayerUpdate(dragStart);
    }
}
module.exports = exports['default'];