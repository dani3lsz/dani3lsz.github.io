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
    topElemWidth,
    topElemHeight,
    speed = 400,
    pad = 100,
    threshold,
    activeIndex = -1, // on start it needs to be -1
    maxIndex = ytArr.length - 1,
    posNext, posPrev, posActive, posReady,
    fullScreen = false,
    autoPlay = true,
    scale,
    timeOut,
    startX, startY, clientX, clientY, clientXn, clientYn, clientXm, clientYm,
    vote,
    voteUp = 0, voteDown = 0,
    scoreCircleRadius = 12,
    topOpen = false,
    rowPieceWidth,
    viewMaxIndex,
    viewIndex = 0,
    activeRow = 0,
    rowsMoved = [0,0,0],
    rowsMaxMove = [],
    moveTV,
    longSwipe = false,
    activeChannel = 0,
    maxChannelIndex = 1,
    movingChannel = false,
    playerTimeout,
    playerState,
    player = {};

  var
    $global = $(global),
    $tv = $('.js-tv'),
    $overlay = $('.js-overlay'),
    $stage = $('.js-stage'),
    $topRow = $('.js-top-row'),
    $topElem = $('.js-top-elem'),
    $info = $('.js-info'),
    $score = $('.js-score'),
    $scoreCircle = $('#js-score-circle'),
    $voteUp = $('.js-vote-up'),
    $voteDown = $('.js-vote-down'),
    $video = $('.js-video'),
    $channel = $('.js-channel');



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

    topElemHeight = $topElem.height();
    topElemWidth = Math.round(topElemHeight / 0.5625);
    rowPieceWidth = Math.round((topElemWidth + globalWidth * 0.06) * 10) / 10;
    viewMaxIndex = Math.floor(globalWidth / rowPieceWidth) - 1;

    for (var i = 0; i < $topRow.length; i++) {
      rowsMaxMove[i] = $topRow.eq(i).children().length - 1 - viewMaxIndex
    }

    threshold = (globalWidth - videoWidth) / 4;
    posNext = pad / 2;
    posActive = globalHeight / 2 + videoHeight / 2;
    posReady = globalHeight / 3;
    posPrev = globalHeight + videoHeight;
    scale = globalWidth / videoWidth;

    setValues()
  }


  // set some necessary css
  function setValues() {
    $topElem.css({
      'width': topElemWidth
    });

    $topRow.css({
    });

    $info.css({
      'width': videoWidth,
      'margin-top': ((globalHeight - videoHeight) / 2 - 50) / 2
    });

    $score.parent().css({
      'top': globalHeight / 2 - videoHeight / 2 - 50,
      'right': threshold + 'px'
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
    newDiv.setAttribute('class','tv__main__video js-video');

    var newTitle = document.createElement('div');
    newTitle.setAttribute('class', 'tv__main__video__title truncate js-title');
    newTitle.innerHTML = 'Some title';

    var iframe = document.createElement('iframe');
    iframe.id = 'player' + i;
    iframe.type = 'text/html';
    iframe.width = videoWidth;
    iframe.height = videoHeight;
    iframe.src = 'http://www.youtube.com/embed/'+ ytArr[i] +'?autohide=1&rel=0&iv_load_policy=3&enablejsapi=1&controls=0&playsinline=1&vq=hd720';
    iframe.frameBorder = 0;

    $video.eq(i).append(newTitle);
    $video.eq(i).append(iframe);
    $video.eq(i).after(newDiv);
    $video = $('.js-video');

    ytPlayer(i);
    setValues()
  }


  // handle swipes
  function swipeStage(event,phase,direction,distance,fingers) {
    if (topOpen) {
      if (phase == 'start') {
        clientX = event.pageX;
        clientY = event.pageY;

        longSwipe = false;
      } else if (phase == 'move') {
        clientXn = event.pageX;
        clientYn = event.pageY;

        clientXm = clientXn - clientX;
        clientYm = clientYn - clientY;

        if (clientYm < -threshold && Math.abs(clientYm) > Math.abs(clientXm) && activeRow === 0) {
          moveTV = true;
          moveTv(clientYm + threshold,0)
        } else {
          if (moveTV) {
            moveTV = false;
            clientY += clientYm;
            moveTv(0,speed)
          }

          if (Math.abs(clientXm) >= threshold * 2) {
            clientX += clientXm;
            longSwipe = true;

            if (clientXm < 0) {
              moveFocus('left')
            } else {
              moveFocus('right')
            }
          }

          if (Math.abs(clientYm) >= threshold * 2) {
            clientY += clientYm;
            longSwipe = true;

            if (clientYm < 0) {
              moveFocus('up')
            } else {
              moveFocus('down')
            }
          }
        }
      } else if (phase == 'end') {
        if (moveTV) {
          moveTV = false;

          if (clientYm < -threshold * 2) {
            topOpen = false;
            moveTv(-globalHeight,speed);
          } else {
            moveTv(0,speed);
          }
        } else if (!longSwipe) {
          moveFocus(direction)
        }
      }
    } else {
      if (phase == 'start') {
        startX = event.pageX;
        startY = event.pageY;
      } else if (phase == 'move' && !fullScreen) {
        if (direction == 'left') {
          if (startX > globalWidth - threshold && activeChannel < maxChannelIndex) {
            movingChannel = true;
            autoPlay = false;
            player[activeIndex].pauseVideo();
            moveChannel(globalWidth * activeChannel - distance,0)
          } else if (playerState) {
            moveVideo(activeIndex,Math.max(-distance / 2,-threshold),-posActive,1,0);
            increaseThumb(direction,distance / 2,0)
          }
        } else if (direction == 'right') {
          if (startX < threshold && activeChannel > 0) {
            movingChannel = true;
            autoPlay = false;
            player[activeIndex].pauseVideo();
            moveChannel(-globalWidth * activeChannel + distance,0)
          } else if (playerState) {
            moveVideo(activeIndex,Math.min(distance / 2,threshold),-posActive,1,0);
            increaseThumb(direction,distance / 2,0)
          }
        } else if (direction == 'up') {
          if (playerTimeout) {
            clearTimeout(playerTimeout);
            playerTimeout = null;
          }

          if (playerState) {
            moveVideo(activeIndex,0,-posActive - distance,1,0);
            moveVideo(activeIndex + 1,0,-posNext - distance / 4,1,0);
          } else {
            moveVideo(activeIndex,0,-posReady - distance,1,0);
            moveVideo(activeIndex + 1,0,-posNext - distance / 4,1,0);
            moveTitle(activeIndex,-globalHeight / 3 + distance / 2,1,2,0)
          }

        } else if (direction == 'down') {
          if (playerTimeout) {
            clearTimeout(playerTimeout);
            playerTimeout = null;
          }

          if (startY < (globalHeight - videoHeight) / 2 && !topOpen) {
            moveTv(-globalHeight + distance,0)
          } else if (playerState) {
            moveVideo(activeIndex - 1,0,-posPrev + distance / 4,1,0);
            moveVideo(activeIndex,0,-posActive + distance,1,0);
            moveVideo(activeIndex + 1,0,-posNext + distance / 4,1,0);
          } else {
            moveVideo(activeIndex - 1,0,-posPrev + distance / 4,1,0);
            moveVideo(activeIndex,0,-posReady + distance,1,0);
            moveVideo(activeIndex + 1,0,-posNext + distance / 4,1,0);
            moveTitle(activeIndex,-globalHeight / 3 + distance / 2,1,2,0)
          }
        }
      } else if (phase == 'end') {
        if (distance === 0) {
          if (timeOut) {
            clearTimeout(timeOut);
            timeOut = 0;

            if (fullScreen) {
              fullScreen = false;
              $overlay.removeClass('active');
              $voteUp.removeClass('invisible');
              $voteDown.removeClass('invisible');
              moveVideo(activeIndex,0,-posActive,1,speed);
            } else {
              fullScreen = true;
              $overlay.addClass('active');
              $voteUp.addClass('invisible');
              $voteDown.addClass('invisible');
              moveVideo(activeIndex,0,-posActive,scale,speed);
            }
          } else {
            timeOut = setTimeout(function(){
              clearTimeout(timeOut);
              timeOut = 0;
              toggleVideoPlay();
            },300);
          }
        } else {
          if (!topOpen && direction == 'down' && startY < (globalHeight - videoHeight) / 2) {
            if (distance > threshold) {
              topOpen = true;
              moveTv(0,speed)
            } else {
              moveTv(-globalHeight,speed)
            }
          } else if (movingChannel) {
            movingChannel = false;

            if (distance > threshold) {
              if (direction == 'left') {
                $channel.children().eq(activeChannel).removeClass('active');
                activeChannel++;
                $channel.children().eq(activeChannel).addClass('active')
              } else {
                $channel.children().eq(activeChannel).removeClass('active');
                activeChannel--;
                $channel.children().eq(activeChannel).addClass('active')
              }
            }

            moveChannel(-globalWidth * activeChannel,speed)
          } else if (!fullScreen) {
            playNextVideo(direction)
          }
        }
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
        moveTitle(activeIndex,0,1,1,speed);
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
      playerState = 0;
      $voteDown.removeClass('active');
      $voteUp.removeClass('active');

      // load next video if not loaded already
      if ($video.length - 2 === activeIndex && activeIndex < maxIndex)
        addVideo(activeIndex + 1);

    } else if (direction == 'down') {
      // return if no prev video
      if (activeIndex === 0) {
        moveVideo(activeIndex,0,-posActive,1,speed);
        moveVideo(activeIndex + 1,0,-posNext,1,speed);
        moveTitle(activeIndex,0,1,1,speed);
        increaseThumb();
        return
      }

      player[activeIndex].stopVideo();
      $video.eq(activeIndex).removeClass('active');

      activeIndex--;
      vote = null;
      playerState = 0;
      $voteDown.removeClass('active');
      $voteUp.removeClass('active');
    }

    moveVideo(activeIndex + 1,0,-posNext,1,speed);

    if (fullScreen) {
      moveVideo(activeIndex,0,-posActive,scale,speed);
      playerState = 1;

      if (autoPlay) {
        player[activeIndex].playVideo();
      }
    } else if (direction == 'up') {
      moveVideo(activeIndex,0,-posReady,1,speed);

      if (autoPlay) {
        playerTimeout = setTimeout(function(){
          clearTimeout(playerTimeout);
          playerTimeout = null;
          playerState = 1;

          moveVideo(activeIndex,0,-posActive,1,speed);
          moveTitle(activeIndex,0,1,1,speed);
          player[activeIndex].playVideo();
        },3000);
      }

      moveTitle(activeIndex,-globalHeight / 3,1,2,speed);
      moveTitle(activeIndex + 1,0,0,1,speed);
      increaseThumb();
    } else if (direction == 'down') {
      moveVideo(activeIndex,0,-posActive,1,speed);
      playerState = 1;

      if (autoPlay) {
        player[activeIndex].playVideo();
      }

      moveTitle(activeIndex,0,1,1,speed);
      moveTitle(activeIndex + 1,0,0,1,speed);
      increaseThumb();
    } else {
      moveVideo(activeIndex,0,-posActive,1,speed);
    }

    moveVideo(activeIndex - 1,0,-posPrev,1,speed);

    $video.eq(activeIndex).addClass('active');
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


  // move top
  function moveTv(distance,duration) {
    duration = duration || 0;
    distance = Math.min(distance,0);

    $tv.css({
      '-webkit-transition-duration': (duration / 1000).toFixed(1) + 's',
      '-webkit-transform': 'translate3d(0,'+ distance +'px,0)'
    })
  }


  // move rows
  function moveRow(distance,duration) {
    duration = duration || 0;

    $topRow.eq(activeRow).css({
      '-webkit-transition-duration': (duration / 1000).toFixed(1) + 's',
      '-webkit-transform': 'translate3d('+ distance +'px,0,0)'
    })
  }


  // move title
  function moveTitle(index,distance,opacity,scale,duration) {
    if (index < 0 || index > maxIndex) return;
    duration = duration || 0;

    $video.eq(index).children().eq(0).css({
      '-webkit-transition-duration': (duration / 1000).toFixed(1) + 's',
      '-webkit-transform': 'translate3d(0,'+ distance +'px,0) scale('+ scale +')',
      'opacity': opacity
    })
  }


  // move channel
  function moveChannel(distance,duration) {
    duration = duration || 0;

    $channel.css({
      '-webkit-transition-duration': (duration / 1000).toFixed(1) + 's',
      '-webkit-transform': 'translate3d('+ distance +'px,0,0)'
    })
  }


  // move focus
  function moveFocus(direction) {
    if (direction == 'up' || direction == 'down') {
      $topRow.eq(activeRow).parent().removeClass('active');
      $topRow.eq(activeRow).children().eq(rowsMoved[activeRow] + viewIndex).removeClass('active');

      activeRow = direction == 'up' ? Math.max(activeRow - 1,0) : Math.min(activeRow + 1,2);

      $topRow.eq(activeRow).parent().addClass('active');
      $topRow.eq(activeRow).children().eq(rowsMoved[activeRow] + viewIndex).addClass('active');
    } else if (direction == 'left' || direction == 'right') {
      $topRow.eq(activeRow).children().eq(rowsMoved[activeRow] + viewIndex).removeClass('active');

      if (direction == 'left') {
        if (viewIndex > 0) {
          viewIndex--;
        } else if (rowsMoved[activeRow] > 0) {
          rowsMoved[activeRow]--;
          moveRow(-rowsMoved[activeRow] * rowPieceWidth,400)
        }
      } else {
        if (viewIndex < viewMaxIndex) {
          viewIndex++;
        } else if (rowsMoved[activeRow] < rowsMaxMove[activeRow]) {
          rowsMoved[activeRow]++;
          moveRow(-rowsMoved[activeRow] * rowPieceWidth,400)
        }
      }

      $topRow.eq(activeRow).children().eq(rowsMoved[activeRow] + viewIndex).addClass('active');
    }
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

        voteActive.children().addClass('full');
        votePassive.children().removeClass('full')
      } else {
        voteActive = $voteUp;
        votePassive = $voteDown;

        scaleActive = 1;
        scalePassive = 1;

        opacityActive = 0.25;
        opacityPassive = 0.25;

        voteActive.children().removeClass('full');
        votePassive.children().removeClass('full')
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
          voteActive.addClass('active');
          votePassive.removeClass('active');
          voteActive.children().addClass('full');
          votePassive.children().removeClass('full');

          if (direction == 'left') {
            setScore(-1,-1)
          } else {
            setScore(1,1)
          }
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
          voteActive.addClass('active');
          voteActive.children().addClass('full');

          if (direction == 'left') {
            setScore(0,-1)
          } else {
            setScore(1,0)
          }
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


  // set score
  function setScore(up,down) {
    up = typeof up != 'undefined' ? up : 0;
    down = typeof down != 'undefined' ? down : 0;

    voteUp += up;
    voteDown -= down;

    var s = voteUp - voteDown;

    console.log(voteUp + ' ' + voteDown);

    if (s > 0) {
      s = '+' + s;
    }

    var p = Math.ceil(2 * scoreCircleRadius * Math.PI);
    var sum = voteUp + voteDown;
    var ratio = sum ? voteUp / sum : 0.5;

    var v = p - Math.round(ratio * p);

    $scoreCircle.css({
      'stroke-dashoffset': v
    });

    $score.text(s)
  }


  // toggle video play
  function toggleVideoPlay() {
    if (playerTimeout) {
      playerTimeout = setTimeout(function(){
        clearTimeout(playerTimeout);
        playerTimeout = null;
        playerState = 1;

        moveVideo(activeIndex,0,-posActive,1,speed);
        moveTitle(activeIndex,0,1,1,speed);
        player[activeIndex].playVideo();
      },0);
    } else {
      if (autoPlay) {
        autoPlay = false;
        player[activeIndex].pauseVideo()
      } else {
        autoPlay = true;

        if (!playerState) {
          playerState = 1;

          moveVideo(activeIndex,0,-posActive,1,speed);
          moveTitle(activeIndex,0,1,1,speed);
        }

        player[activeIndex].playVideo();
      }
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