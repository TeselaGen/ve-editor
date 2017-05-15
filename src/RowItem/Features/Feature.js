import getAnnotationNameAndStartStopString from '../../utils/getAnnotationNameAndStartStopString'

import PropTypes from 'prop-types';

import React from 'react';

function Feature(props) {
    var {
        widthInBps, 
        charWidth, 
        height, 
        rangeType, 
        forward, 
        name,
        pointiness=8,
        fontWidth=12, 
        color='orange', 
        featureClicked,
        featureRightClicked,
        annotation
    } = props;

    var width = widthInBps * charWidth;
    var charWN = charWidth; //charWN is normalized
    if (charWidth < 15) { //allow the arrow width to adapt
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
        path = `
        M 0,0 
        L ${width-pointiness/2},0
        Q ${width + pointiness/2},${height/2} ${width-pointiness/2},${height}
        L ${0},${height}
        Q ${pointiness},${height/2} ${0},${0}
        z`;
    } else if (rangeType === 'start') {
        path = `
        M 0,0 
        L ${width-pointiness/2},0 
        Q ${width + pointiness/2},${height/2} ${width-pointiness/2},${height}
        L 0,${height} 
        z`
    } else if (rangeType ==='beginningAndEnd') {
        path = `
        M 0,0 
        L ${widthMinusOne},0 
        L ${width},${height/2} 
        L ${widthMinusOne},${height} 
        L 0,${height} 
        z`
    } else {
      path = `
      M 0,0 
      L ${widthMinusOne},0 
      L ${width},${height/2} 
      L ${widthMinusOne},${height} 
      L 0,${height} 
      Q ${pointiness},${height/2} ${0},${0}
      z`
    }
    var nameToDisplay = name
    var textLength = name.length * fontWidth
    var textOffset = (widthMinusOne/4)
    if (textLength > widthMinusOne) {
      textOffset = 0
      nameToDisplay = ''
    }
    // path=path.replace(/ /g,'')
    // path=path.replace(/\n/g,'')
    return (
        <g
            className='veRowViewFeature clickable'
            onClick={function (event) {
              featureClicked({annotation,event})
            }}
            onContextMenu={function (event) {
              featureRightClicked({annotation,event})
            }}
            >
            <title>{getAnnotationNameAndStartStopString(annotation)}</title>
            <path
              strokeWidth="1"
              stroke={ 'black' }
              fill={ color }
              transform={ forward ? null : "translate(" + width + ",0) scale(-1,1) " }
              d={ path }/>
            <text style={{fill: 'black', fontSize: '.75em'}} transform={`translate(${textOffset},${height-2})`}>{nameToDisplay}</text>
        </g>
        );
}

Feature.propTypes = {
    widthInBps: PropTypes.number.isRequired,
    charWidth: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    rangeType: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    forward: PropTypes.bool.isRequired,
    featureClicked: PropTypes.func.isRequired,
};

export default Feature;
