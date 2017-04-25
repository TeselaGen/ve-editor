'use strict';

exports.__esModule = true;

var _flatMap = require('lodash/flatMap');

var _flatMap2 = _interopRequireDefault(_flatMap);

var _reselect = require('reselect');

var _cutsitesSelector = require('./cutsitesSelector');

var _cutsitesSelector2 = _interopRequireDefault(_cutsitesSelector);

var _filteredRestrictionEnzymesSelector = require('./filteredRestrictionEnzymesSelector');

var _filteredRestrictionEnzymesSelector2 = _interopRequireDefault(_filteredRestrictionEnzymesSelector);

var _specialCutsiteFilterOptions = require('../constants/specialCutsiteFilterOptions');

var _specialCutsiteFilterOptions2 = _interopRequireDefault(_specialCutsiteFilterOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _reselect.createSelector)(_cutsitesSelector2.default, _filteredRestrictionEnzymesSelector2.default, function (_ref, filteredRestrictionEnzymes) {
  var cutsitesByName = _ref.cutsitesByName;

  var returnVal = {
    cutsitesByName: {}
  };
  if (!filteredRestrictionEnzymes || filteredRestrictionEnzymes.length === 0) {
    returnVal.cutsitesByName = cutsitesByName;
  } else {
    //loop through each filter option ('Single Cutters', 'BamHI')
    filteredRestrictionEnzymes.forEach(function (_ref2) {
      var value = _ref2.value;

      var cutsThisManyTimes = _specialCutsiteFilterOptions2.default[value] && _specialCutsiteFilterOptions2.default[value].cutsThisManyTimes;
      if (cutsThisManyTimes > 0) {
        //the cutter type is either 1,2,3 for single, double or triple cutters
        Object.keys(cutsitesByName).forEach(function (key) {
          if (cutsitesByName[key].length === cutsThisManyTimes) {
            returnVal.cutsitesByName[key] = cutsitesByName[key];
          }
        });
      } else {
        //normal enzyme ('BamHI')
        if (!cutsitesByName[value]) return;
        returnVal.cutsitesByName[value] = cutsitesByName[value];
      }
    });
  }
  returnVal.cutsitesArray = (0, _flatMap2.default)(returnVal.cutsitesByName, function (cutsitesByNameArray) {
    return cutsitesByNameArray;
  });
  returnVal.cutsitesById = returnVal.cutsitesArray.reduce(function (obj, item) {
    if (item && item.id) {
      obj[item.id] = item;
    }
    return obj;
  }, {});

  return returnVal;
});
// export default lruMemoize(5, undefined, true)(cutsitesSelector)

module.exports = exports['default'];