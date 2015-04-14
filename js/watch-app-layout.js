//
//  create fluid watch app layout
//


(function(){

  var stage = $('.js-base');
  var icons = stage.children();

  var sW = stage.width(); // width
  var sH = stage.height(); // height

  var iD = icons.width(); // icon diameter
  var iDm = iD + 5; // + padding between icons

  var n = 6; // number of points of the polygon we want for the layout
  var sumInnerAngles = (n - 2) * Math.PI; // sum of all inner angles in polygon in radians
  var halfAngle = sumInnerAngles / n / 2; // half of an inner angle
  var exteriorAngle = Math.PI - sumInnerAngles / n;

  // distance between the center of circles on a circle
  var d1 = n < 6 ? Math.round(Math.sqrt(iDm * iDm * 2 - 2 * iDm * iDm * Math.cos(Math.PI * 2 / n))) : iDm;

  // distance between the center of circles on the different layers
  var d2 = n > 6 ? Math.round(iDm * Math.sin(halfAngle) /  Math.sin(Math.PI - halfAngle * 2)) : iDm;

  var points = [[0,0,1,0,0]]; // center coordinate included. x, y, zoom, x modifier, y modifier

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
  scaleIcons();
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
      scaleIcons();
      applyCss()
    }
  }

  // move coordinates with given distance in given angle
  function transformCoordinates(x,y,d,a) {
    var
      x1 = Math.round(x + d * Math.cos(a)),
      y1 = Math.round(y + d * Math.sin(a));

    return [x1,y1,1,0,0]
  }

  // moving all icon's coordinates
  function moveIconCoordinates(distanceX,distanceY) {
    for (var i = 0; i < points.length; i++) {
      points[i][0] += distanceX;
      points[i][1] += distanceY;
    }
  }

  // moving all icon's coordinates
  function scaleIcons(distanceX,distanceY) {
    for (var i = 0; i < points.length; i++) {
      var x = points[i][0];
      var y = points[i][1];
      var z1 = 1, z2 = 1;

      var xd = Math.min(sW - (x + iD / 2), x - iD / 2);
      var yd = Math.min(sH - (y + iD / 2), y - iD / 2);

      if (xd < 0 || yd < 0) {
        if (xd < 0) {
          z1 = Math.round((iD - Math.abs(xd)) / iD * 1000) / 1000
        }

        if (yd < 0) {
          z2 = Math.round((iD - Math.abs(yd)) / iD * 1000) / 1000
        }

        var scale = Math.max(Math.min(z1,z2),0.2);
        var a = Math.abs(sW / 2 - x);
        var b = Math.abs(sH / 2 - y);
        var c = Math.sqrt(a * a + b * b);

        var aMod = Math.acos(a / c);

        if (sW / 2 - x > 0) {
          if (sH / 2 - y < 0) {
            aMod = 2 * Math.PI - aMod;
          }
        } else {
          if (sH / 2 - y > 0) {
            aMod = Math.PI - aMod;
          } else {
            aMod = Math.PI + aMod;
          }
        }

        var mod = transformCoordinates(x,y,(iD - Math.round(iD * scale)) / 2,aMod);

        points[i][2] = scale;
        points[i][3] = mod[0] - x;
        points[i][4] = mod[1] - y;
      } else {
        points[i][2] = 1;
        points[i][3] = 0;
        points[i][4] = 0;
      }
    }
  }

  // set the css of the icons based on current coordinates
  function applyCss(duration) {
    if (!duration) {
      duration = 0;
    }

    for (var i = 0; i < points.length; i++) {
      var x = points[i][0] + points[i][3];
      var y = points[i][1] + points[i][4];

      icons.eq(i).css({
        "-webkit-transition-duration": (duration / 1000).toFixed(1) + "s",
                "transition-duration": (duration / 1000).toFixed(1) + "s",
        "-webkit-transform": "translate3d(" + x + "px," + y + "px," + "0) scale("+ points[i][2] +")",
                "transform": "translate3d(" + x + "px," + y + "px," + "0) scale("+ points[i][2] +")"
      })
    }
  }

})();
