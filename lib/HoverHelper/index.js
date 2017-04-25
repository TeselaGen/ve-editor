'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _deepEqual = require('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _reactMouseAware = require('react-mouse-aware');

require('./style.css');

var _hoveredAnnotation = require('../redux/hoveredAnnotation');

var hoveredAnnotationActions = _interopRequireWildcard(_hoveredAnnotation);

var _reactRedux = require('react-redux');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HoverHelper = function (_React$Component) {
    _inherits(HoverHelper, _React$Component);

    function HoverHelper() {
        _classCallCheck(this, HoverHelper);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    HoverHelper.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
        if ((0, _deepEqual2.default)(nextProps, this.props)) {
            return false;
        } else {
            return true;
        }
    };

    HoverHelper.prototype.render = function render() {
        var _props = this.props,
            hovered = _props.hovered,
            idToPass = _props.idToPass,
            hoveredId = _props.hoveredId,
            mouseAware = _props.mouseAware,
            isOver = _props.isOver,
            children = _props.children,
            hoveredAnnotationUpdate = _props.hoveredAnnotationUpdate,
            hoveredAnnotationClear = _props.hoveredAnnotationClear,
            _props$onHover = _props.onHover,
            onHover = _props$onHover === undefined ? noop : _props$onHover,
            meta = _props.meta,
            doNotTriggerOnMouseOut = _props.doNotTriggerOnMouseOut,
            passJustOnMouseOverAndClassname = _props.passJustOnMouseOverAndClassname;

        var _ref = children && children.props || {},
            _ref$className = _ref.className,
            className = _ref$className === undefined ? '' : _ref$className;

        var mouseAway = doNotTriggerOnMouseOut ? noop : function (e) {
            hoveredAnnotationClear(idToPass, meta);
            e.stopPropagation();
        };
        var props = {
            className: (0, _classnames2.default)(className, 'hoverHelper', {
                veAnnotationHovered: hovered,
                doNotTriggerOnMouseOut: doNotTriggerOnMouseOut
            }),
            onMouseOver: function onMouseOver(e) {
                e.stopPropagation();
                hoveredAnnotationUpdate(idToPass, meta);
                onHover({ e: e, idToPass: idToPass, meta: meta });
            },
            onMouseLeave: mouseAway
        };
        var extraProps = {
            hovered: hovered,
            hoveredId: hoveredId
        };
        var propsToPass = passJustOnMouseOverAndClassname ? props : _extends({}, props, extraProps);
        if (typeof children === 'function') {
            return _react2.default.cloneElement(children(propsToPass), propsToPass);
        } else {
            return _react2.default.cloneElement(children, propsToPass);
        }
    };

    return HoverHelper;
}(_react2.default.Component);

var WrappedHoverHelper = (0, _reactRedux.connect)(function (state, _ref2) {
    var id = _ref2.id,
        meta = _ref2.meta;

    var editorState = state.VectorEditor[meta.namespace] || {};
    var isIdHashmap = (typeof id === 'undefined' ? 'undefined' : _typeof(id)) === 'object';
    var hoveredId = editorState.hoveredAnnotation;
    var hovered = isIdHashmap ? id[hoveredId] : hoveredId === id;
    var idToPass = isIdHashmap ? Object.keys(id)[0] : id;
    return {
        hovered: hovered,
        id: id,
        hoveredId: hovered ? hoveredId : '', //only pass the hoveredId in if the component is actually interested in it to prevent unecessary renders
        isIdHashmap: isIdHashmap,
        idToPass: idToPass
    };
}, hoveredAnnotationActions)((0, _reactMouseAware.mouseAware)()(HoverHelper));
exports.default = WrappedHoverHelper;


function noop() {}
module.exports = exports['default'];