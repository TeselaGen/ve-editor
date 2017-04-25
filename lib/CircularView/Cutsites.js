'use strict';

exports.__esModule = true;

var _getRangeAnglesSpecial = require('./getRangeAnglesSpecial');

var _getRangeAnglesSpecial2 = _interopRequireDefault(_getRangeAnglesSpecial);

var _lruMemoize = require('lru-memoize');

var _lruMemoize2 = _interopRequireDefault(_lruMemoize);

var _PositionAnnotationOnCircle = require('./PositionAnnotationOnCircle');

var _PositionAnnotationOnCircle2 = _interopRequireDefault(_PositionAnnotationOnCircle);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _each = require('lodash/each');

var _each2 = _interopRequireDefault(_each);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Cutsites(_ref) {
  var radius = _ref.radius,
      HoverHelper = _ref.HoverHelper,
      cutsiteClicked = _ref.cutsiteClicked,
      cutsites = _ref.cutsites,
      _ref$cutsiteWidth = _ref.cutsiteWidth,
      cutsiteWidth = _ref$cutsiteWidth === undefined ? 1 : _ref$cutsiteWidth,
      _ref$annotationHeight = _ref.annotationHeight,
      annotationHeight = _ref$annotationHeight === undefined ? 15 : _ref$annotationHeight,
      sequenceLength = _ref.sequenceLength;

  radius += annotationHeight;
  var svgGroup = [];
  var labels = {};
  var index = 0;
  (0, _each2.default)(cutsites, function (annotation, key) {
    index++;
    function onClick(event) {
      cutsiteClicked({ event: event, annotation: annotation });
      event.stopPropagation();
    }
    if (!(annotation.topSnipPosition > -1)) {
      debugger; //we need this to be present 
    }

    var _getRangeAngles = (0, _getRangeAnglesSpecial2.default)({ start: annotation.topSnipPosition, end: annotation.topSnipPosition }, sequenceLength),
        startAngle = _getRangeAngles.startAngle;
    //expand the end angle if annotation spans the origin


    labels[annotation.id] = {
      annotationCenterAngle: startAngle,
      annotationCenterRadius: radius,
      text: annotation.restrictionEnzyme.name,
      color: annotation.restrictionEnzyme.color,
      className: ' veCutsiteLabel',
      id: annotation.id,
      onClick: onClick
    };
    if (!annotation.id) debugger;

    svgGroup.push(_react2.default.createElement(
      HoverHelper,
      {
        id: annotation.id,
        key: 'cutsite' + index,
        passJustOnMouseOverAndClassname: true
      },
      _react2.default.createElement(
        _PositionAnnotationOnCircle2.default,
        {
          className: 'cutsiteDrawing',
          sAngle: startAngle,
          eAngle: startAngle,
          height: radius
        },
        _react2.default.createElement('rect', {
          width: cutsiteWidth,
          height: annotationHeight })
      )
    ));
  });
  return {
    height: annotationHeight,
    labels: labels,
    component: _react2.default.createElement(
      'g',
      { key: 'cutsites', className: 'cutsites' },
      svgGroup
    ) };
}
exports.default = (0, _lruMemoize2.default)(5, undefined, true)(Cutsites);
module.exports = exports['default'];