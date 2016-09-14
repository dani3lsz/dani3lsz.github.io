/*--------*\
   #MAIN
\*--------*/



(function () {
  var stickerObj = {
    gridSize: 4,
    images: [
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
    ]
  };

  var demo = document.getElementsByClassName('js-sticker-demo');

  if (demo.length && stickerObj) {
    for (var i = 0; i < demo.length; i++) {
      MDemo(demo[i],stickerObj);
    }
  }
})();
