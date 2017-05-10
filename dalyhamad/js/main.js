/**
 * Created by dani3lsz on 5/10/17.
 */

// carousel
(function () {
  var
    global = this,
    carousel = document.getElementsByClassName('js-carousel');

  if (!carousel.length) return;

  var
    $global = $(global),
    $carousel = $(carousel),
    $elem = $carousel.children();

  var
    activeIndex = 0,
    maxIndex = $elem.length - 1,
    firstTime = 3000,
    time = 7000,
    timeout;

  function startCarousel() {
    timeout = setTimeout(playCarousel,firstTime)
  }

  function playCarousel() {
    $elem.eq(activeIndex).removeClass('active');

    activeIndex++;

    if (activeIndex > maxIndex) {
      activeIndex = 0
    }

    $elem.eq(activeIndex).addClass('active');

    nextCarousel()
  }

  function nextCarousel() {
    clearTimeout(timeout);
    timeout = setTimeout(playCarousel,time)
  }

  $global.load(startCarousel)
})();