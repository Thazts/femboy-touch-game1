// Ts file handles touching the femboy fr

// Save system? (works i hope)
let touchCount = Number(localStorage.getItem('touchCount')) || 0;
let touchCount2 = Number(localStorage.getItem('touchCount2')) || 0;
const touchCountDisplay = document.getElementById('touch-count');
const character = document.getElementById('femboy-character');
const touchSound = new Audio('assets/sounds/touch.mp3');

const touchCountDisplay2 = document.getElementById('touch-count-2');
const character2 = document.getElementById('femboy-character-2');
const touchSound2 = new Audio('assets/sounds/touch.mp3');

const plusOne = document.getElementById('plus-one');
const plusOne2 = document.getElementById('plus-one-2');

function showPlusOne(el) {
    el.textContent = '+1';
    el.classList.add('show');
    setTimeout(() => {
        el.classList.remove('show');
        el.textContent = '';
    }, 600);
}

function updateTouchCount() {
    touchCount++;
    touchCountDisplay.textContent = `Touches: ${touchCount}`;
    localStorage.setItem('touchCount', touchCount);
}

function playTouchSound() {
    touchSound.currentTime = 0; 
    touchSound.play();
}

function animateCharacter() {
    character.classList.add('bounce');
    setTimeout(() => {
        character.classList.remove('bounce');
    }, 500);
}

function updateTouchCount2() {
    touchCount2++;
    touchCountDisplay2.textContent = `Touches: ${touchCount2}`;
    localStorage.setItem('touchCount2', touchCount2);
}

function playTouchSound2() {
    touchSound2.currentTime = 0;
    touchSound2.play();
}

function animateCharacter2() {
    character2.classList.add('bounce');
    setTimeout(() => {
        character2.classList.remove('bounce');
    }, 500);
}

// Heart effect 
function createHeartEffect(target) {
    const heart = document.createElement('div');
    heart.className = 'heart-effect';
    heart.style.left = `${Math.random() * 60 + 20}%`;
    heart.style.top = `${Math.random() * 40 + 30}%`;
    target.parentElement.style.position = 'relative';
    target.parentElement.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 800);
}

function handleTouch() {
    updateTouchCount();
    playTouchSound();
    animateCharacter();
    createHeartEffect(character);
    showPlusOne(plusOne);
}

function handleTouch2() {
    updateTouchCount2();
    playTouchSound2();
    animateCharacter2();
    createHeartEffect(character2);
    showPlusOne(plusOne2);
}

character.addEventListener('click', handleTouch);
character.addEventListener('touchstart', handleTouch);

character2.addEventListener('click', handleTouch2);
character2.addEventListener('touchstart', handleTouch2);

touchCountDisplay.textContent = `Touches: ${touchCount}`;
touchCountDisplay2.textContent = `Touches: ${touchCount2}`;

// Scroll down button
document.getElementById('scroll-down-btn').addEventListener('click', () => {
    document.getElementById('second-character-container').scrollIntoView({ behavior: 'smooth' });
});

// Theme toggle
const themeBtn = document.getElementById('theme-toggle-btn');
const body = document.body;
let darkMode = true;

function setTheme(dark) {
    if (dark) {
        body.classList.remove('light');
        themeBtn.textContent = '🌙';
        themeBtn.setAttribute('aria-label', 'Switch to light theme');
    } else {
        body.classList.add('light');
        themeBtn.textContent = '☀️';
        themeBtn.setAttribute('aria-label', 'Switch to dark theme');
    }
    darkMode = dark;
}

// Load theme from storage
if (localStorage.getItem('theme') === 'light') {
    setTheme(false);
} else {
    setTheme(true);
}

themeBtn.addEventListener('click', () => {
    setTheme(!darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
});
