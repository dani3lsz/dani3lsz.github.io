(function(){


  //
  // variables
  //


  var ytArr = ['kR2MGE6R2Bk','0k7krD7hoaY','GeDJAKvcZ9o','w9RQlv5iXHI'];

  var
    global = this,
    globalWidth,
    globalHeight,
    videoWidth,
    videoHeight,
    speed= 400,
    activeIndex = 0,
    maxIndex = ytArr.length - 1,
    posNext, posActive, posVote,
    player = {};

  var
    $global = $(global),
    $stage = $('.js-stage'),
    $channels = $('.js-channels'),
    $video = $('.js-video');



  //
  // functions
  //


  // get basic values needed later
  function getValues() {
    globalWidth = $global.width();
    globalHeight = $global.height();
    videoWidth = Math.round(globalWidth * 0.8);
    videoHeight = Math.round(videoWidth * 0.5625);
    posNext = [0, (globalHeight - videoHeight) / 4];
    posActive = [0, globalHeight / 2 + videoHeight / 2];
    posVote = [globalWidth / 2 + videoWidth / 2, globalHeight / 2 + videoHeight / 2];

    setValues()
  }


  // set some necessary css on video parents
  function setValues() {
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
    iframe.src = 'http://www.youtube.com/embed/'+ ytArr[i] +'?autohide=1&rel=0&iv_load_policy=3&enablejsapi=1';
    iframe.frameBorder = 0;

    $video.eq(i).append(iframe);
    $video.eq(i).after(newDiv);
    $video = $('.js-video');

    ytPlayer(i);
    setValues()
  }


  // handle swipes
  function swipeStage(event,phase,direction,distance,fingers) {
    if (phase == 'move') {

    } else if (phase == 'end') {

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
    event.target.playVideo();
    moveVideo(activeIndex,posActive[0],-posActive[1],speed);
    moveVideo(activeIndex + 1,posNext[0],-posNext[1],speed)
  }


  // called if video ends
  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
      playNextVideo()
    }
  }


  // play next video
  function playNextVideo() {
    if (activeIndex == maxIndex) return;

    activeIndex++;

    addVideo(activeIndex + 1);

    player[activeIndex].playVideo();

    moveVideo(activeIndex - 1,posVote[0],-posVote[1],speed);
    moveVideo(activeIndex,posActive[0],-posActive[1],speed);

    if (activeIndex != maxIndex)
    moveVideo(activeIndex + 1,posNext[0],-posNext[1],speed)
  }


  // move video
  function moveVideo(index,distanceH,distanceV,duration) {
    if (index < 0 || index > maxIndex) return;

    distanceH = distanceH || 0;
    distanceV = distanceV || 0;
    duration = duration || 0;

    $video.eq(index).css({
      '-webkit-transition-duration': (duration / 1000).toFixed(1) + 's',
      '-webkit-transform': 'translate3d('+ distanceH +'px,'+ distanceV +'px,0)'
    })
  }


  // called if yt iframe api is loaded
  global.onYouTubeIframeAPIReady = function() {
    addVideo(0);
    addVideo(1)
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