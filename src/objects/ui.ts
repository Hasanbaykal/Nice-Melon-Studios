export class UI {

    private scene:Phaser.Scene
    private graphics: Phaser.GameObjects.Graphics
    private scoreField: Phaser.GameObjects.Text

    constructor(scene: Phaser.Scene) {
        this.scene = scene
        
        let w = Number(this.scene.game.config.width)
        this.scoreField = this.scene.add.text(15, 20, 'Score: ' + this.scene.registry.values.score, { fontFamily: '"Press Start 2P"', fontSize: 24, color: '#FFF' })
    }

    public update() : void {
        this.scoreField.text = 'Score: ' + this.scene.registry.values.score
    }
}