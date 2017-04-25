'use strict';

exports.__esModule = true;
exports.default = getAnnotationNameAndStartStopString;
function getAnnotationNameAndStartStopString(_ref) {
  var name = _ref.name,
      start = _ref.start,
      end = _ref.end;
  var additionalOpts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var startText = additionalOpts.startText;

  return (startText ? startText : '') + ' ' + (name ? name : '') + ' Start: ' + (start + 1) + ' End: ' + (end + 1) + ' ';
}
module.exports = exports['default'];