//
//  create fluid watch app layout
//


(function(){

  var stage = $('.js-base');
  var icons = stage.children();

  var sW = stage.width(); // width
  var sH = stage.height(); // height

  var iD = icons.width(); // icon diameter

  var n = 6; // number of points of the polygon we want for the layout
  var sumInnerAngles = (n - 2) * Math.PI; // sum of all inner angles in polygon in radians
  var halfAngle = sumInnerAngles / n / 2; // half of an inner angle
  var exteriorAngle = Math.PI - sumInnerAngles / n;

  // distance between the center of circles on a circle
  var d1 = n < 6 ? Math.round(Math.sqrt(iD * iD * 2 - 2 * iD * iD * Math.cos(Math.PI * 2 / n))) : iD;

  // distance between the center of circles on the different layers
  var d2 = n > 6 ? Math.round(iD * Math.sin(halfAngle) /  Math.sin(Math.PI - halfAngle * 2)) : iD;

  var points = [[0,0]]; // coordinates, starting with the center of the coordinate system

  var m = 0, r = 0; // helpers for the loop

  for (var i=1; i<icons.length; i++) {
    var x, y, newXY;

    // statement is true after every full rotate
    if (i % (n * m + 1) == 0) {
      r += 1; // number of serial
      m += r; // increase the length of the next rotate

      // new first coordinate after a full rotate
      newXY = moveCoordinates(0,0,d2 * r,Math.PI * 2 - halfAngle)
    } else {
      // coordinates of previous point
      x = points[i - 1][0];
      y = points[i - 1][1];

      var moveAngle = exteriorAngle * Math.ceil((i - ((m - r) * n) - 1) / r);

      // move coordinates to get new point
      newXY = moveCoordinates(x,y,d1,moveAngle);
    }

    points.push(newXY);
  }

  function moveCoordinates(x,y,d,a) {
    var
      x1 = x + d * Math.cos(a),
      y1 = y + d * Math.sin(a);

    return [x1,y1]
  }

  // moving coordinates to get to the center of the stage
  for (var j = 0; j < points.length; j++) {
    points[j][0] += sW / 2;
    points[j][1] += sH / 2;
  }

  // set the css of the icons
  for (var k = 0; k < points.length; k++) {
    icons.eq(k).css({
      "-webkit-transform": "translate3d(" + points[k][0] + "px," + points[k][1] + "px," + "0)",
              "transform": "translate3d(" + points[k][0] + "px," + points[k][1] + "px," + "0)"
    })
  }

})();
