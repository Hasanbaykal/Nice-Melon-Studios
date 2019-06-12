import { GameScene } from "./game-scene";
import { InstructionScene} from "./instruction-scene";

export class StartScene extends Phaser.Scene {

    private bgMusic: Phaser.Sound.BaseSound

    public shootSound: Phaser.Sound.BaseSound

    constructor() {
        super({key: "StartScene"})
    }

    init(): void {
    }

    preload(): void {
    }

    create(): void {
        this.add.image(0, 0, 'boot').setOrigin(0, 0)

        this.add.text(140, 20, "High-Score:" + localStorage.getItem("scores"), { fontFamily: '"Press Start 2P"', fontSize: 20, color: 'white' }).setOrigin(0.5).setStroke('black', 15)
        this.add.text(400, 300, 'WORMHOLE', { fontFamily: '"Press Start 2P"', fontSize: 60, color: 'white' }).setOrigin(0.5).setStroke('black', 15)
        this.add.text(400, 500, 'REBUILD YOUR SPACESHIP', { fontFamily: '"Press Start 2P"', fontSize: 30, color: 'white' }).setOrigin(0.5).setStroke('black', 15)
        this.add.text(400, 550, 'EXPLORE THE GALAXY', { fontFamily: '"Press Start 2P"', fontSize: 30, color: 'white' }).setOrigin(0.5).setStroke('black', 15)
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
    private createMusic() {
        this.bgMusic = this.sound.add('bgMusic', { loop: true });
        this.bgMusic.play()
    }

    public shootSFX() {
        this.shootSound = this.sound.add('shootSound');
    }
}
