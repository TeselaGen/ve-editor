'use strict';

exports.__esModule = true;

var _drawCircularLabel = require('./drawCircularLabel2');

var _drawCircularLabel2 = _interopRequireDefault(_drawCircularLabel);

var _map = require('lodash/map');

var _map2 = _interopRequireDefault(_map);

var _randomcolor = require('randomcolor');

var _randomcolor2 = _interopRequireDefault(_randomcolor);

var _drawDirectedPiePiece = require('./drawDirectedPiePiece');

var _drawDirectedPiePiece2 = _interopRequireDefault(_drawDirectedPiePiece);

var _getRangeAnglesSpecial = require('./getRangeAnglesSpecial');

var _getRangeAnglesSpecial2 = _interopRequireDefault(_getRangeAnglesSpecial);

var _lruMemoize = require('lru-memoize');

var _lruMemoize2 = _interopRequireDefault(_lruMemoize);

var _PositionAnnotationOnCircle = require('./PositionAnnotationOnCircle');

var _PositionAnnotationOnCircle2 = _interopRequireDefault(_PositionAnnotationOnCircle);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DeletionLayers(props) {
  var radius = props.radius,
      sequenceLength = props.sequenceLength,
      _props$deletionLayers = props.deletionLayers,
      deletionLayers = _props$deletionLayers === undefined ? {} : _props$deletionLayers,
      annotationHeight = props.annotationHeight,
      deletionLayerClicked = props.deletionLayerClicked;

  if (!Object.keys(deletionLayers).length) return null;
  var height = 0;
  var component = _react2.default.createElement(
    'g',
    {
      key: 'veDeletionLayers',
      className: 'veDeletionLayers' },
    (0, _map2.default)(deletionLayers, function (deletionLayer, index) {
      if (!(deletionLayer.start > -1 && deletionLayer.end > -1 && sequenceLength > 0)) {
        return;
      }
      var radiusToUse = radius + annotationHeight / 2;
      height = annotationHeight;

      var _getRangeAngles = (0, _getRangeAnglesSpecial2.default)(deletionLayer, sequenceLength),
          startAngle = _getRangeAngles.startAngle,
          endAngle = _getRangeAngles.endAngle,
          totalAngle = _getRangeAngles.totalAngle;

      var path = (0, _drawDirectedPiePiece2.default)({
        radius: radiusToUse,
        annotationHeight: annotationHeight,
        totalAngle: totalAngle,
        arrowheadLength: 0,
        tailThickness: 1 //deletionLayer specific
      });
      return _react2.default.createElement(
        'g',
        {
          onClick: function onClick(event) {
            deletionLayerClicked({ event: event, annotation: deletionLayer });
          },
          style: {
            cursor: 'pointer'
          },
          className: 'veDeletionLayerLabel',
          key: 'inlineLabel' + index
        },
        _react2.default.createElement(
          _PositionAnnotationOnCircle2.default,
          {
            key: 'item1',
            sAngle: startAngle + Math.PI //add PI because drawCircularLabel is drawing 180
            , eAngle: startAngle + Math.PI
          },
          (0, _drawCircularLabel2.default)({
            centerAngle: startAngle, //used to flip label if necessary
            radius: radiusToUse + annotationHeight,
            fontSize: '20px',
            height: annotationHeight,
            text: 'Deletion',
            id: deletionLayer.id
          })
        ),
        _react2.default.createElement(
          _PositionAnnotationOnCircle2.default,
          {
            key: 'item2',
            sAngle: startAngle,
            eAngle: endAngle,
            forward: true },
          _react2.default.createElement('path', {
            className: 'veDeletionLayer'
            // strokeWidth=".5"
            // stroke={ 'black' }
            , fill: deletionLayer.color || (0, _randomcolor2.default)(),
            d: path.print()
          })
        )
      );
    }).filter(function (el) {
      return el;
    })
  );
  return {
    component: component,
    height: height
  };
}

exports.default = (0, _lruMemoize2.default)(5, undefined, true)(DeletionLayers);
module.exports = exports['default'];