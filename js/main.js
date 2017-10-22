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
    
    this.vx = 1;
    this.vy = 0;
  }
});

phina.define('ms.Enemy', {
  superClass: 'phina.display.Sprite',
  init: function(name) {
    this.superInit(name);
    this.setScale(2);
    this.frameAnimation = phina.accessory.FrameAnimation('enemy')
      .attachTo(this).gotoAndPlay('default');
    
    this.setPosition(ms.SCREEN_W+32, ms.SCREEN_H/2);
    this.vx = 0;
    this.on('enterframe', function() {
      this.x -= this.vx;
      // テスト用
      if (this.x < -32) this.x = ms.SCREEN_W+32;
    })
  }
});

phina.define('ms.Field', {
  superClass: 'phina.display.Sprite',
  init: function() {
    this.superInit('field');
    this.setScale(2);
    this.setOrigin(0, 0);

    this.on('enterframe', function() {
      if (this.x < -384) this.x += 768;
    });
  }
});

phina.define('ms.MainScene', {
  superClass: 'phina.display.DisplayScene',
  init: function(options) {
    this.superInit(options);
    this.canvas.imageSmoothingEnabled = false;
    this.backgroundColor = '#00d6ff';

    var field1 = ms.Field().addChildTo(this).setPosition(0, 256);
    var field2 = ms.Field().addChildTo(this).setPosition(384, 256);
    
    var player = ms.Player().addChildTo(this)
      .setPosition(ms.SCREEN_W*1/8, ms.SCREEN_H/2);

    var enemyGroup = phina.display.DisplayElement().addChildTo(this);
    ms.Enemy('banaa').addChildTo(enemyGroup);

    var flickable = phina.accessory.Flickable().$extend({
      vertical: false,
      horizontal: false
    }).attachTo(this);

    flickable.on('flickstart', function(e) {
      player.frameAnimation.gotoAndPlay('attack');
    });

    this.on('enterframe', function(e) {
      field1.x -= player.vx;
      field2.x -= player.vx;

      enemyGroup.children.forEach(function(enemy) {
        enemy.x -= player.vx;
      });
    });
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