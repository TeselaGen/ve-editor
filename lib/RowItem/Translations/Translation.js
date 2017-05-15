'use strict';

exports.__esModule = true;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _zeroSubrangeByContainerRange = require('ve-range-utils/zeroSubrangeByContainerRange');

var _zeroSubrangeByContainerRange2 = _interopRequireDefault(_zeroSubrangeByContainerRange);

var _getSequenceWithinRange = require('ve-range-utils/getSequenceWithinRange');

var _getSequenceWithinRange2 = _interopRequireDefault(_getSequenceWithinRange);

var _getCodonRangeForAASliver = require('ve-sequence-utils/getCodonRangeForAASliver');

var _getCodonRangeForAASliver2 = _interopRequireDefault(_getCodonRangeForAASliver);

var _AASliver = require('./AASliver');

var _AASliver2 = _interopRequireDefault(_AASliver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Translation(props) {
  var annotationRange = props.annotationRange,
      height = props.height,
      charWidth = props.charWidth,
      translationClicked = props.translationClicked,
      translationRightClicked = props.translationRightClicked,
      translationDoubleClicked = props.translationDoubleClicked,
      sequenceLength = props.sequenceLength;
  var annotation = annotationRange.annotation;
  //we have an amino acid representation of our entire annotation, but it is an array
  //starting at 0, even if the annotation starts at some arbitrary point in the sequence

  var _annotation$aminoAcid = annotation.aminoAcids,
      aminoAcids = _annotation$aminoAcid === undefined ? [] : _annotation$aminoAcid;
  //so we "zero" our subRange by the annotation start

  var subrangeStartRelativeToAnnotationStart = (0, _zeroSubrangeByContainerRange2.default)(annotationRange, annotation, sequenceLength);
  //which allows us to then get the amino acids for the subRange
  var aminoAcidsForSubrange = (0, _getSequenceWithinRange2.default)(subrangeStartRelativeToAnnotationStart, aminoAcids);
  //we then loop over all the amino acids in the sub range and draw them onto the row
  var translationSVG = aminoAcidsForSubrange.map(function (aminoAcidSliver, index) {
    // var relativeAAPositionInTranslation = annotationRange.start % bpsPerRow + index;
    var relativeAAPositionInTranslation = index;
    //get the codonIndices relative to
    return _react2.default.createElement(_AASliver2.default, {
      onClick: function onClick(event) {
        translationClicked({ annotation: annotation, codonRange: aminoAcidSliver.codonRange, event: event });
      },
      onContextMenu: function onContextMenu(event) {
        translationRightClicked({ annotation: annotation, codonRange: aminoAcidSliver.codonRange, event: event });
      },
      onDoubleClick: function onDoubleClick(event) {
        translationDoubleClicked({ annotation: annotation, event: event });
      },
      key: annotation.id + aminoAcidSliver.sequenceIndex,
      forward: annotation.forward,
      width: charWidth,
      height: height,
      relativeAAPositionInTranslation: relativeAAPositionInTranslation,
      letter: aminoAcidSliver.aminoAcid.value,
      color: aminoAcidSliver.aminoAcid.color,
      positionInCodon: aminoAcidSliver.positionInCodon });
  });
  return _react2.default.createElement(
    'g',
    {
      className: 'translationLayer'
      // onClick={this.props.translationClicked}
    },
    translationSVG
  );
}

process.env.NODE_ENV !== "production" ? Translation.propTypes = {
  widthInBps: _propTypes2.default.number.isRequired,
  charWidth: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired,
  rangeType: _propTypes2.default.string.isRequired,
  translationClicked: _propTypes2.default.func.isRequired
} : void 0;

exports.default = Translation;
module.exports = exports['default'];