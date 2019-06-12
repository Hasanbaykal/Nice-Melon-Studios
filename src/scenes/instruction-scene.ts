export class InstructionScene extends Phaser.Scene {

    constructor() {
        super({key: "InstructionScene"})
    }

    init(): void {
    }

    preload(): void {
    }
    create(): void {

    console.log("test");
    

    this.add.image(0, 0, 'boot').setOrigin(0, 0)
    this.add.image(100, 110, 'instructionsprite').setOrigin(0,0)

    this.add.text(450, 140, '= Asteroid, avoid it!', { fontFamily: '"Press Start 2P"', fontSize: 25, color: 'white' }).setOrigin(0.5).setStroke('black', 15)
    this.add.text(415, 230, '= Enemy, shoot it!', { fontFamily: '"Press Start 2P"', fontSize: 25, color: 'white' }).setOrigin(0.5).setStroke('black', 15)
    this.add.text(490, 320, '= Spaceship, collect it!', { fontFamily: '"Press Start 2P"', fontSize: 25, color: 'white' }).setOrigin(0.5).setStroke('black', 15)
    this.add.text(442, 420, '= Spacebar to shoot!', { fontFamily: '"Press Start 2P"', fontSize: 25, color: 'white' }).setOrigin(0.5).setStroke('black', 15)



    let goBack = this.add.text(400, 550, 'GO BACK', { fontFamily: '"Press Start 2P"', fontSize: 30, color: 'white' }).setOrigin(0.5).setStroke('black', 15)
    goBack.setInteractive()
        this.input.once('pointerdown', (pointer) => {
        this.scene.start('StartScene')
        })
}





}