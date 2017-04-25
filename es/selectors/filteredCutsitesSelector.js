import flatmap from 'lodash/flatMap';
import { createSelector } from 'reselect';
import cutsitesSelector from './cutsitesSelector';
import filteredRestrictionEnzymesSelector from './filteredRestrictionEnzymesSelector';
import specialCutsiteFilterOptions from '../constants/specialCutsiteFilterOptions';

export default createSelector(cutsitesSelector, filteredRestrictionEnzymesSelector, function (_ref, filteredRestrictionEnzymes) {
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

      var cutsThisManyTimes = specialCutsiteFilterOptions[value] && specialCutsiteFilterOptions[value].cutsThisManyTimes;
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
  returnVal.cutsitesArray = flatmap(returnVal.cutsitesByName, function (cutsitesByNameArray) {
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