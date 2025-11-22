// DOM Elements
const ball = document.getElementById('ball');
const orbitPath = document.getElementById('orbit-path');
const container = document.getElementById('simulation-container');
const velocityVector = document.getElementById('velocity-vector');
const accelerationVector = document.getElementById('acceleration-vector');
const positionValue = document.getElementById('position-value');
const velocityValue = document.getElementById('velocity-value');
const accelerationValue = document.getElementById('acceleration-value');
const forceValue = document.getElementById('force-value');

// Control Elements
const radiusSlider = document.getElementById('radius');
const radiusValue = document.getElementById('radius-value');
const speedSlider = document.getElementById('speed');
const speedValue = document.getElementById('speed-value');
const massSlider = document.getElementById('mass');
const massValue = document.getElementById('mass-value');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const toggleVectorsBtn = document.getElementById('toggle-vectors');
const toggleTrailBtn = document.getElementById('toggle-trail');
const loadingScreen = document.getElementById('loading-screen');

// Simulation variables
let angle = 0 * Math.PI / 180;
let radius = 150;
let speed = 5;
let mass = 5;
let isRunning = false;
let showVectors = false;
let showTrail = false;

// Create starry background
function createStars() {
    const numStars = 200;

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        // Random size, position and opacity
        const size = Math.random() * 2;
        const opacity = Math.random() * 0.7 + 0.3;

        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.opacity = opacity;

        // Add twinkling effect for some stars
        if (Math.random() > 0.7) {
            const duration = 3 + Math.random() * 5;
            star.style.animation = `twinkle ${duration}s infinite ease-in-out`;
        }

        document.body.appendChild(star);
    }
}

// Initialize the simulation
function init() {
    // Set initial values for the inputs
    radiusSlider.value = radius;
    radiusValue.textContent = `${radius} px`;
    speedSlider.value = speed;
    speedValue.textContent = `${speed} m/s`;
    massSlider.value = mass;
    massValue.textContent = `${mass} kg`;

    // Set orbit path size
    orbitPath.style.width = `${radius * 2}px`;
    orbitPath.style.height = `${radius * 2}px`;

    // Initial ball position
    updateBallPosition();

    // Hide vectors initially
    velocityVector.style.display = 'none';
    accelerationVector.style.display = 'none';

    // Add event listeners
    radiusSlider.addEventListener('input', onRadiusChange);
    speedSlider.addEventListener('input', onSpeedChange);
    massSlider.addEventListener('input', onMassChange);
    startBtn.addEventListener('click', startSimulation);
    pauseBtn.addEventListener('click', pauseSimulation);
    resetBtn.addEventListener('click', resetSimulation);
    toggleVectorsBtn.addEventListener('click', toggleVectors);
    toggleTrailBtn.addEventListener('click', toggleTrail);

    // Create stars in the background
    createStars();

    // Hide loading screen
    setTimeout(() => {
        loadingScreen.style.opacity = "0";
        setTimeout(() => {
            loadingScreen.style.display = "none";
        }, 1000);
    }, 1500);
}

// Update ball position

function updateBallPosition() {
    const ballY = container.offsetHeight / 2 + radius * Math.sin(angle);
    const ballX = container.offsetWidth / 2 + radius * Math.cos(angle);

    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';

    // Update display values (placeholder for now)
    positionValue.textContent = `(${Math.round(ballX - container.offsetWidth / 2)}, ${Math.round(ballY - container.offsetHeight / 2)})`;
}

// Event handlers for controls
function onRadiusChange() {
    radius = parseInt(radiusSlider.value);
    radiusValue.textContent = `${radius} px`;
    orbitPath.style.width = `${radius * 2}px`;
    orbitPath.style.height = `${radius * 2}px`;
    updateBallPosition();
}

function onSpeedChange() {
    speed = parseInt(speedSlider.value);
    speedValue.textContent = `${speed} m/s`;
}

function onMassChange() {
    mass = parseInt(massSlider.value);
    massValue.textContent = `${mass} kg`;

    // Update ball size based on mass
    const size = 24 + mass * 2;
    ball.style.width = `${size}px`;
    ball.style.height = `${size}px`;
}

let lastTime = null;

function startSimulation() {
    if (!isRunning) {
        isRunning = true;
        lastTime = performance.now(); // capture start time

        // centripetal Acceleration
        function animate(currentTime) {
            if (!isRunning) return;

            const deltaTime = currentTime - lastTime;

            // Skip if delta is too small (like < 5ms)
            if (deltaTime > 5) {
                lastTime = currentTime;
                angle += speed / radius;
                updateBallPosition();

                const velocity = speed
                const centripetal_force = mass * Math.pow(speed, 2) / radius
                const centripetal_acceleration = Math.pow(speed, 2) / radius

                velocityValue.textContent = velocity
                forceValue.textContent = centripetal_force.toFixed(2);
                accelerationValue.textContent = centripetal_acceleration.toFixed(2);
            }

            window.requestAnimationFrame(animate);
        }
        window.requestAnimationFrame(animate);
    }
}

function pauseSimulation() {
    isRunning = false;
    // Pause logic will go here
}

function resetSimulation() {
    isRunning = false;
    angle = 0;
    updateBallPosition();
    // Additional reset logic will go here
}

function toggleVectors() {
    showVectors = !showVectors;
    velocityVector.style.display = showVectors ? 'block' : 'none';
    accelerationVector.style.display = showVectors ? 'block' : 'none';
    toggleVectorsBtn.textContent = showVectors ? "HIDE VECTORS" : "SHOW VECTORS";
}

function toggleTrail() {
    showTrail = !showTrail;
    toggleTrailBtn.textContent = showTrail ? "HIDE TRAIL" : "SHOW TRAIL";
    // Trail logic will go here

}

// Initialize on window load
window.addEventListener('load', init);


// Add an animation keyframe for twinkling stars
const style = document.createElement('style');
style.innerHTML = `
    @keyframes twinkle {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 1; }
    }
`;
document.head.appendChild(style);


