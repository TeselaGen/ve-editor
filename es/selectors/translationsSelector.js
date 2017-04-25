var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import sequenceSelector from './sequenceSelector';
import orfsSelector from './orfsSelector';
import { createSelector } from 'reselect';
import getAminoAcidDataForEachBaseOfDna from 've-sequence-utils/getAminoAcidDataForEachBaseOfDna';
// import lruMemoize from 'lru-memoize';
// import bsonObjectid from 'bson-objectid';
import each from 'lodash/each';

function translationsSelector(sequence, orfs, showOrfTranslations, showOrfs, translations) {
	var translationsToPass = _extends({}, translations, showOrfTranslations && showOrfs ? orfs : {});
	each(translationsToPass, function (translation) {
		translation.aminoAcids = getAminoAcidDataForEachBaseOfDna(sequence, translation.forward, translation);
	});
	return translationsToPass;
}

export default createSelector(sequenceSelector, orfsSelector, function (state) {
	return state.annotationVisibility.orfTranslations;
}, function (state) {
	return state.annotationVisibility.orfs;
}, function (state) {
	return state.sequenceData.translations;
}, translationsSelector);