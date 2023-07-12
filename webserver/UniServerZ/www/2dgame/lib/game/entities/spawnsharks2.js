ig.module( 
	'game.entities.spawnsharks2' 
)
.requires(
	'impact.entity',
    'game.entities.character'
).defines(function() {

EntitySpawnsharks2 = ig.Entity.extend({
    spawn:false,
    init: function(x,y,settings) {
        this.spawn=false
    },
    
    update: function() {
        if (this.spawn == false){
            if (ig.global.sharks2 == undefined) {
                ig.global.sharks2 = []
            }
            ig.global.sharks2.forEach(item => {
                ig.game.spawnEntity(EntityCharacter, 75, 75, item) 
            })
            this.spawn = true
        }
    }
    
})

})