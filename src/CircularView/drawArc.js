var Path = require('paths-js/path');
function polarToSpecialCartesian(radius, angleInRadians) {
    //the 0 angle returns the 0,1 point on the unit circle instead of the 1,0 point like normal
    return {
        x: radius * Math.cos(angleInRadians - Math.PI/2),
        y: radius * Math.sin(angleInRadians - Math.PI/2)
    };
}

// draws a directed piece of the pie with an arrowhead, starts at 0 angle, only draws in one direction (use transforms to move it around the ) 
export default function drawArc ({flip, tailThickness=.6, arrowheadLength=1, radius, height, totalAngle}) {
    var tailHeight = height*tailThickness;
    
    var tailInnerRadius = radius - tailHeight / 2;
    
    // var arrowheadAngle = totalAngle / 2
    var arrowheadAngle = arrowheadLength / (Math.PI * 2)

    if (totalAngle < arrowheadAngle) {
        //set arrowhead length to the angle in radians length
        arrowheadAngle = totalAngle;
    } 
    var arcAngle = totalAngle - arrowheadAngle;

    //the main points we need to draw the arrow and in the order we draw them in:
    var arcLeftBottom = polarToSpecialCartesian(tailInnerRadius, arrowheadAngle)
    var arcRightBottom = polarToSpecialCartesian(tailInnerRadius, totalAngle)
    
    var largeArcFlag = arcAngle > Math.PI ? 1 : 0
    var path
    if (!flip) {
      path = Path()
        .moveto(arcLeftBottom.x,arcLeftBottom.y)
        .arc({rx: tailInnerRadius, ry: tailInnerRadius, xrot: 0, largeArcFlag, sweepFlag: 1, x: arcRightBottom.x, y: arcRightBottom.y})
    } else {
      path = Path()
        .moveto(arcRightBottom.x,arcRightBottom.y)
        .arc({rx: tailInnerRadius, ry: tailInnerRadius, xrot: 0, largeArcFlag: largeArcFlag, sweepFlag: 0, x: arcLeftBottom.x, y: arcLeftBottom.y})
    }
    return path;
}
