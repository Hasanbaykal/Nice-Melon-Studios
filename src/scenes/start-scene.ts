import { start } from "repl";

export class StartScene extends Phaser.Scene {

    constructor() {
        super({key: "StartScene"})
    }

    init(): void {
    }

    preload(): void {
    }

    create(): void {
        this.add.image(0, 0, 'boot').setOrigin(0, 0)

        this.add.text(400, 300, 'WORMHOLE', { fontFamily: '"Press Start 2P"', fontSize: 60, color: 'white' }).setOrigin(0.5).setStroke('black', 15)
        this.add.text(400, 500, 'REBUILD YOUR SPACESHIP', { fontFamily: '"Press Start 2P"', fontSize: 30, color: 'white' }).setOrigin(0.5).setStroke('black', 15)
        this.add.text(400, 550, 'EXPLORE THE GALAXY', { fontFamily: '"Press Start 2P"', fontSize: 30, color: 'white' }).setOrigin(0.5).setStroke('black', 15)
        let startBtn = this.add.text(400, 400, 'START', { fontFamily: '"Press Start 2P"', fontSize: 30, color: 'white' }).setOrigin(0.5).setStroke('black', 10)
        startBtn.setInteractive()
        this.input.once('pointerdown', (pointer) => {
            this.scene.start('GameScene')
        })        
    }
}
