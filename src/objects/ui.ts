import { REPLServer } from "repl";

export class UI {

    private scene:Phaser.Scene
    private graphics: Phaser.GameObjects.Graphics
    private scoreField: Phaser.GameObjects.Text
    private lifebar: Phaser.Geom.Rectangle


    constructor(scene: Phaser.Scene) {
        this.scene = scene

        this.graphics = this.scene.add.graphics({ lineStyle: { width: 1, color: 0xFFFFFF }, fillStyle: { color: 0x00AA00 } })
        this.lifebar = new Phaser.Geom.Rectangle(20, 20, 300, 16)
        this.graphics.fillRectShape(this.lifebar)
        this.graphics.strokeRectShape(new Phaser.Geom.Rectangle(20, 20, 300, 16))
        
        this.scoreField = this.scene.add.text(15, 20, 'Score: ' + this.scene.registry.values.score, { 
            fontFamily: '"Press Start 2P"', 
            fontSize: 24, 
            color: '#FFF' })
    }
    


    public update() : void {
        this.scoreField.text = 'Score: ' + this.scene.registry.values.score
        if (this.lifebar.width > this.scene.registry.values.lifes) this.lifebar.width--
        this.graphics.clear()
        this.graphics.fillRectShape(this.lifebar)
        this.graphics.strokeRectShape(new Phaser.Geom.Rectangle(20, 20, 300, 16))

    }
}