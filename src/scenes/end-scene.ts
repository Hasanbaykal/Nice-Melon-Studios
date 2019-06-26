import { Arcade } from "../utils/arcade"
import { Wormhole } from "../app"

export class EndScene extends Phaser.Scene {

    private background
    private scores: number
    private arcade: Arcade
    private nextGameListener: EventListener

    constructor() {
        super({key: "EndScene"})
    }

    init(): void {
        if(this.registry.values.score > localStorage.getItem("scores")){
            localStorage.setItem("scores", this.registry.values.score )
            this.scores = 1
        } else {
            localStorage.setItem("scores_not_highscore", this.registry.values.score)
        }
        this.sound.play('gameoverSound')
    }

    create(): void {
        let g = this.game as Wormhole
        this.arcade = g.arcade

        this.background = this.add.tileSprite(0, 0, 1900, 1000, 'boot').setOrigin(0,0)
        if(this.scores){
            this.add.text(400, 100, 'NEW HIGH SCORE', { 
                fontFamily: '"Press Start 2P"', 
                fontSize: 50, 
                color: 'white' }).setOrigin(0.5).setStroke('black', 15)
        } else {
            this.add.text(400, 100, 'UNLUCKY', { 
                fontFamily: '"Press Start 2P"', 
                fontSize: 60, 
                color: 'white' }).setOrigin(0.5).setStroke('black', 15)
        }
        
        let startBtn = this.add.text(400, 550, 'RESTART', { fontFamily: '"Press Start 2P"', fontSize: 30, color: 'white' }).setOrigin(0.5).setStroke('black', 10)
        startBtn.setInteractive()
        this.input.once('pointerdown', (pointer) => {
            this.scene.start('StartScene')
            this.game.sound.stopAll();
        })      
        
        if(this.registry.values.score < localStorage.getItem('scores')){
            console.log("here")
            this.add.text(400, 200, "Your Score: " + localStorage.getItem("scores_not_highscore"), { 
                fontFamily: '"Press Start 2P"', 
                fontSize: 25, 
                color: 'white' }).setOrigin(0.5).setStroke('black', 15)
        } else {
            this.add.text(400, 200, "Your Score: " + localStorage.getItem("scores"), { 
                fontFamily: '"Press Start 2P"', 
                fontSize: 25, 
                color: 'white' }).setOrigin(0.5).setStroke('black', 15)   
        }
  
        this.add.text(400, 250, "High-Score: " + localStorage.getItem("scores"), { 
            fontFamily: '"Press Start 2P"', 
            fontSize: 30, 
            color: 'white' }).setOrigin(0.5).setStroke('black', 15)

            this.nextGameListener = () => this.nextGame()
            document.addEventListener("joystick0button0", this.nextGameListener)
            
        }

        
        private nextGame(){
            document.removeEventListener("joystick0button0", this.nextGameListener)
    
            this.registry.set("score", 0)
            this.registry.set("bombs", 3)
            this.registry.set("life", 300)
    
            this.scene.start('GameScene')
        }

    update(){
        this.background.tilePositionY -= 2
        for (let joystick of this.arcade.Joysticks) {
            joystick.update()
        }
    }
}
