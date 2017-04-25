"use strict";

exports.__esModule = true;
exports.default = shouldFlipText;
function shouldFlipText(angle) {
    return angle > Math.PI * 0.5 && angle < Math.PI * 1.5;
}
module.exports = exports["default"];