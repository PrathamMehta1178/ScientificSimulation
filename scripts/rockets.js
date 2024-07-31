let fuelAmount = 50;
let remainingFuel = 50;
let speed = 0;
let isLaunching = false;
let background1, background2;
let scrollSpeed = 1; // Speed at which the background scrolls

document.addEventListener('DOMContentLoaded', () => {
    background1 = document.querySelector('.background');
    background2 = document.querySelector('.background2');
    resetSimulation();
});

function launchRocket() {
    if (isLaunching) return;

    isLaunching = true;
    remainingFuel = fuelAmount; // Initialize remaining fuel
    speed = calculateSpeed(fuelAmount); // Calculate initial speed based on fuel amount
    updateStats();
    scrollBackground();
}

function resetSimulation() {
    isLaunching = false;
    speed = 0;
    fuelAmount = parseInt(document.getElementById('fuelRange').value);
    remainingFuel = fuelAmount;
    document.getElementById('fuelRemaining').innerText = `${remainingFuel}%`;
    document.getElementById('speed').innerText = '0 km/h';

    background1.style.top = '0';
    background2.style.top = '-100%';
}

function updateFuelAmount(value) {
    fuelAmount = parseInt(value);
    document.getElementById('fuelAmount').innerText = `${fuelAmount}%`;
    if (!isLaunching) {
        remainingFuel = fuelAmount;
        document.getElementById('fuelRemaining').innerText = `${remainingFuel}%`;
    }
}

function calculateSpeed(fuel) {
    // Example: speed proportional to fuel amount
    return fuel * 2;
}

function updateStats() {
    document.getElementById('speed').innerText = `${Math.round(speed)} km/h`;
    document.getElementById('fuelRemaining').innerText = `${remainingFuel}%`;
}

function scrollBackground() {
    if (!isLaunching) return;

    // Decrease fuel over time
    remainingFuel -= 0.1;
    if (remainingFuel <= 0) {
        remainingFuel = 0;
        isLaunching = false;
    }

    // Update speed based on remaining fuel
    speed = calculateSpeed(remainingFuel);
    updateStats();

    let position1 = parseInt(background1.style.top) + scrollSpeed;
    let position2 = parseInt(background2.style.top) + scrollSpeed;

    if (position1 >= 100) {
        position1 = -100;
    }
    if (position2 >= 100) {
        position2 = -100;
    }

    background1.style.top = `${position1}%`;
    background2.style.top = `${position2}%`;

    if (isLaunching) {
        setTimeout(scrollBackground, 50);
    }
}
