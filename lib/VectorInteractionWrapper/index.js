'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _getSequenceWithinRange = require('ve-range-utils/getSequenceWithinRange');

var _getSequenceWithinRange2 = _interopRequireDefault(_getSequenceWithinRange);

var _Clipboard = require('./Clipboard');

var _Clipboard2 = _interopRequireDefault(_Clipboard);

var _updateSelectionOrCaret = require('../utils/selectionAndCaretUtils/updateSelectionOrCaret');

var _updateSelectionOrCaret2 = _interopRequireDefault(_updateSelectionOrCaret);

var _normalizePositionByRangeLength = require('ve-range-utils/normalizePositionByRangeLength');

var _normalizePositionByRangeLength2 = _interopRequireDefault(_normalizePositionByRangeLength);

var _getRangeLength = require('ve-range-utils/getRangeLength');

var _getRangeLength2 = _interopRequireDefault(_getRangeLength);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draggableClassnames = require('../constants/draggableClassnames');

var _draggableClassnames2 = _interopRequireDefault(_draggableClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function noop() {}
var draggingEnd = false;
var dragInProgress = false;
var caretPositionOnDragStart;
var selectionStartGrabbed;
var selectionEndGrabbed;

var VectorInteractionWrapper = function (_React$Component) {
    _inherits(VectorInteractionWrapper, _React$Component);

    function VectorInteractionWrapper() {
        _classCallCheck(this, VectorInteractionWrapper);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    VectorInteractionWrapper.prototype.handlePaste = function handlePaste(event) {
        //tnr: commenting paste handling out for the time being
        // var {
        //     handlePaste=noop,
        // } = this.props
        // event.clipboardData.items[0].getAsString(function(clipboardString) {
        //     handlePaste({sequenceString:clipboardString});
        // });
    };

    VectorInteractionWrapper.prototype.render = function render() {
        var _this2 = this;

        var _props = this.props,
            caretPosition = _props.caretPosition,
            selectionLayer = _props.selectionLayer,
            sequenceData = _props.sequenceData,
            _props$handleCopy = _props.handleCopy,
            handleCopy = _props$handleCopy === undefined ? noop : _props$handleCopy;
        //do this in two steps to determine propsToPass

        var _props2 = this.props,
            children = _props2.children,
            _props2$disableEditor = _props2.disableEditorClickAndDrag,
            disableEditorClickAndDrag = _props2$disableEditor === undefined ? false : _props2$disableEditor,
            propsToPass = _objectWithoutProperties(_props2, ['children', 'disableEditorClickAndDrag']);

        var selectedBps = (0, _getSequenceWithinRange2.default)(selectionLayer, sequenceData.sequence);

        var selectionLayerUpdate = function selectionLayerUpdate(_ref) {
            var start = _ref.start,
                end = _ref.end;

            if (selectionLayer.start === start && selectionLayer.end === end) {
                return;
            }
            //we only call selectionLayerUpdate if we're actually changing something
            _this2.props.selectionLayerUpdate({
                start: start,
                end: end
            });
        };
        var caretPositionUpdate = function caretPositionUpdate(position) {
            if (caretPosition === position) {
                return;
            }
            //we only call caretPositionUpdate if we're actually changing something
            _this2.props.caretPositionUpdate(position);
        };

        var sequenceLength = sequenceData.sequence.length;

        if (!disableEditorClickAndDrag) {
            propsToPass = _extends({}, propsToPass, {
                editorDragged: function editorDragged(_ref2) {
                    var nearestCaretPos = _ref2.nearestCaretPos;

                    if (!dragInProgress) {
                        //we're starting the drag, so update the caret position!
                        if (!selectionStartGrabbed && !selectionEndGrabbed) {
                            //we're not dragging the caret or selection handles
                            caretPositionUpdate(nearestCaretPos);
                        }
                        dragInProgress = true;
                        return;
                    }
                    if (selectionStartGrabbed) {
                        handleSelectionStartGrabbed({
                            caretPosition: caretPosition,
                            selectionLayer: selectionLayer,
                            selectionLayerUpdate: selectionLayerUpdate,
                            nearestCaretPos: nearestCaretPos,
                            sequenceLength: sequenceLength
                        });
                    } else if (selectionEndGrabbed) {
                        handleSelectionEndGrabbed({
                            caretPosition: caretPosition,
                            selectionLayer: selectionLayer,
                            selectionLayerUpdate: selectionLayerUpdate,
                            nearestCaretPos: nearestCaretPos,
                            sequenceLength: sequenceLength
                        });
                    }
                    // else if (caretGrabbed) {
                    //     handleCaretDrag({
                    //         caretPosition,
                    //         selectionLayer,
                    //         selectionLayerUpdate,
                    //         nearestCaretPos,
                    //         sequenceLength
                    //     })
                    // } 
                    else {
                            //dragging somewhere within the sequence
                            //pass the caret position of the drag start
                            handleCaretDrag({
                                caretPosition: caretPositionOnDragStart,
                                selectionLayer: selectionLayer,
                                selectionLayerUpdate: selectionLayerUpdate,
                                nearestCaretPos: nearestCaretPos,
                                sequenceLength: sequenceLength
                            });
                        }
                },
                editorDragStarted: function editorDragStarted(opts) {
                    caretPositionOnDragStart = opts.nearestCaretPos; //bump the drag counter
                    selectionStartGrabbed = opts.selectionStartGrabbed;
                    selectionEndGrabbed = opts.selectionEndGrabbed;
                },
                editorClicked: function editorClicked(_ref3) {
                    var nearestCaretPos = _ref3.nearestCaretPos,
                        shiftHeld = _ref3.shiftHeld;

                    if (!dragInProgress) {
                        //we're not dragging the caret or selection handles
                        (0, _updateSelectionOrCaret2.default)({ shiftHeld: shiftHeld, sequenceLength: sequenceLength, newRangeOrCaret: nearestCaretPos, caretPosition: caretPosition, selectionLayer: selectionLayer, selectionLayerUpdate: selectionLayerUpdate, caretPositionUpdate: caretPositionUpdate });
                    }
                },
                editorDragStopped: function editorDragStopped() {
                    setTimeout(function () {
                        dragInProgress = false;
                    });
                }
            });
        }
        return _react2.default.createElement(
            'div',
            { ref: function ref(c) {
                    return _this2.veVectorInteractionWrapper = c;
                }, className: 'veVectorInteractionWrapper' },
            _react2.default.createElement(_Clipboard2.default, {
                value: selectedBps,
                onCopy: handleCopy,
                onPaste: this.handlePaste.bind(this)
            }),
            _react2.default.cloneElement(children, { veWrapperProvidedProps: propsToPass })
        );
    };

    return VectorInteractionWrapper;
}(_react2.default.Component);

exports.default = VectorInteractionWrapper;


function handleSelectionStartGrabbed(_ref4) {
    var caretPosition = _ref4.caretPosition,
        selectionLayer = _ref4.selectionLayer,
        selectionLayerUpdate = _ref4.selectionLayerUpdate,
        nearestCaretPos = _ref4.nearestCaretPos,
        sequenceLength = _ref4.sequenceLength;

    if (selectionLayer.start < 0) {
        handleNoSelectionLayerYet({
            caretPosition: caretPosition,
            selectionLayer: selectionLayer,
            selectionLayerUpdate: selectionLayerUpdate,
            nearestCaretPos: nearestCaretPos,
            sequenceLength: sequenceLength
        });
    } else {
        //there must be a selection layer
        //we need to move the selection layer
        selectionLayerUpdate({
            start: nearestCaretPos,
            end: selectionLayer.end
        });
    }
}
function handleSelectionEndGrabbed(_ref5) {
    var caretPosition = _ref5.caretPosition,
        selectionLayer = _ref5.selectionLayer,
        selectionLayerUpdate = _ref5.selectionLayerUpdate,
        nearestCaretPos = _ref5.nearestCaretPos,
        sequenceLength = _ref5.sequenceLength;

    if (selectionLayer.start < 0) {
        handleNoSelectionLayerYet({
            caretPosition: caretPosition,
            selectionLayerUpdate: selectionLayerUpdate,
            nearestCaretPos: nearestCaretPos,
            sequenceLength: sequenceLength
        });
    } else {
        //there must be a selection layer                  
        //we need to move the selection layer
        var newEnd = (0, _normalizePositionByRangeLength2.default)(nearestCaretPos - 1, sequenceLength);
        selectionLayerUpdate({
            start: selectionLayer.start,
            end: newEnd
        });
    }
}
function handleNoSelectionLayerYet(_ref6) {
    var caretPosition = _ref6.caretPosition,
        selectionLayerUpdate = _ref6.selectionLayerUpdate,
        nearestCaretPos = _ref6.nearestCaretPos,
        sequenceLength = _ref6.sequenceLength;

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
        draggingEnd = true; //the caret becomes the "selection end"
        selectionLayerUpdate(dragEnd);
    } else {
        draggingEnd = false; //the caret becomes the "selection end"
        selectionLayerUpdate(dragStart);
    }
}
function handleCaretDrag(_ref7) {
    var caretPosition = _ref7.caretPosition,
        selectionLayer = _ref7.selectionLayer,
        selectionLayerUpdate = _ref7.selectionLayerUpdate,
        nearestCaretPos = _ref7.nearestCaretPos,
        sequenceLength = _ref7.sequenceLength;

    if (selectionLayer.start > -1) {
        //there is a selection layer
        draggingEnd ? handleSelectionEndGrabbed({
            caretPosition: caretPosition,
            selectionLayer: selectionLayer,
            selectionLayerUpdate: selectionLayerUpdate,
            nearestCaretPos: nearestCaretPos,
            sequenceLength: sequenceLength
        }) : handleSelectionStartGrabbed({
            caretPosition: caretPosition,
            selectionLayer: selectionLayer,
            selectionLayerUpdate: selectionLayerUpdate,
            nearestCaretPos: nearestCaretPos,
            sequenceLength: sequenceLength
        });
    } else if (caretPosition > -1) {
        handleNoSelectionLayerYet({
            caretPosition: caretPosition,
            selectionLayer: selectionLayer,
            selectionLayerUpdate: selectionLayerUpdate,
            nearestCaretPos: nearestCaretPos,
            sequenceLength: sequenceLength
        });
    } else {
        console.warn('we should never be here...');
    }
}
module.exports = exports['default'];