(function(){
  var
    stage = $('body'),
    select = $('.js-select'),
    strings,
    theLocal = navigator.language;

  theLocal = theLocal.replace(/\-.*$/, "");

  if (theLocal != 'fr' && theLocal != 'de' && theLocal != 'es' && theLocal != 'zh' && theLocal != 'ja' && theLocal != 'pt' && theLocal != 'it') {
    select.eq(0).removeClass('hidden');
    select.eq(1).removeClass('js-swipe');
  } else {
    stage.addClass('aad-old');
    select.eq(1).removeClass('hidden');
    select.eq(0).removeClass('js-swipe');

    strings = {
      "welcome1":{
        "default":"Welcome to",
        "fr":"Bienvenue dans",
        "de":"Willkommen bei",
        "es":"BIenvenido a",
        "zh":"欢迎使用",
        "ja":"ようこそ",
        "pt":"Seja Bem-Vindo",
        "it":"Benvenuti a"
      },
      "welcome2":{
        "default":"Welcome to",
        "fr":"Bienvenue dans",
        "de":"Willkommen bei",
        "es":"BIenvenido a",
        "zh":"欢迎使用",
        "ja":"ようこそ",
        "pt":"Seja Bem-Vindo",
        "it":"Benvenuti a"
      },
      "welcome3":{
        "default":"Welcome to",
        "fr":"Bienvenue dans",
        "de":"Willkommen bei",
        "es":"BIenvenido a",
        "zh":"欢迎使用",
        "ja":"ようこそ",
        "pt":"Seja Bem-Vindo",
        "it":"Benvenuti a"
      },
      "welcome4":{
        "default":"Welcome to",
        "fr":"Bienvenue dans",
        "de":"Willkommen bei",
        "es":"BIenvenido a",
        "zh":"欢迎使用",
        "ja":"ようこそ",
        "pt":"Seja Bem-Vindo",
        "it":"Benvenuti a"
      },
      "appsGoneFreeTitle1":{
        "default":"AppAdvice Daily",
        "fr":"AppAdvice Daily",
        "de":"AppAdvice Daily",
        "es":"AppAdvice Daily",
        "zh":"AppAdvice Daily",
        "ja":"AppAdvice Daily",
        "pt":"AppAdvice Daily",
        "it":"AppAdvice Daily"
      },
      "appsGoneFreeTitle2":{
        "default":"AppAdvice Daily",
        "fr":"AppAdvice Daily",
        "de":"AppAdvice Daily",
        "es":"AppAdvice Daily",
        "zh":"AppAdvice Daily",
        "ja":"AppAdvice Daily",
        "pt":"AppAdvice Daily",
        "it":"AppAdvice Daily"
      },
      "appsGoneFreeTitle3":{
        "default":"AppAdvice Daily",
        "fr":"AppAdvice Daily",
        "de":"AppAdvice Daily",
        "es":"AppAdvice Daily",
        "zh":"AppAdvice Daily",
        "ja":"AppAdvice Daily",
        "pt":"AppAdvice Daily",
        "it":"AppAdvice Daily"
      },
      "appsGoneFreeTitle4":{
        "default":"AppAdvice Daily",
        "fr":"AppAdvice Daily",
        "de":"AppAdvice Daily",
        "es":"AppAdvice Daily",
        "zh":"AppAdvice Daily",
        "ja":"AppAdvice Daily",
        "pt":"AppAdvice Daily",
        "it":"AppAdvice Daily"
      },
      "byAppAdvice1":{
        "default":"By AppAdvice",
        "fr":"Par AppAdvice",
        "de":"Von AppAdvice",
        "es":"Por AppAdvice",
        "zh":"开发商",
        "ja":"AppAdviceより",
        "pt":"Por AppAdvice",
        "it":"Di AppAdvice"
      },
      "byAppAdvice2":{
        "default":"By AppAdvice",
        "fr":"Par AppAdvice",
        "de":"Von AppAdvice",
        "es":"Por AppAdvice",
        "zh":"开发商",
        "ja":"AppAdviceより",
        "pt":"Por AppAdvice",
        "it":"Di AppAdvice"
      },
      "byAppAdvice3":{
        "default":"By AppAdvice",
        "fr":"Par AppAdvice",
        "de":"Von AppAdvice",
        "es":"Por AppAdvice",
        "zh":"开发商",
        "ja":"AppAdviceより",
        "pt":"Por AppAdvice",
        "it":"Di AppAdvice"
      },
      "byAppAdvice4":{
        "default":"By AppAdvice",
        "fr":"Par AppAdvice",
        "de":"Von AppAdvice",
        "es":"Por AppAdvice",
        "zh":"开发商",
        "ja":"AppAdviceより",
        "pt":"Por AppAdvice",
        "it":"Di AppAdvice"
      },
      "textIntro":{
        "default":"We love app, and we want you to love them too",
        "fr":"Nous aimons les apps, et nous voulons que vous les aimiez aussi.",
        "de":"Wir lieben Apps und wollen, dass du sie auch liebst.",
        "es":"Amamos el mundo de las apps, y esperamos lo mismo de ti.",
        "zh":"我们喜欢这款应用，我们希望你也能够喜欢",
        "ja":"私たちがアプリを大好きなように、あなたにも楽しんでもらいたい。",
        "pt":"Nós amamos aplicativos, queremos que você os ame também.",
        "it":"Noi adoriamo le app, e vogliamo che le adoriate anche voi."
      },
      "firstBox":{
        "default":"Targeted for your particular tastes",
        "fr":"Ciblé pour correspondre à vos préférences",
        "de":"Ausgerichtet auf deinen persönlichen Geschmack",
        "es":"Dirigido a tus prerefencias y gustos específicos",
        "zh":"专注于为拥有不同喜好的读者服务",
        "ja":"個人の好みをターゲット",
        "pt":"Direcionando para suas preferências e gostos particulares.",
        "it":"Per esigenze specifiche."
      },
      "secondBox":{
        "default":"Great Apps & Hidden Gems",
        "fr":"Excellentes Apps & Perles Cachées",
        "de":"Großartige Apps & versteckte Juwelen",
        "es":"Excelentes apps y otras buenas desconocidas",
        "zh":"强大的应用和不为人知的强大功能",
        "ja":"すばらしいアプリ＆ 掘り出し物",
        "pt":"Ótimos apps e jóias escondidas.",
        "it":"Grandi App e Gemme Nascoste."
      },
      "thirdBox":{
        "default":"AppAdvice.com authors expert opinions on who will and won't love each app",
        "fr":"Les avis des experts de AppAdvice à propos des personnes qui aimeront ou n'aimeront pas chaque app.",
        "de":"Die Autoren von AppAdvice.com sagen ihre Meinung dazu, wer die App mögen oder nicht mögen wird.",
        "es":"Los expertos de AppAdvice te brindan opiniones sobre a quién gustarán o no las apps",
        "zh":"每款应用的适合人群和不适合人群，我们的AppAdvice.com编辑都会给出专业性意见",
        "ja":"AppAdvice.comによるアプリ専門家が誰のためのアプリかを説明。",
        "pt":"Opiniões de especialistas do AppAdvice.com sobre quem irá ou não gostar de cada aplicativo.",
        "it":"Gli autori di AppAdvice.com forniscono opinioni da esperti riguardi a chi piacerà ed a chi non piacerà ciascuna app."
      },
      "ExpertEditorialTitle":{
        "default":"Expert Editorial Content from AppAdvice Reviewers",
        "fr":"Du contenu éditorial de grande qualité provenant des experts de AppAdvice",
        "de":"Sachkundige Artikel von AppAdvice-Gutachtern",
        "es":"Contenido editorial de los expertos de AppAdvice",
        "zh":"由AppAdvice的专家为你精挑细选",
        "ja":"AppAdviceの読者によるコンテントを再編集したもの。",
        "pt":"Conteúdo editorial dos especialistas do AppAdvice",
        "it":"Contenuto editoriale dagli Esperti Recensori di AppAdvice"
      },
      "likeExplanation":{
        "default":"Our reviewer will tell you who will like the app. Not everything is for everyone.",
        "fr":"Notre expert vous dira qui aimera l'application. Tout le monde n'as pas les mêmes goûts. ",
        "de":"Unsere Gutachter sagen dir, wer die App mögen wird. Nicht alles passt für jeden.",
        "es":"Nuestros expertos te dirán para quién está hecha la aplicación, pues las preferencias son diversas.",
        "zh":"我们的编辑会告诉你这款应用的适合人群，毕竟每个人的喜好是不一样的。",
        "ja":"読者のみなさんはそのアプリが好きかどうか教えてくれます。それぞれアプリの楽しみ方は違いますから。",
        "pt":"Nosso especialista dará dicas de quem gostaria de determinado app. Nem tudo é para todos.",
        "it":"I nostri recensori vi indichieranno per chi è adatta l'app. Non tutto è adatto a tutti."
      },
      "dislikeExplanation":{
        "default":"We'll also tell you who won't like the app. No more guesswork.",
        "fr":"Nous vous dirons aussi qui n'aimera pas l'application. Plus besoin de deviner.",
        "de":"Wir sagen dir auch, wer die App nicht mögen wird. Kein Rätseln mehr.",
        "es":"También te diremos a quiénes no les gustará la aplicación. Simplificamos todo para ti.",
        "zh":"我们还会告诉你谁会不喜欢这款应用，你不用去猜。",
        "ja":"さらに私たちは、どんな人はこのアプリを好きではないか教えます。なので、余計な心配もなし。 ",
        "pt":"Ele também lhe dará dicas de quem não gostaria de determinado app. Nada mais de adivinhações.",
        "it":"Vi diremo anche a chi non piacera l'app. Basta tenativi."
      },
      "screenWidgetTitle":{
        "default":"Today Screen Widget!",
        "fr":"Le Widget du Jour!",
        "de":"Das heutige Widget im Fokus!",
        "es":"El Widget de Hoy",
        "zh":"“今日”屏幕视窗内增加了插件内容",
        "ja":"今日のスクリーンウィジェット",
        "pt":"Widget na tela Hoje da Central de Notificações!",
        "it":"Il Widget del Giorno!"
      },
      "widgetExplanation":{
        "default":"Get the lastest info without opening the app.<br/><br/>Click on the 'Today' view and scroll down to the bottom. Select edit, add the widget and enjoy!<br/><br/>Just pull down from the top of this screen to open Notification Center",
        "fr":"Obtenez les dernières infos sans ouvrir l'app.<br/><br/>Appuyez sur la vue 'Aujourd'hui' et allez tout en bas. Sélectionnez modifier, et ajoutez le widget!<br/><br/>Balayez l'écran de haut en bas pour afficher le centre de notifications",
        "de":"Erhalte die neusten Infos ohne die App zu öffnen.<br/><br/>Auf die 'Heute'-Ansicht klicken und zum Seitenende scrollen. Bearbeiten auswählen, Widget hinzufügen und genießen!<br/><br/>Ziehen Sie einfach unten vom oberen Rand des Bildschirms, um Notification Center öffnen",
        "es":"Lee información actualizada sin tener que abrir la app.<br/><br/>Ve a la sección de Notificaciones, busca al final el botón de 'editar' y agrega el widget.<br/><br/>Desliza tu dedo de arriba hacia abajo en la pantalla para abrir el Centro de Notificaciones",
        "zh":"不打开应用就能了解最新信息<br/><br/>点击进入“今日”视窗，向下滑动到屏幕底部。选择编辑，添加插件即可使用这一最新功能。<br/><br/>从屏幕顶部向下滑动就能打开通知中心",
        "ja":"アップを開かず最新情報を知ることができる<br/><br/>Today画面をクリックし、下までスクロール、編集を選択すればウィジェットwo<br/><br/>上から画面をスクロールすると通知センターを開ける",
        "pt":"Veja as últimas informações sem abrir o app.<br/><br/>Toque em Hoje na central de notificações, role até o final, selecione editar e adicione o widget!<br/><br/>Basta puxar para baixo a partir do topo da tela para abrir a Central de Notificações",
        "it":"Ricevi le ultime notizie senza aprire l'app.<br/><br/>Clicca su 'Oggi' e scorri fino alla fine. Selezionare 'modifica', aggiungi il widget e divertiti!<br/><br/>Semplicemente trascina dall'alto dello schermo per aprire il Centro Notifiche"
      },
      "appBumpYouTubeVideo":{
        "default":"http://appadvice.com/srcvideolink/en",
        "pt":"http://appadvice.com/srcvideolink/pt",
        "fr":"http://appadvice.com/srcvideolink/fr",
        "de":"http://appadvice.com/srcvideolink/de",
        "es":"http://appadvice.com/srcvideolink/es",
        "it":"http://appadvice.com/srcvideolink/it",
        "ja":"http://appadvice.com/srcvideolink/ja",
        "zh":"http://appadvice.com/srcvideolink/zh"
      },
      "appBumpMP4Video":{
        "default":"http://appadvice.com/mp4srcvideolink/en",
        "pt":"http://appadvice.com/mp4srcvideolink/pt",
        "fr":"http://appadvice.com/mp4srcvideolink/fr",
        "de":"http://appadvice.com/mp4srcvideolink/de",
        "es":"http://appadvice.com/mp4srcvideolink/es",
        "it":"http://appadvice.com/mp4srcvideolink/it",
        "ja":"http://appadvice.com/mp4srcvideolink/ja",
        "zh":"http://appadvice.com/mp4srcvideolink/zh"
      },
      "pushNotificationTitle":{
        "default":"Stay Up To Date!",
        "fr":"Restez informé!",
        "de":"Bleib auf dem Laufenden!",
        "es":"¡Mantente actualizado!",
        "zh":"每天都会带来最新内容",
        "ja":"最新内容",
        "pt":"Mantenha-se Atualizado!",
        "it":"Mantieniti Aggiornato!"
      },
      "pushExplanation":{
        "default":"We've created custom notification that alert you when new app or accessory news arrive! We promise to never send you more than 1 notification a day. ",
        "fr":"Nous avons créé des notifications personnalisées qui vous alertent quand une nouvelle app ou accessoire débarque! Nous promettons de ne jamais vous envoyer plus d'une notification par jour",
        "de":"Wir haben spezielle Mitteilungen erstellt, die dir melden, wenn eine neue App oder Nachrichten dazu ankommt! Wir versprechen, nicht mehr als eine Benachrichtigung am Tag zu senden.",
        "es":"Hemos creado un sistema de notificación personalizado que te alerta sobre nuevas apps o accesorios. Prometemos no enviarte más de una notificación diaria.",
        "zh":"当有最新应用或新闻发布时，你能够通过自定义通知中心获得提醒。我们承诺每天最多一条推送通知。",
        "ja":"通知機能で、新しいアプリやアクセサリーが登場したニュースをアラート設定できます。1日に1回以上はアラートしないので大丈夫。",
        "pt":"Nós criamos um novo sistema de notificação que te avisa quando uma nova notícia sobre um app ou acessório é publicada! Prometemos não enviar mais do que uma notificação por dia.",
        "it":"Abbiamo creato un nuovo sistema di notifiche per avvisarsi quando ci sono novità per app o accessori! Ti promettiamo che non ti invieremo mai più di 1 notifica al giorno."
      },
      "getStarted":{
        "default":"Get Started",
        "fr":"Commencez",
        "de":"Starten",
        "es":"Comenzar",
        "zh":"开始使用",
        "ja":"さあ、はじめましょう。",
        "pt":"Começar",
        "it":"Avviare"
      }
    };

    localizeToLang();
  }

  var
    swipe = $('.js-swipe'),
    dots = $('.js-dots').children(),
    bgs = $('.js-bg').children(),
    swipeCells = swipe.children(),
    swipeWidth = swipe.width(),
    swipeIndex = 0,
    swipeMaxIndex = swipeCells.length - 1,
    speed = 400;

  stage.swipe({
    swipeStatus: swipeStage,
    threshold: 1,
    allowPageScroll: 'none',
    triggerOnTouchEnd: true
  });

  swipeCells.eq(0).addClass('active');

  function getLocalString(name, local) {
    var elem = document.getElementById(name);
    if (elem && strings) {
      var localized = "";
      if (strings[name][local]) {
        localized = strings[name][local];
        elem.innerHTML = localized;
      } else if (strings[name].default) {
        localized = strings[name].default;
      }
    }
  }

  function localizeToLang() {
    getLocalString('welcome1',theLocal);
    getLocalString('appsGoneFreeTitle1',theLocal);
    getLocalString('byAppAdvice1',theLocal);
    getLocalString('welcome2',theLocal);
    getLocalString('appsGoneFreeTitle2',theLocal);
    getLocalString('byAppAdvice2',theLocal);
    getLocalString('welcome3',theLocal);
    getLocalString('appsGoneFreeTitle3',theLocal);
    getLocalString('byAppAdvice3',theLocal);
    getLocalString('welcome4',theLocal);
    getLocalString('appsGoneFreeTitle4',theLocal);
    getLocalString('byAppAdvice4',theLocal);
    getLocalString('textIntro',theLocal);
    getLocalString('firstBox',theLocal);
    getLocalString('secondBox',theLocal);
    getLocalString('thirdBox',theLocal);
    getLocalString('ExpertEditorialTitle',theLocal);
    getLocalString('likeExplanation',theLocal);
    getLocalString('dislikeExplanation',theLocal);
    getLocalString('screenWidgetTitle',theLocal);
    getLocalString('widgetExplanation',theLocal);
    getLocalString('appBumpYouTubeVideo',theLocal);
    getLocalString('appBumpMP4Video',theLocal);
    getLocalString('pushNotificationTitle',theLocal);
    getLocalString('pushExplanation',theLocal);
    getLocalString('getStarted',theLocal);
  }

  function swipeStage(event,phase,direction,distance,fingers) {
    if (phase == 'move') {
      if (direction == 'left' || direction == 'right') {
        moveStage((swipeIndex * swipeWidth) + (direction == "left" ? distance : -distance))
      }
    } else if (phase == 'end') {
      if (direction == "right") {
        if (swipeIndex != 0) {
          swipeIndex -= 1;
        }
      } else if (direction == "left") {
        if (swipeIndex != swipeMaxIndex) {
          swipeIndex += 1;
        }
      }

      moveStage(swipeIndex * swipeWidth, speed);

      dots.removeClass('active');
      dots.eq(swipeIndex).addClass('active');

      bgs.removeClass('active');
      bgs.eq(swipeIndex).addClass('active');

      swipeCells.removeClass('active');
      swipeCells.eq(swipeIndex).addClass('active');
    }
  }

  // animate the stage left or right
  function moveStage(move,duration) {
    var value = (move < 0 ? "" : "-") + Math.abs(move).toString();

    duration = duration || 0;

    swipe.css({
      "-webkit-transition-duration": (duration / 1000).toFixed(1) + "s",
      "-webkit-transform": "translate3d(" + value + "px,0,0)"
    });
  }

  $(window).resize(function(){
    swipeWidth = swipe.width();

    moveStage(swipeIndex * swipeWidth);
  });

  function moveStageRight() {
    if (swipeIndex != swipeMaxIndex) {
      swipeIndex += 1;
    }
    moveStage(swipeIndex * swipeWidth, speed);

    dots.removeClass('active');
    dots.eq(swipeIndex).addClass('active');

    bgs.removeClass('active');
    bgs.eq(swipeIndex).addClass('active');

    swipeCells.removeClass('active');
    swipeCells.eq(swipeIndex).addClass('active');
  }

  var $nextBtn = $( ".nextButton" );
  $nextBtn.click(function(e) {
    console.log('click');
    e.preventDefault();

    var $this = $(this);
    var href = this.getAttribute('href');

    if (href) {
      // Add pressed state class to button
      $nextBtn.removeClass('active');
      $this.addClass('active');

      // call href
      console.log(href);
      $.get( href, function( data ) {
        //Doing nothing
      });
    }

    // Move Stage Right
    moveStageRight()
  });
})();