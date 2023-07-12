ig.module( 
	'game.entities.wildshark' 
)
.requires(
	'impact.entity'
).defines(function() {

EntityWildshark = ig.Entity.extend({
    size: {x:16, y:16},
    collides: ig.Entity.COLLIDES.NONE,
    checkAgainst: ig.Entity.TYPE.A,
    type: ig.Entity.TYPE.B,
    xp:[0,100],
    lvl:1,
    name:this.id,
    animSheet: null,
    firerate:50,
    timer:0,
    direction:[0,0],
    init: function(x,y,settings) {
        this.parent(x,y,settings)
        if (Object.keys(settings).length === 0) {
            this.animSheet = new ig.AnimationSheet('media/sprites/fullsprites/'+String(Math.round(Math.random()*3))+String(Math.round(Math.random()*3))+String(Math.round(Math.random()*3))+".png", 16,16)
        } else {
            this.xp = settings.xp
            this.lvl = settings.lvl
            this.id = settings.id
            this.name = settings.name
            this.animSheet = new ig.AnimationSheet('media/sprites/fullsprites/'+String(settings.colour)+String(settings.outline)+String(settings.pattern)+".png", 16,16)
    
        }
        this.direction=[0,1]
        this.addAnim('idle', 1, [0])
        this.addAnim('moving', 0.1, [0,1,2,3])
        this.currentAnim=this.anims.moving
        this.anims.moving.angle = Math.atan2(this.direction[1], this.direction[0]) + 1.5708
        this.anims.idle.angle = this.anims.moving.angle
    },
    
    update: function() {

        if (Math.random() < 0.005) {
            this.direction = [Math.random()*2-1, Math.random()*2-1]
            this.vel.x += this.direction[0]*75
            this.vel.y += this.direction[1]*75
        }

        this.vel.y += 75

        if ((this.vel.x > 5 || this.vel.x < -5)||(this.vel.y > 5 || this.vel.y < -5)) {
            this.anims.moving.angle = Math.atan2(this.direction[1], this.direction[0]) + 1.5708
            this.anims.idle.angle = this.anims.moving.angle
            this.currentAnim=this.anims.moving
        } else {
            this.currentAnim=this.anims.idle
        }
        this.parent()
    },
    check: function() {
        var data = String(this.anims.idle.sheet.image.path).split("/")[3].split(".")[0]
        ig.global.sharks.push(breedsharks(ig.global.currentShark.id, {colour: data[0], pattern: data[1], outline: data[2]}))
        this.kill()
    }
    
})

})