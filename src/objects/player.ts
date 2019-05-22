import { GameScene } from "../scenes/game-scene"
import { Joystick } from "../utils/joystick"

export class Player extends Phaser.Physics.Arcade.Sprite {

    private cursors: Phaser.Input.Keyboard.CursorKeys
    private GameScene: GameScene
    private joystick : Joystick

    constructor(scene: GameScene) {
        super(scene, 100, 450, "worm")

        this.GameScene = scene
        this.cursors = this.scene.input.keyboard.createCursorKeys()
        
        this.scene.add.existing(this)
        this.addParticles()
        this.scene.physics.add.existing(this)
        this.joystick = new Joystick(6)

        this.setCollideWorldBounds(true)
        this.setDrag(1000)
        document.addEventListener("button0", () => this.handleFireButton())       
    }

    public update(){
        this.joystick.update()
        this.joystickInput()
        this.keyController()
        
    }
    private handleFireButton():void {
        this.GameScene.friendlyBullet()

    }

    private joystickInput():void {
        this.setVelocityX(this.joystick.XAxis * 400)
        this.setVelocityY(this.joystick.YAxis * 400)
    }

    private addParticles() {
        let sparks = this.scene.add.particles('pixel2')

        let emitter = sparks.createEmitter({
            speed: -100,
            gravityY: 500, 
            x: -4,
            y: 30,
            accelerationX: -100,
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
