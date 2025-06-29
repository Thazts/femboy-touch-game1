// Ts file handles touching the femboy fr

// Load counts from localStorage if available
let touchCount = Number(localStorage.getItem('touchCount')) || 0;
let touchCount2 = Number(localStorage.getItem('touchCount2')) || 0;
const touchCountDisplay = document.getElementById('touch-count');
const character = document.getElementById('femboy-character');
const touchSound = new Audio('assets/sounds/touch.mp3');

const touchCountDisplay2 = document.getElementById('touch-count-2');
const character2 = document.getElementById('femboy-character-2');
const touchSound2 = new Audio('assets/sounds/touch.mp3');

// +1 popup elements
const plusOne = document.getElementById('plus-one');
const plusOne2 = document.getElementById('plus-one-2');

let canAnimate = true;
let canAnimate2 = true;

function showPlusOne(el) {
    el.textContent = '+1';
    el.classList.add('show');
    setTimeout(() => {
        el.classList.remove('show');
        el.textContent = '';
    }, 600);
}

//Milestones :p
function checkMilestones(count) {
  if (count === 10) showMilestone("You're getting a little *too* into this...");
  else if (count === 50) showMilestone("Fifty?! You're shameless");
  else if (count === 100) showMilestone("Alright bud... 100 touches? You need to hop off and touch some grass");
  else if (count === 150) showMilestone("150... This is getting out of hand...");
  else if (count === 200) showMilestone("200 touches. Are you okay?");
  else if (count === 250) showMilestone("A quarter thousand! Legendary persistence... is what i would say if that was a good thing...");
  else if (count === 300) showMilestone("300... Femboy might give you a little treat if you keep this up");
  else if (count === 350) showMilestone("350... This is your legacy now.");
  else if (count === 400) showMilestone("400?? the femboy is startging to like you");
  else if (count === 450) showMilestone("450!? Is your finger tired yet?");
  else if (count === 500) showMilestone("500? Femboy wants to give you a kiss");
  else if (count === 600) showMilestone("Femboy might give you more than just a kiss...");
}

function showMilestone(text) {
    const toast = document.createElement('div');
    toast.className = 'milestone-toast';
    toast.textContent = text;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function updateTouchCount() {
    touchCount++;
    touchCountDisplay.textContent = `Touches: ${touchCount}`;
    localStorage.setItem('touchCount', touchCount);
    checkMilestones(touchCount);
}

function updateTouchCount2() {
    touchCount2++;
    touchCountDisplay2.textContent = `Touches: ${touchCount2}`;
    localStorage.setItem('touchCount2', touchCount2);
    checkMilestones(touchCount2);
}

function playTouchSound() {
    if (!canAnimate) return;
    touchSound.currentTime = 0; // Reset sound to start
    touchSound.play();
}

function playTouchSound2() {
    if (!canAnimate2) return;
    touchSound2.currentTime = 0;
    touchSound2.play();
}

function animateCharacter() {
    if (!canAnimate) return;
    canAnimate = false;
    character.classList.add('bounce');
    setTimeout(() => {
        character.classList.remove('bounce');
        canAnimate = true;
    }, 500);
}

function animateCharacter2() {
    if (!canAnimate2) return;
    canAnimate2 = false;
    character2.classList.add('bounce');
    setTimeout(() => {
        character2.classList.remove('bounce');
        canAnimate2 = true;
    }, 500);
}

// Heart effect function
function createHeartEffect(target) {
    const heart = document.createElement('div');
    heart.className = 'heart-effect';
    // Randomize position over the character
    heart.style.left = `${Math.random() * 60 + 20}%`;
    heart.style.top = `${Math.random() * 40 + 30}%`;
    target.parentElement.style.position = 'relative';
    target.parentElement.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 800);
}

// --- Hold to shrink and release to restore ---
function shrinkCharacter(target) {
    target.style.transition = "transform 0.25s cubic-bezier(.4,2,.6,1)";
    target.style.transform = "scale(0.85) translateY(10px)";
}

function restoreCharacter(target) {
    target.style.transition = "transform 0.25s cubic-bezier(.4,2,.6,1)";
    target.style.transform = "";
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

// Event listeners for clicks and touches
character.addEventListener('click', handleTouch);
character.addEventListener('touchstart', handleTouch);

character2.addEventListener('click', handleTouch2);
character2.addEventListener('touchstart', handleTouch2);

// Event listeners for hold to shrink and release to restore
character.addEventListener('mousedown', () => shrinkCharacter(character));
character.addEventListener('touchstart', () => shrinkCharacter(character));
character.addEventListener('mouseup', () => restoreCharacter(character));
character.addEventListener('mouseleave', () => restoreCharacter(character));
character.addEventListener('touchend', () => restoreCharacter(character));
character.addEventListener('touchcancel', () => restoreCharacter(character));

character2.addEventListener('mousedown', () => shrinkCharacter(character2));
character2.addEventListener('touchstart', () => shrinkCharacter(character2));
character2.addEventListener('mouseup', () => restoreCharacter(character2));
character2.addEventListener('mouseleave', () => restoreCharacter(character2));
character2.addEventListener('touchend', () => restoreCharacter(character2));
character2.addEventListener('touchcancel', () => restoreCharacter(character2));

// Initialize touch count display
touchCountDisplay.textContent = `Touches: ${touchCount}`;
touchCountDisplay2.textContent = `Touches: ${touchCount2}`;

// Scroll down button functionality
document.getElementById('scroll-down-btn').addEventListener('click', () => {
    document.getElementById('second-character-container').scrollIntoView({ behavior: 'smooth' });
});

// Theme toggle functionality
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

// Load theme from localStorage if available
if (localStorage.getItem('theme') === 'light') {
    setTheme(false);
} else {
    setTheme(true);
}

themeBtn.addEventListener('click', () => {
    setTheme(!darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
});

// Reset touches button functionality
document.getElementById('reset-touches-btn').addEventListener('click', () => {
    touchCount = 0;
    touchCount2 = 0;
    localStorage.setItem('touchCount', touchCount);
    localStorage.setItem('touchCount2', touchCount2);
    touchCountDisplay.textContent = `Touches: ${touchCount}`;
    touchCountDisplay2.textContent = `Touches: ${touchCount2}`;
});

