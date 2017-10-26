var ms = ms || {};

ms.SCREEN_W = 320;
ms.SCREEN_H = 480;
ms.ASSETS = {
  image: {
    poniko: './assets/img/poniko.png',
    banaa: './assets/img/banaa.png',
    dragon: './assets/img/dragon.png',
    slimusi: './assets/img/slimusi.png',
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
      .attachTo(this).gotoAndPlay('walk');
    
    this.vx = 1;
    this.vy = 0;
    this.isAttacking = false;

    this.on('enterframe', function() {
      if (!this.isAttacking) return;
      this.y -= this.vy;
      this.vy -= 2;
      if (this.y < ms.SCREEN_H/2) return;
      this.$extend({
        y: ms.SCREEN_H/2,
        isAttacking: false,
        vy: 0
      });
      this.tweener.clear()
        .wait(200)
        .call(function() {
          this.vx = 1;
        }, this);
    });
  },
  attack: function() {
    this.tweener.clear();
    this.frameAnimation.gotoAndPlay('attack');
    this.isAttacking = true;
    this.vy = 10;
    this.vx = 0;
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
    this.vy = 0;
    this.on('enterframe', function() {
      // テスト用
      if (this.x < -32) this.x = ms.SCREEN_W+32;

      if (!this.isAttacked) return;
      this.y -= this.vy;
      this.vy -= 2;
      if (this.y < ms.SCREEN_H/2) return;
      this.$extend({
        y: ms.SCREEN_H/2,
        isAttacked: false,
        vx: 0,
        vy: 0
      });
    });
  },
  damage: function() {
    this.isAttacked = true;
    this.vy = 10;
    this.vx = -10;
  }
});

phina.define('ms.Field', {
  superClass: 'phina.display.Sprite',
  init: function() {
    this.superInit('field');
    this.setScale(2);
    this.setOrigin(0, 0);

    this.on('enterframe', function() {
      if (this.x < -640) this.x += 1280;
    });
  }
});

phina.define('ms.MainScene', {
  superClass: 'phina.display.DisplayScene',
  init: function(options) {
    this.superInit(options);
    this.canvas.imageSmoothingEnabled = false;
    this.backgroundColor = '#00d6ff';

    var field1 = ms.Field().addChildTo(this).setPosition(0, 204);
    var field2 = ms.Field().addChildTo(this).setPosition(640, 204);
    
    var player = ms.Player().addChildTo(this)
      .setPosition(ms.SCREEN_W*1/8, ms.SCREEN_H/2);

    var enemyGroup = phina.display.DisplayElement().addChildTo(this);
    var enemy = ms.Enemy('banaa').addChildTo(enemyGroup);

    var flickable = phina.accessory.Flickable().$extend({
      vertical: false,
      horizontal: false
    }).attachTo(this);

    var self = this;
    flickable.on('flickstart', function(e) {
      if (player.isAttacking) return;
      player.attack();
      var moveDistance = -enemy.x+104;
      field1.tweener.clear()
        .by({x: moveDistance}, 200, 'easeOutCubic');
      field2.tweener.clear()
        .by({x: moveDistance}, 200, 'easeOutCubic');
      enemy.tweener.clear()
        .by({x: moveDistance}, 200, 'easeOutCubic');
      
      self.tweener.clear().wait(200)
        .call(function() {
          enemy.damage();
        });
    });

    this.on('enterframe', function(e) {
      if (player.isAttacking) return;
      field1.x -= player.vx;
      field2.x -= player.vx;

      enemyGroup.children.forEach(function(enemy) {
        enemy.x -= enemy.vx + player.vx;
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
    startLabel: 'main',
    runner: requestAnimationFrame
  });
  app.run();
});