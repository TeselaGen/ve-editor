'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// import lruMemoize from 'lru-memoize';
// import bsonObjectid from 'bson-objectid';


var _sequenceSelector = require('./sequenceSelector');

var _sequenceSelector2 = _interopRequireDefault(_sequenceSelector);

var _orfsSelector = require('./orfsSelector');

var _orfsSelector2 = _interopRequireDefault(_orfsSelector);

var _reselect = require('reselect');

var _getAminoAcidDataForEachBaseOfDna = require('ve-sequence-utils/getAminoAcidDataForEachBaseOfDna');

var _getAminoAcidDataForEachBaseOfDna2 = _interopRequireDefault(_getAminoAcidDataForEachBaseOfDna);

var _each = require('lodash/each');

var _each2 = _interopRequireDefault(_each);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function translationsSelector(sequence, orfs, showOrfTranslations, showOrfs, translations) {
	var translationsToPass = _extends({}, translations, showOrfTranslations && showOrfs ? orfs : {});
	(0, _each2.default)(translationsToPass, function (translation) {
		translation.aminoAcids = (0, _getAminoAcidDataForEachBaseOfDna2.default)(sequence, translation.forward, translation);
	});
	return translationsToPass;
}

exports.default = (0, _reselect.createSelector)(_sequenceSelector2.default, _orfsSelector2.default, function (state) {
	return state.annotationVisibility.orfTranslations;
}, function (state) {
	return state.annotationVisibility.orfs;
}, function (state) {
	return state.sequenceData.translations;
}, translationsSelector);
module.exports = exports['default'];