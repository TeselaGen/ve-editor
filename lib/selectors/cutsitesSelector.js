'use strict';

exports.__esModule = true;

var _circularSelector = require('./circularSelector');

var _circularSelector2 = _interopRequireDefault(_circularSelector);

var _sequenceSelector = require('./sequenceSelector');

var _sequenceSelector2 = _interopRequireDefault(_sequenceSelector);

var _restrictionEnzymesSelector = require('./restrictionEnzymesSelector');

var _restrictionEnzymesSelector2 = _interopRequireDefault(_restrictionEnzymesSelector);

var _reselect = require('reselect');

var _bsonObjectid = require('bson-objectid');

var _bsonObjectid2 = _interopRequireDefault(_bsonObjectid);

var _lodash = require('lodash.flatmap');

var _lodash2 = _interopRequireDefault(_lodash);

var _getCutsitesFromSequence = require('ve-sequence-utils/getCutsitesFromSequence');

var _getCutsitesFromSequence2 = _interopRequireDefault(_getCutsitesFromSequence);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Object.keys(enzymeList).forEach(function(key){
//   var enzyme = enzymeList[key]
//   // Returns a dark RGB color with random alpha 
//   enzyme.color = randomcolor({
//      luminosity: 'dark',
//      // format: 'rgba' // e.g. 'rgba(9, 1, 107, 0.6482447960879654)' 
//   });
// })


function cutsitesSelector(sequence, circular, enzymeList) {
  //get the cutsites grouped by enzyme
  var cutsitesByName = (0, _getCutsitesFromSequence2.default)(sequence, circular, Object.keys(enzymeList).map(function (enzymeName) {
    return enzymeList[enzymeName];
  }));
  //tag each cutsite with a unique id
  var cutsitesById = {};
  Object.keys(cutsitesByName).forEach(function (enzymeName) {
    var cutsitesForEnzyme = cutsitesByName[enzymeName];
    cutsitesForEnzyme.forEach(function (cutsite) {
      var uniqueId = (0, _bsonObjectid2.default)().str;
      cutsite.id = uniqueId;
      cutsite.annotationType = 'cutsite';
      cutsitesById[uniqueId] = cutsite;
    });
  });
  // create an array of the cutsites
  var cutsitesArray = (0, _lodash2.default)(cutsitesByName, function (cutsitesForEnzyme) {
    return cutsitesForEnzyme;
  });
  return {
    cutsitesByName: cutsitesByName,
    cutsitesById: cutsitesById,
    cutsitesArray: cutsitesArray
  };
}
// import lruMemoize from 'lru-memoize';
exports.default = (0, _reselect.createSelector)(_sequenceSelector2.default, _circularSelector2.default, _restrictionEnzymesSelector2.default, function () {
  return cutsitesSelector.apply(undefined, arguments);
});
// 
// 
// export default lruMemoize(5, undefined, true)(cutsitesSelector)

module.exports = exports['default'];