//
//  create fluid watch app layout
//


(function(){

  var stage = $('.js-base');
  var icons = stage.children();

  var sW = stage.width(); // width
  var sH = stage.height(); // height

  var iD = icons.width() + 5; // icon diameter + padding

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
      newXY = transformCoordinates(0,0,d2 * r,Math.PI * 2 - halfAngle)
    } else {
      // coordinates of previous point
      x = points[i - 1][0];
      y = points[i - 1][1];

      var moveAngle = exteriorAngle * Math.ceil((i - ((m - r) * n) - 1) / r);

      // move coordinates to get new point
      newXY = transformCoordinates(x,y,d1,moveAngle);
    }

    points.push(newXY);
  }

  moveIconCoordinates(sW / 2,sH / 2);
  applyCss();

  //Init touch swipe
  stage.swipe({
    swipeStatus: moveIcons,
    threshold: 1,
    allowPageScroll: 'none',
    triggerOnTouchLeave: true
  });

  // moving icons
  function moveIcons(event,phase,direction,distance,fingers) {
    if (phase == 'move') {
      var xMove = event.movementX;
      var yMove = event.movementY;

      moveIconCoordinates(xMove,yMove);
      applyCss()
    }
  }

  function transformCoordinates(x,y,d,a) {
    var
      x1 = Math.round(x + d * Math.cos(a)),
      y1 = Math.round(y + d * Math.sin(a));

    return [x1,y1]
  }

  // moving all icon's coordinates
  function moveIconCoordinates(distanceX,distanceY) {
    for (var j = 0; j < points.length; j++) {
      points[j][0] += distanceX;
      points[j][1] += distanceY;
    }
  }

  // set the css of the icons based on current coordinates
  function applyCss(duration) {
    if (!duration) {
      duration = 0;
    }

    for (var k = 0; k < points.length; k++) {
      icons.eq(k).css({
        "-webkit-transition-duration": (duration / 1000).toFixed(1) + "s",
                "transition-duration": (duration / 1000).toFixed(1) + "s",
        "-webkit-transform": "translate3d(" + points[k][0] + "px," + points[k][1] + "px," + "0)",
                "transform": "translate3d(" + points[k][0] + "px," + points[k][1] + "px," + "0)"
      }).text(points[k][0] + " " + points[k][1])
    }
  }

})();
