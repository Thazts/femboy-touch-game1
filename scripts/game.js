window.addEventListener('DOMContentLoaded', () => {
    //loading saved stuff
    let touchCount = Number(localStorage.getItem('touchCount')) || 0;
    let touchCount2 = Number(localStorage.getItem('touchCount2')) || 0;
    const touchCountDisplay = document.getElementById('touch-count');
    const character = document.getElementById('femboy-character');
    const touchSound = new Audio('assets/sounds/touch.mp3');
    const clickFx = new Audio('assets/sounds/Clickfx1.mp3');

    const touchCountDisplay2 = document.getElementById('touch-count-2');
    const character2 = document.getElementById('femboy-character-2');
    const touchSound2 = new Audio('assets/sounds/touch.mp3');

    // +1 
    const plusOne = document.getElementById('plus-one');
    const plusOne2 = document.getElementById('plus-one-2');

    // Progress bar stuff
    const progressBar = document.getElementById('progress-bar');
    const progressBar2 = document.getElementById('progress-bar-2');
    const progressHearts = document.getElementById('progress-hearts');
    const progressHearts2 = document.getElementById('progress-hearts-2');
    const HEART_COUNT = 7;
    const milestones = [10, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 600];

    // CD
    let canAnimate = true;
    let canAnimate2 = true;

    function showPlusOne(el) {
        if (!el) return;
        el.textContent = '+1';
        el.classList.add('show');
        setTimeout(() => {
            el.classList.remove('show');
            el.textContent = '';
        }, 600);
    }

    // Milestones :p
    function checkMilestones(count) {
        if (count === 10) showMilestone("You're getting a little *too* into this...");
        else if (count === 50) showMilestone("Fifty?! You're shameless");
        else if (count === 100) showMilestone("Alright bud... 100 touches? You need to hop off and touch some grass");
        else if (count === 150) showMilestone("150... This is getting out of hand...");
        else if (count === 200) showMilestone("200 touches. Are you okay?");
        else if (count === 250) showMilestone("A quarter thousand! Legendary persistence... is what I would say if that was a good thing...");
        else if (count === 300) showMilestone("300... Femboy might give you a little treat if you keep this up");
        else if (count === 350) showMilestone("350... This is your legacy now.");
        else if (count === 400) showMilestone("400?? The femboy is starting to like you");
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

    // Progress bar helpers
    function getNextMilestone(count) {
        for (let i = 0; i < milestones.length; i++) {
            if (count < milestones[i]) {
                return milestones[i];
            }
        }
        return milestones[milestones.length - 1];
    }
    function getPrevMilestone(count) {
        let prev = 0;
        for (let i = 0; i < milestones.length; i++) {
            if (count < milestones[i]) {
                return prev;
            }
            prev = milestones[i];
        }
        return prev;
    }
    function renderHearts(container, count, progress) {
        if (!container) return;
        container.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const heartPos = (i + 0.5) / count;
            const filled = progress >= heartPos;
            container.innerHTML += `<span style="opacity:${filled ? 1 : 0.5}">${filled ? '💖' : '🤍'}</span>`;
        }
    }
    function updateProgressBar(count, bar, heartsContainer) {
        if (!bar || !heartsContainer) return;
        const next = getNextMilestone(count);
        const prev = getPrevMilestone(count);
        const progress = Math.min(1, (count - prev) / (next - prev));
        bar.style.width = (progress * 100) + "%";
        renderHearts(heartsContainer, HEART_COUNT, progress);
    }

    // Milestone image map for main character
    const milestoneImages = {
        150: "assets/sprites/femboy1(150).png",
        300: "assets/sprites/femboy1(300).png",
        450: "assets/sprites/femboy1(450).png"
    };

    // Reusable function to check milestones, swap image, and show message
    function handleMilestone(count, characterImg, baseImg, milestoneMap) {
        // Find the highest milestone less than or equal to count
        let milestoneSrc = baseImg;
        let highest = 0;
        for (const key of Object.keys(milestoneMap)) {
            const milestone = Number(key);
            if (count >= milestone && milestone >= highest) {
                milestoneSrc = milestoneMap[key];
                highest = milestone;
            }
        }

        // Only change if different to avoid flicker
        if (characterImg.src.endsWith(milestoneSrc) || characterImg.src.endsWith(baseImg)) {
            if (!characterImg.src.endsWith(milestoneSrc)) {
                characterImg.style.opacity = "0";
                setTimeout(() => {
                    characterImg.src = milestoneSrc;
                    characterImg.onload = () => {
                        characterImg.style.opacity = "1";
                    };
                }, 180);
            }
        } else {
            // Always fade for robustness
            characterImg.style.opacity = "0";
            setTimeout(() => {
                characterImg.src = milestoneSrc;
                characterImg.onload = () => {
                    characterImg.style.opacity = "1";
                };
            }, 180);
        }

        // Show milestone message
        checkMilestones(count);
    }

    function updateTouchCount() {
        touchCount++;
        touchCountDisplay.textContent = `Touches: ${touchCount}`;
        localStorage.setItem('touchCount', touchCount);
        // Handle milestone image and message
        handleMilestone(
            touchCount,
            character,
            "assets/sprites/femboy1.png",
            milestoneImages
        );
        updateProgressBar(touchCount, progressBar, progressHearts);
    }

    function playTouchSound() {
        if (!canAnimate) return;
        touchSound.currentTime = 0;
        touchSound.play();
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

    function updateTouchCount2() {
        touchCount2++;
        touchCountDisplay2.textContent = `Touches: ${touchCount2}`;
        localStorage.setItem('touchCount2', touchCount2);
        // You can add a similar milestoneImages2 and handleMilestone for character2 if desired
        checkMilestones(touchCount2);
        updateProgressBar(touchCount2, progressBar2, progressHearts2);
    }

    function playTouchSound2() {
        if (!canAnimate2) return;
        touchSound2.currentTime = 0;
        touchSound2.play();
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

    // hearts
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

    // Hold to shrink and restore
    function shrinkCharacter(target) {
        target.style.transition = "transform 0.25s cubic-bezier(.4,2,.6,1)";
        target.style.transform = "scale(0.85)";
    }
    function restoreCharacter(target) {
        target.style.transition = "transform 0.25s cubic-bezier(.4,2,.6,1)";
        target.style.transform = "";
    }

    // Touch/click handlers
    function handleTouch(e) {
        if (e.type === "touchstart") e.preventDefault();
        if (!canAnimate) return;
        updateTouchCount();
        playTouchSound();
        clickFx.currentTime = 0;
        clickFx.play();
        animateCharacter();
        createHeartEffect(character);
        showPlusOne(plusOne);
    }
    function handleTouch2(e) {
        if (e.type === "touchstart") e.preventDefault();
        if (!canAnimate2) return;
        updateTouchCount2();
        playTouchSound2();
        animateCharacter2();
        createHeartEffect(character2);
        showPlusOne(plusOne2);
    }

    // Event stuff
    character.addEventListener('click', handleTouch);
    character.addEventListener('touchstart', handleTouch, { passive: false });
    character2.addEventListener('click', handleTouch2);
    character2.addEventListener('touchstart', handleTouch2, { passive: false });

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

    // Touch count display 
    touchCountDisplay.textContent = `Touches: ${touchCount}`;
    touchCountDisplay2.textContent = `Touches: ${touchCount2}`;
    updateProgressBar(touchCount, progressBar, progressHearts);
    updateProgressBar(touchCount2, progressBar2, progressHearts2);

    // Reseter 
    const resetBtn = document.getElementById('reset-touches-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            touchCount = 0;
            touchCount2 = 0;
            localStorage.setItem('touchCount', touchCount);
            localStorage.setItem('touchCount2', touchCount2);
            touchCountDisplay.textContent = `Touches: ${touchCount}`;
            touchCountDisplay2.textContent = `Touches: ${touchCount2}`;
            updateProgressBar(touchCount, progressBar, progressHearts);
            updateProgressBar(touchCount2, progressBar2, progressHearts2);
        });
    }

    // Scroll but
    const scrollBtn = document.getElementById('scroll-down-btn');
    if (scrollBtn) {
        scrollBtn.addEventListener('click', () => {
            const secondContainer = document.getElementById('second-character-container');
            if (secondContainer) {
                secondContainer.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // thheme toggle
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

    // load theme 
    if (localStorage.getItem('theme') === 'light') {
        setTheme(false);
    } else {
        setTheme(true);
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            setTheme(!darkMode);
            localStorage.setItem('theme', darkMode ? 'dark' : 'light');
        });
    }
});
