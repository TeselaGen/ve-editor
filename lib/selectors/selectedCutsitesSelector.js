'use strict';

exports.__esModule = true;

var _reselect = require('reselect');

var _selectedAnnotationsSelector = require('./selectedAnnotationsSelector');

var _selectedAnnotationsSelector2 = _interopRequireDefault(_selectedAnnotationsSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _reselect.createSelector)(_selectedAnnotationsSelector2.default, function (selectedAnnotations) {
	var idStack = selectedAnnotations.idStack,
	    idMap = selectedAnnotations.idMap;

	var cutsiteIdMap = {};
	var cutsiteIdStack = idStack.filter(function (id) {
		if (idMap[id].annotationType === 'cutsite') {
			cutsiteIdMap[id] = idMap[id];
			return true;
		}
	});
	return {
		idStack: cutsiteIdStack,
		idMap: cutsiteIdMap
	};
});
module.exports = exports['default'];