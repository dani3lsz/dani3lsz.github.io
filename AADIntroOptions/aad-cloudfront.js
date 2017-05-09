(function () {
  var
    stage = $('body'),
    select = $('.js-select'),
    btn = $('<a href="welcome-dismiss://appadvice.com/appsgonefree" class="aad-content__cell aad-content__cell--btn" style="position: absolute; bottom: 80px; left: 50%; margin-left: -80px">Get Started</a>'),
    theLocal = navigator.language;

  theLocal = theLocal.replace(/\-.*$/, "");

  if (theLocal === 'fr' || theLocal === 'de' || theLocal === 'es' || theLocal === 'zh' || theLocal === 'ja' || theLocal === 'pt' || theLocal === 'it') {
    if (select.length === 1) {
      stage.append(btn);
    }
  }
})();
