import { GameScene } from "../scenes/game-scene"
import { Arcade } from "../utils/arcade"
import { Wormhole } from "../app"
import { StartScene } from "../scenes/start-scene"

export class Player extends Phaser.Physics.Arcade.Sprite {

    private cursors: Phaser.Input.Keyboard.CursorKeys
    private GameScene: GameScene
    public arcade : Arcade
    private bgMusic: Phaser.Sound.BaseSound

    constructor(scene: GameScene) {
        super(scene, 100, 450, "worm")

        this.GameScene = scene
        this.cursors = this.scene.input.keyboard.createCursorKeys()
        
        this.scene.add.existing(this)
        this.addParticles()
        this.scene.physics.add.existing(this)

        this.setCollideWorldBounds(true)
        this.setDrag(1000)
        document.addEventListener("joystick0button0", () => this.handleFireButton())   
        
        let g = this.scene.game as Wormhole
        this.arcade = g.arcade

    }

    public update(){
        this.joystickInput()
        this.keyController()
        
    }
    private handleFireButton():void {
        this.createMusic()
        this.GameScene.friendlyBullet()
    }

    // Initiate shootsound
    private createMusic() {
        this.bgMusic = this.GameScene.sound.add('shootSound');
        this.bgMusic.play()
    }

    private joystickInput():void {
        for (let joystick of this.arcade.Joysticks) {
            joystick.update()
        }
        if (this.arcade.Joysticks[0]) {
            this.setVelocityX(this.arcade.Joysticks[0].X * 400)
            this.setVelocityY(this.arcade.Joysticks[0].Y * 400)
        }
    }

    private addParticles() {
        let sparks = this.scene.add.particles('pixel2')

        let emitter = sparks.createEmitter({
            speed: -100,
            gravityY: 4000, 
            y: 30,
            lifespan: 500,
            scale: { start: 1, end: 0 },
            blendMode: 0
        });

        emitter.startFollow(this);
    }

    public keyController() {
        if (this.cursors.left.isDown) {
            this.setVelocityX(-200)
            this.flipX = false
        } if (this.cursors.right.isDown) {
            this.setVelocityX(200)
            this.flipX = false
        } if (this.cursors.up.isDown) {
            this.setVelocityY(-200)
            this.flipX = false
        } if (this.cursors.down.isDown) {
            this.setVelocityY(200)
            this.flipX = false
        }
        if(this.scene.input.keyboard.checkDown(this.cursors.space, 500)){
            console.log("pew")
            this.GameScene.friendlyBullet()
        }
    }
}
