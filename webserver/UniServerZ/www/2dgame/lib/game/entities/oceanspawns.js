ig.module( 
	'game.entities.oceanspawns' 
)
.requires(
	'impact.entity',
    'game.entities.fish',
    'game.entities.wildshark'
).defines(function() {

EntityOceanspawns = ig.Entity.extend({
    init: function(x,y,settings) {
        
    },
    
    update: function() {
        var random = (Math.random()*100)

        if (random <= 20 && random >= 18) {
            ig.game.spawnEntity(EntityFish, Math.random()*180+5, -16)
        }

        if (random <= 1 && random >= 0.8) {
            ig.game.spawnEntity(EntityWildshark, Math.random()*180+5, -100)
        }
    }
    
})

})