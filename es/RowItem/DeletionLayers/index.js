import AnnotationPositioner from '../AnnotationPositioner';
import AnnotationContainerHolder from '../AnnotationContainerHolder';
import React from 'react';

import './style.css';

import getXStartAndWidthOfRangeWrtRow from '../getXStartAndWidthOfRangeWrtRow';
import getOverlapsOfPotentiallyCircularRanges from 've-range-utils/getOverlapsOfPotentiallyCircularRanges';

function DeletionLayers(props) {
    var charWidth = props.charWidth,
        bpsPerRow = props.bpsPerRow,
        row = props.row,
        sequenceLength = props.sequenceLength,
        deletionLayerClicked = props.deletionLayerClicked,
        deletionLayerRightClicked = props.deletionLayerRightClicked,
        _props$deletionLayers = props.deletionLayers,
        deletionLayers = _props$deletionLayers === undefined ? {} : _props$deletionLayers,
        _props$deletionLineHe = props.deletionLineHeight,
        deletionLineHeight = _props$deletionLineHe === undefined ? 6 : _props$deletionLineHe;


    var deletionLayersToUse = Object.keys(deletionLayers).map(function (key) {
        return deletionLayers[key];
    });
    if (!deletionLayersToUse.length) return null;
    return React.createElement(
        AnnotationContainerHolder,
        {
            className: 'veRowViewDeletionLayers',
            containerHeight: deletionLineHeight },
        deletionLayersToUse.sort(function (deletionLayer) {
            return deletionLayer.inBetweenBps ? 1 : 0;
        }).map(function (deletionLayer, index) {
            var rangeSpansSequence = deletionLayer.start === deletionLayer.end + 1 || deletionLayer.start === 0 && deletionLayer.end === sequenceLength - 1;
            var _deletionLayer$classN = deletionLayer.className,
                className = _deletionLayer$classN === undefined ? '' : _deletionLayer$classN,
                _deletionLayer$style = deletionLayer.style,
                style = _deletionLayer$style === undefined ? {} : _deletionLayer$style,
                color = deletionLayer.color;

            var overlaps = getOverlapsOfPotentiallyCircularRanges(deletionLayer, row, sequenceLength);
            return overlaps.map(function (overlap, index2) {
                var _getXStartAndWidthOfR = getXStartAndWidthOfRangeWrtRow(overlap, row, bpsPerRow, charWidth, sequenceLength),
                    xStart = _getXStartAndWidthOfR.xStart,
                    width = _getXStartAndWidthOfR.width;

                var deletionStart = overlap.start === deletionLayer.start;
                var deletionEnd = overlap.end === deletionLayer.end;

                return [React.createElement(
                    AnnotationPositioner,
                    {
                        height: deletionLineHeight,
                        width: width,
                        key: index,
                        top: 0
                        // className={classnames() } 
                        , left: xStart + (deletionLayer.inBetweenBps ? charWidth / 1.2 : 0)
                    },
                    React.createElement(
                        'g',
                        {
                            className: 'clickable',
                            onClick: function onClick(event) {
                                deletionLayerClicked({ annotation: deletionLayer, event: event });
                            },
                            onContextMenu: function onContextMenu(event) {
                                deletionLayerRightClicked({ annotation: deletionLayer, event: event });
                            }
                        },
                        React.createElement('rect', { fill: color, x: '0', y: '0', height: deletionLineHeight, width: width }),
                        rangeSpansSequence && deletionStart && React.createElement('rect', { fill: 'blue', x: '0', y: '0', height: deletionLineHeight, width: 4 }),
                        rangeSpansSequence && deletionEnd && React.createElement('rect', { fill: 'blue', x: width - 4, y: '0', height: deletionLineHeight, width: 4 })
                    )
                )];
            });
        })
    );
}

export default DeletionLayers;