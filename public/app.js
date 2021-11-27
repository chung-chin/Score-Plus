
const gameSet = document.getElementById('gameSet');
let gameMax = parseInt(gameSet.value);
const playTo = document.getElementById('playTo');
let scoreMax = parseInt(playTo.value);

let endGame = false;
let gCurrent = 1;   // current games
let deuce = false;
let gameCalled = false;

const sportNav = document.getElementById('score-nav-title');
const sportName = sportNav.innerText.replace(' Score Keeper', '');

const rematchBtn = document.getElementById('rematch-btn');
const nextBtn = document.getElementById('next-btn');
const saveBtn = document.getElementById('save-btn');

const scoreTable = document.getElementById('score-table');
const tableHead = document.getElementById('score-table-head');
const deuceBar = document.getElementById('deuce-bar');
const winBar = document.getElementById('win-bar');

const cleanBtn = document.getElementById('clean-btn');
const allScore = document.querySelectorAll('.cl-score');    // for cleaning all score

class teams {
    constructor(t) {
        this.score_history = [];
        this.score = 0;
        this.goal = 0;
        this.winner = 0;

        this.table = document.getElementById('score-table-'+t);    // score table
        
        this.inputText = document.getElementById(t+'-input');
        this.scoreValue = document.getElementById(t+'-score');
        
        this.teamBtn = document.getElementById(t+'-btn'); // team name & toolbar
        this.plusBtn = document.getElementById(t+'-plus');
        this.minusBtn = document.getElementById(t+'-minus');

        this.editor = document.getElementById(t+'-edit');    // edit team name
        this.adder = document.getElementById(t+'-add');  // add a team member
        this.remover = document.getElementById(t+'-remove'); // remove the last team member

        this.mates = document.getElementById(t+'-mates');    // teammates list
    }
}

t1 = new teams('t1');   // team 1
t2 = new teams('t2');   // team 2

/*-------------------------------
     Game setting:
        1. games
        2. max score
        3. rematch
        4. clean all score
        5. next game
        6. save game
---------------------------------*/
gameSet.addEventListener('change', function () {
    gameMax = parseInt(this.value);
    tableIni(tableHead);
    tableIni(t1.table);
    tableIni(t2.table);
    setButton();
    cleanAllScore();
})

playTo.addEventListener('change', () => {
    scoreMax = parseInt(playTo.value);
    setButton();
    cleanAllScore();
})

rematchBtn.addEventListener('click', () => {
    rematch();
    setButton();
})

cleanBtn.addEventListener('click', (e) => {
    e.preventDefault();
    gameMax = parseInt(gameSet.value);
    setButton();
    cleanAllScore();
})

nextBtn.addEventListener('click', () => {
    nextGame();
})

saveBtn.addEventListener('click', () => {
    sct = createData();
    sendData(sct);
})

// creat data
const createData = () => {
    const c = t1.goal + t2.goal;    // finished games
    const dateObject = new Date();

    const sct = 
        {
            date: dateObject,
            sport: sportName,
            maxGame: gameMax,
            maxScore: scoreMax,
            owners: [],
            winner: '',
            teams: []
        }

    for(let t of [t1, t2]) {

        const teamData = {
            name: '',
            scores: [],
            members: []
        }

        const mbs = t.mates.childElementCount;  //team members

        teamData.name = t.teamBtn.innerText;

        if (t.winner === 1) {
            sct.winner = t.teamBtn.innerText;
        }

        // insert scores from table
        for (let i=0; i<c; i++) {
            teamData.scores.push(t.table.children[i].innerText);
        }

        // insert member's name
        for (let i=0; i<mbs; i++) {
            teamData.members.push(t.mates.children[i].innerText);
        }
        sct.teams.push(teamData);
    }

    return sct;

}

// send data
const sendData = async (sct) => {
    try {
        const sendSct = await axios.post(
                'http://localhost:3000/scoreplus',
                sct
            )
        saveBtn.disabled = true;

        const re = sendSct.data

        if(re.error) {
            alert(re.message);
            saveBtn.disabled = false;
        } else {
            alert(re.message);
            t1.minusBtn.disabled = true;
            t2.minusBtn.disabled = true;
        }
        return sendSct;
    } catch(err) {
        console.log(err);
    }
}

// show or hide table elements
const tableIni = (tb) => {
    if ( gameMax === 1) {
        for(let i of tb.children) {
            i.classList.add('collapse');
        }
    } else if( gameMax === tb.childElementCount) {
        for(let j of tb.children) {
            j.classList.remove('collapse');
        }
    } else {
        for(let k=0; k<gameMax; k++) {
            tb.children[k].classList.remove('collapse');
        }
        for(let m=gameMax; m<tb.childElementCount; m++) {
            tb.children[m].classList.add('collapse');
        }
    }
}

// show or hide save botton & next game button
const setButton = () => {
    if( gameMax === gCurrent) {
        nextBtn.classList.add('collapse');
        saveBtn.classList.remove('collapse');
    } else {
        nextBtn.classList.remove('collapse');
        saveBtn.classList.add('collapse');
    }
}

// insert score to table
const tableInsert = () => {
    t1.table.children[gCurrent-1].innerText = t1.score;
    t2.table.children[gCurrent-1].innerText = t2.score;
}

// highlight table head
const tableHighlight = () => {
    tableHead.children[gCurrent-1].classList.add('table-dark');
}

const tableDark = () => {
    for(let i=1; i<gameMax; i++){
        tableHead.children[i].classList.remove('table-dark');
    }
}

// next game
const nextGame = () => {
    gCurrent++;
    tableHighlight();
    setButton();

    for(let i of [t1, t2]) {
        i.score = 0;
        i.score_history = [];
        i.scoreValue.value = 0;
        i.minusBtn.disabled = true;
        i.winner = 0;
    }
    tableInsert();
    ending(0)
    deuceCheck();
    rematchBtn.disabled = true;
}

// end game setting
const ending = (i) => {
    t1.plusBtn.disabled = i;
    t2.plusBtn.disabled = i;
    endGame = !!i;
    saveBtn.disabled = !i;
    nextBtn.disabled = !i;
    if( endGame ) {
        winBar.classList.remove('collapse');
    } else {
        winBar.classList.add('collapse');
    }
    if(Math.max(t1.goal, t2.goal) > gameMax/2 && gCurrent > 1 && t1.goal+t2.goal != gameMax) {
        callGame(i);
    }
}

// call game
const callGame = (i) => {
    if( i === 0 && gameCalled) {
        //console.log('call game false');
        gameCalled = false;
        gCurrent = t1.goal + t2.goal;
    } else {
        //console.log('call game true');
        gameCalled = true;
        gCurrent = gameMax;
    }
    setButton();
}

// clean current score
const rematch = () => {
    ending(0)
    for(let j of [t1, t2]) {
        j.goal -= j.winner;
        j.winner = 0;
    }
    for(let i of [t1, t2]) {
        i.score = 0;
        i.score_history = [];
        i.scoreValue.value = 0;
        i.minusBtn.disabled = true;
    }
    tableInsert();
    deuceCheck();
    rematchBtn.disabled = true;
}

// clean all score
const cleanAllScore = () => {
    for(let i of allScore) {
        i.value = 0;
        i.innerText = '0';
    }
    t1.winner = 0;
    t1.goal = 0;
    t2.winner = 0;
    t2.goal = 0;
    gCurrent = 1;
    tableDark();
    setButton(gameMax);
    rematch();
}



/*---------------------
    Score controllers:
        1. plus
        2. minus
        3. deuce
----------------------*/
t1.plusBtn.addEventListener('click', () => {
    pluScore(t1, t2, 1);
})

t1.minusBtn.addEventListener('click', () => {
    minuScore(t1, t2);
})

t2.plusBtn.addEventListener('click', () => {
    pluScore(t2, t1, 1);
})

t2.minusBtn.addEventListener('click', () => {
    minuScore(t2, t1);
})


const pluScore = (team, another, scoreN) => {
    rematchBtn.disabled = false;
    if( !endGame ){
        team.score_history.push(scoreN);
        another.score_history.push(0);
        team.score += scoreN;
        team.minusBtn.disabled = false;
        team.scoreValue.value = team.score;
        tableInsert();
        if( !deuce ) {
            deuceCheck();
            if( team.score === scoreMax) {
                team.winner = 1;
                team.goal++;
                ending(1);
            }
        } else if( deuce && team.score > another.score+1) {
            another.minusBtn.disabled = true;

            team.winner = 1;
            team.goal++;
            ending(1);

            deuceCheck();
        }
    }
}

const minuScore = (team, another) => {
    function scoreM() {
            team.score -= team.score_history[team.score_history.length - 1];
            team.scoreValue.value = team.score;
            team.score_history.pop();
            another.score_history.pop();
    }

    if( endGame ) {
        if( team.score === scoreMax) {
            scoreM();
            // team.score -= team.score_history[team.score_history.length - 1];
            // team.scoreValue.value = team.score;
            // team.score_history.pop();
            // another.score_history.pop();
            
            ending(0);
            team.winner = 0;
            team.goal--;
        } else {
            scoreM();
            // team.score--;
            // team.scoreValue.value = team.score;
            deuceCheck();
            another.minusBtn.disabled = false;
            
            ending(0);
            team.winner = 0;
            team.goal--;
        }
        tableInsert();
    } else {
        if( deuce ) {
            scoreM();
            // team.score -= team.score_history[team.score_history.length - 1];
            // team.scoreValue.value = team.score;
            // team.score_history.pop();
            // another.score_history.pop();
            tableInsert();
            deuceCheck();
            if( another.score === scoreMax | team.score >= scoreMax-1 && !deuce) {
                team.minusBtn.disabled = true;
                
                another.winner = 1;
                another.goal++;
                ending(1);
            }
        } else {
            scoreM();
            // team.score -= team.score_history[team.score_history.length - 1];
            // team.scoreValue.value = team.score;
            // team.score_history.pop();
            // another.score_history.pop();
        }
    }
    //tableInsert();

    if( team.score === 0) {
        team.minusBtn.disabled = true;
    }

    if( t1.score === 0 && t2.score === 0) {
        rematchBtn.disabled = true;
    }
}

const deuceCheck = () => {
    if( t1.score >= scoreMax-1 && t2.score >= scoreMax-1 && Math.abs(t1.score-t2.score)<2 ) {
        deuceBar.classList.remove('collapse');
        deuce = true;
    } else {
        deuceBar.classList.add('collapse');
        deuce = false;
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