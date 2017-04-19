/**
 * Created by dani3lsz on 2/14/17.
 */

/*
 * MAIN FUNCTIONS
 *
 *  1) GLOBAL SCROLL...........................Handle global scroll events
 *
 */





/*-----------------*\
   #GLOBAL SCROLL
\*-----------------*/


(function(){

  //
  // elements
  //

  var
    global = this;


  //
  // jquery elements
  //

  var
    $global = $(global);


  //
  // variable
  //

  var
    scrolledV = 0;


  //
  // functions
  //

  // create resource optimized scroll event
  var throttle = function(type, name, obj) {
    var global = obj || window;
    var running = false;
    var func = function() {
      if (running) { return; }
      running = true;
      requestAnimationFrame(function() {
        global.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    global.addEventListener(type, func);
  };

  global.pageHasScrolled = function () {
    scrolledV = $global.scrollTop();

    if (typeof hasHeaderParallax !== 'undefined') headerParallaxScrollHandler(scrolledV);
  };


  //
  // calls
  //

  // init optimized scroll for global
  throttle('scroll', 'globalScroll', global);

  global.addEventListener('globalScroll', pageHasScrolled);
})();
