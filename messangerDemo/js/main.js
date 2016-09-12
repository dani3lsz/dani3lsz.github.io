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
    $body = $('body'),
    $demo = $(demo),
    $time= $('#js-sticker-time'),
    $demoBody = $('#js-sticker-body'),
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
    canDropSticker = false,
    dragOverIndex = -1,
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

  var imgObj = [
    {name: 'Bomb Icon', src: '/images/ClassicMac/Bomb Icon.png'},
    {name: 'Cancel Button Icon', src: '/images/ClassicMac/CancelButtonIcon.png'},
    {name: 'Coffee Cup Icon', src: '/images/ClassicMac/CoffeeCupIcon.png'},
    {name: 'Curson Arrow Icon', src: '/images/ClassicMac/CursonArrowIcon.png'},
    {name: 'Dogcow Icon', src: '/images/ClassicMac/DogcowIcon.png'},
    {name: 'Eraser Icon', src: '/images/ClassicMac/EraserIcon.png'},
    {name: 'Finger Icon', src: '/images/ClassicMac/FingerIcon.png'},
    {name: 'Hand Icon', src: '/images/ClassicMac/HandIcon.png'},
    {name: 'Happy Mac Icon', src: '/images/ClassicMac/HappyMacIcon.png'},
    {name: 'hello Icon', src: '/images/ClassicMac/hello.Icon.png'},
    {name: 'Hour Glass Icon', src: '/images/ClassicMac/HourGlassIcon.png'},
    {name: 'Knife and Fork Icon', src: '/images/ClassicMac/KnifeandForkIcon.png'},
    {name: 'Magnifying Glass Icon', src: '/images/ClassicMac/MagnifyingGlassIcon.png'},
    {name: 'Music Note Icon', src: '/images/ClassicMac/MusicNoteIcon.png'},
    {name: 'OK Button Icon', src: '/images/ClassicMac/OKButtonIcon.png'},
    {name: 'Paint Brush Icon', src: '/images/ClassicMac/PaintBrushIcon.png'},
    {name: 'Paint Bucket Icon', src: '/images/ClassicMac/PaintBucketIcon.png'},
    {name: 'Pencil Icon', src: '/images/ClassicMac/PencilIcon.png'},
    {name: 'Sad Mac Icon', src: '/images/ClassicMac/SadMacIcon.png'},
    {name: 'Sound Icon', src: '/images/ClassicMac/SoundIcon.png'},
    {name: 'Spray Paint Icon', src: '/images/ClassicMac/SprayPaintIcon.png'},
    {name: 'Trash Can Icon', src: '/images/ClassicMac/TrashCanIcon.png'},
    {name: 'Warning Icon', src: '/images/ClassicMac/WarningIcon.png'},
    {name: 'Watch Icon', src: '/images/ClassicMac/WatchIcon.png'}
  ];

  var imgObj2 = [
    {name: '', src: '/images/hand/HA01_RGBA.png'},
    {name: '', src: '/images/hand/HA02_RGBA.png'},
    {name: '', src: '/images/hand/HA03_RGBA.png'},
    {name: '', src: '/images/hand/HA04_RGBA.png'},
    {name: '', src: '/images/hand/HA05_RGBA.png'},
    {name: '', src: '/images/hand/HA06_RGBA.png'},
    {name: '', src: '/images/hand/HA07_RGBA.png'},
    {name: '', src: '/images/hand/HA08_RGBA.png'},
    {name: '', src: '/images/hand/HA09_RGBA.png'},
    {name: '', src: '/images/hand/HA10_RGBA.png'},
    {name: '', src: '/images/hand/HA11_RGBA.png'},
    {name: '', src: '/images/hand/HA12_RGBA.png'},
    {name: '', src: '/images/hand/HA13_RGBA.png'},
    {name: '', src: '/images/hand/HA14_RGBA.png'},
    {name: '', src: '/images/hand/HA15_RGBA.png'},
    {name: '', src: '/images/hand/HA16_RGBA.png'},
    {name: '', src: '/images/hand/HA17_RGBA.png'},
    {name: '', src: '/images/hand/HA18_RGBA.png'},
    {name: '', src: '/images/hand/HA19_RGBA.png'}
  ];

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
    {type: 'peel', sticker: numRand(0,2 * gridSize - 1), incoming: false, sent: false, target: {i: 7, x: 'right', y: 'bottom'}}
  ];

  var answers = ['You OK?','What are you talking abaout man?','I don\'t understand','Yeah','LOL'];


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

    if (messages) {
      for (var i = messages.length - 1; i >= 0; i--) {
        messages[i].width = $messageElem.eq(i).outerWidth();
        messages[i].height = $messageElem.eq(i).outerHeight();

        if (messages[i].type == 'sticker' || messages[i].type == 'peel') {
          $messageElem.eq(i).css({'width': demoWidth / gridSize + 'px'})
        }
      }

      arrangeMessages()
    }
  }

  function getImages() {
    for (var j = 0; j < (imgObj.length && gridSize * 4); j++) {
      var $gridElem = $('<div class="sd__body__stickers__grid__elem js-sticker-elem"><img src="'+ (stickerSrcBase + imgObj[j].src) +'" draggable="false"></div>');
      $grid.append($gridElem);
    }

    var i;

    $stickerElem = $('.js-sticker-elem');

    $stickerElem.on('mousedown touchstart', function (e) {
      if (e.type == 'touchstart') e.preventDefault();

      pageX = e.type == 'touchstart' ? e.originalEvent.pageX : e.pageX;
      pageY = e.type == 'touchstart' ? e.originalEvent.pageY : e.pageY;

      i = $stickerElem.index($(this));

      stickerElemTimeout = setTimeout(function () {
        clearTimeout(stickerElemTimeout);
        stickerElemTimeout = 0;
        stickerElemHoldStart(i)
      },300)
    }).on('touchmove', dragSticker).on('mouseup touchend', function (e) {
      if (stickerElemTimeout) {
        clearTimeout(stickerElemTimeout);
        stickerElemTimeout = 0;

        stickerElemClick(i);
      } else {
        $messageElem.last().trigger('mouseup')
      }
    });
  }

  function dragSticker(x,y) {
    if (typeof x == 'number') {
      $messageElem.last().addClass('move')
    }

    y = typeof y == 'number' ? y : pageY - x.originalEvent.pageY;
    x = typeof x == 'number' ? x : pageX - x.originalEvent.pageX;

    stickerX = -x + dragX;
    stickerY = -y + dragY;

    if (stickerX < 0) {
      stickerX = 0
    } else if (stickerX > demoWidth - messages[messages.length - 1].width) {
      stickerX = demoWidth - messages[messages.length - 1].width
    }

    var l, r, t, b,
      stickerTop = -stickerY + messages[messages.length - 1].height,
      stickerRight = stickerX + messages[messages.length - 1].width;

    $messageElem.last().css({
      'transform': 'translate3d('+ stickerX +'px,'+ stickerY +'px,0)'
    });

    for (var i = messages.length - 1; i >= 0; i--) {
      l = Math.round(messages[i].incoming ? demoWidth * 0.0425 : demoWidth * 0.9575 - messages[i].width);
      r = l + messages[i].width;
      b = messages[i].coordY + demoHeight * .075;
      t = b + messages[i].height;

      canDropSticker = stickerX < r && stickerRight > l && stickerTop > b && -stickerY < t;

      if (canDropSticker) {
        dragOverIndex = i;
        break
      }
    }

    $messageElem.removeClass('drop-target');

    if (canDropSticker) {
      $messageElem.eq(dragOverIndex).addClass('drop-target')
    } else if (dragOverIndex > -1) {
      dragOverIndex = -1;
    }
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

    $messageElem.last().css({
      'transform': 'translate3d('+ dragX +'px,'+ dragY +'px,0)'
    });

    $messageElem.last().on('drag',dragSticker).on('mouseup dragend',function () {
      stickerElemHoldEnd(i);

      $(this).off('mouseup dragend')
    });
  }

  function stickerElemHoldEnd(i) {
    dragging = false;

    if (canDropSticker) {
      $messageElem.last().removeClass('peel').addClass('peeled');

      messages[messages.length - 1].stickerX = stickerX;
      messages[messages.length - 1].stickerY = stickerY + baseCoord[coordStatus];
    } else {
      dragOverIndex = -1;

      deleteLastMsg();
    }

    $messageElem.removeClass('drop-target');
    $stickerElem.eq(i).removeClass('peeled');
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
        mY = !previous ? messages[i].stickerY - baseCoord[coordStatus] : messages[i].stickerY - (messages[previous].coordY + messages[previous].height + 1);
      } else {
        if (previous) {
          mY = messages[i].coordY = messages[previous].coordY + messages[previous].height + 1;

          if (messages[i].incoming != messages[previous].incoming || messages[i].type != messages[previous].type) {
            mY = messages[i].coordY += 5;

            $messageElem.eq(i).addClass('last')
          } else {
            $messageElem.eq(i).removeClass('last')
          }
        } else {
          mY = messages[i].coordY = baseCoord[coordStatus];
          $messageElem.eq(i).addClass('last')
        }

        mY = -mY - demoHeight * .075;
        mX = 0;
        previous = i;
      }

      $messageElem.eq(i).css({
        'transform': 'translate3d('+ mX +'px,'+ mY +'px,0)'
      })
    }
  }

  function createNewMessage(type,content,incoming) {
    incoming = typeof incoming == 'undefined' ? false : incoming;

    var img = type != 'text' ? '<img src="'+ content +'" draggable="false">' : '';
    var $newMsg = $('<div class="sd__body__elem js-sticker-message">'+ (type == 'text' ? content : img) +'</div>');
    if (incoming) $newMsg.addClass('incoming');
    if (type == 'image') $newMsg.addClass('image');
    if (type == 'sticker') $newMsg.addClass('image').css({'width': demoWidth / gridSize + 'px'});
    if (type == 'peel') $newMsg.addClass('image peel').css({'width': demoWidth / gridSize + 'px'}).attr('draggable',true);

    $demoBody.append($newMsg);

    $messageElem = $('.js-sticker-message');
    messages.push({
      type: type,
      text: type == 'text' ? content : '',
      width: $messageElem.last().outerWidth(),
      height: $messageElem.last().outerHeight(),
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
      $sendBtn.trigger('click');
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
        activeConversation = i;
        if (conversation[i].incoming) {
          setTimeout(receiveMsg,500)
        } else {
          setTimeout(createMessage,500)
        }
        break
      } else if (i == conversation.length - 1) {
        conversationRunning = false;
      }
    }
  }

  function addRandomAnswer() {
    if (numRand(0,1)) return;

    conversation.push({type: 'text', text: answers[numRand(0,answers.length - 1)], incoming: true, sent: false})
  }

  function shiftConversationTarget() {
    for (var i = activeConversation; i < conversation.length; i++) {
      if (conversation[i].type == 'peel' && conversation[i].target.i > activeConversation) {
        conversation[i].target.i++
      }
    }
  }

  function createMessage() {
    if (conversation[activeConversation].type == 'text') {
      $input.trigger('click');
      inputAnimate = setTimeout(animateInput,500)
    } else if (conversation[activeConversation].type == 'sticker') {
      startStickerSend();
    } else if (conversation[activeConversation].type == 'peel') {
      animatePeel();
    }
  }

  function deleteLastMsg() {
    $messageElem.last().remove();
    $messageElem = $('.js-sticker-message');
    messages.splice(-1,1);

    arrangeMessages()
  }

  function updateLastMsg() {
    $messageElem.last().removeClass('writing').empty();

    if (conversation[activeConversation].type == 'text') {
      $messageElem.last().text(conversation[activeConversation].text);
    } else if (conversation[activeConversation].type == 'image') {
      $messageElem.last().addClass('image').append($('<img src="'+ conversation[activeConversation].image +'">'))
    } else if (conversation[activeConversation].type == 'sticker') {

    }

    messages[messages.length - 1].type = conversation[activeConversation].type;
    messages[messages.length - 1].text = conversation[activeConversation].type == 'text' ? conversation[activeConversation].text : '';
    messages[messages.length - 1].width = $messageElem.last().outerWidth();
    messages[messages.length - 1].height = $messageElem.last().outerHeight();

    arrangeMessages();
  }

  function receiveMsg() {
    receivingMsg = true;

    createNewMessage('text','',true);

    $messageElem.last().append('<div class="sd__body__elem__loader"></div>').addClass('writing');

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

      if (!conversationRunning) {
        conversationRunning = true;
      } else {
        conversation[activeConversation].sent = true;
      }

      error ? deleteLastMsg() : updateLastMsg();
      runConversation();
    }
  }

  function sendMessage() {
    if ($newMessageElem.text() == '') return;

    createNewMessage('text',$newMessageElem.text());
    $newMessageElem.empty();

    if (!conversationRunning) {
      conversationRunning = true;

      if (activeConversation < conversation.length - 1) {
        shiftConversationTarget()
      } else {
        addRandomAnswer()
      }
    } else {
      conversation[activeConversation].sent = true;
    }

    runConversation();
  }

  function animatePeel() {
    $openBottom.trigger('click');

    setTimeout(function () {
      if (!conversationRunning) return;
      if (keyboard) {
        $bottomBtn.eq(0).trigger('click');
      }

      setTimeout(function () {
        if (!conversationRunning) return;
        $stickerElem.eq(conversation[activeConversation].sticker).trigger('mousedown');

        setTimeout(function () {
          if (!conversationRunning) return;

          var l, r, b, t, sL, sB;

          var i = conversation[activeConversation].target.i;

          l = Math.round(messages[i].incoming ? demoWidth * 0.0425 : demoWidth * 0.9575 - messages[i].width);
          r = l + messages[i].width;
          b = messages[i].coordY + demoHeight * .075;
          t = b + messages[i].height;

          if (conversation[activeConversation].target.x == 'left') {
            sL = l
          } else if (conversation[activeConversation].target.x == 'center') {
            sL = (r - messages[messages.length - 1].width - l) / 2 + l
          } else if (conversation[activeConversation].target.x == 'right') {
            sL = r - messages[messages.length - 1].width
          }

          if (conversation[activeConversation].target.y == 'top') {
            sB = t - messages[messages.length - 1].height
          } else if (conversation[activeConversation].target.y == 'center') {
            sB = (t - messages[messages.length - 1].width - b) / 2 + b
          } else if (conversation[activeConversation].target.y == 'bottom') {
            sB = b
          }

          dragSticker(dragX-sL,sB+dragY);

          setTimeout(function () {
            $messageElem.last().trigger('mouseup');

            if (!conversationRunning) {
              conversationRunning = true;
            } else {
              conversation[activeConversation].sent = true;
            }

            runConversation();
          },1100)
        },800);
      },800);
    },800);
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
          $sendBtn.trigger('click');
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

  $demo.on('click mousedown', function (e) {
    if (!conversationRunning) return;

    var
      $target = $(e.target),
      $indicate = $('<div id="js-indicate-click" class="click-indicate"></div>');

    $body.append($indicate);

    $indicate.css({
      'top': $target.offset().top + $target.outerHeight() / 2 - 5,
      'left': $target.offset().left + $target.outerWidth() / 2 - 5
    });

    setTimeout(function () {
      $indicate.remove()
    },700)
  });

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

      $demoBody.addClass('open');

      coordStatus = 1;
      arrangeMessages();
    }

    if(keyboard) {
      keyboard = false;

      $demoBody.removeClass('keyboard')
    } else {
      keyboard = true;

      $demoBody.addClass('keyboard')
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
    $demoBody.addClass('open keyboard');

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
