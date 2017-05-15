"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AnnotationContainerHolder = function AnnotationContainerHolder(props) {
  return _react2.default.createElement(
    "div",
    {
      className: props.className || "annotationContainer",
      width: "100%",
      style: { height: props.containerHeight, position: 'relative', display: 'block' } },
    props.children
  );
};
exports.default = AnnotationContainerHolder;
module.exports = exports["default"];