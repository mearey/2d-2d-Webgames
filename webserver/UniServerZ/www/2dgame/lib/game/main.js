ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',

	'game.entities.character',

	'game.levels.level1',
	'game.levels.pool2'
)
.defines(function(){

MyGame = ig.Game.extend({
	currentShark:null,
	sharks:[{colour:0,pattern:0,outline:0,xp:0,lvl:1,id:0}],
	sharks2:[],
	currentPool:1,
	gotkill:false,
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	
	init: function() {
		ig.global.currentPool = 1
		ig.input.bind( ig.KEY.MOUSE1, 'my_click');
		this.loadLevel(LevelLevel1);
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
	}
	
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
var scale
if (window.innerHeight < window.innerWidth) {
	scale = Math.floor(((window.innerHeight*0.8)/200)*1)/1
} else {
	scale = Math.floor((window.innerWidth/200)*1)/1
}
ig.main( '#canvas', MyGame, 60, 200, 200, scale);

});
