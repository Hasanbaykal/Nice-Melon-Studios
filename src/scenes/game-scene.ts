import { Player } from "../objects/player"
import { UI } from "../objects/ui";
import { Enemy} from "../objects/enemy"
import { Bullet } from "../objects/bullet"
import { Platform } from "../objects/platform"

export class GameScene extends Phaser.Scene {

    private player : Player
    private platforms: Phaser.GameObjects.Group
    private stars: Phaser.Physics.Arcade.Group
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
    }

    create(): void {
        this.background = this.add.tileSprite(400, 300, 800, 600, 'boot')  
        this.bulletGroup = this.add.group({ runChildUpdate: true }) 
    

        // 11 STARS
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 100, stepX: 70 },
        })  

        // TODO add player
        this.player = new Player(this)
        this.enemyGroup = this.add.group({ runChildUpdate: true })
        this.enemyGroup.add(new Enemy(this), true)
        
        this.platforms = this.add.group({ runChildUpdate: true })
        this.platforms.addMultiple([
            new Platform(this, 800, 574, "enemy"),
        ], true)

        // define collisions for bouncing, and overlaps for pickups
        // this.physics.add.collider(this.player, this.enemyGroup)
        // this.physics.add.collider(this.enemyGroup, this.bulletGroup)
        this.physics.add.collider(this.player, this.platforms)
        
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this)
        this.physics.add.overlap(this.player, this.enemyGroup, this.removeEnemy, null, this)
        this.physics.add.overlap(this.bulletGroup, this.enemyGroup, this.removeBullet, null, this)

        this.cameras.main.setSize(800, 600)
        this.cameras.main.setBounds(0, 0, 800, 600)
        this.cameras.main.startFollow(this.player)

        this.ui = new UI(this)
    }

    public friendlyBullet(){
        this.bulletGroup.add(new Bullet(this, this.player.x, this.player.y-30), true)
    }

    private collectStar(player : Player , star) : void {
        this.stars.remove(star, true, true)
        this.registry.values.score++
        
        if(this.registry.values.score == 12){
            console.log("DONE")
        }
    }

    private removeBullet(Bullet, Enemy) {
        this.bulletGroup.remove(Bullet, true, true)
        this.enemyGroup.remove(Enemy, true, true) 
    }

    private removeEnemy(player : Player, Enemy) {
        this.enemyGroup.remove(Enemy, true, true)
    }

    update(){
        this.player.update()
        this.ui.update()
        this.background.tilePositionY -= 2
        this.counter++
        if(this.counter % 420 == 0){
            this.enemyGroup.add(new Enemy(this), true)
        }
    }

}
