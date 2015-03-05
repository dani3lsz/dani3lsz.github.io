//
//  Handle apps scroller
//





(function(){

  var scroll = $('.js-all-apps');

  if (scroll.length) {
    scroll.each(function(){
      var $this = $(this);

      var prevBtn = $this.parent().find('.js-prev');
      var nextBtn = $this.parent().find('.js-next');
      var width = $this.children().width();
      var scrollPos;

      prevBtn.on('click', function(){
        move(-1)
      });

      nextBtn.on('click', function(){
        move(1)
      });

      function move(i) {
        scrollPos = $this.scrollLeft();

        var newPos = width * Math.round(scrollPos / width) + i * width;

        $this.animate({scrollLeft: newPos}, 200, 'easeOutBack')
      }
    })
  }

})();