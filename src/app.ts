import "phaser";
import { BootScene } from "./scenes/boot-scene"
import { StartScene } from "./scenes/start-scene"
import { GameScene } from "./scenes/game-scene"
import { Arcade } from "./utils/arcade"
import { EndScene } from "./scenes/end-scene"
import { InstructionScene } from "./scenes/instruction-scene"
import { Scale } from "phaser";

const config: Phaser.Types.Core.GameConfig = {
    width: 1000,
    height: 1200,
    scale: {
        mode: Phaser.Scale.ScaleModes.RESIZE,
        autoCenter: Phaser.Scale.Center.CENTER_HORIZONTALLY,
    },
    parent: "game",
    resolution: window.devicePixelRatio, // added
    // @ts-ignore Issue with Typescript definitions in Phaser 3.17.0
    scene: [BootScene, StartScene, GameScene, EndScene, InstructionScene],
    input: {
        keyboard: true
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: false, // shows velocity and hitboxes! 
            gravity: { y: 0 }
        }
    },
    render: { pixelArt: true }
};

export class Wormhole extends Phaser.Game {

    public arcade:Arcade

    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config)

        // create the arcade once, otherwise we keep connecting/disconnecting every scene
        this.arcade = new Arcade()
    }
}

window.addEventListener("load", () => new Wormhole(config))

