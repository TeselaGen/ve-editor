'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = arrayToObjWithIds;

var _bsonObjectid = require('bson-objectid');

var _bsonObjectid2 = _interopRequireDefault(_bsonObjectid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//helper function to make sure any arrays coming in 
//get converted to objects with unique ids
function arrayToObjWithIds(array) {
	var newObj = {};
	array.forEach(function (item) {
		var newItem = _extends({}, item, {
			id: item.id || (0, _bsonObjectid2.default)().str
		});
		newObj[newItem.id] = newItem;
	});

	return newObj;
}
module.exports = exports['default'];