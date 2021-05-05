
import Phaser from 'phaser';

class PreloadScene extends Phaser.Scene {

  constructor() {
    super('PreloadScene');
  }

  preload() {
    this.load.image('player', 'assets/player.png')
    this.load.image('player_hit', 'assets/player_hit.png');
    this.load.image('asteroid-1', 'assets/asteroid.png')
    this.load.image('asteroid-2', 'assets/asteroid-small.png')
    this.load.image('asteroid-3', 'assets/asteroid-small.png')
    this.load.image('asteroid-4', 'assets/asteroid.png')
    this.load.image('asteroid-5', 'assets/asteroid.png')
    this.load.image('asteroid-6', 'assets/asteroid-small.png')
    this.load.image('asteroid-7', 'assets/asteroid.png')
    this.load.image('background','assets/background.png')
    this.load.image('coin','assets/coin.png')
    this.load.image('restart','assets/replayButton.png')
    this.load.image('shoot','assets/shoot2.png')
  }

  create() {
    this.scene.start('PlayScene');
  }
}

export default PreloadScene;
