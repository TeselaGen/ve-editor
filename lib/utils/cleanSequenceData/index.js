'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// TODO: figure out where to insert this validation exactly..


var _featureColors = require('ve-sequence-utils/featureColors');

var _featureColors2 = _interopRequireDefault(_featureColors);

var _featureColorMap = require('../../constants/featureColorMap.json');

var _featureColorMap2 = _interopRequireDefault(_featureColorMap);

var _lruMemoize = require('lru-memoize');

var _lruMemoize2 = _interopRequireDefault(_lruMemoize);

var _arrayToObjWithIds = require('./arrayToObjWithIds');

var _arrayToObjWithIds2 = _interopRequireDefault(_arrayToObjWithIds);

var _bsonObjectid = require('bson-objectid');

var _bsonObjectid2 = _interopRequireDefault(_bsonObjectid);

var _assign = require('lodash/assign');

var _assign2 = _interopRequireDefault(_assign);

var _randomcolor = require('randomcolor');

var _randomcolor2 = _interopRequireDefault(_randomcolor);

var _validate = require('validate.io-nonnegative-integer-array');

var _validate2 = _interopRequireDefault(_validate);

var _annotationTypes = require('../annotationTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cleanSequenceData(seqData) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var sequenceData = (0, _assign2.default)({}, seqData); //sequence is usually immutable, so we clone it and return it
    var response = {
        messages: [],
        errors: []
    };
    if (!sequenceData) {
        sequenceData = {};
    }
    if (!sequenceData.sequence && sequenceData.sequence !== '') {
        sequenceData.sequence = "";
    }
    sequenceData.size = sequenceData.sequence.length;
    if (sequenceData.circular === 'false' || sequenceData.circular == -1 || !sequenceData.circular) {
        sequenceData.circular = false;
    } else {
        sequenceData.circular = true;
    }

    _annotationTypes.userDefinedTypes.forEach(function (annotationType) {
        var annotations = sequenceData[annotationType];
        if ((typeof annotations === 'undefined' ? 'undefined' : _typeof(annotations)) !== 'object') {
            annotations = {};
        }
        if (Array.isArray(annotations)) {
            annotations = (0, _arrayToObjWithIds2.default)(annotations);
        }
        var newAnnotations = {};
        Object.keys(annotations).forEach(function (key) {
            var annotation = annotations[key];
            var cleanedAnnotation = cleanUpAnnotation(annotation, options, annotationType);
            if (cleanedAnnotation) {
                newAnnotations[cleanedAnnotation.id] = _extends({}, cleanedAnnotation, { annotationType: (0, _annotationTypes.getSingular)(annotationType) });
            }
        });
        sequenceData[annotationType] = newAnnotations;
    });
    if (options.logMessages) {}

    return sequenceData;

    function cleanUpAnnotation(annotation, options, annotationType) {
        if (!annotation || (typeof annotation === 'undefined' ? 'undefined' : _typeof(annotation)) !== 'object') {
            response.messages.push('Invalid annotation detected and removed');
            return false;
        }
        annotation.start = parseInt(annotation.start);
        annotation.end = parseInt(annotation.end);

        if (!annotation.name || typeof annotation.name !== 'string') {
            response.messages.push('Unable to detect valid name for annotation, setting name to "Untitled annotation"');
            annotation.name = 'Untitled annotation';
        }
        if (!annotation.id && annotation.id !== 0) {
            debugger;
            annotation.id = (0, _bsonObjectid2.default)().str;
            response.messages.push('Unable to detect valid ID for annotation, setting ID to ' + annotation.id);
        }
        if (!(0, _validate2.default)([annotation.start]) || annotation.start > sequenceData.size - 1) {
            response.messages.push('Invalid annotation start: ' + annotation.start + ' detected for ' + annotation.name + ' and set to 1'); //setting it to 0 internally, but users will see it as 1
            annotation.start = 0;
        }
        if (!(0, _validate2.default)([annotation.end]) || annotation.end > sequenceData.size - 1) {
            response.messages.push('Invalid annotation end:  ' + annotation.end + ' detected for ' + annotation.name + ' and set to 1'); //setting it to 0 internally, but users will see it as 1
            annotation.end = 0;
        }
        if (annotation.start > annotation.end && sequenceData.circular === false) {
            response.messages.push('Invalid circular annotation detected for ' + annotation.name + '. end set to 1'); //setting it to 0 internally, but users will see it as 1
            annotation.end = 0;
        }
        if (annotationType === 'features') {
            annotation.color = _featureColors2.default[annotation.type] || _featureColors2.default.misc_feature;
        }

        if (annotation.forward === true || annotation.forward === 'true' || annotation.strand === 1 || annotation.strand === '1' || annotation.strand === '+') {
            annotation.forward = true;
        } else {
            annotation.forward = false;
        }

        if (!annotation.type || typeof annotation.type !== 'string') {
            response.messages.push('Invalid annotation type detected:  ' + annotation.type + ' for ' + annotation.name + '. set type to misc_feature');
            annotation.type = 'misc_feature';
        }
        return annotation;
    }
}
exports.default = (0, _lruMemoize2.default)(5, undefined, true)(cleanSequenceData);
module.exports = exports['default'];