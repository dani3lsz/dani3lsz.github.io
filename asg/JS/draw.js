
(function() {

  var
    canvas = document.getElementById('js-canvas'),
    checkBox = document.getElementById('js-checkbox'),
    btn = document.getElementById('js-button'),
    cL = [canvas.width,canvas.height], // canvas properties
    nI = [3,9], // interval of possible values that tells how many points could the polygon have
    r = (Math.min(cL[0],cL[1]) - 100) / 2, // radius of the circle we use to define the points of the polygon
    o = [cL[0] / 2, cL[1] / 2]; // coordinates of the center of the canvas

  if (canvas.getContext){
    var ctx = canvas.getContext('2d');
  } else {
    return false;
  }

  btn.addEventListener('click',function() {
    var isRegular = checkBox.checked;
    drawPolygon(getRandomInt(nI[0],nI[1]),r,isRegular);
  });

  function drawPolygon(n,r,regular) {
    if (!n || !r) {
      return false
    }

    clearCanvas();

    var
      sumInnerAngles = (n - 2) * Math.PI, // sum of all inner angles in polygon in radians
      rotateAngle = Math.PI - sumInnerAngles / n, // angle to rotate a point around the center to get a next point
      f = rotateAngle,
      fp = 2 * Math.PI;

    // draw basic circle
    ctx.strokeStyle = 'rgb(180,180,180)';
    ctx.beginPath();
    ctx.arc(o[0],o[1],r,0,Math.PI * 2,true);
    ctx.stroke();

    //define polygon coordinates
    var polygon = [];

    for (var i = 0; i < n; i++) {
      if (i == 0) {
        polygon.push([0,r]);
      } else {
        var
          // coordinates of previous point
          x = polygon[i - 1][0],
          y = polygon[i - 1][1];

        if (!regular) {
          f = getRandomInt(fp * 100,fp / 3 * 1000) / 1000;
          fp -= f;
        }

        var
          // rotate coordinates to get new point
          x1 = Math.round(x * Math.cos(f) + y * Math.sin(f)),
          y1 = Math.round(y * Math.cos(f) - x * Math.sin(f));

        polygon.push([x1,y1]);
      }
    }

    // moving coordinates to get the polygon to the center of canvas
    for (var j = 0; j < polygon.length; j++) {
      polygon[j][0] += o[0];
      polygon[j][1] += o[1];
    }

    // draw polygon
    ctx.strokeStyle = 'rgb(0,0,0)';
    ctx.beginPath();
    for (var k = 0; k < polygon.length; k++) {
      if (k == 0) {
        ctx.moveTo(polygon[k][0],polygon[k][1]);
      } else {
        ctx.lineTo(polygon[k][0],polygon[k][1]);
      }
    }
    ctx.closePath();
    ctx.stroke();
  }

  // clear the canvas
  function clearCanvas() {
    ctx.clearRect(0,0,cL[0],cL[1]);
  }

  // get angle defined by three lines using the law of cosines
  function angleOfTriangle(a,b,c) {
    return Math.acos((a * a + b * b - c * c) / (2 * a * b))
  }

  // get distance between two coordinates using the law of Pythagoras
  function lengthOfLine(x1,y1,x2,y2) {
    var
      a = x1 - x2,
      b = y1 - y2;

    return Math.sqrt(a * a + b * b);
  }

  // generate random number between two numbers
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

})();
