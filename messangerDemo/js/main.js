/*---------------*\
   #LOAD IMAGES
\*---------------*/


(function(){
  var global = this;

  // global method to be able to call from anywhere
  global.loadImages = function(images,success,error) {
    if (images.length) {
      for (var i = 0; i < images.length; i++) {
        checkImage(images[i])
      }
    }

    function checkImage(image) {
      var url;

      if (typeof image == 'string') {
        url = image
      } else if (image.tagName == 'IMG') {
        url = image.src;
      } else {
        var bg = $(image).css("background-image");
        url = bg.replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '');
      }

      if (url.indexOf('http://') === -1 && url.indexOf('https://') === -1) {
        return
      }

      var img = new Image();
      img.onload = function() {
        success(image);
      };
      img.onerror = function() {
        error(image);
      };
      img.src = url;
    }
  };
})();





/*------------------*\
   #MESSANGER DEMO
\*------------------*/



(function(){

  //
  // elements
  //

  var
    global = this,
    demo = document.getElementById('js-sticker-demo');

  if (!demo) {
    return
  }


  //
  // jQuery elements
  //

  var
    $global = $(global),
    $demo = $(demo),
    $time= $('#js-sticker-time'),
    $body = $('#js-sticker-body'),
    $bottom = $('#js-sticker-bottom'),
    $bottomBtn = $('.js-sticker-btn'),
    $openBottom = $('.js-sticker-open-bottom'),
    $sendBtn = $('.js-sticker-send'),
    $input = $('.js-sticker-input'),
    $grid = $('.js-sticker-grid'),
    $newMessageElem = $('#js-sticker-new-message'),
    $stickerMessageElem = $('#js-sticker-sticker-message'),
    $stickerElem,
    $messageElem;


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
    previewSticker = -1,
    keyboard = true,
    dragging = false,
    pageX, pageY, dragX, dragY, stickerX, stickerY,
    gridSize = 4,
    baseCoord,
    coordStatus = 0,
    messages = [],
    conversationRunning = true,
    receivingMsg = false,
    inputAnimate,
    stickerElemTimeout = 0,
    activeConversation,
    activeLetter = 0;

  var imgObj = {
    0: {name: 'Bomb Icon', src: '/images/ClassicMac/Bomb Icon.png'},
    1: {name: 'Cancel Button Icon', src: '/images/ClassicMac/CancelButtonIcon.png'},
    2: {name: 'Coffee Cup Icon', src: '/images/ClassicMac/CoffeeCupIcon.png'},
    3: {name: 'Curson Arrow Icon', src: '/images/ClassicMac/CursonArrowIcon.png'},
    4: {name: 'Dogcow Icon', src: '/images/ClassicMac/DogcowIcon.png'},
    5: {name: 'Eraser Icon', src: '/images/ClassicMac/EraserIcon.png'},
    6: {name: 'Finger Icon', src: '/images/ClassicMac/FingerIcon.png'},
    7: {name: 'Hand Icon', src: '/images/ClassicMac/HandIcon.png'},
    8: {name: 'Happy Mac Icon', src: '/images/ClassicMac/HappyMacIcon.png'},
    9: {name: 'hello Icon', src: '/images/ClassicMac/hello.Icon.png'},
    10: {name: 'Hour Glass Icon', src: '/images/ClassicMac/HourGlassIcon.png'},
    11: {name: 'Knife and Fork Icon', src: '/images/ClassicMac/KnifeandForkIcon.png'},
    12: {name: 'Magnifying Glass Icon', src: '/images/ClassicMac/MagnifyingGlassIcon.png'},
    13: {name: 'Music Note Icon', src: '/images/ClassicMac/MusicNoteIcon.png'},
    14: {name: 'OK Button Icon', src: '/images/ClassicMac/OKButtonIcon.png'},
    15: {name: 'Paint Brush Icon', src: '/images/ClassicMac/PaintBrushIcon.png'},
    16: {name: 'Paint Bucket Icon', src: '/images/ClassicMac/PaintBucketIcon.png'},
    17: {name: 'Pencil Icon', src: '/images/ClassicMac/PencilIcon.png'},
    18: {name: 'Sad Mac Icon', src: '/images/ClassicMac/SadMacIcon.png'},
    19: {name: 'Sound Icon', src: '/images/ClassicMac/SoundIcon.png'},
    20: {name: 'Spray Paint Icon', src: '/images/ClassicMac/SprayPaintIcon.png'},
    21: {name: 'Trash Can Icon', src: '/images/ClassicMac/TrashCanIcon.png'},
    22: {name: 'Warning Icon', src: '/images/ClassicMac/WarningIcon.png'},
    23: {name: 'Watch Icon', src: '/images/ClassicMac/WatchIcon.png'}
  };

  var conversation = [
    {type: 'text', text: 'Hey', incoming: true, sent: false},
    {type: 'text', text: 'Hey, what\'s up?', incoming: false, sent: false},
    {type: 'text', text: 'Just wanted to ask if you have some nice stickers', incoming: true, sent: false},
    {type: 'text', text: 'I only have the basics', incoming: true, sent: false},
    {type: 'text', text: 'Sure, just downloaded a few', incoming: false, sent: false},
    {type: 'sticker', sticker: numRand(0,2 * gridSize - 1), incoming: false, sent: false},
    {type: 'text', text: 'Btw', incoming: true, sent: false},
    {type: 'image', image: 'https://wallpapers.wallhaven.cc/wallpapers/thumb/small/th-416958.jpg', incoming: true, sent: false},
    {type: 'text', text: 'Niiiiiice', incoming: false, sent: false},
    {type: 'sticker', sticker: 8, incoming: false, sent: false}
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

    var i;

    $stickerElem = $('.js-sticker-elem');

    $stickerElem.on('mousedown', function (e) {
      pageX = e.pageX;
      pageY = e.pageY;

      i = $stickerElem.index($(this));

      stickerElemTimeout = setTimeout(function () {
        stickerElemHoldStart(i)
      },300)
    }).on('mouseup', function () {
      clearTimeout(stickerElemTimeout);
      stickerElemClick(i);
    });
  }

  function dragSticker(e) {
    stickerX = -1 * (pageX - e.originalEvent.pageX) + dragX;
    stickerY = -1 * (pageY - e.originalEvent.pageY) + dragY;

    $messageElem.eq(0).css({
      'transform': 'translate3d('+ stickerX +'px,'+ stickerY +'px,0)'
    });
  }

  function stickerElemHoldStart(i) {
    var
      $currentElem = $stickerElem.eq(i),
      $elemParent = $currentElem.parent();

    var
      elemHeight = $currentElem.height(),
      elemOffsetLeft = $currentElem.offset().left,
      elemOffsetTop = $currentElem.offset().top,
      parentHeight = $elemParent.outerHeight(),
      parentOffsetLeft = $elemParent.offset().left,
      parentOffsetTop = $elemParent.offset().top,
      parentScrollHeight = $elemParent[0].scrollHeight;

    stickerElemTimeout = 0;
    dragging = true;

    dragX = elemOffsetLeft - parentOffsetLeft;
    dragY = -1 * (parentScrollHeight - (elemOffsetTop - parentOffsetTop) - elemHeight - (parentScrollHeight - parentHeight));

    createNewMessage('peel',stickerSrcBase + imgObj[i].src);
    $currentElem.addClass('peeled');

    $messageElem.eq(0).css({
      'transform': 'translate3d('+ dragX +'px,'+ dragY +'px,0)'
    });

    $messageElem.eq(0).on('drag',dragSticker).on('dragend',function () {
      stickerElemHoldEnd(i)
    });
  }

  function stickerElemHoldEnd(i) {
    dragging = false;

    $stickerElem.eq(i).removeClass('peeled');
    $messageElem.eq(0).removeClass('peel').addClass('peeled');

    messages[messages.length - 1].stickerX = stickerX;
    messages[messages.length - 1].stickerY = stickerY + baseCoord[coordStatus];
  }

  function stickerElemClick(i) {
    bottomBig = true;
    bottomOpen = false;

    $bottom.addClass('big');
    $bottom.removeClass('open');

    previewSticker = i;
    $stickerMessageElem.addClass('open contain');
    $stickerMessageElem.empty();
    $stickerMessageElem.append($('<img src="'+ (stickerSrcBase + imgObj[i].src) +'">'));

    coordStatus = 2;
    arrangeMessages();
    updateNewMessageElem();
    writingMessage();
  }

  function arrangeMessages() {
    var i, previous, mX, mY;


    for (i = messages.length - 1; i >= 0; i--) {
      if (messages[i].type == 'peel') {
        mX = messages[i].stickerX;
        mY = i == messages.length - 1 ? messages[i].stickerY - baseCoord[coordStatus] : messages[i].stickerY - (messages[i+1].coordY + messages[i+1].height + 1);
      } else {
        if (previous) {
          mY = messages[i].coordY = messages[previous].coordY + messages[previous].height + 1;

          if (messages[i].incoming != messages[previous].incoming || messages[i].type != messages[previous].type) {
            mY = messages[i].coordY += 5;

            $messageElem.eq(messages.length - 1 - i).addClass('last')
          } else {
            $messageElem.eq(messages.length - 1 - i).removeClass('last')
          }
        } else {
          mY = messages[i].coordY = baseCoord[coordStatus];
          $messageElem.eq(messages.length - 1 - i).addClass('last')
        }

        mY = -mY - demoHeight * .075;
        mX = 0;
        previous = i;
      }

      $messageElem.eq(messages.length - 1 - i).css({
        'transform': 'translate3d('+ mX +'px,'+ mY +'px,0)'
      })
    }
  }

  function createNewMessage(type,content,incoming) {
    incoming = typeof incoming == 'undefined' ? false : incoming;

    var img = type != 'text' ? '<img src="'+ content +'">' : '';
    var $newMsg = $('<div class="sd__body__elem js-sticker-message">'+ (type == 'text' ? content : img) +'</div>');
    if (incoming) $newMsg.addClass('incoming');
    if (type == 'image') $newMsg.addClass('image');
    if (type == 'sticker') $newMsg.addClass('image sticker--'+gridSize);
    if (type == 'peel') $newMsg.addClass('image peel').css({'width': demoWidth / gridSize + 'px'}).attr('draggable',true);

    $body.prepend($newMsg);

    $messageElem = $('.js-sticker-message');
    messages.push({
      type: type,
      text: type == 'text' ? content : '',
      height: $messageElem.eq(0).outerHeight(),
      incoming: incoming
    });

    if (!dragging) arrangeMessages();
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
    $messageElem.eq(0).removeClass('writing').empty();

    if (conversation[activeConversation].type == 'text') {
      $messageElem.eq(0).text(conversation[activeConversation].text);
    } else if (conversation[activeConversation].type == 'image') {
      $messageElem.eq(0).addClass('image').append($('<img src="'+ conversation[activeConversation].image +'">'))
    } else if (conversation[activeConversation].type == 'sticker') {

    }

    messages[messages.length - 1].height = $messageElem.eq(0).outerHeight();

    arrangeMessages();
  }

  function receiveMsg() {
    receivingMsg = true;

    createNewMessage('text','',true);

    $messageElem.eq(0).append('<div class="sd__body__elem__loader"></div>').addClass('writing');

    if (conversation[activeConversation].type == 'image') {
      loadImages([conversation[activeConversation].image],receiveSuccess,receiveError)
    } else {
      setTimeout(receiveSuccess,conversation[activeConversation].type == 'text' ? conversation[activeConversation].text.length * 100 : 500)
    }

    function receiveSuccess() {receiveEnd()}
    function receiveError() {receiveEnd(true)}

    function receiveEnd(error) {
      if (!receivingMsg) return;
      receivingMsg = false;

      conversation[activeConversation].sent = true;
      error ? deleteLastMsg() : updateLastMsg();
      runConversation()
    }
  }

  function sendMessage() {
    if ($newMessageElem.text() == '') return;

    createNewMessage('text',$newMessageElem.text());
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
        $stickerElem.eq(conversation[activeConversation].sticker).trigger('mousedown').trigger('mouseup');

        setTimeout(function () {
          if (!conversationRunning) return;
          sendSticker();
        },800);
      },800);
    },800);
  }

  function sendSticker(incoming) {
    if (previewSticker < 0) return;

    bottomBig = false;
    $bottom.removeClass('big');
    coordStatus = 1;

    createNewMessage('sticker',stickerSrcBase + imgObj[previewSticker].src,incoming);

    previewSticker = -1;
    $stickerMessageElem.removeClass('open contain').empty();

    if (!conversationRunning) {
      conversationRunning = true;
    } else {
      conversation[activeConversation].sent = true;
    }

    runConversation();
    writingMessage();
  }

  function writingMessage() {
    if ($newMessageElem.text() == '' && previewSticker < 0) {
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

  $stickerMessageElem.on('click', function () {
    bottomBig = false;
    $bottom.removeClass('big');
    coordStatus = 1;

    previewSticker = -1;
    $stickerMessageElem.removeClass('open contain').empty();

    writingMessage();
    arrangeMessages();
  });

  $newMessageElem.on('keydown',function (e) {
    if (e.keyCode == 13) {
      e.preventDefault();
      $sendBtn.trigger('click');
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

    if (previewSticker >= 0) {
      $stickerMessageElem.removeClass('open');
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
    if (previewSticker >= 0 && bottomOpen) {
      $stickerElem.eq(previewSticker).trigger('click');

      if (keyboard) {
        $newMessageElem.focus()
      }

      return
    }

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
     if (previewSticker >= 0) {
       sendSticker()
     }
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
