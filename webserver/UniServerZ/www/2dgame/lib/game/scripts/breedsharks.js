function breedsharks(shark1, shark2) {
    var sharklist
    switch (ig.global.currentPool) {
        case 1:
            sharklist = ig.global.sharks
            break;
        case 2:
            sharklist = ig.global.sharks2
            break;
    }
    sharklist.forEach(item => {
        if (item.id === shark1) {
            shark1=item
        }
        if (item.id === shark2) {
            shark2=item
        }
    });
    var newcolour
    var newpattern
    var newoutline
    if (Math.random()<0.5) {
        newcolour=shark1.colour
    } else {
        newcolour=shark2.colour
    }
    if (Math.random()<0.5) {
        newpattern=shark1.pattern
    } else {
        newpattern=shark2.pattern
    }
    if (Math.random()<0.5) {
        newoutline=shark1.outline
    } else {
        newoutline=shark2.outline
    }
    var last = 0
    ig.global.sharks.forEach(element => {
        if (element.id>last) {
            last = element.id
        }
    });
    return {colour: newcolour, pattern: newpattern, outline: newoutline, xp:0, lvl:1, id:last+1,name:"shark"}
}  