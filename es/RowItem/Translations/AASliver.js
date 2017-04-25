import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
var AASliver = React.createClass({
    displayName: 'AASliver',

    mixins: [PureRenderMixin],
    propTypes: {
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
        forward: PropTypes.bool.isRequired,
        positionInCodon: PropTypes.number.isRequired,
        letter: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
        onContextMenu: PropTypes.func.isRequired,
        onDoubleClick: PropTypes.func.isRequired,
        relativeAAPositionInTranslation: PropTypes.number.isRequired
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
        return React.createElement(
            'g',
            {
                onClick: this.props.onClick,
                onContextMenu: this.props.onContextMenu
                // onClick={getClickHandler(this.props.onClick, this.props.onDoubleClick, 250)}
                // onDoubleClick={this.props.onDoubleClick}
                , transform: "scale(" + this.props.width / 100 * 1.25 + ", " + this.props.height / 100 + ") translate(" + (this.props.relativeAAPositionInTranslation * 100 / 1.25 + offset) + ",0)"
            },
            React.createElement('polyline', {
                className: this.props.letter,
                transform: this.props.forward ? null : "translate(100,0) scale(-1,1) ",
                points: "0,0 " + x2 + ",0 100,50 " + x2 + ",100 0,100 " + x1 + ",50 0,0",
                strokeWidth: '5'
                // stroke="black"
                , opacity: 0.5,
                fill: this.props.color || 'gray'
            }),
            this.props.positionInCodon === 1 && React.createElement(
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
export default AASliver;