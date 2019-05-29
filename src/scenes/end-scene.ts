export class EndScene extends Phaser.Scene {

    private background
    constructor() {
        super({key: "EndScene"})
    }

    init(): void {
    }

    create(): void {
        this.background = this.add.tileSprite(400, 300, 800, 600, 'boot')  
        this.add.text(400, 300, 'UNLUCKY', { fontFamily: '"Press Start 2P"', fontSize: 60, color: 'white' }).setOrigin(0.5).setStroke('black', 15)
        
        let startBtn = this.add.text(400, 400, 'RESTART', { fontFamily: '"Press Start 2P"', fontSize: 30, color: 'white' }).setOrigin(0.5).setStroke('black', 10)
        startBtn.setInteractive()
        this.input.once('pointerdown', (pointer) => {
            this.scene.start('StartScene')
        })        
    }


    update(){
        this.background.tilePositionY -= 2
    }
}
