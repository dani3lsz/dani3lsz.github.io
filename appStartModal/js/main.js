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
    $aap = $('.js-aap-am'),
    $elem = $('.js-aap-elem'),
    $btn = $('.js-aap-btn'),
    $skip = $('.js-aap-skip'),
    $opts = $('.js-aap-opts').children();

  if (!$aap.length || !$elem.length || !$btn.length || !$skip.length) return;


  //
  // Variables
  //

  var
    activeElem = 0;


  //
  // Functions
  //

  $btn.on('click', function () {
    if (activeElem == $elem.length - 1) return;

    $elem.eq(activeElem).addClass('out');

    activeElem = activeElem + 1 < $elem.length ? activeElem + 1 : activeElem;

    $elem.eq(activeElem).addClass('in');

    if (activeElem == $elem.length - 1) {
      $btn.text('start app')
    }
  });

  $opts.on('click', function () {
    var $this = $(this);

    if ($this.hasClass('aai-check-circle')) {
      $this.addClass('aai-check-circle-o').removeClass('aai-check-circle')
    } else {
      $this.addClass('aai-check-circle').removeClass('aai-check-circle-o')
    }
  });


  //
  // Calls
  //

  $global.load(function () {
    $aap.addClass('in');
    $elem.eq(activeElem).addClass('in');
  })

})();