import getAnnotationNameAndStartStopString from '../../utils/getAnnotationNameAndStartStopString';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

var Primer = React.createClass({
    displayName: 'Primer',

    mixins: [PureRenderMixin],
    propTypes: {
        widthInBps: React.PropTypes.number.isRequired,
        charWidth: React.PropTypes.number.isRequired,
        height: React.PropTypes.number.isRequired,
        rangeType: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        forward: React.PropTypes.bool.isRequired,
        primerClicked: React.PropTypes.func.isRequired
    },

    render: function render() {
        var _props = this.props,
            widthInBps = _props.widthInBps,
            charWidth = _props.charWidth,
            height = _props.height,
            rangeType = _props.rangeType,
            forward = _props.forward,
            name = _props.name,
            _props$pointiness = _props.pointiness,
            pointiness = _props$pointiness === undefined ? 8 : _props$pointiness,
            _props$fontWidth = _props.fontWidth,
            fontWidth = _props$fontWidth === undefined ? 9 : _props$fontWidth,
            _props$color = _props.color,
            color = _props$color === undefined ? 'orange' : _props$color,
            primerClicked = _props.primerClicked,
            primerRightClicked = _props.primerRightClicked,
            annotation = _props.annotation;


        var width = widthInBps * charWidth;
        var charWN = charWidth; //charWN is normalized
        if (charWidth < 15) {
            //allow the arrow width to adapt
            if (width > 15) {
                charWN = 15; //tnr: replace 15 here with a non-hardcoded number..
            } else {
                charWN = width;
            }
        }
        var widthMinusOne = width - charWN;
        var path;
        // starting from the top left of the primer
        if (rangeType === 'middle') {
            //draw a rectangle
            path = '\n            M 0,0 \n            L ' + (width - pointiness / 2) + ',0\n            Q ' + (width + pointiness / 2) + ',' + height / 2 + ' ' + (width - pointiness / 2) + ',' + height + '\n            L ' + 0 + ',' + height + '\n            Q ' + pointiness + ',' + height / 2 + ' ' + 0 + ',' + 0 + '\n            z';
        } else if (rangeType === 'start') {
            path = '\n            M 0,0 \n            L ' + (width - pointiness / 2) + ',0 \n            Q ' + (width + pointiness / 2) + ',' + height / 2 + ' ' + (width - pointiness / 2) + ',' + height + '\n            L 0,' + height + ' \n            z';
        } else if (rangeType === 'beginningAndEnd') {
            path = '\n            M 0,0 \n            L ' + widthMinusOne + ',0 \n            L ' + width + ',' + height / 2 + ' \n            L ' + widthMinusOne + ',' + height + ' \n            L 0,' + height + ' \n            z';
        } else {
            path = '\n          M 0,0 \n          L ' + widthMinusOne + ',0 \n          L ' + width + ',' + height / 2 + ' \n          L ' + widthMinusOne + ',' + height + ' \n          L 0,' + height + ' \n          Q ' + pointiness + ',' + height / 2 + ' ' + 0 + ',' + 0 + '\n          z';
        }

        function getTextWidth(text, font) {
            // re-use canvas object for better performance
            var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
            var context = canvas.getContext("2d");
            context.font = font;
            var metrics = context.measureText(text);
            return metrics.width;
        }
        var textLength = getTextWidth(name, 'normal 10pt Maven Pro');
        var nameToDisplay = name;
        // var textLength = name.length * fontWidth
        var textOffset = rangeType === 'end' && !forward ? 14 : 6;
        if (textLength - 30 > widthMinusOne) {
            textOffset = 0;
            nameToDisplay = '';
        }
        // path=path.replace(/ /g,'')
        // path=path.replace(/\n/g,'')
        return React.createElement(
            'g',
            {
                className: 'veRowViewPrimer clickable',
                onClick: function onClick(event) {
                    primerClicked({ annotation: annotation, event: event });
                },
                onContextMenu: function onContextMenu(event) {
                    primerRightClicked({ annotation: annotation, event: event });
                }
            },
            React.createElement(
                'title',
                null,
                getAnnotationNameAndStartStopString(annotation)
            ),
            React.createElement('path', {
                strokeWidth: '1',
                stroke: 'black',
                fill: color,
                transform: forward ? null : "translate(" + width + ",0) scale(-1,1) ",
                d: path }),
            React.createElement(
                'text',
                { style: { fill: 'black', fontSize: '10px' }, transform: 'translate(' + textOffset + ',' + (height - 2) + ')' },
                nameToDisplay
            )
        );
    }
});
export default Primer;