ig.module( 
	'game.entities.controlableShark' 
)
.requires(
	'impact.entity'
).defines(function() {

EntityControlableShark = ig.Entity.extend({
    size: {x:16, y:16},
    collides: ig.Entity.COLLIDES.NONE,
    checkAgainst: ig.Entity.TYPE.B,
    type: ig.Entity.TYPE.A,
    name:"shark1",
    animSheet: null,
    direction:[0,0],
    checkAgainst: ig.Entity.TYPE.B,
    init: function(x,y,settings) {
        //this.animSheet = new ig.AnimationSheet("lib/media/fullsprites/000.png",16,16)
        this.parent(x,y,settings)
        this.animSheet = new ig.AnimationSheet(ig.global.currentShark.animSheet.image.path,16,16)
        this.xp = ig.global.currentShark.xp
        this.lvl = ig.global.currentShark.lvl
        this.id = ig.global.currentShark.id
        this.name = ig.global.currentShark.name
        this.addAnim('idle', 1, [0])
        this.addAnim('moving', 0.1, [0,1,2,3])
        div = document.createElement("div")
        div.id = "xp"
        div.textContent = "xp: "+String(this.xp)
        div.style="margin-left:25px"
        document.getElementById("bottommenu").append(div)
        div = document.createElement("div")
        div.id = "lvl"
        div.textContent = "lvl: "+String(this.lvl)
        div.style="margin-left:25px"
        document.getElementById("bottommenu").append(div)
    },

    update: function() {
        if (this.vel.x > 0) {
            this.vel.x-=0.5
        }
        if (this.vel.x < 0) {
            this.vel.x+=0.5
        }
        if (this.vel.y > 0) {
            this.vel.y-=0.5
        }
        if (this.vel.y < 0) {
            this.vel.y+=0.5
        }

        this.direction = [ig.input.mouse.x-8 - this.pos.x, ig.input.mouse.y - this.pos.y]
        this.vel.x += this.direction[0]/10
        this.vel.y += this.direction[1]/10
        this.vel.y += 1

        if ((this.vel.x > 5 || this.vel.x < -5)||(this.vel.y > 5 || this.vel.y < -5)) {
            this.anims.moving.angle = Math.atan2(this.direction[1], this.direction[0]) + 1.5708
            this.anims.idle.angle = this.anims.moving.angle
            this.currentAnim=this.anims.moving
        } else {
            this.currentAnim=this.anims.idle
        }
        ig.global.sharks.forEach(item => {
            if (item.id == this.id) {
                item.xp = this.xp
                item.lvl = this.lvl
            }
        })
        if (ig.global.gotkill===true) {
            ig.global.gotkill=false
            if (this.xp >= this.lvl*this.lvl*10) {
                this.lvl+=1
                this.xp=0
                document.getElementById("xp").textContent = "xp: "+String(this.xp)
                document.getElementById("lvl").textContent = "lvl: "+String(this.lvl)
            }
            this.xp+=10
            //update xp and lvl on html page
            document.getElementById("xp").textContent = "xp: "+String(this.xp)
        }
        this.parent()
        
    },
    
})

})
