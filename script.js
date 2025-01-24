// particles.js for background particles
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const particlesArray = [];
const backgroundParticleColor = "rgba(255, 255, 255, 0.3)"; // Single color for background particles

class Particle {
    constructor(x, y, size, color, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.speedX = speedX;
        this.speedY = speedY;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce particles off the canvas edges
        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
            this.speedX *= -1;
        }
        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
            this.speedY *= -1;
        }
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function initBackgroundParticles() {
    const numParticles = 400; // Increase number of particles
    for (let i = 0; i < numParticles; i++) {
        const size = Math.random() * 3 + 1;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const speedX = (Math.random() - 0.5) * 0.5;
        const speedY = (Math.random() - 0.5) * 0.5;
        particlesArray.push(new Particle(x, y, size, backgroundParticleColor, speedX, speedY));
    }
}
initBackgroundParticles();

function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        // Draw lines between nearby particles
        for (let j = i + 1; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) { // Connect particles within 100px distance
                ctx.beginPath();
                ctx.strokeStyle = backgroundParticleColor;
                ctx.lineWidth = 0.2;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animateParticles);
}
animateParticles();

// Add mouse follower circle
document.body.style.cursor = "none";
const mouseFollower = document.createElement("div");
mouseFollower.style.position = "fixed";
mouseFollower.style.width = "10px";
mouseFollower.style.height = "10px";
mouseFollower.style.backgroundColor = "black";
mouseFollower.style.borderRadius = "50%";
mouseFollower.style.pointerEvents = "none";
mouseFollower.style.zIndex = "1000";
document.body.appendChild(mouseFollower);

window.addEventListener("mousemove", (event) => {
    mouseFollower.style.top = `${event.clientY}px`;
    mouseFollower.style.left = `${event.clientX}px`;
});

// Centered container interaction
const container = document.querySelector(".container");
container.style.position = "absolute";
container.style.top = "50%";
container.style.left = "50%";
container.style.transform = "translate(-50%, -50%)";

window.addEventListener("mousemove", (e) => {
    const { clientX: x, clientY: y } = e;
    const xAxis = (window.innerWidth / 2 - x) / 25;
    const yAxis = (window.innerHeight / 2 - y) / 25;

    const oppositeXAxis = (x - window.innerWidth / 2) / 25;
    const oppositeYAxis = (y - window.innerHeight / 2) / 25;

    if (x < window.innerWidth / 2) {
        container.style.transform = `translate(-50%, -50%) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    } else {
        container.style.transform = `translate(-50%, -50%) rotateY(${oppositeXAxis}deg) rotateX(${oppositeYAxis}deg)`;
    }
});
