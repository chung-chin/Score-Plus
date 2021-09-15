
const gameSet = document.getElementById('gameSet');
let gameMax = parseInt(gameSet.value);
const playTo = document.getElementById('playTo');
let scoreMax = parseInt(playTo.value);

let endGame = false;
let gCurrent = 1;   // current games
let deuce = false;

const rematchBtn = document.getElementById('rematchBtn');
const saveBtn = document.getElementById('saveBtn');
const nextBtn = document.getElementById('nextBtn');

// const t1Score = document.getElementById('t1Score');
// const t2Score = document.getElementById('t2Score');
// const t1Table = document.getElementById('t1Table');
// const t2Table = document.getElementById('t2Table');

const scoreTable = document.getElementById('scoreTable');
const tableHead = document.getElementById('tableHead');
const deuceBar = document.getElementById('deuceBar');
const winBar = document.getElementById('winBar');

const cleanBtn = document.getElementById('cleanBtn');
const allScore = document.querySelectorAll('.cl-score');    // for cleaning all score

// const t1Plus = document.getElementById('t1Plus');
// const t1Minus = document.getElementById('t1Minus');
// const t2Plus = document.getElementById('t2Plus');
// const t2Minus = document.getElementById('t2Minus');

// const t1 = {
//     teamBtn: document.getElementById('t1Button'),

//     nameInput: document.getElementById('t1NameInput'),
//     editor: document.getElementById('t1Edit'),
//     adder: document.getElementById('t1Add'),
//     remover: document.getElementById('t1Remove'),

//     mates: document.getElementById('t1Mates')
// }

// const t2 = {
//     teamBtn: document.getElementById('t2Button'),

//     nameInput: document.getElementById('t2NameInput'),
//     editor: document.getElementById('t2Edit'),
//     adder: document.getElementById('t2Add'),
//     remover: document.getElementById('t2Remove'),

//     mates: document.getElementById('t2Mates')
// }

class teams {
    constructor(t) {
        this.score = 0;

        this.table = document.getElementById(t+'Table');    // score table
        
        this.inputText = document.getElementById(t+'NameInput');
        this.scoreValue = document.getElementById(t+'Score');
        
        this.teamBtn = document.getElementById(t+'Button'); // team name & toolbar
        this.plusBtn = document.getElementById(t+'Plus');
        this.minusBtn = document.getElementById(t+'Minus');

        this.editor = document.getElementById(t+'Edit');    // edit team name
        this.adder = document.getElementById(t+'Add');  // add a team member
        this.remover = document.getElementById(t+'Remove'); // remove the last team member

        this.mates = document.getElementById(t+'Mates');    // teammates list
    }
}

t1 = new teams('t1');   // team 1
t2 = new teams('t2');   // team 2

/*-------------------------------
     Controllers about:
        1. game setting
        2. score table
        3. clean all score
---------------------------------*/
gameSet.addEventListener('change', function () {
    gameMax = parseInt(this.value);
    gCurrent = 1;
    setTable(gameMax, tableHead);
    setTable(gameMax, t1.table);
    setTable(gameMax, t2.table);
    cleanAllScore();
    setButton(gameMax);
})

playTo.addEventListener('change', () => {
    scoreMax = parseInt(playTo.value);
    setButton(gameMax);
    cleanAllScore();
})

cleanBtn.addEventListener('click', (e) => {
    e.preventDefault();
    gameMax = parseInt(gameSet.value);
    gCurrent = 1;
    setButton(gameMax);
    cleanAllScore();
})

// show or hide table elements
const setTable = (games, tb) => {
    if (games === 1) {
        for(let i of tb.children) {
            i.classList.add('collapse');
        }
    } else if(games === tb.childElementCount) {
        for(let j of tb.children) {
            j.classList.remove('collapse');
        }
    } else {
        for(let k=0; k<games; k++) {
            tb.children[k].classList.remove('collapse');
        }
        for(let m=games; m<tb.childElementCount; m++) {
            tb.children[m].classList.add('collapse');
        }
    }
}

// show or hide save botton & next game button
const setButton = (games) => {
    if( games === gCurrent) {
        nextBtn.classList.add('collapse');
        saveBtn.classList.remove('collapse');
    } else {
        nextBtn.classList.remove('collapse');
        saveBtn.classList.add('collapse');
    }
}

// clean all score
const cleanAllScore = () => {
    for(let i of allScore) {
        i.value = 0;
        i.innerText = '0';
    }
    setButton(gameMax);
    rematch();
}

// highlight table head
const highlightTable = (gNext) => {
    if(gNext === 0) {
        tableHead.children[gCurrent-1].classList.remove('table-dark');
        tableHead.children[0].classList.add('table-dark');
    }
    tableHead.children[gCurrent].classList.remove('table-dark');
    tableHead.children[gNext].classList.add('table-dark');
}


/*---------------------
    Score controllers:
        1. plus
        2. minus
        3. deuce
        4. rematch
----------------------*/
t1.plusBtn.addEventListener('click', () => {
    plusOne(t1, t2);
})

t1.minusBtn.addEventListener('click', () => {
    minusOne(t1, t2);
})

t2.plusBtn.addEventListener('click', () => {
    plusOne(t2, t1);
})

t2.minusBtn.addEventListener('click', () => {
    minusOne(t2, t1);
})

rematchBtn.addEventListener('click', () => {
    rematch();
    setButton(gameMax);
})


function plusOne(team, another) {
    if( !endGame ){
        team.score++;
        team.minusBtn.disabled = false;
        team.scoreValue.value = team.score;
        if( !deuce ) {
            deuceCheck();
            if(team.score === scoreMax) {
                ending(1);
            }
        } else if(deuce && team.score > another.score+1) {
            another.minusBtn.disabled = true;
            ending(1);
            deuceCheck();
        }
    }
}

function minusOne(team, another) {
    if( endGame ) {
        if( team.score === scoreMax) {
            team.score--;
            team.scoreValue.value = team.score;
            ending(0);
        } else {
            team.score--;
            team.scoreValue.value = team.score;
            deuceCheck();
            another.minusBtn.disabled = false;
            ending(0);
        }
    } else {
        if(deuce) {
            team.score--;
            team.scoreValue.value = team.score;
            deuceCheck();
            if(another.score === scoreMax | team.score >= scoreMax && !deuce) {
                team.minusBtn.disabled = true;
                ending(1);
            }
        } else {
            team.score--;
            team.scoreValue.value = team.score;
        }
    }

    if( team.score === 0) {
        team.minusBtn.disabled = true;
    }
}

// end game setting
function ending(i) {
    t1.plusBtn.disabled = i;
    t2.plusBtn.disabled = i;
    endGame = !!i;
    saveBtn.disabled = !i;
    nextBtn.disabled = !i;
    if(endGame) {
        winBar.classList.remove('collapse');
    } else {
        winBar.classList.add('collapse');
    }
}

function deuceCheck() {
    if(t1.score >= scoreMax-1 && t2.score >= scoreMax-1 && Math.abs(t1.score-t2.score)<2 ) {
        deuceBar.classList.remove('collapse');
        deuce = true;
    } else {
        deuceBar.classList.add('collapse');
        deuce = false;
    }
}

// clean current score
function rematch() {
    for(let i of [t1, t2]) {
        i.score = 0;
        i.scoreValue.value = 0;
        i.minusBtn.disabled = true;
        ending(0)
        deuceCheck();
    }
}

/*-----------------------------
    Team controllers:
        1. edit team name
        2. add team member
        3. remove team member
------------------------------*/
// Team 1
t1.editor.addEventListener('click', (e) => {
    e.preventDefault();
    editTeamName(t1.teamBtn, t1.inputText, 'Team 1');
})

t1.adder.addEventListener('click', (e) => {
    e.preventDefault();
    addTeamMate(t1.mates, t1.inputText)
})

t1.remover.addEventListener('click', (e) => {
    e.preventDefault();
    rmTeamMate(t1.mates);
})

// Team 2
t2.editor.addEventListener('click', (e) => {
    e.preventDefault();
    editTeamName(t2.teamBtn, t2.inputText, 'Team 2');
})

t2.adder.addEventListener('click', (e) => {
    e.preventDefault();
    addTeamMate(t2.mates, t2.inputText)
})

t2.remover.addEventListener('click', (e) => {
    e.preventDefault();
    rmTeamMate(t2.mates);
})

// Edit team name
const editTeamName = (team, name, defaultName) => {
    if (name.value === '') {
        team.innerText = defaultName;
    } else {
        team.innerText = name.value;
        name.value = '';
    }
}

// Add a team member
const addTeamMate = (team, name) => {
    if (name.value !== '') {
        const newPlayer = document.createElement('li');
        newPlayer.append(name.value);
        team.append(newPlayer);
        name.value = '';
    }
}

// Remove the last team member
const rmTeamMate = (team) => {
    if (team.lastElementChild !== null) {
        team.lastElementChild.remove();
    }
}