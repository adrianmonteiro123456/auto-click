// script.js
let isClicking = false;
let clickCount = 0;
let totalClicks = 0;
let clickInterval;
let startTime;

const clickCountElement = document.getElementById('clickCount');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const cpsElement = document.getElementById('cps');
const totalClicksElement = document.getElementById('totalClicks');

function updateDisplay() {
    clickCountElement.textContent = `${clickCount} Cliques`;
    totalClicksElement.textContent = totalClicks;
    
    // Calcular cliques por segundo
    if (isClicking) {
        const secondsElapsed = (Date.now() - startTime) / 1000;
        const cps = (clickCount / secondsElapsed).toFixed(1);
        cpsElement.textContent = cps;
    }
}

function simulateClick() {
    clickCount++;
    totalClicks++;
    updateDisplay();
}

function toggleClicking() {
    if (isClicking) {
        // Parar o auto-click
        clearInterval(clickInterval);
        startStopButton.textContent = 'Iniciar';
        startStopButton.className = 'btn start';
        isClicking = false;
    } else {
        // Iniciar o auto-click
        startTime = Date.now();
        clickCount = 0;
        clickInterval = setInterval(simulateClick, 100); // 100ms = 10 cliques/segundo
        startStopButton.textContent = 'Parar';
        startStopButton.className = 'btn stop';
        isClicking = true;
    }
    updateDisplay();
}

function resetAll() {
    clearInterval(clickInterval);
    clickCount = 0;
    totalClicks = 0;
    isClicking = false;
    startStopButton.textContent = 'Iniciar';
    startStopButton.className = 'btn start';
    cpsElement.textContent = '0';
    updateDisplay();
}

// Event Listeners
startStopButton.addEventListener('click', toggleClicking);
resetButton.addEventListener('click', resetAll);
