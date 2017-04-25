var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

import featureColors from 've-sequence-utils/featureColors';
import featureColorMap from '../../constants/featureColorMap.json';
import lruMemoize from 'lru-memoize';
import arrayToObjWithIds from './arrayToObjWithIds';

// TODO: figure out where to insert this validation exactly..
import bsonObjectid from 'bson-objectid';

import assign from 'lodash/assign';
import randomColor from 'randomcolor';
import areNonNegativeIntegers from 'validate.io-nonnegative-integer-array';
import { userDefinedTypes, getSingular } from '../annotationTypes';

function cleanSequenceData(seqData) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var sequenceData = assign({}, seqData); //sequence is usually immutable, so we clone it and return it
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

    userDefinedTypes.forEach(function (annotationType) {
        var annotations = sequenceData[annotationType];
        if ((typeof annotations === 'undefined' ? 'undefined' : _typeof(annotations)) !== 'object') {
            annotations = {};
        }
        if (Array.isArray(annotations)) {
            annotations = arrayToObjWithIds(annotations);
        }
        var newAnnotations = {};
        Object.keys(annotations).forEach(function (key) {
            var annotation = annotations[key];
            var cleanedAnnotation = cleanUpAnnotation(annotation, options, annotationType);
            if (cleanedAnnotation) {
                newAnnotations[cleanedAnnotation.id] = _extends({}, cleanedAnnotation, { annotationType: getSingular(annotationType) });
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
            annotation.id = bsonObjectid().str;
            response.messages.push('Unable to detect valid ID for annotation, setting ID to ' + annotation.id);
        }
        if (!areNonNegativeIntegers([annotation.start]) || annotation.start > sequenceData.size - 1) {
            response.messages.push('Invalid annotation start: ' + annotation.start + ' detected for ' + annotation.name + ' and set to 1'); //setting it to 0 internally, but users will see it as 1
            annotation.start = 0;
        }
        if (!areNonNegativeIntegers([annotation.end]) || annotation.end > sequenceData.size - 1) {
            response.messages.push('Invalid annotation end:  ' + annotation.end + ' detected for ' + annotation.name + ' and set to 1'); //setting it to 0 internally, but users will see it as 1
            annotation.end = 0;
        }
        if (annotation.start > annotation.end && sequenceData.circular === false) {
            response.messages.push('Invalid circular annotation detected for ' + annotation.name + '. end set to 1'); //setting it to 0 internally, but users will see it as 1
            annotation.end = 0;
        }
        if (annotationType === 'features') {
            annotation.color = featureColors[annotation.type] || featureColors.misc_feature;
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
export default lruMemoize(5, undefined, true)(cleanSequenceData);