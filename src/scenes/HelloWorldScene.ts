import Phaser from "phaser";

import Drol, { PlayerState } from "../game/drol";
import { TextureKeys } from "../consts";

export default class HelloWorldScene extends Phaser.Scene {
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  fire!: Phaser.Input.Keyboard.Key;
  player!: Drol;

  constructor() {
    super("hello-world");
  }

  preload() {
    this.load.image("background", "backgrounds/stars.gif");

    this.load.atlas(TextureKeys.Drol, "sprites/drol.png", "sprites/drol.json");

    this.cursors = this.input.keyboard.createCursorKeys();

    this.fire = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    const background = this.add
      .tileSprite(0, 0, width, height, "background")
      .setOrigin(0)
      .setScrollFactor(0, 0);

    this.player = new Drol(this, 200, 200);
    this.add.existing(this.player);

    const body = this.player.body as Phaser.Physics.Arcade.Body;

    body.setCollideWorldBounds(true);

    const FKey = this.input.keyboard.addKey("F");

    FKey.on(
      "down",
      () => {
        if (this.scale.isFullscreen) {
          this.scale.stopFullscreen();
        } else {
          this.scale.startFullscreen();
        }
      },
      this
    );

    // body.setVelocity(200, 100);

    body.setBounce(1, 1);
    body.setCollideWorldBounds(true);

    // this.cameras.main.startFollow(this.player);
    //
  }

  update(time: number, delta: number) {
    const horizontalSpeed = 200;
    super.update(time, delta);
    const body = this.player.body as Phaser.Physics.Arcade.Body;

    if (this.cursors.right.isDown) {
      if (this.player.playerState == PlayerState.FacingRight) {
        //
      }
    } else if (this.cursors.left.isDown) {
      body.setVelocityX(horizontalSpeed * -1);
    }

    if (this.cursors.up.isDown) {
      body.setVelocityY(-100);
    } else if (this.cursors.down.isDown) {
      body.setVelocityY(100);
    }

    if (this.fire.isDown) {
      body.setVelocity(0, 0);
    }
  }
}
