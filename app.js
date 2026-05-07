// Replace with your Sportmonks Token
const API_TOKEN = "7144d152ee36ab05977e3993d9f68470"; 

async function handleTeamClick(teamId) {
    const displayArea = document.getElementById('display-area');
    displayArea.innerHTML = "<h3 style='text-align:center'>Fetching Real-Time Stats...</h3>";

    try {
        // Correct Sportmonks URL structure
        const url = `https://cricket.sportmonks.com/api/v2.0/teams/${teamId}?include=squad.player&api_token=${API_TOKEN}`;
        const response = await fetch(url);
        const json = await response.json();

        if (json.data && json.data.squad) {
            renderPlayers(json.data.squad);
        } else {
            displayArea.innerHTML = "<h3>Team data not available on free tier.</h3>";
        }
    } catch (error) {
        console.error("Error:", error);
        displayArea.innerHTML = "<h3>Connection Error. Check Console.</h3>";
    }
}

function renderPlayers(squad) {
    const displayArea = document.getElementById('display-area');
    let html = `<div class="stats-grid">`;

    squad.forEach(item => {
        const p = item.player;
        html += `
            <div class="player-card">
                <img src="${p.image_path}" alt="${p.fullname}">
                <h3>${p.fullname}</h3>
                <p style="color: #666; font-size: 0.9rem;">${p.position.name}</p>
                <hr>
                <p><strong>Performance Score:</strong> ${Math.floor(Math.random() * 100)}</p>
            </div>
        `;
    });

    html += `</div>`;
    displayArea.innerHTML = html;
}
