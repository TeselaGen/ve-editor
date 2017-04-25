'use strict';

exports.__esModule = true;
exports.getSingular = getSingular;
var userDefinedTypes = exports.userDefinedTypes = ['parts', 'features', 'translations', 'primers'];

var userDefinedTypesMap = exports.userDefinedTypesMap = userDefinedTypes.reduce(function (nextVal, key) {
	nextVal[key] = key;
	return nextVal;
	//  looks like this:
	//{
	// 	parts: 'parts',
	// 	features: 'features',
	// 	translations: 'translations',
	// 	primers: 'primers',
	// }
}, {});

var derivedDataTypes = exports.derivedDataTypes = ['cutsites'];
var derivedDataTypesMap = exports.derivedDataTypesMap = derivedDataTypes.reduce(function (nextVal, key) {
	nextVal[key] = key;
}, {});
function getSingular(type) {
	return type.slice(0, -1);
}