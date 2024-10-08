function updateDivisions() {
    const standings = [];

    fixtures.forEach(fixture => {
        if (!standings[fixture.team1]) standings[fixture.team1] = { wins: 0, losses: 0 };
        if (!standings[fixture.team2]) standings[fixture.team2] = { wins: 0, losses: 0 };

        if (fixture.score1 > fixture.score2) {
            standings[fixture.team1].wins++;
            standings[fixture.team2].losses++;
        } else if (fixture.score1 < fixture.score2) {
            standings[fixture.team2].wins++;
            standings[fixture.team1].losses++;
        }
    });

    const sortedTeams = Object.entries(standings).sort((a, b) => b[1].wins - a[1].wins);
    
    const divisionList = document.getElementById('division-list');
    divisionList.innerHTML = '';
    
    sortedTeams.forEach(team => {
        const li = document.createElement('li');
        li.innerText = `${team[0]} - Wins: ${team[1].wins}, Losses: ${team[1].losses}`;
        divisionList.appendChild(li);
    });
}
