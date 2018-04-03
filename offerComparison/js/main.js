/**
 * Created by dani3lsz on 2/4/18.
 */

(function () {
  const $win = $(this);
  const $rows = $('[data-row]');
  const $swipe = $('[data-swipe]');

  const padding = 10;
  const rowsWidth = $rows.width();
  const colCount = $rows.data('row');
  const colWidth = Math.round(rowsWidth / colCount);

  let winWidth = $win.width();
  let activeIdx = 0;
  let swiping = false;
  let startX, moveX;
  let numFit;

  setStyle();
  setClass();

  $win.on('resize', function () {
    winWidth = $win.width();

    setStyle();
    setClass();
  });

  $swipe.on('mousedown', function (event) {
    if (Modernizr && !Modernizr.touchevents && event.originalEvent.which === 1) swipeStart(event)
  });

  $swipe.on('touchstart', function (event) {if (!swiping) swipeStart(event)});
  $swipe.on('mousemove', function (event) {if (swiping) swipeMove(event)});
  $swipe.on('touchmove', function (event) {if (swiping) swipeMove(event)});
  $swipe.on('mouseup', function (event) {if (swiping) swipeEnd(event)});
  $swipe.on('mouseleave', function (event) {if (swiping) swipeEnd(event)});
  $swipe.on('touchend', function (event) {if (swiping) swipeEnd(event)});
  $swipe.on('touchleave', function (event) {if (swiping) swipeEnd(event)});

  function swipeStart(event) {
    swiping = true;

    startX = event.originalEvent.pageX;
  }

  function swipeMove(event) {
    moveX = event.originalEvent.pageX - startX;

    setStyle(moveX)
  }

  function swipeEnd() {
    swiping = false;

    if (Math.abs(moveX) > 20) moveX > 0 ? prevIdx() : nextIdx();
    moveX = 0;

    setStyle(0,300);
    setClass();
  }

  function nextIdx() {
    activeIdx = Math.min(activeIdx + 1,colCount - numFit);
  }

  function prevIdx() {
    activeIdx = Math.max(activeIdx - 1,0);
  }

  function setStyle(mod = 0,transitionTime = 0) {
    numFit = winWidth < rowsWidth ? Math.floor(winWidth / (colWidth + padding * 2)) : colCount;
    const x = numFit === colCount ? 0 : (winWidth - colWidth * numFit) / 2 - activeIdx * colWidth + mod;

    $rows.css({
      'transform': 'translate3d('+ x +'px,0,0)',
      'transition': 'transform '+ transitionTime +'ms ease-out'
    })
  }

  function setClass() {
    for (let i = 0; i < $rows.length; i++) {
      const $row = $rows.eq(i);
      const $columns = $row.children();

      for (let j = 0; j < $columns.length; j++) {
        const $column = $columns.eq(j);

        if (j < activeIdx || j >= activeIdx + numFit) {
          $column.addClass('aa_opacity--05')
        } else {
          $column.removeClass('aa_opacity--05')
        }
      }
    }
  }
})();