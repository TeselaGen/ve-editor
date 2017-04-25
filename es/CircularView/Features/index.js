var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import getAnnotationNameAndStartStopString from '../../utils/getAnnotationNameAndStartStopString';
import './style.css';
import Feature from './Feature';
import drawCircularLabel2 from '../drawCircularLabel2';
import intervalTree2 from 'interval-tree2';
import getRangeAngles from '../getRangeAnglesSpecial';
import featureColorMap from '../../constants/featureColorMap.json';
import getYOffset from '../getYOffset';
import lruMemoize from 'lru-memoize';
import PositionAnnotationOnCircle from '../PositionAnnotationOnCircle';
import React from 'react';
import noop from 'lodash/noop';

function Features(_ref) {
    var radius = _ref.radius,
        _ref$forceInlineFeatu = _ref.forceInlineFeatureLabels,
        forceInlineFeatureLabels = _ref$forceInlineFeatu === undefined ? true : _ref$forceInlineFeatu,
        _ref$forceOuterFeatur = _ref.forceOuterFeatureLabels,
        forceOuterFeatureLabels = _ref$forceOuterFeatur === undefined ? true : _ref$forceOuterFeatur,
        _ref$spaceBetweenAnno = _ref.spaceBetweenAnnotations,
        spaceBetweenAnnotations = _ref$spaceBetweenAnno === undefined ? 2 : _ref$spaceBetweenAnno,
        _ref$noFeatureLabels = _ref.noFeatureLabels,
        noFeatureLabels = _ref$noFeatureLabels === undefined ? false : _ref$noFeatureLabels,
        _ref$featureHeight = _ref.featureHeight,
        featureHeight = _ref$featureHeight === undefined ? 10 : _ref$featureHeight,
        _ref$featureClicked = _ref.featureClicked,
        featureClicked = _ref$featureClicked === undefined ? noop : _ref$featureClicked,
        HoverHelper = _ref.HoverHelper,
        _ref$features = _ref.features,
        features = _ref$features === undefined ? {} : _ref$features,
        sequenceLength = _ref.sequenceLength;

    var totalAnnotationHeight = featureHeight + spaceBetweenAnnotations;
    var featureITree = new intervalTree2(Math.PI);
    var maxYOffset = 0;
    var svgGroup = [];
    var labels = {};
    Object.keys(features).forEach(function (key, index) {
        var annotation = features[key];
        function onClick(event) {
            featureClicked({ event: event, annotation: annotation });
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
            annotationCopy.yOffset = getYOffset(featureITree, startAngle, expandedEndAngle);
        } else {
            //we need to check both locations to account for annotations that span the origin
            yOffset1 = getYOffset(featureITree, startAngle, expandedEndAngle);
            yOffset2 = getYOffset(featureITree, startAngle + Math.PI * 2, expandedEndAngle + Math.PI * 2);
            annotationCopy.yOffset = Math.max(yOffset1, yOffset2);
        }

        annotationRadius = radius + annotationCopy.yOffset * totalAnnotationHeight;
        //check if annotation name will fit
        var labelAngle = annotation.name.length * 9 / annotationRadius;
        if (!forceOuterFeatureLabels && !noFeatureLabels) {
            labelFits = labelAngle < totalAngle;
            if (!labelFits || forceInlineFeatureLabels) {
                //if the label doesn't fit within the annotation, draw it to the side
                expandedEndAngle += labelAngle; //expand the end angle because we're treating the label as part of the annotation
                //calculate the new center angle of the label
                labelCenter = endAngle + labelAngle / 2;
                //and calculate a new y offset
                //we need to check both locations to account for annotations that span the origin
                yOffset1 = getYOffset(featureITree, startAngle, expandedEndAngle);
                yOffset2 = getYOffset(featureITree, startAngle + Math.PI * 2, expandedEndAngle + Math.PI * 2);
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

        if (!labelFits && !noFeatureLabels) {
            //add labels to the exported label array (to be drawn by the label component)
            labels[annotation.id] = {
                annotationCenterAngle: centerAngle,
                annotationCenterRadius: annotationRadius,
                text: annotation.name,
                id: annotation.id,
                className: 'veFeatureLabel',
                onClick: onClick
            };
        }
        if (spansOrigin) {
            featureITree.add(startAngle, expandedEndAngle, undefined, _extends({}, annotationCopy));
        } else {
            //normal feature
            // we need to add it twice to the interval tree to accomodate features which span the origin
            featureITree.add(startAngle, expandedEndAngle, undefined, _extends({}, annotationCopy));
            featureITree.add(startAngle + 2 * Math.PI, expandedEndAngle + 2 * Math.PI, undefined, _extends({}, annotationCopy));
        }

        if (annotationCopy.yOffset > maxYOffset) {
            maxYOffset = annotationCopy.yOffset;
        }

        var annotationColor = annotation.color || "#BBBBBB";
        if (annotation.type) {
            if (featureColorMap[annotation.type]) {
                annotationColor = featureColorMap[annotation.type];
            }
        }

        if (!annotation.id) debugger;
        svgGroup.push(React.createElement(
            HoverHelper,
            {
                id: annotation.id,
                key: 'Features' + index,
                passJustOnMouseOverAndClassname: true
            },
            React.createElement(
                'g',
                { onClick: onClick, className: 'Features clickable' },
                React.createElement(
                    'title',
                    null,
                    getAnnotationNameAndStartStopString(annotation)
                ),
                React.createElement(
                    PositionAnnotationOnCircle,
                    {
                        key: 'feature' + index,
                        sAngle: startAngle,
                        eAngle: endAngle,
                        forward: !annotation.forward },
                    React.createElement(Feature, {
                        totalAngle: totalAngle,
                        color: annotationColor,
                        key: 'feature' + index,
                        radius: annotationRadius,
                        annotationHeight: featureHeight })
                ),
                labelFits && !noFeatureLabels && React.createElement(
                    PositionAnnotationOnCircle,
                    {
                        key: 'inlineLabel' + index,
                        sAngle: labelCenter + Math.PI //add PI because drawCircularLabel is drawing 180
                        , eAngle: labelCenter + Math.PI
                    },
                    drawCircularLabel2({
                        centerAngle: labelCenter, //used to flip label if necessary
                        radius: annotationRadius,
                        height: featureHeight,
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
            { className: 'veFeatures', key: 'veFeatures' },
            svgGroup
        ),
        height: maxYOffset * totalAnnotationHeight + .5 * featureHeight,
        labels: labels
    };
}

export default lruMemoize(5, undefined, true)(Features);