const CONFIG = {
    mainQuestion: "Will you be my Valentine?",
    subQuestion: "Please say yes... and be the reason I smile",
    yesButton: "YES",
    noButton: "NO",
    noEscapeTexts: ["Try again, sweetie! You can't do that!", "No no no!!!", "Too late... I’m choosing YES for you 💘"],
    confirmTitle: "You are officially my Valentine now, on this very special day",
    confirmText: "You're not just the person I love; you are the reason I believe in love and on this Valentine's day, I want to affirm the depth of feelings I have for you...",
    badgeText: "",
    nextButton: "Next ",
    repeatButton: "Go back",
    flowerTitle: "Here is a special gift for you",
    takeBouquetButton: "Please accept it ",
    bouquetMessage: "Awwwwww! It's yours now 💞",
    nextFlowerButton: "Next ",
    collageTitle: "This is Us ❤️ (⁠o ´ ᵕ `⁠)⁠っ",
    collageSubtitle: "Even when you are not physically here, you are always in my heart, in the songs I hear, in the little moments that I suddenly cherish because they remind me of you...",
    nextCollageButton: "One more page... ",
    finalTitle: "I will always love you with everything I am ❤️",
    finalMessage: `Love sometimes feels like an understatement when I think about how I feel about you. Every couple thinks their love story is the best, but I genuinely believe ours tops the list. Ever since you came into my life, every little thing, every little moment and everything around me just got a whole lot brighter. It's not merely today, but each day that you grace my existence with your love. For all the days you have made me feel beloved, loved and valued, I am at a loss for words to convey how thankful I am to exist within the safe and loving space you do your best to create for us every day, to be chosen by you as your wife and your closest confidante, and this reality and every future plan with you.

Your love is like a splash of color on a dull canvas, changing my reality into a work of art that even my biggest dreams couldn't come close in describing.

There's so much about you that I just adore with every fibber of my heart. The way you stand strong and true, the unyielding love for those you hold dear. Your beautiful heart, it's more precious than a kingdom’s legacy. To be completely honest, being with you has changed me for the better, absolutely better. Better than anyone in my entire life, and better than I ever imagined. You warm my heart with your presence, your love, attention and care, your support and concern. From the small greedings to the echo of our shared memories, I know every bit of me wouldn't sacrifice a single second of that for anything in the world.

From the very first day, you've always been there for me. You've been my a source of support and happiness, and you've held me firmly without cracking or breaking. You've kept yourself firm and upright for us and nothing in this world seems enough for me to show you how much I appreciate you.

I just want to say thanks for all the good times we've had - the memories, those moments we spent together. Your very existence alone serves as the best example of what it means to be the most outstanding, wonderful and loving person in the world. In any room, in any world, you are the most noteworthy Man. You are the standard by which everyone else is appraised, and you are undoubtedly the best of all who exist.

I just want you to know that you mean everything to me. I want to learn you and love you the way you want and deserve to be loved. I want to be the picture perfect girlfriend and wife you've always imagined.

I promise to keep loving, to respect you and cherish you always. You mean the world to me, and I can't wait to see where our story goes from here.

Happy Valentine's day and one year of our story, my Beloved Man  💖`,
    restartButton: "Restart ",
    copyButton: "Copy Message ",
    copySuccess: "Pesan berhasil dicopy! "
};

const state = { currentPage: 1, hasClickedYes: false, noClickCount: 0, bouquetTaken: false, musicPlaying: false, photos: [null, null, null, null] };

const elements = {
    pages: document.querySelectorAll('.page'),
    yesBtn: document.getElementById('yesBtn'),
    noBtn: document.getElementById('noBtn'),
    noEscapeText: document.getElementById('noEscapeText'),
    nextToPage3: document.getElementById('nextToPage3'),
    backToPage1: document.getElementById('backToPage1'),
    bouquet: document.getElementById('bouquet'),
    takeBouquet: document.getElementById('takeBouquet'),
    nextToPage4: document.getElementById('nextToPage4'),
    bouquetMessage: document.getElementById('bouquetMessage'),
    petalsContainer: document.getElementById('petalsContainer'),

    nextToPage5: document.getElementById('nextToPage5'),
    restartBtn: document.getElementById('restartBtn'),
    copyBtn: document.getElementById('copyBtn'),
    copyNotif: document.getElementById('copyNotif'),
    confettiContainer: document.getElementById('confettiContainer'),
    musicBtn: document.getElementById('musicBtn'),
    bgMusic: document.getElementById('bgMusic'),
    heartCanvas: document.getElementById('heartCanvas'),
    sparkleContainer: document.getElementById('sparkleContainer'),
    envelopeWrapper: document.getElementById('envelopeWrapper'),
    envelope: document.getElementById('envelope'),
    finalContent: document.getElementById('finalContent')
};

function createSparkles() {
    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        sparkle.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
        elements.sparkleContainer.appendChild(sparkle);
    }
}

function navigateTo(pageNumber) {
    const currentPageEl = document.getElementById(`page${state.currentPage}`);
    const nextPageEl = document.getElementById(`page${pageNumber}`);
    if (!currentPageEl || !nextPageEl) return;

    currentPageEl.classList.add('fade-out');
    currentPageEl.classList.remove('active');

    setTimeout(() => {
        currentPageEl.classList.remove('fade-out');
        nextPageEl.classList.add('active');
        state.currentPage = pageNumber;
        if (pageNumber === 5) resetEnvelope();
        if (pageNumber === 3) startFallingPetals();
    }, 400);
}

function handleYesClick() {
    state.hasClickedYes = true;
    navigateTo(2);
}

function handleNoClick() {
    state.noClickCount++;
    const noBtn = elements.noBtn;

    noBtn.classList.add('shake');
    setTimeout(() => noBtn.classList.remove('shake'), 500);

    if (state.noClickCount <= 2) {
        elements.noEscapeText.textContent = CONFIG.noEscapeTexts[state.noClickCount - 1];
        elements.noEscapeText.classList.remove('hidden');
    } else {
        elements.noEscapeText.textContent = CONFIG.noEscapeTexts[2];
        elements.noEscapeText.classList.remove('hidden');
        setTimeout(() => { state.hasClickedYes = true; navigateTo(2); }, 1500);
    }
}

function handleTakeBouquet() {
    if (state.bouquetTaken) return;
    state.bouquetTaken = true;
    elements.bouquet.classList.add('bounce');
    setTimeout(() => {
        elements.bouquet.classList.remove('bounce');
        elements.bouquetMessage.classList.remove('hidden');
        elements.takeBouquet.classList.add('hidden');
        elements.nextToPage4.classList.remove('hidden');
    }, 800);
}

let petalInterval;
function startFallingPetals() {
    elements.petalsContainer.innerHTML = '';
    for (let i = 0; i < 15; i++) setTimeout(() => createPetal(), i * 200);
    if (petalInterval) clearInterval(petalInterval);
    petalInterval = setInterval(() => { if (state.currentPage === 3) createPetal(); }, 600);
}

function createPetal() {
    const petal = document.createElement('div');
    petal.className = 'petal';
    const colors = ['#f9a8d4', '#f472b6', '#ec4899', '#fbcfe8'];
    petal.style.background = `linear-gradient(135deg, ${colors[Math.floor(Math.random() * colors.length)]}, ${colors[Math.floor(Math.random() * colors.length)]})`;
    petal.style.left = Math.random() * 100 + '%';
    petal.style.animationDuration = (Math.random() * 4 + 5) + 's';
    petal.style.width = (Math.random() * 18 + 12) + 'px';
    petal.style.height = petal.style.width;
    petal.style.opacity = Math.random() * 0.4 + 0.4;
    elements.petalsContainer.appendChild(petal);
    setTimeout(() => petal.remove(), 9000);
}

function handlePhotoUpload(index, event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
        state.photos[index] = e.target.result;
        elements.photoPreviews[index].src = e.target.result;
        elements.photoPreviews[index].classList.remove('hidden');
        elements.photoLabels[index].style.opacity = '0';
    };
    reader.readAsDataURL(file);
}

function triggerConfetti() {
    elements.confettiContainer.innerHTML = '';
    const hearts = ['💖', '💕', '💗', '💓', '💞', '💝', '❤️', '🩷', '✨', '🌸'];
    for (let i = 0; i < 60; i++) {
        setTimeout(() => {
            const confetti = document.createElement('span');
            confetti.className = 'confetti-heart';
            confetti.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.fontSize = (Math.random() * 1.8 + 1) + 'rem';
            confetti.style.animationDelay = Math.random() * 0.3 + 's';
            elements.confettiContainer.appendChild(confetti);
            setTimeout(() => confetti.remove(), 4500);
        }, i * 50);
    }
}

function resetEnvelope() {
    elements.envelopeWrapper.classList.remove('hidden', 'fade-out');
    elements.envelope.classList.remove('opened', 'letter-exit');
    elements.finalContent.classList.add('hidden');
    elements.finalContent.classList.remove('reveal');
    const hint = document.getElementById('envelopeHint');
    if (hint) hint.classList.remove('fade');
}

function handleEnvelopeClick() {
    if (elements.envelope.classList.contains('opened')) return;

    const hint = document.getElementById('envelopeHint');

    elements.envelope.classList.add('opened');
    if (hint) hint.classList.add('fade');

    setTimeout(() => {
        elements.envelope.classList.add('letter-exit');
    }, 600);

    setTimeout(() => {
        elements.envelopeWrapper.classList.add('fade-out');
    }, 1200);

    setTimeout(() => {
        elements.envelopeWrapper.classList.add('hidden');
        elements.finalContent.classList.remove('hidden');
        elements.finalContent.classList.add('reveal');
    }, 1700);
}

function handleCopyMessage() {
    navigator.clipboard.writeText(CONFIG.finalMessage).then(() => {
        elements.copyNotif.classList.remove('hidden');
        setTimeout(() => elements.copyNotif.classList.add('hidden'), 2500);
    }).catch(() => {
        const textarea = document.createElement('textarea');
        textarea.value = CONFIG.finalMessage;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        elements.copyNotif.classList.remove('hidden');
        setTimeout(() => elements.copyNotif.classList.add('hidden'), 2500);
    });
}

function handleRestart() {
    state.hasClickedYes = false;
    state.noClickCount = 0;
    state.bouquetTaken = false;
    elements.noBtn.classList.remove('escaping');
    elements.noBtn.style.left = '';
    elements.noBtn.style.top = '';
    elements.noEscapeText.classList.add('hidden');
    elements.bouquetMessage.classList.add('hidden');
    elements.takeBouquet.classList.remove('hidden');
    elements.nextToPage4.classList.add('hidden');
    elements.confettiContainer.innerHTML = '';
    navigateTo(1);
}

class HeartParticle {
    constructor(canvas) {
        this.canvas = canvas;
        this.reset();
    }
    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = this.canvas.height + 50;
        this.size = Math.random() * 18 + 10;
        this.speedY = Math.random() * 1.2 + 0.6;
        this.speedX = (Math.random() - 0.5) * 0.6;
        this.opacity = Math.random() * 0.5 + 0.25;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.025;
        const colors = ['rgba(244,114,182,', 'rgba(236,72,153,', 'rgba(251,113,133,', 'rgba(249,168,212,', 'rgba(232,121,249,'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
        this.y -= this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.01) * 0.4;
        this.rotation += this.rotationSpeed;
        if (this.y < -50) this.reset();
    }
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.fillStyle = this.color + this.opacity + ')';
        const s = this.size;
        ctx.moveTo(0, s / 4);
        ctx.bezierCurveTo(s / 2, -s / 2, s, s / 4, 0, s);
        ctx.bezierCurveTo(-s, s / 4, -s / 2, -s / 2, 0, s / 4);
        ctx.fill();
        ctx.restore();
    }
}

class ParticleSystem {
    constructor() {
        this.canvas = elements.heartCanvas;
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 35;
        this.resize();
        this.init();
        this.animate();
        window.addEventListener('resize', () => this.resize());
    }
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    init() {
        for (let i = 0; i < this.particleCount; i++) {
            const p = new HeartParticle(this.canvas);
            p.y = Math.random() * this.canvas.height;
            this.particles.push(p);
        }
    }
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles.forEach(p => { p.update(); p.draw(this.ctx); });
        requestAnimationFrame(() => this.animate());
    }
}

function applyConfig() {
    document.getElementById('mainQuestion').textContent = CONFIG.mainQuestion;
    document.getElementById('subQuestion').textContent = CONFIG.subQuestion;
    elements.yesBtn.querySelector('.btn-text').textContent = CONFIG.yesButton;
    elements.noBtn.querySelector('.btn-text').textContent = CONFIG.noButton;
    document.getElementById('confirmTitle').textContent = CONFIG.confirmTitle;
    document.getElementById('confirmText').textContent = CONFIG.confirmText;
    document.querySelector('.badge-text').textContent = CONFIG.badgeText;
    elements.nextToPage3.querySelector('.btn-text').textContent = CONFIG.nextButton;
    elements.backToPage1.textContent = CONFIG.repeatButton;
    document.getElementById('flowerTitle').textContent = CONFIG.flowerTitle;
    elements.takeBouquet.querySelector('.btn-text').textContent = CONFIG.takeBouquetButton;
    elements.bouquetMessage.textContent = CONFIG.bouquetMessage;
    elements.nextToPage4.querySelector('.btn-text').textContent = CONFIG.nextFlowerButton;
    document.getElementById('collageTitle').textContent = CONFIG.collageTitle;
    document.getElementById('collageSubtitle').textContent = CONFIG.collageSubtitle;
    elements.nextToPage5.querySelector('.btn-text').textContent = CONFIG.nextCollageButton;
    document.getElementById('finalTitle').textContent = CONFIG.finalTitle;
    document.getElementById('finalMessage').textContent = CONFIG.finalMessage;
    elements.restartBtn.querySelector('.btn-text').textContent = CONFIG.restartButton;
    elements.copyBtn.querySelector('.btn-text').textContent = CONFIG.copyButton;
    elements.copyNotif.textContent = CONFIG.copySuccess;
}

function initEventListeners() {
    elements.yesBtn.addEventListener('click', handleYesClick);
    elements.noBtn.addEventListener('click', handleNoClick);
    elements.nextToPage3.addEventListener('click', () => navigateTo(3));
    elements.backToPage1.addEventListener('click', () => navigateTo(1));
    elements.takeBouquet.addEventListener('click', handleTakeBouquet);
    elements.nextToPage4.addEventListener('click', () => navigateTo(4));

    elements.nextToPage5.addEventListener('click', () => navigateTo(5));
    elements.restartBtn.addEventListener('click', handleRestart);
    elements.copyBtn.addEventListener('click', handleCopyMessage);
    if (elements.musicBtn) elements.musicBtn.addEventListener('click', toggleMusic);
    if (elements.envelopeWrapper) elements.envelopeWrapper.addEventListener('click', handleEnvelopeClick);
}

document.addEventListener('DOMContentLoaded', () => {
    applyConfig();
    createSparkles();
    new ParticleSystem();
});

function startLoveTimer() {
    const timer = document.getElementById('loveTimer');
    if (!timer) return;

    // February 14, 2025 at 21:00 Ukraine time
    const startDate = new Date('2025-02-14T19:00:00Z'); 

    function update() {
        const now = new Date();
        const diff = now - startDate;

        if (diff < 0) {
            timer.innerHTML = "Our time hasn’t started yet ❤️";
            return;
        }

        const totalSeconds = Math.floor(diff / 1000);

        const days = Math.floor(totalSeconds / (60 * 60 * 24));
        const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
        const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
        const seconds = totalSeconds % 60;

        timer.innerHTML = `
            <div style="
                font-size:18px;
                font-weight:600;
                letter-spacing:1px;
                padding:10px 20px;
                border-radius:20px;
                background:rgba(255,255,255,0.15);
                backdrop-filter:blur(10px);
                display:inline-block;
            ">
                ❤️ ${days}d ${hours}h ${minutes}m ${seconds}s
            </div>
        `;
    }

    update();
    setInterval(update, 1000);
}

document.addEventListener('DOMContentLoaded', startLoveTimer);
