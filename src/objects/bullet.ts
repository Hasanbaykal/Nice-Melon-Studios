export class Bullet extends Phaser.Physics.Arcade.Sprite {

    private particles:Phaser.GameObjects.Particles.ParticleEmitterManager

    constructor(scene: Phaser.Scene, x:number, y:number, enemy:boolean = false) {
        super(scene, x, y, "missile")       
        
        let direction = -1
        let tint = 0xFFFFFF

        this.addParticles(tint)
        this.setScale(0.9) 

        this.scene.physics.add.existing(this) 
        this.setSize(this.displayWidth + 20, this.displayHeight + 20)

        this.setVelocityY(100 * direction)
        this.setAccelerationY(-500) 
        this.on('destroy', this.onBeforeDestroy)
    }

    private onBeforeDestroy() {
        this.particles.destroy();
    }

    private addParticles(tint) {
        this.particles = this.scene.add.particles('pixel')

        let emitter = this.particles.createEmitter({
            lifespan: 200,
            speed: -100,
            tint: tint,
            maxParticles: 25,
            scale: { start: 1, end: 0 },
            blendMode: 0
        });

        emitter.startFollow(this)
    }

    public update(): void {
        if (this.y < 0) {
            this.destroy()
        }
    }

}