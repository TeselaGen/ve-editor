"use strict";

exports.__esModule = true;
exports.default = getYOffset;
function getYOffset(iTree, start, end) {
    //get all potentially overlapping annotations
    var potentiallyOverlappingAnnotations = iTree.search(start, end);
    //we don't want to render the new annotation on top of any of these potentially overlapping annotations
    var potentialPositionsForNewAnnotation = potentiallyOverlappingAnnotations.map(function () {
        return true;
    });
    potentiallyOverlappingAnnotations.forEach(function (otherAnnotation) {
        potentialPositionsForNewAnnotation[otherAnnotation.object.yOffset] = false;
    });
    //get first occurence of empty yOffset
    var yOffset = potentialPositionsForNewAnnotation.indexOf(true);
    //if there are no empty slots, make a new slot
    return yOffset > -1 ? yOffset : potentialPositionsForNewAnnotation.length;
}
module.exports = exports["default"];