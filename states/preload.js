var Preload = function(game){};

Preload.prototype = {

    preload: function(){ 
    	
    	this.load.tilemap('map', 'assets/map/map1.json',null, Phaser.Tilemap.TILED_JSON);
	    this.load.image('tileset', 'assets/tilesets/terrain.png');
	    this.load.spritesheet('player', 'assets/sprites/player.png',64,64);
    },

    create: function(){
        this.game.state.start("GameTitle");
    }
}