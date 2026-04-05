// DOM Elements
const introScreen = document.getElementById('intro-screen');
const mainSite = document.getElementById('main-site');
const typingText = document.getElementById('typing-text');
const enterBtn = document.getElementById('enter-btn');
const themeToggle = document.getElementById('theme-toggle');
const book = document.querySelector('.book');
const pages = document.querySelectorAll('.page');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const surprisePopup = document.getElementById('surprise-popup');
const yesBtn = document.getElementById('yes-btn');
const bgMusic = document.getElementById('bg-music');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messageDisplay = document.getElementById('message-display');

// Variables
let currentPage = 0;
let isPastel = true; // Default theme

// Typing Animation for Intro
const text = "To The Most Amazing Mom In My Life...";
let index = 0;
function typeWriter() {
    if (index < text.length) {
        typingText.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100);
    }
}
typeWriter();

// Countdown Timer - MOM'S BIRTHDAY April 6th
function updateCountdown() {
    const now = new Date();
    const birthday = new Date(now.getFullYear(), 3, 6); // April 6th (month 3 = April)
    if (now > birthday) birthday.setFullYear(now.getFullYear() + 1);
    
    const diff = birthday - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    document.getElementById('time-left').textContent = `${days}d ${hours}h ${minutes}m`;
}
updateCountdown();
setInterval(updateCountdown, 60000);
// Enter Button: Fade to Main Site and Auto-Play Music
enterBtn.addEventListener('click', () => {
    introScreen.classList.add('fade-out');
    setTimeout(() => {
        mainSite.classList.remove('hidden');
        bgMusic.volume = 0.3; // Low volume
        bgMusic.play(); // Auto-play attempt
    }, 1000);
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
    isPastel = !isPastel;
    document.body.className = isPastel ? 'pastel' : 'dark';
    themeToggle.textContent = isPastel ? 'Switch to Dark Theme 🌙' : 'Switch to Pastel Theme 🌸';
});

// Book Page Flipping
function updatePages() {
    pages.forEach((page, i) => {
        if (i < currentPage) {
            page.classList.add('flipped');
            page.classList.remove('active');
            page.style.zIndex = i + 1; // Lower z-index for flipped (previous) pages
        } else if (i === currentPage) {
            page.classList.add('active');
            page.classList.remove('flipped');
            page.style.zIndex = 100; // High z-index for active page (on top)
        } else {
            page.classList.remove('active', 'flipped');
            page.style.zIndex = 0; // Lowest z-index for future pages (hidden below)
        }
    });
    // Progress Meter
    const progress = ((currentPage + 1) / pages.length) * 100;
    const fill = document.getElementById(`love-fill-page${currentPage + 1}`);
    if (fill) fill.style.width = progress + '%';
    // Show surprise popup on last page
    if (currentPage === pages.length - 1) {
        setTimeout(() => surprisePopup.classList.remove('hidden'), 500);
    }
}

nextBtn.addEventListener('click', () => {
    if (currentPage < pages.length - 1) {
        currentPage++;
        updatePages();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        updatePages();
        surprisePopup.classList.add('hidden'); // Hide popup if going back
    }
});

// Surprise Popup: YES Button with Confetti
yesBtn.addEventListener('click', () => {
    alert('Forever grateful! 🌟');
    surprisePopup.classList.add('hidden');
    // Confetti Effect
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 3000);
    }
});

// Message Form
messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageDisplay.textContent = `Your message: "${messageInput.value}" 🌟`;
    messageInput.value = '';
});

// Initial Setup
updatePages();