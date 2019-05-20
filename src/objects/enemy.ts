import { GameScene } from "../scenes/game-scene"

export class Enemy extends Phaser.Physics.Arcade.Sprite {

    public score: number = 25
    private gameScene : GameScene

    constructor(scene: GameScene) {
        super(scene, Phaser.Math.Between(1500, 1650), Phaser.Math.Between(100, 800), "enemy")       

        this.gameScene = scene
        
        this.setScale(0.7)
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.setSize(this.displayWidth, this.displayHeight)
        this.setVelocity(Phaser.Math.Between(-200, -140),0)
    }

    public resetPosition() {
        this.x = Phaser.Math.Between(1500, 1650)
        this.y = Phaser.Math.Between(100, 800)
        this.setVelocity(Phaser.Math.Between(-200, -140), 0)
    }

    // TODO RETURN FIRE!
    public update() : void {
       this.y += Math.sin(this.x / 70) * 3
       
       if (this.x < 0 - this.width){
            this.resetPosition()
       }
    }
}