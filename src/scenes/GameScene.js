export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.gameOver = false;
    this.gameStarted = false;
    this.score = 0;
    this.highScore = parseInt(localStorage.getItem('dinoHighScore')) || 0;
    this.gameSpeed = 300;
    this.groundY = 260;
  }

  create() {
    // Gradient sky background
    const skyGradient = this.add.graphics();
    skyGradient.fillGradientStyle(0x1a1a2e, 0x1a1a2e, 0x16213e, 0x16213e, 1);
    skyGradient.fillRect(0, 0, 800, 300);

    // Stars
    this.stars = this.add.group();
    for (let i = 0; i < 30; i++) {
      const star = this.add.rectangle(
        Math.random() * 800,
        Math.random() * 120,
        2, 2, 0xffffff, 0.5 + Math.random() * 0.5
      );
      this.stars.add(star);
    }

    // Clouds (silhouette style)
    this.clouds = this.add.group();
    for (let i = 0; i < 4; i++) {
      const cloud = this.add.image(100 + i * 200, 50 + Math.random() * 50, 'cloud');
      cloud.setScrollFactor(0.3);
      cloud.setAlpha(0.3);
      this.clouds.add(cloud);
    }

    // Ground - neon style platform
    const groundGraphics = this.add.graphics();
    groundGraphics.fillStyle(0x0f0f23);
    groundGraphics.fillRect(0, this.groundY - 10, 800, 50);
    // Neon line
    groundGraphics.fillStyle(0x4ade80);
    groundGraphics.fillRect(0, this.groundY - 10, 800, 3);
    // Ground details
    groundGraphics.fillStyle(0x1a1a3a);
    for (let i = 0; i < 40; i++) {
      groundGraphics.fillRect(i * 20, this.groundY + 5, 10, 3);
    }
    this.ground = this.add.tileSprite(400, this.groundY, 800, 20, 'ground');
    this.ground.setScrollFactor(0);
    this.ground.setAlpha(0);

    // Dinosaur with subtle glow
    this.dinosaur = this.physics.add.sprite(100, this.groundY - 35, 'dinosaur');
    this.dinosaur.setCollideWorldBounds(true);
    this.dinosaur.body.setSize(45, 55);
    this.dinosaur.body.setOffset(5, 5);
    this.dinosaur.body.setMaxVelocityY(600);
    this.dinosaur.preFX.addGlow(0x4ade80, 2, 0, false, 0.05, 8);

    // Add physics to ground and collider
    this.physics.add.existing(this.ground, true);
    this.physics.add.collider(this.dinosaur, this.ground);

    // Obstacles group
    this.obstacles = this.physics.add.group();

    // Score panel
    const scorePanel = this.add.graphics();
    scorePanel.fillStyle(0x0f0f23, 0.8);
    scorePanel.fillRoundedRect(620, 8, 160, 60, 8);
    scorePanel.lineStyle(2, 0x4ade80);
    scorePanel.strokeRoundedRect(620, 8, 160, 60, 8);

    // Score text
    this.scoreText = this.add.text(700, 22, `SCORE`, {
      fontSize: '12px',
      fontFamily: 'Courier New',
      color: '#888888'
    }).setOrigin(0.5);

    this.scoreValue = this.add.text(700, 45, `0`, {
      fontSize: '24px',
      fontFamily: 'Courier New',
      color: '#4ade80',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    this.scoreValue.setScrollFactor(0);

    this.highScoreText = this.add.text(760, 22, `★ ${this.highScore}`, {
      fontSize: '12px',
      fontFamily: 'Courier New',
      color: '#ffd700'
    }).setOrigin(0.5, 0);
    this.highScoreText.setScrollFactor(0);

    // Instructions with neon effect
    this.instrText = this.add.text(400, 150, 'PRESS SPACE OR TAP', {
      fontSize: '20px',
      fontFamily: 'Courier New',
      color: '#4ade80',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.instrSubText = this.add.text(400, 175, 'TO START', {
      fontSize: '16px',
      fontFamily: 'Courier New',
      color: '#888888'
    }).setOrigin(0.5);

    // Pulsing instruction
    this.tweens.add({
      targets: this.instrText,
      alpha: 0.4,
      duration: 600,
      yoyo: true,
      repeat: -1
    });

    // Controls
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.input.on('pointerdown', () => this.jump());

    // Collision detection
    this.physics.add.overlap(this.dinosaur, this.obstacles, this.hitObstacle, null, this);

    // Timer for spawning obstacles
    this.obstacleTimer = this.time.addEvent({
      delay: 1500,
      callback: this.spawnObstacle,
      callbackScope: this,
      loop: true
    });

    // Score timer
    this.time.addEvent({
      delay: 100,
      callback: () => {
        if (!this.gameOver) {
          this.score += 1;
          this.scoreValue.setText(`${this.score}`);
        }
      },
      loop: true
    });

    // Game speed increase
    this.time.addEvent({
      delay: 500,
      callback: () => {
        if (!this.gameOver && this.gameSpeed < 700) {
          this.gameSpeed += 10;
        }
      },
      loop: true
    });
  }

  update() {
    if (this.gameOver) return;

    // Animate ground
    this.ground.tilePositionX += this.gameSpeed * 0.016;

    // Animate clouds
    this.clouds.getChildren().forEach(cloud => {
      cloud.x -= 0.3;
      if (cloud.x < -50) {
        cloud.x = 850;
        cloud.y = 50 + Math.random() * 50;
      }
    });

    // Twinkle stars
    this.stars.getChildren().forEach(star => {
      if (Math.random() < 0.02) {
        star.setAlpha(0.3 + Math.random() * 0.7);
      }
    });

    // Jump controls
    if (Phaser.Input.Keyboard.JustDown(this.cursors.up) || Phaser.Input.Keyboard.JustDown(this.spaceBar)) {
      this.jump();
    }

    // Keep dinosaur angle at 0 when on ground
    if (this.dinosaur.body.touching.down) {
      this.dinosaur.setAngle(0);
    }
  }

  jump() {
    if (this.gameOver) {
      this.scene.restart();
      this.gameOver = false;
      this.gameStarted = false;
      this.score = 0;
      this.gameSpeed = 300;
      return;
    }

    // Hide instructions on first jump
    if (!this.gameStarted) {
      this.gameStarted = true;
      this.instrText.setVisible(false);
      this.instrSubText.setVisible(false);
      this.tweens.killTweensOf(this.instrText);
    }

    // Jump only when on ground
    if (this.dinosaur.body.touching.down || this.dinosaur.y >= this.groundY - 36) {
      this.dinosaur.setVelocityY(-450);
      this.dinosaur.setAngle(-10);
    }
  }

  spawnObstacle() {
    if (this.gameOver) return;

    const obstacleTypes = ['cactus_small', 'cactus_large', 'pterodactyl'];
    const type = Phaser.Math.RND.pick(obstacleTypes);

    let obstacle;
    const isSmall = type === 'cactus_small';
    if (type === 'pterodactyl') {
      obstacle = this.obstacles.create(820, 100 + Math.random() * 80, type);
      obstacle.body.setAllowGravity(false);
    } else {
      obstacle = this.obstacles.create(820, this.groundY - 25, type);
      obstacle.body.setAllowGravity(false);
      obstacle.body.setSize(isSmall ? 18 : 28, 45);
    }

    obstacle.body.setVelocityX(-this.gameSpeed);

    // Remove off-screen obstacles
    obstacle.checkWorldBounds = true;
    obstacle.on('outofbounds', () => {
      obstacle.destroy();
    });
  }

  hitObstacle() {
    if (this.gameOver) return;

    this.gameOver = true;
    this.obstacleTimer.remove();

    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('dinoHighScore', this.highScore);
    }

    this.physics.pause();
    this.dinosaur.setTint(0xff0000);

    this.time.delayedCall(500, () => {
      this.scene.start('GameOverScene', { score: this.score, highScore: this.highScore });
    });
  }
}
