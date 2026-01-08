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
    console.log("Tulips blooming...");
    // We will build the SVG tulip logic here next!
}