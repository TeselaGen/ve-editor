'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AnnotationContainerHolder = _react2.default.createClass({
  displayName: 'AnnotationContainerHolder',

  mixins: [_reactAddonsPureRenderMixin2.default],

  render: function render() {
    return _react2.default.createElement(
      'div',
      {
        className: this.props.className || "annotationContainer",
        width: '100%',
        style: { height: this.props.containerHeight, position: 'relative', display: 'block' } },
      this.props.children
    );
  }
});
exports.default = AnnotationContainerHolder;
module.exports = exports['default'];