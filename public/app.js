
const gameSet = document.getElementById('gameSet');
const playTo = document.getElementById('playTo');

const remathBtn = document.getElementById('rematchBtn');
const saveBtn = document.getElementById('saveBtn');
const nextBtn = document.getElementById('nextBtn');

// const t1Score = document.getElementById('t1Score');
// const t2Score = document.getElementById('t2Score');
// const t1Table = document.getElementById('t1Table');
// const t2Table = document.getElementById('t2Table');

const scoreTable = document.getElementById('scoreTable');
const tableHead = document.getElementById('tableHead');

const resetBtn = document.getElementById('resetBtn');
const allScore = document.querySelectorAll('.cl-score');    //for resetting all score

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
        this.table = document.getElementById(t+'Table');
        
        this.inputText = document.getElementById(t+'NameInput');
        this.scoreText = document.getElementById(t+'Score');
        
        this.teamBtn = document.getElementById(t+'Button');
        this.plusBtn = document.getElementById(t+'Plus');
        this.minusBtn = document.getElementById(t+'Minus');
        this.editor = document.getElementById(t+'Edit');
        this.adder = document.getElementById(t+'Add');
        this.remover = document.getElementById(t+'Remove');

        this.mates = document.getElementById(t+'Mates');
    }
}

t1 = new teams('t1');
t2 = new teams('t2');

/*-------------------------------
     Controllers about:
        1. game setting
        2. score table
        3. resetting all score
---------------------------------*/
gameSet.addEventListener('change', function () {
    const games = parseInt(this.value);
    tableControl(games, tableHead);
    tableControl(games, t1.table);
    tableControl(games, t2.table);
    btnController(games);
})

resetBtn.addEventListener('click', (e) => {
    e.preventDefault();
    resetAllScore();
})

// show or hide table elements
const tableControl = (games, tb) => {
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

// reset all score
const resetAllScore = () => {
    const games = parseInt(gameSet.value);
    btnController(games);

    for(let i of allScore) {
        i.innerText = '0';
    }
}

// show or hide the saving botton and next game button
const btnController = (games) => {
    if(games === 1) {
        nextBtn.classList.add('collapse');
        saveBtn.classList.remove('collapse');
    } else {
        nextBtn.classList.remove('collapse');
        saveBtn.classList.add('collapse');
    }
}

/*---------------------
    Score controllers:
        1. plus
        2. minus
        3. deuce
----------------------*/




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