var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import draggableClassnames from '../../constants/draggableClassnames';
import React, { PropTypes } from 'react';
import Caret from '../Caret';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import './style.css';

import getXStartAndWidthOfRangeWrtRow from '../getXStartAndWidthOfRangeWrtRow';
import getOverlapsOfPotentiallyCircularRanges from 've-range-utils/getOverlapsOfPotentiallyCircularRanges';

function mixin(target, source) {
  target = target.prototype;

  Object.getOwnPropertyNames(source).forEach(function (name) {
    var sourceProp = Object.getOwnPropertyDescriptor(source, name);

    if (name !== "constructor") {
      Object.defineProperty(target, name, sourceProp);
    }
  });
}

var SelectionLayer = function (_React$Component) {
  _inherits(SelectionLayer, _React$Component);

  function SelectionLayer() {
    _classCallCheck(this, SelectionLayer);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  SelectionLayer.prototype.render = function render() {
    var _props = this.props,
        charWidth = _props.charWidth,
        bpsPerRow = _props.bpsPerRow,
        row = _props.row,
        sequenceLength = _props.sequenceLength,
        regions = _props.regions,
        _props$hideCarets = _props.hideCarets,
        hideCarets = _props$hideCarets === undefined ? false : _props$hideCarets,
        selectionLayerRightClicked = _props.selectionLayerRightClicked,
        _props$className = _props.className,
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
  };

  return SelectionLayer;
}(React.Component);

mixin(SelectionLayer, PureRenderMixin);

export default SelectionLayer;