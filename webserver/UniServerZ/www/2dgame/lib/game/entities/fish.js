ig.module( 
	'game.entities.fish' 
)
.requires(
	'impact.entity'
).defines(function() {

EntityFish = ig.Entity.extend({
    size: {x:16, y:16},
    collides: ig.Entity.COLLIDES.NONE,
    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,
    animSheet:new ig.AnimationSheet("media/sprites/fish.png",16,16),
    init: function(x,y,settings) {
        this.parent(x,y,settings)
        this.addAnim('idle', 0.1, [0,1])
        this.currentAnim=this.anims.idle
    },
    
    update: function() {
        this.currentAnim=this.anims.idle
        this.vel.y += 100
        
        this.direction = [Math.random()*200-100, Math.random()*200-100]
        this.vel.x += this.direction[0]/10
        this.vel.y += this.direction[1]/30
        this.vel.y += 1

        this.parent()
    },

    check: function() {
        ig.global.gotkill=true;
        this.kill()
    }
    
    
})

})