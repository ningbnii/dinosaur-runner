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
    <p class="game-hint">SPACE / UP to Jump</p>
    <a href="https://github.com/ningbnii/dinosaur-runner" target="_blank" class="github-link">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    </a>
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

.github-link {
  color: #888;
  transition: color 0.2s;
}

.github-link:hover {
  color: #4ade80;
}
</style>
