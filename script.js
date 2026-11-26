
const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
let width, height;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

// Heart equation
function heart(t) {
    return {
        x: 16 * Math.pow(Math.sin(t), 3),
        y: -(13 * Math.cos(t)
            - 5 * Math.cos(2 * t)
            - 2 * Math.cos(3 * t)
            - Math.cos(4 * t))
    };
}

class Particle {
    constructor(t) {
        const point = heart(t);

        this.x = width / 2 + point.x * 13;
        this.y = height / 2 + point.y * 13;

        this.baseX = this.x;
        this.baseY = this.y;

        this.size = Math.random() * 2 + 1;
        this.phase = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.04 + 0.01;
    }

    draw(time) {
        const pulse = Math.sin(time * 0.002 + this.phase);
        const glow = 0.5 + pulse * 0.5;

        ctx.beginPath();
        ctx.arc(
            this.x,
            this.y,
            this.size * (0.8 + glow * 0.5),
            0,
            Math.PI * 2
        );

        ctx.fillStyle = `rgba(255, ${70 + glow * 80}, ${140 + glow * 80}, ${0.5 + glow * 0.5})`;

        ctx.shadowBlur = 15;
        ctx.shadowColor = "#ff2678";
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

// Generate heart particles
for (let i = 0; i < 1500; i++) {
    const t = Math.random() * Math.PI * 2;
    particles.push(new Particle(t));
}

function animate(time) {
    ctx.clearRect(0, 0, width, height);

    const scale = 1 + Math.sin(time * 0.002) * 0.04;

    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.scale(scale, scale);
    ctx.translate(-width / 2, -height / 2);

    particles.forEach(p => p.draw(time));

    ctx.restore();

    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
