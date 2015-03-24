//
// Handle samples on details page
//



(function(){
  var samples = $('.js-samples');

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

  if (samples.length) {



    //
    // Handle carousel
    //



    var $window = $(window);
    var prevBtn = samples.parent().find('.js-prev');
    var nextBtn = samples.parent().find('.js-next');
    var elem = samples.children();
    var width = samples.width();
    var elemWidth = elem.width();
    var inView = Math.round(width / elemWidth);
    var maxIndex = elem.length - inView;
    var index = 0;
    var speed = 400;

    // functions if glance is swiped
    function swipeStatus(event,phase,direction,distance,fingers) {
      if (phase == "move" && (direction == "left" || direction == "right") && maxIndex > 0) {
        if (direction == "left") {
          moveCarousel(index * elemWidth + distance, 0)
        } else if (direction == "right") {
          moveCarousel(index * elemWidth - distance, 0)
        }
      } else if (phase == "cancel") {
        moveCarousel(index * elemWidth, speed)
      } else if (phase == "end") {
        if (direction == "left") {
          handleClick(1)
        } else if (direction == "right") {
          handleClick(-1)
        }
      }
    }

    // get new index
    function handleClick(direction) {
      var newIndex = index + direction;

      if (newIndex <= maxIndex && newIndex >= 0) {
        index = newIndex;
        hideNav()
      }

      moveCarousel(index * elemWidth, speed)
    }

    // move carousel
    function moveCarousel(move,duration) {
      var value = (move < 0 ? "" : "-") + Math.abs(move).toString();
      var limit = 50;

      if (value > limit) {
        value = limit
      } else if (value < -(maxIndex * elemWidth + limit)) {
        value = -(maxIndex * elemWidth + limit)
      }

      samples.css({
        "-webkit-transition-duration": (duration / 1000).toFixed(1) + "s",
                "transition-duration": (duration / 1000).toFixed(1) + "s",
        "-webkit-transform": "translate3d(" + value + "px,0,0)",
                "transform": "translate3d(" + value + "px,0,0)"
      });
    }

    // hide/show nav
    function hideNav(){
      if (maxIndex <= 0) {
        prevBtn.addClass('disable');
        nextBtn.addClass('disable');
      } else {
        if (index == 0) {
          prevBtn.addClass('disable');
          nextBtn.removeClass('disable');
        } else if (index == maxIndex) {
          nextBtn.addClass('disable');
          prevBtn.removeClass('disable');
        } else {
          prevBtn.removeClass('disable');
          nextBtn.removeClass('disable');
        }
      }
    }

    // set container height
    function setHeight() {
      function getHeight() {
        var height = 0;
        elem.each(function(){
          var currentHeight = $(this).height();
          if (currentHeight > height) {
            height = currentHeight
          }
        });
        return height
      }

      samples.parent().css({
        "height": getHeight()
      })
    }

    setHeight();
    hideNav();

    // handle clicks
    prevBtn.on('click', function(){
      handleClick(-1)
    });

    nextBtn.on('click', function(){
      handleClick(1)
    });

    //Init touch swipe
    samples.parent().swipe({
      triggerOnTouchEnd: true,
      triggerOnTouchLeave: true,
      swipeStatus: swipeStatus,
      allowPageScroll: "vertical",
      threshold: 50
    });

    // update values on resize
    $window.resize(function(){
      width = samples.width();
      elemWidth = elem.width();
      inView = Math.round(width / elemWidth);
      maxIndex = elem.length - inView;

      if (index > maxIndex) {
        index = maxIndex
      }

      moveCarousel(index * elemWidth, 0);
      hideNav()
    });



    //
    // Handle resources
    //



    elem.each(function(){
      var mediaContainer = $(this).find('.js-sample');

      var animatedSrc = mediaContainer.data('apng');
      var videoSrc = mediaContainer.data('video');
      var media;
      var animated = false;
      var video = false;

      if (typeof videoSrc != 'undefined' && !touchDevice) {
        media = '<video src="'+ videoSrc +'" width="136" height="170" preload autoplay loop muted webkit-playsinline >';
        video = true;
      } else if (typeof animatedSrc != 'undefined') {
        media = '<img src="'+ animatedSrc +'" width="136" height="170" >';
        animated = true;
      }

      if (animated || video) {
        mediaContainer.append(media);
      }

      if (animated && !aPngSupported) {
        mediaContainer.children("img").each(function() { APNG.animateImage(this); })
      }
    });


  }
})();
