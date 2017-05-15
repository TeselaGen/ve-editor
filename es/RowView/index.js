var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

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
import ReactList from 'react-list';
import './style.css';
import Combokeys from 'combokeys';

var defaultContainerWidth = 400;
var defaultCharWidth = 12;
var defaultMarginWidth = 50;

function noop() {}

var RowView = (_temp = _class = function (_React$Component) {
  _inherits(RowView, _React$Component);

  function RowView() {
    _classCallCheck(this, RowView);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  RowView.prototype.getNearestCursorPositionToMouseEvent = function getNearestCursorPositionToMouseEvent(rowData, event, callback) {
    var _props$veWrapperProvi = _extends({}, this.props.veWrapperProvidedProps, this.props),
        _props$veWrapperProvi2 = _props$veWrapperProvi.charWidth,
        charWidth = _props$veWrapperProvi2 === undefined ? defaultCharWidth : _props$veWrapperProvi2;

    var rowNotFound = true;
    var visibleRowsContainer = this.InfiniteScroller.items;
    //loop through all the rendered rows to see if the click event lands in one of them
    var nearestCaretPos = 0;
    some(visibleRowsContainer.childNodes, function (rowDomNode) {
      var boundingRowRect = rowDomNode.getBoundingClientRect();
      if (event.clientY > boundingRowRect.top && event.clientY < boundingRowRect.top + boundingRowRect.height) {
        //then the click is falls within this row
        rowNotFound = false;
        var row = rowData[Number(rowDomNode.getAttribute('data-row-number'))];
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
    });
    if (rowNotFound) {
      var _visibleRowsContainer = visibleRowsContainer.getBoundingClientRect(),
          top = _visibleRowsContainer.top,
          bottom = _visibleRowsContainer.bottom;

      var numbers = [top, bottom];
      var target = event.clientY;
      var topOrBottom = numbers.map(function (value, index) {
        return [Math.abs(value - target), index];
      }).sort().map(function (value) {
        return numbers[value[1]];
      })[0];
      var rowDomNode;
      if (topOrBottom === top) {
        rowDomNode = visibleRowsContainer.childNodes[0];
      } else {
        rowDomNode = visibleRowsContainer.childNodes[visibleRowsContainer.childNodes.length - 1];
      }
      if (rowDomNode) {
        var row = rowData[Number(rowDomNode.getAttribute('data-row-number'))];
        //return the last bp index in the rendered rows
        nearestCaretPos = row.end;
      } else {
        nearestCaretPos = 0;
      }
    }
    callback({
      className: event.target.className,
      shiftHeld: event.shiftKey,
      nearestCaretPos: nearestCaretPos,
      selectionStartGrabbed: event.target.classList.contains(draggableClassnames.selectionStart),
      selectionEndGrabbed: event.target.classList.contains(draggableClassnames.selectionEnd)
    });
  };

  RowView.prototype.componentWillUnmount = function componentWillUnmount() {
    this.combokeys.detach();
  };

  RowView.prototype.componentDidMount = function componentDidMount() {
    var self = this;

    var _self$props$veWrapper = _extends({}, self.props.veWrapperProvidedProps, self.props),
        _self$props$veWrapper2 = _self$props$veWrapper.sequenceDataInserted,
        sequenceDataInserted = _self$props$veWrapper2 === undefined ? noop : _self$props$veWrapper2,
        _self$props$veWrapper3 = _self$props$veWrapper.backspacePressed,
        backspacePressed = _self$props$veWrapper3 === undefined ? noop : _self$props$veWrapper3,
        _self$props$veWrapper4 = _self$props$veWrapper.selectAll,
        selectAll = _self$props$veWrapper4 === undefined ? noop : _self$props$veWrapper4,
        _self$props$veWrapper5 = _self$props$veWrapper.selectInverse,
        selectInverse = _self$props$veWrapper5 === undefined ? noop : _self$props$veWrapper5,
        readOnly = _self$props$veWrapper.readOnly;

    // combokeys.stop();
    // combokeys.watch(self.rowViewComp)

    self.combokeys = new Combokeys(self.rowViewComp);
    // bindGlobalPlugin(self.combokeys);


    // bind a bunch of self.combokeys shortcuts we're interested in catching
    // we're using the "mousetrap" library (available thru npm: https://www.npmjs.com/package/br-mousetrap)
    // documentation: https://craig.is/killing/mice
    !readOnly && self.combokeys.bind(['a', 'b', 'c', 'd', 'g', 'h', 'k', 'm', 'n', 'r', 's', 't', 'v', 'w', 'y'], function (event) {
      // type in bases
      sequenceDataInserted({ newSequenceData: { sequence: String.fromCharCode(event.charCode) } });
    });

    var moveCaretBindings = [{ keyCombo: ['left', 'shift+left'], type: 'moveCaretLeftOne' }, { keyCombo: ['right', 'shift+right'], type: 'moveCaretRightOne' }, { keyCombo: ['up', 'shift+up'], type: 'moveCaretUpARow' }, { keyCombo: ['down', 'shift+down'], type: 'moveCaretDownARow' }, { keyCombo: ['alt+right', 'alt+shift+right'], type: 'moveCaretToEndOfRow' }, { keyCombo: ['alt+left', 'alt+shift+left'], type: 'moveCaretToStartOfRow' }, { keyCombo: ['alt+up', 'alt+shift+up'], type: 'moveCaretToStartOfSequence' }, { keyCombo: ['alt+down', 'alt+shift+down'], type: 'moveCaretToEndOfSequence' }];

    moveCaretBindings.forEach(function (_ref) {
      var keyCombo = _ref.keyCombo,
          type = _ref.type;

      self.combokeys.bind(keyCombo, function (event) {
        var shiftHeld = event.shiftKey;
        var bpsPerRow = getBpsPerRow(_extends({}, self.props.veWrapperProvidedProps, self.props));

        var _self$props$veWrapper6 = _extends({}, self.props.veWrapperProvidedProps, self.props),
            selectionLayer = _self$props$veWrapper6.selectionLayer,
            caretPosition = _self$props$veWrapper6.caretPosition,
            sequenceLength = _self$props$veWrapper6.sequenceLength,
            circular = _self$props$veWrapper6.circular,
            caretPositionUpdate = _self$props$veWrapper6.caretPositionUpdate,
            selectionLayerUpdate = _self$props$veWrapper6.selectionLayerUpdate;

        var moveBy = moveCaret({ sequenceLength: sequenceLength, bpsPerRow: bpsPerRow, caretPosition: caretPosition, selectionLayer: selectionLayer, shiftHeld: shiftHeld, type: type });
        handleCaretMoved({
          moveBy: moveBy,
          circular: circular,
          sequenceLength: sequenceLength,
          bpsPerRow: bpsPerRow,
          caretPosition: caretPosition,
          selectionLayer: selectionLayer,
          shiftHeld: shiftHeld,
          type: type,
          caretPositionUpdate: caretPositionUpdate,
          selectionLayerUpdate: selectionLayerUpdate
        });
        event.stopPropagation();
      });
    });

    self.combokeys.bind('backspace', function (event) {
      // Handle shortcut
      backspacePressed();
      event.stopPropagation();
      event.preventDefault();
    });
    self.combokeys.bind('command+a', function (event) {
      // Handle shortcut
      selectAll();
      event.stopPropagation();
    });
    self.combokeys.bind('command+ctrl+i', function (event) {
      // Handle shortcut
      selectInverse();
      event.stopPropagation();
    });
  };

  RowView.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
    // var {keydown} = props
    // if ( keydown && keydown.event ) {
    //   // inspect the keydown event and decide what to do
    //   console.log( keydown.event.which );
    //   debugger
    // }
    var thisPropsToUse = _extends({}, this.props.veWrapperProvidedProps, this.props);
    var propsToUse = _extends({}, props.veWrapperProvidedProps, props);

    var caretPosition = propsToUse.caretPosition,
        selectionLayer = propsToUse.selectionLayer;

    var bpsPerRow = getBpsPerRow(propsToUse);
    //UPDATE THE ROW VIEW'S POSITION BASED ON CARET OR SELECTION CHANGES
    var previousBp;
    var scrollToBp = -1;
    if (caretPosition > -1 && caretPosition !== thisPropsToUse.caretPosition) {
      previousBp = thisPropsToUse.caretPosition;
      scrollToBp = caretPosition;
    } else if (selectionLayer.start > -1 && selectionLayer.start !== thisPropsToUse.selectionLayer.start) {
      previousBp = thisPropsToUse.selectionLayer.start;
      scrollToBp = selectionLayer.start;
    } else if (selectionLayer.end > -1 && selectionLayer.end !== thisPropsToUse.selectionLayer.end) {
      previousBp = thisPropsToUse.selectionLayer.end;
      scrollToBp = selectionLayer.end;
    }
    if (scrollToBp > -1 && this.InfiniteScroller.scrollTo) {
      var rowToScrollTo = Math.floor(scrollToBp / bpsPerRow);

      var _InfiniteScroller$get = this.InfiniteScroller.getVisibleRange(),
          start = _InfiniteScroller$get[0],
          end = _InfiniteScroller$get[1];

      if (rowToScrollTo < start || rowToScrollTo > end) {
        this.InfiniteScroller.scrollTo(rowToScrollTo, { jumpToBottomOfRow: scrollToBp > previousBp });
      }
    }
  };

  RowView.prototype.render = function render() {
    var _this2 = this;

    var propsToUse = _extends({}, this.props.veWrapperProvidedProps, this.props);

    var sequenceData = propsToUse.sequenceData,
        editorDragged = propsToUse.editorDragged,
        editorDragStarted = propsToUse.editorDragStarted,
        editorClicked = propsToUse.editorClicked,
        editorDragStopped = propsToUse.editorDragStopped,
        onScroll = propsToUse.onScroll,
        width = propsToUse.width,
        marginWidth = propsToUse.marginWidth,
        height = propsToUse.height,
        rest = _objectWithoutProperties(propsToUse, ['sequenceData', 'editorDragged', 'editorDragStarted', 'editorClicked', 'editorDragStopped', 'onScroll', 'width', 'marginWidth', 'height']);

    if (marginWidth < defaultMarginWidth) {
      marginWidth = defaultMarginWidth;
    }
    var containerWidthMinusMargin = width - marginWidth;
    var bpsPerRow = getBpsPerRow(propsToUse);
    //the width we pass to the rowitem needs to be the exact width of the bps so we need to trim off any extra space:
    var containerWidthMinusMarginMinusAnyExtraSpaceUpTo1Bp = Math.floor(containerWidthMinusMargin / propsToUse.charWidth) * bpsPerRow;
    var rowData = prepareRowData(sequenceData, bpsPerRow);
    var showJumpButtons = rowData.length > 15;
    var renderItem = function renderItem(index, key) {

      if (showJumpButtons) {
        if (index === 0) {
          return React.createElement(
            'div',
            { 'data-row-number': index, key: key },
            React.createElement(
              'button',
              { className: 'jumpButton', onClick: function onClick(e) {
                  e.stopPropagation();
                  _this2.InfiniteScroller.scrollTo(rowData.length);
                } },
              'Jump to end'
            )
          );
        } else if (index === rowData.length + 1) {
          return React.createElement(
            'div',
            { 'data-row-number': index - 2, key: key },
            React.createElement(
              'button',
              { className: 'jumpButton', onClick: function onClick(e) {
                  e.stopPropagation();
                  _this2.InfiniteScroller.scrollTo(0);
                } },
              'Jump to start'
            )
          );
        }
      }
      var indexToUse = showJumpButtons ? index - 1 : index;
      if (rowData[indexToUse]) {
        return React.createElement(
          'div',
          { 'data-row-number': indexToUse, key: key },
          React.createElement('div', { className: 'veRowItemSpacer' }),
          React.createElement(RowItem, _extends({}, _extends({}, rest, {
            sequenceLength: sequenceData.sequence.length,
            width: containerWidthMinusMarginMinusAnyExtraSpaceUpTo1Bp,
            bpsPerRow: bpsPerRow,
            fullSequence: sequenceData.sequence
          }), {
            row: rowData[indexToUse]
          }))
        );
      } else {
        return null;
      }
    };

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
          tabIndex: '0',
          ref: function ref(_ref2) {
            return _this2.rowViewComp = _ref2;
          },
          className: 'veRowView',
          style: {
            overflowY: "auto",
            overflowX: "visible",
            height: height,
            width: width,
            paddingLeft: marginWidth / 2
          },
          onScroll: onScroll,
          onClick: function onClick(event) {
            _this2.getNearestCursorPositionToMouseEvent(rowData, event, editorClicked);
          }
        },
        React.createElement(ReactList, {
          ref: function ref(c) {
            _this2.InfiniteScroller = c;
          },
          itemRenderer: renderItem,
          length: rowData.length > 10 ? rowData.length + 2 : rowData.length,
          itemSizeEstimator: itemSizeEstimator,
          type: 'variable'
        })
      )
    );
  };

  return RowView;
}(React.Component), _class.defaultProps = {
  sequenceData: { sequence: '' },
  selectionLayer: {},
  // bpToJumpTo:0,
  editorDragged: noop,
  editorDragStarted: noop,
  editorClicked: noop,
  editorDragStopped: noop,
  onScroll: noop,
  width: defaultContainerWidth,
  marginWidth: defaultMarginWidth,
  height: 400,
  veWrapperProvidedProps: {}
}, _temp);


export default RowView;

function getBpsPerRow(_ref3) {
  var _ref3$charWidth = _ref3.charWidth,
      charWidth = _ref3$charWidth === undefined ? defaultCharWidth : _ref3$charWidth,
      _ref3$width = _ref3.width,
      width = _ref3$width === undefined ? defaultContainerWidth : _ref3$width,
      _ref3$marginWidth = _ref3.marginWidth,
      marginWidth = _ref3$marginWidth === undefined ? defaultMarginWidth : _ref3$marginWidth;

  return Math.floor((width - marginWidth) / charWidth);
}

function itemSizeEstimator(index, cache) {
  if (cache[index + 1]) {
    return cache[index + 1];
  }
  if (cache[index - 1]) {
    return cache[index - 1];
  }
  return 100;
}