import Phaser from 'phaser';

class PlayScene extends Phaser.Scene {

  constructor() {
    super('PlayScene');
  }

  Controller() {
    this.input.keyboard.on('keydown-SPACE', () => {
      this.dino.setVelocityY(-250)
    })
    this.input.on('pointerdown', () => {
      if (this.isGameRunning) {
        this.Tirer()
      }
    })
  }

  initColliders() {
    this.physics.add.collider(this.dino, this.obsticles, () => {
      if (this.score > this.highscore) {
        this.highscore = this.score
        this.score = 0
      }
      this.score = 0
      this.physics.pause()
      this.anims.pauseAll()
      this.dino.setTexture('player_hit')
      this.isGameRunning = false
    }, null, this)
    this.physics.add.collider(this.dino, this.coins, (dino, coin) => {
      coin.removeFromDisplayList()
      coin.destroy()
      this.score++
      this.AfficheScore(this.score)
      this.AugmentVit()
    }, null, this)
    this.physics.add.collider(this.Shots, this.obsticles, (shot, obsticle) => {
      shot.destroy()
      obsticle.destroy()
    }, null, this)
  }

  AfficheScore(score) {
    this.afficheScore.setText(`Score: ${this.score}`)
  }

  Tirer() {
    const { width, height } = this.game.config
    let shot
    shot = this.Shots.create(this.dino.x + 40, this.dino.y, `shoot`)
    shot.body.offset.x = 5
    shot.setImmovable()
    shot.setOrigin(0, 1)
  }

  placeCoin() {
    const { width, height } = this.game.config
    const distance = Phaser.Math.Between(600, 900)
    let randomHeight
    randomHeight = Math.random() * 400
    while (randomHeight <= 50) {
      randomHeight = Math.random() * 430
    }
    let coin
    while (this.nbrcoin != 10) {
      coin = this.coins.create(width + distance + (this.nbrcoin * 40), randomHeight, `coin`)
      coin.body.offset.x = -5
      coin.setImmovable()
      coin.setOrigin(0, 1)
      this.nbrcoin += 1
    }
    this.nbrcoin = 0
  }

  AugmentVit() {
    if (this.score % 50 == 0) {
      this.gameSpeed += 1
    }
  }

  placeObsticle() {
    const { width, height } = this.game.config
    const obsticleNum = Math.floor(Math.random() * 7) + 1
    const distance = Phaser.Math.Between(600, 900)
    let randomHeight
    randomHeight = Math.random() * 400
    while (randomHeight <= 50) {
      randomHeight = Math.random() * 430
    }
    let obsticle
    obsticle = this.obsticles.create(width + distance, randomHeight, `asteroid-${obsticleNum}`)
    obsticle.body.offset.x = -5
    obsticle.setImmovable()
    obsticle.setOrigin(0, 1)

  }

  Reboot() {
    this.obsticles.clear(true,true)
    this.dino.setTexture('player')
    this.afficheBestScore.setText(`HighScore: ${this.highscore}`);
    this.gameSpeed = 5
    this.dino.y = 250
    this.coins.clear(true,true)
    this.Shots.clear(true,true)
    this.physics.resume()
    this.isGameRunning = true
  }

  AddScore() {
    this.score += 1
    this.AfficheScore()
    this.AugmentVit()
  }

  create() {
    const { height, width } = this.game.config;
    this.gameSpeed = 5
    this.highscore
    if (this.highscore === undefined) {
      this.highscore = 0
    }
    this.score = 0
    this.respawnTime = 0
    this.nbrcoin = 0
    this.coinrespawnTime = 0
    this.addscore = 0
    this.isGameRunning = true
    this.background = this.add.image(500, 250, 'background')
    this.afficheScore = this.add.text(900, 50, 'Score: 0');
    this.afficheBestScore = this.add.text(850, 100, `HighScore: ${this.highscore}`);
    this.restart = this.add.image(50, 50, 'restart')
      .setInteractive()
      .on('pointerdown', () => this.Reboot());
    this.dino = this.physics.add.sprite(100, 250, 'player')
      .setCollideWorldBounds(true)
      .setGravityY(500)
      .setOrigin(0, 1);
    this.obsticles = this.physics.add.group();
    this.Shots = this.physics.add.group();
    this.coins = this.physics.add.group();
    this.Controller()
    this.initColliders()
  }

  update(time, delta) {
    if (!this.isGameRunning) return
    Phaser.Actions.IncX(this.obsticles.getChildren(), - this.gameSpeed)
    Phaser.Actions.IncX(this.coins.getChildren(), - this.gameSpeed)
    Phaser.Actions.IncX(this.Shots.getChildren(), + 5)
    this.addscore = this.addscore + delta * this.gameSpeed * 0.08
    if (this.addscore >= 250) {
      this.AddScore()
      this.addscore = 0
    }
    this.coinrespawnTime = this.coinrespawnTime + delta * this.gameSpeed * 0.08
    if (this.coinrespawnTime >= 1000) {
      this.placeCoin()
      this.coinrespawnTime = 0
    }
    this.respawnTime = this.respawnTime + delta * this.gameSpeed * 0.08
    if (this.respawnTime >= 500) {
      this.placeObsticle()
      this.respawnTime = 0
    }
  }

}
export default PlayScene;
