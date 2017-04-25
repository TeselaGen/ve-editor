var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import bsonObjectid from 'bson-objectid';
//helper function to make sure any arrays coming in 
//get converted to objects with unique ids
export default function arrayToObjWithIds(array) {
	var newObj = {};
	array.forEach(function (item) {
		var newItem = _extends({}, item, {
			id: item.id || bsonObjectid().str
		});
		newObj[newItem.id] = newItem;
	});

	return newObj;
}