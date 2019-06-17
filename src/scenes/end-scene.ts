export class EndScene extends Phaser.Scene {

    private background
    private scores: number

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
        this.background = this.add.tileSprite(400, 300, 800, 600, 'boot')  
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
            
        }

        
        

    update(){
        this.background.tilePositionY -= 2
    }
}
