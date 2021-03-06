'use strict';

exports.__esModule = true;

var _class, _temp2;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Clipboard = (_temp2 = _class = function (_React$Component) {
    _inherits(Clipboard, _React$Component);

    function Clipboard() {
        var _temp, _this, _ret;

        _classCallCheck(this, Clipboard);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleKeyDown = function (e) {
            var metaKeyIsDown = e.ctrlKey || e.metaKey;
            var textIsSelected = window.getSelection().toString();

            if (!metaKeyIsDown || textIsSelected) {
                return;
            }

            var element = _reactDom2.default.findDOMNode(_this);
            element.focus();
            element.select();
        }, _this.handleKeyUp = function (e) {
            var element = _reactDom2.default.findDOMNode(_this);
            element.blur();
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    Clipboard.prototype.componentDidMount = function componentDidMount() {
        this.component.parentNode.addEventListener("keydown", this.handleKeyDown, false);
        this.component.parentNode.addEventListener("keyup", this.handleKeyUp, false);
    };

    Clipboard.prototype.componentWillUnmount = function componentWillUnmount() {
        this.component.parentNode.removeEventListener("keydown", this.handleKeyDown, false);
        this.component.parentNode.removeEventListener("keyup", this.handleKeyUp, false);
    };

    Clipboard.prototype.render = function render() {
        var _this2 = this;

        var value = this.props.value;
        var style = {
            position: 'fixed',
            // width: 0, //tnr: commented these out because they seem to be messing thing up if used...
            // height: 0,
            opacity: 0,
            left: 0,
            padding: 0,
            top: 0,
            margin: 0,
            zIndex: 100
        };
        return _react2.default.createElement('input', {
            ref: function ref(c) {
                if (c) {
                    _this2.component = c;
                }
            },
            style: style,
            type: 'text',
            readOnly: true,
            value: value,
            onPaste: this.props.onPaste,
            onCopy: this.props.onCopy
        });
    };

    return Clipboard;
}(_react2.default.Component), _class.defaultProps = {
    className: "clipboard"
}, _temp2);
process.env.NODE_ENV !== "production" ? Clipboard.propTypes = {
    value: _propTypes2.default.string.isRequired
} : void 0;
exports.default = Clipboard;
module.exports = exports['default'];