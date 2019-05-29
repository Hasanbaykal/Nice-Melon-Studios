import { REPLServer } from "repl";

export class UI {

    private scene:Phaser.Scene
    private graphics: Phaser.GameObjects.Graphics
    private scoreField: Phaser.GameObjects.Text
    private lives: Phaser.GameObjects.Text
    private hearts: Phaser.GameObjects.Image
    private maxLives = 3


    constructor(scene: Phaser.Scene) {
        this.scene = scene
        
        this.scoreField = this.scene.add.text(15, 20, 'Score: ' + this.scene.registry.values.score, { 
            fontFamily: '"Press Start 2P"', 
            fontSize: 24, 
            color: '#FFF' })
        
        // this.lives = this.scene.add.text(250, 20, 'Lives: ' + this.scene.registry.values.lives, { 
        //     fontFamily: '"Press Start 2P"', 
        //     fontSize: 24, 
        //     color: '#FFF' })
        
        for(let i = 0; i < this.maxLives; i++){
            this.hearts = this.scene.add.sprite(250+80*i, 50, 'heart')
        }
    }
    


    public update() : void {
        this.scoreField.text = 'Score: ' + this.scene.registry.values.score
        // this.lives.text = 'Lives: ' + this.scene.registry.values.lives
        this.hearts = this.scene.registry.values.hearts
    }
}