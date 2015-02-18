// Check if apng is supported

var aPngSupported = true;

$(function () {
  APNG.ifNeeded()
    .then(function () {
      aPngSupported = false;
    })
});


// Handle buttons


(function(){
  var appButton = $('.js-app-btn');
  var glanceButton = $('.js-glance-btn');
  var notificationButton = $('.js-notification-btn');

  var appStage = $('.js-app');
  var glanceStage = $('.js-glance');
  var notificationStage = $('.js-notification');

  var appPlaying = false;
  var glancePlaying = false;
  var notificationPlaying = false;

  appButton.on('click', function(){
    handleClick('app')
  });

  glanceButton.on('click', function(){
    handleClick('glance')
  });

  function handleClick(btn) {
    if (btn == 'app') {
      if (appPlaying) {
        appButton.removeClass('active');
        appButton.children('.fa').removeClass('fa-pause');
        appButton.children('.fa').addClass('fa-play');

        appStage.empty();
        appStage.removeClass('active');

        appPlaying = false;
      } else {
        appButton.addClass('active');
        appButton.children('.fa').removeClass('fa-play');
        appButton.children('.fa').addClass('fa-pause');

        var animatedSrc = appStage.data('url');
        var img = '<img src="'+ animatedSrc +'" width="136" height="170" >';

        appStage.append(img);
        appStage.addClass('active');

        if (!aPngSupported) {
          appStage.children("img").each(function () { APNG.animateImage(this); })
        }

        appPlaying = true;
      }
    } else if (btn == 'glance') {
      if (glancePlaying) {
        glanceButton.removeClass('active');
        glanceButton.children('.fa').removeClass('fa-circle');
        glanceButton.children('.fa').addClass('fa-play');

        glanceStage.removeClass('animate');
        glanceStage.parent().removeClass('blur');

        setTimeout(function(){
          glanceStage.removeClass('active');
        },500);

        glancePlaying = false;
      } else {
        glanceButton.addClass('active');
        glanceButton.children('.fa').removeClass('fa-play');
        glanceButton.children('.fa').addClass('fa-circle');

        glanceStage.addClass('active animate');

        glancePlaying = true;

        setTimeout(function(){
          glanceStage.parent().addClass('blur');
        },500);
      }
    }
  }

})();
