import React from 'react';
import drawDirectedPiePiece from '../drawDirectedPiePiece';

export default function CircularFeature({color='orange', radius,arrowheadLength=.5, annotationHeight, totalAngle, ...rest}) {
    var path = drawDirectedPiePiece({
        radius,
        annotationHeight,
        totalAngle,
        arrowheadLength,
        tailThickness:1 //feature specific
    })
    return (
        <path
            {...rest}
            className='veFeature veCircularViewFeature'
            strokeWidth=".5"
            stroke={ 'black' }
            fill={ color }
            d={ path.print() }
          />
        )
};
