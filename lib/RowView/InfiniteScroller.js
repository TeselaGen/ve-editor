'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _validate = require('validate.io-nonnegative-integer-array');

var _validate2 = _interopRequireDefault(_validate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function noop() {}

var InfiniteScoller = _react2.default.createClass({
  displayName: 'InfiniteScoller',

  propTypes: {
    averageElementHeight: _react.PropTypes.number,
    containerHeight: _react.PropTypes.number.isRequired,
    totalNumberOfRows: _react.PropTypes.number.isRequired,
    renderRow: _react.PropTypes.func.isRequired,
    rowToJumpTo: _react.PropTypes.shape({
      row: _react.PropTypes.number
    }),
    style: _react.PropTypes.object,
    jumpToBottomOfRow: _react.PropTypes.bool,
    containerClassName: _react.PropTypes.string,
    onScroll: _react.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      onScroll: noop,
      containerClassName: 'infiniteContainer',
      averageElementHeight: 100
    };
  },
  scrollTo: function scrollTo(row) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _options$doNotJumpIfR = options.doNotJumpIfRowIsAlreadyVisible,
        doNotJumpIfRowIsAlreadyVisible = _options$doNotJumpIfR === undefined ? false : _options$doNotJumpIfR,
        _options$jumpToBottom = options.jumpToBottomOfRow,
        jumpToBottomOfRow = _options$jumpToBottom === undefined ? false : _options$jumpToBottom;


    this.jumpToBottomOfRow = jumpToBottomOfRow;
    if (row > -1) {
      if (doNotJumpIfRowIsAlreadyVisible && this.isRowActuallyVisible(row)) {
        return; // return early because the row is already visible
      }
      this.rowJumpTriggered = true;
      this.rowJumpedTo = row;
      this.prepareVisibleRows(row, this.state.visibleRows.length);
    }
  },
  isRowActuallyVisible: function isRowActuallyVisible(row) {
    // some of the rows may not actually be fully visible, despite their being in the within the visibleRowsContainer (they sit in the buffer above or below the infinite container)
    var potentiallyVisibleRows = this.getVisibleRowsContainerDomNode();
    // const lengthOfPotentiallyVisibleRows = potentiallyVisibleRows.children.length
    var rowIndexInVisibleRowsContainer = row - this.rowStart;
    var potentiallyVisibleRow = potentiallyVisibleRows.children[rowIndexInVisibleRowsContainer];
    if (!potentiallyVisibleRow) {
      return false;
    }
    var infiniteContainer = _reactDom2.default.findDOMNode(this.refs.infiniteContainer);
    var icTop = infiniteContainer.getBoundingClientRect().top;
    var icBottom = infiniteContainer.getBoundingClientRect().bottom;
    var pvTop = potentiallyVisibleRow.getBoundingClientRect().top;
    var pvBottom = potentiallyVisibleRow.getBoundingClientRect().bottom;
    if (icTop < pvBottom && icBottom > pvTop || icBottom > pvTop && icTop < pvBottom) {
      return true;
    }
    return false;
  },
  onEditorScroll: function onEditorScroll(event) {
    // tnr: we should maybe keep this implemented..
    if (this.adjustmentScroll) {
      // adjustment scrolls are called in componentDidUpdate where we manually set the scrollTop (which inadvertantly triggers a scroll)
      this.adjustmentScroll = false;
      return;
    }

    var infiniteContainer = event.currentTarget;
    var visibleRowsContainer = _reactDom2.default.findDOMNode(this.refs.visibleRowsContainer);
    // const currentAverageElementHeight = (visibleRowsContainer.getBoundingClientRect().height / this.state.visibleRows.length);
    this.oldRowStart = this.rowStart;
    var distanceFromTopOfVisibleRows = infiniteContainer.getBoundingClientRect().top - visibleRowsContainer.getBoundingClientRect().top;
    var distanceFromBottomOfVisibleRows = visibleRowsContainer.getBoundingClientRect().bottom - infiniteContainer.getBoundingClientRect().bottom;
    var newRowStart = void 0;
    var rowsToAdd = void 0;
    if (distanceFromTopOfVisibleRows < 0) {
      if (this.rowStart > 0) {
        rowsToAdd = Math.ceil(-1 * distanceFromTopOfVisibleRows / this.props.averageElementHeight);
        newRowStart = this.rowStart - rowsToAdd;

        if (newRowStart < 0) {
          newRowStart = 0;
        }

        this.prepareVisibleRows(newRowStart, this.state.visibleRows.length);
      }
    } else if (distanceFromBottomOfVisibleRows < 0) {
      // scrolling down, so add a row below
      var rowsToGiveOnBottom = this.props.totalNumberOfRows - 1 - this.rowEnd;
      if (rowsToGiveOnBottom > 0) {
        rowsToAdd = Math.ceil(-1 * distanceFromBottomOfVisibleRows / this.props.averageElementHeight);
        newRowStart = this.rowStart + rowsToAdd;

        if (newRowStart + this.state.visibleRows.length >= this.props.totalNumberOfRows) {
          // the new row start is too high, so we instead just append the max rowsToGiveOnBottom to our current preloadRowStart
          newRowStart = this.rowStart + rowsToGiveOnBottom;
        }
        this.prepareVisibleRows(newRowStart, this.state.visibleRows.length);
      }
    } else {// eslint-disable-line no-empty
      // we haven't scrolled enough, so do nothing
    }
    this.updateTriggeredByScroll = true;
    this.props.onScroll(event);
    // set the averageElementHeight to the currentAverageElementHeight
    // setAverageRowHeight(currentAverageElementHeight);
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var newNumberOfRowsToDisplay = this.state.visibleRows.length;
    if (nextProps.rowToJumpTo && this.props.rowToJumpTo !== nextProps.rowToJumpTo) {
      this.prepareVisibleRows(nextProps.rowToJumpTo.row, newNumberOfRowsToDisplay);
      this.rowJumpTriggered = true;
      this.rowJumpedTo = nextProps.rowToJumpTo.row;
    } else {
      var rowStart = this.rowStart;
      // we need to set the new totalNumber of rows prop here before calling prepare visible rows
      // so that prepare visible rows knows how many rows it has to work with
      this.prepareVisibleRows(rowStart, newNumberOfRowsToDisplay, nextProps.totalNumberOfRows);
    }
  },
  componentWillUpdate: function componentWillUpdate() {
    var visibleRowsContainer = _reactDom2.default.findDOMNode(this.refs.visibleRowsContainer);
    this.soonToBeRemovedRowElementHeights = 0;
    this.numberOfRowsAddedToTop = 0;
    if (this.updateTriggeredByScroll === true) {
      this.updateTriggeredByScroll = false;
      var rowStartDifference = this.oldRowStart - this.rowStart;
      if (rowStartDifference < 0) {
        // scrolling down
        for (var i = 0; i < -rowStartDifference; i++) {
          var soonToBeRemovedRowElement = visibleRowsContainer.children[i];
          if (soonToBeRemovedRowElement) {
            var height = soonToBeRemovedRowElement.getBoundingClientRect().height;
            this.soonToBeRemovedRowElementHeights += this.props.averageElementHeight - height;
            // this.soonToBeRemovedRowElementHeights.push(soonToBeRemovedRowElement.getBoundingClientRect().height);
          }
        }
      } else if (rowStartDifference > 0) {
        this.numberOfRowsAddedToTop = rowStartDifference;
      }
    }
  },
  componentDidUpdate: function componentDidUpdate() {
    // strategy: as we scroll, we're losing or gaining rows from the top and replacing them with rows of the "averageRowHeight"
    // thus we need to adjust the scrollTop positioning of the infinite container so that the UI doesn't jump as we
    // make the replacements
    var infiniteContainer = _reactDom2.default.findDOMNode(this.refs.infiniteContainer);
    var visibleRowsContainer = _reactDom2.default.findDOMNode(this.refs.visibleRowsContainer);
    if (this.soonToBeRemovedRowElementHeights) {
      infiniteContainer.scrollTop = infiniteContainer.scrollTop + this.soonToBeRemovedRowElementHeights;
    }
    if (this.numberOfRowsAddedToTop) {
      // we're adding rows to the top, so we're going from 100's to random heights, so we'll calculate the differenece
      // and adjust the infiniteContainer.scrollTop by it
      var adjustmentScroll = 0;

      for (var i = 0; i < this.numberOfRowsAddedToTop; i++) {
        var justAddedElement = visibleRowsContainer.children[i];
        if (justAddedElement) {
          adjustmentScroll += this.props.averageElementHeight - justAddedElement.getBoundingClientRect().height;
        }
      }
      infiniteContainer.scrollTop = infiniteContainer.scrollTop - adjustmentScroll;
    }

    if (!visibleRowsContainer.childNodes[0]) {
      if (this.props.totalNumberOfRows) {
        // we've probably made it here because a bunch of rows have been removed all at once
        // and the visible rows isn't mapping to the row data, so we need to shift the visible rows
        var numberOfRowsToDisplay = this.numberOfRowsToDisplay || 4;
        var newRowStart = this.props.totalNumberOfRows - numberOfRowsToDisplay;
        if (!(0, _validate2.default)([newRowStart])) {
          newRowStart = 0;
        }
        this.prepareVisibleRows(newRowStart, numberOfRowsToDisplay);
        return; // return early because we need to recompute the visible rows
      }
      throw new Error('no visible rows!!');
    }
    var adjustInfiniteContainerByThisAmount = void 0;
    function adjustScrollHeightToRowJump() {
      this.rowJumpTriggered = false;
      var icbr = infiniteContainer.getBoundingClientRect();
      var rowJumpedToIndex = this.state.visibleRows.indexOf(this.rowJumpedTo);
      if (rowJumpedToIndex === -1) {
        console.warn('rowJumpedTo did not work out for row #:', this.rowJumpedTo);
        rowJumpedToIndex = 0;
      }
      var vrbr = visibleRowsContainer.children[rowJumpedToIndex].getBoundingClientRect();
      // if a rowJump has been triggered, we need to adjust the row to sit at the top of the infinite container
      if (this.props.jumpToBottomOfRow || this.jumpToBottomOfRow) {
        adjustInfiniteContainerByThisAmount = icbr.bottom - vrbr.bottom;
      } else {
        adjustInfiniteContainerByThisAmount = icbr.top - vrbr.top;
      }
      infiniteContainer.scrollTop = infiniteContainer.scrollTop - adjustInfiniteContainerByThisAmount;
    }
    // check if the visible rows fill up the viewport
    // TODO: maybe put logic in here to reshrink the number of rows to display... maybe...
    if (visibleRowsContainer.getBoundingClientRect().height / 2 <= this.props.containerHeight) {
      // visible rows don't yet fill up the viewport, so we need to add rows
      if (this.rowStart + this.state.visibleRows.length < this.props.totalNumberOfRows) {
        // load another row to the bottom
        this.prepareVisibleRows(this.rowStart, this.state.visibleRows.length + 1);
      } else {
        // there aren't more rows that we can load at the bottom
        if (this.rowStart - 1 > 0) {
          // so we load more at the top
          this.prepareVisibleRows(this.rowStart - 1, this.state.visibleRows.length + 1); // don't want to just shift view
        } else {
          // all the rows are already visible
          if (this.rowJumpTriggered) {
            adjustScrollHeightToRowJump.call(this);
          }
        }
      }
    } else if (this.rowJumpTriggered) {
      adjustScrollHeightToRowJump.call(this);
    } else if (visibleRowsContainer.getBoundingClientRect().top > infiniteContainer.getBoundingClientRect().top) {
      // scroll to align the tops of the boxes
      adjustInfiniteContainerByThisAmount = visibleRowsContainer.getBoundingClientRect().top - infiniteContainer.getBoundingClientRect().top;
      // this.adjustmentScroll = true;
      infiniteContainer.scrollTop = infiniteContainer.scrollTop + adjustInfiniteContainerByThisAmount;
    } else if (visibleRowsContainer.getBoundingClientRect().bottom < infiniteContainer.getBoundingClientRect().bottom) {
      // scroll to align the bottoms of the boxes
      adjustInfiniteContainerByThisAmount = visibleRowsContainer.getBoundingClientRect().bottom - infiniteContainer.getBoundingClientRect().bottom;
      // this.adjustmentScroll = true;
      infiniteContainer.scrollTop = infiniteContainer.scrollTop + adjustInfiniteContainerByThisAmount;
    }
  },
  componentWillMount: function componentWillMount() {
    var newRowStart = 0;
    if (this.props.rowToJumpTo && this.props.rowToJumpTo.row && this.props.rowToJumpTo.row < this.props.totalNumberOfRows) {
      newRowStart = this.props.rowToJumpTo.row;
      this.rowJumpTriggered = true;
      this.rowJumpedTo = this.props.rowToJumpTo.row;
    }
    this.prepareVisibleRows(newRowStart, 4);
  },
  componentDidMount: function componentDidMount() {
    // call componentDidUpdate so that the scroll position will be adjusted properly
    // (we may load a random row in the middle of the sequence and not have the infinte container scrolled properly
    // initially, so we scroll to show the rowContainer)
    this.componentDidUpdate();
  },
  prepareVisibleRows: function prepareVisibleRows(rowStart, newNumberOfRowsToDisplay, newTotalNumberOfRows) {
    // note, rowEnd is optional
    this.numberOfRowsToDisplay = newNumberOfRowsToDisplay;
    var totalNumberOfRows = (0, _validate2.default)([newTotalNumberOfRows]) ? newTotalNumberOfRows : this.props.totalNumberOfRows;
    if (rowStart > totalNumberOfRows) {
      this.rowStart = totalNumberOfRows;
    } else {
      this.rowStart = rowStart;
    }
    if (rowStart + newNumberOfRowsToDisplay > totalNumberOfRows) {
      this.rowEnd = totalNumberOfRows - 1;
    } else {
      this.rowEnd = rowStart + newNumberOfRowsToDisplay - 1;
    }
    // var visibleRows = this.state.visibleRowsDataData.slice(rowStart, this.rowEnd + 1);
    // rowData.slice(rowStart, this.rowEnd + 1);
    // setPreloadRowStart(rowStart);
    if (!(0, _validate2.default)([this.rowStart, this.rowEnd])) {
      throw new Error('Error: row start or end invalid!');
    }
    var newVisibleRows = [];
    for (var i = this.rowStart; i <= this.rowEnd; i++) {
      newVisibleRows.push(i);
    }
    // var newVisibleRows = this.rowStart, this.rowEnd + 1);
    this.setState({
      visibleRows: newVisibleRows
    });
  },


  // public method
  getVisibleRowsContainerDomNode: function getVisibleRowsContainerDomNode() {
    return _reactDom2.default.findDOMNode(this.refs.visibleRowsContainer);
  },
  render: function render() {
    var _this = this;

    var rowItems = this.state.visibleRows.map(function (i) {
      return _this.props.renderRow(i);
    });

    var rowHeight = this.currentAverageElementHeight ? this.currentAverageElementHeight : this.props.averageElementHeight;
    this.topSpacerHeight = this.rowStart * rowHeight;
    this.bottomSpacerHeight = (this.props.totalNumberOfRows - 1 - this.rowEnd) * rowHeight;
    var _props$style = this.props.style,
        style = _props$style === undefined ? {} : _props$style;


    var infiniteContainerStyleToPass = _extends({
      height: this.props.containerHeight,
      overflowY: 'scroll'
    }, style);

    return _react2.default.createElement(
      'div',
      {
        ref: 'infiniteContainer',
        className: this.props.containerClassName,
        style: infiniteContainerStyleToPass,
        onScroll: this.onEditorScroll
      },
      _react2.default.createElement('div', { className: 'topSpacer', style: { height: this.topSpacerHeight } }),
      _react2.default.createElement(
        'div',
        { ref: 'visibleRowsContainer', className: 'visibleRowsContainer' },
        rowItems
      ),
      _react2.default.createElement('div', { ref: 'bottomSpacer', className: 'bottomSpacer', style: { height: this.bottomSpacerHeight } })
    );
  }
});

exports.default = InfiniteScoller;
module.exports = exports['default'];