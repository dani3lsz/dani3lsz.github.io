//
// Handle watch app previews
//



(function(){

  // Check if apng is supported
  var aPngSupported = true;

  APNG.ifNeeded().then(function () {
    aPngSupported = false;
  });

  // get wrapper class of the apps
  var watch = $('.js-watch');
  var playingVidId = false;

  if (watch.length) {
    watch.each(function(){



      //
      // Handle playing previews
      //



      var $this = $(this);
      var elemId = watch.index($this);

      var base = {};
      base.stage = $this.find('.js-base');

      var app = {};
      app.button = $this.find('.js-app-btn');
      app.stage = $this.find('.js-app');
      app.playing = false;

      var glance = {};
      glance.button = $this.find('.js-glance-btn');
      glance.stage = $this.find('.js-glance');
      glance.playing = false;

      var notification = {};
      notification.button = $this.find('.js-notification-btn');
      notification.stage = $this.find('.js-notification');
      notification.playing = false;

      var allObject = [app,glance,notification];

      // click events on the buttons
      for (var i = 0; i < allObject.length; i++) {
        (function(){
          var currentObject = allObject[i];

          currentObject.button.on('click', function(){
            handleClick(currentObject)
          });
        })()
      }

      // click events on action buttons
      $this.find('.js-close').on('click', function(){
        stopCurrent()
      });

      $this.find('.js-open').on('click', function(){
        app.button.eq(0).trigger('click');
      });

      // start/stop previews
      function handleClick(obj) {
        var stopped = stopCurrent();

        if (stopped) {
          if(stopped != obj) {
            startCurrent(obj,500)
          }
        } else {
          startCurrent(obj,0)
        }
      }

      //start current object
      function startCurrent(obj,delay) {
        obj.button.addClass('active');
        setTimeout(function(){
          startPlayer(obj)
        },delay)
      }

      //stop currently playing object
      function stopCurrent() {
        var playing = checkPlayers();

        if (playing) {
          stopPlayer(playing);
          playing.button.removeClass('active');
        }

        return playing
      }

      // check which preview is playing
      function checkPlayers() {
        var obj = false;

        for (var i = 0; i < allObject.length; i++) {
          if (allObject[i].playing) {
            obj = allObject[i]
          }
        }

        return obj
      }

      // stop player functions
      function stopPlayer(obj) {
        if (obj == app) {
          if (playingVidId === elemId) {
            playingVidId = false;
          }

          base.stage.removeClass('zoom');

          app.stage.empty();
          app.stage.removeClass('active');
        } else if (obj == glance) {
          glance.stage.removeClass('active animate');
          glance.stage.parent().removeClass('blur');
        } else if (obj == notification) {
          notification.stage.removeClass('active animate');
          notification.stage.parent().removeClass('blur');

          setTimeout(function(){
            notification.stage.find('.js-scroll').scrollTop(0);
          },500)
        }

        obj.playing = false
      }

      // start player functions
      function startPlayer(obj) {
        if (obj == app) {
          closeOtherVideos();
          playingVidId = elemId;

          base.stage.addClass('zoom');

          var animatedSrc = app.stage.data('apng');
          var videoSrc = app.stage.data('video');
          var media;
          var animated = false;
          var video = false;

          if (typeof videoSrc != 'undefined' && $('html').hasClass('no-touch')) {
            media = '<video src="'+ videoSrc +'" width="136" height="170" preload autoplay loop muted webkit-playsinline >';
            video = true;
          } else if (typeof animatedSrc != 'undefined') {
            media = '<img src="'+ animatedSrc +'" width="136" height="170" >';
            animated = true;
          }

          if (animated || video) {
            app.stage.append(media);
          }

          app.stage.addClass('active');

          if (animated && !aPngSupported) {
            app.stage.children("img").each(function() { APNG.animateImage(this); })
          }
        } else if (obj == glance) {
          glance.stage.addClass('active animate');
          glance.stage.parent().addClass('blur');
        } else if (obj == notification) {
          notification.stage.addClass('active animate');
          notification.stage.parent().addClass('blur');
        }

        obj.playing = true
      }



      //
      // Handle glance carousel
      //



      var tape = $this.find('.js-tape');
      var dots = $this.find('.js-dots').children();
      var tapeWidth = tape.width();
      var index = 0;
      var maxIndex = dots.length - 1;
      var speed = 400;

      // click on the dots in the carousel
      dots.on('click', function(){
        var $this = $(this);

        if (!$this.hasClass('active')) {
          index = dots.index($this);

          moveTape(index * tapeWidth, speed)
        }
      });

      //Init touch swipe
      tape.parent().swipe({
        triggerOnTouchEnd: true,
        triggerOnTouchLeave: true,
        swipeStatus: swipeStatus,
        allowPageScroll: "none",
        threshold: 25,
        tap: tap
      });

      // function if glance is tapped
      function tap(event, target) {
        app.button.eq(0).trigger('click')
      }

      // functions if glance is swiped
      function swipeStatus(event,phase,direction,distance,fingers) {

        //If we are moving before swipe, then manually drag the carousel
        if (phase == "move") {
          if (direction == "left")
            moveTape((index * tapeWidth) + distance, 0);

          else if (direction == "right")
            moveTape((index * tapeWidth) - distance, 0);

          else if (direction == "down")
            moveTapeParent(distance, 0);

        } else if (phase == "cancel") {
          if (direction == "left")
            moveTape(index * tapeWidth, speed);

          else if (direction == "down")
            tape.parent().removeAttr('style');

        } else if (phase == "end") {
          if (direction == "right") {
            if (index != 0) {
              index -= 1;
            }
            moveTape(index * tapeWidth, speed);
          } else if (direction == "left") {
            if (index != maxIndex) {
              index += 1;
            }
            moveTape(index * tapeWidth, speed);
          } else if (direction == "down") {
            glance.button.trigger('click');
            tape.parent().removeAttr('style');
          }
        }
      }

      // animate the carousel left or right
      function moveTape(move,duration) {
        var value = (move < 0 ? "" : "-") + Math.abs(move).toString();

        tape.css({
          "-webkit-transition-duration": (duration / 1000).toFixed(1) + "s",
                  "transition-duration": (duration / 1000).toFixed(1) + "s",
          "-webkit-transform": "translate3d(" + value + "px,0,0)",
                  "transform": "translate3d(" + value + "px,0,0)"
        });

        dots.removeClass('active');
        dots.eq(index).addClass('active');
      }

      // animate the carousel's parent down
      function moveTapeParent(move,duration) {
        var value = Math.abs(move).toString();

        tape.parent().css({
          "-webkit-transition-duration": (duration / 1000).toFixed(1) + "s",
                  "transition-duration": (duration / 1000).toFixed(1) + "s",
          "-webkit-transform": "translate3d(0," + value + "px,0)",
                  "transform": "translate3d(0," + value + "px,0)"
        });
      }
    });

    // close previous playing video
    function closeOtherVideos() {
      if (playingVidId !== false) {
        watch.eq(playingVidId).find('.js-app-btn').eq(0).trigger('click')
      }
    }
  }



  //
  // Zoom out screens if in view
  //

  var $window = $(window);
  var elem = $('.js-zoom-start');

  zoomOutStart();

  $window.scroll(function(){
    zoomOutStart()
  });

  function zoomOutStart() {
    var scrollTop = $window.scrollTop();
    var windowHeight = $window.height();

    elem.each(function(){
      var $this = $(this);
      var elemOffset;

      if ($this.hasClass('zoom-start')) {
        elemOffset = $this.offset().top;

        if (elemOffset + 300 < windowHeight + scrollTop) {
          $this.removeClass('zoom-start')
        }
      }
    })
  }



  //
  // Insert actual time into the watches
  //

  var time = $('.js-time');

  function updateClock() {
    var currentTime = new Date();
    var currentHours = currentTime.getHours();
    var currentMinutes = currentTime.getMinutes();

    // Pad the minutes and seconds with leading zeros, if required
    currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;

    // Compose the string for display
    var currentTimeString = currentHours + ":" + currentMinutes;

    time.html(currentTimeString);
  }

  setInterval(updateClock, 1000);

})();
