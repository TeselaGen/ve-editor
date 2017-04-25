'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = updateSelectionOrCaret;

var _getRangeLength = require('ve-range-utils/getRangeLength');

var _getRangeLength2 = _interopRequireDefault(_getRangeLength);

var _checkIfPotentiallyCircularRangesOverlap = require('ve-range-utils/checkIfPotentiallyCircularRangesOverlap');

var _checkIfPotentiallyCircularRangesOverlap2 = _interopRequireDefault(_checkIfPotentiallyCircularRangesOverlap);

var _expandOrContractRangeToPosition = require('ve-range-utils/expandOrContractRangeToPosition');

var _expandOrContractRangeToPosition2 = _interopRequireDefault(_expandOrContractRangeToPosition);

var _trimRangeByAnotherRange = require('ve-range-utils/trimRangeByAnotherRange');

var _trimRangeByAnotherRange2 = _interopRequireDefault(_trimRangeByAnotherRange);

var _normalizePositionByRangeLength = require('ve-range-utils/normalizePositionByRangeLength');

var _normalizePositionByRangeLength2 = _interopRequireDefault(_normalizePositionByRangeLength);

var _handleNoSelectionLayerYet = require('./handleNoSelectionLayerYet');

var _handleNoSelectionLayerYet2 = _interopRequireDefault(_handleNoSelectionLayerYet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function updateSelectionOrCaret(_ref) {
    var shiftHeld = _ref.shiftHeld,
        sequenceLength = _ref.sequenceLength,
        newRangeOrCaret = _ref.newRangeOrCaret,
        caretPosition = _ref.caretPosition,
        selectionLayer = _ref.selectionLayer,
        selectionLayerUpdate = _ref.selectionLayerUpdate,
        caretPositionUpdate = _ref.caretPositionUpdate;

    var newCaret;
    var newRange;
    if ((typeof newRangeOrCaret === 'undefined' ? 'undefined' : _typeof(newRangeOrCaret)) !== 'object') {
        newCaret = newRangeOrCaret;
    } else {
        newRange = newRangeOrCaret;
    }
    if (shiftHeld) {
        if (caretPosition > 0) {
            //there is a caret already down
            if (newCaret > -1) {
                //a new caret is being passed
                (0, _handleNoSelectionLayerYet2.default)({
                    caretPosition: caretPosition,
                    selectionLayer: selectionLayer,
                    selectionLayerUpdate: selectionLayerUpdate,
                    nearestCaretPos: newCaret,
                    sequenceLength: sequenceLength
                });
                // if (newCaret === caretPosition) {
                //     //do nothing
                //     return 
                // }
                // isRangeShorterIfFlipped(newCaret,caretPosition, sequenceLength)
                //     ? selectionLayerUpdate(caretPosition, newCaret)
                //     : selectionLayerUpdate(caretPosition, newCaret)
            } else {
                simpleUpdate();
            }
        } else if (selectionLayer.start > 0) {
            //there is already a selection layer
            if (newCaret > -1) {
                //new caret passed
                var distanceFromStart = getMinRangeLength(selectionLayer.start, newCaret, sequenceLength);
                var distanceFromEnd = getMinRangeLength(selectionLayer.end, newCaret, sequenceLength);
                if (distanceFromStart < distanceFromEnd) {
                    selectionLayerUpdate({
                        start: newCaret,
                        end: selectionLayer.end
                    });
                } else {
                    selectionLayerUpdate({
                        start: selectionLayer.start,
                        end: (0, _normalizePositionByRangeLength2.default)(newCaret - 1, sequenceLength, true)
                    });
                }
            } else {
                //new range passed
                var selectionFullyContained = !(0, _trimRangeByAnotherRange2.default)(selectionLayer, newRange);
                if (selectionFullyContained) {
                    return selectionLayerUpdate(newRange);
                }

                var newRangeFullyContained = !(0, _trimRangeByAnotherRange2.default)(newRange, selectionLayer);

                var _expandOrContractRang = (0, _expandOrContractRangeToPosition2.default)(selectionLayer, newRange.start, sequenceLength),
                    range1 = _expandOrContractRang.newRange;

                var _expandOrContractRang2 = (0, _expandOrContractRangeToPosition2.default)(selectionLayer, newRange.end + 1, sequenceLength),
                    range2 = _expandOrContractRang2.newRange; //+1 to go from range end to position 


                var range1Shorter = (0, _getRangeLength2.default)(range1) < (0, _getRangeLength2.default)(range2);

                if (newRangeFullyContained) {
                    range1Shorter ? selectionLayerUpdate(range1) : selectionLayerUpdate(range2);
                } else {
                    range1Shorter ? selectionLayerUpdate(range2) : selectionLayerUpdate(range1);
                }
            }
        } else {
            //no caret, no selection, so just do a simple update
            simpleUpdate();
        }
    } else {
        //no shift held, so just update the selection or caret
        simpleUpdate();
    }
    function simpleUpdate() {
        //shift not held, so just make a new selection layer or move the caret
        if (newCaret > -1) {
            caretPositionUpdate(newCaret);
        } else {
            selectionLayerUpdate(newRange);
        }
    }
}

function isRangeShorterIfFlipped(start, end, sequenceLength) {
    return (0, _getRangeLength2.default)({ start: start, end: end }, sequenceLength) < (0, _getRangeLength2.default)({ start: end, end: start }, sequenceLength) ? false : true;
}

function getMinRangeLength(start, end, sequenceLength) {
    var range1 = (0, _getRangeLength2.default)({ start: start, end: end }, sequenceLength);
    var range2 = (0, _getRangeLength2.default)({ start: end, end: start }, sequenceLength);
    return range1 < range2 ? range1 : range2;
}
module.exports = exports['default'];