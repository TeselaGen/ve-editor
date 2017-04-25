export var userDefinedTypes = ['parts', 'features', 'translations', 'primers'];

export var userDefinedTypesMap = userDefinedTypes.reduce(function (nextVal, key) {
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

export var derivedDataTypes = ['cutsites'];
export var derivedDataTypesMap = derivedDataTypes.reduce(function (nextVal, key) {
	nextVal[key] = key;
}, {});
export function getSingular(type) {
	return type.slice(0, -1);
}