document.addEventListener('DOMContentLoaded', () => {
    const danceButton = document.getElementById('danceButton');
    const pauseButton = document.getElementById('pauseButton');
    const danceFloor = document.getElementById('danceFloor');
    const djMusic = document.getElementById('djMusic');
    let colorInterval;
    let animationFrame;

    danceButton.addEventListener('click', () => {
        if (djMusic.paused) {
            djMusic.play();
            colorInterval = setInterval(() => {
                danceFloor.style.backgroundColor = getRandomColor();
            }, 200); // Change color every second
            // Start the game animation only when the music is playing
            if (!djMusic.paused) {
                animationFrame = requestAnimationFrame(frame);
            }
        }
    });

    pauseButton.addEventListener('click', () => {
        clearInterval(colorInterval);
        djMusic.pause();
        danceFloor.style.backgroundColor = ''; // Reset background color
        // Stop the game animation when pausing
        cancelAnimationFrame(animationFrame);
    });

    // Event listener for music end
    djMusic.addEventListener('ended', () => {
        clearInterval(colorInterval);
        danceFloor.style.backgroundColor = ''; // Reset background color
        // Stop the game animation when music ends
        cancelAnimationFrame(animationFrame);
    });
});

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function frame(timestamp) {
    polonia.clearRect(0, 0, polonia.canvas.width, polonia.canvas.height);
    if (!previous) previous = timestamp;
    elapsed = timestamp - previous;
    update(elapsed / 1000);
    draw(polonia, true);
    previous = timestamp;
    if (!djMusic.paused) {
        animationFrame = window.requestAnimationFrame(frame);
    }
}



