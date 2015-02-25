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

  if (watch.length) {
    watch.each(function(){



      //
      // Handle playing previews
      //



      var $this = $(this);

      // get buttons under the watch
      var appButton = $this.find('.js-app-btn');
      var glanceButton = $this.find('.js-glance-btn');
      var notificationButton = $this.find('.js-notification-btn');

      // get stages of the previews
      var baseStage = $this.find('.js-base');
      var appStage = $this.find('.js-app');
      var glanceStage = $this.find('.js-glance');
      var notificationStage = $this.find('.js-notification');

      // vars to check if one is playing
      var appPlaying = false;
      var glancePlaying = false;
      var notificationPlaying = false;

      // click events on the buttons
      appButton.on('click', function(){
        handleClick('app')
      });

      glanceButton.on('click', function(){
        handleClick('glance')
      });

      notificationButton.on('click', function(){
        handleClick('notification')
      });

      // click events on notification action buttons
      $this.find('.js-close').on('click', function(){
        notificationButton.trigger('click');
      });

      $this.find('.js-open').on('click', function(){
        appButton.trigger('click');
      });

      // start/stop previews
      function handleClick(btn) {
        var playing = checkPlayers();

        if (playing) {
          stopPlayer(playing);

          if(playing != btn) {
            var b = btn;
            setTimeout(function(){
              startPlayer(b)
            },500)
          }
        } else {
          startPlayer(btn)
        }
      }

      // check which preview is playing
      function checkPlayers() {
        if (appPlaying) {
          return 'app'
        } else if (glancePlaying) {
          return 'glance'
        } else if (notificationPlaying) {
          return 'notification'
        } else {
          return false
        }
      }

      // stop player functions
      function stopPlayer(player) {
        if (player == 'app') {
          baseStage.removeClass('zoom');

          appButton.removeClass('active');

          appStage.empty();
          appStage.removeClass('active');

          appPlaying = false;
        } else if (player == 'glance') {
          glanceButton.removeClass('active');

          glanceStage.removeClass('active animate');
          glanceStage.parent().removeClass('blur');

          glancePlaying = false;
        } else if (player == 'notification') {
          notificationButton.removeClass('active');

          notificationStage.removeClass('active animate');

          notificationStage.parent().removeClass('blur');

          notificationPlaying = false;

          setTimeout(function(){
            notificationStage.find('.js-scroll').scrollTop(0);
          },500)
        }
      }

      // start player functions
      function startPlayer(player) {
        if (player == 'app') {
          baseStage.addClass('zoom');

          appButton.addClass('active');

          var animatedSrc = appStage.data('apng');
          var videoSrc = appStage.data('video');
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
            appStage.append(media);
          }

          appStage.addClass('active');

          if (animated && !aPngSupported) {
            appStage.children("img").each(function() { APNG.animateImage(this); })
          }

          appPlaying = true;
        } else if (player == 'glance') {
          glanceButton.addClass('active');

          glanceStage.addClass('active animate');

          glanceStage.parent().addClass('blur');

          glancePlaying = true;
        } else if (player == 'notification') {
          notificationButton.addClass('active');

          notificationStage.addClass('active animate');

          notificationStage.parent().addClass('blur');

          notificationPlaying = true;
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
        appButton.trigger('click')
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
            glanceButton.trigger('click');
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
