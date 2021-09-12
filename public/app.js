const t1 = {
    teamButton: document.querySelector('#t1Button'),
    nameInput: document.querySelector('#t1NameInput'),
    editBtn: document.querySelector('#t1Edit'),
    addBtn: document.querySelector('#t1Add'),
    removeBtn: document.querySelector('#t1Remove'),
    tMates: document.querySelector('#t1Mates')
}

const t2 = {
    teamButton: document.querySelector('#t2Button'),
    nameInput: document.querySelector('#t2NameInput'),
    editBtn: document.querySelector('#t2Edit'),
    addBtn: document.querySelector('#t2Add'),
    removeBtn: document.querySelector('#t2Remove'),
    tMates: document.querySelector('#t2Mates')
}

t1.editBtn.addEventListener('click', () => {
    editTeamName(t1.teamButton, t1.nameInput, 'Team 1');
})

t1.addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addTeamMate(t1.tMates, t1.nameInput)
})

t1.removeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    rmTeamMate(t1.tMates);
})

t2.editBtn.addEventListener('click', () => {
    editTeamName(t2.teamButton, t2.nameInput, 'Team 2');
})

t2.addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addTeamMate(t2.tMates, t2.nameInput)
})

t2.removeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    rmTeamMate(t2.tMates);
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

// Add a teammate
const addTeamMate = (team, name) => {
    if (name.value !== '') {
        const newPlayer = document.createElement('li');
        newPlayer.append(name.value);
        team.append(newPlayer);
        name.value = '';
    }
}

// Remove the last teammate
const rmTeamMate = (team) => {
    if (team.lastElementChild !== null) {
        team.lastElementChild.remove();
    }
}