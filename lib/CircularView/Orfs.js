'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _getAnnotationNameAndStartStopString = require('../utils/getAnnotationNameAndStartStopString');

var _getAnnotationNameAndStartStopString2 = _interopRequireDefault(_getAnnotationNameAndStartStopString);

var _orfFrameToColorMap = require('../constants/orfFrameToColorMap');

var _orfFrameToColorMap2 = _interopRequireDefault(_orfFrameToColorMap);

var _drawDirectedPiePiece = require('./drawDirectedPiePiece');

var _drawDirectedPiePiece2 = _interopRequireDefault(_drawDirectedPiePiece);

var _intervalTree = require('interval-tree2');

var _intervalTree2 = _interopRequireDefault(_intervalTree);

var _getRangeAnglesSpecial = require('./getRangeAnglesSpecial');

var _getRangeAnglesSpecial2 = _interopRequireDefault(_getRangeAnglesSpecial);

var _getAngleForPositionMidpoint = require('./getAngleForPositionMidpoint');

var _getAngleForPositionMidpoint2 = _interopRequireDefault(_getAngleForPositionMidpoint);

var _getYOffset = require('./getYOffset');

var _getYOffset2 = _interopRequireDefault(_getYOffset);

var _lruMemoize = require('lru-memoize');

var _lruMemoize2 = _interopRequireDefault(_lruMemoize);

var _PositionAnnotationOnCircle = require('./PositionAnnotationOnCircle');

var _PositionAnnotationOnCircle2 = _interopRequireDefault(_PositionAnnotationOnCircle);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _noop = require('lodash/noop');

var _noop2 = _interopRequireDefault(_noop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Orfs(_ref) {
    var radius = _ref.radius,
        _ref$spaceBetweenAnno = _ref.spaceBetweenAnnotations,
        spaceBetweenAnnotations = _ref$spaceBetweenAnno === undefined ? 2 : _ref$spaceBetweenAnno,
        _ref$orfHeight = _ref.orfHeight,
        orfHeight = _ref$orfHeight === undefined ? 6 : _ref$orfHeight,
        _ref$orfClicked = _ref.orfClicked,
        orfClicked = _ref$orfClicked === undefined ? _noop2.default : _ref$orfClicked,
        HoverHelper = _ref.HoverHelper,
        _ref$orfs = _ref.orfs,
        orfs = _ref$orfs === undefined ? {} : _ref$orfs,
        sequenceLength = _ref.sequenceLength;

    // var orfHeight
    var totalAnnotationHeight = orfHeight + spaceBetweenAnnotations;
    var itree = new _intervalTree2.default(Math.PI);
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

        var _getRangeAngles = (0, _getRangeAnglesSpecial2.default)(annotation, sequenceLength),
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
            annotationCopy.yOffset = (0, _getYOffset2.default)(itree, startAngle, expandedEndAngle);
        } else {
            //we need to check both locations to account for annotations that span the origin
            yOffset1 = (0, _getYOffset2.default)(itree, startAngle, expandedEndAngle);
            yOffset2 = (0, _getYOffset2.default)(itree, startAngle + Math.PI * 2, expandedEndAngle + Math.PI * 2);
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
        var path = (0, _drawDirectedPiePiece2.default)({
            radius: annotationRadius,
            annotationHeight: orfHeight,
            totalAngle: totalAngle,
            arrowheadLength: .4,
            tailThickness: .4
        }).print();

        var color = _orfFrameToColorMap2.default[annotation.frame];
        svgGroup.push(_react2.default.createElement(
            HoverHelper,
            {
                id: annotation.id,
                key: 'orf' + index,
                passJustOnMouseOverAndClassname: true
            },
            _react2.default.createElement(
                'g',
                { onClick: onClick, className: 'Orfs clickable' },
                _react2.default.createElement(
                    'title',
                    null,
                    ' ',
                    (0, _getAnnotationNameAndStartStopString2.default)(annotation, { startText: 'Open Reading Frame:' }),
                    ' '
                ),
                _react2.default.createElement(
                    _PositionAnnotationOnCircle2.default,
                    {
                        sAngle: startAngle,
                        eAngle: endAngle,
                        forward: !annotation.forward },
                    _react2.default.createElement('path', {
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
        component: _react2.default.createElement(
            'g',
            { className: 'veOrfs', key: 'veOrfs' },
            svgGroup
        ),
        height: maxYOffset * totalAnnotationHeight + .5 * orfHeight,
        labels: labels
    };
}

exports.default = (0, _lruMemoize2.default)(5, undefined, true)(Orfs);
module.exports = exports['default'];