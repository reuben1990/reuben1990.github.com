/**
 * Created with JetBrains WebStorm.
 * User: rupeng
 * Date: 7/1/12
 * Time: 9:49 PM
 * To change this template use File | Settings | File Templates.
 */

var NormalBulletSprite = BaseSprite.extend({
    imgPath : normal_bullet,
    width : 0.5,
    height : 0.5,
    velocity : 100,
    power : 10,
    density : 50,
    ctor : function (parentNode, world, position, radian_direction) {
        this.initialize(parentNode, world, position, b2.b2Body.b2_dynamicBody, this.imgPath, this.width, this.height, radian_direction, 0, this.velocity, this.density, 0.5, 0.5, my.CIRCLE_SHAPE);
        this.spriteType = my.BULLET_TYPE;
        this.setAsBullet();
    },
    handleCollision : function (sprite) {
        if (sprite.spriteType !== my.HERO_TYPE) {
            this.tagAsDead();
            playHitEffect(this.parentNode, r_a_point(this.b2_body.GetPosition()));
        }
    },
    destroy : function () {
        this.doDestroy();
    }
});

var FireBulletSprite = NormalBulletSprite.extend({
    imgPath : fire_bullet,
    velocity : 75,
    power : 20,
    width : 0.5,
    height : 0.5,
    ctor : function (parentNode, world, position, radian_direction) {
        this._super(parentNode, world, position, radian_direction);

        var emitter = cc.ParticleFire.create();
        this.addChild(emitter, 10);
        emitter.setShapeType(cc.PARTICLE_BALL_SHAPE);
        emitter.setPosition(cc.PointMake(this.width * my.TILE_SIZE / 2, this.height * my.TILE_SIZE / 2));
    }
});