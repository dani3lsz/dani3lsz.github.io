//
// Handle watch app previews
//



(function(){

  // Check if apng is supported
  var aPngSupported = true;

  APNG.ifNeeded().then(function () {
    aPngSupported = false;
  });

  // Chek if touch device
  var touchDevice = false;

  if ($('html').hasClass('touch')) {
    touchDevice = true;
  }

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

      var animated = false;
      var video = false;
      var galleryTimer = false;

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
      notification.scroll = $this.find('.js-scroll');
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
      var mouseMove = false; // used to prevent click at the end of swipes

      $this.find('.js-close').on('click', function(){
        if (!mouseMove) {
          stopCurrent()
        }
      });

      $this.find('.js-open').on('click', function(){
        if (!mouseMove) {
          app.button.eq(0).trigger('click');
        }
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

          if (animated && !aPngSupported) {
            app.stage.children("canvas").each(function() { APNG.releaseCanvas(this); })
          }

          if (animated || video) {
            app.stage.empty();
            video = false;
            animated = false;
          }

          if (galleryTimer) {
            clearInterval(galleryTimer)
          }

          app.stage.removeClass('active');
        } else if (obj == glance) {
          glance.stage.removeClass('active animate');
          glance.stage.parent().removeClass('blur');
        } else if (obj == notification) {
          notification.stage.removeClass('active animate');
          notification.stage.parent().removeClass('blur');

          setTimeout(function(){
            notification.scroll.scrollTop(0);
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

          if (typeof videoSrc != 'undefined' && videoSrc != "" && !touchDevice) {
            media = '<video src="'+ videoSrc +'" width="136" height="170" preload autoplay loop muted webkit-playsinline >';
            video = true;
          } else if (typeof animatedSrc != 'undefined' && animatedSrc != "") {
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

          if (app.stage.hasClass('application--gallery')) {
            galleryTimer = setInterval(function(){
              moveGallery(0)
            }, 4000)
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
      // Handle app gallery
      //



      var gallery = $this.find('.application--gallery');
      var images = gallery.children();
      var imagesMaxIndex = images.length - 1;
      var activeIndex = 0;
      var nextIndex = 1;
      var maxDistance = gallery.width();

      //Init touch swipe
      gallery.swipe({
        triggerOnTouchEnd: true,
        triggerOnTouchLeave: true,
        swipeStatus: swipeGallery,
        allowPageScroll: "none",
        threshold: 1
      });

      function swipeGallery(event,phase,direction,distance,fingers) {
        if (phase == "move" && direction == "left") {
          moveGallery(distance)
        } else if (phase == "end" && direction == "left") {
          moveGallery(0)
        }
      }

      function moveGallery(distance) {
        if (distance == 0) {
          images.eq(activeIndex).removeAttr('style').addClass('hidden');
          images.eq(nextIndex).removeAttr('style').removeClass('hidden').addClass('active');

          setTimeout(function(){
            images.eq(activeIndex).removeClass('active');

            activeIndex = nextIndex;
            nextIndex = nextIndex != imagesMaxIndex ? nextIndex + 1 : 0;
          },400)
        } else {
          clearInterval(galleryTimer);
          galleryTimer = setInterval(function(){
            moveGallery(0)
          }, 4000);

          var newOpacity = Math.round(distance / maxDistance * 100) / 100;
          var newScale = 0.75 + Math.round(distance / maxDistance * 100) / 400;

          images.eq(activeIndex).css({
            "opacity": 1 - newOpacity,
            "-webkit-transition-duration": "0s",
                    "transition-duration": "0s",
                "-ms-transform": "translate(" + -distance + "px,0)",
            "-webkit-transform": "translate3d(" + -distance + "px,0,0)",
                    "transform": "translate3d(" + -distance + "px,0,0)"
          });

          images.eq(nextIndex).css({
            "opacity": newOpacity,
            "-webkit-transition-duration": "0s",
                    "transition-duration": "0s",
                "-ms-transform": "scale(" + newScale + ")",
            "-webkit-transform": "scale(" + newScale + ")",
                    "transform": "scale(" + newScale + ")"
          })
        }
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
      var moveHorizontal = false;
      var moveVertical = false;

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
        swipeStatus: swipeGlance,
        allowPageScroll: "none",
        threshold: 10,
        tap: tap
      });

      // function if glance is tapped
      function tap(event, target) {
        app.button.eq(0).trigger('click')
      }

      // functions if glance is swiped
      function swipeGlance(event,phase,direction,distance,fingers) {

        //If we are moving before swipe, then manually drag the carousel
        if (phase == "move") {
          if (direction == "left") {
            if (!moveVertical) {
              moveHorizontal = true;

              moveTape((index * tapeWidth) + distance, 0);
            }
          } else if (direction == "right") {
            if (!moveVertical) {
              moveHorizontal = true;

              moveTape((index * tapeWidth) - distance, 0);
            }
          } else if (direction == "down") {
            if (!moveHorizontal) {
              moveVertical = true;

              moveTapeParent(distance, 0);
            }
          }
        } else if (phase == "cancel") {
          if (moveHorizontal) {
            moveHorizontal = false;

            moveTape(index * tapeWidth, speed);
          } else if (moveVertical) {
            moveVertical = false;

            tape.parent().removeAttr('style');
          }
        } else if (phase == "end") {
          if (moveHorizontal) {
            moveHorizontal = false;

            if (direction == "right") {
              if (index != 0) {
                index -= 1;
              }
            } else if (direction == "left") {
              if (index != maxIndex) {
                index += 1;
              }
            }

            moveTape(index * tapeWidth, speed);
          } else if (moveVertical) {
            moveVertical = false;

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
              "-ms-transform": "translate(" + value + "px,0)",
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
              "-ms-transform": "translate(0," + value + "px)",
          "-webkit-transform": "translate3d(0," + value + "px,0)",
                  "transform": "translate3d(0," + value + "px,0)"
        });
      }



      //
      // Handle notification touch move on desktop
      //



      var scrollPos = notification.scroll.scrollTop();

      //Init touch swipe on desktop
      if (!touchDevice) {
        notification.scroll.swipe({
          triggerOnTouchEnd: true,
          triggerOnTouchLeave: true,
          swipeStatus: swipeNotification,
          threshold: 1
        });
      }

      // functions if notification is swiped
      function swipeNotification(event,phase,direction,distance,fingers) {

        // Manual drag
        if (phase == "start") {
          scrollPos = notification.scroll.scrollTop();
        } else if (phase == "move" && (direction == "up" || direction == "down")) {
          mouseMove = true;

          if (direction == "up")
            scrollNotification(scrollPos + distance);

          else if (direction == "down")
            scrollNotification(scrollPos - distance);
        } else if (phase == "end") {
          setTimeout(function(){
            mouseMove = false;
          },10)
        }
      }

      // Scroll notification
      function scrollNotification(distance) {
          notification.scroll.scrollTop(distance)
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
  // Start app on phone
  //

  var $window = $(window);
  var windowWidth = $window.width();

  if (watch.length && touchDevice && windowWidth < 600) {
    playInView();

    $window.scroll(function(){
      playInView()
    });
  }

  function playInView() {
    var scrollTop = $window.scrollTop();
    var windowHeight = $window.height();

    watch.each(function(){
      var $this = $(this);

      if (!$this.hasClass('started')) {
        var elemOffset = $this.offset().top;

        if (elemOffset + 250 < windowHeight + scrollTop) {
          $this.find('.js-autoplay').eq(0).trigger('click');
          $this.addClass('started')
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

// stop loading indicator

$(window).load(function(){
  $('.js-load').addClass('loaded')
});
