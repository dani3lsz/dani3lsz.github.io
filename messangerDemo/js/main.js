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
    $elem,
    $messageElem,
    $newMessageElem;


  //
  // variables
  //

  var
    demoWidth,
    demoHeight,
    bodyOpen = false,
    bottomOpen = true,
    bottomBig = false,
    keyboard = true,
    gridSize = 4,
    baseCoord,
    coordStatus = 0,
    messages = [];

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

  var conversation = [
    {text: 'Hey', incoming: true},
    {text: 'Hey, what\'s up?', incoming: false},
    {text: 'Just wanted to ask if you have some nice stickers', incoming: true},
    {text: 'I only have the basics', incoming: true},
    {text: 'Sure, just downloaded a few', incoming: false}
  ];


  //
  // functions
  //

  function getInfo() {
    demoWidth = $demo.width();
    demoHeight = $demo.height();

    var
      status0 = Math.round(demoWidth * 0.01),
      status1 = status0 + Math.round(demoWidth * 0.69),
      status2 = Math.round(demoHeight * 0.063 * 2.29) + status1;

    baseCoord = [status0,status1,status2]
  }

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
      $bottom.removeClass('open');

      coordStatus = 2;
      arrangeMessages();
      updateNewMessageElem();
    })
  }

  function arrangeMessages() {
    var i;

    for (i = messages.length - 1; i >= 0; i--) {
      messages[i].coordY = i == messages.length - 1 ? baseCoord[coordStatus] : (messages[i+1].coordY + messages[i+1].height + 1);

      if (i == messages.length - 1) {
        $messageElem.eq(messages.length - 1 - i).addClass('last')
      } else {
        if (messages[i].incoming != messages[i+1].incoming) {
          messages[i].coordY += 5;

          $messageElem.eq(messages.length - 1 - i).addClass('last')
        } else if ($messageElem.eq(messages.length - 1 - i).hasClass('last')) {
          $messageElem.eq(messages.length - 1 - i).removeClass('last')
        }
      }

      $messageElem.eq(messages.length - 1 - i).css({
        'transform': 'translate3d(0,-'+ (messages[i].coordY + messages[0].height * 1.5) +'px,0)'
      })
    }
  }

  function createNewMessage(text,incoming) {
    var $newMsg = $('<div class="sd__body__elem js-sticker-message">'+ text +'</div>');
    if (incoming) $newMsg.addClass('incoming');

    $body.prepend($newMsg);

    $messageElem = $('.js-sticker-message');
    messages.push({
      type: 1,
      text: $messageElem.eq(0).text(),
      height: $messageElem.eq(0).outerHeight(),
      incoming: $messageElem.eq(0).hasClass('incoming')
    });

    arrangeMessages();
  }

  function runConversation() {
    var i = 0;
    var msgTimeOut = setTimeout(sendMessage,conversation[i].text.length * 100);

    function sendMessage() {
      clearTimeout(msgTimeOut);

      createNewMessage(conversation[i].text, conversation[i].incoming);

      i++;

      if (i < conversation.length) msgTimeOut = setTimeout(sendMessage,conversation[i].text.length * 100);
    }
  }

  function createNewMessageElem() {
    $body.prepend($('<div class="sd__body__elem input js-sticker-new-message" contenteditable="true"></div>'));

    $newMessageElem = $('.js-sticker-new-message');

    $newMessageElem.on('keydown',function (e) {
      if (e.keyCode == 13) {
        e.preventDefault();

        createNewMessage($newMessageElem.text());
        $newMessageElem.empty();
      }
    });

    $newMessageElem.on('keyup',updateNewMessageElem);

    updateNewMessageElem()
  }

  function updateNewMessageElem() {
    var width = $newMessageElem.outerWidth();

    if ($newMessageElem.text() == '') {
      $newMessageElem.empty();
      $input.removeClass('active')
    } else {
      $input.addClass('active')
    }

    $newMessageElem.css({
      'transform': 'translate3d(0,-'+ baseCoord[coordStatus == 2 ? 1 : coordStatus] +'px,0)'
    });

    if (bottomOpen) {
      $newMessageElem.addClass('open')
    } else {
      $newMessageElem.removeClass('open')
    }

    if (bottomBig) {
      $newMessageElem.addClass('big')
    } else {
      $newMessageElem.removeClass('big')
    }
  }




  //
  // calls
  //

  $grid.addClass('sd__body__stickers__grid__--'+gridSize);

  getInfo();
  getImages();
  createNewMessageElem();
  runConversation();

  $openBottom.on('click', function () {
    if(!bottomOpen) {
      bottomOpen = true;

      $bottom.addClass('open')
    }

    if (bottomBig) {
      bottomBig = false;

      $bottom.removeClass('big');

      coordStatus = 1;
      arrangeMessages();
    }

    updateNewMessageElem()
  });

  $bottomBtn.on('click', function () {
    $(this).toggleClass('active');

    if(!bodyOpen) {
      bodyOpen = true;

      $body.addClass('open');

      coordStatus = 1;
      arrangeMessages();
    }

    if(keyboard) {
      keyboard = false;

      $body.removeClass('keyboard')
    } else {
      keyboard = true;

      $body.addClass('keyboard')
    }

    updateNewMessageElem()
  });

  $input.on('click', function () {
    bottomOpen = false;
    keyboard = true;

    $bottomBtn.removeClass('active');
    $bottom.removeClass('open');
    $body.addClass('open keyboard');

    coordStatus = bottomBig ? 2 : 1;
    arrangeMessages();
    updateNewMessageElem();

    $newMessageElem.focus()
  });

  $global.resize(getInfo)

})();
