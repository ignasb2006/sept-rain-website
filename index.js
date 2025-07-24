const ipElement = document.getElementById('ipAddress');
const heroLogo = document.querySelector('.hero-section');
const serverStatusSpan = document.getElementById('server-status');
const serverIndicatorSpan = document.getElementById('status-indicator');
const playerCountSpan = document.getElementById('player-count');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (heroLogo) heroLogo.style.opacity = 1 - scrollY / 300;
});

ipElement.addEventListener('click', () => {
    navigator.clipboard.writeText(ipElement.textContent).then(() => {
        const originalText = ipElement.textContent;
        ipElement.textContent = 'Copied!';
        setTimeout(() => {
            ipElement.textContent = originalText;
        }, 1500);
    }).catch(() => {
        alert('Failed to copy IP address.');
    });
});

const api = "https://api.minetools.eu/ping/play.septemberrain.net";

async function loadServerData(){
    try {
        const response = await fetch(api);
        if (!response.ok){
            serverIndicatorSpan.style.backgroundColor = '#edd710ff';
            serverStatusSpan.innerText = "JS Error.";
            throw new Error("Server not reachable")
        };

        const data = await response.json();

        if (data.players){
            serverIndicatorSpan.style.backgroundColor = '#00ff00';
            serverStatusSpan.innerText = "Online";

            playerCountSpan.innerText = `${data.players.online} / ${data.players.max}`;
        } else {
            serverIndicatorSpan.style.backgroundColor = '#ff0000';
            serverStatusSpan.innerText = "Offline";
        }
        
    } catch (error) {
        console.error("Error fetching server data:", error.message);
    }
}

loadServerData();
