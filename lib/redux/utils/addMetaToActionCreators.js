"use strict";

exports.__esModule = true;
exports.default = addMetaToActionCreators;
function addMetaToActionCreators(actions, meta) {
	var metaActions = {};
	Object.keys(actions).forEach(function (actionName) {
		metaActions[actionName] = function (firstArg) {
			return actions[actionName](firstArg, meta);
		};
	});
	return metaActions;
}
module.exports = exports["default"];