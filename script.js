const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');

document.getElementsByTagName("BODY")[0].style.cursor = "url(hammerup.png), auto"
document.getElementsByTagName("BODY")[0].onmousedown = ()=>{
document.getElementsByTagName("BODY")[0].style.cursor = "url(hammerdown.png), auto"
}
document.getElementsByTagName("BODY")[0].onmouseup = ()=>{
document.getElementsByTagName("BODY")[0].style.cursor = "url(hammerup.png), auto"
}
let lastHole;
let timeUp = false;
let score = 0;

//create a function to make a random time for mole to pop from the hole
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes){
    const index  = Math.floor(Math.random() * holes.length);
    const hole = holes[index];

    //prevent same hole from getting the same number
    if (hole === lastHole){
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep(a,b) {
    const time = randomTime(a, b); //get a random time to determine how long mole should peep
    const hole = randomHole(holes); //get the random hole from the randomHole function
    hole.classList.add('up'); //add the CSS class so selected mole can "pop up"
    setTimeout(() => {
        hole.classList.remove('up'); //make the selected mole "pop down" after a random time
        if(!timeUp) {
           if(parseInt(scoreBoard.textContent)>80 && parseInt(scoreBoard.textContent)<150) {
                peep(1000, 1500);
           }
           else if(parseInt(scoreBoard.textContent) > 150) {
                peep(500, 1000);
           }
           else {
                peep(1500, 2000);
           }
        }
        else {
            document.getElementById('btn').classList.remove('hidden');
        }
    }, time);
}

function startGame() {
    document.getElementById('btn').classList.add('hidden');
    document.getElementById('score').style.backgroundColor = 'blue';
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep(1500, 2000);
    setTimeout(() => timeUp = true, 30000);
}

function wack(e){
    if(!e.isTrusted) return; //** new thing I learned */
    score+=10;
    this.parentNode.classList.remove('up'); //this refers to item clicked
    scoreBoard.textContent = score;
    if(parseInt(scoreBoard.textContent)>80 && parseInt(scoreBoard.textContent)<150) {
        document.getElementById('score').style.backgroundColor = "yellow";
    }
    else if(parseInt(scoreBoard.textContent)>150) {
        document.getElementById('score').style.backgroundColor = "red";
    }
}

moles.forEach(mole => mole.addEventListener('click', wack))

