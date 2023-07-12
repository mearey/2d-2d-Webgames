ig.module( 
	'game.entities.character' 
)
.requires(
	'impact.entity',
    'game.levels.ocean'
).defines(function() {

EntityCharacter = ig.Entity.extend({
    size: {x:16, y:16},
    collides: ig.Entity.COLLIDES.FIXED,
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
        this.addAnim('idle', 1, [0])
        this.addAnim('moving', 0.1, [0,1,2,3])
    },
    
    update: function() {
        //stop sharks from leaving
        if (this.pos.x < 0) {
            this.pos.x=40
        }
        if (this.pos.x>200) {
            this.pos.x=160
        }
        if (this.pos.y < 0) {
            this.pos.y=40
        }
        if (this.pos.y>200) {
            this.pos.y=160
            console.log("bounds")
        }
        


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

        if (
            ig.input.pressed('my_click') &&
            this.pos.x < ig.input.mouse.x &&
            ig.input.mouse.x < this.pos.x + 16 &&
            this.pos.y < ig.input.mouse.y &&
            ig.input.mouse.y < this.pos.y + 16
            ) {
                generateMenu(this);
        }

        if (ig.input.pressed('my_click')) {
            this.direction = [this.pos.x - ig.input.mouse.x + (Math.random()*100-50), this.pos.y - ig.input.mouse.y + (Math.random()*100-50)]
            this.vel.x = this.direction[0]/2
            this.vel.y = this.direction[1]/2
        }

        if (Math.random() < 0.005) {
            this.direction = [Math.random()*2-1, Math.random()*2-1]
            this.vel.x = this.direction[0]*75
            this.vel.y = this.direction[1]*75
        }

        if ((this.vel.x > 5 || this.vel.x < -5)||(this.vel.y > 5 || this.vel.y < -5)) {
            this.anims.moving.angle = Math.atan2(this.direction[1], this.direction[0]) + 1.5708
            this.anims.idle.angle = this.anims.moving.angle
            this.currentAnim=this.anims.moving
        } else {
            this.currentAnim=this.anims.idle
        }
        this.parent()
    }
    
})

})


function generateMenu(e) {
    var menu = document.createElement("menu")
    menu.className = "menu"
    menu.id = "overlay"

    //display name
    var div = document.createElement("input")
    div.id = "name"
    div.className = "input"
    div.type="text"
    div.style="margin-top:25px;width:50%"
    div.placeholder=e.name
    div.oninput = function () {
        ig.game.entities.forEach(entity=> {
            if (entity.id === e.id) {
                entity.name = document.getElementById("name").value
            }
        })
        ig.global.sharks.forEach(element => {
            if (element.id === e.id) {
                element.name = document.getElementById("name").value
            }
        })
    }
    menu.appendChild(div)

    //display lvl and xp
    var div = document.createElement("div")
    div.className = "div"
    div.textContent="xp: "+e.xp
    menu.appendChild(div)

    //display lvl and xp
    var div = document.createElement("div")
    div.className = "div"
    div.textContent="lvl: "+e.lvl
    menu.appendChild(div)

    //xBUTTON element
    var xButton = document.createElement("button")
    xButton.style = "position:absolute;right:10px;top:10px"
    xButton.onclick = function() {document.getElementById('overlay').remove()};
    xButton.textContent = "X"
    menu.appendChild(xButton)

    //display image of shark :3
    var image = e.anims.idle.sheet.image.path
    var iamgeelem = document.createElement("img")
    $(iamgeelem).attr("src", image)
    iamgeelem.style="height:64px; width:64px; object-fit: cover; object-position: 0 0; image-rendering: pixelated;"
    menu.appendChild(iamgeelem)

    //go to ocean button element
    var oceanButton = document.createElement("button")
    oceanButton.style = "position:absolute;right:10px;bottom:10px"
    oceanButton.onclick = function() {
        ig.game.loadLevel(LevelOcean)
        document.getElementById('overlay').remove()
    };
    ig.global.currentShark=e
    oceanButton.textContent = "Go to ocean :3"
    menu.appendChild(oceanButton)
    
    //breeding button
    var breedingButton = document.createElement("button")
    var breedingText = document.createElement("div")
    breedingText.id = "breedingtext"
    menu.append(breedingText)
    breedingButton.id = "breedingbutton"
    breedingButton.style = "position:absolute;left:10px;bottom:10px"
    breedingButton.onclick = function() {
        if (e.lvl < 4) {
            document.getElementById("breedingtext").textContent = "must be lvl 4 to breed"
        } else {
            //BREED
            ig.game.entities.forEach(entity=> {
                if (entity.id !== e.id && entity.animSheet !== null) {
                    var sharkoption = document.createElement("img")
                    sharkoption.style="height:64px; width:64px; object-fit: cover; object-position: 0 0; image-rendering: pixelated;"
                    sharkoption.src = entity.anims.idle.sheet.image.path
                    sharkoption.onclick = function() {
                        var newshark = breedsharks(e.id, entity.id)
                        ig.game.spawnEntity(EntityCharacter,75,75, newshark)
                        ig.global.sharks.push(newshark)
                        document.getElementById('overlay').remove()
                    }
                    document.getElementById("overlay").append(sharkoption)
                }
            })
        }
        document.getElementById("breedingbutton").remove()
        
    };
    breedingButton.textContent = "Breed"
    menu.appendChild(breedingButton)

    document.body.append(menu)
}