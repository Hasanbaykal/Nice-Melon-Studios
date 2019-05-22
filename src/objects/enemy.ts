import { GameScene } from "../scenes/game-scene"

export class Enemy extends Phaser.Physics.Arcade.Sprite {

    public score: number = 25
    private enemies = []
    private gameScene : GameScene

    constructor(scene: GameScene) {
        super(scene, Phaser.Math.Between(150, 600), Phaser.Math.Between(-50, -100), "enemy")       

        this.gameScene = scene
        
        this.setScale(0.7)
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.setSize(this.displayWidth, this.displayHeight)
        this.setVelocityY(Phaser.Math.Between(150, 300))
    }

    public resetPosition() {
        this.x = Phaser.Math.Between(-50, 600)
        this.y = Phaser.Math.Between(20, 50)
        this.setVelocityY(Phaser.Math.Between(150, 300))
    }

    // TODO RETURN FIRE!
    public update() : void {       
        // this.enemies.push(this)
        // console.log(this.enemies)
       if (this.y > 1000 - this.width){
            this.resetPosition()
       }
    }
}