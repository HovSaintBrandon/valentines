// ============================================
// RANDOM GALLERY ASSETS
// ============================================
const galleryAssets = [
    "photo-1.jpeg", "photo-2.jpeg", "photo-3.jpeg", "photo-4.jpeg", "photo-5.jpeg",
    "video-1.mp4", "video-10.mp4", "video-11.mp4", "video-12.mp4", "video-13.mp4",
    "video-14.mp4", "video-15.mp4", "video-16.mp4", "video-17.mp4", "video-18.mp4",
    "video-19.mp4", "video-2.mp4", "video-20.mp4", "video-21.mp4", "video-22.mp4",
    "video-23.mp4", "video-24.mp4", "video-25.mp4", "video-26.mp4", "video-27.mp4",
    "video-28.mp4", "video-29.mp4", "video-3.mp4", "video-30.mp4", "video-4.mp4",
    "video-5.mp4", "video-6.mp4", "video-7.mp4", "video-8.mp4", "video-9.mp4"
];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function populateGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const shuffledAssets = shuffleArray([...galleryAssets]);

    galleryItems.forEach((item, index) => {
        if (index < shuffledAssets.length) {
            const asset = shuffledAssets[index];
            const isVideo = asset.endsWith('.mp4');
            item.innerHTML = ''; // Clear placeholder

            if (isVideo) {
                const video = document.createElement('video');
                video.src = `assets/${asset}`;
                video.autoplay = true;
                video.loop = true;
                video.muted = true;
                video.playsInline = true;
                video.style.width = '100%';
                video.style.height = '100%';
                video.style.objectFit = 'cover';
                item.appendChild(video);
            } else {
                const img = document.createElement('img');
                img.src = `assets/${asset}`;
                img.alt = 'Our memory';
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                item.appendChild(img);
            }
        }
    });
}

// Call populateGallery on load
document.addEventListener('DOMContentLoaded', populateGallery);

// ============================================
// FLOATING HEARTS BACKGROUND
// ============================================
function createFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    const hearts = [
        { size: 16, top: '10%', left: '5%', delay: '0s' },
        { size: 20, top: '20%', right: '8%', delay: '0.5s' },
        { size: 14, top: '40%', left: '3%', delay: '1s' },
        { size: 18, top: '60%', right: '5%', delay: '1.5s' },
        { size: 12, top: '75%', left: '8%', delay: '2s' },
        { size: 16, top: '85%', right: '10%', delay: '0.3s' },
    ];

    hearts.forEach((heart, i) => {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'currentColor');
        svg.style.width = heart.size + 'px';
        svg.style.height = heart.size + 'px';
        svg.style.top = heart.top;
        if (heart.left) svg.style.left = heart.left;
        if (heart.right) svg.style.right = heart.right;
        svg.style.animationDelay = heart.delay;
        svg.classList.add('text-primary', 'floating-heart');
        svg.style.opacity = '0.3';
        svg.innerHTML = '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>';
        container.appendChild(svg);
    });
}
createFloatingHearts();
// ============================================
// VALENTINE PROPOSAL
// ============================================
const noMessages = [
    "No", "Are you sure?", "Really sure?", "Think again!", "Last chance!",
    "Surely not?", "You might regret this!", "Give it another thought!",
    "Are you crazy?!", "Reconsider please!", "My heart will break 💔",
    "I'm gonna cry...", "You're breaking my heart!", "Think of the chocolates!",
    "SAY YES ALREADY!"
];

let noCount = 0;
const noButton = document.getElementById('noButton');
const yesButton = document.getElementById('yesButton');
const hintText = document.getElementById('hintText');
const questionState = document.getElementById('questionState');
const celebrationState = document.getElementById('celebrationState');
const proposalContainer = document.getElementById('proposalContainer');

function handleNoHover() {
    const container = proposalContainer.getBoundingClientRect();
    const maxX = container.width - 120;
    const maxY = container.height - 50;

    const randomX = Math.random() * maxX - maxX / 2;
    const randomY = Math.random() * maxY - maxY / 2;
    const randomRotate = Math.random() * 30 - 15;

    noButton.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
    noCount = Math.min(noCount + 1, noMessages.length - 1);
    noButton.textContent = noMessages[noCount];

    // Grow the yes button
    yesButton.style.fontSize = (1.5 + noCount * 0.1) + 'rem';

    if (noCount > 3) {
        hintText.classList.remove('hidden');
    }
}

function handleYes() {
    questionState.classList.add('hidden');
    celebrationState.classList.remove('hidden');

    // Massive celebration confetti
    const duration = 8000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 100, zIndex: 100 };

    const interval = setInterval(() => {
        const timeRemaining = animationEnd - Date.now();
        if (timeRemaining <= 0) return clearInterval(interval);

        const particleCount = 80 * (timeRemaining / duration);

        confetti({
            ...defaults,
            particleCount,
            origin: { x: 0.1 + Math.random() * 0.2, y: Math.random() - 0.2 },
            colors: ['#f9a8d4', '#fcd34d', '#c084fc', '#f472b6', '#ff6b6b', '#ff0000'],
            shapes: ['circle'],
        });
        confetti({
            ...defaults,
            particleCount,
            origin: { x: 0.7 + Math.random() * 0.2, y: Math.random() - 0.2 },
            colors: ['#f9a8d4', '#fcd34d', '#c084fc', '#f472b6', '#ff6b6b', '#ff0000'],
            shapes: ['circle'],
        });
    }, 200);
}

noButton.addEventListener('mouseenter', handleNoHover);
noButton.addEventListener('touchstart', handleNoHover);
noButton.addEventListener('click', handleNoHover);
yesButton.addEventListener('click', handleYes);
// ============================================
// COUNTDOWN TIMER
// ============================================
const countdownState = document.getElementById('countdownState');
const valentinesCelebration = document.getElementById('valentinesCelebration');
let hasTriggeredConfetti = false;

function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();

    // Valentine's Day is February 14th
    let valentinesThisYear = new Date(currentYear, 1, 14);
    let valentinesNextYear = new Date(currentYear + 1, 1, 14);

    // Check if today is Valentine's Day
    const isToday = now.getMonth() === 1 && now.getDate() === 14;

    if (isToday) {
        countdownState.classList.add('hidden');
        valentinesCelebration.classList.remove('hidden');

        if (!hasTriggeredConfetti) {
            triggerValentinesConfetti();
            hasTriggeredConfetti = true;
        }
    } else {
        countdownState.classList.remove('hidden');
        valentinesCelebration.classList.add('hidden');

        let targetDate = now < valentinesThisYear ? valentinesThisYear : valentinesNextYear;
        const difference = targetDate.getTime() - now.getTime();

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
}

function triggerValentinesConfetti() {
    const duration = 5000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const interval = setInterval(() => {
        const timeRemaining = animationEnd - Date.now();
        if (timeRemaining <= 0) return clearInterval(interval);

        const particleCount = 50 * (timeRemaining / duration);

        confetti({
            ...defaults,
            particleCount,
            origin: { x: 0.1 + Math.random() * 0.2, y: Math.random() - 0.2 },
            colors: ['#ff6b6b', '#ff0000', '#f9a8d4', '#ff1493', '#ff69b4'],
            shapes: ['circle'],
        });
        confetti({
            ...defaults,
            particleCount,
            origin: { x: 0.7 + Math.random() * 0.2, y: Math.random() - 0.2 },
            colors: ['#ff6b6b', '#ff0000', '#f9a8d4', '#ff1493', '#ff69b4'],
            shapes: ['circle'],
        });
    }, 250);

    // Continuous confetti on Valentine's Day
    setInterval(() => {
        confetti({
            particleCount: 15,
            spread: 60,
            origin: { x: Math.random(), y: Math.random() - 0.2 },
            colors: ['#ff6b6b', '#ff0000', '#f9a8d4', '#ff1493'],
            shapes: ['circle'],
        });
    }, 3000);
}

updateCountdown();
setInterval(updateCountdown, 1000);
// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
