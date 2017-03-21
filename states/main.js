var Main = function(game){};

var map;
var layer;
var layerTerre;
var layerTop;

var controls = {};
var player;
var playerSpeed = 500;
var facing;

var cameraPos = new Phaser.Point(0, 0);

Main.prototype = {

    create: function() {
    	controls = {
            right: this.input.keyboard.addKey(Phaser.Keyboard.D),
            left: this.input.keyboard.addKey(Phaser.Keyboard.Q),
            up: this.input.keyboard.addKey(Phaser.Keyboard.Z),
            down: this.input.keyboard.addKey(Phaser.Keyboard.S),
            //shoot: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
	    };

	    map = this.add.tilemap('map');  
	    map.addTilesetImage('terrain', 'tileset');

	    layer = map.createLayer('Principal');
	    layerTerre = map.createLayer('Terre');
	    layerTop = map.createLayer('Top');

	    layer.resizeWorld();

	    player = this.add.sprite(150,100,'player');
	    player.anchor.setTo(0.5,0.5);
	    player.frame = 264;
	    
	    player.animations.add('left', [216, 217, 218, 219, 220, 221, 222, 223, 224], 20, true);
	    player.animations.add('right', [264, 265, 266, 267, 268, 269, 270, 271, 272], 20, true);
	    player.animations.add('up', [192, 193, 194, 195, 196, 197, 198, 199, 200], 20, true);
	    player.animations.add('down', [240, 241, 242, 243, 244, 245, 246, 247, 248], 20, true);
	    this.physics.arcade.enable(player);
	    this.camera.follow(player);
	    player.body.collideWorldBounds = true;
	    player.body.bounce.y = 0.2;
    },

    update: function() {
    	if (player.body.velocity.y == 0) {                
        if (player.body.velocity.x < 0) {                    
          player.play('left');                
        }                
        else if (player.body.velocity.x > 0) {                    
          player.play('right');                
        }                
        player.body.velocity.x=0;            
      }            
      if (player.body.velocity.x == 0) {                
        if (player.body.velocity.y < 0) {                    
          player.play('up');                
        }                
        else if (player.body.velocity.y > 0) {                    
          player.play('down');                
        }                
        player.body.velocity.y=0;            
      }

      if (player.body.velocity.x !== 0 && player.body.velocity.y !== 0) {                
        if (player.body.velocity.x < 0 && player.body.velocity.y < 0) {                    
          player.play("upLeft");                
        } else if (player.body.velocity.x > 0 && player.body.velocity.y > 0) {                    
          player.play("downRight");                
        } else if (player.body.velocity.x > 0 && player.body.velocity.y < 0) {                    
          player.play("upRight");                
        } else if (player.body.velocity.x < 0 && player.body.velocity.y > 0) {                    
          player.play("downLeft");                
        }                
        player.body.velocity.set(0, 0);            
      }

      if(controls.left.isDown){
          player.scale.setTo(1,1);
          player.body.velocity.x -= playerSpeed;
          if(facing !== 'left'){
            //player.animations.play('left');
            facing = 'left';
          }
      }
      
      else if(controls.right.isDown){
          player.scale.setTo(1,1);
          player.body.velocity.x += playerSpeed;
          if(facing !== 'right'){
            //player.animations.play('right');
            facing = 'right';
          }
      }

      else{

        if (facing !== 'idle'){
          player.animations.play("idle");
          if (facing == 'left'){
              player.frame = 216;
          }
          else if (facing == 'right'){
              player.frame = 264;
          }
        }
      }

      if(controls.up.isDown){
          player.body.velocity.y -= playerSpeed;
          if(facing !== 'up'){
            //player.animations.play('up');
            facing = 'up';
          }
      }

      else if(controls.down.isDown){
          player.body.velocity.y += playerSpeed;
          if(facing !== 'down'){
            //player.animations.play('down');
            facing = 'down';
          }
      }

      else{

        if (facing !== 'idle'){
          player.animations.play("idle");
          if (facing == 'up'){
              player.frame = 192;
          }
          else if (facing == 'down'){
              player.frame = 240;
          }
        }
      }

      var lerp = 2;
        cameraPos.x += (player.x - cameraPos.x) * lerp;
        cameraPos.y += (player.y - cameraPos.y) * lerp;
        
        this.game.camera.focusOnXY(cameraPos.x, cameraPos.y);
    },

};