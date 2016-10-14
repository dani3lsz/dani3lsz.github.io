/**
 * Created by dani3lsz on 10/14/16.
 */



(function () {

  //
  // Elements
  //

  var global = this;


  //
  // jQuery elements
  //

  var
    $global = $(global),
    $stage = $('.js-app-start'),
    $elem = $stage.children();

  if (!$stage.length || !$elem.length) return;


  //
  // Variables
  //

  var
    stageWidth, stageHeight, offsetT, offsetB,
    elemInfo = [],
    activeElem = 0,
    minDistance = 30,
    dragging = false;

  //
  // Functions
  //

  function getInfo() {
    stageWidth = $stage.width();
    stageHeight = $stage.height();
    offsetT = stageHeight * .4;
    offsetB = stageHeight * .6 - 10;

    for (var i = 0; i < $elem.length; i++) {
      if (typeof elemInfo[i] == 'undefined') {
        elemInfo[i] = {}
      }

      elemInfo[i].width = $elem.eq(i).outerWidth();
      elemInfo[i].height = $elem.eq(i).outerHeight()
    }

    elemSetUp()
  }

  function elemSetUp() {
    var n = 0;

    for (var i = 0; i < $elem.length; i++) {
      if (typeof elemInfo[i].state == 'undefined') elemInfo[i].state = 0;

      if (i == activeElem) {
        elemInfo[i].state = 2;
        $elem.eq(i).removeClass('yes no prepare').addClass('active').removeAttr('style')
      } else if (i != activeElem && elemInfo[i].state <= 2) {
        if (n < 2) {
          elemInfo[i].state = 1;
          $elem.eq(i).removeClass('active').addClass('prepare').removeAttr('style')
        } else {
          $elem.eq(i).removeClass('active prepare')
        }

        n++
      }
    }

    calculatePos()
  }

  function raiseActive() {
    if (activeElem + 1 >= $elem.length ) {
      endOfSelection();
    } else {
      for (var i = 0; i < $elem.length; i++) {
        if (elemInfo[i].state < 2) {
          activeElem = i;
          break
        } else if (i == $elem.length - 1) {
          endOfSelection();
        }
      }
    }

    elemSetUp();
  }

  function calculatePos() {
    var
      i, j, k,
      yesNum = [], yesLine = [{ids:[]}],
      noNum = [], noLine = [{ids:[]}];

    for (i = 0; i < $elem.length; i++) {
      if (elemInfo[i].state == 3) {
        yesNum.push(i);
      } else if (elemInfo[i].state == 4) {
        noNum.push(i);
      }
    }

    if (!yesNum.length && !noNum.length) return;

    for (j = 0; j < 2; j++) {
      var totalW = 0, l = 0;

      for (i = 0; i < (j ? yesNum.length : noNum.length); i++) {
        if (totalW + elemInfo[j ? yesNum[i] : noNum[i]].width * .4 + 5 > stageWidth - 20) {
          l++;
          totalW = 0;

          j ? yesLine[l] = {ids:[]} : noLine[l] = {ids:[]};
        }

        j ? yesLine[l].ids.push(yesNum[i]) : noLine[l].ids.push(noNum[i]);
        totalW += elemInfo[j ? yesNum[i] : noNum[i]].width * .4 + 5;
        j ? yesLine[l].w = totalW : noLine[l].w = totalW
      }
    }

    for (j = 0; j < 2; j++) {
      for (i = 0; i < (j ? yesLine.length : noLine.length); i++) {
        var p = 0;

        for (k = 0; k < (j ? yesLine[i].ids.length : noLine[i].ids.length); k++) {
          var id = j ? yesLine[i].ids[k] : noLine[i].ids[k];

          elemInfo[id].x = -((j ? yesLine[i].w : noLine[i].w) / 2) - elemInfo[id].width / 2 * .6 + p;
          elemInfo[id].y = (j ? -offsetT : offsetB) - elemInfo[id].height * .4 + (j ? i : -i) * (elemInfo[id].height * .4 + 10);

          p += elemInfo[id].width * .4 + 10
        }
      }
    }

    for (i = 0; i < $elem.length; i++) {
      if (elemInfo[i].state == 3 || elemInfo[i].state == 4) {
        moveElem(i,elemInfo[i].x,elemInfo[i].y,.4,300);
      }
    }
  }

  function moveElem(i,x,y,s,t) {
    s = s || 1;
    t = t || 0;

    $elem.eq(i).css({
      'transition-duration': t + 'ms',
      'transform': 'translate3d('+ x +'px,'+ y +'px,0) scale('+ s +')'
    })
  }

  function elemGo(yes) {
    elemInfo[activeElem].state = yes ? 3 : 4;

    $elem.eq(activeElem).removeClass('active').addClass(yes ? 'yes' : 'no');
  }

  function swipeStatus(event,phase,direction,distance) {
    if (activeElem > -1) {
      if (phase == 'start') {
        elemInfo[activeElem].x = -elemInfo[activeElem].width / 2;
        elemInfo[activeElem].y = -elemInfo[activeElem].height / 2;

        moveElem(activeElem,elemInfo[activeElem].x,elemInfo[activeElem].y);
      } else if (phase == 'move' && (direction == 'left' || direction == 'right')) {
        dragging = true;

        moveElem(activeElem,elemInfo[activeElem].x + (direction == 'left' ? -distance : distance),elemInfo[activeElem].y);
      } else if (phase == 'end') {
        if (distance > minDistance) {
          direction == 'left' ? elemGo(false) : elemGo(true);
          raiseActive()
        } else if (distance == 0 && (event.offsetY || event.layerY) > stageHeight * .25 && (event.offsetY || event.layerY) < stageHeight * .6) {
          if ((event.offsetX || event.layerX) < 50) {
            elemGo(false);
            raiseActive()
          } else if ((event.offsetX || event.layerX) > stageWidth - 50) {
            elemGo(true);
            raiseActive()
          }
        } else {
          moveElem(activeElem,elemInfo[activeElem].x,elemInfo[activeElem].y,1,300);
        }

        setTimeout(function () {
          dragging = false;
        },300)
      }
    }
  }

  function endOfSelection() {
    activeElem = -1;

    $stage.addClass('end')
  }


  //
  // Calls
  //

  //Init touch swipe
  $stage.swipe({
    swipeStatus: swipeStatus,
    threshold: 0,
    triggerOnTouchLeave: true,
    allowPageScroll: "none"
  });

  $elem.on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    
    if (dragging) return;

    var $this = $(this);
    var i = $elem.index($this);
    if (elemInfo[i].state > 2) {
      activeElem = i;

      $stage.removeClass('end');
      elemSetUp()
    }
  });

  $global.load(getInfo);
  $global.resize(getInfo)

})();