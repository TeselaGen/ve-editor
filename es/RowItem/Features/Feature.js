import getAnnotationNameAndStartStopString from '../../utils/getAnnotationNameAndStartStopString';

import PropTypes from 'prop-types';

import React from 'react';

function Feature(props) {
    var widthInBps = props.widthInBps,
        charWidth = props.charWidth,
        height = props.height,
        rangeType = props.rangeType,
        forward = props.forward,
        name = props.name,
        _props$pointiness = props.pointiness,
        pointiness = _props$pointiness === undefined ? 8 : _props$pointiness,
        _props$fontWidth = props.fontWidth,
        fontWidth = _props$fontWidth === undefined ? 12 : _props$fontWidth,
        _props$color = props.color,
        color = _props$color === undefined ? 'orange' : _props$color,
        featureClicked = props.featureClicked,
        featureRightClicked = props.featureRightClicked,
        annotation = props.annotation;


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
    // starting from the top left of the feature
    if (rangeType === 'middle') {
        //draw a rectangle
        path = '\n        M 0,0 \n        L ' + (width - pointiness / 2) + ',0\n        Q ' + (width + pointiness / 2) + ',' + height / 2 + ' ' + (width - pointiness / 2) + ',' + height + '\n        L ' + 0 + ',' + height + '\n        Q ' + pointiness + ',' + height / 2 + ' ' + 0 + ',' + 0 + '\n        z';
    } else if (rangeType === 'start') {
        path = '\n        M 0,0 \n        L ' + (width - pointiness / 2) + ',0 \n        Q ' + (width + pointiness / 2) + ',' + height / 2 + ' ' + (width - pointiness / 2) + ',' + height + '\n        L 0,' + height + ' \n        z';
    } else if (rangeType === 'beginningAndEnd') {
        path = '\n        M 0,0 \n        L ' + widthMinusOne + ',0 \n        L ' + width + ',' + height / 2 + ' \n        L ' + widthMinusOne + ',' + height + ' \n        L 0,' + height + ' \n        z';
    } else {
        path = '\n      M 0,0 \n      L ' + widthMinusOne + ',0 \n      L ' + width + ',' + height / 2 + ' \n      L ' + widthMinusOne + ',' + height + ' \n      L 0,' + height + ' \n      Q ' + pointiness + ',' + height / 2 + ' ' + 0 + ',' + 0 + '\n      z';
    }
    var nameToDisplay = name;
    var textLength = name.length * fontWidth;
    var textOffset = widthMinusOne / 4;
    if (textLength > widthMinusOne) {
        textOffset = 0;
        nameToDisplay = '';
    }
    // path=path.replace(/ /g,'')
    // path=path.replace(/\n/g,'')
    return React.createElement(
        'g',
        {
            className: 'veRowViewFeature clickable',
            onClick: function onClick(event) {
                featureClicked({ annotation: annotation, event: event });
            },
            onContextMenu: function onContextMenu(event) {
                featureRightClicked({ annotation: annotation, event: event });
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
            { style: { fill: 'black', fontSize: '.75em' }, transform: 'translate(' + textOffset + ',' + (height - 2) + ')' },
            nameToDisplay
        )
    );
}

process.env.NODE_ENV !== "production" ? Feature.propTypes = {
    widthInBps: PropTypes.number.isRequired,
    charWidth: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    rangeType: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    forward: PropTypes.bool.isRequired,
    featureClicked: PropTypes.func.isRequired
} : void 0;

export default Feature;