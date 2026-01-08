const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
let dodgeCount = 0;

noBtn.addEventListener('mouseenter', () => {
    if (dodgeCount < 4) {
        // The first time we hover, we switch to fixed positioning
        if (dodgeCount === 0) {
            noBtn.style.position = 'fixed';
        }

        const padding = 50; 
        // Ensure the button doesn't go off-screen
        const newX = Math.random() * (window.innerWidth - noBtn.offsetWidth - padding);
        const newY = Math.random() * (window.innerHeight - noBtn.offsetHeight - padding);
        
        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;
        
        dodgeCount++;
    } else {
        noBtn.style.pointerEvents = 'none';
        noBtn.classList.add('pop-out');
        setTimeout(() => {
            noBtn.remove();
        }, 400);
    }
});

yesBtn.addEventListener('click', () => {
    // Transition to Scene 2
    document.getElementById('scene1').classList.remove('active');
    document.getElementById('scene2').classList.add('active');
    startTulipAnimation();
});

function startTulipAnimation() {
    const container = document.getElementById('flower-container');
    const music = document.getElementById('bgMusic');
    
    // Play the lo-fi track
    music.play().catch(e => console.log("Audio play blocked until interaction"));

    const colors = ['#ffb7c5', '#f2a2e8', '#ff9aa2', '#c7ceea', '#ff8b94', '#ffd1dc'];
    const totalTulips = 50;

    for (let i = 0; i < totalTulips; i++) {
        const tulip = document.createElement('div');
        tulip.classList.add('tulip');
        
        // Randomize appearance
        const randomLeft = Math.random() * 100; // 0 to 100% of screen width
        const randomHeight = 150 + Math.random() * 250; // Variable heights
        const randomDelay = Math.random() * 3000; // Spread growth over 3 seconds
        const color = colors[Math.floor(Math.random() * colors.length)];
        const zIndex = Math.floor(randomHeight); // Taller tulips appear in front

        tulip.style.left = `${randomLeft}vw`;
        tulip.style.zIndex = zIndex;
        
        tulip.innerHTML = `
            <div class="flower-head" style="background-color: ${color}; transition-delay: ${randomDelay + 1000}ms;"></div>
            <div class="stem" style="height: 0; transition-delay: ${randomDelay}ms;"></div>
        `;
        
        container.appendChild(tulip);

        // Trigger growth
        setTimeout(() => {
            tulip.classList.add('bloom');
            tulip.querySelector('.stem').style.height = `${randomHeight}px`;
        }, 100);
    }

    // Show the "Next" button after most have bloomed
    // setTimeout(() => {
    //     const nextBtn = document.getElementById('proceedToGame');
    //     nextBtn.classList.remove('hidden');
    //     nextBtn.classList.add('show');
    // }, 5000);
    
    setTimeout(() => {
        const nextBtn = document.getElementById('proceedToGame');
        nextBtn.classList.remove('hidden');
        nextBtn.classList.add('show');
    }, 5000); // 5 seconds gives enough time for a beautiful bloom
}