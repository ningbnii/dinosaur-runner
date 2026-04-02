# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A dinosaur runner game built with Vite + Vue 3 + Phaser.js 3. The game features an endless runner where a dinosaur jumps over obstacles (cacti, pterodactyls) with increasing speed.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Architecture

- `src/phaser-game.js` - Phaser game configuration and initialization
- `src/scenes/` - Phaser scene files:
  - `BootScene.js` - Generates sprites programmatically (dinosaur, cacti, ground, clouds) then launches GameScene
  - `GameScene.js` - Main gameplay: controls, physics, spawning, scoring
  - `GameOverScene.js` - Game over display with score and restart option
- `src/App.vue` - Vue wrapper that mounts the Phaser game
- `src/main.js` - Vue app entry point

## Key Implementation Details

- Physics: Arcade physics with gravity 800, dinosaur collides with static ground
- Sprites: Generated programmatically in BootScene (no external image assets)
- Ground: Uses `tileSprite` with scrolling via `tilePositionX`
- Obstacles: Created in physics group, gravity disabled for ground obstacles, enabled for pterodactyls
- High score: Persisted to `localStorage` under key `dinoHighScore`
- Game speed: Starts at 300, increases by 10 every 500ms up to 700
