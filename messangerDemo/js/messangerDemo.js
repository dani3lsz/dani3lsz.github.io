/**
 * Created by dani3lsz on 9/13/16.
 */

(function(global, $) {

  // throw error if jquery is not loaded
  if (!$) {
    throw ('No jQuery has been detected for MDemo.');
  }


  //
  // jQuery elements
  //

  var
    $global = $(global),
    $body = $('body');


  //
  // variables
  //

  var
    isDevelop = false,
    stickerSrcBase = window.location.hostname == 'localhost' ? '/dani3lsz/messangerDemo' : '/messangerDemo',
    answers = ['You OK?','What are you talking abaout man?','I don\'t understand','Yeah','LOL'];


  //
  // functions
  //

  var MDemo = function(elem,obj) {
    return new MDemo.init(elem,obj);
  };

  function numRand(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }


  //
  // create prototype
  //

  MDemo.prototype = {
    // log out data for development
    log: function (info) {
      if (isDevelop) {
        console.log(info)
      }
    },

    // update time in the demo
    updateClock: function () {
      var self = this;

      var currentTime = new Date();
      var currentHours = currentTime.getHours();
      var currentMinutes = currentTime.getMinutes();

      // Pad the minutes and seconds with leading zeros, if required
      currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;

      // Compose the string for display
      var currentTimeString = currentHours + ":" + currentMinutes;

      self.$time.html(currentTimeString); // set time
    },

    // show visual indicator on clicks
    indicateClick: function(e) {
      var
        $target = $(e.target), // click target
        $indicate = $('<div id="js-indicate-click" class="click-indicate"></div>'); // the elem indication the click

      $body.append($indicate); // append it in body

      // set indicate position to be in the center of the clicked element (indicate is 10x10px thus the -5)
      $indicate.css({
        'top': $target.offset().top + $target.outerHeight() / 2 - 5,
        'left': $target.offset().left + $target.outerWidth() / 2 - 5
      });

      // remove the indicator after it's animation is finished
      setTimeout(function () {
        $indicate.remove()
      },700)
    },

    // get base info about the page and elements
    getInfo: function () {
      var self = this;

      self.log('getInfo');

      self.demoWidth = self.$demo.width(); // screen width
      self.demoHeight = self.$demo.height(); // screen height
      self.scrollHeight = self.$scroll.height(); // scroll elem height above messages (messages area)

      var
        status0 = Math.round(self.demoWidth * 0.01), // keyboard hidden
        status1 = status0 + Math.round(self.demoWidth * 0.69), // keyboard open
        status2 = Math.round(self.demoHeight * 0.063 * 2.29) + status1; // keyboard open and sticker is in the input field

      self.baseCoord = [status0,status1,status2]; // save all 3 statuses

      self.updateNewMessageElem(); // update message input position in case of change

      // if there are messages already
      if (self.messages.length) {
        for (var i = self.messages.length - 1; i >= 0; i--) {
          self.messages[i].width = self.$messageElem.eq(i).outerWidth(); // get message width including padding
          self.messages[i].height = self.$messageElem.eq(i).outerHeight(); // get message height including padding

          // for stickers and dropped stickers we set the size to be equal as it is in the grid at the bottom
          if (self.messages[i].type == 'sticker' || self.messages[i].type == 'peel') {
            self.$messageElem.eq(i).css({'width': self.demoWidth / self.gridSize + 'px'})
          }
        }

        self.arrangeMessages(); // update messages' positions
      }
    },

    // load sticker images
    getImages: function () {
      var self = this;

      self.log('getImages');

      // load 4 rows of images into the sticker grid
      for (var j = 0; j < (self.imgObj.length && self.gridSize * 4); j++) {
        // append sticker in grid. Image should have draggable=false to prevent ghost image. We don't need that.
        self.$grid.append($('<div class="sd__body__stickers__grid__elem js-sticker-elem"><img src="'+ (stickerSrcBase + self.imgObj[j].src) +'" draggable="false"></div>'));
      }

      var i;

      self.$stickerElem = self.$demo.find('.js-sticker-elem'); // get all stickers

      self.$stickerElem.on('mousedown touchstart', function (e) {
        if (e.type == 'touchstart') self.$stickerElem.off('mousedown'); // prevent firing twice on touch devices

        self.pageX = e.originalEvent ? e.originalEvent.pageX : 0; // for triggered events we need a fallback of 0
        self.pageY = e.originalEvent ? e.originalEvent.pageY : 0; // for triggered events we need a fallback of 0

        i = self.$stickerElem.index($(this)); // get index of which sticker was clicked/touched

        // start timer for long click/tap
        self.stickerElemTimeout = setTimeout(function () {
          clearTimeout(self.stickerElemTimeout); // clear if time out
          self.stickerElemTimeout = 0; // make it be false
          if (!self.touchMove) self.stickerElemHoldStart(i); // if they was holding still, fire hold start function
        },200)
      }).on('touchmove', function (e) {
        self.touchMove = true; // they are not long clicking/tapping

        if (self.stickerElemTimeout) { // if the timeout is still counting, they are probably scrolling
          self.wasMoved = true; // was moved while counting
          clearTimeout(self.stickerElemTimeout); // prevent from firing
          self.stickerElemTimeout = 0; // make it be false
        } else if (!self.wasMoved) { // if moving while it started after the timeout ended
          e.preventDefault(); // prevent scrolling on iOS, as we now dragging a sticker
          self.dragSticker(e); // drag the sticker. Passing the event is needed
        }
      }).on('mouseup touchend', function (e) {
        if (e.type == 'touchstart') self.$stickerElem.off('mouseup'); // prevent firing twice on touch devices

        if (self.stickerElemTimeout) { // if the timeout is still counting, they are clicked
          clearTimeout(self.stickerElemTimeout); // clear it
          self.stickerElemTimeout = 0; // make it be false

          self.stickerElemClick(i); // call the click handler, passing the index of sticker clicked
        } else if (self.touchMove && !self.wasMoved) { // if they were dragging a sticker and not scrolling
          self.$messageElem.last().trigger('mouseup'); // trigger a mouseup on the created message with the dragged sticker
        }

        self.touchMove = false; // reset it to false
        self.wasMoved = false; // reset it to false
      });
    },

    // if long clicking/tapping a sticker
    stickerElemHoldStart: function (i) {
      var self = this;

      self.log('stickerElemHoldStart');

      var
        $currentElem = self.$stickerElem.eq(i), // current sticker
        $elemParent = $currentElem.parent(); // parent element

      var
        elemHeight = $currentElem.height(), // height of the sticker
        elemOffsetLeft = $currentElem.offset().left, // left offset of the sticker
        elemOffsetTop = $currentElem.offset().top, // top offset of the sticker
        parentHeight = $elemParent.outerHeight(), // parent elem height
        parentOffsetLeft = $elemParent.offset().left, // left offset of the parent
        parentOffsetTop = $elemParent.offset().top, // top offset of the parent
        parentScrollHeight = $elemParent[0].scrollHeight; // scroll height of the parent

      self.stickerElemTimeout = 0; // reset it to 0
      self.dragging = true; // set dragging true for other functions to know

      self.dragX = elemOffsetLeft - parentOffsetLeft; // we need the offset left relative to the parent
      // the stickers distance from the bottom of the screen
      self.dragY = -1 * (parentScrollHeight - (elemOffsetTop - parentOffsetTop) - elemHeight - (parentScrollHeight - parentHeight));

      self.createNewMessage('peel',stickerSrcBase + self.imgObj[i].src); // create a new message
      $currentElem.addClass('peeled'); // sticker will be faded while dragging

      // set the new message elem to be exactly where the sticker was on the screen
      self.$messageElem.last().css({
        'transform': 'translate3d('+ self.dragX +'px,'+ self.dragY +'px,0)'
      });

      // drag, mouseup and dragend will be fired for the created message elem above the sticker on desktop
      // so we add those listeners
      self.$messageElem.last().on('drag',function (e) {self.dragSticker(e)}).on('mouseup dragend',function () {
        self.stickerElemHoldEnd(i); // passing which index was held

        $(this).off('mouseup dragend'); // remove listeners to prevent bugs
      });
    },

    // if sticker is released after long click/tap
    stickerElemHoldEnd: function (i) {
      var self = this;

      self.log('stickerElemHoldEnd');

      self.dragging = false; // make sure other function know drag is ended

      if (self.canDropSticker) { // if it was dragged above a message, we can drop it
        // peel class needs to be removed, peeled class makes sure it's still above other messages
        self.$messageElem.last().removeClass('peel').addClass('peeled');

        self.messages[self.messages.length - 1].stickerX = self.stickerX; // save x pos of peeled sticker
        // save y pos of peeled sticker. It's corrected with basecoord and the current scroll pos.
        // Those are added back in the arrangeMessages function
        self.messages[self.messages.length - 1].stickerY = self.stickerY + self.baseCoord[self.coordStatus] - self.scrolled;

        self.shiftConversationTarget(); // increase drag&drop target if necessary
      } else { // if it was not dragged above a message
        self.dragOverIndex = -1; // reset the index that shows which message was the sticker dragged above

        self.deleteLastMsg(); // delete the created message with the sticker
      }

      self.$messageElem.removeClass('drop-target'); // remove potential added drop-target classes from the messages
      self.$stickerElem.eq(i).removeClass('peeled'); // remove class that made the sticker fade out
    },

    // click on sticker
    stickerElemClick: function (i) {
      var self = this;

      self.log('stickerElemClick');

      self.bottomBig = true; // the input should be big to fit the sticker in
      self.bottomOpen = false; // the input field should be wide, so close the additional buttons

      self.$bottom.addClass('big'); // the input should be big
      self.$bottom.removeClass('open'); // remove class that made other buttons visible and input short

      self.previewSticker = i; // index of which sticker was clicked
      self.$stickerMessageElem.addClass('open contain'); // open makes sticker visible inside, contain modifies other elements
      self.$stickerMessageElem.empty(); // make sure it's empty before adding something new
      self.$stickerMessageElem.append($('<img src="'+ (stickerSrcBase + self.imgObj[i].src) +'">')); // add new sticker

      self.coordStatus = 2; // coordstatus is when keyboard is visible and input is big
      self.arrangeMessages(); // coordstatus chaged so arrange messages
      self.updateNewMessageElem(); // coordstatus chaged so message input may need and update
      self.writingMessage(); // we are composing a message so...
    },

    // drag a sticker
    dragSticker: function (x,y) {
      var self = this;

      self.log('dragSticker');

      if (typeof x == 'number') { // if number than, we set it for the automation
        self.$messageElem.last().addClass('move'); // message will have the final pos to animate to, so we need a class
      }

      // y first so we don't override x
      y = typeof y == 'number' ? y : self.pageY - x.originalEvent.pageY; // use the pos we passed or use the event coordinates
      x = typeof x == 'number' ? x : self.pageX - x.originalEvent.pageX; // use the pos we passed or use the event coordinates

      self.stickerX = -x + self.dragX; // dragX was set on holdStart, but we need the total (dragX is not positive)
      self.stickerY = -y + self.dragY; // dragY was set on holdStart, but we need the total (dragY is not positive)

      if (self.stickerX < 0) { // if it less than 0, it's out of the screen on the left side
        self.stickerX = 0; // so make it remain in
      } else if (self.stickerX > self.demoWidth - self.messages[self.messages.length - 1].width) { // out of the screen on the right side
        self.stickerX = self.demoWidth - self.messages[self.messages.length - 1].width; // so make it remain in
      }

      var l, r, t, b, // these will be the left, right, top and bottom coordinates of each message
        stickerTop = -self.stickerY + self.messages[self.messages.length - 1].height, // get the top coordinate of the dragged sticker
        stickerRight = self.stickerX + self.messages[self.messages.length - 1].width; // get the right coordinate of the dragged sticker

      // set the position of the sticker while dragged
      self.$messageElem.last().css({
        'transform': 'translate3d('+ self.stickerX +'px,'+ self.stickerY +'px,0)'
      });

      // check all messages
      for (var i = self.messages.length - 1; i >= 0; i--) {
        l = Math.round(self.messages[i].incoming ? self.demoWidth * 0.0425 : self.demoWidth * 0.9575 - self.messages[i].width); // left
        r = l + self.messages[i].width; // right
        b = self.messages[i].coordY + self.demoHeight * .063; // bottom
        t = b + self.messages[i].height; // top

        // if the dragged sticker is overlapping a message, it can be dropped
        self.canDropSticker = self.stickerX < r && stickerRight > l && stickerTop > b && -self.stickerY < t;

        if (self.canDropSticker) {
          self.dragOverIndex = i; // se the index of which message the sticker can be dropped on
          break; // get out of the loop to prevent overriding canDropSticker
        }
      }

      self.$messageElem.removeClass('drop-target'); // remove class from all messages to be sure

      if (self.canDropSticker) {
        self.$messageElem.eq(self.dragOverIndex).addClass('drop-target'); // add class to the message under the dragged sticker
      } else if (self.dragOverIndex > -1) {
        self.dragOverIndex = -1; // if canDropSticker became false, reset this too
      }
    },

    // update input
    writingMessage: function () {
      var self = this;

      self.log('writingMessage');

      // if no text was typed and no sticker is in the input
      if (self.$newMessageElem.text() == '' && self.previewSticker < 0) {
        self.$newMessageElem.empty(); // <br> can be remained so get rid of it because it prevents css :empty to has effect
        self.$input.removeClass('active'); // it's not active any more

        // restart conversation
        if (!self.conversationRunning) {
          self.conversationRunning = true;
          self.runConversation();
        }
      } else { // but if there is something in one of the inputs
        self.$input.addClass('active'); // set class
      }
    },

    // delete last message
    deleteLastMsg: function () {
      var self = this;

      self.log('deleteLastMsg');

      self.$messageElem.last().remove(); // get rid of the created last message
      self.$messageElem = self.$demo.find('.js-sticker-message'); // update $messageElem
      self.messages.splice(-1,1); // delete last elem in messages array

      self.arrangeMessages(); // arrange massages as the last was deleted
    },

    // update last message
    updateLastMsg: function () {
      var self = this;

      self.log('updateLastMsg');

      self.$messageElem.last().removeClass('writing').empty(); // remove the loader from inside, and remove styling

      if (self.conversation[self.activeConversation].type == 'text') { // if it was a text message arriving
        self.$messageElem.last().text(self.conversation[self.activeConversation].text); // put the text inside
      } else if (self.conversation[self.activeConversation].type == 'image') { // if it was an image
        // put the image inside and set the class
        self.$messageElem.last().addClass('image').append($('<img src="'+ self.conversation[self.activeConversation].image +'">'))
      } else if (self.conversation[self.activeConversation].type == 'sticker') { // if it was a sticker
        // we're not prepared for that. It's unprecedented
      }

      // update the last messages object in the array
      self.messages[self.messages.length - 1].type = self.conversation[self.activeConversation].type;
      self.messages[self.messages.length - 1].text = self.conversation[self.activeConversation].type == 'text' ? self.conversation[self.activeConversation].text : '';
      self.messages[self.messages.length - 1].width = self.$messageElem.last().outerWidth();
      self.messages[self.messages.length - 1].height = self.$messageElem.last().outerHeight();

      self.arrangeMessages();
    },

    // create new message
    createNewMessage: function (type,content,incoming) {
      var self = this;

      self.log('createNewMessage');

      incoming = typeof incoming == 'undefined' ? false : incoming; // if not passed, make it false

      // if not text (but sticker, peel or image) create img element
      // draggable is set to false to prevent ghost image while dragging
      var img = type != 'text' ? '<img src="'+ content +'" draggable="false">' : '';
      // create new message element with text or image inside
      var $newMsg = $('<div class="sd__body__elem js-sticker-message">'+ (type == 'text' ? content : img) +'</div>');
      if (incoming) $newMsg.addClass('incoming'); // if incoming set incoming
      if (type == 'image') $newMsg.addClass('image'); // if image set image
      // if sticker set image and set width, which is the same as in the grid
      if (type == 'sticker') $newMsg.addClass('image').css({'width': self.demoWidth / self.gridSize + 'px'});
      // if it was a sticker, plus set draggable=true, because the drag event fires on this element on desktop
      if (type == 'peel') $newMsg.addClass('image peel').css({'width': self.demoWidth / self.gridSize + 'px'}).attr('draggable',true);

      self.$demoBody.append($newMsg); // make it appear

      self.$messageElem = self.$demo.find('.js-sticker-message'); // update $messageElem
      // add object to the messages array
      self.messages.push({
        type: type, // type of message (text, image, sticker, peel)
        text: type == 'text' ? content : '', // store text if text message
        width: self.$messageElem.last().outerWidth(), // get with of message including padding
        height: self.$messageElem.last().outerHeight(), // get height of message including padding
        incoming: incoming
      });

      if (!self.dragging) self.arrangeMessages(); // arrange messages if it's not a new sticker that is dragged
    },

    // update message input position and classes
    updateNewMessageElem: function () {
      var self = this;

      self.log('updateNewMessageElem');

      // it can has coordStatus 0 and 1. It stays 1 if coordStatus is 2
      self.$newMessageElem.css({
        'transform': 'translate3d(0,-'+ self.baseCoord[self.coordStatus == 2 ? 1 : self.coordStatus] +'px,0)'
      });

      // if keyboard is open add class 'open'
      self.bottomOpen ? self.$newMessageElem.addClass('open') : self.$newMessageElem.removeClass('open');

      // if input has sticker in it add class 'big'
      self.bottomBig ? self.$newMessageElem.addClass('big') : self.$newMessageElem.removeClass('big');
    },

    // arrange messages on screen
    arrangeMessages: function () {
      var self = this;

      self.log('arrangeMessages');

      var i, previous, mX, mY;

      for (i = self.messages.length - 1; i >= 0; i--) {
        if (self.messages[i].type == 'peel') {
          // we saved x position into stickerX
          mX = self.messages[i].stickerX;

          // if there's no regular message after, y pos is the base coordinate. Else, it's the pre saved stickerY and the top position of the first regular message after
          mY = !previous ? self.messages[i].stickerY - self.baseCoord[self.coordStatus] : self.messages[i].stickerY - (self.messages[previous].coordY + self.messages[previous].height + 1);
        } else {
          if (previous) {
            // y pos is the coordinate + height of the previous message + 1px gap
            mY = self.messages[i].coordY = self.messages[previous].coordY + self.messages[previous].height + 1;

            // if not teh same type or not the same sender, it should have a margin below, and has the tail
            if (self.messages[i].incoming != self.messages[previous].incoming || self.messages[i].type != self.messages[previous].type) {
              mY = self.messages[i].coordY += 5; // add margin below

              self.$messageElem.eq(i).addClass('last'); // 'last' class that adds the little tail
            } else {
              self.$messageElem.eq(i).removeClass('last'); // if not last remove class
            }
          } else {
            mY = self.messages[i].coordY = self.baseCoord[self.coordStatus]; // if it's the last message, y pos is the base coordinate
            self.$messageElem.eq(i).addClass('last'); // and we also add the 'last' class that adds the little tail
          }

          mY = -mY - self.demoHeight * .063; // the input field is .063 * demoHeight, and we need to include that
          mX = 0; // it's 0 for everyithing except dropped stickers
          previous = i; // it is the previous regular message for the next iteration
        }

        // only need to update these if not scrolling but new message was added
        if (!self.scrolling) {
          // this is actually the combined height of the messages area
          self.scrollScrollHeight = self.messages[0].coordY + self.messages[0].height - self.baseCoord[self.coordStatus];

          // we need to apply that for the inner elem of the $scroll to be able to simulate message scroll
          self.$scrollChild.css({'height': self.scrollScrollHeight});

          // set the sroll position to the bottom if new message was added
          self.$scroll.scrollTop(self.scrollScrollHeight - self.scrollHeight);
        }

        // set the style for messages
        self.$messageElem.eq(i).css({
          'transition-delay': (self.scrolling ? 0 : .1) + 's', // no delay if scrolling
          'transition-duration': (self.scrolling ? 0 : .3) + 's', // no timing in scrolling
          'transform': 'translate3d('+ mX +'px,'+ (mY + self.scrolled) +'px,0)' // y pos modified with scroll pos
        })
      }
    },

    // receive message
    receiveMessage: function () {
      var self = this;

      self.log('receiveMessage');

      self.receivingMsg = true; // incoming message on it's way

      self.createNewMessage('text','',true); // create a new but empty text message

      // add the 3 dot loader inside, and set the class to style it
      self.$messageElem.last().append('<div class="sd__body__elem__loader"></div>').addClass('writing');

      if (self.conversation[self.activeConversation].type == 'image') { // if it's an incoming message
        // than pass the image string into the image load function, along with the success and error callbacks
        loadImages([self.conversation[self.activeConversation].image],receiveSuccess,receiveError)
      } else { // stickers are already loaded so we don't need to check for those
        // call success with a delay. Delay is based on text length, or it's 500ms if sticker
        setTimeout(receiveSuccess,self.conversation[self.activeConversation].type == 'text' ? self.conversation[self.activeConversation].text.length * 100 : 500)
      }

      function receiveSuccess() {receiveEnd()} // call for end
      function receiveError() {receiveEnd(true)} // call for end with passing error

      function receiveEnd(error) {
        if (!self.receivingMsg) return; // if someone started typing, prevent it to run
        self.receivingMsg = false; // it will be received just now so make it false

        if (!self.conversationRunning) { // prepare restarting conversation if halt
          self.conversationRunning = true;
        } else { // or mark active conversation elem as sent
          self.conversation[self.activeConversation].sent = true;
        }

        // if error delete the last message, if not, update it with the received content
        error ? self.deleteLastMsg() : self.updateLastMsg();
        self.runConversation(); // restart or continue conversation
      }
    },

    // run automated conversation
    runConversation: function () {
      var self = this;

      self.log('runConversation');

      if (!self.conversationRunning) return; // if it was ended, it's false, so return

      // iterate through conversation
      for (var i = 0; i < self.conversation.length; i++) {
        if (!self.conversation[i].sent) { // if it was not sent yet
          self.activeConversation = i; // make it the active elem in the conversation
          if (self.conversation[i].incoming) { // if it's an incoming message
            setTimeout(function () {self.receiveMessage()},500); // call for receive function. Delay to feel it more real
          } else {
            setTimeout(function () {self.createMessage()},500); // if not, than the create function. Delay to feel it more real
          }
          break; // jump out of loop if we found an unsent message
        } else if (i == self.conversation.length - 1) { // if this is the last and also sent
          self.conversationRunning = false; // than the conversation has ended
        }
      }
    },

    // the automated conversation's create message function
    createMessage: function () {
      var self = this;

      self.log('createMessage');

      if (self.conversation[self.activeConversation].type == 'text') { // if it will be a text message
        self.$input.trigger('click'); // trigger clicking the input field to open keyboard
        self.inputAnimate = setTimeout(function () {self.animateInput()},500); // automated type in the text
      } else if (self.conversation[self.activeConversation].type == 'sticker') { // if it will be a sticker
        self.startStickerSend(); // start the process of automated sticker sending
      } else if (self.conversation[self.activeConversation].type == 'peel') { // if it's a peeled sticker
        self.animatePeel(); // start the process of automated peeled sticker sending
      }
    },

    // send message
    sendMessage: function() {
      var self = this;

      self.log('sendMessage');

      if (self.$newMessageElem.text() == '') return; // if input is empty, do nothing

      self.createNewMessage('text',self.$newMessageElem.text()); // create new text message with input content
      self.$newMessageElem.empty(); // clear input

      if (!self.conversationRunning) { // if conversation is halt
        self.conversationRunning = true; // prepare starting it again

        if (self.activeConversation < self.conversation.length - 1) { // if conversation is not done
          self.shiftConversationTarget(); // increase drag&drop target if necessary
        } else { // if conversation was finished
          self.addRandomAnswer(); // give a random reply
        }
      } else { // if conversation is running
        self.conversation[self.activeConversation].sent = true; // set the current active as sent
      }

      self.runConversation(); // remaining/restarting conversation
    },

    // send sticker
    sendSticker: function(incoming) {
      var self = this;

      self.log('sendSticker');

      if (self.previewSticker < 0) return; // if no sticker in the input, do nothing

      self.bottomBig = false; // close big input
      self.$bottom.removeClass('big'); // close big input
      self.coordStatus = 1; // coordstatus is back to keyboard open only

      // create a new sticker message
      self.createNewMessage('sticker',stickerSrcBase + self.imgObj[self.previewSticker].src,incoming);

      self.previewSticker = -1; // set it back
      self.$stickerMessageElem.removeClass('open contain').empty(); // clear sticker input

      if (!self.conversationRunning) { // if conversation is halt
        self.conversationRunning = true; // prepare starting it again
      } else { // if conversation is running
        self.conversation[self.activeConversation].sent = true; // set the current active as sent
      }

      self.runConversation(); // remaining/restarting conversation
      self.writingMessage(); // you still get it
    },

    // animated typing into the input field
    animateInput: function () {
      var self = this;

      self.log('animateInput');

      clearTimeout(self.inputAnimate); // clear this so we can set a new delay

      // get the current substing to appear in the input
      var currentString = self.conversation[self.activeConversation].text.substring(0,self.activeLetter + 1);

      self.$newMessageElem.text(currentString); // set the current substring into the input

      if (self.activeLetter > self.conversation[self.activeConversation].text.length - 1) { // if we reached the end of the string
        self.activeLetter = 0; // set it back to the start
        self.$sendBtn.trigger('click'); // trigger clicking the send button to send
      } else if (self.conversationRunning) { // if it's not the end of the string
        self.activeLetter++; // go to the next letter
        var speed = numRand(50,200); // random speed for each letter typed
        self.inputAnimate = setTimeout(function () {self.animateInput()},speed); // recursive call to next iteration
      } else { // if conversation stopped by typing
        self.activeLetter = 0; // set it back to the start
      }

      self.writingMessage(); // it's obvious
    },

    // animated sending a sticker message
    startStickerSend: function () {
      var self = this;

      self.log('startStickerSend');

      self.$openBottom.trigger('click'); // open the buttons next to the input field

      setTimeout(function () { // wait a bit
        if (!self.conversationRunning) return; // return if conversation has been stopped in the meantime
        if (self.keyboard) { // if the keyboard is visible
          self.$bottomBtn.eq(0).trigger('click'); // trigger click on the apps button next to the input field
        }

        setTimeout(function () { // wait a bit
          if (!self.conversationRunning) return; // return if conversation has been stopped in the meantime
          // simulate a click on the sticker to add it into the input field
          self.$stickerElem.eq(self.conversation[self.activeConversation].sticker).trigger('mousedown').trigger('mouseup');

          setTimeout(function () { // wait a bit
            if (!self.conversationRunning) return; // return if conversation has been stopped in the meantime
            self.$sendBtn.trigger('click'); // trigger send
          },800);
        },800);
      },800);
    },

    // animated drag&drop a sticker onto a message
    animatePeel: function () {
      var self = this;

      self.log('animatePeel');

      self.$openBottom.trigger('click'); // open the buttons next to the input field

      setTimeout(function () { // wait a bit
        if (!self.conversationRunning) return; // return if conversation has been stopped in the meantime
        if (self.keyboard) { // if the keyboard is visible
          self.$bottomBtn.eq(0).trigger('click'); // trigger click on the apps button next to the input field
        }

        setTimeout(function () { // wait a bit
          if (!self.conversationRunning) return; // return if conversation has been stopped in the meantime
          // simulate a mousedown and hold on the sticker
          self.$stickerElem.eq(self.conversation[self.activeConversation].sticker).trigger('mousedown');

          setTimeout(function () { // wait a bit
            var l, r, b, t, sL, sB; // coordinates of target message and the dragged sticker

            var i = self.conversation[self.activeConversation].target.i; // the index of the target message

            // get message coordinates (see dragSticker function)
            l = Math.round(self.messages[i].incoming ? self.demoWidth * 0.0425 : self.demoWidth * 0.9575 - self.messages[i].width);
            r = l + self.messages[i].width;
            b = self.messages[i].coordY + self.demoHeight * .063;
            t = b + self.messages[i].height;

            if (self.conversation[self.activeConversation].target.x == 'left') { // if we drag to the left side of the target message
              sL = l; // than the sticker left coordinate = message left coordinate
            } else if (self.conversation[self.activeConversation].target.x == 'center') { // if we drag to the center
              // than the sL = message left + (message right coordinate - message width - message left) / 2
              sL = (r - self.messages[self.messages.length - 1].width - l) / 2 + l; //
            } else if (self.conversation[self.activeConversation].target.x == 'right') { // if we drag to the right
              // than the sL = message right coordinate - message width
              sL = r - self.messages[self.messages.length - 1].width
            }

            if (self.conversation[self.activeConversation].target.y == 'top') { // if we drag to the top of the target message
              // than the sticker bottom coordinate = message top coordinate - message height
              sB = t - self.messages[self.messages.length - 1].height
            } else if (self.conversation[self.activeConversation].target.y == 'center') { // if we drag to the center
              // same logic as above with sL
              sB = (t - self.messages[self.messages.length - 1].width - b) / 2 + b
            } else if (self.conversation[self.activeConversation].target.y == 'bottom') { // if we drag to the bottom
              sB = b; // than the sticker bottom coordinate = message bottom coordinate
            }

            self.dragSticker(self.dragX-sL,sB+self.dragY); // call dragSticker with target coordinates passing

            setTimeout(function () { // wait a bit
              self.$messageElem.last().trigger('mouseup'); // trigger release of dragged message

              if (!self.conversationRunning) { // prepare restarting conversation if halt
                self.conversationRunning = true;
              } else { // or mark active conversation elem as sent
                self.conversation[self.activeConversation].sent = true;
              }

              self.runConversation(); // restart or continue conversation
            },1100)
          },800);
        },800);
      },800);
    },

    // receive random answer
    addRandomAnswer: function() {
      var self = this;

      self.log('addRandomAnswer');

      if (numRand(0,1)) return; // 50% chance of getting a reply

      // add new elem to the conversation array with a random answer
      self.conversation.push({type: 'text', text: answers[numRand(0,answers.length - 1)], incoming: true, sent: false})
    },

    // shift peeled sticker target in conversation in case of new message added before it finished
    shiftConversationTarget: function () {
      var self = this;

      self.log('shiftConversationTarget');

      // iterate through remaining conversation
      for (var i = self.activeConversation; i < self.conversation.length; i++) {
        // if there is a drag&drop ahead, increase the target message index with one
        if (self.conversation[i].type == 'peel' && self.conversation[i].target.i > self.activeConversation) {
          self.conversation[i].target.i++
        }
      }
    },

    // demo click handler
    demoClick: function (e) {
      var self = this;

      self.log('demoClick');

      if (self.conversationRunning) self.indicateClick(e); // indicate clicks in the demo
    },

    // message scroll handler
    messageScroll: function () {
      var self = this;

      self.log('messageScroll');

      if (self.conversationRunning) return; // can't scroll whil automated conversation is running

      clearTimeout(self.scrollTimeout); // prevent calling for scroll ended

      self.scrolling = true; // we are scrolling

      self.scrolled = self.scrollScrollHeight - self.scrollHeight - self.$scroll.scrollTop(); // get the scrolled px from the bottom

      self.arrangeMessages(); // position messages to refe=lect the scroll

      self.scrollTimeout = setTimeout(function () {
        self.scrolling = false; // setting it false if scroll finished
      },100)
    },

    // sticker input click handler
    stickerMessageElemClick: function () {
      var self = this;

      self.log('stickerMessageElemClick');

      self.bottomBig = false; // input shouldn't be big
      self.$bottom.removeClass('big'); // input shouldn't be big
      self.coordStatus = 1; // coordstatus is back where keyboeard is open only

      self.previewSticker = -1; // set it back
      self.$stickerMessageElem.removeClass('open contain').empty(); // clear sticker input

      self.writingMessage(); // quite clear
      self.arrangeMessages(); // coordstatus has changed so...
    },

    // input type handler
    newMessageKeyDown: function (e) {
      var self = this;

      self.log('newMessageKeyDown');

      if (e.keyCode == 13) { // if hit enter
        e.preventDefault(); // prevent jumping around
        self.$sendBtn.trigger('click'); // trigger sendBtn click
      }
    },

    // input type handler
    newMessageKeyUp: function (e) {
      var self = this;

      self.log('newMessageKeyUp');

      if (e.keyCode != 13) { // if it's not enter
        self.conversationRunning = false; // stop conversation running

        if (self.receivingMsg) { // if there was a message receiving
          self.receivingMsg = false; // prevent receiving it

          self.deleteLastMsg(); // delete empty last message
        }
      }

      self.writingMessage(); // yeah that's happening
    },

    // click handler for button that reveals other buttons next to the input field
    openBottomClick: function () {
      var self = this;

      self.log('openBottomClick');

      if(!self.bottomOpen) { // if buttons are hidden next to the input
        self.bottomOpen = true; // reveal those buttons

        self.$bottom.addClass('open'); // reveal those buttons
      }

      if (self.bottomBig) { // if input is big
        self.bottomBig = false; // make it small

        self.$bottom.removeClass('big'); // make it small

        self.coordStatus = 1; // coordstatus back to where keyboard is open only
        self.arrangeMessages(); // coordstatus has changed so...
      }

      if (self.previewSticker >= 0) { // if a sticker was in the input
        self.$stickerMessageElem.removeClass('open'); // remove only the open, not the contain class
      }

      self.updateNewMessageElem(); // update input pos
    },

    // click handler for apps button next to the input field
    bottomBtnClick: function () {
      var self = this;

      self.log('bottomBtnClick');

      self.$bottomBtn.toggleClass('active'); // apps button toggle active class

      if(!self.bodyOpen) { // if keyboard is hidden
        self.bodyOpen = true; // reveal keyboard

        self.$demoBody.addClass('open'); // reveal keyboard

        self.coordStatus = 1; // coordstatus to where keyboard is open
        self.arrangeMessages(); // coordstatus has changed so...
      }

      // toggle stickers to be hidden
      self.keyboard ? self.$demoBody.removeClass('keyboard') : self.$demoBody.addClass('keyboard');
      self.keyboard = !self.keyboard;

      self.updateNewMessageElem(); // update input pos
    },

    // click handler for input
    inputClick: function () {
      var self = this;

      self.log('inputClick');

      if (self.previewSticker >= 0 && self.bottomOpen) { // if keyboard is visible and sticker is in the input
        self.$stickerElem.eq(self.previewSticker).trigger('click'); // trigger click on the previewed sticker in the grid

        if (self.keyboard) { // is stickers are hidden
          self.$newMessageElem.focus(); // focus inout field so people can type
        }

        // prevent the rest of the function
        return
      }

      self.bottomOpen = false; // hide buttons next to the inuput

      self.keyboard = true; // hide stickers

      self.$bottomBtn.removeClass('active'); // remove class from the apps btn
      self.$bottom.removeClass('open'); // hide buttons next to the inuput
      self.$demoBody.addClass('open keyboard'); // show keyboard while hiding stickers

      self.coordStatus = self.bottomBig ? 2 : 1; // set coordstatus based on input is big  or not
      self.arrangeMessages(); // coordstatus has changed so...
      self.updateNewMessageElem(); // update input pos

      self.$newMessageElem.focus(); // focus inout field so people can type
    },

    // send btn click handler
    sendBtnClick: function () {
      var self = this;

      self.log('sendBtnClick');

      if (self.previewSticker >= 0) { // if there is a sticker in the input
        self.sendSticker(); //send it
      }
      self.sendMessage(); // send text message
      self.writingMessage(); // update input
    }
  };


  //
  // init object
  //

  MDemo.init = function(elem,obj) {
    if (!elem || !obj) return;

    var self = this;

    self.log('init');

    var $demo = $(elem);


    //
    // jQuery objects
    //

    self.$demo = $demo;
    self.$time = $demo.find('.js-sticker-time');
    self.$demoBody = $demo.find('.js-sticker-body');
    self.$bottom = $demo.find('.js-sticker-bottom');
    self.$bottomBtn = $demo.find('.js-sticker-btn');
    self.$openBottom = $demo.find('.js-sticker-open-bottom');
    self.$sendBtn = $demo.find('.js-sticker-send');
    self.$input = $demo.find('.js-sticker-input');
    self.$grid = $demo.find('.js-sticker-grid');
    self.$newMessageElem = $demo.find('.js-sticker-new-message');
    self.$stickerMessageElem = $demo.find('.js-sticker-sticker-message');
    self.$scroll = $demo.find('.js-sticker-scroll');
    self.$scrollChild = self.$scroll.children();


    //
    // Variables
    //

    self.gridSize = obj.gridSize;
    self.imgObj = obj.images;
    self.activeLetter = 0;
    self.coordStatus = 0;
    self.scrolled = 0;
    self.scrollTimeout = 0;
    self.stickerElemTimeout = 0;
    self.previewSticker = -1;
    self.dragOverIndex = -1;
    self.canDropSticker = false;
    self.conversationRunning = true;
    self.receivingMsg = false;
    self.scrolling = false;
    self.touchMove = false;
    self.wasMoved = false;
    self.bodyOpen = false;
    self.bottomOpen = true;
    self.bottomBig = false;
    self.keyboard = true;
    self.dragging = false;
    self.messages = [];
    self.conversation = [
      {type: 'text', text: 'Hey', incoming: true, sent: false},
      {type: 'text', text: 'Hey, what\'s up?', incoming: false, sent: false},
      {type: 'text', text: 'Just wanted to ask if you have some nice stickers', incoming: true, sent: false},
      {type: 'text', text: 'I only have the basics', incoming: true, sent: false},
      {type: 'text', text: 'Sure, just downloaded a few', incoming: false, sent: false},
      {type: 'sticker', sticker: numRand(0,2 * self.gridSize - 1), incoming: false, sent: false},
      {type: 'text', text: 'Btw', incoming: true, sent: false},
      {type: 'image', image: 'https://wallpapers.wallhaven.cc/wallpapers/thumb/small/th-416958.jpg', incoming: true, sent: false},
      {type: 'text', text: 'Niiiiiice', incoming: false, sent: false},
      {type: 'peel', sticker: numRand(0,2 * self.gridSize - 1), incoming: false, sent: false, target: {i: 7, x: 'right', y: 'bottom'}}
    ];


    //
    // Calls
    //

    self.$demo.on('click mousedown', function (e) {self.demoClick(e)});
    self.$input.on('click',function () {self.inputClick()});
    self.$scroll.on('scroll',function () {self.messageScroll()});
    self.$sendBtn.on('click',function () {self.sendBtnClick()});
    self.$bottomBtn.on('click',function () {self.bottomBtnClick()});
    self.$openBottom.on('click',function () {self.openBottomClick()});
    self.$newMessageElem.on('keyup',function (e) {self.newMessageKeyUp(e)});
    self.$newMessageElem.on('keydown',function (e) {self.newMessageKeyDown(e)});
    self.$stickerMessageElem.on('click',function () {self.stickerMessageElemClick()});

    self.$grid.addClass('sd__body__stickers__grid__--'+self.gridSize); // need the gridsize class to size the stickers

    self.getInfo(); // get basic demo info on init
    self.getImages(); // put stickers into the grid
    self.updateNewMessageElem(); // position input field
    self.runConversation(); // start automated conversation
    setInterval(function () {self.updateClock()}, 1000); // update clock in demo

    $global.resize(self.getInfo); // get info on window size change
  };

  // trick borrowed from jQuery so we don't have to use the 'new' keyword
  MDemo.init.prototype = MDemo.prototype;

  // attach our MDemo to the global object
  global.MDemo = MDemo;

}(window, jQuery));