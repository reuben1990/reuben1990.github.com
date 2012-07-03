/**
 * Created with JetBrains WebStorm.
 * User: rupeng
 * Date: 7/1/12
 * Time: 9:48 PM
 * To change this template use File | Settings | File Templates.
 */

var HeroSprite = BaseSprite.extend({
    width : 1,
    height : 1,
    keyHitAssistance : null,
    isShooting : false,
    velocity : 10,
    normalShootInterval : 0.05,
    fireShootInterval : 0.08,
    shootInterval : null,
    bulletType : null,
    radian_direction : 0,
    life : 100,
    power : 100,
    density : 100,
    assailable : false,
    ctor : function (parentNode, world, position, keyHitAssistance) {
        this.keyHitAssistance = keyHitAssistance;
        this.initialize(parentNode, world, position, b2.b2Body.b2_dynamicBody, hero_path, this.width, this.height, 0, 0, 0, this.density, 0, 1, my.BOX_SHAPE);
        this.spriteType = my.HERO_TYPE;
        this.setBulletAs(my.NORMAL_BULLET);
    },
    alterPhysicalState : function (hero) {
        var x_tmp = 0;
        var y_tmp = 0;
        if (this.keyHitAssistance.keyArray[cc.KEY.a]) {
            x_tmp -= this.velocity;
        }
        if (this.keyHitAssistance.keyArray[cc.KEY.d]) {
            x_tmp += this.velocity;
        }
        if (this.keyHitAssistance.keyArray[cc.KEY.w]) {
            y_tmp += this.velocity;
        }
        if (this.keyHitAssistance.keyArray[cc.KEY.s]) {
            y_tmp -= this.velocity;
        }
        this.b2_body.SetAwake(true);
        this.b2_body.SetLinearVelocity(new b2.b2Vec2(x_tmp, y_tmp));
    },
    handleTouchBegan : function (location) {
        this.radian_direction = this.computeDirection(this.b2_body.GetPosition(), location);
        this.schedule(this.shoot, this.shootInterval);
        this.isShooting = true;
        this.shoot();
    },
    handleTouchMoved : function (location) {
        if (this.isShooting) {
            this.radian_direction = this.computeDirection(this.b2_body.GetPosition(), location);
        }
    },
    handleTouchEnded : function (location) {
        this.isShooting = false;
        this.unschedule(this.shoot);
    },
    handleCollision : function (sprite) {
        if (!this.assailable) {
            this.assailable = true;
        } else if (sprite.spriteType === my.ENEMY_TYPE) {
            this.life -= sprite.power;
            if (this.life <= 0) {
                this.tagAsDead();
            }
        }
    },
    destroy : function () {
        this.doDestroy();
    },
    shoot : function () {
        var x_offset = Math.cos(this.radian_direction) * 1.5;
        var y_offset = Math.sin(this.radian_direction) * 1.5;
        var pos =  this.b2_body.GetPosition();
        pos.x += x_offset;
        pos.y += y_offset;

        if (this.bulletType === my.FIRE_BULLET) {
            var fireBullet = new FireBulletSprite(this.parentNode, this.world, pos, this.radian_direction);
        } else {
            var normalBullet = new NormalBulletSprite(this.parentNode, this.world, pos, this.radian_direction);
        }
    },
    changeBullet : function () {
        this.isShooting = false;
        this.unschedule(this.shoot);
        if (this.bulletType === my.NORMAL_BULLET) {
            this.setBulletAs(my.FIRE_BULLET);
        } else {
            this.setBulletAs(my.NORMAL_BULLET);
        }
    },
    setBulletAs : function (type) {
        if (type === my.NORMAL_BULLET) {
            this.shootInterval = this.normalShootInterval;
        } else {
            this.shootInterval = this.fireShootInterval;
        }
        this.bulletType = type;
    }
});