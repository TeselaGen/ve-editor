
import React from 'react';
import zeroSubrangeByContainerRange from 've-range-utils/zeroSubrangeByContainerRange';
import getSequenceWithinRange from 've-range-utils/getSequenceWithinRange';
import getCodonRangeForAASliver from 've-sequence-utils/getCodonRangeForAASliver';
import AASliver from './AASliver';
import PureRenderMixin from 'react-addons-pure-render-mixin';

var Translation = React.createClass({
  displayName: 'Translation',

  mixins: [PureRenderMixin],

  propTypes: {
    widthInBps: React.PropTypes.number.isRequired,
    charWidth: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    rangeType: React.PropTypes.string.isRequired,
    translationClicked: React.PropTypes.func.isRequired
  },

  render: function render() {
    var _props = this.props,
        annotationRange = _props.annotationRange,
        height = _props.height,
        charWidth = _props.charWidth,
        translationClicked = _props.translationClicked,
        translationRightClicked = _props.translationRightClicked,
        translationDoubleClicked = _props.translationDoubleClicked,
        sequenceLength = _props.sequenceLength;
    var annotation = annotationRange.annotation;
    //we have an amino acid representation of our entire annotation, but it is an array
    //starting at 0, even if the annotation starts at some arbitrary point in the sequence

    var _annotation$aminoAcid = annotation.aminoAcids,
        aminoAcids = _annotation$aminoAcid === undefined ? [] : _annotation$aminoAcid;
    //so we "zero" our subRange by the annotation start

    var subrangeStartRelativeToAnnotationStart = zeroSubrangeByContainerRange(annotationRange, annotation, sequenceLength);
    //which allows us to then get the amino acids for the subRange
    var aminoAcidsForSubrange = getSequenceWithinRange(subrangeStartRelativeToAnnotationStart, aminoAcids);
    //we then loop over all the amino acids in the sub range and draw them onto the row
    var translationSVG = aminoAcidsForSubrange.map(function (aminoAcidSliver, index) {
      // var relativeAAPositionInTranslation = annotationRange.start % bpsPerRow + index;
      var relativeAAPositionInTranslation = index;
      //get the codonIndices relative to
      return React.createElement(AASliver, {
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
    return React.createElement(
      'g',
      {
        className: 'translationLayer'
        // onClick={this.props.translationClicked}
      },
      translationSVG
    );
  }
});

export default Translation;