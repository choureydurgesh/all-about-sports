const API_KEY = "7144d152ee36ab05977e3993d9f68470"; // Your key
const BASE_URL = "https://v3.football.api-sports.io"; // Switch to a Cricket API for IPL

async function loadTeam(teamId) {
    const main = document.getElementById('main-content');
    main.innerHTML = "<div class='loading'>Fetching Real-Time Player Stats...</div>";

    try {
        // Fetching Players for the selected team
        const response = await fetch(`${BASE_URL}/players?team=${teamId}&season=2026`, {
            headers: { "x-apisports-key": API_KEY }
        });
        const data = await response.json();
        
        renderPlayerStats(data.response);
    } catch (error) {
        main.innerHTML = "Error loading team data.";
    }
}

function renderPlayerStats(players) {
    const main = document.getElementById('main-content');
    let html = `<div class="stats-grid">`;

    players.forEach(p => {
        // Professional card showing real-time stats (runs, wickets, etc.)
        html += `
            <div class="stat-card">
                <img src="${p.player.photo}">
                <h3>${p.player.name}</h3>
                <div class="stat-row">
                    <span>Matches: ${p.statistics[0].games.appearences}</span>
                    <span>Performance: ${p.statistics[0].games.rating || 'N/A'}</span>
                </div>
            </div>`;
    });

    html += `</div>`;
    main.innerHTML = html;
}
