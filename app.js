// Configuration
const MI_CONFIG = {
    teamName: "Mumbai Indians",
    players: [
        { name: "Hardik Pandya", role: "All-Rounder", id: 1 },
        { name: "Rohit Sharma", role: "Batsman", id: 2 }
    ]
};

// Functions to build the UI
function renderSquad() {
    const container = document.getElementById('player-container');
    if(!container) return;

    const html = MI_CONFIG.players.map(player => `
        <div class="player-card">
            <h3>${player.name}</h3>
            <p>${player.role}</p>
        </div>
    `).join('');

    container.innerHTML = html;
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", () => {
    renderSquad();
});
