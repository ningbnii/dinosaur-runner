export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  init(data) {
    this.finalScore = data.score || 0;
    this.highScore = data.highScore || 0;
  }

  create() {
    // Dark overlay with gradient
    const overlay = this.add.graphics();
    overlay.fillStyle(0x0a0a1a, 0.9);
    overlay.fillRect(0, 0, 800, 300);

    // Neon border frame
    overlay.lineStyle(3, 0x4ade80);
    overlay.strokeRect(150, 50, 500, 200);

    // Corner decorations
    const corners = [[150, 50], [650, 50], [150, 250], [650, 250]];
    corners.forEach(([x, y]) => {
      overlay.fillStyle(0x4ade80);
      overlay.fillRect(x - 5, y - 5, 10, 10);
    });

    // Game Over text with glow effect
    const gameOverText = this.add.text(400, 90, 'GAME OVER', {
      fontSize: '48px',
      fontFamily: 'Courier New',
      color: '#ff4444',
      fontStyle: 'bold',
      letterSpacing: 10
    }).setOrigin(0.5);
    gameOverText.preFX.addGlow(0xff4444, 4, 0, false, 0.1, 12);

    // Score panel
    const scorePanel = this.add.graphics();
    scorePanel.fillStyle(0x1a1a3a, 0.8);
    scorePanel.fillRoundedRect(250, 120, 300, 80, 8);
    scorePanel.lineStyle(2, 0x4ade80);
    scorePanel.strokeRoundedRect(250, 120, 300, 80, 8);

    // Score display
    this.add.text(400, 140, 'SCORE', {
      fontSize: '14px',
      fontFamily: 'Courier New',
      color: '#888888',
      letterSpacing: 4
    }).setOrigin(0.5);

    const finalScoreText = this.add.text(400, 165, `${this.finalScore}`, {
      fontSize: '36px',
      fontFamily: 'Courier New',
      color: '#4ade80',
      fontStyle: 'bold',
      letterSpacing: 6
    }).setOrigin(0.5);

    // High score
    this.add.text(400, 195, `★ BEST: ${this.highScore}`, {
      fontSize: '16px',
      fontFamily: 'Courier New',
      color: '#ffd700',
      letterSpacing: 2
    }).setOrigin(0.5);

    // New high score indicator with animation
    if (this.finalScore >= this.highScore && this.finalScore > 0) {
      const newRecordText = this.add.text(400, 220, '★ NEW RECORD ★', {
        fontSize: '18px',
        fontFamily: 'Courier New',
        color: '#00ff00',
        fontStyle: 'bold',
        letterSpacing: 3
      }).setOrigin(0.5);
      newRecordText.preFX.addGlow(0x00ff00, 4, 0, false, 0.1, 12);

      this.tweens.add({
        targets: newRecordText,
        scaleX: 1.1,
        scaleY: 1.1,
        duration: 300,
        yoyo: true,
        repeat: -1
      });
    }

    // Restart instruction
    const restartText = this.add.text(400, 265, '[ SPACE OR TAP TO RESTART ]', {
      fontSize: '16px',
      fontFamily: 'Courier New',
      color: '#888888',
      letterSpacing: 2
    }).setOrigin(0.5);

    // Pulsing effect
    this.tweens.add({
      targets: restartText,
      alpha: 0.4,
      duration: 500,
      yoyo: true,
      repeat: -1
    });

    // Controls
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.input.on('pointerdown', () => this.scene.start('GameScene'));
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.cursors.up) || Phaser.Input.Keyboard.JustDown(this.spaceBar)) {
      this.scene.start('GameScene');
    }
  }
}
