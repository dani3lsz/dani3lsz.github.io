(function(){

  //
  // elements
  //

  var
    global = this,
    demo = document.getElementById('js-sticker-demo'),
    body = document.getElementById('js-sticker-body'),
    bottom = document.getElementById('js-sticker-bottom'),
    bottomBtn = document.getElementsByClassName('js-sticker-btn'),
    openBottom = document.getElementsByClassName('js-sticker-open-bottom'),
    input = document.getElementsByClassName('js-sticker-input'),
    grid = document.getElementsByClassName('js-sticker-grid');

  if (!demo) {
    return
  }


  //
  // jQuery elements
  //

  var
    $global = $(global),
    $demo = $(demo),
    $body = $(body),
    $bottom = $(bottom),
    $bottomBtn = $(bottomBtn),
    $openBottom = $(openBottom),
    $input = $(input),
    $grid = $(grid),
    $elem;


  //
  // variables
  //

  var
    bodyOpen = false,
    bottomOpen = true,
    bottomBig = false,
    keyboard = true,
    gridSize = 4;

  var imgObj = {
    1: {name: 'Bomb Icon', src: '/images/ClassicMac/Bomb Icon.png'},
    2: {name: 'Cancel Button Icon', src: '/images/ClassicMac/CancelButtonIcon.png'},
    3: {name: 'Coffee Cup Icon', src: '/images/ClassicMac/CoffeeCupIcon.png'},
    4: {name: 'Curson Arrow Icon', src: '/images/ClassicMac/CursonArrowIcon.png'},
    5: {name: 'Dogcow Icon', src: '/images/ClassicMac/DogcowIcon.png'},
    6: {name: 'Eraser Icon', src: '/images/ClassicMac/EraserIcon.png'},
    7: {name: 'Finger Icon', src: '/images/ClassicMac/FingerIcon.png'},
    8: {name: 'Hand Icon', src: '/images/ClassicMac/HandIcon.png'},
    9: {name: 'Happy Mac Icon', src: '/images/ClassicMac/HappyMacIcon.png'},
    10: {name: 'hello Icon', src: '/images/ClassicMac/hello.Icon.png'},
    11: {name: 'Hour Glass Icon', src: '/images/ClassicMac/HourGlassIcon.png'},
    12: {name: 'Knife and Fork Icon', src: '/images/ClassicMac/KnifeandForkIcon.png'},
    13: {name: 'Magnifying Glass Icon', src: '/images/ClassicMac/MagnifyingGlassIcon.png'},
    14: {name: 'Music Note Icon', src: '/images/ClassicMac/MusicNoteIcon.png'},
    15: {name: 'OK Button Icon', src: '/images/ClassicMac/OKButtonIcon.png'},
    16: {name: 'Paint Brush Icon', src: '/images/ClassicMac/PaintBrushIcon.png'},
    17: {name: 'Paint Bucket Icon', src: '/images/ClassicMac/PaintBucketIcon.png'},
    18: {name: 'Pencil Icon', src: '/images/ClassicMac/PencilIcon.png'},
    19: {name: 'Sad Mac Icon', src: '/images/ClassicMac/SadMacIcon.png'},
    20: {name: 'Sound Icon', src: '/images/ClassicMac/SoundIcon.png'},
    21: {name: 'Spray Paint Icon', src: '/images/ClassicMac/SprayPaintIcon.png'},
    22: {name: 'Trash Can Icon', src: '/images/ClassicMac/TrashCanIcon.png'},
    23: {name: 'Warning Icon', src: '/images/ClassicMac/WarningIcon.png'},
    24: {name: 'Watch Icon', src: '/images/ClassicMac/WatchIcon.png'}
  };


  //
  // functions
  //

  function getImages() {
    for (var key in imgObj) {
      var $gridElem = $('<div class="sd__body__stickers__grid__elem js-sticker-elem"><img src="/dani3lsz/messangerDemo'+ imgObj[key].src +'"></div>')
      $grid.append($gridElem);
    }

    $elem = $('.js-sticker-elem');

    $elem.on('click', function () {
      bottomBig = true;
      bottomOpen = false;

      $bottom.addClass('big');
      $bottom.removeClass('open')
    })
  }


  //
  // calls
  //

  $grid.addClass('sd__body__stickers__grid__--'+gridSize);

  getImages();

  $openBottom.on('click', function () {
    if(!bottomOpen) {
      bottomOpen = true;

      $bottom.addClass('open')
    }

    if (bottomBig) {
      bottomBig = false;

      $bottom.removeClass('big')
    }
  });

  $bottomBtn.on('click', function () {
    $(this).toggleClass('active');

    if(!bodyOpen) {
      bodyOpen = true;

      $body.addClass('open')
    }

    if(keyboard) {
      keyboard = false;

      $body.removeClass('keyboard')
    } else {
      keyboard = true;

      $body.addClass('keyboard')
    }
  });

  $input.on('click', function () {
    bottomOpen = false;
    keyboard = true;

    $bottomBtn.removeClass('active');
    $bottom.removeClass('open');
    $body.addClass('open keyboard');
  })

})();
