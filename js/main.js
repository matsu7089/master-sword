var ms = ms || {};

ms.SCREEN_W = 320;
ms.SCREEN_H = 480;
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