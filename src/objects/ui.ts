export class UI {

    private scene:Phaser.Scene
    private graphics: Phaser.GameObjects.Graphics
    private scoreField: Phaser.GameObjects.Text
    private lives: Phaser.GameObjects.Text

    constructor(scene: Phaser.Scene) {
        this.scene = scene
        
        let w = Number(this.scene.game.config.width)
        this.scoreField = this.scene.add.text(15, 20, 'Score: ' + this.scene.registry.values.score, { fontFamily: '"Press Start 2P"', fontSize: 24, color: '#FFF' })
        this.lives = this.scene.add.text(250, 20, 'Lives: ' + this.scene.registry.values.lives, { fontFamily: '"Press Start 2P"', fontSize: 24, color: '#FFF' })
    }

    public update() : void {
        this.scoreField.text = 'Score: ' + this.scene.registry.values.score
        this.lives.text = 'Lives: ' + this.scene.registry.values.lives
    }
}