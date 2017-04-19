/**
 * Created by dani3lsz on 2/14/17.
 */

/*-------------------*\
   #HEADER PARALLAX
\*-------------------*/



(function(){
  //
  // elements
  //

  var
    global = this,
    media = document.getElementById('js-header-parallax');

  if (!media) {
    return
  }

  global.hasHeaderParallax = true;


  //
  // jquery objects
  //

  var
    $global = $(global),
    $media = $(media);


  //
  // variables
  //

  var
    mediaHeight, mediaStart;


  //
  // functions
  //

  // get page info
  function getInfo() {
    mediaHeight = $media.height();
    mediaStart = $media.offset().top;
    mediaStart = mediaStart == 60 ? 0 : mediaStart
  }


  // handle scroll
  global.headerParallaxScrollHandler = function(scrolled) {

    // transform header on scroll
    if ($media.length) {
      if (scrolled <= mediaStart) {
        $media.css({
          '-webkit-transform': 'translate3d(0,0,0)',
                  'transform': 'translate3d(0,0,0)'
        });
      } else if (scrolled > mediaStart && scrolled < mediaHeight + mediaStart) {
        $media.css({
          '-webkit-transform': 'translate3d(0,'+ ((scrolled - mediaStart) / 3) +'px,0)',
                  'transform': 'translate3d(0,'+ ((scrolled - mediaStart) / 3) +'px,0)'
        });
      }
    }
  };


  //
  // calls
  //

  getInfo();
  $global.resize(getInfo);
})();