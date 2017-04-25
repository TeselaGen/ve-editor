'use strict';

exports.__esModule = true;

var _circularSelector = require('./circularSelector');

var _circularSelector2 = _interopRequireDefault(_circularSelector);

var _sequenceSelector = require('./sequenceSelector');

var _sequenceSelector2 = _interopRequireDefault(_sequenceSelector);

var _minimumOrfSizeSelector = require('./minimumOrfSizeSelector');

var _minimumOrfSizeSelector2 = _interopRequireDefault(_minimumOrfSizeSelector);

var _findOrfsInPlasmid = require('ve-sequence-utils/findOrfsInPlasmid');

var _findOrfsInPlasmid2 = _interopRequireDefault(_findOrfsInPlasmid);

var _reselect = require('reselect');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _reselect.createSelector)(_sequenceSelector2.default, _circularSelector2.default, _minimumOrfSizeSelector2.default, function () {
    return _findOrfsInPlasmid2.default.apply(undefined, arguments);
});
// import bsonObjectid from 'bson-objectid';

module.exports = exports['default'];