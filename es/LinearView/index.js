var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import draggableClassnames from '../constants/draggableClassnames';
import some from 'lodash/some';
import moveCaret from '../VectorInteractionWrapper/moveCaret';
import handleCaretMoved from '../VectorInteractionWrapper/handleCaretMoved';
import prepareRowData from '../utils/prepareRowData';
import React from 'react';
import Draggable from 'react-draggable';
import RowItem from '../RowItem';
import './style.css';

var defaultCharWidth = 12;
var defaultMarginWidth = 10;
import Combokeys from 'combokeys';
var combokeys;

function noop() {}

var LinearView = function (_React$Component) {
    _inherits(LinearView, _React$Component);

    function LinearView() {
        _classCallCheck(this, LinearView);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    LinearView.prototype.getNearestCursorPositionToMouseEvent = function getNearestCursorPositionToMouseEvent(rowData, event, callback) {
        var _props$veWrapperProvi = _extends({}, this.props.veWrapperProvidedProps, this.props),
            _props$veWrapperProvi2 = _props$veWrapperProvi.charWidth,
            charWidth = _props$veWrapperProvi2 === undefined ? defaultCharWidth : _props$veWrapperProvi2;

        var rowNotFound = true;
        //loop through all the rendered rows to see if the click event lands in one of them
        var nearestCaretPos = 0;
        var rowDomNode = this.linearView;
        var boundingRowRect = rowDomNode.getBoundingClientRect();
        if (event.clientY > boundingRowRect.top && event.clientY < boundingRowRect.top + boundingRowRect.height) {
            //then the click is falls within this row
            rowNotFound = false;
            var row = rowData[0];
            if (event.clientX - boundingRowRect.left < 0) {
                nearestCaretPos = row.start;
            } else {
                var clickXPositionRelativeToRowContainer = event.clientX - boundingRowRect.left;
                var numberOfBPsInFromRowStart = Math.floor((clickXPositionRelativeToRowContainer + charWidth / 2) / charWidth);
                nearestCaretPos = numberOfBPsInFromRowStart + row.start;
                if (nearestCaretPos > row.end + 1) {
                    nearestCaretPos = row.end + 1;
                }
            }
            return true; //break the loop early because we found the row the click event landed in
        }

        if (rowNotFound) {
            var _rowDomNode$getBoundi = rowDomNode.getBoundingClientRect(),
                top = _rowDomNode$getBoundi.top,
                bottom = _rowDomNode$getBoundi.bottom;

            var numbers = [top, bottom];
            var target = event.clientY;
            var topOrBottom = numbers.map(function (value, index) {
                return [Math.abs(value - target), index];
            }).sort().map(function (value) {
                return numbers[value[1]];
            })[0];

            nearestCaretPos = 0;
        }

        callback({
            shiftHeld: event.shiftKey,
            nearestCaretPos: nearestCaretPos,
            caretGrabbed: event.target.className === "cursor",
            selectionStartGrabbed: event.target.classList.contains(draggableClassnames.selectionStart),
            selectionEndGrabbed: event.target.classList.contains(draggableClassnames.selectionEnd)
        });
    };

    // componentDidMount() {
    //     var {
    //         sequenceDataInserted=noop,
    //         backspacePressed=noop,
    //         selectAll=noop,
    //         selectInverse=noop,
    //     } = {...this.props.veWrapperProvidedProps, ...this.props};

    //     // combokeys = new Combokeys(document.documentElement);
    //     // if (!this.linearView) {
    //     //     console.warn('thomas yargh1!@#!@#!@#')
    //     // }
    //     combokeys = new Combokeys(this.linearView);
    //     // bindGlobalPlugin(combokeys);
    //     var self = this

    //     //bind a bunch of keyboard shortcuts we're interested in catching
    //     //we're using the "mousetrap" library (available thru npm: https://www.npmjs.com/package/br-mousetrap)
    //     //documentation: https://craig.is/killing/mice
    //     combokeys.bind(['a', 'b', 'c', 'd', 'g', 'h', 'k', 'm', 'n', 'r', 's', 't', 'v', 'w', 'y'], function(event) { // type in bases
    //         sequenceDataInserted({newSequenceData: {sequence: String.fromCharCode(event.charCode)}});
    //     });

    //     var moveCaretBindings = [
    //         { keyCombo: ['left','shift+left'] ,type: 'moveCaretLeftOne'},
    //         { keyCombo: ['right','shift+right'] ,type: 'moveCaretRightOne'},
    //         { keyCombo: ['up','shift+up']  ,type: 'moveCaretUpARow'},
    //         { keyCombo: ['down','shift+down'] ,type: 'moveCaretDownARow'},
    //         { keyCombo: ['mod+right','mod+shift+right'] ,type: 'moveCaretToEndOfRow'},
    //         { keyCombo: ['mod+left','mod+shift+left'] ,type: 'moveCaretToStartOfRow'},
    //         { keyCombo: ['mod+up','mod+shift+up'] ,type: 'moveCaretToStartOfSequence'},
    //         { keyCombo: ['mod+down','mod+shift+down'] ,type: 'moveCaretToEndOfSequence'},
    //     ]

    //     moveCaretBindings.forEach(function ({keyCombo, type}) {
    //         combokeys.bind(keyCombo, function (event) {
    //             var shiftHeld = event.shiftKey;
    //             var bpsPerRow = getBpsPerRow(self.props)
    //             var {selectionLayer, caretPosition, sequenceLength, circular, caretPositionUpdate, selectionLayerUpdate} = self.props
    //             var moveBy = moveCaret({sequenceLength, bpsPerRow, caretPosition, selectionLayer, shiftHeld, type})
    //             handleCaretMoved({
    //                 moveBy,
    //                 circular,
    //                 sequenceLength,
    //                 bpsPerRow,
    //                 caretPosition,
    //                 selectionLayer,
    //                 shiftHeld,
    //                 type,
    //                 caretPositionUpdate,
    //                 selectionLayerUpdate,
    //             })
    //             event.stopPropagation();
    //         })
    //     })

    //     combokeys.bind('backspace', function(event) { // Handle shortcut
    //         backspacePressed();
    //         event.stopPropagation();
    //         event.preventDefault();
    //     });
    //     combokeys.bind('command+a', function(event) { // Handle shortcut
    //         selectAll();
    //         event.stopPropagation();
    //     });
    //     combokeys.bind('command+ctrl+i', function(event) { // Handle shortcut
    //         selectInverse();
    //         event.stopPropagation();
    //     });
    // }


    LinearView.prototype.render = function render() {
        var _this2 = this;

        var propsToUse = _extends({}, this.props.veWrapperProvidedProps, this.props);

        var _propsToUse$sequenceD = propsToUse.sequenceData,
            sequenceData = _propsToUse$sequenceD === undefined ? {} : _propsToUse$sequenceD,
            _propsToUse$hideName = propsToUse.hideName,
            hideName = _propsToUse$hideName === undefined ? false : _propsToUse$hideName,
            _propsToUse$editorDra = propsToUse.editorDragged,
            editorDragged = _propsToUse$editorDra === undefined ? noop : _propsToUse$editorDra,
            _propsToUse$editorDra2 = propsToUse.editorDragStarted,
            editorDragStarted = _propsToUse$editorDra2 === undefined ? noop : _propsToUse$editorDra2,
            _propsToUse$editorCli = propsToUse.editorClicked,
            editorClicked = _propsToUse$editorCli === undefined ? noop : _propsToUse$editorCli,
            _propsToUse$editorDra3 = propsToUse.editorDragStopped,
            editorDragStopped = _propsToUse$editorDra3 === undefined ? noop : _propsToUse$editorDra3,
            _propsToUse$width = propsToUse.width,
            width = _propsToUse$width === undefined ? 400 : _propsToUse$width,
            _propsToUse$marginWid = propsToUse.marginWidth,
            marginWidth = _propsToUse$marginWid === undefined ? defaultMarginWidth : _propsToUse$marginWid,
            height = propsToUse.height,
            rest = _objectWithoutProperties(propsToUse, ['sequenceData', 'hideName', 'editorDragged', 'editorDragStarted', 'editorClicked', 'editorDragStopped', 'width', 'marginWidth', 'height']);
        // var containerWidthMinusMargin = width - marginWidth


        var bpsPerRow = sequenceData.sequence.length;
        var sequenceLength = sequenceData.sequence.length;
        var sequenceName = hideName ? "" : sequenceData.name || "";
        var rowData = prepareRowData(sequenceData, bpsPerRow);
        return React.createElement(
            Draggable,
            {
                bounds: { top: 0, left: 0, right: 0, bottom: 0 },
                onDrag: function onDrag(event) {
                    _this2.getNearestCursorPositionToMouseEvent(rowData, event, editorDragged);
                },
                onStart: function onStart(event) {
                    _this2.getNearestCursorPositionToMouseEvent(rowData, event, editorDragStarted);
                },
                onStop: editorDragStopped
            },
            React.createElement(
                'div',
                {
                    ref: function ref(_ref) {
                        return _this2.linearView = _ref;
                    },
                    className: 'veLinearView',
                    style: {
                        overflowY: "auto",
                        overflowX: "visible",
                        height: height,
                        // width: '100%',
                        marginLeft: marginWidth / 2
                    },
                    onClick: function onClick(event) {
                        _this2.getNearestCursorPositionToMouseEvent(rowData, event, editorClicked);
                    }
                },
                React.createElement(RowItem, _extends({}, _extends({}, rest, {
                    sequenceLength: sequenceData.sequence.length,
                    width: width - marginWidth,
                    bpsPerRow: bpsPerRow,
                    tickSpacing: Math.floor(bpsPerRow / 10),
                    annotationVisibility: _extends({}, rest.annotationVisibility, {
                        caret: false,
                        yellowAxis: true,
                        translations: false })
                }), {
                    row: rowData[0]
                })),
                React.createElement(
                    'div',
                    {
                        key: 'circViewSvgCenterText',
                        className: 'veCircularViewMiddleOfVectorText',
                        style: { textAlign: 'center' } },
                    React.createElement(
                        'span',
                        null,
                        sequenceName,
                        ' '
                    ),
                    React.createElement('br', null),
                    React.createElement(
                        'span',
                        null,
                        sequenceLength + ' bps'
                    )
                )
            )
        );
    };

    return LinearView;
}(React.Component);

export { LinearView as default };