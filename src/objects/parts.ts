import { GameScene } from "../scenes/game-scene"


export class Parts extends Phaser.Physics.Arcade.Sprite {

    public score: number = 25
    private parts = []
    private gameScene : GameScene

    constructor(scene: GameScene) {
        super(scene, Phaser.Math.Between(150, 600), Phaser.Math.Between(-50, -200), 'spaceship1')    
        this.gameScene = scene
        
        this.setScale(0.5       )
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.setSize(this.displayWidth, this.displayHeight)
        this.setVelocityY(Phaser.Math.Between(150, 300))
    }

    public resetPosition() {
        this.x = Phaser.Math.Between(150, 600)
        this.y = Phaser.Math.Between(-50, -200)
        this.setVelocityY(Phaser.Math.Between(150, 300))
    }

    public update() : void { 
       if (this.y > 600){
            this.parts.push(1)
            console.log(this.parts.length + " parts")
            this.resetPosition()

            if(this.parts.length > 4){
                this.destroy()
            }
       }
    }
}