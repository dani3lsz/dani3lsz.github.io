//
//  Handle apps scroller
//





(function(){

  var scroll = $('.js-all-apps');

  if (scroll.length) {
    var prevBtn = scroll.parent().find('.js-prev');
    var nextBtn = scroll.parent().find('.js-next');
    var width = scroll.children().width();
    var scrollPos;

    prevBtn.on('click', function(){
      move(-1)
    });

    nextBtn.on('click', function(){
      move(1)
    });

    function move(i) {
      scrollPos = scroll.scrollLeft();

      var newPos = width * Math.round(scrollPos / width) + i * width;

      scroll.animate({scrollLeft: newPos}, 200, 'easeOutBack')
    }
  }

})();