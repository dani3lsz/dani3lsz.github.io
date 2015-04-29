
$(document).ready(function() {

  var
    canvas = document.getElementById('js-canvas'),
    cW = canvas.width,
    cH = canvas.height,
    src = 'images/renders/alu-sport-blue/';

  var
    currentFrame = 0,
    newFrame = 0;

  if (canvas.getContext){
    var ctx = canvas.getContext('2d');
  } else {
    return false;
  }

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
    images[i/divider].src = src + ("00" + i).slice(-3) + '.jpg';
  }

  function drawCanvas(index) {
    ctx.drawImage(images[index],0,0);
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
