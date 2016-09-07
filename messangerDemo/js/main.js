(function(){

  //
  // elements
  //

  var
    global = this,
    demo = document.getElementById('js-sticker-demo'),
    time = document.getElementById('js-sticker-time'),
    body = document.getElementById('js-sticker-body'),
    bottom = document.getElementById('js-sticker-bottom'),
    bottomBtn = document.getElementsByClassName('js-sticker-btn'),
    openBottom = document.getElementsByClassName('js-sticker-open-bottom'),
    sendBtn = document.getElementsByClassName('js-sticker-send'),
    input = document.getElementsByClassName('js-sticker-input'),
    grid = document.getElementsByClassName('js-sticker-grid'),
    newMessageElem = document.getElementById('js-sticker-new-message');

  if (!demo) {
    return
  }


  //
  // jQuery elements
  //

  var
    $global = $(global),
    $demo = $(demo),
    $time= $(time),
    $body = $(body),
    $bottom = $(bottom),
    $bottomBtn = $(bottomBtn),
    $openBottom = $(openBottom),
    $sendBtn = $(sendBtn),
    $input = $(input),
    $grid = $(grid),
    $stickerElem,
    $messageElem,
    $newMessageElem = $(newMessageElem);


  //
  // variables
  //

  var
    stickerSrcBase = window.location.hostname == 'localhost' ? '/dani3lsz/messangerDemo' : '/messangerDemo',
    demoWidth,
    demoHeight,
    bodyOpen = false,
    bottomOpen = true,
    bottomBig = false,
    keyboard = true,
    gridSize = 4,
    baseCoord,
    coordStatus = 0,
    messages = [],
    conversationRunning = true,
    receivingMsg = false,
    inputAnimate,
    activeConversation,
    activeLetter = 0;

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
    {type: 'text', text: 'Hey', incoming: true, sent: false},
    {type: 'text', text: 'Hey, what\'s up?', incoming: false, sent: false},
    {type: 'text', text: 'Just wanted to ask if you have some nice stickers', incoming: true, sent: false},
    {type: 'text', text: 'I only have the basics', incoming: true, sent: false},
    {type: 'text', text: 'Sure, just downloaded a few', incoming: false, sent: false},
    {type: 'sticker', sticker: stickerSrcBase + imgObj[numRand(1,2 * gridSize)].src, incoming: false, sent: false}
  ];


  //
  // functions
  //

  function numRand(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  function getInfo() {
    demoWidth = $demo.width();
    demoHeight = $demo.height();

    var
      status0 = Math.round(demoWidth * 0.01),
      status1 = status0 + Math.round(demoWidth * 0.69),
      status2 = Math.round(demoHeight * 0.063 * 2.29) + status1;

    baseCoord = [status0,status1,status2];

    updateNewMessageElem();

    if ($messageElem && $messageElem.length) {
      for (var i = 0; i < $messageElem.length - 1; i++) {
        messages[$messageElem.length - 1 - i].height = $messageElem.eq(i).outerHeight()
      }

      arrangeMessages()
    }
  }

  function getImages() {
    for (var key in imgObj) {
      var $gridElem = $('<div class="sd__body__stickers__grid__elem js-sticker-elem"><img src="'+ (stickerSrcBase + imgObj[key].src) +'"></div>')
      $grid.append($gridElem);
    }

    $stickerElem = $('.js-sticker-elem');

    $stickerElem.on('click', function () {
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
        if (messages[i].incoming != messages[i+1].incoming || messages[i].type != messages[i+1].type) {
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

  function createNewMessage(text,incoming,stickerSrc) {
    incoming = typeof incoming == 'undefined' ? false : incoming;

    var sticker = stickerSrc ? '<img src="'+ stickerSrc +'">' : '';
    var $newMsg = $('<div class="sd__body__elem js-sticker-message">'+ (text + sticker) +'</div>');
    if (incoming) $newMsg.addClass('incoming');
    if (stickerSrc) $newMsg.addClass('sticker sticker--'+gridSize);

    $body.prepend($newMsg);

    $messageElem = $('.js-sticker-message');
    messages.push({
      type: stickerSrc ? 2 : 1,
      text: text,
      height: $messageElem.eq(0).outerHeight(),
      incoming: incoming
    });

    arrangeMessages();
  }

  function animateInput() {
    clearTimeout(inputAnimate);

    var currentString = conversation[activeConversation].text.substring(0,activeLetter + 1);

    $newMessageElem.text(currentString);

    if (activeLetter > conversation[activeConversation].text.length - 1) {
      activeLetter = 0;
      sendMessage();
      conversation[activeConversation].sent = true;
      runConversation()
    } else if (conversationRunning) {
      activeLetter++;
      var speed = numRand(50,200);
      inputAnimate = setTimeout(animateInput,speed)
    } else {
      activeLetter = 0
    }

    writingMessage()
  }

  function runConversation() {
    if (!conversationRunning) return;

    for (var i = 0; i < conversation.length; i++) {
      if (!conversation[i].sent) {
        if (conversation[i].incoming) {
          activeConversation = i;
          setTimeout(receiveMsg,500)
        } else {
          activeConversation = i;
          setTimeout(createMessage,500)
        }
        break
      } else if (i == conversation.length - 1) {
        conversationRunning = false;
      }
    }
  }

  function createMessage() {
    if (conversation[activeConversation].type == 'text') {
      $input.trigger('click');
      inputAnimate = setTimeout(animateInput,500)
    } else if (conversation[activeConversation].type == 'sticker') {
      startStickerSend();
    }
  }

  function deleteLastMsg() {
    $messageElem.eq(0).remove();
    $messageElem = $('.js-sticker-message');
    messages.splice(-1,1);

    arrangeMessages()
  }

  function updateLastMsg() {
    $messageElem.eq(0).removeClass('writing');
    $messageElem.eq(0).empty();
    $messageElem.eq(0).text(conversation[activeConversation].text);

    messages[messages.length - 1].height = $messageElem.eq(0).outerHeight();

    arrangeMessages();
  }

  function receiveMsg() {
    receivingMsg = true;

    createNewMessage('',true);

    $messageElem.eq(0).append('<div class="sd__body__elem__loader"></div>');
    $messageElem.eq(0).addClass('writing');

    setTimeout(function () {
      if (!receivingMsg) return;
      receivingMsg = false;

      conversation[activeConversation].sent = true;
      updateLastMsg();
      runConversation()
    },conversation[activeConversation].text.length * 100)
  }

  function sendMessage() {
    if ($newMessageElem.text() == '') return;

    createNewMessage($newMessageElem.text());
    $newMessageElem.empty();

    if (!conversationRunning) {
      conversationRunning = true;
      runConversation();
    }
  }

  function startStickerSend() {
    $openBottom.trigger('click');

    setTimeout(function () {
      if (!conversationRunning) return;
      if (keyboard) {
        $bottomBtn.eq(0).trigger('click');
      }

      setTimeout(function () {
        if (!conversationRunning) return;
        $stickerElem.eq(0).trigger('click');

        setTimeout(function () {
          if (!conversationRunning) return;
          sendSticker(conversation[activeConversation].sticker,conversation[activeConversation].incoming);
        },800);
      },800);
    },800);
  }

  function sendSticker(sticker,incoming) {
    if (!sticker) return;

    bottomBig = false;
    $bottom.removeClass('big');
    coordStatus = 1;

    createNewMessage('',incoming,sticker);

    if (!conversationRunning) {
      conversationRunning = true;
    } else {
      conversation[activeConversation].sent = true;
    }

    runConversation()
  }

  function writingMessage() {
    if ($newMessageElem.text() == '') {
      $newMessageElem.empty();
      $input.removeClass('active');

      if (!conversationRunning) {
        conversationRunning = true;
        runConversation();
      }
    } else {
      $input.addClass('active')
    }
  }

  function updateNewMessageElem() {
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

  // Insert actual time
  function updateClock() {
    var currentTime = new Date();
    var currentHours = currentTime.getHours();
    var currentMinutes = currentTime.getMinutes();

    // Pad the minutes and seconds with leading zeros, if required
    currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;

    // Compose the string for display
    var currentTimeString = currentHours + ":" + currentMinutes;

    $time.html(currentTimeString);
  }




  //
  // calls
  //

  $newMessageElem.on('keydown',function (e) {
    if (e.keyCode == 13) {
      e.preventDefault();
      sendMessage()
    }
  });

  $newMessageElem.on('keyup',function (e) {
    if (e.keyCode != 13) {
      conversationRunning = false;

      if (receivingMsg) {
        receivingMsg = false;

        deleteLastMsg()
      }
    }

    writingMessage()
  });

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

  $sendBtn.on('click',function () {
    sendMessage();
    writingMessage();
  });

  $grid.addClass('sd__body__stickers__grid__--'+gridSize);

  getInfo();
  getImages();
  updateNewMessageElem();
  runConversation();
  setInterval(updateClock, 1000); // update clock

  $global.resize(getInfo)
})();
