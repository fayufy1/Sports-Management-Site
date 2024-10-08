function chooseSport(sport) {
    // Store the selected sport in localStorage
    localStorage.setItem('selectedSport', sport);

    // Redirect to the fixtures page
    window.location.href = 'fixtures.html';
}
