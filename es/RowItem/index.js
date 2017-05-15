var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import normalizePositionByRangeLength from 've-range-utils/normalizePositionByRangeLength';
import map from 'lodash/map';
import flatMap from 'lodash/flatMap';
import getOverlapsOfPotentiallyCircularRanges from 've-range-utils/getOverlapsOfPotentiallyCircularRanges';
import getSequenceWithinRange from 've-range-utils/getSequenceWithinRange';
import PassThrough from '../utils/PassThrough';
import getComplementSequenceString from 've-sequence-utils/getComplementSequenceString';
import React from 'react';
import SelectionLayer from './SelectionLayer';
import _Sequence from './Sequence';
import LineageLines from './LineageLines';
import DeletionLayers from './DeletionLayers';
import _Axis from './Axis';
import _Orfs from './Orfs';
import _Translations from './Translations';
import _Features from './Features';
import _Primers from './Primers';
import _CutsiteLabels from './CutsiteLabels';
import _Cutsites from './Cutsites';
import Caret from './Caret';
import pure from 'recompose/pure';
import './style.css';
function noop() {}

var RowItem = function (_React$Component) {
    _inherits(RowItem, _React$Component);

    function RowItem() {
        _classCallCheck(this, RowItem);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    RowItem.prototype.render = function render() {
        var _props = this.props,
            _props$charWidth = _props.charWidth,
            charWidth = _props$charWidth === undefined ? 12 : _props$charWidth,
            _props$selectionLayer = _props.selectionLayer,
            selectionLayer = _props$selectionLayer === undefined ? { start: -1, end: -1 } : _props$selectionLayer,
            _props$deletionLayers = _props.deletionLayers,
            deletionLayers = _props$deletionLayers === undefined ? {} : _props$deletionLayers,
            _props$replacementLay = _props.replacementLayers,
            replacementLayers = _props$replacementLay === undefined ? {} : _props$replacementLay,
            _props$searchLayers = _props.searchLayers,
            searchLayers = _props$searchLayers === undefined ? [] : _props$searchLayers,
            _props$cutsiteLabelSe = _props.cutsiteLabelSelectionLayer,
            cutsiteLabelSelectionLayer = _props$cutsiteLabelSe === undefined ? [{ start: -1, end: -1, color: 'black' }] : _props$cutsiteLabelSe,
            _props$annotationHeig = _props.annotationHeight,
            annotationHeight = _props$annotationHeig === undefined ? 14 : _props$annotationHeig,
            _props$featureHeight = _props.featureHeight,
            featureHeight = _props$featureHeight === undefined ? 16 : _props$featureHeight,
            _props$primerHeight = _props.primerHeight,
            primerHeight = _props$primerHeight === undefined ? 16 : _props$primerHeight,
            _props$tickSpacing = _props.tickSpacing,
            tickSpacing = _props$tickSpacing === undefined ? 10 : _props$tickSpacing,
            _props$sequenceHeight = _props.sequenceHeight,
            sequenceHeight = _props$sequenceHeight === undefined ? 16 : _props$sequenceHeight,
            _props$spaceBetweenAn = _props.spaceBetweenAnnotations,
            spaceBetweenAnnotations = _props$spaceBetweenAn === undefined ? 2 : _props$spaceBetweenAn,
            meta = _props.meta,
            width = _props.width,
            _props$annotationVisi = _props.annotationVisibility,
            annotationVisibility = _props$annotationVisi === undefined ? {} : _props$annotationVisi,
            _props$additionalSele = _props.additionalSelectionLayers,
            additionalSelectionLayers = _props$additionalSele === undefined ? [] : _props$additionalSele,
            _props$lineageLines = _props.lineageLines,
            lineageLines = _props$lineageLines === undefined ? [] : _props$lineageLines,
            _props$caretPosition = _props.caretPosition,
            caretPosition = _props$caretPosition === undefined ? -1 : _props$caretPosition,
            _props$sequenceLength = _props.sequenceLength,
            sequenceLength = _props$sequenceLength === undefined ? 0 : _props$sequenceLength,
            _props$row = _props.row,
            row = _props$row === undefined ? {
            sequence: '',
            start: 0,
            end: 0,
            rowNumber: 0
        } : _props$row,
            _props$fullSequence = _props.fullSequence,
            fullSequence = _props$fullSequence === undefined ? '' : _props$fullSequence,
            _props$deletionLayerC = _props.deletionLayerClicked,
            deletionLayerClicked = _props$deletionLayerC === undefined ? noop : _props$deletionLayerC,
            _props$deletionLayerR = _props.deletionLayerRightClicked,
            deletionLayerRightClicked = _props$deletionLayerR === undefined ? noop : _props$deletionLayerR,
            _props$replacementLay2 = _props.replacementLayerClicked,
            replacementLayerClicked = _props$replacementLay2 === undefined ? noop : _props$replacementLay2,
            _props$replacementLay3 = _props.replacementLayerRightClicked,
            replacementLayerRightClicked = _props$replacementLay3 === undefined ? noop : _props$replacementLay3,
            _props$featureClicked = _props.featureClicked,
            featureClicked = _props$featureClicked === undefined ? noop : _props$featureClicked,
            _props$featureRightCl = _props.featureRightClicked,
            featureRightClicked = _props$featureRightCl === undefined ? noop : _props$featureRightCl,
            _props$translationRig = _props.translationRightClicked,
            translationRightClicked = _props$translationRig === undefined ? noop : _props$translationRig,
            _props$primerClicked = _props.primerClicked,
            primerClicked = _props$primerClicked === undefined ? noop : _props$primerClicked,
            _props$primerRightCli = _props.primerRightClicked,
            primerRightClicked = _props$primerRightCli === undefined ? noop : _props$primerRightCli,
            _props$selectionLayer2 = _props.selectionLayerRightClicked,
            selectionLayerRightClicked = _props$selectionLayer2 === undefined ? noop : _props$selectionLayer2,
            _props$orfClicked = _props.orfClicked,
            orfClicked = _props$orfClicked === undefined ? noop : _props$orfClicked,
            _props$orfRightClicke = _props.orfRightClicked,
            orfRightClicked = _props$orfRightClicke === undefined ? noop : _props$orfRightClicke,
            _props$translationCli = _props.translationClicked,
            translationClicked = _props$translationCli === undefined ? noop : _props$translationCli,
            _props$translationDou = _props.translationDoubleClicked,
            translationDoubleClicked = _props$translationDou === undefined ? noop : _props$translationDou,
            _props$cutsiteClicked = _props.cutsiteClicked,
            cutsiteClicked = _props$cutsiteClicked === undefined ? noop : _props$cutsiteClicked,
            bpsPerRow = _props.bpsPerRow,
            _props$HoverHelper = _props.HoverHelper,
            HoverHelper = _props$HoverHelper === undefined ? PassThrough : _props$HoverHelper,
            _props$componentOverr = _props.componentOverrides,
            componentOverrides = _props$componentOverr === undefined ? {} : _props$componentOverr;
        var _annotationVisibility = annotationVisibility.features,
            showFeatures = _annotationVisibility === undefined ? true : _annotationVisibility,
            _annotationVisibility2 = annotationVisibility.primers,
            showPrimers = _annotationVisibility2 === undefined ? true : _annotationVisibility2,
            _annotationVisibility3 = annotationVisibility.translations,
            showTranslations = _annotationVisibility3 === undefined ? true : _annotationVisibility3,
            _annotationVisibility4 = annotationVisibility.orfs,
            showOrfs = _annotationVisibility4 === undefined ? true : _annotationVisibility4,
            _annotationVisibility5 = annotationVisibility.lineageLines,
            showLineageLines = _annotationVisibility5 === undefined ? true : _annotationVisibility5,
            _annotationVisibility6 = annotationVisibility.cutsites,
            showCutsites = _annotationVisibility6 === undefined ? true : _annotationVisibility6,
            _annotationVisibility7 = annotationVisibility.cutsiteLabels,
            showCutsiteLabels = _annotationVisibility7 === undefined ? true : _annotationVisibility7,
            _annotationVisibility8 = annotationVisibility.axis,
            showAxis = _annotationVisibility8 === undefined ? true : _annotationVisibility8,
            _annotationVisibility9 = annotationVisibility.yellowAxis,
            showYellowAxis = _annotationVisibility9 === undefined ? false : _annotationVisibility9,
            _annotationVisibility10 = annotationVisibility.caret,
            showCaret = _annotationVisibility10 === undefined ? true : _annotationVisibility10,
            _annotationVisibility11 = annotationVisibility.reverseSequence,
            showReverseSequence = _annotationVisibility11 === undefined ? true : _annotationVisibility11,
            _annotationVisibility12 = annotationVisibility.sequence,
            showSequence = _annotationVisibility12 === undefined ? true : _annotationVisibility12;
        var _row$sequence = row.sequence,
            sequence = _row$sequence === undefined ? '' : _row$sequence,
            _row$features = row.features,
            features = _row$features === undefined ? [] : _row$features,
            _row$primers = row.primers,
            primers = _row$primers === undefined ? [] : _row$primers,
            _row$translations = row.translations,
            translations = _row$translations === undefined ? [] : _row$translations,
            _row$cutsites = row.cutsites,
            cutsites = _row$cutsites === undefined ? [] : _row$cutsites,
            _row$orfs = row.orfs,
            orfs = _row$orfs === undefined ? [] : _row$orfs;

        var reverseSequence = getComplementSequenceString(sequence);
        if (!row) {
            return null;
        }
        var selectionLayers = [].concat(additionalSelectionLayers, Array.isArray(selectionLayer) ? selectionLayer : [selectionLayer]);

        var _componentOverrides$S = componentOverrides.Sequence,
            Sequence = _componentOverrides$S === undefined ? _Sequence : _componentOverrides$S,
            _componentOverrides$A = componentOverrides.Axis,
            Axis = _componentOverrides$A === undefined ? _Axis : _componentOverrides$A,
            _componentOverrides$O = componentOverrides.Orfs,
            Orfs = _componentOverrides$O === undefined ? _Orfs : _componentOverrides$O,
            _componentOverrides$T = componentOverrides.Translations,
            Translations = _componentOverrides$T === undefined ? _Translations : _componentOverrides$T,
            _componentOverrides$F = componentOverrides.Features,
            Features = _componentOverrides$F === undefined ? _Features : _componentOverrides$F,
            _componentOverrides$P = componentOverrides.Primers,
            Primers = _componentOverrides$P === undefined ? _Primers : _componentOverrides$P,
            _componentOverrides$C = componentOverrides.CutsiteLabels,
            CutsiteLabels = _componentOverrides$C === undefined ? _CutsiteLabels : _componentOverrides$C,
            _componentOverrides$C2 = componentOverrides.Cutsites,
            Cutsites = _componentOverrides$C2 === undefined ? _Cutsites : _componentOverrides$C2;


        if (!width) {
            width = bpsPerRow * charWidth;
        } else {
            charWidth = width / bpsPerRow;
        }
        var rowContainerStyle = {
            position: "relative",
            width: width + 'px'
        };
        var annotationCommonProps = {
            HoverHelper: HoverHelper,
            charWidth: charWidth,
            bpsPerRow: bpsPerRow,
            sequenceLength: sequenceLength,
            annotationHeight: annotationHeight,
            spaceBetweenAnnotations: spaceBetweenAnnotations,
            row: row
        };

        var deletionLayersToDisplay = flatMap(_extends({}, replacementLayers, deletionLayers), function (layer) {
            if (layer.caretPosition > -1) {
                return [];
            }
            var overlaps = getOverlapsOfPotentiallyCircularRanges(layer, row, sequenceLength);
            return overlaps;
        });
        var deletionLayerStrikeThrough = deletionLayersToDisplay.length ? deletionLayersToDisplay.map(function (layer) {
            var left = (layer.start - row.start) * charWidth;
            var width = (layer.end - layer.start + 1) * charWidth;
            return React.createElement('div', { className: 've_sequence_strikethrough',
                style: {
                    left: left,
                    width: width,
                    top: 10,
                    height: 2,
                    position: 'absolute',
                    background: 'black'
                } });
        }) : null;

        return React.createElement(
            'div',
            { className: 'veRowItem',
                style: rowContainerStyle
                // onMouseMove={this.onMouseMove}
                // onMouseUp={this.onMouseUp}
                // onMouseDown={this.onMouseDown}
            },
            React.createElement('div', { className: 'taSpacer' }),
            React.createElement(SelectionLayer, _extends({
                color: 'yellow',
                regions: searchLayers
            }, annotationCommonProps)),
            React.createElement(SelectionLayer, _extends({
                selectionLayerRightClicked: selectionLayerRightClicked
            }, annotationCommonProps, {
                regions: selectionLayers
            })),
            showFeatures && Object.keys(features).length > 0 && React.createElement(Features, _extends({
                featureClicked: featureClicked,
                featureRightClicked: featureRightClicked,
                annotationRanges: features
            }, annotationCommonProps, {
                annotationHeight: featureHeight
            })),
            showPrimers && Object.keys(primers).length > 0 && React.createElement(Primers, _extends({
                sequence: fullSequence,
                primerClicked: primerClicked,
                primerRightClicked: primerRightClicked,
                annotationRanges: primers
            }, annotationCommonProps, {
                annotationHeight: primerHeight
            })),
            showOrfs && Object.keys(orfs).length > 0 && React.createElement(Orfs, _extends({
                orfClicked: orfClicked,
                orfRightClicked: orfRightClicked,
                annotationRanges: orfs
            }, annotationCommonProps)),
            showTranslations && Object.keys(translations).length > 0 && React.createElement(Translations, _extends({
                translationClicked: translationClicked,
                translationRightClicked: translationRightClicked,
                translationDoubleClicked: translationDoubleClicked,
                annotationRanges: translations
            }, annotationCommonProps)),
            showCutsiteLabels && showCutsites && Object.keys(cutsites).length > 0 && React.createElement(CutsiteLabels, _extends({
                cutsiteClicked: cutsiteClicked,
                annotationRanges: cutsites
            }, annotationCommonProps)),
            React.createElement(
                'div',
                { className: 'veRowItemSequenceContainer', style: { position: 'relative' } },
                showSequence && charWidth > 7 && React.createElement(
                    Sequence,
                    {
                        sequence: sequence,
                        height: sequenceHeight,
                        length: sequence.length,
                        charWidth: charWidth },
                    showCutsites && Object.keys(cutsites).length > 0 && React.createElement(Cutsites, _extends({
                        sequenceLength: sequenceLength,
                        annotationRanges: cutsites,
                        topStrand: true
                    }, annotationCommonProps)),
                    deletionLayerStrikeThrough
                ),
                showReverseSequence && charWidth > 7 && React.createElement(
                    Sequence,
                    {
                        length: sequence.length,
                        sequence: reverseSequence,
                        height: sequenceHeight,
                        charWidth: charWidth },
                    showCutsites && Object.keys(cutsites).length > 0 && React.createElement(Cutsites, _extends({
                        topStrand: false,
                        annotationRanges: cutsites
                    }, annotationCommonProps)),
                    deletionLayerStrikeThrough
                ),
                cutsiteLabelSelectionLayer.map(function (layer) {
                    return '';
                    var _layer$color = layer.color,
                        color = _layer$color === undefined ? 'black' : _layer$color;

                    return layer.start > -1 && React.createElement(SelectionLayer, _extends({
                        height: showReverseSequence ? sequenceHeight * 2 + 1 : sequenceHeight + 1,
                        hideCarets: true,
                        opacity: .3,
                        className: 'cutsiteLabelSelectionLayer',
                        border: '2px solid ' + color,
                        // background: 'none',
                        background: color,
                        regions: [layer]
                    }, annotationCommonProps));
                }),
                showCutsites && Object.keys(cutsites).map(function (id, index) {
                    var cutsite = cutsites[id];
                    var layer = cutsite.annotation.recognitionSiteRange;
                    return layer.start > -1 && React.createElement(SelectionLayer, _extends({
                        key: 'restrictionSiteRange' + index,
                        height: showReverseSequence ? sequenceHeight * 2 + 1 : sequenceHeight + 1,
                        hideCarets: true,
                        opacity: .3,
                        className: 'cutsiteLabelSelectionLayer',
                        border: '2px solid ' + 'lightblue',
                        // background: 'none',
                        background: 'lightblue',
                        regions: [layer]
                    }, annotationCommonProps));
                })
            ),
            showLineageLines && React.createElement(LineageLines, _extends({
                lineageLines: lineageLines
            }, annotationCommonProps)),
            map(replacementLayers, function (replacementLayer) {
                var atCaret = replacementLayer.caretPosition > -1;
                var normedCaretPos;
                if (atCaret) {
                    normedCaretPos = normalizePositionByRangeLength(replacementLayer.caretPosition, sequenceLength);
                }
                var insertedBpsLayer = _extends({}, replacementLayer, {
                    start: atCaret ? normedCaretPos : replacementLayer.start,
                    end: (atCaret ? normedCaretPos : replacementLayer.start) + replacementLayer.sequence.length
                });
                var sequence = insertedBpsLayer.sequence;

                var layerRangeOverlaps = getOverlapsOfPotentiallyCircularRanges(insertedBpsLayer, row, sequenceLength);
                return layerRangeOverlaps.map(function (layer, index) {
                    var isStart = layer.start === insertedBpsLayer.start;
                    var seqInRow = getSequenceWithinRange({
                        start: layer.start - insertedBpsLayer.start,
                        end: layer.end - insertedBpsLayer.start
                    }, sequence);
                    var startOffset = layer.start - row.start;
                    var width = seqInRow.length * charWidth;
                    var height = sequenceHeight;
                    var bufferBottom = 4;
                    var bufferLeft = 2;
                    var arrowHeight = isStart ? 8 : 0;
                    return React.createElement(
                        Sequence,
                        {
                            key: index,
                            sequence: seqInRow,
                            startOffset: startOffset,
                            height: height,
                            containerStyle: {
                                marginTop: 8,
                                marginBottom: 6
                            },
                            length: seqInRow.length,
                            charWidth: charWidth },
                        React.createElement(
                            'svg',
                            { style: { left: startOffset * charWidth, height: sequenceHeight, position: 'absolute' },
                                ref: 'rowViewTextContainer',
                                onClick: function onClick(event) {
                                    replacementLayerClicked({ annotation: replacementLayer, event: event });
                                },
                                onContextMenu: function onContextMenu(event) {
                                    replacementLayerRightClicked({ annotation: replacementLayer, event: event });
                                },
                                className: 'rowViewTextContainer clickable', width: width, height: height },
                            React.createElement('polyline', { points: -bufferLeft + ',0 ' + -bufferLeft + ',' + -arrowHeight + ', ' + charWidth / 2 + ',0 ' + width + ',0 ' + width + ',' + (height + bufferBottom) + ' ' + -bufferLeft + ',' + (height + bufferBottom) + ' ' + -bufferLeft + ',0', fill: 'none', stroke: 'black', strokeWidth: '2px' })
                        )
                    );
                });
            }),
            React.createElement(DeletionLayers, _extends({
                deletionLayerClicked: deletionLayerClicked,
                deletionLayerRightClicked: deletionLayerRightClicked,
                deletionLayers: deletionLayers
            }, annotationCommonProps)),
            showYellowAxis && React.createElement(
                'svg',
                { width: '100%', height: '6px' },
                React.createElement('rect', { x: '0', y: '0', width: '100%', height: '6px', fill: '#FFFFB3', stroke: 'grey', strokeWidth: '1' })
            ),
            showAxis && React.createElement(Axis, _extends({
                tickSpacing: tickSpacing
            }, annotationCommonProps)),
            caretPosition > -1 && showCaret && React.createElement(Caret, _extends({
                caretPosition: caretPosition,
                shouldBlink: true
            }, annotationCommonProps))
        );
    };

    return RowItem;
}(React.Component);

// module.exports = pure(RowItem);


export default RowItem;