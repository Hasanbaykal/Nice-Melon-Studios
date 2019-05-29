import { GameScene } from "../scenes/game-scene"


export class Astroid extends Phaser.Physics.Arcade.Sprite {

    public score: number = 25
    private astroids = []
    private gameScene : GameScene

    constructor(scene: GameScene) {
        super(scene, Phaser.Math.Between(150, 600), Phaser.Math.Between(-50, -200), 'enemy100')    
        this.gameScene = scene
        
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
            this.astroids.push(1)
            console.log(this.astroids.length + " parts")
            this.resetPosition()

            if(this.astroids.length > 4){
                this.destroy()
            }
       }
    }
}