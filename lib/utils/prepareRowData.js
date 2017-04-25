'use strict';

exports.__esModule = true;

var _lruMemoize = require('lru-memoize');

var _lruMemoize2 = _interopRequireDefault(_lruMemoize);

var _mapAnnotationsToRows = require('ve-sequence-utils/mapAnnotationsToRows');

var _mapAnnotationsToRows2 = _interopRequireDefault(_mapAnnotationsToRows);

var _annotationTypes = require('ve-sequence-utils/annotationTypes');

var _annotationTypes2 = _interopRequireDefault(_annotationTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function prepareRowData(sequenceData, bpsPerRow) {
    // ac.throw([ac.sequenceData, ac.posInt], arguments);
    var sequenceLength = sequenceData.sequence.length;
    var totalRows = Math.ceil(sequenceLength / bpsPerRow) || 1; //this check makes sure there is always at least 1 row!
    var rows = [];
    var rowMap = {};
    _annotationTypes2.default.forEach(function (type) {
        rowMap[type] = (0, _mapAnnotationsToRows2.default)(sequenceData[type], sequenceLength, bpsPerRow);
    });

    for (var rowNumber = 0; rowNumber < totalRows; rowNumber++) {
        var row = {};
        row.rowNumber = rowNumber;
        row.start = rowNumber * bpsPerRow;
        row.end = (rowNumber + 1) * bpsPerRow - 1 < sequenceLength ? (rowNumber + 1) * bpsPerRow - 1 : sequenceLength - 1;
        if (row.end < 0) {
            row.end = 0;
        }
        _annotationTypes2.default.forEach(function (type) {
            row[type] = rowMap[type][rowNumber] || [];
        });
        row.sequence = sequenceData.sequence.slice(row.start, row.end + 1);

        rows[rowNumber] = row;
    }
    return rows;
} // var ac = require('ve-api-check');
// ac.throw([ac.posInt, ac.posInt, ac.bool], arguments);
exports.default = (0, _lruMemoize2.default)(5, undefined, true)(prepareRowData);
module.exports = exports['default'];