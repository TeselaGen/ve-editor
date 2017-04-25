import React from 'react';
import shouldFlipText from './shouldFlipText';
import Path from 'paths-js/path';
function polarToSpecialCartesian(radius, angleInRadians) {
    //the 0 angle returns the 0,1 point on the unit circle instead of the 1,0 point like normal
    return {
        x: radius * Math.cos(angleInRadians - Math.PI / 2),
        y: radius * Math.sin(angleInRadians - Math.PI / 2)
    };
}

// draws a directed piece of the pie with an arrowhead, starts at 0 angle, only draws in one direction (use transforms to move it around the ) 
function drawArc(_ref) {
    var flip = _ref.flip,
        _ref$tailThickness = _ref.tailThickness,
        tailThickness = _ref$tailThickness === undefined ? .6 : _ref$tailThickness,
        _ref$arrowheadLength = _ref.arrowheadLength,
        arrowheadLength = _ref$arrowheadLength === undefined ? 1 : _ref$arrowheadLength,
        radius = _ref.radius,
        height = _ref.height;

    var tailHeight = height * tailThickness;
    var totalAngle = Math.PI * 2 - .000001;
    var tailInnerRadius = radius - tailHeight / 2;

    // var arrowheadAngle = totalAngle / 2
    var arrowheadAngle = arrowheadLength / (Math.PI * 2);

    if (totalAngle < arrowheadAngle) {
        //set arrowhead length to the angle in radians length
        arrowheadAngle = totalAngle;
    }
    var arcAngle = totalAngle - arrowheadAngle;

    //the main points we need to draw the arrow and in the order we draw them in:
    var arcLeftBottom = polarToSpecialCartesian(tailInnerRadius, arrowheadAngle);
    var arcRightBottom = polarToSpecialCartesian(tailInnerRadius, totalAngle);

    var largeArcFlag = arcAngle > Math.PI ? 1 : 0;
    var path;
    if (!flip) {
        path = Path().moveto(arcLeftBottom.x, arcLeftBottom.y).arc({ rx: tailInnerRadius, ry: tailInnerRadius, xrot: 0, largeArcFlag: largeArcFlag, sweepFlag: 1, x: arcRightBottom.x, y: arcRightBottom.y });
    } else {
        path = Path().moveto(arcRightBottom.x, arcRightBottom.y).arc({ rx: tailInnerRadius, ry: tailInnerRadius, xrot: 0, largeArcFlag: largeArcFlag, sweepFlag: 0, x: arcLeftBottom.x, y: arcLeftBottom.y });
    }
    return path;
}

export default function drawCircularLabel2(_ref2) {
    var centerAngle = _ref2.centerAngle,
        _ref2$fontSize = _ref2.fontSize,
        fontSize = _ref2$fontSize === undefined ? '12px' : _ref2$fontSize,
        radius = _ref2.radius,
        height = _ref2.height,
        text = _ref2.text,
        id = _ref2.id;

    return React.createElement(
        'g',
        null,
        React.createElement('path', {
            key: 'labelPath',
            fill: 'none'
            // stroke='red'
            // strokeWidth='4px'
            , d: drawArc({
                flip: shouldFlipText(centerAngle),
                radius: radius,
                height: height,
                tailThickness: 1 //feature specific
            }).print()
            // d={`
            //     M 0 0
            //     m -${radius}}, 0
            //     a ${radius}},${radius}} 0 1,1 (${radius * 2}} ),0
            //     a ${radius}},${radius}} 0 1,1 -(${radius * 2}} ),0
            // `}
            // M cx cy
            // m -r, 0
            // a r,r 0 1,1 (r * 2),0
            // a r,r 0 1,1 -(r * 2),0
            , id: id + '-featureInlineLabel' }),
        ',',
        React.createElement(
            'text',
            {
                key: 'labelText',
                stroke: 'black',
                fontSize: fontSize,
                textAnchor: 'middle',
                dy: shouldFlipText(centerAngle) ? 11 : -3
            },
            React.createElement(
                'textPath',
                {

                    // ref={(node) => {
                    //        node && node.setAttribute("startOffset", '50%')
                    //      }}
                    xlinkHref: '#' + id + '-featureInlineLabel',
                    startOffset: "50%"
                },
                text
            )
        )
    );
}