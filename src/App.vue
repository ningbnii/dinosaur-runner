<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Phaser from 'phaser';
import BootScene from './scenes/BootScene';
import GameScene from './scenes/GameScene';
import GameOverScene from './scenes/GameOverScene';

const gameContainer = ref(null);
let game = null;

onMounted(() => {
  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 300,
    parent: gameContainer.value,
    pixelArt: true,
    scale: {
      mode: Phaser.Scale.NONE,
      autoCenter: Phaser.Scale.NO_CENTER
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 800 },
        debug: false
      }
    },
    scene: [BootScene, GameScene, GameOverScene]
  };

  game = new Phaser.Game(config);
});

onUnmounted(() => {
  if (game) {
    game.destroy(true);
  }
});
</script>

<template>
  <div class="game-wrapper">
    <h1 class="game-title">
      <span class="title-dino">DINO</span>
      <span class="title-runner">RUNNER</span>
    </h1>
    <div id="game-container" ref="gameContainer"></div>
    <p class="game-hint">SPACE / UP / TAP to Jump</p>
  </div>
</template>

<style scoped>
.game-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

#game-container {
  display: block;
  width: 800px;
  height: 300px;
  background: #0a0a1a;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(74, 222, 128, 0.15);
  border: 1px solid #1a1a3a;
}

.game-title {
  font-family: 'Courier New', monospace;
  font-size: 28px;
  font-weight: bold;
  letter-spacing: 6px;
  margin: 0;
}

.title-dino {
  color: #4ade80;
}

.title-runner {
  color: #ffffff;
  margin-left: 8px;
}

.game-hint {
  font-family: 'Courier New', monospace;
  font-size: 11px;
  color: #555;
  letter-spacing: 1px;
  margin: 0;
}
</style>
