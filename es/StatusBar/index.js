import getInsertBetweenVals from 've-sequence-utils/getInsertBetweenVals';
import getRangeLength from 've-range-utils/getRangeLength';
import React from 'react';
import './style.css';

export default function StatusBar(_ref) {
  var selectionLayer = _ref.selectionLayer,
      caretPosition = _ref.caretPosition,
      sequenceLength = _ref.sequenceLength,
      readOnly = _ref.readOnly,
      _ref$showReadOnly = _ref.showReadOnly,
      showReadOnly = _ref$showReadOnly === undefined ? true : _ref$showReadOnly;

  var length = getRangeLength(selectionLayer, sequenceLength);
  var insertBetween = getInsertBetweenVals(caretPosition, selectionLayer, sequenceLength);
  var isSelecting = selectionLayer.start > -1;
  return React.createElement(
    'div',
    { className: 'veStatusBar' },
    showReadOnly && React.createElement(
      StatusBarItem,
      null,
      readOnly ? 'Editable' : 'Read Only'
    ),
    React.createElement('div', { className: 'spacer' }),
    React.createElement(
      StatusBarItem,
      null,
      'Insert between bases ' + insertBetween[0] + ' and ' + insertBetween[1]
    ),
    React.createElement('div', { className: 'spacer' }),
    React.createElement(
      StatusBarItem,
      null,
      'Selecting ',
      isSelecting ? length : 0,
      ' bps from ',
      isSelecting ? selectionLayer.start + 1 : '-',
      ' to ',
      isSelecting ? selectionLayer.end + 1 : '-'
    ),
    React.createElement('div', { className: 'spacer' }),
    React.createElement(
      StatusBarItem,
      null,
      'Length: ',
      sequenceLength
    )
  );
}

function StatusBarItem(_ref2) {
  var children = _ref2.children;

  return React.createElement(
    'div',
    { className: 'item' },
    children
  );
}