let app;

window.onload = function () {


app = new PIXI.Application({
    resizeTo: window,
    backgroundColor: 'black'
});

document.body.appendChild(app.view)

const cursor = PIXI.Sprite.from("./media/images/Bullet.png")

app.stage.addChild(cursor)

cursor.x = app.view.width/2
cursor.y = app.view.height/2
cursor.anchor.set(0.5)

//mouse interactions
app.stage.eventMode = 'dynamic'
document.addEventListener("mousemove", moveCursor)


function moveCursor(e) {
    let pos = e
    cursor.x = pos.x
    cursor.y = pos.y
}

}