function openpools() {
    var menu = document.createElement("poolselect")
    menu.className = "poolselect"
    menu.id = "poolselect"

    //xBUTTON element
    var xButton = document.createElement("button")
    xButton.style = "position:absolute;right:10px;top:10px"
    xButton.onclick = function() {document.getElementById('poolselect').remove()};
    xButton.textContent = "X"
    menu.appendChild(xButton)

    //pool1 element
    var xButton1 = document.createElement("button")
    xButton1.style = "width:50%"
    xButton1.onclick = function() {
        ig.global.currentPool = 1
        ig.game.loadLevelDeferred(LevelLevel1)
        document.getElementById('poolselect').remove()
    };
    xButton1.textContent = "pool 1"
    menu.appendChild(xButton1)

    //pool2 element
    var xButton2 = document.createElement("button")
    xButton2.style = "width:50%"
    xButton2.onclick = function() {
        ig.global.currentPool = 2
        ig.game.loadLevelDeferred(LevelPool2)
        document.getElementById('poolselect').remove()
    };
    xButton2.textContent = "pool 2"
    menu.appendChild(xButton2)

    document.getElementById("bottommenu").append(menu)
}