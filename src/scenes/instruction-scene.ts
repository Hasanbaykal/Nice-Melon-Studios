export class InstructionScene extends Phaser.Scene {

    constructor() {
        super({key: "InstructionScene"})
    }

    init(): void {
    }

    preload(): void {
    }

    create(): void {

    this.add.image(0, 0, 'boot').setOrigin(0, 0)


    let goBack = this.add.text(400, 300, 'GO BACK', { fontFamily: '"Press Start 2P"', fontSize: 60, color: 'white' }).setOrigin(0.5).setStroke('black', 15)
    goBack.setInteractive()
        this.input.once('pointerdown', (pointer) => {
        this.scene.start('StartScene')
        })
}





}