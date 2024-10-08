const teams = [];
let fixtures = [];
let sport;

window.onload = function() {
    const sport = localStorage.getItem('selectedSport');
    const page = document.getElementById('fixtures-page'); // Target the fixtures-page section

    if (sport) {
        document.getElementById('sport-title').innerText = sport.charAt(0).toUpperCase() + sport.slice(1);
        // Apply the appropriate theme based on the selected sport
        if (sport === 'football') {
            page.classList.add('football-theme');
        } else if (sport === 'basketball') {
            page.classList.add('basketball-theme');
        } else if (sport === 'tennis') {
            page.classList.add('tennis-theme');
        }
    } else {
        document.getElementById('sport-title').innerText = "Unknown Sport";
    }
};

function generateTeams() {
    const teamList = document.getElementById('team-list');
    teamList.innerHTML = ''; // Clear previous teams
    
    const sport = localStorage.getItem('selectedSport');
    let teamNames = [];

    if (sport === 'football') {
        teamNames = ['Red Strikers', 'Blue Defenders', 'Golden Boot', 'Goal Masters'];
    } else if (sport === 'basketball') {
        teamNames = ['Slam Dunkers', 'Alley Oop', 'Three-Pointers', 'Hoop Kings'];
    } else if (sport === 'tennis') {
        teamNames = ['Top Spinners', 'Net Masters', 'Backhand Kings', 'Serve Aces'];
    }

    teamNames.forEach(team => {
        teams.push(team);
        const li = document.createElement('li');
        li.innerText = team;
        teamList.appendChild(li);
    });
}


function generateFixtures() {
    const fixtureList = document.getElementById('fixture-list');
    const fixtureSchedule = document.getElementById('fixture-schedule');
    fixtureList.innerHTML = ''; 
    fixtureSchedule.innerHTML = ''; 
    
    if (teams.length < 2) {
        alert("Please generate teams first.");
        return;
    }

    fixtures = []; // Reset fixtures
    for (let i = 0; i < teams.length; i++) {
        for (let j = i + 1; j < teams.length; j++) {
            const fixture = `${teams[i]} vs ${teams[j]}`;
            fixtures.push({ team1: teams[i], team2: teams[j], score1: 0, score2: 0 });
            const li = document.createElement('li');
            li.innerText = fixture;
            fixtureList.appendChild(li);
        }
    }

    displayEditableFixtures();
}

function displayEditableFixtures() {
    const fixtureSchedule = document.getElementById('fixture-schedule');
    fixtureSchedule.innerHTML = ''; // Clear previous fixture

    fixtures.forEach((fixture, index) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div>
                <strong>${fixture.team1} vs ${fixture.team2}</strong><br>
                <input type="number" id="score1-${index}" value="${fixture.score1}" placeholder="Score 1" min="0"> - 
                <input type="number" id="score2-${index}" value="${fixture.score2}" placeholder="Score 2" min="0">
                <button onclick="updateFixture(${index})">Update</button>
            </div>
        `;
        fixtureSchedule.appendChild(div);
    });
}

function updateFixture(index) {
    const score1 = document.getElementById(`score1-${index}`).value;
    const score2 = document.getElementById(`score2-${index}`).value;
    fixtures[index].score1 = score1;
    fixtures[index].score2 = score2;
    alert(`Fixture updated: ${fixtures[index].team1} ${score1} - ${fixtures[index].team2} ${score2}`);
}
