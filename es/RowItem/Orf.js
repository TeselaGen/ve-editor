import getAnnotationNameAndStartStopString from '../utils/getAnnotationNameAndStartStopString';
import React, { PropTypes } from 'react';
import orfFrameToColorMap from '../constants/orfFrameToColorMap';
import PureRenderMixin from 'react-addons-pure-render-mixin';
var Orf = React.createClass({
    displayName: 'Orf',

    mixins: [PureRenderMixin],

    propTypes: {
        width: PropTypes.number.isRequired,
        charWidth: PropTypes.number.isRequired,
        frame: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        rangeType: PropTypes.string.isRequired,
        forward: PropTypes.bool.isRequired
    },
    render: function render() {
        var _props = this.props,
            height = _props.height,
            rangeType = _props.rangeType,
            _props$normalizedInte = _props.normalizedInternalStartCodonIndices,
            normalizedInternalStartCodonIndices = _props$normalizedInte === undefined ? [] : _props$normalizedInte,
            forward = _props.forward,
            _props$frame = _props.frame,
            frame = _props$frame === undefined ? 0 : _props$frame,
            annotation = _props.annotation,
            width = _props.width,
            orfClicked = _props.orfClicked,
            orfRightClicked = _props.orfRightClicked,
            charWidth = _props.charWidth;

        var heightToUse = height / 1.5;
        var color = orfFrameToColorMap[frame];
        var arrow = null;
        var endCircle = null;
        var circle = React.createElement('circle', {
            key: 'circle',
            r: heightToUse / 2,
            cx: heightToUse / 2,
            cy: heightToUse / 2
        });
        if (rangeType === 'end' || rangeType === 'beginningAndEnd') {
            arrow = React.createElement('path', {
                transform: 'translate(' + (width - charWidth) + ',0) scale(' + charWidth / 64 + ',' + heightToUse / 64 + ')',
                d: rangeType === 'start' ? 'M0 16 L0 48 L16 64 L48 64 L64 48 L64 16 L48 0 L16 0 Z' : 'M0 64 L64 32 L0 0 Z'
            });
        }
        if (rangeType === 'start' || rangeType === 'beginningAndEnd') {
            endCircle = circle;
        }
        var internalStartCodonCircles = normalizedInternalStartCodonIndices.map(function (internalStartCodon, index) {
            return React.cloneElement(circle, { key: index, transform: 'translate(' + charWidth * internalStartCodon + ',0)' });
        });
        return React.createElement(
            'g',
            {
                onClick: function onClick(event) {
                    orfClicked({ annotation: annotation, event: event });
                },
                onContextMenu: function onContextMenu(event) {
                    orfRightClicked({ annotation: annotation, event: event });
                },
                className: 'veRowViewOrf clickable frame' + frame,
                strokeWidth: '1',
                stroke: color,
                fillOpacity: 1,
                fill: color,
                transform: forward ? null : 'translate(' + width + ',0) scale(-1,1)'
            },
            React.createElement('path', {
                transform: (rangeType === 'start' ? 'translate(' + charWidth + ',0)' : '') + ('scale(' + (width - (rangeType === 'middle' ? 0 : charWidth)) / 64 + ',' + heightToUse / 64 + ')'),
                d: 'M0 40 L64 40 L64 20 L0 20 Z'
            }),
            arrow,
            endCircle,
            internalStartCodonCircles,
            React.createElement(
                'title',
                null,
                ' ',
                getAnnotationNameAndStartStopString(annotation, { startText: 'Open Reading Frame:' }),
                ' '
            )
        );
    }
});
export default Orf;