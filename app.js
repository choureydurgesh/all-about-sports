const API_KEY = "bc06bd4f-8b3f-41ad-9b1b-1ad0db04e2da";
const IPL_SERIES_ID = "47bbf69d-4a51-40fa-80fe-f475b849547d"; // Typical ID format for IPL

async function handleTeamClick(teamName) {
    const displayArea = document.getElementById('display-area');
    displayArea.innerHTML = "<div class='welcome-box'><h3>Scanning CricAPI for " + teamName + " Squad...</h3></div>";

    try {
        // Step 1: Fetch Series Info (Matches & Squads)
        const response = await fetch(`https://api.cricapi.com/v1/series_info?apikey=${API_KEY}&id=${IPL_SERIES_ID}`);
        const result = await response.json();

        if (result.status !== "success") throw new Error("API Limit Reached or Key Error");

        // Step 2: Filter for the specific team (e.g., Mumbai Indians)
        // Note: CricAPI free tier often provides match lists. We will extract 
        // player names from the 'matchList' or 'squads' array.
        const squadData = result.data.matchList.filter(match => 
            match.teams.includes(teamName)
        );

        renderSquad(teamName, squadData);
    } catch (error) {
        console.error(error);
        displayArea.innerHTML = `<div class="welcome-box"><h3>Data Unavailable</h3><p>${error.message}</p></div>`;
    }
}

function renderSquad(teamName, matches) {
    const displayArea = document.getElementById('display-area');
    
    // For PoC, we show the next 3 matches for that team
    let html = `<h2>${teamName} - Upcoming Fixtures</h2><div class="stats-grid">`;
    
    matches.slice(0, 4).forEach(m => {
        html += `
            <div class="player-card">
                <span class="player-tag">${m.matchType.toUpperCase()}</span>
                <h3>vs ${m.teams.find(t => t !== teamName)}</h3>
                <p style="color: #666;">${new Date(m.date).toDateString()}</p>
                <hr>
                <p style="font-size: 0.8rem; color: var(--ipl-blue)">${m.venue}</p>
                <div class="status-badge">${m.status}</div>
            </div>`;
    });

    html += `</div>`;
    displayArea.innerHTML = html;
}
