// 1. YOUR API TOKEN (Double check this in Sportmonks Dashboard)
const API_TOKEN = "7144d152ee36ab05977e3993d9f68470"; 

// 2. We use a "CORS Proxy" to bypass the security block
const PROXY = "https://corsproxy.io/?";
const BASE_URL = "https://cricket.sportmonks.com/api/v2.0";

async function handleTeamClick(teamId) {
    const displayArea = document.getElementById('display-area');
    displayArea.innerHTML = "<h3>Fetching Real-Time Stats...</h3>";

    // Standard Developer Tip: Construct the URL carefully
    const targetUrl = `${BASE_URL}/teams/${teamId}?include=squad.player&api_token=${API_TOKEN}`;
    
    try {
        // We call the proxy, which then calls Sportmonks
        const response = await fetch(PROXY + encodeURIComponent(targetUrl));
        
        if (!response.ok) {
            if (response.status === 401) throw new Error("Invalid API Key");
            throw new Error("Server Error");
        }

        const json = await response.json();
        
        if (json.data && json.data.squad) {
            renderPlayers(json.data.squad);
        } else {
            displayArea.innerHTML = "<h3>No squad data found for this team.</h3>";
        }
    } catch (error) {
        console.error("Critical Error:", error);
        displayArea.innerHTML = `<h3>Error: ${error.message}.</h3><p>Check if your Sportmonks Cricket plan is active.</p>`;
    }
}

function renderPlayers(squad) {
    const displayArea = document.getElementById('display-area');
    let html = `<div class="stats-grid">`;

    squad.forEach(item => {
        const p = item.player;
        // If image is missing, we use a default cricket avatar
        const img = p.image_path || "https://via.placeholder.com/150?text=Player";
        
        html += `
            <div class="player-card">
                <img src="${img}" alt="${p.fullname}">
                <h3>${p.fullname}</h3>
                <p>${p.position ? p.position.name : 'Player'}</p>
            </div>
        `;
    });

    html += `</div>`;
    displayArea.innerHTML = html;
}
