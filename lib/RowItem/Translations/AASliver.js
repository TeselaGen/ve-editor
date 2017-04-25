'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AASliver = _react2.default.createClass({
    displayName: 'AASliver',

    mixins: [_reactAddonsPureRenderMixin2.default],
    propTypes: {
        width: _react.PropTypes.number.isRequired,
        height: _react.PropTypes.number.isRequired,
        color: _react.PropTypes.string.isRequired,
        forward: _react.PropTypes.bool.isRequired,
        positionInCodon: _react.PropTypes.number.isRequired,
        letter: _react.PropTypes.string.isRequired,
        onClick: _react.PropTypes.func.isRequired,
        onContextMenu: _react.PropTypes.func.isRequired,
        onDoubleClick: _react.PropTypes.func.isRequired,
        relativeAAPositionInTranslation: _react.PropTypes.number.isRequired
    },
    render: function render() {
        var fatness = 24;
        var x1 = 50 - fatness;
        var x2 = 50 + fatness;
        var offset = 0;
        var offsetStrength = 7;
        if (this.props.positionInCodon === 0) {
            offset = -1;
        } else if (this.props.positionInCodon === 2) {
            offset = 1;
        }
        if (this.props.forward) {
            offset = -offset;
        }
        offset = offset * offsetStrength;
        if (this.props.letter === '-') {
            return null;
        }
        return _react2.default.createElement(
            'g',
            {
                onClick: this.props.onClick,
                onContextMenu: this.props.onContextMenu
                // onClick={getClickHandler(this.props.onClick, this.props.onDoubleClick, 250)}
                // onDoubleClick={this.props.onDoubleClick}
                , transform: "scale(" + this.props.width / 100 * 1.25 + ", " + this.props.height / 100 + ") translate(" + (this.props.relativeAAPositionInTranslation * 100 / 1.25 + offset) + ",0)"
            },
            _react2.default.createElement('polyline', {
                className: this.props.letter,
                transform: this.props.forward ? null : "translate(100,0) scale(-1,1) ",
                points: "0,0 " + x2 + ",0 100,50 " + x2 + ",100 0,100 " + x1 + ",50 0,0",
                strokeWidth: '5'
                // stroke="black"
                , opacity: 0.5,
                fill: this.props.color || 'gray'
            }),
            this.props.positionInCodon === 1 && _react2.default.createElement(
                'text',
                {
                    fontSize: 25,
                    stroke: 'black',
                    strokeWidth: 2,
                    transform: 'scale(3,3) translate(17,21)',
                    x: '0',
                    y: '4',
                    style: { textAnchor: "middle" }
                },
                this.props.letter
            )
        );
        // function getClickHandler(onClick, onDblClick, pDelay) {
        //     let timeoutID = null;
        //     const delay = pDelay || 250;
        //     return function(event) {
        //         let singleClicking = true;
        //         if (!timeoutID) {
        //             timeoutID = setTimeout(function() {
        //                 if (singleClicking) {
        //                     onClick(event);
        //                 }
        //                 timeoutID = null;
        //             }, delay);
        //         } else {
        //             singleClicking = false;
        //             timeoutID = clearTimeout(timeoutID);
        //             onDblClick(event);
        //         }
        //     };
        // }
    }
});
exports.default = AASliver;
module.exports = exports['default'];