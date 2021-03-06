var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import generateRandomRange from 've-range-utils/generateRandomRange';
import normalizePositionByRangeLength from 've-range-utils/normalizePositionByRangeLength';
// var tidyUpSequenceData = require('ve-sequence-utils/tidyUpSequenceData');
var seqLen = 10000;
import objectid from 'bson-objectid';

var exampleData = {
    // "sequence" : "gtggatgcatgtgtcatggtcat", 
    "circular": true,
    "name": "pBbS8c-RFP",
    "description": "",
    sequence: generateSequence(seqLen),
    "translations": generateAnnotations(5, 0, seqLen - 1, seqLen / 3),
    "features": generateAnnotations(10, 0, seqLen - 1, seqLen / 3),
    "primers": generateAnnotations(10, 0, seqLen - 1, 50),
    "parts": generateAnnotations(10, 0, seqLen - 1, seqLen / 3)
};
// export default tidyUpSequenceData(exampleData)
export default exampleData;

function generateSequence() {
    var m = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 9;

    var s = '';
    var r = 'gatc';
    for (var i = 0; i < m; i++) {
        s += r.charAt(Math.floor(Math.random() * r.length));
    }
    return s;
}

function generateAnnotations(numberOfAnnotationsToGenerate, start, stop, maxLength) {
    var result = [];
    for (var i = 0; i < numberOfAnnotationsToGenerate; i++) {
        result[i] = generateAnnotation(start, stop, maxLength);
    }
    return result;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateAnnotation(start, stop, maxLength) {
    var range = generateRandomRange(start, stop, maxLength);
    return _extends({}, range, {
        "name": getRandomInt(0, 100000).toString(),
        "type": "misc_feature",
        id: objectid().str,
        "forward": getRandomInt(0, 1) > 0.5 ? true : false,
        "notes": {}
    });
}

// tnr: this is used to generate a very large, multi-featured sequence
// var string = "ggggcccccgggggccc";
// var reallyLongFakeSequence = "";
// for (var i = 1; i < 100000; i++) {
//   reallyLongFakeSequence += string;
//   if (i % 100 === 0) {
//     reallyLongFakeSequence += 'taafatg';
//     sequenceData.features.push({
//       id: i,
//       start: parseInt(i * 10),
//       end: parseInt(i * 10 + 100),
//       name: 'cooljim',
//       color: 'green',
//       forward: true,
//       annotationType: "feature"
//     });
//   }
// }
// sequenceData.sequence += reallyLongFakeSequence;
// 
// export default function() {
//   var baseSeqData = {
//     
//   }
//   function seqGen() {
//     
//   }
// }
// "features" : [
//     {
//         "name" : "1",
//         "type" : "misc_feature",
//         "start" : 1,
//         "end" : 1,
//         "strand" : 1,
//         "notes" : [],
//         "color": 'blue'
//     },
//     {
//         "name" : "2",
//         "type" : "misc_feature",
//         "start" : 1,
//         "end" : 1,
//         "strand" : 1,
//         "notes" : [],
//         "color": 'blue'
//     },
//     {
//         "name" : "3",
//         "type" : "misc_feature",
//         "start" : 1,
//         "end" : 1,
//         "strand" : 1,
//         "notes" : [],
//         "color": 'blue'
//     },
//     {
//         "name" : "4",
//         "type" : "misc_feature",
//         "start" : 1,
//         "end" : 14,
//         "strand" : 1,
//         "notes" : [],
//         "color": 'blue'
//     },
//     {
//         "name" : "5",
//         "type" : "misc_feature",
//         "start" : 1,
//         "end" : 1,
//         "strand" : 1,
//         "notes" : [],
//         "color": 'blue'
//     },
//     {
//         "name" : "6",
//         "type" : "misc_feature",
//         "id" : "5590c1978fafgw979df000a4f02c7a",
//         "start" : 4,
//         "end" : 6,
//         "strand" : 1,
//         "notes" : [],
//         "color": 'orange'
//     },
//     {
//         "name" : "housemouserousepouse",
//         "type" : "misc_feature",
//         "id" : "5590c197897fs9df000a4f02c7a",
//         "start" : 4,
//         "end" : 6,
//         "strand" : 1,
//         "notes" : [],
//         "color": 'orange'
//     },
//     {
//         "name" : "housemouserousepouse",
//         "type" : "misc_feature",
//         "id" : "5590c1978979dasdfaf000a4f02c7a",
//         "start" : 4,
//         "end" : 6,
//         "strand" : 1,
//         "notes" : [],
//         "color": 'orange'
//     },
//     {
//         "name" : "housemouserousepouse",
//         "type" : "misc_feature",
//         "id" : "5590c197faas8979df000a4f02c7a",
//         "start" : 4,
//         "end" : 6,
//         "strand" : 1,
//         "notes" : [],
//         "color": 'orange'
//     },
//     {
//         "name" : "housemouserousepouse",
//         "type" : "misc_feature",
//         "id" : "5590c1978979df000a4f02c7aasd",
//         "start" : 4,
//         "end" : 6,
//         "strand" : 1,
//         "notes" : [],
//         "color": 'orange'
//     },
//     {
//         "name" : "house",
//         "type" : "misc_feature",
//         "id" : "5590c1978979df000a4f02c7b",
//         "start" : 70,
//         "end" : 90,
//         "strand" : 1,
//         "notes" : [],
//         "color": 'green'
//     },
//     {
//         "name" : "weer",
//         "type" : "misc_feature",
//         "id" : "5590c1d88979df000a4f02f5c",
//         "start" : 3,
//         "end" : 69,
//         "strand" : 1,
//         "notes" : [],
//         "color": 'red'
//     }
// ],