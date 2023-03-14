/** Faire un PACMAN
 * OK 1) Créer un plateau, dynamiquement. 
 * OK 2) Créer son PACMAN 
 * OK 3) Gérer les déplacement. (sans contrainte) 
 * OK 4) Gérer les contraintes de déplacement (pas dans les murs) 
 * 5) Pièce à manger
 * 6) Gérer les fantomes
 * 7) Sprite ? Mettre un vrai pacman à la place du point jaune
 */

const gameDiv = document.getElementById("game")
const sizeCaseWitdth = 28
const layout = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
];

/**Signification Number of Array 
 * 0 - Pac-dots
 * 1 - wall
 * 2 - ghost-lair
 * 3 - power-pellet
 * 4 - empty
*/

createLayout();

document.addEventListener("keydown", (event) => {
        deplacerPacMan(event.key); 
}); 

function createLayout() {
    let cptCase = 0
    layout.forEach(caseLayout => {
    let casePlateau = document.createElement("div"); 
    casePlateau.dataset.numerocase = cptCase;
    // .innerHTML = caseLayout;
    // Si case layout vaut 1, alors
    switch(caseLayout){
        case 0 :
            casePlateau.classList.add("point");
            break;
        case 1 : 
            casePlateau.classList.add("mur");
            // ça me dessine les mur du plateau
            break;
        case 2 :
            casePlateau.classList.add("fantome-area");
            break;
        case 3 :
            casePlateau.classList.add("point-puissance");
            break;
        case 4 :
            
            break;

        }
    gameDiv.appendChild(casePlateau);
    cptCase++;

    });
    // let caseDepart = document.querySelector("[data-numeroCase='"+489+"']");
    getCaseByIndex(489).classList.add("pacman");
}

function getCaseByIndex(index){
    let caseGame = document.querySelector("[data-numeroCase='" + index + "']");
    return caseGame;
}

function deplacerPacMan(direction) {
    let pacmanDiv = document.querySelector(".pacman")
    let pacManCase = pacmanDiv.dataset.numerocase;
    let caseDestination = null
    switch (direction) {
        case "ArrowUp":
            // Déplacer la case contenant pac-man, de 1 vers le haut
            caseDestination = getCaseByIndex(parseInt(pacManCase) - sizeCaseWitdth)
            break;
        case "ArrowRight":
            // Déplacer la case contenant pac-man, de 1 vers la droite
            caseDestination = getCaseByIndex(parseInt(pacManCase) + 1)

            break;
        case "ArrowLeft":
            // Déplacer la case contenant pac-man, de 1 vers la gauche
            caseDestination = getCaseByIndex(parseInt(pacManCase) - 1 )

            break;
        case "ArrowDown":
            // Déplacer la case contenant pac-man, de 1 vers le bas
            caseDestination = getCaseByIndex(parseInt(pacManCase) + sizeCaseWitdth)          
            break;
        default:
            break;
    };
    if (caseDestination != null) {
        if (checkDirection(caseDestination)) {
            pacmanDiv.classList.remove("pacman");
            caseDestination.classList.add("pacman")
        }
    }
}

// Return faux si je peux pas aller la ou je veux
// return vrai si je peux
function checkDirection (caseDestination)
{
    if (caseDestination.classList.contains("mur")) {
        return false;
    }
    else {
        return true; 
    }
}