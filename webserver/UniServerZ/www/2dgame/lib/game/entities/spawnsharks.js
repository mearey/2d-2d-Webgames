ig.module( 
	'game.entities.spawnsharks' 
)
.requires(
	'impact.entity',
    'game.entities.character'
).defines(function() {

EntitySpawnsharks = ig.Entity.extend({
    spawn:false,
    init: function(x,y,settings) {
        this.spawn=false
    },
    
    update: function() {
        if (this.spawn == false){
            if (ig.global.sharks == undefined) {
                ig.global.sharks = [{colour:0,pattern:0,outline:0,xp:0,lvl:4,id:0,name:"shark"}, {colour:1,pattern:1,outline:1,xp:0,lvl:4,id:1,name:"shark"}]
            }
            ig.global.sharks.forEach(item => {
                ig.game.spawnEntity(EntityCharacter, Math.random()*160+20, Math.random()*160+20, item)
            })
            this.spawn = true
        }
    }
    
})

})