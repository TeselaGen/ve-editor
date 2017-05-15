var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import draggableClassnames from '../../constants/draggableClassnames';
import PropTypes from 'prop-types';
import React from 'react';
import Caret from '../Caret';

import './style.css';

import getXStartAndWidthOfRangeWrtRow from '../getXStartAndWidthOfRangeWrtRow';
import getOverlapsOfPotentiallyCircularRanges from 've-range-utils/getOverlapsOfPotentiallyCircularRanges';

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

  return React.createElement(
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
        var overlaps = getOverlapsOfPotentiallyCircularRanges(selectionLayer, row, sequenceLength);
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

          var _getXStartAndWidthOfR = getXStartAndWidthOfRangeWrtRow(overlap, row, bpsPerRow, charWidth, sequenceLength),
              xStart = _getXStartAndWidthOfR.xStart,
              width = _getXStartAndWidthOfR.width;

          var caretSvgs = [];
          if (!hideCarets) {
            //DRAW CARETS
            caretSvgs = [overlap.start === start && React.createElement(Caret, {
              charWidth: charWidth,
              row: row,
              sequenceLength: sequenceLength,
              className: classNameToPass + ' ' + draggableClassnames.selectionStart,
              caretPosition: overlap.start
            }), overlap.end === end && React.createElement(Caret, {
              charWidth: charWidth,
              row: row,
              sequenceLength: sequenceLength,
              className: classNameToPass + ' ' + draggableClassnames.selectionEnd,
              caretPosition: overlap.end + 1
            })];
          }
          return [React.createElement('div', {
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

export default SelectionLayer;