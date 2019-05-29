import { Player } from "../objects/player"
import { UI } from "../objects/ui"
import { Enemy} from "../objects/enemy"
import { Bullet } from "../objects/bullet"
import { Platform } from "../objects/platform"
import { Parts } from "../objects/parts"
export class GameScene extends Phaser.Scene {

    private player : Player
    private platforms: Phaser.GameObjects.Group
    private partsGroup: Phaser.GameObjects.Group
    private enemyGroup: Phaser.GameObjects.Group
    private bulletGroup: Phaser.GameObjects.Group
    private counter = 0
    private background
    private ui: UI

    constructor() {
        super({ key: "GameScene" })
    }

    init(): void {
        console.log("Game Scene")
        this.registry.set("score", 0)
        this.registry.set("lives", 100)
    }

    create(): void {
        this.background = this.add.tileSprite(400, 300, 800, 600, 'boot')  
        this.bulletGroup = this.add.group({ runChildUpdate: true }) 

        this.partsGroup = this.add.group({ runChildUpdate: true }).add(new Parts(this), true)
            this.enemyGroup = this.add.group({ runChildUpdate: true }).add(new Enemy(this), true)

        this.platforms = this.add.group({ runChildUpdate: true })
        this.platforms.addMultiple([
            new Platform(this, 20, 574, "ground"),
            new Platform(this, 780, 574, "ground2"),
        ], true)
        this.player = new Player(this)

        this.physics.add.collider(this.player, this.partsGroup, this.collectPart, null, this)
        this.physics.add.collider(this.player, this.enemyGroup, this.removeEnemy, null, this)
        this.physics.add.collider(this.enemyGroup, this.bulletGroup)
        this.physics.add.collider(this.player, this.platforms)

        this.physics.add.overlap(this.bulletGroup, this.enemyGroup, this.removeBullet, null, this)
        this.physics.add.overlap(this.enemyGroup, this.enemyGroup, this.removeEnemy, null, this)
        
        this.ui = new UI(this)
    }

    private collectPart(Player : Player, Parts : Parts) {
        this.partsGroup.remove(Parts, true, true)
        this.registry.values.score += 1
        if(this.registry.values.lives < 100){
        this.registry.values.lives += 25
        }
    }

    public friendlyBullet(){
        this.bulletGroup.add(new Bullet(this, this.player.x, this.player.y-30), true)
    }

    private removeBullet(Bullet : Bullet, Enemy : Enemy) {
        console.log("??")
        this.bulletGroup.remove(Bullet, true, true)
        this.enemyGroup.remove(Enemy, true, true) 
    }

    private removeEnemy(Player : Player, Enemy : Enemy) {
        this.enemyGroup.remove(Enemy, true, true)
        this.registry.values.lives -= 25
    }

    update(){
        this.player.update()
        this.ui.update()
        this.background.tilePositionY -= 2

        this.counter++
        if(this.counter % 420 == 0){
            this.enemyGroup.add(new Enemy(this), true)
            this.partsGroup.add(new Parts(this), true)
        }
    }

}
