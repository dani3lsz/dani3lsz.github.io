(function(){


  // variables

  var
    global = this,
    wrapper = document.getElementById('aa'),
    blurElem = document.getElementById('js-blur'),
    blurElemBg = document.createElement('div'),
    thumbSrc = blurElem.getAttribute('data-img'),
    gw, gh, ot, scrolled = 0;


  // jquery objects

  var
    $global = $(global),
    $wrapper = $(wrapper),
    $blurElem = $(blurElem),
    $blurElemBg = $(blurElemBg);



  // functions

  function getInfo() {
    gw = $global.width();
    gh = $global.height();
    ot = $blurElem.offset().top;
  }

  function getThumbnail() {
    var img = new Image();
    img.onload = function() {
      createBgElem();
      canvasBlur(img);
    };
    img.src = thumbSrc;
  }

  function canvasBlur(image) {
    var canvas = document.createElement('canvas');
    canvas.width = image.width * 10;
    canvas.height = image.height * 10;

    var ctx = canvas.getContext('2d');
    ctx.drawImage(image,0,0,canvas.width,canvas.height);

    var dataURL = canvas.toDataURL();

    setBackgroundImg(dataURL);
  }

  function createBgElem() {
    $blurElem.prepend($blurElemBg);

    adjustBgElem();
  }

  function adjustBgElem() {
    $blurElemBg.css({
      'position': 'absolute',
      'z-index': -1,
      'top':   -ot,
      'right': 0,
      'left':  0,
      'height': gh,
      'background-repeat':   'no-repeat',
      'background-position': 'center center',
      'background-size':     'cover',
      'transform': 'translate3d(0,0,0)'
    });
  }

  function setBackgroundImg(dataUrl) {
    $blurElemBg.css({
      'background-image': 'url('+ dataUrl +')'
    });
  }

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


  // init optimized scroll
  throttle('scroll', 'optimizedScroll', wrapper);

  wrapper.addEventListener('optimizedScroll', function() {
    scrolled = $wrapper.scrollTop();

    $blurElemBg.css({
      'transform': 'translate3d(0,'+ scrolled +'px,0)'
    });
  });


  // start init
  getInfo();
  getThumbnail();

  $global.resize(function(){
    getInfo();
    adjustBgElem();
  })

})();
