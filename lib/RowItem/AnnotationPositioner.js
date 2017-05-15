'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AnnotationPositioner = function AnnotationPositioner(props) {
  return _react2.default.createElement(
    'svg',
    {
      transform: props.transform || null,
      height: props.height + 5,
      className: props.className + ' veRowViewAnnotationPosition',
      width: props.width + 5,
      style: {
        position: 'absolute',
        top: props.top,
        left: props.left
      }
    },
    props.children
  );
};

exports.default = AnnotationPositioner;

// key={'feature' + annotation.id + 'start:' + annotationRange.start}

module.exports = exports['default'];