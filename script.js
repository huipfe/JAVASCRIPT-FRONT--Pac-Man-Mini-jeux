/** Faire un PACMAN
 * OK 1) Créer un plateau, dynamiquement. 
 * OK 2) Créer son PACMAN 
 * OK 3) Gérer les déplacement. (sans contrainte) 
 * OK 4) Gérer les contraintes de déplacement (pas dans les murs) 
 * OK 5) Pièce à manger
 * OK 6) Gérer les fantomes
 * 7) Déplacer les fantomes : en aléatoire 
 *     - Changement de direction si on rencontre un mur
 *     - Empecher retour au milieu, 
 *     - Ou 
 *     - Direction au hasard, hors mis direction précédente.
 * 8) Gerer la collision entre pac-man et un fantome
 * 9) Gerer les pastilles vertes de puissance (un mode ou pacman peut manger un fantome)
 * 10) Gerer une cerise.
 * ??) Sprite ? Mettre un vrai pacman à la place du point jaune
 */

const gameDiv = document.getElementById("game")
const sizeCaseWitdth = 28
const scoreHTML = document.getElementById("score")
let score = 0;
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

// 
function createLayout() {
    let cptCase = 0
    scoreHTML.innerHTML = score;
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

    generatePhantom()

    // Déplacement des fantomes aléatoire
    setInterval(DeplacePhantom, 1000)
}

//  
function getCaseByIndex(index){
    let caseGame = document.querySelector("[data-numeroCase='" + index + "']");
    return caseGame;
}

// 
function deplacerPacMan(direction) {
    let pacmanDiv = document.querySelector(".pacman")
    let pacManCase = pacmanDiv.dataset.numerocase;
    let caseDestination = null
    switch (direction) {
        case "ArrowUp":
            // Déplacer la case contenant pac-man, de 1 vers le haut
            caseDestination = getNumberCaseDestination(pacManCase, directions.Up);
            break;
        case "ArrowRight":
            // Déplacer la case contenant pac-man, de 1 vers la droite
            caseDestination = getNumberCaseDestination(pacManCase, directions.Right);

            break;
        case "ArrowLeft":
            // Déplacer la case contenant pac-man, de 1 vers la gauche
            caseDestination = getNumberCaseDestination(pacManCase, directions.Left);

            break;
        case "ArrowDown":
            // Déplacer la case contenant pac-man, de 1 vers le bas
            caseDestination = getNumberCaseDestination(pacManCase, directions.Down);        
            break;
        default:
            break;
    };
    if (caseDestination != null) {
        if (checkDirectionWall(caseDestination)) {
            pacmanDiv.classList.remove("pacman");
            caseDestination.classList.add("pacman")
            checkPointEating(caseDestination)
        }
    }
}

// Return faux si je peux pas aller la ou je veux
// return vrai si je peux
function checkDirectionWall (caseDestination)
{
    if (caseDestination.classList.contains("mur")) {
        return false;
    }
    else {

        return true; 
    }
}

// Retourne Vrai, si on est en collision avec un fantome
function checkPhantomCollision(caseDestination) {
    if (caseDestination.classList.contains("fantome")) {
        return true;
    }
    else {

        return false;
    }
}

// 
function checkPointEating(caseDestination){
    if (caseDestination.classList.contains("point")) {
        incrementScore()
        caseDestination.classList.remove("point")
    }
}

// 
function incrementScore () {
score++
scoreHTML.innerHTML = score;
    // let allPoints = layout.filter(1 => 1 == 0);
    let allPoints = layout.filter(l => l == 0);

// console.log(allPoints.length);
if(score == allPoints.length){
    alert("You Win, motherfucker !");
    }
}

// 
function generatePhantom (){
    for(let i = 0; i < 4; i++) {
        // Je récupere les cases possible, qui peuvent supporter la génération d'un fantome
        // Elles ont la classe fantome-area, et n'ont pas la classe fantome
        let casePotentialForPhantom = document.querySelectorAll(".fantome-area:not(.fantome)")

        // Générer un fantome * 4 
        // Parmis les cases dispo, j'en prends une au hasard
        let caseForPhantom = casePotentialForPhantom[getRandomNumber(casePotentialForPhantom.length)];

        // J'ajoute la classe fantome à mon fantome
        caseForPhantom.classList.add("fantome");

    }

}

// 
function getRandomNumber(max){
    return Math.floor(Math.random() * max);
}

// 
function DeplacePhantom(){
    // console.log("Déplacer Fantome")
    // Récuperer tous mes fantomes
    let allPhantom = document.querySelectorAll(".fantome");
    allPhantom.forEach(fantome => {
        let goodDirectionFinded = false

        while(!goodDirectionFinded){
            let direction = null;
            let fantomeCaseId = fantome.dataset.numerocase;
            let previousDirection = fantome.dataset.previousDirection;

                switch (direction) {
                    case 0: //Vers le haut
                        caseDestination = getNumberCaseDestination(fantomeCaseId, directions.Up);
                        break;

                    case 1: //Vers le bas
                        caseDestination = getNumberCaseDestination(fantomeCaseId, directions.Down);
                        break;

                    case 2: //Vers la gauche
                        caseDestination = getNumberCaseDestination(fantomeCaseId, directions.Left);
                        break;

                    case 3: //Vers la droite
                        caseDestination = getNumberCaseDestination(fantomeCaseId, directions.Right);
                        break;
                }
                // Vérifier si je peux aller dans cette direction
                if (checkDirectionWall(caseDestination) 
                && !checkPhantomCollision(caseDestination)
                && checkFantomeNotGoBack (previousDirection, direction)){
                    fantome.classList.remove("fantome");
                    fantome.removeAttribute("data-previous-direction");
                    caseDestination.classList.add("fantome");
                    caseDestination.dataset.previousDirection = direction;
                    goodDirectionFinded = true;
                }
        }
    });
}

// Mon fantome ne retourne pas en arrière
function checkFantomeNotGoBack(previousDirection, direction){
    let canMove = false

    // Si previousDirection est 0, alors direction ne peut pas être 1
    // Si previousDirection est 1, alors direction ne peut pas être 0
    // Si previousDirection est 2, alors direction ne peut pas être 3
    // Si previousDirection est 3, alors direction ne peut pas être 2

    do {
        switch (previousDirection) {
            case 0: // Il est allé vers le haut avant
                // ma direction ne peut pas être 1 => il ne peut pas mnt, aller vers le bas (retour arrière)
                if (direction != 1) {
                    canMove = true;
                }
                break;
            case 1:
                // ma direction ne peut pas être 0
                if (direction != 0) {
                    canMove = true;
                }
                break;
            case 2:
                // ma direction ne peut pas être 3
                if (direction != 3) {
                    canMove = true;
                }
                break;
            case 3:
                // ma direction ne peut pas être 2
                if (direction != 2) {
                    canMove = true;
                }
                break;
        default:
        canMove = true;
    };
        return canMove;
  }  
}
// 
function getNumberCaseDestination(caseActuelle, direction){
    let caseDestination = null;
    switch (direction) {
        case directions.Up:
            // Déplacer la case contenant pac-man, de 1 vers le haut
            caseDestination = getCaseByIndex(parseInt(caseActuelle) - sizeCaseWitdth)
            break;
        case directions.Right:
            // Déplacer la case contenant pac-man, de 1 vers la droite
            caseDestination = getCaseByIndex(parseInt(caseActuelle) + 1)

            break;
        case directions.Left:
            // Déplacer la case contenant pac-man, de 1 vers la gauche
            caseDestination = getCaseByIndex(parseInt(caseActuelle) - 1)

            break;
        case directions.Down:
            // Déplacer la case contenant pac-man, de 1 vers le bas
            caseDestination = getCaseByIndex(parseInt(caseActuelle) + sizeCaseWitdth)
            break;
        default:
            break;
    };
    return caseDestination;
}

// 
const directions = {
    Up : 0,
    Down : 1,
    Right : 2,
    Left : 3
};