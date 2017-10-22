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
  },
  spritesheet: {
    poniko: './assets/ss/poniko.ss',
    enemy: './assets/ss/enemy.ss'
  }
};
ms.SCENES = [
  {
    className: 'ms.MainScene',
    label: 'main'
  }
];

phina.define('ms.Player', {
  superClass: 'phina.display.Sprite',
  init: function() {
    this.superInit('poniko');
    this.setScale(2);
    this.frameAnimation = phina.accessory.FrameAnimation('poniko')
      .attachTo(this).gotoAndPlay('wait');
  }
});

phina.define('ms.Enemy', {
  superClass: 'phina.display.Sprite',
  init: function(name) {
    this.superInit(name);
    this.setScale(2);
    this.frameAnimation = phina.accessory.FrameAnimation('enemy')
      .attachTo(this).gotoAndPlay('default');
  }
});

phina.define('ms.MainScene', {
  superClass: 'phina.display.DisplayScene',
  init: function(options) {
    this.superInit(options);
    this.canvas.imageSmoothingEnabled = false;
    this.backgroundColor = '#00d6ff';

    phina.display.Sprite('field').setScale(2)
      .setPosition(ms.SCREEN_W/2, 372).addChildTo(this);
    
    ms.Player().addChildTo(this)
      .setPosition(ms.SCREEN_W/2, ms.SCREEN_H/2);
  }
});

phina.main(function() {
  var app = phina.game.GameApp({
    assets: ms.ASSETS,
    width: ms.SCREEN_W,
    height: ms.SCREEN_H,
    scenes: ms.SCENES,
    startLabel: 'main'
  });
  app.run();
});