"use strict";

exports.__esModule = true;
exports.default = bindActionCreatorsWithMeta;
function bindActionCreatorsWithMeta(actions, dispatch, meta) {
	var metaActions = {};
	Object.keys(actions).forEach(function (actionName) {
		metaActions[actionName] = function (firstArg) {
			dispatch(actions[actionName](firstArg, meta));
		};
	});
	return metaActions;
}
module.exports = exports["default"];