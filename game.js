class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Set initial canvas size
        this.resizeCanvas();
        
        // Handle window resizing
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Load images
        this.dinoImage = new Image();
        this.dinoImage.src = 'assets/images/—Pngtree—cartoon cute green short leg_6237974.png';
        
        // Adjust dino size to match the image proportions
        const dinoWidth = 50;
        const dinoHeight = 50;
        
        // Initialize clouds
        this.clouds = [
            { x: 100, y: 50 },
            { x: 300, y: 80 },
            { x: 500, y: 30 },
            { x: 700, y: 60 }
        ];
        
        this.dino = {
            x: 50,
            y: this.canvas.height - dinoHeight - 20,
            width: dinoWidth,
            height: dinoHeight,
            jumping: false,
            velocity: 0,
            gravity: 1.2,
            jumpForce: -18
        };

        this.obstacles = [];
        this.score = 0;
        this.gameSpeed = 8;
        this.spawnInterval = 1500;
        this.lastSpawnTime = 0;
        this.gameOver = false;
        this.ground = this.canvas.height - 20;

        // Event listeners for both desktop and mobile
        document.addEventListener('keydown', (e) => this.handleInput(e));
        document.addEventListener('touchstart', (e) => this.handleTouch(e));
        document.addEventListener('touchend', (e) => this.handleTouchEnd(e));

        // Prevent default touch behaviors
        document.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });

        // Start the game loop
        this.gameLoop();
    }

    resizeCanvas() {
        const container = this.canvas.parentElement;
        const containerWidth = container.clientWidth;
        const containerHeight = window.innerHeight * 0.5; // 50% of viewport height on mobile
        
        // Set canvas size maintaining aspect ratio
        const aspectRatio = 800 / 300; // Original canvas dimensions
        let width = containerWidth;
        let height = width / aspectRatio;
        
        // If height is too large, constrain by height instead
        if (height > containerHeight) {
            height = containerHeight;
            width = height * aspectRatio;
        }
        
        this.canvas.width = width;
        this.canvas.height = height;
        
        // Update ground position
        this.ground = this.canvas.height - 20;
        
        // Update dino position
        if (this.dino) {
            this.dino.y = this.canvas.height - this.dino.height - 20;
        }
    }

    handleTouch(e) {
        e.preventDefault();
        if (!this.dino.jumping) {
            this.jump();
        }
    }

    handleTouchEnd(e) {
        e.preventDefault();
    }

    handleInput(event) {
        if ((event.code === 'Space' || event.code === 'ArrowUp') && !this.dino.jumping) {
            this.jump();
        }
    }

    jump() {
        if (!this.dino.jumping) {
            this.dino.jumping = true;
            this.dino.velocity = this.dino.jumpForce;
        }
    }

    updateDino() {
        // Apply gravity
        this.dino.velocity += this.dino.gravity;
        this.dino.y += this.dino.velocity;

        // Ground collision
        if (this.dino.y > this.canvas.height - this.dino.height - 20) {
            this.dino.y = this.canvas.height - this.dino.height - 20;
            this.dino.jumping = false;
            this.dino.velocity = 0;
        }
    }

    spawnObstacle() {
        const currentTime = Date.now();
        if (currentTime - this.lastSpawnTime > this.spawnInterval) {
            this.obstacles.push({
                x: this.canvas.width,
                y: this.canvas.height - 50,
                width: 20,
                height: 50
            });
            this.lastSpawnTime = currentTime;
            this.spawnInterval = Math.max(1000, 2000 - this.score / 10);
        }
    }

    updateObstacles() {
        for (let i = this.obstacles.length - 1; i >= 0; i--) {
            const obstacle = this.obstacles[i];
            obstacle.x -= this.gameSpeed;

            // Remove obstacles that are off screen
            if (obstacle.x + obstacle.width < 0) {
                this.obstacles.splice(i, 1);
                this.score++;
                document.getElementById('score').textContent = `Score: ${this.score}`;
            }

            // Collision detection
            if (this.checkCollision(this.dino, obstacle)) {
                this.gameOver = true;
            }
        }
    }

    checkCollision(dino, obstacle) {
        return dino.x < obstacle.x + obstacle.width &&
               dino.x + dino.width > obstacle.x &&
               dino.y < obstacle.y + obstacle.height &&
               dino.y + dino.height > obstacle.y;
    }

    drawCloud(x, y) {
        this.ctx.fillStyle = '#fff';
        this.ctx.beginPath();
        this.ctx.arc(x, y, 20, 0, Math.PI * 2);
        this.ctx.arc(x + 15, y - 10, 15, 0, Math.PI * 2);
        this.ctx.arc(x + 15, y + 10, 15, 0, Math.PI * 2);
        this.ctx.arc(x + 30, y, 20, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawSun() {
        this.ctx.fillStyle = '#FFD700';
        this.ctx.beginPath();
        this.ctx.arc(50, 50, 30, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Sun rays
        this.ctx.strokeStyle = '#FFD700';
        this.ctx.lineWidth = 3;
        for (let i = 0; i < 8; i++) {
            const angle = (i * Math.PI) / 4;
            const x1 = 50 + Math.cos(angle) * 35;
            const y1 = 50 + Math.sin(angle) * 35;
            const x2 = 50 + Math.cos(angle) * 45;
            const y2 = 50 + Math.sin(angle) * 45;
            
            this.ctx.beginPath();
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.stroke();
        }
    }

    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw sky
        this.ctx.fillStyle = '#87CEEB';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw sun
        this.drawSun();

        // Draw and update clouds
        this.clouds.forEach((cloud, index) => {
            this.drawCloud(cloud.x, cloud.y);
            cloud.x -= this.gameSpeed * 0.7;
            if (cloud.x < -50) {
                cloud.x = this.canvas.width + 50;
                cloud.y = 30 + Math.random() * 60;
            }
        });

        // Draw ground
        this.ctx.fillStyle = '#90EE90';
        this.ctx.fillRect(0, this.ground, this.canvas.width, this.canvas.height - this.ground);
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.ground);
        this.ctx.lineTo(this.canvas.width, this.ground);
        this.ctx.stroke();

        // Draw dino
        if (this.dinoImage.complete) {
            this.ctx.drawImage(this.dinoImage, this.dino.x, this.dino.y, this.dino.width, this.dino.height);
        } else {
            // Fallback to rectangle if image hasn't loaded
            this.ctx.fillStyle = '#333';
            this.ctx.fillRect(this.dino.x, this.dino.y, this.dino.width, this.dino.height);
        }

        // Draw obstacles
        this.ctx.fillStyle = '#666';
        this.obstacles.forEach(obstacle => {
            this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        });

        // Draw game over screen
        if (this.gameOver) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = '#fff';
            this.ctx.font = '48px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('Game Over!', this.canvas.width / 2, this.canvas.height / 2);
            this.ctx.font = '24px Arial';
            this.ctx.fillText('Press R to restart', this.canvas.width / 2, this.canvas.height / 2 + 40);
        }
    }

    reset() {
        this.dino.y = this.canvas.height - this.dino.height - 20;
        this.dino.jumping = false;
        this.dino.velocity = 0;
        this.obstacles = [];
        this.score = 0;
        this.gameSpeed = 8;
        this.spawnInterval = 1500;
        this.lastSpawnTime = 0;
        this.gameOver = false;
        document.getElementById('score').textContent = 'Score: 0';
    }

    gameLoop() {
        if (!this.gameOver) {
            this.updateDino();
            this.spawnObstacle();
            this.updateObstacles();
        }

        this.draw();

        // Handle restart
        if (this.gameOver) {
            const handleRestart = (e) => {
                if (e.key === 'r' || e.key === 'R') {
                    this.reset();
                    document.removeEventListener('keydown', handleRestart);
                }
            };
            document.addEventListener('keydown', handleRestart);
        }

        requestAnimationFrame(() => this.gameLoop());
    }
}

// Start the game when the page loads
window.onload = () => {
    new Game();
};
