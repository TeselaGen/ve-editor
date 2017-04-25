var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import getAnnotationNameAndStartStopString from '../../utils/getAnnotationNameAndStartStopString';
import './style.css';
import Primer from './Primer';
import drawCircularLabel2 from '../drawCircularLabel2';
import intervalTree2 from 'interval-tree2';
import getRangeAngles from '../getRangeAnglesSpecial';

import getYOffset from '../getYOffset';
import lruMemoize from 'lru-memoize';
import PositionAnnotationOnCircle from '../PositionAnnotationOnCircle';
import React from 'react';
import noop from 'lodash/noop';

function Primers(_ref) {
    var radius = _ref.radius,
        _ref$forceInlinePrime = _ref.forceInlinePrimerLabels,
        forceInlinePrimerLabels = _ref$forceInlinePrime === undefined ? true : _ref$forceInlinePrime,
        _ref$forceOuterPrimer = _ref.forceOuterPrimerLabels,
        forceOuterPrimerLabels = _ref$forceOuterPrimer === undefined ? true : _ref$forceOuterPrimer,
        _ref$spaceBetweenAnno = _ref.spaceBetweenAnnotations,
        spaceBetweenAnnotations = _ref$spaceBetweenAnno === undefined ? 2 : _ref$spaceBetweenAnno,
        _ref$noPrimerLabels = _ref.noPrimerLabels,
        noPrimerLabels = _ref$noPrimerLabels === undefined ? false : _ref$noPrimerLabels,
        _ref$primerHeight = _ref.primerHeight,
        primerHeight = _ref$primerHeight === undefined ? 10 : _ref$primerHeight,
        _ref$primerClicked = _ref.primerClicked,
        primerClicked = _ref$primerClicked === undefined ? noop : _ref$primerClicked,
        HoverHelper = _ref.HoverHelper,
        _ref$primers = _ref.primers,
        primers = _ref$primers === undefined ? {} : _ref$primers,
        sequenceLength = _ref.sequenceLength;

    var totalAnnotationHeight = primerHeight + spaceBetweenAnnotations;
    var primerITree = new intervalTree2(Math.PI);
    var maxYOffset = 0;
    var svgGroup = [];
    var labels = {};
    Object.keys(primers).forEach(function (key, index) {
        var annotation = primers[key];
        function onClick(event) {
            primerClicked({ event: event, annotation: annotation });
            event.stopPropagation();
        }
        var annotationCopy = _extends({}, annotation);
        var annotationRadius;
        var labelFits;

        var _getRangeAngles = getRangeAngles(annotation, sequenceLength),
            startAngle = _getRangeAngles.startAngle,
            endAngle = _getRangeAngles.endAngle,
            totalAngle = _getRangeAngles.totalAngle,
            centerAngle = _getRangeAngles.centerAngle;

        var spansOrigin = startAngle > endAngle;
        var labelCenter = centerAngle;
        //expand the end angle if annotation spans the origin
        var expandedEndAngle = spansOrigin ? endAngle + 2 * Math.PI : endAngle;
        // if (annotationCopy.id === '5590c1d88979df000a4f02f5c') debugger;
        var yOffset1;
        var yOffset2;
        if (spansOrigin) {
            annotationCopy.yOffset = getYOffset(primerITree, startAngle, expandedEndAngle);
        } else {
            //we need to check both locations to account for annotations that span the origin
            yOffset1 = getYOffset(primerITree, startAngle, expandedEndAngle);
            yOffset2 = getYOffset(primerITree, startAngle + Math.PI * 2, expandedEndAngle + Math.PI * 2);
            annotationCopy.yOffset = Math.max(yOffset1, yOffset2);
        }

        annotationRadius = radius + annotationCopy.yOffset * totalAnnotationHeight;
        //check if annotation name will fit
        var labelAngle = annotation.name.length * 9 / annotationRadius;
        if (!forceOuterPrimerLabels && !noPrimerLabels) {
            labelFits = labelAngle < totalAngle;
            if (!labelFits || forceInlinePrimerLabels) {
                //if the label doesn't fit within the annotation, draw it to the side
                expandedEndAngle += labelAngle; //expand the end angle because we're treating the label as part of the annotation
                //calculate the new center angle of the label
                labelCenter = endAngle + labelAngle / 2;
                //and calculate a new y offset
                //we need to check both locations to account for annotations that span the origin
                yOffset1 = getYOffset(primerITree, startAngle, expandedEndAngle);
                yOffset2 = getYOffset(primerITree, startAngle + Math.PI * 2, expandedEndAngle + Math.PI * 2);
                annotationCopy.yOffset = Math.max(yOffset1, yOffset2);
                labelFits = true;
                // calculate the radius again
                annotationRadius = radius + annotationCopy.yOffset * totalAnnotationHeight;
            }
        }
        // calculate the (potentially new) labelCenter

        // if (yOffset > 5) {
        //     //don't push the annotation onto the pile
        //     return 
        // }

        if (!labelFits && !noPrimerLabels) {
            //add labels to the exported label array (to be drawn by the label component)
            labels[annotation.id] = {
                annotationCenterAngle: centerAngle,
                annotationCenterRadius: annotationRadius,
                text: annotation.name,
                id: annotation.id,
                className: 'vePrimerLabel',
                onClick: onClick
            };
        }
        if (spansOrigin) {
            primerITree.add(startAngle, expandedEndAngle, undefined, _extends({}, annotationCopy));
        } else {
            //normal primer
            // we need to add it twice to the interval tree to accomodate primers which span the origin
            primerITree.add(startAngle, expandedEndAngle, undefined, _extends({}, annotationCopy));
            primerITree.add(startAngle + 2 * Math.PI, expandedEndAngle + 2 * Math.PI, undefined, _extends({}, annotationCopy));
        }

        if (annotationCopy.yOffset > maxYOffset) {
            maxYOffset = annotationCopy.yOffset;
        }
        if (!annotation.id) debugger;
        svgGroup.push(React.createElement(
            HoverHelper,
            {
                id: annotation.id,
                key: 'Primers' + index,
                passJustOnMouseOverAndClassname: true
            },
            React.createElement(
                'g',
                { onClick: onClick, className: 'Primers clickable' },
                React.createElement(
                    'title',
                    null,
                    getAnnotationNameAndStartStopString(annotation)
                ),
                React.createElement(
                    PositionAnnotationOnCircle,
                    {
                        key: 'primer' + index,
                        sAngle: startAngle,
                        eAngle: endAngle,
                        forward: !annotation.forward },
                    React.createElement(Primer, {
                        totalAngle: totalAngle,
                        color: annotation.color,
                        key: 'primer' + index,
                        radius: annotationRadius,
                        annotationHeight: primerHeight })
                ),
                labelFits && !noPrimerLabels && React.createElement(
                    PositionAnnotationOnCircle,
                    {
                        key: 'inlineLabel' + index,
                        sAngle: labelCenter + Math.PI //add PI because drawCircularLabel is drawing 180
                        , eAngle: labelCenter + Math.PI
                    },
                    drawCircularLabel2({
                        centerAngle: labelCenter, //used to flip label if necessary
                        radius: annotationRadius,
                        height: primerHeight,
                        text: annotation.name,
                        id: annotation.id
                    })
                )
            )
        ));
    });
    return {
        component: React.createElement(
            'g',
            { className: 'vePrimers', key: 'vePrimers' },
            svgGroup
        ),
        height: maxYOffset * totalAnnotationHeight + .5 * primerHeight,
        labels: labels
    };
}

export default lruMemoize(5, undefined, true)(Primers);