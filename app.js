const CRICKET_API_TOKEN = "YOUR_SPORTMONKS_TOKEN_HERE";
const BASE_URL = "https://cricket.sportmonks.com/api/v2.0";

// Standard Developer Service Object
const CricketService = {
    
    // 1. Fetch IPL Standings
    async getStandings(seasonId = 2026) {
        const url = `${BASE_URL}/standings/season/${seasonId}?api_token=${CRICKET_API_TOKEN}`;
        const response = await fetch(url);
        const json = await response.json();
        return json.data;
    },

    // 2. Fetch Team Squad with Stats
    async getTeamSquad(teamId) {
        // We use 'includes' to get player names and photos in one go
        const include = "squad.player"; 
        const url = `${BASE_URL}/teams/${teamId}?include=${include}&api_token=${CRICKET_API_TOKEN}`;
        const response = await fetch(url);
        const json = await response.json();
        return json.data.squad;
    }
};

// UI Logic
async function displayMumbaiIndians() {
    const mi_team_id = 31; // Mumbai Indians ID in Sportmonks
    const squad = await CricketService.getTeamSquad(mi_team_id);
    
    const container = document.getElementById('player-container');
    container.innerHTML = squad.map(item => `
        <div class="player-card">
            <img src="${item.player.image_path}" class="player-img">
            <div class="player-info">
                <h3>${item.player.fullname}</h3>
                <p>${item.player.position.name}</p>
            </div>
        </div>
    `).join('');
}

document.addEventListener("DOMContentLoaded", displayMumbaiIndians);
