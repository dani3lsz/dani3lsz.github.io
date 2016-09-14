/**
 * Created by dani3lsz on 9/13/16.
 *
 * Check if an image is loaded fully and set a custom function for load and error
 * You can pass an array of items to the function.
 * An item can be an image element, url or dom element with css background-image.
 *
 */





/*---------------*\
   #LOAD IMAGES
\*---------------*/


(function(){
  var global = this;

  function checkImage(image,success,error) {
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
      console.log('This url cannot be tested: '+url+', on: '+image);
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

  // global method to be able to call from anywhere
  global.loadImages = function(images,success,error) {
    if (images.length) {
      for (var i = 0; i < images.length; i++) {
        checkImage(images[i],success,error)
      }
    }
  };
})();