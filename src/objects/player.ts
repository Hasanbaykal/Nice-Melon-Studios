export class Player extends Phaser.Physics.Arcade.Sprite {

    private cursors: Phaser.Input.Keyboard.CursorKeys

    constructor(scene) {
        super(scene, 100, 450, "worm")

        this.cursors = this.scene.input.keyboard.createCursorKeys()
        
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.setCollideWorldBounds(true)
        this.setDrag(1000)
    }

    public update(): void {
        if (this.cursors.left.isDown) {
            this.setVelocityX(-200)
            this.flipX = true
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(200)
            this.flipX = false
        } else if (this.cursors.up.isDown) {
            this.setVelocityY(-250)
            this.flipX = false
        } else if (this.cursors.down.isDown) {
            this.setVelocityY(250)
            this.flipX = false
        }
    }
}
