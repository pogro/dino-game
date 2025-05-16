class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 800;
        this.canvas.height = 300;
        
        // Initialize sounds
        this.jumpSound = new Audio('data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAASAAAeMwAUFBQUFCIiIiIiIjAwMDAwPz8/Pz8/TU1NTU1NW1tbW1tbc3Nzc3ODg4ODg4OPj4+Pj4+cnJycnJycqqqqqqqqs7Ozs7OztbW1tbW1wcHBwcHB0dHR0dHR3d3d3d3d5ubm5ubm8vLy8vLy//////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAQKAAAAAAAAHjOZTf9/AAAAAAAAAAAAAAAAAAAAAP/7kGQAAANUMEoFPeACNQV40KEYABEY41g5vAAA9RjpZxRwAImU+W8eshaFpAQgALAAYALATx/nYDYCMJ0HITQYYA7AH4c7MoGsnCMU5pnW+OQnBcDrQ9Xx7w37/D+PimYavV8elKUpT5fqx5VjV6vZ38eJR48eRKa9KUp7v396UgPHkQwMAAAAAA//8MAOp39CECAAhlIEEIIECBAgTT1oj///tEQYT0wgEIYxgDC09aIiE7u7u7uIiIz+LtoIQGE/+XAGYLjpTAIOGYYy0ZACgDgSNFxC7YYiINocwERjAEDhIy0mRoGwAE7lOTBsGhj1qrXNCU9GrgwSPr80jj0dIpT9DRUNHKJbRxiWSiifVHuD2b0EbjLkOUzSXztP3uE1JpHzV6NPq+f3P5T0/f/lNH7lWTavQ5Xz1yLVe653///qf93B7f/vMdaKJAAJAMAIwIMAHMpzDkoYwD8CR717zVb8/p54P3MikXGCEWhQOEAOAdP6v8b8oNL/EzdnROC8Zo+z+71O8VVAGIKFEglKbidkoLam0mAFiwo0ZoVExf/7kmQLgAQyZFxvPWAENcVKXeK0ABAk2WFMaSNIzBMptBYfArbkZgpWjEQpcmjxQoG2qREWQcvpzuuIm29THt3ElhDNlvwzh0qOIlZrj1yhvHhktEJ7k4be5OqbHwzh4v8aMht1cSyPSwqmmkg8es7svCJyVPJYVwXF0kjBDAzDyQQhBN1ACBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECBAgQIECAA==');
        this.crashSound = new Audio('data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAeAAAUrAAGBgYGCgoKCgoODg4ODhISEhISFhYWFhYaGhoaGh4eHh4eIiIiIiImJiYmJioqKioqLi4uLi4yMjIyMjY2NjY2Ojo6Ojo+Pj4+PkJCQkJCRkZGRkZKSkpKSk5OTk5OUlJSUlJWVlZWVlpaWlpaXl5eXl5iYmJiYmZmZmZmaWlpaWltbW1tbXFxcXFxdXV1dXV5eXl5eX19fX19gYGBgYGFhYWFhYmJiYmJjY2NjY2RkZGRkZWVlZWVmZmZmZmdnZ2dnZ2dnZ2doaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGh//sQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV');
        
        // Load images
        this.dinoImage = new Image();
        this.dinoImage.src = 'assets/images/—Pngtree—cartoon cute green short leg_6237974.png';
        
        // Adjust dino size to match the image proportions
        const dinoWidth = 50;  // Adjust these values to match your image
        const dinoHeight = 50; // Adjust these values to match your image
        
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
            gravity: 0.8,
            jumpForce: -15
        };

        this.obstacles = [];
        this.score = 0;
        this.gameSpeed = 5;
        this.spawnInterval = 2000;
        this.lastSpawnTime = 0;
        this.gameOver = false;
        this.ground = this.canvas.height - 20;

        // Event listeners
        document.addEventListener('keydown', (e) => this.handleInput(e));
        document.addEventListener('touchstart', () => this.jump());

        // Start the game loop
        this.gameLoop();
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
            // Play jump sound
            this.jumpSound.currentTime = 0;
            this.jumpSound.play().catch(e => console.log("Audio play failed:", e));
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
                if (!this.gameOver) {
                    // Play crash sound only on initial collision
                    this.crashSound.currentTime = 0;
                    this.crashSound.play().catch(e => console.log("Audio play failed:", e));
                }
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
            cloud.x -= this.gameSpeed * 0.5;
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
        this.gameSpeed = 5;
        this.spawnInterval = 2000;
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
