
$(document).ready(function() {

  var
    canvas = document.getElementById('js-canvas'),
    cW = canvas.width,
    cH = canvas.height,
    src = 'https://daw52dg0bedts.cloudfront.net/watchaware-embed-assets/',
    type = 'apple-watch-sport',
    band = 'silver-aluminum-case-pink-sport-band';

  var
    currentFrame = 0,
    newFrame = 0;

  if (canvas.getContext){
    var ctx = canvas.getContext('2d');
  } else {
    return false;
  }

  var screen = new Image();
  screen.src = 'images/renders/Artboard.png';

  // pre-load images
  var
    images = [],
    imagesNum = 90,
    maxIndex = imagesNum - 1,
    divider = 4,
    loaded = 0;

  for (var i = 0; i <= maxIndex * divider; i += divider) {
    images[i/divider] = new Image();
    images[i/divider].width = 1040;
    images[i/divider].height = 1040;
    images[i/divider].onload = function() {
      if (loaded == maxIndex) {
        drawCanvas(currentFrame);
        $('.js-load').addClass('loaded')
      } else {
        loaded++
      }
    };
    images[i/divider].src = src + type + '--' + band + '--0' + ("00" + i).slice(-3) + '.jpg';
  }

  var To_Radians = Math.PI / 180;

  var scale = 1;
  var r = 426; // radius
  var sW = 336;
  var sH = 420;
  var cD = Math.round((r * Math.sin(90 * To_Radians)) / Math.sin(2 * To_Radians)); // camera distance

  var o2 = [0,cD];
  var s1 = [0,r];
  var s2 = [-sW / 2,r];
  var s3 = [sW / 2,r];
  var sAll = [s1,s2,s3];

  function drawCanvas(index) {
    var a = index * divider * To_Radians;

    var up,down,x0,y0;

    // rotate coordinates
    for (var i=0; i<sAll.length; i++) {
      sAll[i][2] = sAll[i][0] * Math.cos(a) - sAll[i][1] * Math.sin(a);
      sAll[i][3] = sAll[i][1] * Math.cos(a) + sAll[i][0] * Math.sin(a)
    }

    if (s3[3] > s2[3]) {
      up = s3;
      down = s2;
    } else {
      up = s2;
      down = s3;
    }

    var l1Slope = (s1[3] - o2[1]) / (s1[2] - o2[0]);
    var l2Slope = (down[3] - o2[1]) / (down[2] - o2[0]);
    var vSlope = -1 / l1Slope;

    x0 = (-vSlope * up[2] + up[3] - o2[1] + l2Slope * o2[0]) / (l2Slope - vSlope);
    y0 = vSlope * (x0 - up[2]) + up[3];

    scale = Math.sqrt((up[2] - x0) * (up[2] - x0) + (up[3] - y0) * (up[3] - y0)) / sW;

    var dC = (r * Math.sin(a)) / Math.sin(90 * To_Radians); // distance from center

    ctx.drawImage(images[index],0,-16);

    if (index * divider < 88 || index * divider > 272) {
      ctx.save();
      ctx.translate((cW - cW * scale) / 2 - dC,0);
      ctx.scale(scale,1);
      ctx.globalCompositeOperation = "screen";
      ctx.drawImage(screen,cW / 2 - sW / 2,285,sW,sH);
      ctx.restore();
    }
  }

  $('#js-swipe').swipe({
    swipeStatus: swipeCanvas,
    threshold: 1,
    triggerOnTouchLeave: true
  });

  function swipeCanvas(event,phase,direction,distance,fingers) {
    var rotate, timer;

    if (phase == 'move' && (direction == 'left' || direction == 'right')) {
      rotate = currentFrame + Math.round((direction == 'left' ? distance : -distance) / 10);
      timer = Math.floor(rotate / imagesNum);
      newFrame = rotate - timer * imagesNum;

      drawCanvas(newFrame)
    } else if (phase == 'end') {
      currentFrame = newFrame
    }
  }

  // clear the canvas
  function clearCanvas() {
    ctx.clearRect(0,0,cW,cH);
  }

});
