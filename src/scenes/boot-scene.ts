export class BootScene extends Phaser.Scene {

    private graphics: Phaser.GameObjects.Graphics

    constructor() {
        super({ key: "BootScene" })
    }

    init(){
        this.loadFonts
    }

    // Assets
    preload(): void {

        // Images
        this.load.image('boot', require('../assets/bg.png'))
        this.load.image('heart', require('../assets/heart.png'))
        this.load.image('powerheart', require('../assets/powerheart.png'))
        this.load.image('star', require('../assets/star.png'))
        this.load.image('bomb', require('../assets/bomb.png'))
        this.load.image('bounds1_1', require('../assets/bounds1_1.png'))
        this.load.image('bounds1_2', require('../assets/bounds1_2.png'))
        this.load.image('bounds2_1', require('../assets/bounds2_1.png'))
        this.load.image('bounds2_2', require('../assets/bounds2_2.png'))
        this.load.image('bounds3_1', require('../assets/bounds3_1.png'))
        this.load.image('bounds3_2', require('../assets/bounds3_2.png'))
        this.load.image('bounds4_1', require('../assets/bounds4_1.png'))
        this.load.image('bounds4_2', require('../assets/bounds4_2.png'))
        this.load.image('worm', require('../assets/worm.png'))
        this.load.image('enemy50', require('../assets/enemy50.png'))
        this.load.image('enemy70', require('../assets/enemyWorm.png'))
        this.load.image('enemy100', require('../assets/enemy100.png'))
        this.load.image('pixel', require('../assets/pixel.png'))
        this.load.image('missile', require('../assets/missile.png'))
        this.load.image('pixel2', require('../assets/pixel2.png'))
        this.load.image('pixel3', require('../assets/pixel3.png'))
        this.load.image('pixel4', require('../assets/pixel4.png'))
        this.load.image('asteroid', require('../assets/asteroid.png'))
        this.load.image('instructionsprite', require('../assets/instructionSprite.png'))

        // Sound
        this.load.audio('bgMusic', require('../sounds/bgmusic.mp3'))
        this.load.audio('shootSound', require('../sounds/shoot.mp3'))
        this.load.audio('gameoverSound', require('../sounds/bestcryever.mp3'));


        this.load.on('complete', () => {
            console.log("everything is loaded")
            this.scene.start("StartScene")
        })
    }

    create(){
    }

    private loadFonts(){
        WebFont.load({
            google: {
                families: ['Press Start 2P']
            }
        })
    }
}