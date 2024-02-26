

var PNOIR = "N";
var PPURPLE = "P";
var JOUEUR = PNOIR;
var FIN = false;
var bords;
var rangées = 6;
var colonnes = 7;

window.onload = function() {
    setGame();
}
function setGame(){
    // Initialisation des variables globales et du tableau de jeu
    bords =[];

    for (let r = 0; r < rangées; r++) {
        let ligne = [];
        for(let c = 0; c < colonnes; c++){
            //JS
            ligne.push(' ');
            //HTML
            // <div id = "0-0" class = "tile"></div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("bords").append(tile);
        }
        bords.push(ligne);
    }
}

function setPiece(){
    if(FIN){
        return;
    }
    let coord = this.id.split("-"); // "0-0" -> ["0","0"]
    let r = parseInt(coord[0]);
    let c = parseInt(coord[1]);

bords[r][c] = JOUEUR ; // On place la pièce sur cette case
    let tile = this;
    if(JOUEUR == PNOIR){
        tile.classList.add("piece-noire");
        JOUEUR = PPURPLE;
    }
    else {
        tile.classList.add("piece-purple")
        JOUEUR = PNOIR;
    }
}
