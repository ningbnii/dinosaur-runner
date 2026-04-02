export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  create() {
    this.createDinosaurSprite();
    this.createObstacleSprites();
    this.createGroundSprite();
    this.createCloudSprite();

    this.scene.start('GameScene');
  }

  createDinosaurSprite() {
    const graphics = this.make.graphics({ x: 0, y: 0, add: false });

    // Dino body (neon green)
    graphics.fillStyle(0x4ade80);
    graphics.fillRect(0, 0, 40, 50);

    // Dino head
    graphics.fillRect(30, -10, 25, 25);

    // Eye (glowing)
    graphics.fillStyle(0xffffff);
    graphics.fillRect(45, -5, 6, 6);
    graphics.fillStyle(0x000000);
    graphics.fillRect(47, -3, 3, 3);

    // Legs
    graphics.fillStyle(0x22c55e);
    graphics.fillRect(5, 50, 10, 15);
    graphics.fillRect(25, 50, 10, 15);

    // Tail
    graphics.fillStyle(0x4ade80);
    graphics.fillRect(-10, 5, 15, 12);

    graphics.generateTexture('dinosaur', 60, 65);
    graphics.destroy();
  }

  createObstacleSprites() {
    // Cactus small - neon desert style
    let graphics = this.make.graphics({ x: 0, y: 0, add: false });
    graphics.fillStyle(0x16a34a);
    graphics.fillRect(8, 0, 10, 40);
    graphics.fillRect(0, 10, 8, 15);
    graphics.fillRect(18, 15, 8, 12);
    // Highlights
    graphics.fillStyle(0x22c55e);
    graphics.fillRect(10, 2, 6, 5);
    graphics.fillRect(2, 12, 4, 10);
    // Neon outline
    graphics.lineStyle(1, 0x0d4a22);
    graphics.strokeRect(8, 0, 10, 40);
    graphics.generateTexture('cactus_small', 26, 40);
    graphics.destroy();

    // Cactus large
    graphics = this.make.graphics({ x: 0, y: 0, add: false });
    graphics.fillStyle(0x16a34a);
    graphics.fillRect(10, 0, 14, 55);
    graphics.fillRect(0, 15, 12, 18);
    graphics.fillRect(24, 20, 12, 15);
    graphics.fillStyle(0x22c55e);
    graphics.fillRect(12, 3, 8, 6);
    graphics.fillRect(2, 18, 6, 12);
    graphics.lineStyle(1, 0x0d4a22);
    graphics.strokeRect(10, 0, 14, 55);
    graphics.generateTexture('cactus_large', 36, 55);
    graphics.destroy();

    // Pterodactyl - neon purple
    graphics = this.make.graphics({ x: 0, y: 0, add: false });
    graphics.fillStyle(0x7c3aed);
    graphics.fillRect(20, 10, 45, 8);
    graphics.fillRect(0, 5, 25, 6);
    graphics.fillRect(60, 5, 15, 6);
    graphics.fillRect(15, 18, 12, 12);
    // Eye
    graphics.fillStyle(0xff0000);
    graphics.fillRect(20, 20, 4, 4);
    // Neon outline
    graphics.lineStyle(1, 0x5b21b6);
    graphics.strokeRect(0, 5, 75, 30);
    graphics.generateTexture('pterodactyl', 75, 30);
    graphics.destroy();
  }

  createGroundSprite() {
    const graphics = this.make.graphics({ x: 0, y: 0, add: false });
    // Base ground
    graphics.fillStyle(0x1a1a3a);
    graphics.fillRect(0, 0, 800, 20);
    // Surface detail
    graphics.fillStyle(0x2a2a4a);
    for (let i = 0; i < 40; i++) {
      const x = i * 20 + Math.random() * 10;
      const h = 3 + Math.random() * 5;
      graphics.fillRect(x, 20 - h, 8, h);
    }
    // Neon top line
    graphics.fillStyle(0x4ade80);
    graphics.fillRect(0, 0, 800, 2);
    graphics.generateTexture('ground', 800, 20);
    graphics.destroy();
  }

  createCloudSprite() {
    const graphics = this.make.graphics({ x: 0, y: 0, add: false });
    // Soft purple-ish clouds for neon theme
    graphics.fillStyle(0xffffff, 0.6);
    graphics.fillCircle(15, 15, 12);
    graphics.fillCircle(35, 15, 15);
    graphics.fillCircle(55, 15, 12);
    graphics.fillCircle(25, 10, 10);
    graphics.fillCircle(45, 10, 10);
    graphics.generateTexture('cloud', 70, 30);
    graphics.destroy();
  }
}
