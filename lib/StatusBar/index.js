'use strict';

exports.__esModule = true;
exports.default = StatusBar;

var _getInsertBetweenVals = require('ve-sequence-utils/getInsertBetweenVals');

var _getInsertBetweenVals2 = _interopRequireDefault(_getInsertBetweenVals);

var _getRangeLength = require('ve-range-utils/getRangeLength');

var _getRangeLength2 = _interopRequireDefault(_getRangeLength);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function StatusBar(_ref) {
  var selectionLayer = _ref.selectionLayer,
      caretPosition = _ref.caretPosition,
      sequenceLength = _ref.sequenceLength,
      readOnly = _ref.readOnly,
      _ref$showReadOnly = _ref.showReadOnly,
      showReadOnly = _ref$showReadOnly === undefined ? true : _ref$showReadOnly;

  var length = (0, _getRangeLength2.default)(selectionLayer, sequenceLength);
  var insertBetween = (0, _getInsertBetweenVals2.default)(caretPosition, selectionLayer, sequenceLength);
  var isSelecting = selectionLayer.start > -1;
  return _react2.default.createElement(
    'div',
    { className: 'veStatusBar' },
    showReadOnly && _react2.default.createElement(
      StatusBarItem,
      null,
      readOnly ? 'Editable' : 'Read Only'
    ),
    _react2.default.createElement('div', { className: 'spacer' }),
    _react2.default.createElement(
      StatusBarItem,
      null,
      'Insert between bases ' + insertBetween[0] + ' and ' + insertBetween[1]
    ),
    _react2.default.createElement('div', { className: 'spacer' }),
    _react2.default.createElement(
      StatusBarItem,
      null,
      'Selecting ',
      isSelecting ? length : 0,
      ' bps from ',
      isSelecting ? selectionLayer.start + 1 : '-',
      ' to ',
      isSelecting ? selectionLayer.end + 1 : '-'
    ),
    _react2.default.createElement('div', { className: 'spacer' }),
    _react2.default.createElement(
      StatusBarItem,
      null,
      'Length: ',
      sequenceLength
    )
  );
}

function StatusBarItem(_ref2) {
  var children = _ref2.children;

  return _react2.default.createElement(
    'div',
    { className: 'item' },
    children
  );
}
module.exports = exports['default'];