$(window).load(function(){
  $('body').addClass('loaded');
  
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
    maxSize,
    imgSizes = [],
    dataSizes = [],
    visibleSizes = [],
    activePositions = [],
    finalPositions = [],
    imgOverflows = [],
    activeIndex = 0,
    maxIndex = galleryImg.length,
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
    maxSize = isLandscape ? windowWidth - 80 : windowHeight - 80;

    if (isLandscape) {
      activePositions[0] = windowWidth / 2;
      finalPositions[0] = windowWidth * 1.5
    } else {
      activePositions[0] = windowHeight / 2;
      finalPositions[0] = windowHeight * 1.5
    }

    if (galleryImg.length) {
      for (var i = 0; i < galleryImg.length; i++) {
        if (isLandscape) {
          imgSizes[i] = Math.round((windowHeight - 2 * baseMargin) / galleryImg[i].height * galleryImg[i].width);
          dataSizes[i] = 250; // hardcoded b/c of bug = to .landscape .tc-gallery__elem__data width
        } else {
          imgSizes[i] = Math.round((windowWidth - 2 * baseMargin) / galleryImg[i].width * galleryImg[i].height);
          dataSizes[i] = $galleryData.eq(i).outerHeight();
        }

        if (isLandscape) {
          $galleryText.eq(i).addClass('noSwipe');

          $galleryData.eq(i).css({
            'width': dataSizes[i] + 'px',
            'height': ''
          })
        } else if (dataSizes[i] > maxSize / 2) {
          dataSizes[i] = maxSize / 2;

          $galleryText.eq(i).addClass('noSwipe');

          $galleryData.eq(i).css({
            'width': '',
            'height': dataSizes[i] + 'px'
          })
        } else {
          $galleryText.eq(i).removeClass('noSwipe');

          $galleryData.eq(i).css({
            'width': '',
            'height': ''
          })
        }

        if (imgSizes[i] + dataSizes[i] > maxSize) {
          if (imgSizes[i] > maxSize) {
            var x = 0, y = 0, x1 = 0, y1 = 0;

            if (isLandscape) {
              x = -(imgSizes[i] - maxSize) / 2;
              x1 = dataSizes[i]
            } else {
              y = -(imgSizes[i] - maxSize) / 2;
              y1 = dataSizes[i]
            }

            $galleryImg.eq(i).css({
              '-webkit-transform': 'translate3d('+ x +'px,'+ y +'px,0)'
            });

            $galleryData.eq(i).css({
              '-webkit-transform': 'translate3d('+ x1 +'px,'+ y1 +'px,0)'
            });
          } else {
            var x2 = 0, y2 = 0;

            if (isLandscape) {
              x2 = -maxSize + imgSizes[i] + dataSizes[i];
            } else {
              y2 = -maxSize + imgSizes[i] + dataSizes[i];
            }

            $galleryImg.eq(i).css({
              '-webkit-transform': ''
            });

            $galleryData.eq(i).css({
              '-webkit-transform': 'translate3d('+ x2 +'px,'+ y2 +'px,0)'
            });
          }

          $galleryImg.eq(i).addClass('img-overflow');
          imgOverflows[i] = true;
          visibleSizes[i] = maxSize;
        } else {
          $galleryImg.eq(i).removeClass('img-overflow');
          $galleryImg.eq(i).css({
            '-webkit-transform': ''
          });

          $galleryData.eq(i).css({
            '-webkit-transform': ''
          });

          visibleSizes[i] = imgSizes[i] + dataSizes[i];
          imgOverflows[i] = false;
        }

        activePositions[i+1] = isLandscape ? (windowWidth - baseMargin) / 2 + visibleSizes[i] / 2 : (windowHeight - baseMargin) / 2 + visibleSizes[i] / 2;
        finalPositions[i+1] = isLandscape ? windowWidth - baseMargin + visibleSizes[i] : windowHeight - baseMargin + visibleSizes[i];

        if (isLandscape) {
          $galleryImg.eq(i).parent().css({
            'width': visibleSizes[i] + 'px',
            'height': ''
          });
        } else {
          $galleryImg.eq(i).parent().css({
            'width': '',
            'height': visibleSizes[i] + 'px'
          });
        }

      }

      bindSwipe()
    }
  }

  function moveGalleryTo(direction,duration) {
    if (direction == 'next') {
      if (activeIndex != maxIndex) {
        activeIndex++
      }
    } else if (direction == 'prev') {
      if (activeIndex != 0) {
        activeIndex--
      }
    }

    duration = typeof duration !== 'undefined' ? duration : speed;

    for (var i = 0; i <= galleryImg.length; i++) {
      if (i < activeIndex) {
        $galleryElem.eq(i).addClass('prev');
        $galleryElem.eq(i).removeClass('active');
        moveGalleryElem(i,finalPositions[i],duration);
      } else if (i === activeIndex) {
        $galleryElem.eq(i).addClass('active');
        $galleryElem.eq(i).removeClass('next prev');
        moveGalleryElem(i,activePositions[i],duration);
      } else if (i === activeIndex + 1) {
        $galleryElem.eq(i).addClass('next');
        $galleryElem.eq(i).removeClass('active');
        moveGalleryElem(i,0,duration);
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
        moveGalleryElem(activeIndex - 1,finalPositions[activeIndex - 1] - distance / 2)
      }
    } else if (phase == 'end') {
      if (distance > 70) {
        direction == 'up' || direction == 'left' ? moveGalleryTo('next') : moveGalleryTo('prev');
      } else if (distance > 0) {
        moveGalleryTo()
      } else {
        if (imgOverflows[activeIndex-1]) {
          $galleryImg.eq(activeIndex-1).toggleClass('img-overflow')
        }
      }
    }
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
    moveGalleryTo(null,0);
  });
});
