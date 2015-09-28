(function(){
  var
    galleryImg = document.getElementsByClassName('js-gallery-img');

  var
    $window = $(window),
    $stage = $('.js-gallery'),
    $galleryElem = $('.js-gallery-elem'),
    $galleryImg = $(galleryImg),
    $galleryData = $('.js-gallery-data'),
    $galleryText = $('.js-gallery-text');

  var
    baseMargin = 20,
    speed = 400,
    windowWidth = $window.width(),
    windowHeight = $window.height(),
    maxHeight,
    imgHeights = [],
    dataHeights = [],
    textHeights = [],
    visibleHeights = [],
    activePositions = [],
    imgOverflows = [],
    activeIndex = 0,
    maxIndex = galleryImg.length - 1,
    isLandscape = false;

  function setOrientation() {
    if (windowHeight / windowWidth <= 1 && !isLandscape) {
      isLandscape = true;
      $stage.addClass('landscape')
    } else if (windowHeight / windowWidth > 1 && isLandscape) {
      isLandscape = false;
      $stage.removeClass('landscape')
    }
  }

  function setGallery() {
    maxHeight = windowHeight - 100;

    if (galleryImg.length) {
      for (var i = 0; i < galleryImg.length; i++) {
        imgHeights[i] = Math.round((windowWidth - 2 * baseMargin) / galleryImg[i].getAttribute('width') * galleryImg[i].getAttribute('height'));
        dataHeights[i] = $galleryData.eq(i).outerHeight();
        textHeights[i] = $galleryText.eq(i).outerHeight();

        if (imgHeights[i] + dataHeights[i] > maxHeight) {
          if (imgHeights[i] > maxHeight) {
            $(galleryImg[i]).css({
              '-webkit-transform': 'translate3d(0,-'+ (imgHeights[i] - maxHeight) / 2 +'px,0)'
            });

            $galleryData.eq(i).css({
              '-webkit-transform': 'translate3d(0,'+ dataHeights[i] +'px,0)'
            });
          } else {
            $galleryData.eq(i).css({
              '-webkit-transform': 'translate3d(0,'+ (-maxHeight + imgHeights[i] + dataHeights[i]) +'px,0)'
            });
          }

          $(galleryImg[i]).addClass('img-overflow');
          imgOverflows[i] = true;
          visibleHeights[i] = maxHeight;
        } else {
          visibleHeights[i] = imgHeights[i] + dataHeights[i];
          imgOverflows[i] = false;
        }

        if (textHeights[i] > 79 && !$galleryText.eq(i).parent().hasClass('noSwipe')) {
          $galleryText.eq(i).parent().addClass('noSwipe');
        } else if (textHeights[i] < 79 && $galleryText.eq(i).parent().hasClass('noSwipe')) {
          $galleryText.eq(i).parent().removeClass('noSwipe')
        }

        activePositions[i] = (windowHeight - baseMargin * 2) / 2 + visibleHeights[i] / 2;

        $(galleryImg[i]).parent().css({
          'height': visibleHeights[i] + 'px'
        });
      }

      bindSwipe()
    }
  }

  function moveGalleryTo(direction) {
    if (direction == 'next') {
      if (activeIndex != maxIndex) {
        activeIndex++
      }
    } else if (direction == 'prev') {
      if (activeIndex != 0) {
        activeIndex--
      }
    }

    for (var i = 0; i < galleryImg.length; i++) {
      if (i < activeIndex) {
        $galleryElem.eq(i).addClass('prev');
        $galleryElem.eq(i).removeClass('active');
        moveGalleryElem(i,windowHeight - baseMargin * 2 + visibleHeights[i],speed);
      } else if (i === activeIndex) {
        $galleryElem.eq(i).addClass('active');
        $galleryElem.eq(i).removeClass('next prev');
        moveGalleryElem(i,activePositions[i],speed);
      } else if (i === activeIndex + 1) {
        $galleryElem.eq(i).addClass('next');
        $galleryElem.eq(i).removeClass('active');
        moveGalleryElem(i,0,speed);
      } else {
        $galleryElem.eq(i).removeClass('next');
        $galleryElem.eq(i).css({
          '-webkit-transition-duration': '',
          '-webkit-transform': ''
        })
      }
    }
  }

  function moveGalleryElem(index,distance,duration) {
    if (index < 0 || index > maxIndex) {
      return
    }

    var
      distanceH = 0,
      distanceV = 0;

    if (isLandscape) {
      distanceH = distance
    } else {
      distanceV = distance
    }

    duration = duration || 0;

    $galleryElem.eq(index).css({
      '-webkit-transition-duration': (duration / 1000).toFixed(1) + 's',
      '-webkit-transform': 'translate3d(-'+ distanceH +'px,-'+ distanceV +'px,0)'
    })
  }

  function swipeStage(event,phase,direction,distance,fingers) {
    if (phase == 'move') {
      if (direction == 'up' || direction == 'left') {
        moveGalleryElem(activeIndex,activePositions[activeIndex] + distance);
        moveGalleryElem(activeIndex + 1,distance / 2)
      } else if (direction == 'down' || direction == 'right') {
        $galleryElem.eq(activeIndex).addClass('next');
        $galleryElem.eq(activeIndex + 1).removeClass('next');
        $galleryElem.eq(activeIndex + 1).css({
          '-webkit-transition-duration': '',
          '-webkit-transform': ''
        });
        moveGalleryElem(activeIndex,activePositions[activeIndex] - distance);
        moveGalleryElem(activeIndex - 1,windowHeight - baseMargin * 2 + visibleHeights[activeIndex - 1] - distance / 2)
      }
    } else if (phase == 'end') {
      if (distance > 70) {
        direction == 'up' || direction == 'left' ? moveGalleryTo('next') : moveGalleryTo('prev');
      } else if (distance > 0) {
        moveGalleryTo()
      } else {
        if (imgOverflows[activeIndex]) {
          $(galleryImg[activeIndex]).toggleClass('img-overflow')
        }
      }
    }
  }

  function tapStage(event,target) {
    console.log(target)
  }

  function bindSwipe(){
    $stage.swipe('destroy');

    $stage.swipe({
      swipeStatus: swipeStage,
      threshold: 0,
      allowPageScroll: 'none',
      triggerOnTouchEnd: true
    });
  }

  setOrientation();
  setGallery();
  moveGalleryTo();

  $window.resize(function(){
    windowWidth = $window.width();
    windowHeight = $window.height();

    setOrientation();
    setGallery();
    moveGalleryTo();
  })

})();
