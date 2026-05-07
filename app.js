const API_KEY = "bc06bd4f-8b3f-41ad-9b1b-1ad0db04e2da";
const IPL_SERIES_ID = "47bbf69d-4a51-40fa-80fe-f475b849547d"; 

async function handleTeamClick(teamName) {
    const displayArea = document.getElementById('display-area');
    displayArea.innerHTML = "<h3>Fetching " + teamName + " Matches...</h3>";

    try {
        const response = await fetch(`https://api.cricapi.com/v1/series_info?apikey=${API_KEY}&id=${IPL_SERIES_ID}`);
        const result = await response.json();

        if (result.status !== "success") throw new Error("API limit or key error");

        const teamMatches = result.data.matchList.filter(m => m.teams.includes(teamName));

        if (teamMatches.length === 0) {
            displayArea.innerHTML = "<h3>No current matches found for " + teamName + "</h3>";
            return;
        }

        let html = `<h2>${teamName} Match Center</h2>`;
        teamMatches.forEach(m => {
            html += `
                <div class="card">
                    <p><strong>${m.name}</strong></p>
                    <p>${m.status}</p>
                    <p style="font-size:0.8rem; color:#666">${m.venue}</p>
                </div>`;
        });
        displayArea.innerHTML = html;

    } catch (error) {
        displayArea.innerHTML = "<h3>Error: " + error.message + "</h3>";
    }
}
