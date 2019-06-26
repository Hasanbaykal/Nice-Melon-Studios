import { Player } from "../objects/player"
import { UI } from "../objects/ui"
import { Enemy } from "../objects/enemy"
import { Bullet } from "../objects/bullet"
import { Platform } from "../objects/platform"
import { Parts } from "../objects/parts"
import { Astroid } from "../objects/astroid";
import { emit } from "cluster";
import { timeout } from "q";
import { Cameras } from "phaser";
export class GameScene extends Phaser.Scene {

    private player : Player
    private platforms: Phaser.GameObjects.Group
    private astroidGroup: Phaser.GameObjects.Group
    private partsGroup: Phaser.GameObjects.Group
    private enemyGroup: Phaser.GameObjects.Group
    private bulletGroup: Phaser.GameObjects.Group
    private counter = 0
    private background
    private ui: UI
    private joystickListener: EventListener
    private scoreBtn
    private killBtn

    constructor() {
        super({ key: "GameScene" })
    }

    init(): void {
        console.log("Game Scene")
        this.registry.set("score", 0)
        this.registry.set("lives", 300)
    }


    create(): void {
        this.background = this.add.tileSprite(0, 0, 1900, 1000, 'boot').setOrigin(0,0)  
        this.bulletGroup = this.add.group({ runChildUpdate: true }) 

        this.partsGroup = this.add.group({ runChildUpdate: true }).add(new Parts(this), true)
        this.enemyGroup = this.add.group({ runChildUpdate: true }).add(new Enemy(this), true)
        this.astroidGroup = this.add.group({ runChildUpdate: true }).add(new Astroid(this), true)

        this.platforms = this.add.group({ runChildUpdate: true })
        this.platforms.addMultiple([
            new Platform(this, 20, 574, "bounds1_1"),
            new Platform(this, 1680, 574, "bounds1_2"),
        ], true)
        this.player = new Player(this)


        // this.killBtn = this.add.text(400, 550, 'KILL', { 
        //     fontFamily: '"Press Start 2P"', 
        //     fontSize: 30, color: 'white' }).setOrigin(0.5).setStroke('black', 15)
        // this.killBtn.setInteractive()
        // this.killBtn.on('pointerdown', (pointer) => {
        //     this.scene.start('EndScene')
        // })        

        // this.scoreBtn = this.add.text(400, 150, 'SCORE', { 
        //     fontFamily: '"Press Start 2P"', 
        //     fontSize: 30, color: 'white' }).setOrigin(0.5).setStroke('black', 15)
        // this.scoreBtn.setInteractive()
        // this.scoreBtn.on('pointerdown', (pointer) => {
        //     this.registry.values.score += 10000
        // })        

        this.physics.add.collider(this.player, this.partsGroup, this.collectPart, null, this)
        this.physics.add.collider(this.player, this.enemyGroup, this.removeEnemy, null, this)
        this.physics.add.collider(this.player, this.astroidGroup, this.removeAstroid, null, this)
        this.physics.add.collider(this.enemyGroup, this.astroidGroup, this.removeEnemyNoScore, null, this)
        this.physics.add.collider(this.enemyGroup, this.bulletGroup)
        this.physics.add.collider(this.player, this.platforms)

        this.physics.add.overlap(this.bulletGroup, this.enemyGroup, this.removeBullet, null, this)
        this.physics.add.overlap(this.enemyGroup, this.enemyGroup, this.removeEnemyNoScore, null, this)
        this.physics.add.overlap(this.bulletGroup, this.astroidGroup, this.removeBulletAstroid, null, this)
        
        this.ui = new UI(this)
    }

    
    private Particles(x, y, i){
        let explode = this.add.particles(i)

        let emitter = explode.createEmitter({
            speed: -250,
            gravityY: 100, 
            x: 30,
            y: 30,
            lifespan: 500,
            scale: { start: 1, end: 0 },
            blendMode: 0
        });
        emitter.explode(25, x, y)
        console.log(i)
    }

    private collectPart(Player : Player, Parts : Parts) {
        this.partsGroup.remove(Parts, true, true)
        this.registry.values.score += 10
        if(this.registry.values.lives < 300){
            this.registry.values.lives += 25
        }
    }

    private takeDamageAnimation() {
        this.cameras.main.flash(500,255,0,0)        
    }

    public friendlyBullet(){
        this.bulletGroup.add(new Bullet(this, this.player.x, this.player.y-30), true)
        // Shoot soundeffect
        let shoot = this.sound.add('shootSound' , { volume: 0.2 }) 
        shoot.play()
        
    }

    private removeBullet(Bullet : Bullet, Enemy : Enemy) {
        this.bulletGroup.remove(Bullet, true, true)
        this.enemyGroup.remove(Enemy, true, true)
        this.Particles(Enemy.x, Enemy.y, 'pixel3')
        this.registry.values.score += 10
        }

    private removeBulletAstroid(Bullet : Bullet, Astroid : Astroid) {
        this.bulletGroup.remove(Bullet, true, true)
    }

    private removeEnemy(Player : Player, Enemy : Enemy) {
        this.enemyGroup.remove(Enemy, true, true)
        this.registry.values.lives -= 25
        this.Particles(Enemy.x, Enemy.y, 'pixel3')
        this.takeDamageAnimation()
    }

    private removeEnemyNoScore(Enemy) {
        this.enemyGroup.remove(Enemy, true, true)
    }

    private removeAstroid(Player : Player, Astroid : Astroid){
        this.astroidGroup.remove(Astroid, true, true)
        this.registry.values.lives -= 50
        this.Particles(Astroid.x, Astroid.y, 'pixel4')
        this.takeDamageAnimation()
    }

    update(){
        this.player.update()
        this.ui.update()
        this.background.tilePositionY -= 2

        this.counter++
        if(this.counter % 100 == 0){
            this.enemyGroup.add(new Enemy(this), true)
        }
         if(this.counter % 420 == 0){
            this.partsGroup.add(new Parts(this), true)
            this.astroidGroup.add(new Astroid(this), true)
         }
         if(this.registry.values.lives <= 0){
            this.game.sound.stopAll();
            this.scene.start("EndScene")
            document.removeEventListener("joystick0button0", this.joystickListener)
         }
    }

}
