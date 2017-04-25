var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import drawDirectedPiePiece from '../drawDirectedPiePiece';

export default function CircularFeature(_ref) {
    var _ref$color = _ref.color,
        color = _ref$color === undefined ? 'orange' : _ref$color,
        radius = _ref.radius,
        _ref$arrowheadLength = _ref.arrowheadLength,
        arrowheadLength = _ref$arrowheadLength === undefined ? .5 : _ref$arrowheadLength,
        annotationHeight = _ref.annotationHeight,
        totalAngle = _ref.totalAngle,
        rest = _objectWithoutProperties(_ref, ['color', 'radius', 'arrowheadLength', 'annotationHeight', 'totalAngle']);

    var path = drawDirectedPiePiece({
        radius: radius,
        annotationHeight: annotationHeight,
        totalAngle: totalAngle,
        arrowheadLength: arrowheadLength,
        tailThickness: 1 //feature specific
    });
    return React.createElement('path', _extends({}, rest, {
        className: 'veFeature veCircularViewFeature',
        strokeWidth: '.5',
        stroke: 'black',
        fill: color,
        d: path.print()
    }));
};