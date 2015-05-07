function getQueryParams(qs) {
  qs = qs.split("+").join(" ");

  var
    params = {},
    tokens,
    re = /[?&]?([^=]+)=([^&]*)/g;

  while (tokens = re.exec(qs)) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }

  return params;
}

$(document).ready(function() {

  var query = getQueryParams(document.location.search);

  var
    canvas = document.getElementById('js-canvas'),
    cW = canvas.width,
    cH = canvas.height,
    src = 'https://daw52dg0bedts.cloudfront.net/watchaware-embed-assets/',
    type = query.watch ? query.watch : 'apple-watch-sport',
    band = query.band ? query.band : 'silver-aluminum-case-blue-sport-band';

  var
    currentFrame = 0,
    newFrame = 0;

  if (canvas.getContext){
    var ctx = canvas.getContext('2d');
  } else {
    return false;
  }

  var controlBtn = $('.js-control');
  var active = 0; // 0 - rotate, 1 - move, 2 - resize

  controlBtn.on('click', function(){
    if (!$(this).hasClass('active')) {
      controlBtn.removeClass('active');
      $(this).addClass('active');
      active = controlBtn.index($(this));
    }
  });


  var screen = new Image();
  screen.src = 'images/renders/screen1.png';

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

  var dM = 1008;
  var dx = cW / 2 - dM / 2;
  var dy = cH / 2 - dM / 2;

  var dC; // screen distance from center

  function calculateDrawInfo(index) {
    var a = index * divider * To_Radians;

    dC = (r * Math.sin(a)) / Math.sin(90 * To_Radians);

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
  }

  function drawCanvas(index,calculate) {
    if (calculate) {
      calculateDrawInfo(index);
    }

    ctx.fillStyle = '#f2f2f2';
    ctx.fillRect(0,0,cW,cH);
    ctx.drawImage(images[index],0,16,dM,dM,dx,dy,dM,dM);

    if (index * divider < 88 || index * divider > 272) {
      ctx.save();
      ctx.translate((dx + dM / 2) - (dx + dM / 2) * scale - dC,0);
      ctx.scale(scale,1);
      ctx.globalCompositeOperation = "screen";
      ctx.drawImage(screen,dx + dM / 2 - sW / 2,dy + 285,sW,sH);
      ctx.restore();
    }
  }

  $('#js-swipe').swipe({
    swipeStatus: swipeCanvas,
    threshold: 1,
    triggerOnTouchLeave: true
  });

  var clientX, clientY;

  var ratio = cW / $('#js-canvas').width();
  var limit = dM / ratio / (imagesNum / 2);

  function swipeCanvas(event,phase,direction,distance,fingers) {
    var rotate, timer;

    if (phase == 'start') {
      clientX = event.pageX;
      clientY = event.pageY;
    } else if (phase == 'move') {
      var clientXn = event.pageX;
      var clientYn = event.pageY;

      var xMove = clientXn - clientX;
      var yMove = clientYn - clientY;

      clientX = clientXn;
      clientY = clientYn;

      if (active == 0) {
        newFrame += xMove;

        if (Math.abs(newFrame) > limit) {
          currentFrame += newFrame > 0 ? -1 : 1;

          if (currentFrame < 0) {
            currentFrame = imagesNum - 1
          } else if (currentFrame > imagesNum - 1) {
            currentFrame = 0
          }

          newFrame = 0;

          drawCanvas(currentFrame,true);
        }
      } else if (active == 1) {
        dx += xMove * ratio;
        dy += yMove * ratio;

        drawCanvas(currentFrame)
      } else if (active == 2) {
        dy += yMove * ratio / 2;
        canvas.height += yMove * ratio;
        drawCanvas(currentFrame)
      }
    }
  }

  $(window).resize(function(){
    ratio = cW / $('#js-canvas').width()
  });

  // clear the canvas
  function clearCanvas() {
    ctx.clearRect(0,0,cW,cH);
  }

});
