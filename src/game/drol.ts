import Phaser from "phaser";

import { AnimationKeys, TextureKeys } from "../consts";

export enum PlayerState {
  FacingFront,
  HalfTurningLeft,
  WalkingLeft,
  HalfTurningRight,
  WalkingRight,
  TurningLeft,
  TurningRight,
  FacingRight,
  FacingLeft,
}

export default class Drol extends Phaser.GameObjects.Container {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private readonly player: Phaser.GameObjects.Sprite;
  playerState: PlayerState;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    this.player = scene.add
      .sprite(0, 0, TextureKeys.Drol)
      .setOrigin(0, 0)
      .setScale(4, 4);

    this.add(this.player);

    this.createAnimations();
    this.playerState = PlayerState.FacingFront;
    this.player.play(AnimationKeys.DrolStill);

    scene.physics.add.existing(this);

    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(this.player.width * 4, this.player.height * 4);

    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  preUpdate() {
    if (this.cursors.right.isDown) {
      this.player.play(AnimationKeys.DrolFullRotateRight);
    } else if (this.cursors.left.isDown) {
      this.player.play(AnimationKeys.DrolFullRotateLeft);
    }
  }

  private createAnimations() {
    const frontFrame = { key: TextureKeys.Drol, frame: "drol-front.png" };

    const halfRotateLeftFrames = this.player.anims.generateFrameNames(
      TextureKeys.Drol,
      {
        start: 1,
        end: 3,
        prefix: "drol-rotate-left-",
        zeroPad: 2,
        suffix: ".png",
      }
    );

    const halfRotateRightFrames = this.player.anims.generateFrameNames(
      TextureKeys.Drol,
      {
        start: 1,
        end: 3,
        prefix: "drol-rotate-right-",
        zeroPad: 2,
        suffix: ".png",
      }
    );

    this.player.anims.create({
      key: AnimationKeys.DrolStill,
      frames: [frontFrame],
    });

    this.player.anims.create({
      key: AnimationKeys.DrolHalfRotateLeft,
      frames: halfRotateLeftFrames,
      frameRate: 10,
    });

    this.player.anims.create({
      key: AnimationKeys.DrolHalfRotateRight,
      frames: halfRotateRightFrames,
      frameRate: 10,
    });

    const fullRotateLeftFrames = [...halfRotateRightFrames.slice().reverse()];
    fullRotateLeftFrames.push(frontFrame);
    fullRotateLeftFrames.push(...halfRotateLeftFrames);

    this.player.anims.create({
      key: AnimationKeys.DrolFullRotateLeft,
      frames: fullRotateLeftFrames,
      frameRate: 20,
    });

    const fullRotateRightFrames = [...halfRotateLeftFrames.slice().reverse()];
    fullRotateRightFrames.push(frontFrame);
    fullRotateRightFrames.push(...halfRotateRightFrames);

    this.player.anims.create({
      key: AnimationKeys.DrolFullRotateRight,
      frames: fullRotateRightFrames,
      frameRate: 20,
    });
  }
}
