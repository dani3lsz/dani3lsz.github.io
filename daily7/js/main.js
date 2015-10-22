(function(){

  var
    global = this,
    stageWidth,
    stageHeight,
    elemHeight,
    r,oX,
    transformOriginX,
    baseRotate,
    activeIndex = 0,
    maxIndex,
    threshold = 10,
    speed = 400,
    playing = false;

  var
    $global = $(global),
    $stage = $('.js-stage'),
    $video = $('.js-video'),
    $elem = $('.js-elem');


  function getValues() {
    stageWidth = $global.width();
    stageHeight = Math.round(stageWidth * 0.5625);
    elemHeight = $elem.height();
    r = Math.round(stageHeight / 1080 * 3000);
    oX = Math.round(stageWidth - stageHeight / 1080 * 1110 - r);
    transformOriginX = Math.round(stageWidth * 0.45) - Math.round(stageWidth - stageHeight / 1080 * 1110) + r;
    baseRotate = (elemHeight * 1.5) / (2 * r * Math.PI) * 360;
    maxIndex = $elem.length - 1;

    handleStage()
  }


  // handle swipes
  function swipeStage(event,phase,direction,distance,fingers) {
    if (phase == 'end' && (direction == 'up' || direction == 'down') && distance > threshold && !playing) {
      handleStage(direction == 'up' ? 1 : -1)
    } else if (phase == 'end' && distance === 0) {
      if (playing) {
        playing = false;
        $elem.parent().removeClass('playing');

        setTimeout(function(){
          $video.eq(activeIndex).removeClass('playing');
        },100)
      } else {
        playing = true;
        $video.eq(activeIndex).addClass('playing');

        setTimeout(function(){
          $elem.parent().addClass('playing')
        },100)
      }
    }
  }


  function handleStage(change,duration) {
    duration = typeof duration != 'undefined' ? duration : speed;

    var prevIndex = activeIndex;

    if (typeof change != 'undefined') {
      activeIndex += change;

      if (activeIndex < 0) {
        activeIndex = 0
      } else if (activeIndex > maxIndex) {
        activeIndex = maxIndex
      }
    }

    for (var i = 0; i <= maxIndex; i++) {
      var rotate = i === activeIndex ? 0 : (i - activeIndex) * baseRotate;

      $elem.eq(i).css({
        '-webkit-transition-duration': (duration / 1000).toFixed(1) + 's',
        '-webkit-transform-origin-x': -transformOriginX,
        '-webkit-transform': 'rotate('+ rotate +'deg)'
      })
    }

    if (prevIndex != activeIndex) {
      $video.eq(activeIndex).addClass('active-in');

      setTimeout(function(){
        $video.eq(activeIndex).addClass('active');
      },10);

      setTimeout(function(){
        $video.eq(activeIndex).removeClass('active-in');
        $video.eq(prevIndex).removeClass('active');
      },speed);

      $elem.eq(prevIndex).removeClass('active');
      $elem.eq(activeIndex).addClass('active')
    } else {
      $video.eq(activeIndex).addClass('active');
    }
  }


  // bind swipe events to stage
  $stage.swipe({
    swipeStatus: swipeStage,
    threshold: 0,
    allowPageScroll: 'none',
    triggerOnTouchEnd: true
  });

  $global.load(function(){
    setTimeout(function(){
      handleStage(maxIndex,speed * 2)
    },speed)
  });

  $global.resize(function(){
    getValues()
  });

  getValues()

})();