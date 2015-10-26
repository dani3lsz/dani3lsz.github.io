(function(){

  var
    global = this,
    globalWidth, globalHeight,
    listElemWidth,
    activeIndex = 0,
    prevIndex,
    maxIndex,
    playing = false,
    threshold = 50,
    speed = 400;


  var
    $global = $(global),
    $stage = $('.js-stage'),
    $video = $('.js-video'),
    $videoElem = $video.children(),
    $info = $('.js-info'),
    $infoElem = $info.children(),
    $list = $('.js-list'),
    $listElem = $list.children(),
    $overlay = $('.js-overlay'),
    $canvas = $('.js-canvas');


  function getInfo() {
    globalWidth = $global.width();
    globalHeight = $global.height();
    listElemWidth = $listElem.outerWidth();
    maxIndex = $listElem.length - 1;
  }


  // handle swipes
  function swipeStage(event,phase,direction,distance,fingers) {
    if (phase == 'start') {
      prevIndex = activeIndex
    } else if (phase == 'move' && (direction == 'left' || direction == 'right') && !playing) {
      moveStage(direction == 'left' ? -distance : distance,0)
    } else if (phase == 'end') {
      if (distance) {
        if (!playing) {
          if (distance > threshold) {
            activeIndex = direction == 'left' ? activeIndex + 1 : activeIndex - 1;

            if (activeIndex < 0 ) {
              activeIndex = 0;
            } else if (activeIndex > maxIndex) {
              activeIndex = maxIndex
            }
          }

          moveStage(0,speed);

          if (prevIndex != activeIndex) {
            setActive(prevIndex,activeIndex)
          }
        }
      } else {
        togglePlay()
      }
    }
  }


  function moveStage(distance,duration) {
    distance = distance || 0;
    duration = duration || 0;

    $video.css({
      '-webkit-transition-duration': (duration / 1000).toFixed(1) + 's',
      '-webkit-transform': 'translate3d('+ (-activeIndex * globalWidth + distance / 8) +'px,0,0)'
    });

    $info.css({
      '-webkit-transition-duration': (duration / 1000).toFixed(1) + 's',
      '-webkit-transform': 'translate3d('+ (-activeIndex * globalWidth + distance / 2) +'px,0,0)'
    });

    $infoElem.eq(activeIndex).css({
      'opacity': 1 - Math.round(Math.abs(distance) / (globalWidth / 2) * 100) / 100
    });

    $list.css({
      '-webkit-transition-duration': (duration / 1000).toFixed(1) + 's',
      '-webkit-transform': 'translate3d('+ (-activeIndex * listElemWidth - listElemWidth / 2 + distance / 4) +'px,0,0)'
    })
  }


  function setActive(prevIndex,activeIndex) {
    if (typeof prevIndex != 'undefined') {
      $videoElem.eq(prevIndex).removeClass('active');
      $infoElem.eq(prevIndex).removeClass('active');
      $listElem.eq(prevIndex).removeClass('active');
    }

    $videoElem.eq(activeIndex).addClass('active');
    $infoElem.eq(activeIndex).addClass('active');
    $listElem.eq(activeIndex).addClass('active');
  }


  function togglePlay() {
    if (playing) {
      playing = false;
      $stage.removeClass('playing');

      $list.css({
        '-webkit-transition-duration': (speed / 1000).toFixed(1) + 's',
        '-webkit-transform': 'translate3d('+ (-activeIndex * listElemWidth - listElemWidth / 2) +'px,0,0)'
      })
    } else {
      playing = true;
      $stage.addClass('playing');

      $list.css({
        '-webkit-transition-duration': (speed / 1000).toFixed(1) + 's',
        '-webkit-transform': 'translate3d('+ (-activeIndex * listElemWidth - listElemWidth / 2) +'px,'+ (globalHeight / 2) +'px,0)'
      })
    }
  }

  getInfo();

  // bind swipe events to stage
  $stage.swipe({
    swipeStatus: swipeStage,
    threshold: 0,
    allowPageScroll: 'none',
    triggerOnTouchEnd: true
  });


  $global.load(function(){
    moveStage();
    setActive(null,activeIndex)
  })
})();