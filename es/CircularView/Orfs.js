var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import getAnnotationNameAndStartStopString from '../utils/getAnnotationNameAndStartStopString';
import orfFrameToColorMap from '../constants/orfFrameToColorMap';
import drawDirectedPiePiece from './drawDirectedPiePiece';
import intervalTree2 from 'interval-tree2';
import getRangeAngles from './getRangeAnglesSpecial';
import getAngleForPositionMidpoint from './getAngleForPositionMidpoint';
import getYOffset from './getYOffset';
import lruMemoize from 'lru-memoize';
import PositionAnnotationOnCircle from './PositionAnnotationOnCircle';
import React from 'react';
import noop from 'lodash/noop';

function Orfs(_ref) {
    var radius = _ref.radius,
        _ref$spaceBetweenAnno = _ref.spaceBetweenAnnotations,
        spaceBetweenAnnotations = _ref$spaceBetweenAnno === undefined ? 2 : _ref$spaceBetweenAnno,
        _ref$orfHeight = _ref.orfHeight,
        orfHeight = _ref$orfHeight === undefined ? 6 : _ref$orfHeight,
        _ref$orfClicked = _ref.orfClicked,
        orfClicked = _ref$orfClicked === undefined ? noop : _ref$orfClicked,
        HoverHelper = _ref.HoverHelper,
        _ref$orfs = _ref.orfs,
        orfs = _ref$orfs === undefined ? {} : _ref$orfs,
        sequenceLength = _ref.sequenceLength;

    // var orfHeight
    var totalAnnotationHeight = orfHeight + spaceBetweenAnnotations;
    var itree = new intervalTree2(Math.PI);
    var maxYOffset = 0;
    var svgGroup = [];
    var labels = {};

    Object.keys(orfs).forEach(function (key, index) {
        var annotation = orfs[key];
        function onClick(event) {
            orfClicked({ event: event, annotation: annotation });
            event.stopPropagation();
        }
        var annotationCopy = _extends({}, annotation);

        var _getRangeAngles = getRangeAngles(annotation, sequenceLength),
            startAngle = _getRangeAngles.startAngle,
            endAngle = _getRangeAngles.endAngle,
            totalAngle = _getRangeAngles.totalAngle;

        var spansOrigin = startAngle > endAngle;
        //expand the end angle if annotation spans the origin
        var expandedEndAngle = spansOrigin ? endAngle + 2 * Math.PI : endAngle;
        // if (annotationCopy.id === '5590c1d88979df000a4f02f5c') debugger;
        var yOffset1;
        var yOffset2;
        if (spansOrigin) {
            annotationCopy.yOffset = getYOffset(itree, startAngle, expandedEndAngle);
        } else {
            //we need to check both locations to account for annotations that span the origin
            yOffset1 = getYOffset(itree, startAngle, expandedEndAngle);
            yOffset2 = getYOffset(itree, startAngle + Math.PI * 2, expandedEndAngle + Math.PI * 2);
            annotationCopy.yOffset = Math.max(yOffset1, yOffset2);
        }

        if (spansOrigin) {
            itree.add(startAngle, expandedEndAngle, undefined, _extends({}, annotationCopy));
        } else {
            //normal orf
            // we need to add it twice to the interval tree to accomodate orfs which span the origin
            itree.add(startAngle, expandedEndAngle, undefined, _extends({}, annotationCopy));
            itree.add(startAngle + 2 * Math.PI, expandedEndAngle + 2 * Math.PI, undefined, _extends({}, annotationCopy));
        }

        if (annotationCopy.yOffset > maxYOffset) {
            maxYOffset = annotationCopy.yOffset;
        }
        var annotationRadius = radius + annotationCopy.yOffset * totalAnnotationHeight;
        var path = drawDirectedPiePiece({
            radius: annotationRadius,
            annotationHeight: orfHeight,
            totalAngle: totalAngle,
            arrowheadLength: .4,
            tailThickness: .4
        }).print();

        var color = orfFrameToColorMap[annotation.frame];
        svgGroup.push(React.createElement(
            HoverHelper,
            {
                id: annotation.id,
                key: 'orf' + index,
                passJustOnMouseOverAndClassname: true
            },
            React.createElement(
                'g',
                { onClick: onClick, className: 'Orfs clickable' },
                React.createElement(
                    'title',
                    null,
                    ' ',
                    getAnnotationNameAndStartStopString(annotation, { startText: 'Open Reading Frame:' }),
                    ' '
                ),
                React.createElement(
                    PositionAnnotationOnCircle,
                    {
                        sAngle: startAngle,
                        eAngle: endAngle,
                        forward: !annotation.forward },
                    React.createElement('path', {
                        className: 'veOrf',
                        strokeWidth: '.5',
                        stroke: color,
                        fill: color,
                        d: path
                    })
                )
            )
        ));
    });
    return {
        component: React.createElement(
            'g',
            { className: 'veOrfs', key: 'veOrfs' },
            svgGroup
        ),
        height: maxYOffset * totalAnnotationHeight + .5 * orfHeight,
        labels: labels
    };
}

export default lruMemoize(5, undefined, true)(Orfs);