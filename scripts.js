document.addEventListener('DOMContentLoaded', function() {
    const images = [
        "css/img/lemon.png",
        "css/img/banana.png",
        "css/img/apple.png",
        "css/img/watermelon.png",
        "css/img/cherry.png",
        "css/img/seven.png"
    ];
    let rounds = 0;
    const spinButton = document.getElementById('spin');
    const restartButton = document.getElementById('restart');
    const slotMachine = document.getElementById('slotMachine');
    const playerName = document.getElementById('playerName');

    let username = prompt("Introduce yourself:");
    if (!username || !username.trim()) {
        username = "Player";
    }

    playerName.textContent = `Visitor: ${username}`;
    slotMachine.style.display = 'block';
    spinButton.style.display = 'block';
    restartButton.style.display = 'none';

    function initializeSlots() {
        for (let i = 1; i <= 9; i++) {
            let randomIndex = Math.floor(Math.random() * images.length);
            document.getElementById(`slot${i}`).style.backgroundImage = `url(${images[randomIndex]})`;
        }
    }

    function spinSlots() {
        let slots = [];
        for (let i = 1; i <= 9; i++) {
            document.getElementById(`slot${i}`).classList.add('spin');
            let randomIndex = Math.floor(Math.random() * images.length);
            document.getElementById(`slot${i}`).style.backgroundImage = `url(${images[randomIndex]})`;
            slots.push(images[randomIndex]);
        }

        setTimeout(function() {
            for (let i = 1; i <= 9; i++) {
                document.getElementById(`slot${i}`).classList.remove('spin');
            }

            let jackpot = false;
            for (let i = 0; i < 3; i++) {
                if (slots[i*3] === "css/img/seven.png" && slots[i*3+1] === "css/img/seven.png" && slots[i*3+2] === "css/img/seven.png") {
                    alert("Jackpot!");
                    jackpot = true;
                    break;
                } else if (slots[i*3] === slots[i*3+1] && slots[i*3+1] === slots[i*3+2]) {
                    alert("Lucky day");
                    jackpot = true;
                    break;
                }
            }

            if (!jackpot) {
                alert("Unluck");
            }
            rounds++;
            if (rounds === 3) {
                spinButton.style.display = 'none';
                restartButton.style.display = 'block';
            } else {
                spinButton.disabled = false;
            }
        }, 300);

        spinButton.disabled = true;
    }

    spinButton.addEventListener('click', spinSlots);
    restartButton.addEventListener('click', function() {
        spinButton.style.display = 'block';
        restartButton.style.display = 'none';
        rounds = 0;
        initializeSlots();
        spinButton.disabled = false;
    });

    initializeSlots();
});
