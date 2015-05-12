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

  var getBtn = $('.js-get');

  getBtn.on('click', function(){
    var dataURL = canvas.toDataURL();
    window.open(dataURL,'_blank');
  });

  var controlBtn = $('.js-control');
  var active = 0;

  var optionBtn = $('.js-option');
  var options = [1,1,1];

  var alignBtn = $('.js-align');
  var align = 'left';

  controlBtn.on('click', function(){
    if (!$(this).hasClass('active')) {
      controlBtn.removeClass('active');
      $(this).addClass('active');
      active = controlBtn.index($(this));
    }
  });

  optionBtn.on('click', function(){
    var i = optionBtn.index($(this));
    options[i] = +!options[i];

    if (i == 1) {
      options[2] = options[1]
    } else if (i == 2 && options[2]) {
      options[1] = options[2]
    }

    optionBtn.removeClass('active');
    for (var j = 0; j < options.length; j++) {
      if (options[j]) {
        optionBtn.eq(j).addClass('active')
      }
    }

    drawCanvas(currentFrame)
  });

  alignBtn.on('click', function(){
    if (!$(this).hasClass('active')) {
      alignBtn.removeClass('active');
      $(this).addClass('active');

      var i = alignBtn.index($(this));

      if (i == 0) {
        align = 'left'
      } else if (i == 1) {
        align = 'center'
      } else if (i == 2) {
        align = 'right'
      }

      drawCanvas(currentFrame)
    }
  });

  var assets = $('.js-screen');

  var appIcon = new Image();
  appIcon.src = assets.data('icon');

  // capitalize each word
  function capitalize(text) {
    return text.replace(/[^-'\s]+/g, function(word) {
      return word.replace(/^./, function(first) {
        return first.toUpperCase();
      });
    });
  }

  var trimLength = 25;

  // trim text
  function trimText(text) {
    var l = Math.round(trimLength);
    if (text.length > l) {
      text = text.substring(0,l) + '...';
    }
    return text
  }

  var appTitle = trimText(capitalize(assets.data('title')));
  var appDev = trimText(capitalize(assets.data('dev')));

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
        $('.js-load').addClass('loaded');
        insertIconScreen();
        startAnimation()
      } else {
        loaded++
      }
    };
    images[i/divider].src = src + type + '--' + band + '--0' + ("00" + i).slice(-3) + '.jpg';
  }

  var To_Radians = Math.PI / 180;

  var dM = 1008;
  var dR = 1008;
  var dx = cW - dR;
  var dy = cH / 2 - dR / 2;

  var dC; // screen distance from center

  var scale = 1;
  var tilt = 0;
  var r, sW ,sH ,cD;

  calculateBaseValues();

  function calculateBaseValues() {
    r = dR / 2.3662; // radius
    sW = dR / 3; // screen width
    sH = dR / 2.4; // screen height
    cD = Math.round((r * Math.sin(90 * To_Radians)) / Math.sin(2 * To_Radians)); // camera distance
  }

  var iR = 100; // icon radius
  var ix = 300;
  var iy = cH / 2;

  var tx = 450;
  var ty = cH / 2;
  var tS = 52;
  var tW;

  function calculateDrawInfo(index) {
    var o2 = [0,cD];
    var s1 = [0,r];
    var s2 = [-sW / 2,r];
    var s3 = [sW / 2,r];
    var sAll = [s1,s2,s3];

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
    ctx.save();

    if (tilt) {
      ctx.translate(dx + dR / 2,dy + dR / 2);
      ctx.rotate(tilt * To_Radians);
      ctx.translate(-dx - dR / 2,-dy - dR / 2);
    }

    ctx.drawImage(images[index],0,16,dM,dM,dx,dy,dR,dR);
    ctx.restore();

    if (index * divider < 88 || index * divider > 272) {
      ctx.save();

      if (tilt) {
        ctx.translate(dx + dR / 2,dy + dR / 2);
        ctx.rotate(tilt * To_Radians);
        ctx.translate(-dx - dR / 2,-dy - dR / 2);
      }

      ctx.translate((dx + dR / 2) - (dx + dR / 2) * scale - dC,0);
      ctx.scale(scale,1);
      ctx.globalCompositeOperation = "screen";

      ctx.drawImage(screen,dx + dR / 2 - sW / 2,dy + dR / 3.5368,sW,sH);
      ctx.restore();
    }

    if (options[1]) {
      var tF = 0;
      ctx.fillStyle = '#000000';
      ctx.font = '300 '+ tS +'px Roboto';
      ctx.textBaseline = "alphabetic";
      ctx.textAlign = align;
      tW = ctx.measureText(appTitle).width;

      if (align == 'center') {
        tF = tW / 2
      } else if (align == 'right') {
        tF = tW
      }

      ctx.fillText(appTitle,tx + tF,ty);

      if (options[2]) {
        ctx.fillStyle = '#888888';
        ctx.font = '300 '+ (tS / 2) +'px Roboto';
        ctx.fillText(appDev,tx + tF,ty + tS / 1.25);
      }
    }

    if (options[0]) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(ix, iy, iR, 0, 2 * Math.PI, false);
      ctx.clip();
      ctx.drawImage(appIcon,ix - iR,iy - iR,iR * 2,iR * 2);
      ctx.restore();
      ctx.beginPath();
      ctx.arc(ix, iy, iR, 0, 2 * Math.PI, false);
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#f2f2f2';
      ctx.stroke();
    }
  }

  function startAnimation() {
    var startFrame = 13;
    var counter = 5;

    var startAnimate = function(){
      if (startFrame > 0) {
        clearInterval(interval);
        counter += 5;
        startFrame -= 1;

        drawCanvas(startFrame,true);

        interval = setInterval(startAnimate, counter);
      } else {
        clearInterval(interval)
      }
    };

    var interval = setInterval(startAnimate, counter);
  }

  var touchArea = $('#js-swipe');

  touchArea.swipe({
    swipeStatus: swipeCanvas,
    threshold: 1,
    triggerOnTouchLeave: true
  });

  var spaceTop = touchArea.offset().top;
  var spaceLeft = touchArea.offset().left;

  var clientX, clientY;

  var ratio = cW / $('#js-canvas').width();

  var moving = 0;

  function swipeCanvas(event,phase,direction,distance,fingers) {
    if (phase == 'start') {
      clientX = event.pageX;
      clientY = event.pageY;

      if (clientX > (spaceLeft + (ix - iR) / ratio) && clientX < (spaceLeft + (ix + iR) / ratio) &&
          clientY > ( spaceTop + (iy - iR) / ratio) && clientY < ( spaceTop + (iy + iR) / ratio)) {
        moving = 1
      } else if (clientX > (spaceLeft + tx / ratio) && clientX < (spaceLeft + (tx + tW) / ratio) &&
        clientY > (spaceTop + (ty - tS) / ratio) && clientY < (spaceTop + (ty + tS + tS / 5) / ratio)) {
        moving = 2
      }
    } else if (phase == 'move') {
      var clientXn = event.pageX;
      var clientYn = event.pageY;

      var xMove = clientXn - clientX;
      var yMove = clientYn - clientY;

      clientX = clientXn;
      clientY = clientYn;

      if (active == 0) {
        if (Math.abs(xMove) > Math.abs(yMove)) {
          newFrame += xMove;
        } else {
          newFrame += yMove;
        }

        if (Math.abs(newFrame) > dR / imagesNum / ratio) {
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
        if (Math.abs(xMove) > Math.abs(yMove)) {
          tilt += xMove / 2;
        } else {
          tilt += yMove / 2;
        }

        if (tilt > 360) {
          tilt = 0
        } else if (tilt < 0) {
          tilt = 360
        }

        drawCanvas(currentFrame)
      } else if (active == 2) {
        if (moving == 0) {
          dx += xMove * ratio;
          dy += yMove * ratio;
        } else if (moving == 1) {
          ix += xMove * ratio;
          iy += yMove * ratio;
        } else if (moving == 2) {
          tx += xMove * ratio;
          ty += yMove * ratio;
        }

        drawCanvas(currentFrame)
      } else if (active == 3) {
        if (moving == 0) {
          if (Math.abs(xMove) > Math.abs(yMove)) {
            dR += xMove * ratio;
            dx -= xMove * ratio / 2;
            dy -= xMove * ratio / 2;
          } else {
            dR += yMove * ratio;
            dx -= yMove * ratio / 2;
            dy -= yMove * ratio / 2;
          }

          calculateBaseValues();
          drawCanvas(currentFrame,true)
        } else if (moving == 1) {
          if (Math.abs(xMove) > Math.abs(yMove)) {
            iR += xMove * ratio / 2;
          } else {
            iR += yMove * ratio / 2;
          }

          drawCanvas(currentFrame)
        } else if (moving == 2) {
          if (Math.abs(xMove) > Math.abs(yMove)) {
            tS += xMove * ratio / 2;
          } else {
            tS += yMove * ratio / 2;
          }

          drawCanvas(currentFrame)
        }
      } else if (active == 4) {
        var titleMaxLength = Math.max(assets.data('title').length, assets.data('dev').length);
        trimLength += xMove * ratio / (tS / 2);

        if (trimLength > titleMaxLength) {
          trimLength = titleMaxLength
        }

        appTitle = trimText(capitalize(assets.data('title')));
        appDev = trimText(capitalize(assets.data('dev')));

        drawCanvas(currentFrame)
      } else if (active == 5) {
        dy += yMove * ratio / 2;
        iy += yMove * ratio / 2;
        ty += yMove * ratio / 2;
        canvas.height += yMove * ratio;
        cH = canvas.height;
        $('.js-size').text(cW + "x" + cH);

        drawCanvas(currentFrame)
      }
    } else if (phase == 'end') {
      moving = 0;
      $('.js-size').text("");
    }
  }

  var screens, screen;

  function insertIconScreen() {
    var canvas = document.createElement("canvas");
    var r = 100;
    var w = 336;
    var h = 420;
    canvas.width = w;
    canvas.height = h;
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = '#000000';
    ctx.fillRect(0,0,w,h);

    ctx.save();
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, r, 0, 2 * Math.PI, false);
    ctx.clip();
    ctx.drawImage(appIcon,w / 2 - r,h / 2 - r,r * 2,r * 2);
    ctx.restore();
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, r, 0, 2 * Math.PI, false);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000000';
    ctx.stroke();

    var image = new Image();
    image.src = canvas.toDataURL();

    assets.prepend(image);

    screens = assets.children();
    screens.eq(0).addClass('active');
    screen = screens[0];

    screens.on('click', function(){
      if (!$(this).hasClass('active')) {
        screens.removeClass('active');
        $(this).addClass('active');
        screen = screens[screens.index($(this))];

        drawCanvas(currentFrame)
      }
    });
  }

  $(window).resize(function(){
    ratio = cW / $('#js-canvas').width();
  });

  // clear the canvas
  function clearCanvas() {
    ctx.clearRect(0,0,cW,cH);
  }

});
