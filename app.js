const API_KEY = "bc06bd4f-8b3f-41ad-9b1b-1ad0db04e2da";
const IPL_SERIES_ID = "47bbf69d-4a51-40fa-80fe-f475b849547d"; // Typical ID for IPL 2026

async function handleTeamClick(teamName) {
    const displayArea = document.getElementById('display-area');
    displayArea.innerHTML = "<h3 style='text-align:center'>Fetching " + teamName + " data...</h3>";

    try {
        // Fetch series info which includes the full match list
        const response = await fetch(`https://api.cricapi.com/v1/series_info?apikey=${API_KEY}&id=${IPL_SERIES_ID}`);
        const result = await response.json();

        if (result.status !== "success") {
            throw new Error(result.reason || "API Error");
        }

        // Filter matches where the selected team is playing
        const teamMatches = result.data.matchList.filter(match => 
            match.teams.includes(teamName)
        );

        renderMatches(teamName, teamMatches);
    } catch (error) {
        console.error(error);
        displayArea.innerHTML = `<div class='card'><h3>Error</h3><p>${error.message}</p></div>`;
    }
}

function renderMatches(teamName, matches) {
    const displayArea = document.getElementById('display-area');
    
    if (matches.length === 0) {
        displayArea.innerHTML = "<h3>No matches found for " + teamName + ".</h3>";
        return;
    }

    let html = `<h2 style="color:#001e50">${teamName} - Match Center</h2><div class="stats-grid">`;
    
    matches.forEach(m => {
        const opponent = m.teams.find(t => t !== teamName);
        html += `
            <div class="card">
                <small style="color:var(--ipl-gold)">${m.matchType.toUpperCase()}</small>
                <h3>vs ${opponent}</h3>
                <p>${new Date(m.date).toLocaleDateString()}</p>
                <hr style="border:0; border-top:1px solid #eee">
                <span class="match-status">${m.status}</span>
                <p style="font-size:0.75rem; margin-top:10px">${m.venue}</p>
            </div>`;
    });

    html += `</div>`;
    displayArea.innerHTML = html;
}
