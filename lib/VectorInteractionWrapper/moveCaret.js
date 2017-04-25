"use strict";

exports.__esModule = true;
var handleMoves = {
    moveCaretLeftOne: function moveCaretLeftOne(_ref) {
        var selectionLayer = _ref.selectionLayer,
            shiftHeld = _ref.shiftHeld;

        if (selectionLayer.start > -1 && !shiftHeld) {
            return 0;
        }
        return -1;
    },
    moveCaretRightOne: function moveCaretRightOne(_ref2) {
        var selectionLayer = _ref2.selectionLayer,
            shiftHeld = _ref2.shiftHeld;

        if (selectionLayer.start > -1 && !shiftHeld) {
            return 0;
        }
        return 1;
    },
    moveCaretUpARow: function moveCaretUpARow(_ref3) {
        var bpsPerRow = _ref3.bpsPerRow;

        return -bpsPerRow;
    },
    moveCaretDownARow: function moveCaretDownARow(_ref4) {
        var bpsPerRow = _ref4.bpsPerRow;

        return bpsPerRow;
    },
    moveCaretToEndOfRow: function moveCaretToEndOfRow(_ref5) {
        var bpsPerRow = _ref5.bpsPerRow,
            caretPosition = _ref5.caretPosition;

        return bpsPerRow - caretPosition % bpsPerRow;
    },
    moveCaretToStartOfRow: function moveCaretToStartOfRow(_ref6) {
        var bpsPerRow = _ref6.bpsPerRow,
            caretPosition = _ref6.caretPosition;

        var moveBy = -caretPosition % bpsPerRow;
        if (moveBy === 0) {
            moveBy = -bpsPerRow;
        }
        return moveBy;
    },
    moveCaretToStartOfSequence: function moveCaretToStartOfSequence(_ref7) {
        var caretPosition = _ref7.caretPosition;

        return -caretPosition;
    },
    moveCaretToEndOfSequence: function moveCaretToEndOfSequence(_ref8) {
        var caretPosition = _ref8.caretPosition,
            sequenceLength = _ref8.sequenceLength;

        return sequenceLength - caretPosition;
    }
};

function moveCaret(_ref9) {
    var sequenceLength = _ref9.sequenceLength,
        bpsPerRow = _ref9.bpsPerRow,
        caretPosition = _ref9.caretPosition,
        selectionLayer = _ref9.selectionLayer,
        shiftHeld = _ref9.shiftHeld,
        type = _ref9.type;

    var moveBy = handleMoves[type]({ shiftHeld: shiftHeld, sequenceLength: sequenceLength, bpsPerRow: bpsPerRow, caretPosition: caretPosition, selectionLayer: selectionLayer });
    return moveBy;
}

exports.default = moveCaret;
module.exports = exports["default"];