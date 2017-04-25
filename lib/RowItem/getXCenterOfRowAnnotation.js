'use strict';

exports.__esModule = true;
exports.default = getXCenterOfRowAnnotation;

var _getXStartAndWidthOfRangeWrtRow = require('./getXStartAndWidthOfRangeWrtRow');

var _getXStartAndWidthOfRangeWrtRow2 = _interopRequireDefault(_getXStartAndWidthOfRangeWrtRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getXCenterOfRowAnnotation(range, row, bpsPerRow, charWidth, sequenceLength) {

    var result = (0, _getXStartAndWidthOfRangeWrtRow2.default)(range, row, bpsPerRow, charWidth, sequenceLength);
    var xStart = result.xStart;
    var width = result.width;
    return xStart + width / 2;
};
module.exports = exports['default'];