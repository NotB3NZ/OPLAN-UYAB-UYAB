const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
let dodgeCount = 0;

// --- SCENE 1 LOGIC ---
noBtn.addEventListener('mouseenter', () => {
    if (dodgeCount < 4) {
        if (dodgeCount === 0) {
            noBtn.style.position = 'fixed';
        }
        const padding = 50; 
        const newX = Math.random() * (window.innerWidth - noBtn.offsetWidth - padding);
        const newY = Math.random() * (window.innerHeight - noBtn.offsetHeight - padding);
        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;
        dodgeCount++;
    } else {
        noBtn.style.pointerEvents = 'none';
        noBtn.classList.add('pop-out');
        setTimeout(() => { noBtn.remove(); }, 400);
    }
});

yesBtn.addEventListener('click', () => {
    document.getElementById('scene1').classList.remove('active');
    document.getElementById('scene1').style.display = 'none';
    document.getElementById('scene2').classList.add('active');
    document.getElementById('scene2').style.display = 'block';
    startTulipAnimation();
});

// --- SCENE 2 LOGIC ---
function startTulipAnimation() {
    const container = document.getElementById('flower-container');
    const music = document.getElementById('bgMusic');
    
    music.play().catch(e => console.log("Audio play blocked"));

    const colors = ['#ffb7c5', '#f2a2e8', '#ff9aa2', '#c7ceea', '#ff8b94', '#ffd1dc'];
    const totalTulips = 50;

    for (let i = 0; i < totalTulips; i++) {
        const tulip = document.createElement('div');
        tulip.classList.add('tulip');
        const randomLeft = Math.random() * 100;
        const randomHeight = 150 + Math.random() * 250;
        const randomDelay = Math.random() * 3000;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        tulip.style.left = `${randomLeft}vw`;
        tulip.style.zIndex = Math.floor(randomHeight);
        
        tulip.innerHTML = `
            <div class="flower-head" style="background-color: ${color}; transition-delay: ${randomDelay + 1000}ms;"></div>
            <div class="stem" style="height: 0; transition-delay: ${randomDelay}ms;"></div>
        `;
        container.appendChild(tulip);

        setTimeout(() => {
            tulip.classList.add('bloom');
            tulip.querySelector('.stem').style.height = `${randomHeight}px`;
        }, 100);
    }

    setTimeout(() => {
        const nextBtn = document.getElementById('proceedToGame');
        nextBtn.classList.remove('hidden');
        nextBtn.classList.add('show');
    }, 5000);
}

// --- SCENE 3 LOGIC (Moved outside of startTulipAnimation) ---
function goToScene3() {
    document.getElementById('scene2').classList.remove('active');
    document.getElementById('scene2').style.display = 'none';

    const scene3 = document.getElementById('scene3');
    scene3.classList.add('active');
    scene3.style.display = 'flex'; // Changed to flex for centering

    loadQuestion();
}

const questions = [
    {
        q: "What was your favorite place we ate at?",
        options: ["JH Garden Cafe", "Coze Cat Cafe", "Dirty Sanchez", "Love, Luka"],
        myAnswer: "Dirty Sanchez"
    },
    {
        q: "What was your favourite food made by me?",
        options: ["Lasagna", "Revel Bars", "Cinnamon Roll", "Brownies"],
        myAnswer: "Cinnamon Roll"
    },
    {
        q: "What is your favourite date activity?",
        options: ["Origami", "Diamond Painting", "Museum Bingo", "Roblox"],
        myAnswer: "Museum Bingo"
    },
    {
        q: "Whats your favourite gift from me so far?",
        options: ["Ariana Grande Perfume", "Explosion Box", "Bibble Plush", "Watch"],
        myAnswer: "Ariana Grande Perfume"
    }
];

let currentQuestionIndex = 0;

function loadQuestion() {
    const currentQ = questions[currentQuestionIndex];
    document.getElementById('question-text').innerText = currentQ.q;
    const grid = document.getElementById('choices-grid');
    grid.innerHTML = ''; 

    currentQ.options.forEach(option => {
        const btn = document.createElement('button');
        btn.classList.add('choice-btn');
        btn.innerText = option;
        btn.onclick = () => handleChoice(option);
        grid.appendChild(btn);
    });
}

function handleChoice(choice) {
    const popup = document.getElementById('answer-popup');
    const popupText = document.getElementById('popup-text');
    const myAnswer = questions[currentQuestionIndex].myAnswer;

    // Check if her choice matches your pick
    if (choice === myAnswer) {
        popupText.innerText = `You picked ${choice}! OMG, that was my pick too! 🥰`;
    } else {
        popupText.innerText = `You picked ${choice}! Wow! Mine was actually ${myAnswer}!`;
    }
    
    popup.classList.add('show');
}

document.getElementById('next-question-btn').onclick = () => {
    document.getElementById('answer-popup').classList.remove('show');
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showLetterScene();
    }
};

function showLetterScene() {
    alert("Time for the letter! (We will code this next)");
}