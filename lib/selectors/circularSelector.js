'use strict';

exports.__esModule = true;

exports.default = function (state) {
	return (0, _sequenceDataSelector2.default)(state).circular;
};

var _sequenceDataSelector = require('./sequenceDataSelector');

var _sequenceDataSelector2 = _interopRequireDefault(_sequenceDataSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];