(function(){


  //
  // variables
  //


  var ytArr = ['kR2MGE6R2Bk','0k7krD7hoaY','GeDJAKvcZ9o','w9RQlv5iXHI','rnvvsjstveM','0UT6rmrr9a4','nc4uo5Bv7AI','A3DDTfNaz4I','5fOVXndyjAo','UwOJdDDlcqY','FHuXSZv6Tqs','P3WnQ246f1g','MTaiJD4o7ro','axgDgH6f7Pw'];

  var
    global = this,
    globalWidth,
    globalHeight,
    videoWidth,
    videoHeight,
    speed = 400,
    pad = 80,
    threshold,
    activeIndex = -1, // on start it needs to be -1
    maxIndex = ytArr.length - 1,
    posNext, posPrev, posActive,
    fullScreen = false,
    autoPlay = true,
    scale,
    timeOut,
    startX, startY,
    vote,
    player = {};

  var
    $global = $(global),
    $overlay = $('.js-overlay'),
    $stage = $('.js-stage'),
    $channels = $('.js-channels'),
    $info = $('.js-info'),
    $score = $('#js-score'),
    $voteUp = $('.js-vote-up'),
    $voteDown = $('.js-vote-down'),
    $video = $('.js-video');



  //
  // functions
  //


  // get basic values needed later
  function getValues() {
    globalWidth = $global.width();
    globalHeight = $global.height();
    videoWidth = Math.round(globalWidth) - pad * 2;
    videoHeight = Math.round(videoWidth * 0.5625);

    if (videoHeight > globalHeight - pad * 2) {
      videoHeight = Math.round(globalHeight - pad * 2);
      videoWidth = Math.round(videoHeight / 0.5625)
    }

    threshold = (globalWidth - videoWidth) / 4;
    posNext = pad / 2;
    posActive = globalHeight / 2 + videoHeight / 2;
    posPrev = globalHeight + videoHeight;
    scale = globalWidth / videoWidth;

    setValues()
  }


  // set some necessary css
  function setValues() {
    $info.css({
      'width': videoWidth,
      'margin-top': ((globalHeight - videoHeight) / 2 - 50) / 2
    });

    $voteUp.css({
      'right': threshold + 'px'
    });

    $voteDown.css({
      'left': threshold + 'px'
    });

    $video.css({
      'width': videoWidth,
      'height': videoHeight,
      'margin': '0 0 0 -'+ videoWidth / 2 +'px'
    })
  }


  // add iframe to the dom, and create next parent div
  function addVideo(i) {
    if (typeof i === 'undefined' || i >= ytArr.length || player[i]) return;

    var newDiv = document.createElement('div');
    newDiv.setAttribute('class','tv__video js-video');

    var iframe = document.createElement('iframe');
    iframe.id = 'player' + i;
    iframe.type = 'text/html';
    iframe.width = videoWidth;
    iframe.height = videoHeight;
    iframe.src = 'http://www.youtube.com/embed/'+ ytArr[i] +'?autohide=1&rel=0&iv_load_policy=3&enablejsapi=1&controls=0&playsinline=1&vq=hd720';
    iframe.frameBorder = 0;

    $video.eq(i).append(iframe);
    $video.eq(i).after(newDiv);
    $video = $('.js-video');

    ytPlayer(i);
    setValues()
  }


  // set score
  function setScore() {
    var v = Math.round(Math.random() * 76);
    $score.css({
      'stroke-dashoffset': v
    })
  }


  // handle swipes
  function swipeStage(event,phase,direction,distance,fingers) {
    if (phase == 'start') {
      startX = event.clientX;
      startY = event.clientY;
    } else if (phase == 'move' && !fullScreen) {
      if (direction == 'left') {
        moveVideo(activeIndex,-distance / 2,-posActive,1,0);
        increaseThumb(direction,distance / 2,0)
      } else if (direction == 'right') {
        moveVideo(activeIndex,distance / 2,-posActive,1,0);
        increaseThumb(direction,distance / 2,0)
      } else if (direction == 'up') {
        moveVideo(activeIndex,0,-posActive - distance,1,0);
        moveVideo(activeIndex + 1,0,-posNext - distance,1,0);
      } else if (direction == 'down') {
        moveVideo(activeIndex - 1,0,-posPrev + distance,1,0);
        moveVideo(activeIndex,0,-posActive + distance,1,0);
        moveVideo(activeIndex + 1,0,-posNext + distance,1,0);
      }
    } else if (phase == 'end') {
      if (distance === 0) {

        if (timeOut) {
          clearTimeout(timeOut);
          timeOut = 0;

          if (fullScreen) {
            fullScreen = false;
            moveVideo(activeIndex,0,-posActive,1,speed);
            $overlay.removeClass('active');
          } else {
            fullScreen = true;
            moveVideo(activeIndex,0,-posActive,scale,speed);
            $overlay.addClass('active');
          }
        } else {
          timeOut = setTimeout(function(){
            clearTimeout(timeOut);
            timeOut = 0;
            toggleVideoPlay();
          },300);
        }
      } else {
        if (!fullScreen) playNextVideo(direction)
      }
    }
  }


  // create new yt player
  function ytPlayer(i) {
    if (i === 0) {
      player[i] = new YT.Player('player' + i, {
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
    } else {
      player[i] = new YT.Player('player' + i, {
        events: {
          'onStateChange': onPlayerStateChange
        }
      });
    }

  }


  // called if the first video is ready to play
  function onPlayerReady(event) {
    playNextVideo('up')
  }


  // called if video ends
  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
      playNextVideo('up')
    }
  }


  // play next video
  function playNextVideo(direction) {
    if (direction == 'up') {
      // return if no next video
      if (activeIndex === maxIndex) {
        moveVideo(activeIndex,0,-posActive,1,speed);
        increaseThumb();
        return
      }

      // if not called the first time
      if (activeIndex >= 0) {
        player[activeIndex].stopVideo();
        $video.eq(activeIndex).removeClass('active');
      }

      activeIndex++;
      vote = null;

      // load next video if not loaded already
      if ($video.length - 2 === activeIndex && activeIndex < maxIndex)
        addVideo(activeIndex + 1);

    } else if (direction == 'down') {
      // return if no prev video
      if (activeIndex === 0) {
        moveVideo(activeIndex,0,-posActive,1,speed);
        moveVideo(activeIndex + 1,0,-posNext,1,speed);
        increaseThumb();
        return
      }

      player[activeIndex].stopVideo();
      $video.eq(activeIndex).removeClass('active');

      activeIndex--;
      vote = null;
    }

    moveVideo(activeIndex + 1,0,-posNext,1,speed);
    moveVideo(activeIndex,0,-posActive,fullScreen ? scale : 1,speed);
    moveVideo(activeIndex - 1,0,-posPrev,1,speed);
    increaseThumb();

    if (autoPlay)
      player[activeIndex].playVideo();

    $video.eq(activeIndex).addClass('active');

    // temp function
    setScore()
  }


  // move video
  function moveVideo(index,distanceH,distanceV,scale,duration) {
    if (index < 0 || index > maxIndex) return;

    duration = duration || 0;

    $video.eq(index).css({
      '-webkit-transition-duration': (duration / 1000).toFixed(1) + 's',
      '-webkit-transform': 'translate3d('+ distanceH +'px,'+ distanceV +'px,0) scale('+ scale +')'
    })
  }


  function increaseThumb(direction,distance,duration) {
    if ((direction == 'left' && vote == 'down') || (direction == 'right' && vote == 'up')) return;

    var scaleActive, scalePassive, opacityActive, opacityPassive, voteActive, votePassive;
    duration = duration || 0;

    if (!direction) {
      if (vote) {
        voteActive = vote == 'down' ? $voteDown : $voteUp;
        votePassive = vote == 'down' ? $voteUp : $voteDown;

        scaleActive = 1;
        scalePassive = 1;

        opacityActive = 1;
        opacityPassive = 0.25;
      } else {
        voteActive = $voteUp;
        votePassive = $voteDown;

        scaleActive = 1;
        scalePassive = 1;

        opacityActive = 0.25;
        opacityPassive = 0.25;
      }
      duration = speed;
    } else {
      if (vote) {
        voteActive = direction == 'left' ? $voteDown : $voteUp;
        votePassive = direction == 'left' ? $voteUp : $voteDown;

        scaleActive = distance / threshold + 1;
        scalePassive = 1;

        opacityActive = Math.max(distance / threshold, 0.25);
        opacityPassive = Math.max(1 - distance / threshold, 0.25);

        if (scaleActive >= 2) {
          vote = direction == 'left' ? 'down' : 'up';
          opacityActive = 1;
          opacityPassive = 0.25;
          duration = speed;
          scaleActive = 1;
          scalePassive = 1;
        }
      } else {
        voteActive = direction == 'left' ? $voteDown : $voteUp;

        scaleActive = distance / threshold + 1;
        opacityActive = Math.max(distance / threshold, 0.25);

        if (scaleActive >= 2 && !vote) {
          vote = direction == 'left' ? 'down' : 'up';
          opacityActive = 1;
          duration = speed;
          scaleActive = 1;
        }
      }
    }

    if (voteActive) {
      voteActive.css({
        'opacity': opacityActive,
        '-webkit-transition-duration': (duration / 1000).toFixed(1) + 's',
        '-webkit-transform': 'scale('+ scaleActive +')'
      });
    }

    if (votePassive) {
      votePassive.css({
        'opacity': opacityPassive,
        '-webkit-transition-duration': (duration / 1000).toFixed(1) + 's',
        '-webkit-transform': 'scale('+ scalePassive +')'
      });
    }
  }


  // toggle video play
  function toggleVideoPlay() {
    if (autoPlay) {
      autoPlay = false;
      player[activeIndex].pauseVideo()
    } else {
      autoPlay = true;
      player[activeIndex].playVideo()
    }
  }


  // on window resize
  $global.resize(function(){
    getValues()
  });


  // called if yt iframe api is loaded
  global.onYouTubeIframeAPIReady = function() {
    addVideo(0);
  };



  //
  // run functions on start
  //


  getValues();


  // load yt iframe api
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


  // bind swipe events to stage
  $stage.swipe({
    swipeStatus: swipeStage,
    threshold: 0,
    allowPageScroll: 'none',
    triggerOnTouchEnd: true
  });

})();