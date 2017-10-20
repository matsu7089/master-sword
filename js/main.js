var ms = ms || {};

ms.SCREEN_W = 320;
ms.SCREEN_H = 480;
ms.ASSETS = {
  image: {
    // Player
    poniko: './assets/img/poniko.png',
    // Enemy
    banaa: './assets/img/banaa.png',
    dragon: './assets/img/dragon.png',
    slimusi: './assets/img/slimusi.png',
    // Object
    field: './assets/img/field.png',
    arrow: './assets/img/arrow.png'
  }
}
ms.SCENES = [
  {
    className: 'ms.MainScene',
    label: 'main'
  }
];

phina.define('ms.MainScene', {
  superClass: 'phina.display.DisplayScene',
  init: function(options) {
    this.superInit(options);
    this.backgroundColor = '#00d6ff';
  }
});

phina.main(function() {
  var app = phina.game.GameApp({
    width: ms.SCREEN_W,
    height: ms.SCREEN_H,
    scenes: ms.SCENES,
    startLabel: 'main'
  });
  app.run();
});