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
    const totalTulips = 200; // Increased to 200

    for (let i = 0; i < totalTulips; i++) {
        const tulip = document.createElement('div');
        tulip.classList.add('tulip');
        
        const randomLeft = Math.random() * 100; 
        const randomHeight = 100 + Math.random() * 350; // More variation in height
        const randomDelay = Math.random() * 4000; // Spread growth over 4 seconds
        const color = colors[Math.floor(Math.random() * colors.length)];
        const randomWidth = 30 + Math.random() * 20; // Random head size

        tulip.style.left = `${randomLeft}vw`;
        tulip.style.zIndex = Math.floor(randomHeight);
        
        tulip.innerHTML = `
            <div class="flower-head" style="background-color: ${color}; width: ${randomWidth}px; transition-delay: ${randomDelay + 1000}ms;"></div>
            <div class="stem" style="height: 0; transition-delay: ${randomDelay}ms;"></div>
        `;
        
        container.appendChild(tulip);

        setTimeout(() => {
            tulip.classList.add('bloom');
            tulip.querySelector('.stem').style.height = `${randomHeight}px`;
        }, 100);
    }

    // Keep the "Next" button delay so she can appreciate the full garden
    setTimeout(() => {
        const nextBtn = document.getElementById('proceedToGame');
        nextBtn.classList.remove('hidden');
        nextBtn.classList.add('show');
    }, 6000); 
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
        myAnswer: "Dirty Sanchez",
        gif: "https://i.pinimg.com/originals/a4/81/1d/a4811dcfd85b23cdd91ceb1ea9b959d6.gif" // Thinking
    },
    {
        q: "What was your favourite food made by me?",
        options: ["Lasagna", "Revel Bars", "Cinnamon Roll", "Brownies"],
        myAnswer: "Cinnamon Roll",
        gif: "https://i.pinimg.com/originals/34/a0/39/34a039952e2bdc887ff3383f23b8fccd.gif" // Happy Cat
    },
    {
        q: "What is your favourite date activity?",
        options: ["Origami", "Diamond Painting", "Museum Bingo", "Roblox"],
        myAnswer: "Museum Bingo",
        gif: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWx1bXdvOGNhdzU2eHRvcXY4NHM4cGJvenV5ZnhlbGdsMzNoaHJzMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/y3QOvy7xxMwKI/giphy.gif" // Activity/Bingo
    },
    {
        q: "Whats your favourite gift from me so far?",
        options: ["Ariana Grande Perfume", "Explosion Box", "Bibble Plush", "Watch"],
        myAnswer: "Ariana Grande Perfume",
        gif: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnBtMW8wemsxOW8ycngza2N3N2hzYmF6OG1haHgycDhnMmkzZW43bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/W8hVGGjOjV82Rh6Oyi/giphy.gif" // Gift/Perfume
    }
];

let currentQuestionIndex = 0;

function loadQuestion() {
    const currentQ = questions[currentQuestionIndex];
    document.getElementById('question-text').innerText = currentQ.q;
    
    // Update the GIF!
    const quizGif = document.getElementById('quiz-gif');
    quizGif.src = currentQ.gif;

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
        popupText.innerText = `You picked ${choice}! EYYY KANA SAD AKO🔥🔥🔥`;
    } else {
        popupText.innerText = `You picked ${choice}! Ngekk ako kay ${myAnswer}!`;
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
    document.getElementById('scene3').style.display = 'none';
    const scene4 = document.getElementById('scene4');
    
    // Switch to flex so the centering works
    scene4.style.display = 'flex'; 
    scene4.classList.add('active');
    
    createFloatingPhotos();
}

function createFloatingPhotos() {
    const container = document.getElementById('floating-photos-container');
    // const photoUrls = [
    //     'photo1.jpg', 'photo2.jpg', 'photo3.jpg' // Add your photo paths here
    // ];
    // PICTURE SHITS
    const photoUrls = ['https://picsum.photos/200/200?random=1', 'https://picsum.photos/200/200?random=2'];

    for (let i = 0; i < 15; i++) {
        const img = document.createElement('img');
        img.src = photoUrls[i % photoUrls.length];
        img.classList.add('floating-photo');
        
        img.style.left = Math.random() * 100 + 'vw';
        img.style.animationDelay = Math.random() * 10 + 's';
        img.style.width = (50 + Math.random() * 70) + 'px';
        img.style.height = img.style.width; // Keep it square

        container.appendChild(img);
    }
}

function finishEverything() {
    document.getElementById('scene4').style.display = 'none';
    const final = document.getElementById('finalScene');
    final.style.display = 'flex';
    final.classList.add('active');
}