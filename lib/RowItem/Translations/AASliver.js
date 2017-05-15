'use strict';

exports.__esModule = true;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function AASliver(props) {
    var fatness = 24;
    var x1 = 50 - fatness;
    var x2 = 50 + fatness;
    var offset = 0;
    var offsetStrength = 7;
    if (props.positionInCodon === 0) {
        offset = -1;
    } else if (props.positionInCodon === 2) {
        offset = 1;
    }
    if (props.forward) {
        offset = -offset;
    }
    offset = offset * offsetStrength;
    if (props.letter === '-') {
        return null;
    }
    return _react2.default.createElement(
        'g',
        {
            onClick: props.onClick,
            onContextMenu: props.onContextMenu
            // onClick={getClickHandler(this.props.onClick, this.props.onDoubleClick, 250)}
            // onDoubleClick={this.props.onDoubleClick}
            , transform: "scale(" + props.width / 100 * 1.25 + ", " + props.height / 100 + ") translate(" + (props.relativeAAPositionInTranslation * 100 / 1.25 + offset) + ",0)"
        },
        _react2.default.createElement('polyline', {
            className: props.letter,
            transform: props.forward ? null : "translate(100,0) scale(-1,1) ",
            points: "0,0 " + x2 + ",0 100,50 " + x2 + ",100 0,100 " + x1 + ",50 0,0",
            strokeWidth: '5'
            // stroke="black"
            , opacity: 0.5,
            fill: props.color || 'gray'
        }),
        props.positionInCodon === 1 && _react2.default.createElement(
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
            props.letter
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

process.env.NODE_ENV !== "production" ? AASliver.propTypes = {
    width: _propTypes2.default.number.isRequired,
    height: _propTypes2.default.number.isRequired,
    color: _propTypes2.default.string.isRequired,
    forward: _propTypes2.default.bool.isRequired,
    positionInCodon: _propTypes2.default.number.isRequired,
    letter: _propTypes2.default.string.isRequired,
    onClick: _propTypes2.default.func.isRequired,
    onContextMenu: _propTypes2.default.func.isRequired,
    onDoubleClick: _propTypes2.default.func.isRequired,
    relativeAAPositionInTranslation: _propTypes2.default.number.isRequired
} : void 0;

exports.default = AASliver;
module.exports = exports['default'];