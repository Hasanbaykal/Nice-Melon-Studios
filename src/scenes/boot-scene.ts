export class BootScene extends Phaser.Scene {

    private graphics: Phaser.GameObjects.Graphics

    constructor() {
        super({ key: "BootScene" })
    }

    init(){
        this.loadFonts
    }

    preload(): void {
        this.load.image('boot', require('../assets/bg.png'))
        this.load.image('star', require('../assets/star.png'))
        this.load.image('bomb', require('../assets/bomb.png'))
        this.load.image('ground', require('../assets/platform_ground.png'))
        this.load.image('ground2', require('../assets/platform_ground_flip.png'))
        this.load.image('worm', require('../assets/worm.png'))
        this.load.image('enemy', require('../assets/enemy.png'))
        this.load.image('pixel', require('../assets/pixel.png'))
        this.load.image('pixel2', require('../assets/pixel2.png'))


        this.load.on('complete', () => {
            console.log("everything is loaded")
            this.scene.start("StartScene")
        })
    }

    private loadFonts(){
        WebFont.load({
            google: {
                families: ['Press Start 2P']
            }
        })
    }
}