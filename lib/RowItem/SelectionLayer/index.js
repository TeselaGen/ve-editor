'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _draggableClassnames = require('../../constants/draggableClassnames');

var _draggableClassnames2 = _interopRequireDefault(_draggableClassnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Caret = require('../Caret');

var _Caret2 = _interopRequireDefault(_Caret);

require('./style.css');

var _getXStartAndWidthOfRangeWrtRow = require('../getXStartAndWidthOfRangeWrtRow');

var _getXStartAndWidthOfRangeWrtRow2 = _interopRequireDefault(_getXStartAndWidthOfRangeWrtRow);

var _getOverlapsOfPotentiallyCircularRanges = require('ve-range-utils/getOverlapsOfPotentiallyCircularRanges');

var _getOverlapsOfPotentiallyCircularRanges2 = _interopRequireDefault(_getOverlapsOfPotentiallyCircularRanges);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SelectionLayer(props) {
  var charWidth = props.charWidth,
      bpsPerRow = props.bpsPerRow,
      row = props.row,
      sequenceLength = props.sequenceLength,
      regions = props.regions,
      _props$hideCarets = props.hideCarets,
      hideCarets = _props$hideCarets === undefined ? false : _props$hideCarets,
      selectionLayerRightClicked = props.selectionLayerRightClicked,
      _props$className = props.className,
      globalClassname = _props$className === undefined ? '' : _props$className;

  return _react2.default.createElement(
    'div',
    null,
    regions.map(function (selectionLayer, index) {
      var _selectionLayer$class = selectionLayer.className,
          className = _selectionLayer$class === undefined ? '' : _selectionLayer$class,
          _selectionLayer$style = selectionLayer.style,
          style = _selectionLayer$style === undefined ? {} : _selectionLayer$style,
          start = selectionLayer.start,
          end = selectionLayer.end,
          color = selectionLayer.color;

      var classNameToPass = 'veRowViewSelectionLayer ' + className + ' ' + className + ' ' + globalClassname;
      if (start > -1) {
        var overlaps = (0, _getOverlapsOfPotentiallyCircularRanges2.default)(selectionLayer, row, sequenceLength);
        //DRAW SELECTION LAYER

        return overlaps.map(function (overlap, index) {
          var isTrueStart = false;
          var isTrueEnd = false;
          if (overlap.start === selectionLayer.start) {
            isTrueStart = true;
          }
          if (overlap.end === selectionLayer.end) {
            isTrueEnd = true;
          }

          var _getXStartAndWidthOfR = (0, _getXStartAndWidthOfRangeWrtRow2.default)(overlap, row, bpsPerRow, charWidth, sequenceLength),
              xStart = _getXStartAndWidthOfR.xStart,
              width = _getXStartAndWidthOfR.width;

          var caretSvgs = [];
          if (!hideCarets) {
            //DRAW CARETS
            caretSvgs = [overlap.start === start && _react2.default.createElement(_Caret2.default, {
              charWidth: charWidth,
              row: row,
              sequenceLength: sequenceLength,
              className: classNameToPass + ' ' + _draggableClassnames2.default.selectionStart,
              caretPosition: overlap.start
            }), overlap.end === end && _react2.default.createElement(_Caret2.default, {
              charWidth: charWidth,
              row: row,
              sequenceLength: sequenceLength,
              className: classNameToPass + ' ' + _draggableClassnames2.default.selectionEnd,
              caretPosition: overlap.end + 1
            })];
          }
          return [_react2.default.createElement('div', {
            onContextMenu: function onContextMenu(event) {
              selectionLayerRightClicked({ event: event, annotation: selectionLayer });
            },
            key: index,
            className: classNameToPass + (isTrueStart ? ' isTrueStart ' : '') + (isTrueEnd ? ' isTrueEnd ' : ''),
            style: _extends({
              width: width,
              left: xStart
            }, style, {
              background: color
            })
          })].concat(caretSvgs);
        });
      }
    })
  );
}

exports.default = SelectionLayer;
module.exports = exports['default'];