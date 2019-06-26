import { Arcade } from "../utils/arcade"
import { Wormhole } from "../app";


export class StartScene extends Phaser.Scene {

    private bgMusic: Phaser.Sound.BaseSound
    public shootSound: Phaser.Sound.BaseSound
    public arcade: Arcade
    public gameoverSound: Phaser.Sound.BaseSound
    private nextGameListener: EventListener
    private bgtile: Phaser.GameObjects.TileSprite


    constructor() {
        super({key: "StartScene"})
    }

    init(): void {
    }

    preload(): void {
    }

    create(): void {
        let g = this.game as Wormhole
        this.arcade = g.arcade
        
        this.bgtile = this.add.tileSprite(0, 0, 1900, 1000, 'boot').setOrigin(0, 0)

        this.add.text(140, 20, "High-Score:" + localStorage.getItem("scores"), { fontFamily: '"Press Start 2P"', fontSize: 20, color: 'white' }).setOrigin(0.5).setStroke('black', 15)
        this.add.text(400, 300, 'WORMHOLE', { 
            fontFamily: '"Press Start 2P"', 
            fontSize: 60, color: 'white' }).setOrigin(0.5).setStroke('black', 15)
        this.add.text(400, 500, 'REBUILD YOUR SPACESHIP', { fontFamily: '"Press Start 2P"', fontSize: 30, color: 'white' }).setOrigin(0.5).setStroke('black', 15)
        this.add.text(400, 550, 'EXPLORE THE GALAXY', { fontFamily: '"Press Start 2P"', fontSize: 30, color: 'white' }).setOrigin(0.5).setStroke('black', 15)
        
        this.nextGameListener = () => this.nextGame()
        document.addEventListener("joystick0button0", this.nextGameListener)
        
        let instructions = this.add.text(670, 20, "INSTRUCTIONS", { fontFamily: '"Press Start 2P"', fontSize: 20, color: 'white' }).setOrigin(0.5).setStroke('black', 15)
        instructions.setInteractive()
        instructions.on('pointerdown', (pointer) => {
        this.scene.start('InstructionScene')
        })
        
        let startBtn = this.add.text(400, 400, 'START', { fontFamily: '"Press Start 2P"', fontSize: 30, color: 'white' }).setOrigin(0.5).setStroke('black', 10)
        startBtn.setInteractive()
        startBtn.on('pointerdown', (pointer) => {
            this.scene.start('GameScene')
            this.createMusic()
        })    
    }

    update(){
        this.bgtile.tilePositionX += 4
        for (let joystick of this.arcade.Joysticks) {
            console.log(joystick)
            joystick.update()
        }

    } 

    private nextGame(){
        document.removeEventListener("joystick0button0", this.nextGameListener)

        this.registry.set("score", 0)
        this.registry.set("bombs", 3)
        this.registry.set("life", 300)

        this.scene.start('GameScene')
    }

    private createMusic() {
        this.bgMusic = this.sound.add('bgMusic', { loop: true });
        this.bgMusic.play()
    }

    public shootSFX() {
        this.shootSound = this.sound.add('shootSound');
    }

    public gameOverSFX() {
        this.gameoverSound = this.sound.add('gameoverSound');
    }
}
